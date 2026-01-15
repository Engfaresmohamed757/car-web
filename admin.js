// Admin Panel Management
class AdminPanel {
    constructor() {
        this.isVisible = false;
        this.currentView = 'dashboard';
        this.init();
    }
    
    init() {
        this.createAdminPanel();
        this.setupEventListeners();
    }
    
    createAdminPanel() {
        // Create admin panel HTML
        const adminHTML = `
            <div id="admin-panel" class="admin-panel" style="display: none;">
                <div class="admin-overlay" onclick="adminPanel.hide()"></div>
                <div class="admin-content">
                    <div class="admin-header">
                        <h2 data-translate="admin.title">Admin Dashboard</h2>
                        <button class="admin-close" onclick="adminPanel.hide()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="admin-nav">
                        <button class="admin-nav-btn active" data-view="dashboard">
                            <i class="fas fa-tachometer-alt"></i>
                            <span>Dashboard</span>
                        </button>
                        <button class="admin-nav-btn" data-view="products">
                            <i class="fas fa-box"></i>
                            <span data-translate="admin.products">Products</span>
                        </button>
                        <button class="admin-nav-btn" data-view="orders">
                            <i class="fas fa-shopping-bag"></i>
                            <span data-translate="admin.orders">Orders</span>
                        </button>
                        <button class="admin-nav-btn" data-view="inventory">
                            <i class="fas fa-warehouse"></i>
                            <span data-translate="admin.inventory">Inventory</span>
                        </button>
                    </div>
                    
                    <div class="admin-body">
                        <div id="admin-dashboard" class="admin-view active">
                            ${this.createDashboardHTML()}
                        </div>
                        <div id="admin-products" class="admin-view">
                            ${this.createProductsHTML()}
                        </div>
                        <div id="admin-orders" class="admin-view">
                            ${this.createOrdersHTML()}
                        </div>
                        <div id="admin-inventory" class="admin-view">
                            ${this.createInventoryHTML()}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', adminHTML);
        this.addAdminStyles();
    }
    
    createDashboardHTML() {
        return `
            <div class="dashboard-stats">
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-box"></i>
                    </div>
                    <div class="stat-info">
                        <div class="stat-number" id="total-products">0</div>
                        <div class="stat-label">Total Products</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-shopping-bag"></i>
                    </div>
                    <div class="stat-info">
                        <div class="stat-number" id="total-orders">0</div>
                        <div class="stat-label">Total Orders</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <div class="stat-info">
                        <div class="stat-number" id="low-stock-count">0</div>
                        <div class="stat-label">Low Stock Items</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-dollar-sign"></i>
                    </div>
                    <div class="stat-info">
                        <div class="stat-number" id="total-value">0</div>
                        <div class="stat-label">Inventory Value</div>
                    </div>
                </div>
            </div>
            
            <div class="dashboard-charts">
                <div class="chart-container">
                    <h3>Stock Levels</h3>
                    <div id="stock-chart" class="chart"></div>
                </div>
                <div class="chart-container">
                    <h3>Recent Orders</h3>
                    <div id="orders-list" class="recent-orders"></div>
                </div>
            </div>
        `;
    }
    
    createProductsHTML() {
        return `
            <div class="products-header">
                <h3>Product Management</h3>
                <button class="btn btn-primary" onclick="adminPanel.showAddProductForm()">
                    <i class="fas fa-plus"></i>
                    Add Product
                </button>
            </div>
            
            <div class="products-filters">
                <input type="text" id="product-search" placeholder="Search products..." class="form-input">
                <select id="product-category-filter" class="form-select">
                    <option value="">All Categories</option>
                    <option value="engine">Engine</option>
                    <option value="brakes">Brakes</option>
                    <option value="suspension">Suspension</option>
                    <option value="electrical">Electrical</option>
                    <option value="body">Body Parts</option>
                </select>
            </div>
            
            <div class="products-table">
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="products-tbody">
                        <!-- Products will be loaded here -->
                    </tbody>
                </table>
            </div>
            
            <!-- Add/Edit Product Modal -->
            <div id="product-modal" class="modal" style="display: none;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 id="product-modal-title">Add Product</h3>
                        <button class="modal-close" onclick="adminPanel.hideProductModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form id="product-form" class="modal-body">
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" id="product-name" class="form-input" required>
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <textarea id="product-description" class="form-textarea"></textarea>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Category</label>
                                <select id="product-category" class="form-select" required>
                                    <option value="">Select Category</option>
                                    <option value="engine">Engine</option>
                                    <option value="brakes">Brakes</option>
                                    <option value="suspension">Suspension</option>
                                    <option value="electrical">Electrical</option>
                                    <option value="body">Body Parts</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Brand</label>
                                <select id="product-brand" class="form-select" required>
                                    <option value="">Select Brand</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Model</label>
                                <select id="product-model" class="form-select" required>
                                    <option value="">Select Model</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Part Number</label>
                                <input type="text" id="product-part-number" class="form-input">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Price (EGP)</label>
                                <input type="number" id="product-price" class="form-input" min="0" step="0.01" required>
                            </div>
                            <div class="form-group">
                                <label>Stock Quantity</label>
                                <input type="number" id="product-stock" class="form-input" min="0" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Icon Class</label>
                            <input type="text" id="product-image" class="form-input" placeholder="fas fa-cog">
                        </div>
                    </form>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onclick="adminPanel.hideProductModal()">Cancel</button>
                        <button type="submit" form="product-form" class="btn btn-primary">Save Product</button>
                    </div>
                </div>
            </div>
        `;
    }
    
    createOrdersHTML() {
        return `
            <div class="orders-header">
                <h3>Order Management</h3>
                <div class="orders-filters">
                    <select id="order-status-filter" class="form-select">
                        <option value="">All Orders</option>
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>
            
            <div class="orders-table">
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="orders-tbody">
                        <!-- Orders will be loaded here -->
                    </tbody>
                </table>
            </div>
        `;
    }
    
    createInventoryHTML() {
        return `
            <div class="inventory-header">
                <h3>Inventory Management</h3>
                <button class="btn btn-warning" onclick="adminPanel.checkLowStock()">
                    <i class="fas fa-exclamation-triangle"></i>
                    Check Low Stock
                </button>
            </div>
            
            <div class="inventory-stats">
                <div class="inventory-stat">
                    <div class="stat-label">Total Items</div>
                    <div class="stat-value" id="inventory-total">0</div>
                </div>
                <div class="inventory-stat">
                    <div class="stat-label">In Stock</div>
                    <div class="stat-value" id="inventory-in-stock">0</div>
                </div>
                <div class="inventory-stat">
                    <div class="stat-label">Low Stock</div>
                    <div class="stat-value" id="inventory-low-stock">0</div>
                </div>
                <div class="inventory-stat">
                    <div class="stat-label">Out of Stock</div>
                    <div class="stat-value" id="inventory-out-stock">0</div>
                </div>
            </div>
            
            <div class="inventory-table">
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Current Stock</th>
                            <th>Status</th>
                            <th>Value</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="inventory-tbody">
                        <!-- Inventory will be loaded here -->
                    </tbody>
                </table>
            </div>
            
            <!-- Stock Update Modal -->
            <div id="stock-modal" class="modal" style="display: none;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Update Stock</h3>
                        <button class="modal-close" onclick="adminPanel.hideStockModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>Product</label>
                            <div id="stock-product-name" class="form-display"></div>
                        </div>
                        <div class="form-group">
                            <label>Current Stock</label>
                            <div id="stock-current" class="form-display"></div>
                        </div>
                        <div class="form-group">
                            <label>Adjustment</label>
                            <input type="number" id="stock-adjustment" class="form-input" placeholder="Enter positive or negative number">
                            <small>Enter positive number to add stock, negative to reduce</small>
                        </div>
                        <div class="form-group">
                            <label>New Stock (Preview)</label>
                            <div id="stock-preview" class="form-display">0</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onclick="adminPanel.hideStockModal()">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="adminPanel.updateStock()">Update Stock</button>
                    </div>
                </div>
            </div>
        `;
    }
    
    addAdminStyles() {
        const styles = `
            <style>
                .admin-panel {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .admin-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                }
                
                .admin-content {
                    position: relative;
                    width: 95%;
                    max-width: 1200px;
                    height: 90%;
                    background: var(--bg-color);
                    border-radius: 12px;
                    display: flex;
                    flex-direction: column;
                    box-shadow: var(--shadow-lg);
                }
                
                .admin-header {
                    padding: var(--spacing-4);
                    border-bottom: 1px solid var(--border-color);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .admin-close {
                    background: none;
                    border: none;
                    font-size: var(--font-size-xl);
                    color: var(--text-secondary);
                    cursor: pointer;
                    padding: var(--spacing-2);
                }
                
                .admin-nav {
                    display: flex;
                    border-bottom: 1px solid var(--border-color);
                    background: var(--surface-color);
                }
                
                .admin-nav-btn {
                    background: none;
                    border: none;
                    padding: var(--spacing-4);
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-2);
                    cursor: pointer;
                    color: var(--text-secondary);
                    transition: var(--transition);
                    border-bottom: 3px solid transparent;
                }
                
                .admin-nav-btn:hover,
                .admin-nav-btn.active {
                    color: var(--primary-color);
                    border-bottom-color: var(--primary-color);
                    background: var(--bg-color);
                }
                
                .admin-body {
                    flex: 1;
                    overflow: hidden;
                    position: relative;
                }
                
                .admin-view {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    padding: var(--spacing-4);
                    overflow-y: auto;
                    display: none;
                }
                
                .admin-view.active {
                    display: block;
                }
                
                .dashboard-stats {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: var(--spacing-4);
                    margin-bottom: var(--spacing-6);
                }
                
                .stat-card {
                    background: var(--surface-color);
                    padding: var(--spacing-4);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-3);
                    box-shadow: var(--shadow);
                }
                
                .stat-icon {
                    width: 60px;
                    height: 60px;
                    background: var(--primary-color);
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: var(--font-size-xl);
                }
                
                .stat-number {
                    font-size: var(--font-size-2xl);
                    font-weight: 700;
                    color: var(--text-primary);
                }
                
                .stat-label {
                    color: var(--text-secondary);
                    font-size: var(--font-size-sm);
                }
                
                .dashboard-charts {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: var(--spacing-4);
                }
                
                .chart-container {
                    background: var(--surface-color);
                    padding: var(--spacing-4);
                    border-radius: 8px;
                    box-shadow: var(--shadow);
                }
                
                .products-header,
                .orders-header,
                .inventory-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: var(--spacing-4);
                }
                
                .products-filters {
                    display: flex;
                    gap: var(--spacing-3);
                    margin-bottom: var(--spacing-4);
                }
                
                .form-input,
                .form-select,
                .form-textarea {
                    width: 100%;
                    padding: var(--spacing-2);
                    border: 1px solid var(--border-color);
                    border-radius: 6px;
                    background: var(--bg-color);
                    color: var(--text-primary);
                    font-size: var(--font-size-sm);
                }
                
                .form-textarea {
                    min-height: 80px;
                    resize: vertical;
                }
                
                .btn {
                    padding: var(--spacing-2) var(--spacing-4);
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: var(--transition);
                    display: inline-flex;
                    align-items: center;
                    gap: var(--spacing-2);
                }
                
                .btn-primary {
                    background: var(--primary-color);
                    color: white;
                }
                
                .btn-primary:hover {
                    background: #b91c1c;
                }
                
                .btn-secondary {
                    background: var(--text-secondary);
                    color: white;
                }
                
                .btn-warning {
                    background: #f59e0b;
                    color: white;
                }
                
                .btn-danger {
                    background: #ef4444;
                    color: white;
                }
                
                .products-table,
                .orders-table,
                .inventory-table {
                    background: var(--surface-color);
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: var(--shadow);
                }
                
                .products-table table,
                .orders-table table,
                .inventory-table table {
                    width: 100%;
                    border-collapse: collapse;
                }
                
                .products-table th,
                .orders-table th,
                .inventory-table th {
                    background: var(--primary-color);
                    color: white;
                    padding: var(--spacing-3);
                    text-align: left;
                    font-weight: 600;
                }
                
                .products-table td,
                .orders-table td,
                .inventory-table td {
                    padding: var(--spacing-3);
                    border-bottom: 1px solid var(--border-color);
                }
                
                .modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 10001;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .modal-content {
                    background: var(--bg-color);
                    border-radius: 8px;
                    width: 90%;
                    max-width: 600px;
                    max-height: 90%;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }
                
                .modal-header {
                    padding: var(--spacing-4);
                    border-bottom: 1px solid var(--border-color);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .modal-body {
                    padding: var(--spacing-4);
                    overflow-y: auto;
                    flex: 1;
                }
                
                .modal-footer {
                    padding: var(--spacing-4);
                    border-top: 1px solid var(--border-color);
                    display: flex;
                    justify-content: flex-end;
                    gap: var(--spacing-2);
                }
                
                .form-group {
                    margin-bottom: var(--spacing-4);
                }
                
                .form-group label {
                    display: block;
                    margin-bottom: var(--spacing-1);
                    font-weight: 500;
                    color: var(--text-primary);
                }
                
                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: var(--spacing-3);
                }
                
                .inventory-stats {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: var(--spacing-3);
                    margin-bottom: var(--spacing-4);
                }
                
                .inventory-stat {
                    background: var(--surface-color);
                    padding: var(--spacing-3);
                    border-radius: 6px;
                    text-align: center;
                }
                
                .inventory-stat .stat-label {
                    font-size: var(--font-size-sm);
                    color: var(--text-secondary);
                    margin-bottom: var(--spacing-1);
                }
                
                .inventory-stat .stat-value {
                    font-size: var(--font-size-xl);
                    font-weight: 700;
                    color: var(--primary-color);
                }
                
                .status-badge {
                    padding: var(--spacing-1) var(--spacing-2);
                    border-radius: 4px;
                    font-size: var(--font-size-xs);
                    font-weight: 600;
                    text-transform: uppercase;
                }
                
                .status-pending {
                    background: #fef3c7;
                    color: #92400e;
                }
                
                .status-shipped {
                    background: #dbeafe;
                    color: #1e40af;
                }
                
                .status-delivered {
                    background: #d1fae5;
                    color: #065f46;
                }
                
                .status-cancelled {
                    background: #fee2e2;
                    color: #991b1b;
                }
                
                .stock-status {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-1);
                }
                
                .stock-indicator {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                }
                
                .stock-in {
                    background: #10b981;
                }
                
                .stock-low {
                    background: #f59e0b;
                }
                
                .stock-out {
                    background: #ef4444;
                }
                
                @media (max-width: 768px) {
                    .admin-content {
                        width: 100%;
                        height: 100%;
                        border-radius: 0;
                    }
                    
                    .dashboard-charts {
                        grid-template-columns: 1fr;
                    }
                    
                    .form-row {
                        grid-template-columns: 1fr;
                    }
                    
                    .products-filters {
                        flex-direction: column;
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }
    
    setupEventListeners() {
        // Navigation
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('admin-nav-btn')) {
                const view = e.target.dataset.view;
                this.switchView(view);
            }
        });
        
        // Product form
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'product-form') {
                e.preventDefault();
                this.saveProduct();
            }
        });
        
        // Stock adjustment preview
        document.addEventListener('input', (e) => {
            if (e.target.id === 'stock-adjustment') {
                this.updateStockPreview();
            }
        });
        
        // Brand/Model cascading
        document.addEventListener('change', (e) => {
            if (e.target.id === 'product-brand') {
                this.loadModelsForBrand(e.target.value);
            }
        });
    }
    
    show() {
        const panel = document.getElementById('admin-panel');
        if (panel) {
            panel.style.display = 'flex';
            this.isVisible = true;
            this.loadDashboard();
            document.body.style.overflow = 'hidden';
        }
    }
    
    hide() {
        const panel = document.getElementById('admin-panel');
        if (panel) {
            panel.style.display = 'none';
            this.isVisible = false;
            document.body.style.overflow = '';
        }
    }
    
    switchView(view) {
        // Update navigation
        document.querySelectorAll('.admin-nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-view="${view}"]`).classList.add('active');
        
        // Update views
        document.querySelectorAll('.admin-view').forEach(viewEl => {
            viewEl.classList.remove('active');
        });
        document.getElementById(`admin-${view}`).classList.add('active');
        
        this.currentView = view;
        
        // Load data for the view
        switch (view) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'products':
                this.loadProducts();
                break;
            case 'orders':
                this.loadOrders();
                break;
            case 'inventory':
                this.loadInventory();
                break;
        }
    }
    
    loadDashboard() {
        const stats = inventoryManager.getStockStatistics();
        const orders = orderManager.getOrders();
        
        // Update stats
        document.getElementById('total-products').textContent = stats.total;
        document.getElementById('total-orders').textContent = orders.length;
        document.getElementById('low-stock-count').textContent = stats.lowStock;
        document.getElementById('total-value').textContent = translationManager.formatCurrency(stats.totalValue);
        
        // Load recent orders
        this.loadRecentOrders();
    }
    
    loadRecentOrders() {
        const container = document.getElementById('orders-list');
        const orders = orderManager.getOrders().slice(0, 5);
        
        if (orders.length === 0) {
            container.innerHTML = '<p>No recent orders</p>';
            return;
        }
        
        container.innerHTML = orders.map(order => `
            <div class="recent-order">
                <div class="order-info">
                    <strong>#${order.id}</strong>
                    <span>${translationManager.formatDate(order.createdAt)}</span>
                </div>
                <div class="order-total">${translationManager.formatCurrency(order.total)}</div>
                <div class="status-badge status-${order.status}">${order.status}</div>
            </div>
        `).join('');
    }
    
    loadProducts() {
        const tbody = document.getElementById('products-tbody');
        const parts = inventoryManager.getParts();
        
        // Load brands for form
        this.loadBrandsForForm();
        
        tbody.innerHTML = parts.map(part => `
            <tr>
                <td><i class="${part.image}"></i></td>
                <td>${part.name}</td>
                <td>${part.category}</td>
                <td>${part.brand}</td>
                <td>${translationManager.formatCurrency(part.price)}</td>
                <td>
                    <div class="stock-status">
                        <span class="stock-indicator ${part.stock > 5 ? 'stock-in' : part.stock > 0 ? 'stock-low' : 'stock-out'}"></span>
                        ${part.stock}
                    </div>
                </td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="adminPanel.editProduct('${part.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="adminPanel.deleteProduct('${part.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }
    
    loadOrders() {
        const tbody = document.getElementById('orders-tbody');
        const orders = orderManager.getOrders();
        
        tbody.innerHTML = orders.map(order => `
            <tr>
                <td>#${order.id}</td>
                <td>${translationManager.formatDate(order.createdAt)}</td>
                <td>${order.items.length} items</td>
                <td>${translationManager.formatCurrency(order.total)}</td>
                <td>
                    <select class="form-select" onchange="adminPanel.updateOrderStatus('${order.id}', this.value)">
                        <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                        <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                        <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="adminPanel.viewOrder('${order.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }
    
    loadInventory() {
        const stats = inventoryManager.getStockStatistics();
        
        // Update inventory stats
        document.getElementById('inventory-total').textContent = stats.total;
        document.getElementById('inventory-in-stock').textContent = stats.inStock;
        document.getElementById('inventory-low-stock').textContent = stats.lowStock;
        document.getElementById('inventory-out-stock').textContent = stats.outOfStock;
        
        // Load inventory table
        const tbody = document.getElementById('inventory-tbody');
        const parts = inventoryManager.getParts();
        
        tbody.innerHTML = parts.map(part => {
            const status = part.stock === 0 ? 'Out of Stock' : 
                          part.stock <= 5 ? 'Low Stock' : 'In Stock';
            const statusClass = part.stock === 0 ? 'stock-out' : 
                               part.stock <= 5 ? 'stock-low' : 'stock-in';
            
            return `
                <tr>
                    <td>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <i class="${part.image}"></i>
                            <div>
                                <div>${part.name}</div>
                                <small>${part.partNumber || 'N/A'}</small>
                            </div>
                        </div>
                    </td>
                    <td>${part.stock}</td>
                    <td>
                        <div class="stock-status">
                            <span class="stock-indicator ${statusClass}"></span>
                            ${status}
                        </div>
                    </td>
                    <td>${translationManager.formatCurrency(part.price * part.stock)}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="adminPanel.showStockModal('${part.id}')">
                            <i class="fas fa-edit"></i> Update
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }
    
    loadBrandsForForm() {
        const brandSelect = document.getElementById('product-brand');
        if (brandSelect) {
            brandSelect.innerHTML = '<option value="">Select Brand</option>' +
                carBrands.map(brand => `<option value="${brand.id}">${brand.name}</option>`).join('');
        }
    }
    
    loadModelsForBrand(brandId) {
        const modelSelect = document.getElementById('product-model');
        const brand = carBrands.find(b => b.id === brandId);
        
        if (modelSelect && brand) {
            modelSelect.innerHTML = '<option value="">Select Model</option>' +
                brand.models.map(model => `<option value="${model.id}">${model.name}</option>`).join('');
        }
    }
    
    showAddProductForm() {
        document.getElementById('product-modal-title').textContent = 'Add Product';
        document.getElementById('product-form').reset();
        document.getElementById('product-modal').style.display = 'flex';
        this.currentProductId = null;
    }
    
    editProduct(productId) {
        const product = inventoryManager.getPartById(productId);
        if (!product) return;
        
        document.getElementById('product-modal-title').textContent = 'Edit Product';
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-description').value = product.description || '';
        document.getElementById('product-category').value = product.category;
        document.getElementById('product-brand').value = product.brand;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-stock').value = product.stock;
        document.getElementById('product-image').value = product.image;
        document.getElementById('product-part-number').value = product.partNumber || '';
        
        // Load models for selected brand
        this.loadModelsForBrand(product.brand);
        setTimeout(() => {
            document.getElementById('product-model').value = product.model;
        }, 100);
        
        document.getElementById('product-modal').style.display = 'flex';
        this.currentProductId = productId;
    }
    
    hideProductModal() {
        document.getElementById('product-modal').style.display = 'none';
        this.currentProductId = null;
    }
    
    saveProduct() {
        const formData = {
            name: document.getElementById('product-name').value,
            description: document.getElementById('product-description').value,
            category: document.getElementById('product-category').value,
            brand: document.getElementById('product-brand').value,
            model: document.getElementById('product-model').value,
            price: parseFloat(document.getElementById('product-price').value),
            stock: parseInt(document.getElementById('product-stock').value),
            image: document.getElementById('product-image').value,
            partNumber: document.getElementById('product-part-number').value
        };
        
        if (this.currentProductId) {
            // Update existing product
            inventoryManager.updatePart(this.currentProductId, formData);
            showNotification('Product updated successfully', 'success');
        } else {
            // Add new product
            inventoryManager.addPart(formData);
            showNotification('Product added successfully', 'success');
        }
        
        this.hideProductModal();
        this.loadProducts();
        
        // Trigger inventory update event
        window.dispatchEvent(new CustomEvent('inventoryUpdated'));
    }
    
    deleteProduct(productId) {
        if (confirm('Are you sure you want to delete this product?')) {
            inventoryManager.deletePart(productId);
            showNotification('Product deleted successfully', 'success');
            this.loadProducts();
            
            // Trigger inventory update event
            window.dispatchEvent(new CustomEvent('inventoryUpdated'));
        }
    }
    
    updateOrderStatus(orderId, status) {
        orderManager.updateOrderStatus(orderId, status);
        showNotification('Order status updated', 'success');
    }
    
    showStockModal(productId) {
        const product = inventoryManager.getPartById(productId);
        if (!product) return;
        
        document.getElementById('stock-product-name').textContent = product.name;
        document.getElementById('stock-current').textContent = product.stock;
        document.getElementById('stock-adjustment').value = '';
        document.getElementById('stock-preview').textContent = product.stock;
        
        document.getElementById('stock-modal').style.display = 'flex';
        this.currentStockProductId = productId;
    }
    
    hideStockModal() {
        document.getElementById('stock-modal').style.display = 'none';
        this.currentStockProductId = null;
    }
    
    updateStockPreview() {
        const product = inventoryManager.getPartById(this.currentStockProductId);
        const adjustment = parseInt(document.getElementById('stock-adjustment').value) || 0;
        const newStock = Math.max(0, product.stock + adjustment);
        
        document.getElementById('stock-preview').textContent = newStock;
    }
    
    updateStock() {
        const adjustment = parseInt(document.getElementById('stock-adjustment').value) || 0;
        
        if (adjustment === 0) {
            showNotification('Please enter an adjustment value', 'warning');
            return;
        }
        
        inventoryManager.updateStock(this.currentStockProductId, adjustment);
        showNotification('Stock updated successfully', 'success');
        
        this.hideStockModal();
        this.loadInventory();
        
        // Trigger inventory update event
        window.dispatchEvent(new CustomEvent('inventoryUpdated'));
    }
    
    checkLowStock() {
        const lowStockParts = inventoryManager.getLowStockParts();
        
        if (lowStockParts.length === 0) {
            showNotification('No low stock items found', 'success');
            return;
        }
        
        const message = `Found ${lowStockParts.length} low stock items:\n` +
            lowStockParts.map(part => `• ${part.name} (${part.stock} remaining)`).join('\n');
        
        alert(message);
    }
}

// Initialize admin panel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.adminPanel = new AdminPanel();
});

// Export for global use
window.AdminPanel = AdminPanel;