// Customer Management System for AutoParts Egypt
class CustomerManagement {
    constructor() {
        this.customers = [];
        this.customerSegments = [
            { id: 'new', name: 'عملاء جدد', color: '#3b82f6' },
            { id: 'regular', name: 'عملاء منتظمون', color: '#10b981' },
            { id: 'vip', name: 'عملاء مميزون', color: '#f59e0b' },
            { id: 'inactive', name: 'عملاء غير نشطين', color: '#6b7280' }
        ];
        this.loyaltyProgram = {
            enabled: true,
            pointsPerEGP: 1, // 1 point per EGP spent
            redemptionRate: 0.01, // 1 point = 0.01 EGP
            tiers: [
                { name: 'برونزي', minPoints: 0, discount: 0, color: '#cd7f32' },
                { name: 'فضي', minPoints: 1000, discount: 5, color: '#c0c0c0' },
                { name: 'ذهبي', minPoints: 5000, discount: 10, color: '#ffd700' },
                { name: 'بلاتيني', minPoints: 15000, discount: 15, color: '#e5e4e2' }
            ]
        };
        this.init();
    }
    
    init() {
        this.loadCustomers();
        this.setupEventListeners();
    }
    
    loadCustomers() {
        // Load from auth system users
        if (window.auth && window.auth.users) {
            this.customers = window.auth.users.map(user => ({
                ...user,
                segment: this.calculateCustomerSegment(user),
                loyaltyTier: this.calculateLoyaltyTier(user.loyaltyPoints || 0),
                lifetimeValue: user.totalSpent || 0,
                lastOrderDate: this.getLastOrderDate(user.id),
                orderCount: this.getOrderCount(user.id),
                averageOrderValue: this.getAverageOrderValue(user.id)
            }));
        }
    }
    
    calculateCustomerSegment(customer) {
        const daysSinceLastOrder = this.getDaysSinceLastOrder(customer.id);
        const orderCount = this.getOrderCount(customer.id);
        const totalSpent = customer.totalSpent || 0;
        
        if (orderCount === 0) return 'new';
        if (daysSinceLastOrder > 180) return 'inactive';
        if (totalSpent > 10000 || orderCount > 20) return 'vip';
        if (orderCount > 3) return 'regular';
        return 'new';
    }
    
    calculateLoyaltyTier(points) {
        const tiers = this.loyaltyProgram.tiers;
        for (let i = tiers.length - 1; i >= 0; i--) {
            if (points >= tiers[i].minPoints) {
                return tiers[i];
            }
        }
        return tiers[0];
    }
    
    getLastOrderDate(customerId) {
        if (!window.enhancedOrders) return null;
        const orders = window.enhancedOrders.getOrders({ customerId });
        if (orders.length === 0) return null;
        return orders[0].createdAt; // Orders are sorted by date desc
    }
    
    getOrderCount(customerId) {
        if (!window.enhancedOrders) return 0;
        return window.enhancedOrders.getOrders({ customerId }).length;
    }
    
    getAverageOrderValue(customerId) {
        if (!window.enhancedOrders) return 0;
        const orders = window.enhancedOrders.getOrders({ customerId });
        if (orders.length === 0) return 0;
        const total = orders.reduce((sum, order) => sum + order.total, 0);
        return total / orders.length;
    }
    
    getDaysSinceLastOrder(customerId) {
        const lastOrderDate = this.getLastOrderDate(customerId);
        if (!lastOrderDate) return Infinity;
        const now = new Date();
        const lastOrder = new Date(lastOrderDate);
        return Math.floor((now - lastOrder) / (1000 * 60 * 60 * 24));
    }
    
    // Customer CRUD operations
    getCustomers(filters = {}) {
        let filtered = [...this.customers];
        
        if (filters.segment) {
            filtered = filtered.filter(customer => customer.segment === filters.segment);
        }
        
        if (filters.loyaltyTier) {
            filtered = filtered.filter(customer => customer.loyaltyTier.name === filters.loyaltyTier);
        }
        
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filtered = filtered.filter(customer => 
                customer.firstName.toLowerCase().includes(searchTerm) ||
                customer.lastName.toLowerCase().includes(searchTerm) ||
                customer.email.toLowerCase().includes(searchTerm) ||
                customer.phone.includes(searchTerm)
            );
        }
        
        if (filters.dateFrom) {
            filtered = filtered.filter(customer => 
                new Date(customer.createdAt) >= new Date(filters.dateFrom)
            );
        }
        
        if (filters.dateTo) {
            filtered = filtered.filter(customer => 
                new Date(customer.createdAt) <= new Date(filters.dateTo)
            );
        }
        
        // Sorting
        if (filters.sortBy) {
            filtered.sort((a, b) => {
                switch (filters.sortBy) {
                    case 'name':
                        return a.firstName.localeCompare(b.firstName);
                    case 'email':
                        return a.email.localeCompare(b.email);
                    case 'totalSpent':
                        return (b.totalSpent || 0) - (a.totalSpent || 0);
                    case 'orderCount':
                        return b.orderCount - a.orderCount;
                    case 'lastOrder':
                        return new Date(b.lastOrderDate || 0) - new Date(a.lastOrderDate || 0);
                    case 'joinDate':
                        return new Date(b.createdAt) - new Date(a.createdAt);
                    default:
                        return 0;
                }
            });
        }
        
        return filtered;
    }
    
    getCustomerById(customerId) {
        return this.customers.find(customer => customer.id === customerId);
    }
    
    updateCustomer(customerId, updates) {
        const customerIndex = this.customers.findIndex(c => c.id === customerId);
        if (customerIndex !== -1) {
            this.customers[customerIndex] = { ...this.customers[customerIndex], ...updates };
            
            // Update in auth system
            if (window.auth) {
                window.auth.updateUser(customerId, updates);
            }
            
            return this.customers[customerIndex];
        }
        return null;
    }
    
    // Loyalty program methods
    addLoyaltyPoints(customerId, points, reason = 'Purchase') {
        const customer = this.getCustomerById(customerId);
        if (!customer) return false;
        
        const newPoints = (customer.loyaltyPoints || 0) + points;
        const oldTier = customer.loyaltyTier;
        const newTier = this.calculateLoyaltyTier(newPoints);
        
        this.updateCustomer(customerId, { 
            loyaltyPoints: newPoints,
            loyaltyTier: newTier
        });
        
        // Check for tier upgrade
        if (newTier.name !== oldTier.name) {
            this.notifyTierUpgrade(customer, newTier);
        }
        
        // Log points transaction
        this.logPointsTransaction(customerId, points, reason);
        
        return true;
    }
    
    redeemLoyaltyPoints(customerId, points) {
        const customer = this.getCustomerById(customerId);
        if (!customer || (customer.loyaltyPoints || 0) < points) {
            return { success: false, error: 'نقاط غير كافية' };
        }
        
        const redemptionValue = points * this.loyaltyProgram.redemptionRate;
        const newPoints = customer.loyaltyPoints - points;
        
        this.updateCustomer(customerId, { loyaltyPoints: newPoints });
        this.logPointsTransaction(customerId, -points, 'Redemption');
        
        return { 
            success: true, 
            redemptionValue,
            remainingPoints: newPoints
        };
    }
    
    logPointsTransaction(customerId, points, reason) {
        // In a real system, this would be stored in a database
        console.log(`Points transaction: Customer ${customerId}, Points: ${points}, Reason: ${reason}`);
    }
    
    notifyTierUpgrade(customer, newTier) {
        if (window.showNotification) {
            window.showNotification(
                `تهانينا ${customer.firstName}! تم ترقيتك إلى مستوى ${newTier.name}`,
                'success'
            );
        }
    }
    
    // Customer analytics
    getCustomerStatistics() {
        const total = this.customers.length;
        const active = this.customers.filter(c => c.segment !== 'inactive').length;
        const newThisMonth = this.customers.filter(c => {
            const createdDate = new Date(c.createdAt);
            const now = new Date();
            return createdDate.getMonth() === now.getMonth() && 
                   createdDate.getFullYear() === now.getFullYear();
        }).length;
        
        // Segment breakdown
        const segmentBreakdown = {};
        this.customerSegments.forEach(segment => {
            segmentBreakdown[segment.id] = this.customers.filter(c => c.segment === segment.id).length;
        });
        
        // Loyalty tier breakdown
        const tierBreakdown = {};
        this.loyaltyProgram.tiers.forEach(tier => {
            tierBreakdown[tier.name] = this.customers.filter(c => c.loyaltyTier.name === tier.name).length;
        });
        
        // Average metrics
        const totalSpent = this.customers.reduce((sum, c) => sum + (c.totalSpent || 0), 0);
        const averageLifetimeValue = total > 0 ? totalSpent / total : 0;
        const averageOrderValue = this.customers.reduce((sum, c) => sum + c.averageOrderValue, 0) / total || 0;
        
        return {
            total,
            active,
            newThisMonth,
            segmentBreakdown,
            tierBreakdown,
            averageLifetimeValue,
            averageOrderValue,
            totalLifetimeValue: totalSpent
        };
    }
    
    getTopCustomers(limit = 10, metric = 'totalSpent') {
        return this.customers
            .sort((a, b) => (b[metric] || 0) - (a[metric] || 0))
            .slice(0, limit);
    }
    
    getCustomerRetentionRate(period = 'month') {
        // Calculate retention rate based on repeat purchases
        const now = new Date();
        let startDate;
        
        switch (period) {
            case 'week':
                startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                break;
            case 'month':
                startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
                break;
            case 'quarter':
                startDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
                break;
            case 'year':
                startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
                break;
        }
        
        const customersWithOrders = this.customers.filter(c => c.orderCount > 0);
        const returningCustomers = customersWithOrders.filter(c => {
            const lastOrderDate = new Date(c.lastOrderDate);
            return lastOrderDate >= startDate && c.orderCount > 1;
        });
        
        return customersWithOrders.length > 0 ? 
            (returningCustomers.length / customersWithOrders.length) * 100 : 0;
    }
    
    // Customer communication
    sendCustomerNotification(customerId, message, type = 'info') {
        const customer = this.getCustomerById(customerId);
        if (!customer) return false;
        
        // In a real system, this would send actual notifications
        console.log(`Notification to ${customer.email}: ${message}`);
        
        // Simulate email/SMS sending
        this.sendEmail(customer.email, message);
        if (customer.preferences?.notifications?.sms) {
            this.sendSMS(customer.phone, message);
        }
        
        return true;
    }
    
    sendEmail(email, message) {
        // Email service integration would go here
        console.log(`Email sent to ${email}: ${message}`);
    }
    
    sendSMS(phone, message) {
        // SMS service integration would go here
        console.log(`SMS sent to ${phone}: ${message}`);
    }
    
    // Customer segmentation for marketing
    getCustomersForMarketing(campaign) {
        switch (campaign.type) {
            case 'new_customer_welcome':
                return this.customers.filter(c => c.segment === 'new');
            case 'win_back':
                return this.customers.filter(c => c.segment === 'inactive');
            case 'vip_exclusive':
                return this.customers.filter(c => c.segment === 'vip');
            case 'birthday':
                return this.customers.filter(c => this.isBirthdayThisMonth(c));
            case 'loyalty_reminder':
                return this.customers.filter(c => (c.loyaltyPoints || 0) > 500);
            default:
                return [];
        }
    }
    
    isBirthdayThisMonth(customer) {
        if (!customer.profile?.dateOfBirth) return false;
        const birthday = new Date(customer.profile.dateOfBirth);
        const now = new Date();
        return birthday.getMonth() === now.getMonth();
    }
    
    // Export customer data
    exportCustomerData(format = 'csv', filters = {}) {
        const customers = this.getCustomers(filters);
        
        if (format === 'csv') {
            return this.convertToCSV(customers);
        } else if (format === 'json') {
            return JSON.stringify(customers, null, 2);
        }
        
        return customers;
    }
    
    convertToCSV(customers) {
        const headers = [
            'ID', 'First Name', 'Last Name', 'Email', 'Phone', 
            'Join Date', 'Segment', 'Loyalty Tier', 'Loyalty Points',
            'Total Spent', 'Order Count', 'Last Order Date'
        ];
        
        const csvContent = [
            headers.join(','),
            ...customers.map(customer => [
                customer.id,
                `"${customer.firstName}"`,
                `"${customer.lastName}"`,
                customer.email,
                customer.phone,
                new Date(customer.createdAt).toLocaleDateString(),
                customer.segment,
                customer.loyaltyTier.name,
                customer.loyaltyPoints || 0,
                customer.totalSpent || 0,
                customer.orderCount,
                customer.lastOrderDate ? new Date(customer.lastOrderDate).toLocaleDateString() : 'N/A'
            ].join(','))
        ].join('\n');
        
        return csvContent;
    }
    
    setupEventListeners() {
        // Listen for new orders to update customer data
        window.addEventListener('orderCreated', (event) => {
            this.updateCustomerFromOrder(event.detail);
        });
        
        // Listen for user registration
        window.addEventListener('userRegistered', (event) => {
            this.loadCustomers(); // Refresh customer list
        });
    }
    
    updateCustomerFromOrder(order) {
        const customer = this.getCustomerById(order.customerId);
        if (!customer) return;
        
        // Update customer metrics
        const newTotalSpent = (customer.totalSpent || 0) + order.total;
        const newOrderCount = customer.orderCount + 1;
        const newAverageOrderValue = newTotalSpent / newOrderCount;
        
        // Add loyalty points
        const pointsEarned = Math.floor(order.total * this.loyaltyProgram.pointsPerEGP);
        
        this.updateCustomer(order.customerId, {
            totalSpent: newTotalSpent,
            orderCount: newOrderCount,
            averageOrderValue: newAverageOrderValue,
            lastOrderDate: order.createdAt,
            segment: this.calculateCustomerSegment({
                ...customer,
                totalSpent: newTotalSpent,
                orderCount: newOrderCount
            })
        });
        
        if (pointsEarned > 0) {
            this.addLoyaltyPoints(order.customerId, pointsEarned, 'Purchase');
        }
    }
}

// Initialize customer management
document.addEventListener('DOMContentLoaded', () => {
    window.customerManagement = new CustomerManagement();
});

// Export for global use
window.CustomerManagement = CustomerManagement;