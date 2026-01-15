// Enhanced Order Management System
class EnhancedOrderManager {
    constructor() {
        this.orders = [];
        this.orderStatuses = [
            { id: 'pending', name: 'في الانتظار', color: '#f59e0b', icon: 'fas fa-clock' },
            { id: 'confirmed', name: 'مؤكد', color: '#3b82f6', icon: 'fas fa-check-circle' },
            { id: 'processing', name: 'قيد التحضير', color: '#8b5cf6', icon: 'fas fa-cogs' },
            { id: 'shipped', name: 'تم الشحن', color: '#06b6d4', icon: 'fas fa-truck' },
            { id: 'delivered', name: 'تم التسليم', color: '#10b981', icon: 'fas fa-check-double' },
            { id: 'cancelled', name: 'ملغي', color: '#ef4444', icon: 'fas fa-times-circle' },
            { id: 'returned', name: 'مرتجع', color: '#f97316', icon: 'fas fa-undo' }
        ];
        this.paymentMethods = [
            { id: 'cash', name: 'الدفع عند الاستلام', icon: 'fas fa-money-bill-wave' },
            { id: 'card', name: 'بطاقة ائتمان', icon: 'fas fa-credit-card' },
            { id: 'bank_transfer', name: 'تحويل بنكي', icon: 'fas fa-university' },
            { id: 'wallet', name: 'محفظة إلكترونية', icon: 'fas fa-wallet' },
            { id: 'installment', name: 'تقسيط', icon: 'fas fa-calendar-alt' }
        ];
        this.shippingMethods = [
            { id: 'standard', name: 'شحن عادي (3-5 أيام)', price: 50, icon: 'fas fa-truck' },
            { id: 'express', name: 'شحن سريع (1-2 يوم)', price: 100, icon: 'fas fa-shipping-fast' },
            { id: 'same_day', name: 'نفس اليوم (القاهرة والجيزة)', price: 150, icon: 'fas fa-clock' },
            { id: 'pickup', name: 'استلام من المعرض', price: 0, icon: 'fas fa-store' }
        ];
        this.init();
    }
    
    init() {
        this.loadFromStorage();
        this.setupEventListeners();
    }
    
    loadFromStorage() {
        const stored = localStorage.getItem('autoparts_orders_enhanced');
        if (stored) {
            this.orders = JSON.parse(stored);
        }
    }
    
    saveToStorage() {
        localStorage.setItem('autoparts_orders_enhanced', JSON.stringify(this.orders));
    }
    
    // Create new order
    createOrder(orderData) {
        const order = {
            id: this.generateOrderId(),
            customerId: orderData.customerId,
            customerInfo: orderData.customerInfo,
            items: orderData.items,
            subtotal: orderData.subtotal,
            shipping: orderData.shipping,
            tax: orderData.tax || 0,
            discount: orderData.discount || 0,
            total: orderData.total,
            status: 'pending',
            paymentMethod: orderData.paymentMethod,
            paymentStatus: 'pending',
            shippingMethod: orderData.shippingMethod,
            shippingAddress: orderData.shippingAddress,
            billingAddress: orderData.billingAddress,
            notes: orderData.notes || '',
            trackingNumber: null,
            estimatedDelivery: this.calculateEstimatedDelivery(orderData.shippingMethod),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            statusHistory: [{
                status: 'pending',
                timestamp: new Date().toISOString(),
                note: 'تم إنشاء الطلب'
            }]
        };
        
        this.orders.push(order);
        this.saveToStorage();
        
        // Update inventory
        this.updateInventoryForOrder(order.items, 'subtract');
        
        // Send notifications
        this.sendOrderNotification(order, 'created');
        
        // Track analytics
        if (window.analytics) {
            analytics.trackEvent('order_created', {
                order_id: order.id,
                total: order.total,
                items_count: order.items.length
            });
        }
        
        return order;
    }
    
    // Update order status
    updateOrderStatus(orderId, newStatus, note = '') {
        const order = this.orders.find(o => o.id === orderId);
        if (!order) return null;
        
        const oldStatus = order.status;
        order.status = newStatus;
        order.updatedAt = new Date().toISOString();
        
        // Add to status history
        order.statusHistory.push({
            status: newStatus,
            timestamp: new Date().toISOString(),
            note: note || `تم تغيير الحالة إلى ${this.getStatusName(newStatus)}`
        });
        
        // Handle specific status changes
        if (newStatus === 'shipped') {
            order.trackingNumber = this.generateTrackingNumber();
            order.shippedAt = new Date().toISOString();
        } else if (newStatus === 'delivered') {
            order.deliveredAt = new Date().toISOString();
            order.paymentStatus = 'completed';
        } else if (newStatus === 'cancelled') {
            order.cancelledAt = new Date().toISOString();
            // Return items to inventory
            this.updateInventoryForOrder(order.items, 'add');
        }
        
        this.saveToStorage();
        
        // Send notifications
        this.sendOrderNotification(order, 'status_updated', { oldStatus, newStatus });
        
        // Track analytics
        if (window.analytics) {
            analytics.trackEvent('order_status_updated', {
                order_id: orderId,
                old_status: oldStatus,
                new_status: newStatus
            });
        }
        
        return order;
    }
    
    // Get orders with filters
    getOrders(filters = {}) {
        let filtered = [...this.orders];
        
        if (filters.status) {
            filtered = filtered.filter(order => order.status === filters.status);
        }
        
        if (filters.customerId) {
            filtered = filtered.filter(order => order.customerId === filters.customerId);
        }
        
        if (filters.paymentStatus) {
            filtered = filtered.filter(order => order.paymentStatus === filters.paymentStatus);
        }
        
        if (filters.dateFrom) {
            filtered = filtered.filter(order => new Date(order.createdAt) >= new Date(filters.dateFrom));
        }
        
        if (filters.dateTo) {
            filtered = filtered.filter(order => new Date(order.createdAt) <= new Date(filters.dateTo));
        }
        
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filtered = filtered.filter(order => 
                order.id.toLowerCase().includes(searchTerm) ||
                order.customerInfo.name.toLowerCase().includes(searchTerm) ||
                order.customerInfo.email.toLowerCase().includes(searchTerm) ||
                order.customerInfo.phone.includes(searchTerm)
            );
        }
        
        // Sorting
        filtered.sort((a, b) => {
            if (filters.sortBy === 'total') {
                return filters.sortOrder === 'asc' ? a.total - b.total : b.total - a.total;
            } else if (filters.sortBy === 'date') {
                return filters.sortOrder === 'asc' ? 
                    new Date(a.createdAt) - new Date(b.createdAt) :
                    new Date(b.createdAt) - new Date(a.createdAt);
            }
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        
        return filtered;
    }
    
    getOrderById(orderId) {
        return this.orders.find(order => order.id === orderId);
    }
    
    // Order statistics
    getOrderStatistics(period = 'all') {
        let orders = [...this.orders];
        
        // Filter by period
        if (period !== 'all') {
            const now = new Date();
            let startDate;
            
            switch (period) {
                case 'today':
                    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    break;
                case 'week':
                    startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    break;
                case 'month':
                    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                    break;
                case 'year':
                    startDate = new Date(now.getFullYear(), 0, 1);
                    break;
            }
            
            if (startDate) {
                orders = orders.filter(order => new Date(order.createdAt) >= startDate);
            }
        }
        
        const totalOrders = orders.length;
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
        const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
        
        // Status breakdown
        const statusBreakdown = {};
        this.orderStatuses.forEach(status => {
            statusBreakdown[status.id] = orders.filter(order => order.status === status.id).length;
        });
        
        // Payment method breakdown
        const paymentBreakdown = {};
        this.paymentMethods.forEach(method => {
            paymentBreakdown[method.id] = orders.filter(order => order.paymentMethod === method.id).length;
        });
        
        // Top customers
        const customerStats = {};
        orders.forEach(order => {
            const customerId = order.customerId || 'guest';
            if (!customerStats[customerId]) {
                customerStats[customerId] = {
                    orders: 0,
                    total: 0,
                    name: order.customerInfo.name
                };
            }
            customerStats[customerId].orders++;
            customerStats[customerId].total += order.total;
        });
        
        const topCustomers = Object.entries(customerStats)
            .sort(([,a], [,b]) => b.total - a.total)
            .slice(0, 10)
            .map(([id, stats]) => ({ id, ...stats }));
        
        return {
            totalOrders,
            totalRevenue,
            averageOrderValue,
            statusBreakdown,
            paymentBreakdown,
            topCustomers
        };
    }
    
    // Inventory management
    updateInventoryForOrder(items, operation) {
        if (!window.enhancedInventory) return;
        
        items.forEach(item => {
            const quantity = operation === 'subtract' ? -item.quantity : item.quantity;
            const reason = operation === 'subtract' ? 'Order sale' : 'Order cancellation';
            window.enhancedInventory.updateStock(item.id, quantity, reason);
        });
    }
    
    // Utility methods
    generateOrderId() {
        const timestamp = Date.now().toString();
        const random = Math.random().toString(36).substr(2, 4).toUpperCase();
        return `ORD-${timestamp.slice(-6)}${random}`;
    }
    
    generateTrackingNumber() {
        const prefix = 'AP'; // AutoParts
        const timestamp = Date.now().toString().slice(-8);
        const random = Math.random().toString(36).substr(2, 4).toUpperCase();
        return `${prefix}${timestamp}${random}`;
    }
    
    calculateEstimatedDelivery(shippingMethodId) {
        const method = this.shippingMethods.find(m => m.id === shippingMethodId);
        if (!method) return null;
        
        const now = new Date();
        let deliveryDate = new Date(now);
        
        switch (shippingMethodId) {
            case 'same_day':
                // Same day if ordered before 2 PM, otherwise next day
                if (now.getHours() >= 14) {
                    deliveryDate.setDate(deliveryDate.getDate() + 1);
                }
                break;
            case 'express':
                deliveryDate.setDate(deliveryDate.getDate() + 2);
                break;
            case 'standard':
                deliveryDate.setDate(deliveryDate.getDate() + 4);
                break;
            case 'pickup':
                deliveryDate.setDate(deliveryDate.getDate() + 1);
                break;
        }
        
        return deliveryDate.toISOString();
    }
    
    getStatusName(statusId) {
        const status = this.orderStatuses.find(s => s.id === statusId);
        return status ? status.name : statusId;
    }
    
    getPaymentMethodName(methodId) {
        const method = this.paymentMethods.find(m => m.id === methodId);
        return method ? method.name : methodId;
    }
    
    getShippingMethodName(methodId) {
        const method = this.shippingMethods.find(m => m.id === methodId);
        return method ? method.name : methodId;
    }
    
    // Notifications
    sendOrderNotification(order, type, data = {}) {
        // In a real system, this would send actual notifications
        console.log(`Order notification: ${type}`, { order: order.id, ...data });
        
        // Show in-app notification
        if (window.showNotification) {
            let message = '';
            switch (type) {
                case 'created':
                    message = `تم إنشاء الطلب #${order.id} بنجاح`;
                    break;
                case 'status_updated':
                    message = `تم تحديث حالة الطلب #${order.id} إلى ${this.getStatusName(data.newStatus)}`;
                    break;
            }
            
            if (message) {
                window.showNotification(message, 'success');
            }
        }
        
        // Send email/SMS in real system
        this.sendEmailNotification(order, type, data);
        this.sendSMSNotification(order, type, data);
    }
    
    sendEmailNotification(order, type, data) {
        // Simulate email sending
        console.log(`Email sent to ${order.customerInfo.email}:`, {
            type,
            orderId: order.id,
            ...data
        });
    }
    
    sendSMSNotification(order, type, data) {
        // Simulate SMS sending
        console.log(`SMS sent to ${order.customerInfo.phone}:`, {
            type,
            orderId: order.id,
            ...data
        });
    }
    
    // Event listeners
    setupEventListeners() {
        // Listen for inventory updates
        window.addEventListener('inventoryUpdated', (event) => {
            // Handle inventory changes that might affect orders
            console.log('Inventory updated:', event.detail);
        });
    }
    
    // Export orders
    exportOrders(format = 'json', filters = {}) {
        const orders = this.getOrders(filters);
        
        if (format === 'json') {
            return JSON.stringify(orders, null, 2);
        } else if (format === 'csv') {
            return this.convertOrdersToCSV(orders);
        }
        
        return orders;
    }
    
    convertOrdersToCSV(orders) {
        const headers = [
            'Order ID', 'Date', 'Customer', 'Email', 'Phone', 
            'Items', 'Subtotal', 'Shipping', 'Total', 'Status', 
            'Payment Method', 'Payment Status'
        ];
        
        const csvContent = [
            headers.join(','),
            ...orders.map(order => [
                order.id,
                new Date(order.createdAt).toLocaleDateString(),
                `"${order.customerInfo.name}"`,
                order.customerInfo.email,
                order.customerInfo.phone,
                order.items.length,
                order.subtotal,
                order.shipping,
                order.total,
                order.status,
                order.paymentMethod,
                order.paymentStatus
            ].join(','))
        ].join('\n');
        
        return csvContent;
    }
    
    // Order validation
    validateOrder(orderData) {
        const errors = [];
        
        if (!orderData.customerInfo || !orderData.customerInfo.name) {
            errors.push('اسم العميل مطلوب');
        }
        
        if (!orderData.customerInfo || !orderData.customerInfo.phone) {
            errors.push('رقم الهاتف مطلوب');
        }
        
        if (!orderData.items || orderData.items.length === 0) {
            errors.push('يجب إضافة منتجات للطلب');
        }
        
        if (!orderData.shippingAddress) {
            errors.push('عنوان الشحن مطلوب');
        }
        
        if (!orderData.paymentMethod) {
            errors.push('طريقة الدفع مطلوبة');
        }
        
        // Validate items availability
        if (orderData.items && window.enhancedInventory) {
            orderData.items.forEach(item => {
                const part = window.enhancedInventory.getPartById(item.id);
                if (!part) {
                    errors.push(`المنتج ${item.name} غير موجود`);
                } else if (part.stock < item.quantity) {
                    errors.push(`المخزون غير كافي للمنتج ${item.name} (متوفر: ${part.stock})`);
                }
            });
        }
        
        return errors;
    }
    
    // Calculate order totals
    calculateOrderTotals(items, shippingMethodId, discountCode = null) {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Get shipping cost
        const shippingMethod = this.shippingMethods.find(m => m.id === shippingMethodId);
        const shipping = shippingMethod ? shippingMethod.price : 0;
        
        // Calculate tax (14% VAT in Egypt)
        const tax = subtotal * 0.14;
        
        // Apply discount
        let discount = 0;
        if (discountCode) {
            discount = this.calculateDiscount(subtotal, discountCode);
        }
        
        const total = subtotal + shipping + tax - discount;
        
        return {
            subtotal,
            shipping,
            tax,
            discount,
            total: Math.max(0, total)
        };
    }
    
    calculateDiscount(subtotal, discountCode) {
        // Simple discount system - in real app, this would be more complex
        const discounts = {
            'WELCOME10': { type: 'percentage', value: 10, minOrder: 500 },
            'SAVE50': { type: 'fixed', value: 50, minOrder: 200 },
            'NEWCUSTOMER': { type: 'percentage', value: 15, minOrder: 1000 }
        };
        
        const discount = discounts[discountCode];
        if (!discount || subtotal < discount.minOrder) {
            return 0;
        }
        
        if (discount.type === 'percentage') {
            return subtotal * (discount.value / 100);
        } else {
            return discount.value;
        }
    }
}

// Initialize enhanced order manager
document.addEventListener('DOMContentLoaded', () => {
    window.enhancedOrders = new EnhancedOrderManager();
});

// Export for global use
window.EnhancedOrderManager = EnhancedOrderManager;