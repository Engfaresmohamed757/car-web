// Shopping Cart Management
class ShoppingCart {
    constructor() {
        this.items = [];
        this.isOpen = false;
        this.loadFromStorage();
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateDisplay();
    }
    
    setupEventListeners() {
        // Cart toggle
        document.getElementById('cart-toggle')?.addEventListener('click', () => {
            this.toggle();
        });
        
        // Cart close
        document.getElementById('cart-close')?.addEventListener('click', () => {
            this.close();
        });
        
        // Checkout button
        document.getElementById('checkout-btn')?.addEventListener('click', () => {
            this.checkout();
        });
        
        // WhatsApp order button
        document.getElementById('whatsapp-order-btn')?.addEventListener('click', () => {
            this.orderViaWhatsApp();
        });
        
        // Close cart when clicking outside
        document.addEventListener('click', (e) => {
            const cartSidebar = document.getElementById('cart-sidebar');
            const cartToggle = document.getElementById('cart-toggle');
            
            if (this.isOpen && 
                !cartSidebar.contains(e.target) && 
                !cartToggle.contains(e.target)) {
                this.close();
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }
    
    loadFromStorage() {
        const stored = localStorage.getItem('autoparts_cart');
        if (stored) {
            this.items = JSON.parse(stored);
        }
    }
    
    saveToStorage() {
        localStorage.setItem('autoparts_cart', JSON.stringify(this.items));
    }
    
    addItem(partId, quantity = 1) {
        const part = inventoryManager.getPartById(partId);
        if (!part) {
            showNotification(t('notifications.error'), 'error');
            return false;
        }
        
        if (part.stock < quantity) {
            showNotification(t('cart.outOfStock'), 'error');
            return false;
        }
        
        const existingItem = this.items.find(item => item.partId === partId);
        
        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;
            if (part.stock < newQuantity) {
                showNotification(`Only ${part.stock} items available`, 'warning');
                return false;
            }
            existingItem.quantity = newQuantity;
        } else {
            this.items.push({
                partId,
                quantity,
                addedAt: new Date().toISOString()
            });
        }
        
        this.saveToStorage();
        this.updateDisplay();
        showNotification(t('notifications.addedToCart'), 'success');
        
        return true;
    }
    
    removeItem(partId) {
        this.items = this.items.filter(item => item.partId !== partId);
        this.saveToStorage();
        this.updateDisplay();
        showNotification(t('notifications.removedFromCart'), 'info');
    }
    
    updateQuantity(partId, quantity) {
        const item = this.items.find(item => item.partId === partId);
        const part = inventoryManager.getPartById(partId);
        
        if (!item || !part) return false;
        
        if (quantity <= 0) {
            this.removeItem(partId);
            return true;
        }
        
        if (quantity > part.stock) {
            showNotification(`Only ${part.stock} items available`, 'warning');
            return false;
        }
        
        item.quantity = quantity;
        this.saveToStorage();
        this.updateDisplay();
        
        return true;
    }
    
    clear() {
        this.items = [];
        this.saveToStorage();
        this.updateDisplay();
    }
    
    getTotal() {
        return this.items.reduce((total, item) => {
            const part = inventoryManager.getPartById(item.partId);
            return total + (part ? part.price * item.quantity : 0);
        }, 0);
    }
    
    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }
    
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
    
    open() {
        const sidebar = document.getElementById('cart-sidebar');
        if (sidebar) {
            sidebar.classList.add('open');
            this.isOpen = true;
            document.body.style.overflow = 'hidden';
        }
    }
    
    close() {
        const sidebar = document.getElementById('cart-sidebar');
        if (sidebar) {
            sidebar.classList.remove('open');
            this.isOpen = false;
            document.body.style.overflow = '';
        }
    }
    
    updateDisplay() {
        this.updateCartCount();
        this.updateCartItems();
        this.updateCartTotal();
    }
    
    updateCartCount() {
        const countElement = document.getElementById('cart-count');
        if (countElement) {
            const count = this.getItemCount();
            countElement.textContent = count;
            countElement.style.display = count > 0 ? 'flex' : 'none';
        }
    }
    
    updateCartItems() {
        const container = document.getElementById('cart-items');
        if (!container) return;
        
        if (this.items.length === 0) {
            container.innerHTML = `
                <div class="cart-empty">
                    <i class="fas fa-shopping-cart"></i>
                    <p>${t('cart.empty')}</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = '';
        
        this.items.forEach(item => {
            const part = inventoryManager.getPartById(item.partId);
            if (!part) return;
            
            const cartItem = this.createCartItemElement(item, part);
            container.appendChild(cartItem);
        });
    }
    
    createCartItemElement(item, part) {
        const element = document.createElement('div');
        element.className = 'cart-item';
        element.dataset.partId = item.partId;
        
        const price = translationManager.formatCurrency(part.price);
        const totalPrice = translationManager.formatCurrency(part.price * item.quantity);
        
        element.innerHTML = `
            <div class="cart-item-image">
                <i class="${part.image}"></i>
            </div>
            <div class="cart-item-info">
                <div class="cart-item-name">${part.name}</div>
                <div class="cart-item-price">${price} each</div>
                <div class="cart-item-total">${totalPrice}</div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="cart.updateQuantity('${item.partId}', ${item.quantity - 1})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <input type="number" class="quantity-input" value="${item.quantity}" 
                           min="1" max="${part.stock}"
                           onchange="cart.updateQuantity('${item.partId}', parseInt(this.value))">
                    <button class="quantity-btn" onclick="cart.updateQuantity('${item.partId}', ${item.quantity + 1})">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button class="remove-item-btn" onclick="cart.removeItem('${item.partId}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        
        return element;
    }
    
    updateCartTotal() {
        const totalElement = document.getElementById('cart-total-amount');
        if (totalElement) {
            const total = this.getTotal();
            totalElement.textContent = translationManager.formatCurrency(total);
        }
    }
    
    checkout() {
        if (this.items.length === 0) {
            showNotification('سلة التسوق فارغة', 'warning');
            return;
        }
        
        // Check if user is logged in
        if (window.auth && !auth.isLoggedIn()) {
            showNotification('يرجى تسجيل الدخول أولاً', 'warning');
            auth.showModal('login-modal');
            return;
        }
        
        // Prepare order data
        const orderData = {
            items: this.items.map(item => {
                const part = inventoryManager.getPartById(item.partId);
                return {
                    partId: item.partId,
                    partName: part.name,
                    quantity: item.quantity,
                    price: part.price,
                    total: part.price * item.quantity
                };
            }),
            total: this.getTotal(),
            customerInfo: this.getCustomerInfo()
        };
        
        // Show payment modal
        if (window.payment) {
            payment.showPaymentModal(orderData);
        } else {
            // Fallback to old checkout process
            const order = orderManager.createOrder(orderData);
            
            // Update inventory
            this.items.forEach(item => {
                inventoryManager.updateStock(item.partId, -item.quantity);
            });
            
            // Clear cart
            this.clear();
            this.close();
            
            showNotification(`${t('notifications.orderPlaced')} - Order #${order.id}`, 'success', 5000);
            
            // Reload parts to update stock display
            if (window.app) {
                app.loadParts();
            }
        }
    }
    
    getCustomerInfo() {
        // Get customer info from logged in user
        if (window.auth && auth.isLoggedIn()) {
            const user = auth.getCurrentUser();
            return {
                name: `${user.firstName} ${user.lastName}`,
                phone: user.phone || '+20 101 051 4741',
                address: user.addresses && user.addresses.length > 0 ? 
                        `${user.addresses[0].street}, ${user.addresses[0].city}` : 'Cairo, Egypt',
                email: user.email
            };
        }
        
        // Fallback for guest users
        return {
            name: 'Customer',
            phone: '+20 101 051 4741',
            address: 'Cairo, Egypt',
            email: 'customer@example.com'
        };
    }
    
    orderViaWhatsApp() {
        if (this.items.length === 0) {
            showNotification('Cart is empty', 'warning');
            return;
        }
        
        let message = `*AutoParts Egypt Order*\n\n`;
        message += `*Items:*\n`;
        
        this.items.forEach(item => {
            const part = inventoryManager.getPartById(item.partId);
            if (part) {
                message += `• ${part.name} x${item.quantity} - ${translationManager.formatCurrency(part.price * item.quantity)}\n`;
            }
        });
        
        message += `\n*Total: ${translationManager.formatCurrency(this.getTotal())}*\n\n`;
        message += `Please confirm this order and provide delivery details.`;
        
        const phoneNumber = '201010514741'; // Replace with actual WhatsApp number
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
        
        // Track the order
        this.checkout();
    }
    
    // Get cart summary for display
    getSummary() {
        return {
            itemCount: this.getItemCount(),
            total: this.getTotal(),
            items: this.items.map(item => {
                const part = inventoryManager.getPartById(item.partId);
                return {
                    ...item,
                    part
                };
            })
        };
    }
    
    // Validate cart items against current inventory
    validateCart() {
        let hasChanges = false;
        
        this.items = this.items.filter(item => {
            const part = inventoryManager.getPartById(item.partId);
            
            if (!part) {
                hasChanges = true;
                return false;
            }
            
            if (item.quantity > part.stock) {
                item.quantity = part.stock;
                hasChanges = true;
                
                if (item.quantity === 0) {
                    return false;
                }
            }
            
            return true;
        });
        
        if (hasChanges) {
            this.saveToStorage();
            this.updateDisplay();
            showNotification('Cart updated due to stock changes', 'info');
        }
    }
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cart = new ShoppingCart();
    
    // Validate cart on page load
    cart.validateCart();
    
    // Validate cart when inventory changes
    window.addEventListener('inventoryUpdated', () => {
        cart.validateCart();
    });
});

// Export for global use
window.ShoppingCart = ShoppingCart;