// Enhanced Admin Dashboard for AutoParts Egypt
class AdminDashboard {
    constructor() {
        this.currentUser = null;
        this.dashboardData = {};
        this.refreshInterval = null;
        this.init();
    }
    
    init() {
        this.checkAdminAccess();
        this.createDashboard();
        this.setupEventListeners();
        this.startAutoRefresh();
    }
    
    checkAdminAccess() {
        const user = window.auth?.getCurrentUser();
        if (!user || user.role !== 'admin') {
            // Hide admin features for non-admin users
            const adminBtn = document.getElementById('admin-panel-btn');
            if (adminBtn) {
                adminBtn.style.display = 'none';
            }
            return false;
        }
        
        this.currentUser = user;
        this.showAdminButton();
        return true;
    }
    
    showAdminButton() {
        const adminBtn = document.getElementById('admin-panel-btn');
        if (adminBtn) {
            adminBtn.style.display = 'block';
            adminBtn.onclick = () => this.showDashboard();
        }
    }
    
    createDashboard() {
        const dashboardHTML = `
            <div id="admin-dashboard" class="admin-dashboard" style="display: none;">
                <div class="dashboard-overlay" onclick="adminDashboard.hideDashboard()"></div>
                <div class="dashboard-content">
                    <div class="dashboard-header">
                        <h1>لوحة تحكم الإدارة</h1>
                        <div class="header-actions">
                            <button class="refresh-btn" onclick="adminDashboard.refreshData()">
                                <i class="fas fa-sync-alt"></i>
                                تحديث
                            </button>
                            <button class="close-btn" onclick="adminDashboard.hideDashboard()">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="dashboard-nav">
                        <button class="nav-btn active" data-section="overview">
                            <i class="fas fa-chart-line"></i>
                            نظرة عامة
                        </button>
                        <button class="nav-btn" data-section="products">
                            <i class="fas fa-box"></i>
                            إدارة المنتجات
                        </button>
                        <button class="nav-btn" data-section="orders">
                            <i class="fas fa-shopping-bag"></i>
                            إدارة الطلبات
                        </button>
                        <button class="nav-btn" data-section="customers">
                            <i class="fas fa-users"></i>
                            إدارة العملاء
                        </button>
                        <button class="nav-btn" data-section="inventory">
                            <i class="fas fa-warehouse"></i>
                            إدارة المخزون
                        </button>
                        <button class="nav-btn" data-section="analytics">
                            <i class="fas fa-chart-bar"></i>
                            التحليلات
                        </button>
                        <button class="nav-btn" data-section="settings">
                            <i class="fas fa-cog"></i>
                            الإعدادات
                        </button>
                    </div>
                    
                    <div class="dashboard-body">
                        <div id="overview-section" class="dashboard-section active">
                            ${this.createOverviewSection()}
                        </div>
                        
                        <div id="products-section" class="dashboard-section">
                            ${this.createProductsSection()}
                        </div>
                        
                        <div id="orders-section" class="dashboard-section">
                            ${this.createOrdersSection()}
                        </div>
                        
                        <div id="customers-section" class="dashboard-section">
                            ${this.createCustomersSection()}
                        </div>
                        
                        <div id="inventory-section" class="dashboard-section">
                            ${this.createInventorySection()}
                        </div>
                        
                        <div id="analytics-section" class="dashboard-section">
                            ${this.createAnalyticsSection()}
                        </div>
                        
                        <div id="settings-section" class="dashboard-section">
                            ${this.createSettingsSection()}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', dashboardHTML);
        this.addDashboardStyles();
    }
    
    createOverviewSection() {
        return `
            <div class="overview-stats">
                <div class="stat-card">
                    <div class="stat-icon sales">
                        <i class="fas fa-dollar-sign"></i>
                    </div>
                    <div class="stat-content">
                        <div class="stat-value" id="total-sales">0</div>
                        <div class="stat-label">إجمالي المبيعات</div>
                        <div class="stat-change positive" id="sales-change">+0%</div>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon orders">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                    <div class="stat-content">
                        <div class="stat-value" id="total-orders">0</div>
                        <div class="stat-label">إجمالي الطلبات</div>
                        <div class="stat-change positive" id="orders-change">+0%</div>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon customers">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="stat-content">
                        <div class="stat-value" id="total-customers">0</div>
                        <div class="stat-label">إجمالي العملاء</div>
                        <div class="stat-change positive" id="customers-change">+0%</div>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon products">
                        <i class="fas fa-box"></i>
                    </div>
                    <div class="stat-content">
                        <div class="stat-value" id="total-products">0</div>
                        <div class="stat-label">إجمالي المنتجات</div>
                        <div class="stat-change neutral" id="products-change">0</div>
                    </div>
                </div>
            </div>
            
            <div class="overview-charts">
                <div class="chart-container">
                    <h3>المبيعات الشهرية</h3>
                    <canvas id="sales-chart"></canvas>
                </div>
                
                <div class="chart-container">
                    <h3>أفضل المنتجات مبيعاً</h3>
                    <div id="top-products-list"></div>
                </div>
            </div>
            
            <div class="recent-activities">
                <h3>الأنشطة الأخيرة</h3>
                <div id="activities-list"></div>
            </div>
    createProductsSection() {
        return `
            <div class="products-management">
                <div class="section-header">
                    <h2>إدارة المنتجات</h2>
                    <div class="header-actions">
                        <button class="btn btn-primary" onclick="adminDashboard.showAddProductModal()">
                            <i class="fas fa-plus"></i>
                            إضافة منتج جديد
                        </button>
                        <button class="btn btn-secondary" onclick="adminDashboard.exportProducts()">
                            <i class="fas fa-download"></i>
                            تصدير البيانات
                        </button>
                    </div>
                </div>
                
                <div class="filters-container">
                    <div class="filter-group">
                        <label>البحث:</label>
                        <input type="text" id="product-search" placeholder="ابحث عن منتج..." onkeyup="adminDashboard.filterProducts()">
                    </div>
                    <div class="filter-group">
                        <label>الفئة:</label>
                        <select id="category-filter" onchange="adminDashboard.filterProducts()">
                            <option value="">جميع الفئات</option>
                            <option value="engine">المحرك</option>
                            <option value="brakes">الفرامل</option>
                            <option value="suspension">التعليق</option>
                            <option value="electrical">الكهرباء</option>
                            <option value="body">هيكل السيارة</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>الماركة:</label>
                        <select id="brand-filter" onchange="adminDashboard.filterProducts()">
                            <option value="">جميع الماركات</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>حالة المخزون:</label>
                        <select id="stock-filter" onchange="adminDashboard.filterProducts()">
                            <option value="">الكل</option>
                            <option value="in-stock">متوفر</option>
                            <option value="low-stock">مخزون منخفض</option>
                            <option value="out-of-stock">غير متوفر</option>
                        </select>
                    </div>
                </div>
                
                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>الصورة</th>
                                <th>اسم المنتج</th>
                                <th>الفئة</th>
                                <th>الماركة</th>
                                <th>السعر</th>
                                <th>المخزون</th>
                                <th>الحالة</th>
                                <th>الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody id="products-table-body">
                            <!-- Products will be loaded here -->
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
    
    createOrdersSection() {
        return `
            <div class="orders-management">
                <div class="section-header">
                    <h2>إدارة الطلبات</h2>
                    <div class="header-actions">
                        <button class="btn btn-secondary" onclick="adminDashboard.exportOrders()">
                            <i class="fas fa-download"></i>
                            تصدير الطلبات
                        </button>
                    </div>
                </div>
                
                <div class="filters-container">
                    <div class="filter-group">
                        <label>البحث:</label>
                        <input type="text" id="order-search" placeholder="رقم الطلب أو اسم العميل..." onkeyup="adminDashboard.filterOrders()">
                    </div>
                    <div class="filter-group">
                        <label>الحالة:</label>
                        <select id="order-status-filter" onchange="adminDashboard.filterOrders()">
                            <option value="">جميع الحالات</option>
                            <option value="pending">في الانتظار</option>
                            <option value="confirmed">مؤكد</option>
                            <option value="shipped">تم الشحن</option>
                            <option value="delivered">تم التسليم</option>
                            <option value="cancelled">ملغي</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>من تاريخ:</label>
                        <input type="date" id="order-date-from" onchange="adminDashboard.filterOrders()">
                    </div>
                    <div class="filter-group">
                        <label>إلى تاريخ:</label>
                        <input type="date" id="order-date-to" onchange="adminDashboard.filterOrders()">
                    </div>
                </div>
                
                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>رقم الطلب</th>
                                <th>العميل</th>
                                <th>التاريخ</th>
                                <th>المبلغ</th>
                                <th>الحالة</th>
                                <th>طريقة الدفع</th>
                                <th>الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody id="orders-table-body">
                            <!-- Orders will be loaded here -->
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
    
    createCustomersSection() {
        return `
            <div class="customers-management">
                <div class="section-header">
                    <h2>إدارة العملاء</h2>
                    <div class="header-actions">
                        <button class="btn btn-secondary" onclick="adminDashboard.exportCustomers()">
                            <i class="fas fa-download"></i>
                            تصدير العملاء
                        </button>
                    </div>
                </div>
                
                <div class="filters-container">
                    <div class="filter-group">
                        <label>البحث:</label>
                        <input type="text" id="customer-search" placeholder="اسم العميل أو البريد الإلكتروني..." onkeyup="adminDashboard.filterCustomers()">
                    </div>
                    <div class="filter-group">
                        <label>حالة العضوية:</label>
                        <select id="customer-status-filter" onchange="adminDashboard.filterCustomers()">
                            <option value="">جميع الحالات</option>
                            <option value="active">نشط</option>
                            <option value="inactive">غير نشط</option>
                            <option value="blocked">محظور</option>
                        </select>
                    </div>
                </div>
                
                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>الاسم</th>
                                <th>البريد الإلكتروني</th>
                                <th>الهاتف</th>
                                <th>تاريخ التسجيل</th>
                                <th>إجمالي الطلبات</th>
                                <th>إجمالي المشتريات</th>
                                <th>الحالة</th>
                                <th>الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody id="customers-table-body">
                            <!-- Customers will be loaded here -->
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
    
    createInventorySection() {
        return `
            <div class="inventory-management">
                <div class="section-header">
                    <h2>إدارة المخزون</h2>
                    <div class="header-actions">
                        <button class="btn btn-primary" onclick="adminDashboard.showBulkUpdateModal()">
                            <i class="fas fa-edit"></i>
                            تحديث جماعي
                        </button>
                        <button class="btn btn-warning" onclick="adminDashboard.showLowStockAlert()">
                            <i class="fas fa-exclamation-triangle"></i>
                            تنبيهات المخزون
                        </button>
                    </div>
                </div>
                
                <div class="inventory-stats">
                    <div class="stat-card">
                        <div class="stat-icon in-stock">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value" id="in-stock-count">0</div>
                            <div class="stat-label">منتجات متوفرة</div>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon low-stock">
                            <i class="fas fa-exclamation-circle"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value" id="low-stock-count">0</div>
                            <div class="stat-label">مخزون منخفض</div>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon out-stock">
                            <i class="fas fa-times-circle"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value" id="out-stock-count">0</div>
                            <div class="stat-label">غير متوفر</div>
                        </div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-icon total-value">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value" id="inventory-value">0</div>
                            <div class="stat-label">قيمة المخزون</div>
                        </div>
                    </div>
                </div>
                
                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>المنتج</th>
                                <th>الكمية الحالية</th>
                                <th>الحد الأدنى</th>
                                <th>قيمة المخزون</th>
                                <th>آخر تحديث</th>
                                <th>الحالة</th>
                                <th>الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody id="inventory-table-body">
                            <!-- Inventory will be loaded here -->
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
    
    createAnalyticsSection() {
        return `
            <div class="analytics-dashboard">
                <div class="section-header">
                    <h2>التحليلات والتقارير</h2>
                    <div class="header-actions">
                        <select id="analytics-period" onchange="adminDashboard.updateAnalytics()">
                            <option value="7">آخر 7 أيام</option>
                            <option value="30" selected>آخر 30 يوم</option>
                            <option value="90">آخر 3 أشهر</option>
                            <option value="365">آخر سنة</option>
                        </select>
                    </div>
                </div>
                
                <div class="analytics-grid">
                    <div class="chart-container">
                        <h3>مبيعات الفترة</h3>
                        <canvas id="period-sales-chart"></canvas>
                    </div>
                    
                    <div class="chart-container">
                        <h3>المنتجات الأكثر مبيعاً</h3>
                        <canvas id="top-products-chart"></canvas>
                    </div>
                    
                    <div class="chart-container">
                        <h3>العملاء الجدد</h3>
                        <canvas id="new-customers-chart"></canvas>
                    </div>
                    
                    <div class="chart-container">
                        <h3>توزيع المبيعات حسب الماركة</h3>
                        <canvas id="brand-distribution-chart"></canvas>
                    </div>
                </div>
                
                <div class="reports-section">
                    <h3>التقارير المفصلة</h3>
                    <div class="reports-grid">
                        <button class="report-btn" onclick="adminDashboard.generateSalesReport()">
                            <i class="fas fa-chart-line"></i>
                            تقرير المبيعات
                        </button>
                        <button class="report-btn" onclick="adminDashboard.generateInventoryReport()">
                            <i class="fas fa-warehouse"></i>
                            تقرير المخزون
                        </button>
                        <button class="report-btn" onclick="adminDashboard.generateCustomerReport()">
                            <i class="fas fa-users"></i>
                            تقرير العملاء
                        </button>
                        <button class="report-btn" onclick="adminDashboard.generateFinancialReport()">
                            <i class="fas fa-money-bill"></i>
                            التقرير المالي
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    createSettingsSection() {
        return `
            <div class="settings-management">
                <div class="section-header">
                    <h2>إعدادات النظام</h2>
                </div>
                
                <div class="settings-grid">
                    <div class="settings-card">
                        <h3>إعدادات عامة</h3>
                        <div class="setting-item">
                            <label>اسم الموقع:</label>
                            <input type="text" id="site-name" value="PartsHub Egypt">
                        </div>
                        <div class="setting-item">
                            <label>وصف الموقع:</label>
                            <textarea id="site-description">أفضل قطع غيار السيارات في مصر</textarea>
                        </div>
                        <div class="setting-item">
                            <label>رقم الهاتف:</label>
                            <input type="text" id="site-phone" value="+20 101 051 4741">
                        </div>
                        <div class="setting-item">
                            <label>البريد الإلكتروني:</label>
                            <input type="email" id="site-email" value="info@partshub-egypt.com">
                        </div>
                    </div>
                    
                    <div class="settings-card">
                        <h3>إعدادات المخزون</h3>
                        <div class="setting-item">
                            <label>الحد الأدنى للمخزون:</label>
                            <input type="number" id="min-stock-threshold" value="5">
                        </div>
                        <div class="setting-item">
                            <label>تنبيهات المخزون:</label>
                            <input type="checkbox" id="stock-alerts" checked>
                        </div>
                        <div class="setting-item">
                            <label>تحديث المخزون التلقائي:</label>
                            <input type="checkbox" id="auto-stock-update">
                        </div>
                    </div>
                    
                    <div class="settings-card">
                        <h3>إعدادات الطلبات</h3>
                        <div class="setting-item">
                            <label>الحد الأدنى للطلب:</label>
                            <input type="number" id="min-order-amount" value="100">
                        </div>
                        <div class="setting-item">
                            <label>رسوم الشحن:</label>
                            <input type="number" id="shipping-fee" value="50">
                        </div>
                        <div class="setting-item">
                            <label>الشحن المجاني من:</label>
                            <input type="number" id="free-shipping-threshold" value="500">
                        </div>
                    </div>
                    
                    <div class="settings-card">
                        <h3>إعدادات الإشعارات</h3>
                        <div class="setting-item">
                            <label>إشعارات الطلبات الجديدة:</label>
                            <input type="checkbox" id="new-order-notifications" checked>
                        </div>
                        <div class="setting-item">
                            <label>إشعارات المخزون المنخفض:</label>
                            <input type="checkbox" id="low-stock-notifications" checked>
                        </div>
                        <div class="setting-item">
                            <label>إشعارات العملاء الجدد:</label>
                            <input type="checkbox" id="new-customer-notifications" checked>
                        </div>
                    </div>
                </div>
                
                <div class="settings-actions">
                    <button class="btn btn-primary" onclick="adminDashboard.saveSettings()">
                        <i class="fas fa-save"></i>
                        حفظ الإعدادات
                    </button>
                    <button class="btn btn-secondary" onclick="adminDashboard.resetSettings()">
                        <i class="fas fa-undo"></i>
                        إعادة تعيين
                    </button>
                </div>
            </div>
        `;
    }
    
    setupEventListeners() {
        // Navigation buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-btn')) {
                this.switchSection(e.target.dataset.section);
            }
        });
        
        // Auto-refresh toggle
        document.addEventListener('change', (e) => {
            if (e.target.id === 'auto-refresh') {
                if (e.target.checked) {
                    this.startAutoRefresh();
                } else {
                    this.stopAutoRefresh();
                }
            }
        });
    }
    
    switchSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.dashboard-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show selected section
        const targetSection = document.getElementById(`${sectionName}-section`);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');
        
        // Load section data
        this.loadSectionData(sectionName);
    }
    
    loadSectionData(section) {
        switch (section) {
            case 'overview':
                this.loadOverviewData();
                break;
            case 'products':
                this.loadProductsData();
                break;
            case 'orders':
                this.loadOrdersData();
                break;
            case 'customers':
                this.loadCustomersData();
                break;
            case 'inventory':
                this.loadInventoryData();
                break;
            case 'analytics':
                this.loadAnalyticsData();
                break;
            case 'settings':
                this.loadSettingsData();
                break;
        }
    }
    
    loadOverviewData() {
        // Load overview statistics
        const inventoryStats = window.inventoryManager?.getStockStatistics() || {};
        const orderStats = window.orderManager?.getOrderStatistics() || {};
        
        // Update stats cards
        document.getElementById('total-products').textContent = inventoryStats.total || 0;
        document.getElementById('total-orders').textContent = orderStats.totalOrders || 0;
        document.getElementById('total-sales').textContent = `${(orderStats.totalRevenue || 0).toLocaleString()} جنيه`;
        document.getElementById('total-customers').textContent = this.getCustomerCount();
        
        // Load recent activities
        this.loadRecentActivities();
        
        // Load charts
        this.loadSalesChart();
        this.loadTopProductsList();
    }
    
    loadProductsData() {
        const products = window.inventoryManager?.getParts() || [];
        const tbody = document.getElementById('products-table-body');
        
        if (!tbody) return;
        
        // Load brands for filter
        this.loadBrandsForFilter();
        
        tbody.innerHTML = products.map(product => `
            <tr>
                <td>
                    <img src="${this.getProductImage(product)}" alt="${product.name}" class="product-image">
                </td>
                <td>${product.name}</td>
                <td>${this.getCategoryName(product.category)}</td>
                <td>${this.getBrandName(product.brand)}</td>
                <td>${product.price} جنيه</td>
                <td>${product.stock}</td>
                <td>
                    <span class="status-badge ${this.getStockStatus(product.stock)}">
                        ${this.getStockStatusText(product.stock)}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon edit" onclick="adminDashboard.editProduct('${product.id}')" title="تعديل">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon delete" onclick="adminDashboard.deleteProduct('${product.id}')" title="حذف">
                            <i class="fas fa-trash"></i>
                        </button>
                        <button class="btn-icon view" onclick="adminDashboard.viewProduct('${product.id}')" title="عرض">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }
    
    loadOrdersData() {
        const orders = window.orderManager?.getOrders() || [];
        const tbody = document.getElementById('orders-table-body');
        
        if (!tbody) return;
        
        tbody.innerHTML = orders.map(order => `
            <tr>
                <td>${order.id}</td>
                <td>${order.customerName || 'غير محدد'}</td>
                <td>${new Date(order.createdAt).toLocaleDateString('ar-EG')}</td>
                <td>${order.total} جنيه</td>
                <td>
                    <span class="status-badge ${order.status}">
                        ${this.getOrderStatusText(order.status)}
                    </span>
                </td>
                <td>${order.paymentMethod || 'غير محدد'}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon view" onclick="adminDashboard.viewOrder('${order.id}')" title="عرض">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-icon edit" onclick="adminDashboard.updateOrderStatus('${order.id}')" title="تحديث الحالة">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon print" onclick="adminDashboard.printOrder('${order.id}')" title="طباعة">
                            <i class="fas fa-print"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }
    
    loadInventoryData() {
        const products = window.inventoryManager?.getParts() || [];
        const stats = window.inventoryManager?.getStockStatistics() || {};
        
        // Update inventory stats
        document.getElementById('in-stock-count').textContent = stats.inStock || 0;
        document.getElementById('low-stock-count').textContent = stats.lowStock || 0;
        document.getElementById('out-stock-count').textContent = stats.outOfStock || 0;
        document.getElementById('inventory-value').textContent = `${(stats.totalValue || 0).toLocaleString()} جنيه`;
        
        // Load inventory table
        const tbody = document.getElementById('inventory-table-body');
        if (!tbody) return;
        
        tbody.innerHTML = products.map(product => `
            <tr>
                <td>${product.name}</td>
                <td>${product.stock}</td>
                <td>5</td>
                <td>${(product.price * product.stock).toLocaleString()} جنيه</td>
                <td>${new Date().toLocaleDateString('ar-EG')}</td>
                <td>
                    <span class="status-badge ${this.getStockStatus(product.stock)}">
                        ${this.getStockStatusText(product.stock)}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon edit" onclick="adminDashboard.updateStock('${product.id}')" title="تحديث المخزون">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }
    
    // Helper functions
    getProductImage(product) {
        if (product.images && product.images.length > 0) {
            return product.images[0];
        }
        return 'assets/images/parts/default-part.jpg';
    }
    
    getCategoryName(category) {
        const categories = {
            'engine': 'المحرك',
            'brakes': 'الفرامل',
            'suspension': 'التعليق',
            'electrical': 'الكهرباء',
            'body': 'هيكل السيارة'
        };
        return categories[category] || category;
    }
    
    getBrandName(brandId) {
        const brand = window.carBrands?.find(b => b.id === brandId);
        return brand ? brand.name : brandId;
    }
    
    getStockStatus(stock) {
        if (stock === 0) return 'out-of-stock';
        if (stock <= 5) return 'low-stock';
        return 'in-stock';
    }
    
    getStockStatusText(stock) {
        if (stock === 0) return 'غير متوفر';
        if (stock <= 5) return 'مخزون منخفض';
        return 'متوفر';
    }
    
    getOrderStatusText(status) {
        const statuses = {
            'pending': 'في الانتظار',
            'confirmed': 'مؤكد',
            'shipped': 'تم الشحن',
            'delivered': 'تم التسليم',
            'cancelled': 'ملغي'
        };
        return statuses[status] || status;
    }
    
    getCustomerCount() {
        // This would typically come from a customer management system
        return 0;
    }
    
    loadBrandsForFilter() {
        const brandFilter = document.getElementById('brand-filter');
        if (!brandFilter || !window.carBrands) return;
        
        // Clear existing options except the first one
        brandFilter.innerHTML = '<option value="">جميع الماركات</option>';
        
        window.carBrands.forEach(brand => {
            const option = document.createElement('option');
            option.value = brand.id;
            option.textContent = brand.name;
            brandFilter.appendChild(option);
        });
    }
    
    loadRecentActivities() {
        const activitiesList = document.getElementById('activities-list');
        if (!activitiesList) return;
        
        // Sample activities - in a real app, this would come from a log system
        const activities = [
            { type: 'order', message: 'طلب جديد #ORD-001', time: '5 دقائق' },
            { type: 'product', message: 'تم إضافة منتج جديد: فلتر زيت تويوتا', time: '15 دقيقة' },
            { type: 'customer', message: 'عميل جديد: أحمد محمد', time: '30 دقيقة' },
            { type: 'stock', message: 'تنبيه مخزون منخفض: تيل فرامل BMW', time: '1 ساعة' }
        ];
        
        activitiesList.innerHTML = activities.map(activity => `
            <div class="activity-item ${activity.type}">
                <div class="activity-icon">
                    <i class="fas fa-${this.getActivityIcon(activity.type)}"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-message">${activity.message}</div>
                    <div class="activity-time">منذ ${activity.time}</div>
                </div>
            </div>
        `).join('');
    }
    
    getActivityIcon(type) {
        const icons = {
            'order': 'shopping-cart',
            'product': 'box',
            'customer': 'user',
            'stock': 'exclamation-triangle'
        };
        return icons[type] || 'info-circle';
    }
    
    loadSalesChart() {
        // This would typically load real sales data
        // For now, we'll use sample data
        const ctx = document.getElementById('sales-chart');
        if (!ctx) return;
        
        // Sample chart implementation would go here
        console.log('Loading sales chart...');
    }
    
    loadTopProductsList() {
        const topProductsList = document.getElementById('top-products-list');
        if (!topProductsList) return;
        
        // Sample top products
        const topProducts = [
            { name: 'فلتر زيت تويوتا', sales: 45 },
            { name: 'تيل فرامل هيونداي', sales: 32 },
            { name: 'فلتر هواء كيا', sales: 28 },
            { name: 'شمعات إشعال نيسان', sales: 24 },
            { name: 'بطارية BMW', sales: 18 }
        ];
        
        topProductsList.innerHTML = topProducts.map((product, index) => `
            <div class="top-product-item">
                <div class="product-rank">${index + 1}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-sales">${product.sales} مبيعة</div>
            </div>
        `).join('');
    }
    
    // Action functions
    showDashboard() {
        const dashboard = document.getElementById('admin-dashboard');
        if (dashboard) {
            dashboard.style.display = 'block';
            this.loadOverviewData();
        }
    }
    
    hideDashboard() {
        const dashboard = document.getElementById('admin-dashboard');
        if (dashboard) {
            dashboard.style.display = 'none';
        }
    }
    
    refreshData() {
        this.loadSectionData(this.getCurrentSection());
        this.showNotification('تم تحديث البيانات بنجاح', 'success');
    }
    
    getCurrentSection() {
        const activeBtn = document.querySelector('.nav-btn.active');
        return activeBtn ? activeBtn.dataset.section : 'overview';
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `admin-notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}-circle"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Filter functions
    filterProducts() {
        const search = document.getElementById('product-search')?.value.toLowerCase() || '';
        const category = document.getElementById('category-filter')?.value || '';
        const brand = document.getElementById('brand-filter')?.value || '';
        const stock = document.getElementById('stock-filter')?.value || '';
        
        const products = window.inventoryManager?.getParts({
            search,
            category,
            brand,
            stock
        }) || [];
        
        this.updateProductsTable(products);
    }
    
    filterOrders() {
        const search = document.getElementById('order-search')?.value.toLowerCase() || '';
        const status = document.getElementById('order-status-filter')?.value || '';
        const dateFrom = document.getElementById('order-date-from')?.value || '';
        const dateTo = document.getElementById('order-date-to')?.value || '';
        
        let orders = window.orderManager?.getOrders() || [];
        
        // Apply filters
        if (search) {
            orders = orders.filter(order => 
                order.id.toLowerCase().includes(search) ||
                (order.customerName && order.customerName.toLowerCase().includes(search))
            );
        }
        
        if (status) {
            orders = orders.filter(order => order.status === status);
        }
        
        if (dateFrom) {
            orders = orders.filter(order => new Date(order.createdAt) >= new Date(dateFrom));
        }
        
        if (dateTo) {
            orders = orders.filter(order => new Date(order.createdAt) <= new Date(dateTo));
        }
        
        this.updateOrdersTable(orders);
    }
    
    updateProductsTable(products) {
        const tbody = document.getElementById('products-table-body');
        if (!tbody) return;
        
        tbody.innerHTML = products.map(product => `
            <tr>
                <td>
                    <img src="${this.getProductImage(product)}" alt="${product.name}" class="product-image">
                </td>
                <td>${product.name}</td>
                <td>${this.getCategoryName(product.category)}</td>
                <td>${this.getBrandName(product.brand)}</td>
                <td>${product.price} جنيه</td>
                <td>${product.stock}</td>
                <td>
                    <span class="status-badge ${this.getStockStatus(product.stock)}">
                        ${this.getStockStatusText(product.stock)}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon edit" onclick="adminDashboard.editProduct('${product.id}')" title="تعديل">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon delete" onclick="adminDashboard.deleteProduct('${product.id}')" title="حذف">
                            <i class="fas fa-trash"></i>
                        </button>
                        <button class="btn-icon view" onclick="adminDashboard.viewProduct('${product.id}')" title="عرض">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }
    
    updateOrdersTable(orders) {
        const tbody = document.getElementById('orders-table-body');
        if (!tbody) return;
        
        tbody.innerHTML = orders.map(order => `
            <tr>
                <td>${order.id}</td>
                <td>${order.customerName || 'غير محدد'}</td>
                <td>${new Date(order.createdAt).toLocaleDateString('ar-EG')}</td>
                <td>${order.total} جنيه</td>
                <td>
                    <span class="status-badge ${order.status}">
                        ${this.getOrderStatusText(order.status)}
                    </span>
                </td>
                <td>${order.paymentMethod || 'غير محدد'}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon view" onclick="adminDashboard.viewOrder('${order.id}')" title="عرض">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-icon edit" onclick="adminDashboard.updateOrderStatus('${order.id}')" title="تحديث الحالة">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon print" onclick="adminDashboard.printOrder('${order.id}')" title="طباعة">
                            <i class="fas fa-print"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }
    
    startAutoRefresh() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }
        
        this.refreshInterval = setInterval(() => {
            this.loadSectionData(this.getCurrentSection());
        }, 30000); // Refresh every 30 seconds
    }
    
    stopAutoRefresh() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
            this.refreshInterval = null;
        }
    }
    
    loadDashboard() {
        if (this.checkAdminAccess()) {
            this.loadOverviewData();
        }
    }
    
    addDashboardStyles() {
        const styles = `
            <style>
                .admin-dashboard {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 10000;
                    font-family: 'Poppins', sans-serif;
                }
                
                .dashboard-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                }
                
                .dashboard-content {
                    position: relative;
                    width: 95%;
                    height: 95%;
                    margin: 2.5%;
                    background: white;
                    border-radius: 12px;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }
                
                .dashboard-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.5rem 2rem;
                    background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
                    color: white;
                }
                
                .dashboard-header h1 {
                    margin: 0;
                    font-size: 1.5rem;
                    font-weight: 600;
                }
                
                .header-actions {
                    display: flex;
                    gap: 1rem;
                }
                
                .refresh-btn, .close-btn {
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 6px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: all 0.3s ease;
                }
                
                .refresh-btn:hover, .close-btn:hover {
                    background: rgba(255, 255, 255, 0.3);
                }
                
                .dashboard-nav {
                    display: flex;
                    background: #f8fafc;
                    border-bottom: 1px solid #e5e7eb;
                    overflow-x: auto;
                }
                
                .nav-btn {
                    background: none;
                    border: none;
                    padding: 1rem 1.5rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #6b7280;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    white-space: nowrap;
                }
                
                .nav-btn:hover {
                    background: #e5e7eb;
                    color: #374151;
                }
                
                .nav-btn.active {
                    background: white;
                    color: #dc2626;
                    border-bottom: 2px solid #dc2626;
                }
                
                .dashboard-body {
                    flex: 1;
                    overflow-y: auto;
                    padding: 2rem;
                }
                
                .dashboard-section {
                    display: none;
                }
                
                .dashboard-section.active {
                    display: block;
                }
                
                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                }
                
                .section-header h2 {
                    margin: 0;
                    color: #1f2937;
                    font-size: 1.5rem;
                    font-weight: 600;
                }
                
                .overview-stats {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }
                
                .stat-card {
                    background: white;
                    padding: 1.5rem;
                    border-radius: 12px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    border: 1px solid #e5e7eb;
                }
                
                .stat-icon {
                    width: 60px;
                    height: 60px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    color: white;
                }
                
                .stat-icon.sales { background: linear-gradient(135deg, #10b981, #059669); }
                .stat-icon.orders { background: linear-gradient(135deg, #3b82f6, #2563eb); }
                .stat-icon.customers { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }
                .stat-icon.products { background: linear-gradient(135deg, #f59e0b, #d97706); }
                .stat-icon.in-stock { background: linear-gradient(135deg, #10b981, #059669); }
                .stat-icon.low-stock { background: linear-gradient(135deg, #f59e0b, #d97706); }
                .stat-icon.out-stock { background: linear-gradient(135deg, #ef4444, #dc2626); }
                .stat-icon.total-value { background: linear-gradient(135deg, #6366f1, #4f46e5); }
                
                .stat-content {
                    flex: 1;
                }
                
                .stat-value {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #1f2937;
                    margin-bottom: 0.25rem;
                }
                
                .stat-label {
                    color: #6b7280;
                    font-size: 0.875rem;
                    margin-bottom: 0.25rem;
                }
                
                .stat-change {
                    font-size: 0.75rem;
                    font-weight: 600;
                }
                
                .stat-change.positive { color: #10b981; }
                .stat-change.negative { color: #ef4444; }
                .stat-change.neutral { color: #6b7280; }
                
                .filters-container {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                    flex-wrap: wrap;
                }
                
                .filter-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                
                .filter-group label {
                    font-weight: 500;
                    color: #374151;
                    font-size: 0.875rem;
                }
                
                .filter-group input,
                .filter-group select {
                    padding: 0.5rem;
                    border: 1px solid #d1d5db;
                    border-radius: 6px;
                    font-size: 0.875rem;
                    min-width: 150px;
                }
                
                .table-container {
                    background: white;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    border: 1px solid #e5e7eb;
                }
                
                .data-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                
                .data-table th {
                    background: #f8fafc;
                    padding: 1rem;
                    text-align: right;
                    font-weight: 600;
                    color: #374151;
                    border-bottom: 1px solid #e5e7eb;
                }
                
                .data-table td {
                    padding: 1rem;
                    border-bottom: 1px solid #f3f4f6;
                    color: #6b7280;
                }
                
                .data-table tr:hover {
                    background: #f9fafb;
                }
                
                .product-image {
                    width: 50px;
                    height: 50px;
                    object-fit: cover;
                    border-radius: 6px;
                }
                
                .status-badge {
                    padding: 0.25rem 0.75rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    text-transform: uppercase;
                }
                
                .status-badge.in-stock {
                    background: #d1fae5;
                    color: #065f46;
                }
                
                .status-badge.low-stock {
                    background: #fef3c7;
                    color: #92400e;
                }
                
                .status-badge.out-of-stock {
                    background: #fee2e2;
                    color: #991b1b;
                }
                
                .status-badge.pending {
                    background: #fef3c7;
                    color: #92400e;
                }
                
                .status-badge.confirmed {
                    background: #dbeafe;
                    color: #1e40af;
                }
                
                .status-badge.shipped {
                    background: #e0e7ff;
                    color: #3730a3;
                }
                
                .status-badge.delivered {
                    background: #d1fae5;
                    color: #065f46;
                }
                
                .status-badge.cancelled {
                    background: #fee2e2;
                    color: #991b1b;
                }
                
                .action-buttons {
                    display: flex;
                    gap: 0.5rem;
                }
                
                .btn-icon {
                    width: 32px;
                    height: 32px;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }
                
                .btn-icon.edit {
                    background: #dbeafe;
                    color: #1e40af;
                }
                
                .btn-icon.edit:hover {
                    background: #bfdbfe;
                }
                
                .btn-icon.delete {
                    background: #fee2e2;
                    color: #991b1b;
                }
                
                .btn-icon.delete:hover {
                    background: #fecaca;
                }
                
                .btn-icon.view {
                    background: #f3f4f6;
                    color: #374151;
                }
                
                .btn-icon.view:hover {
                    background: #e5e7eb;
                }
                
                .btn-icon.print {
                    background: #f0fdf4;
                    color: #166534;
                }
                
                .btn-icon.print:hover {
                    background: #dcfce7;
                }
                
                .btn {
                    padding: 0.5rem 1rem;
                    border: none;
                    border-radius: 6px;
                    font-weight: 600;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: all 0.3s ease;
                    font-size: 0.875rem;
                }
                
                .btn-primary {
                    background: #dc2626;
                    color: white;
                }
                
                .btn-primary:hover {
                    background: #b91c1c;
                }
                
                .btn-secondary {
                    background: #6b7280;
                    color: white;
                }
                
                .btn-secondary:hover {
                    background: #4b5563;
                }
                
                .btn-warning {
                    background: #f59e0b;
                    color: white;
                }
                
                .btn-warning:hover {
                    background: #d97706;
                }
                
                .recent-activities {
                    background: white;
                    border-radius: 12px;
                    padding: 1.5rem;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    border: 1px solid #e5e7eb;
                    margin-top: 2rem;
                }
                
                .recent-activities h3 {
                    margin: 0 0 1rem 0;
                    color: #1f2937;
                    font-size: 1.125rem;
                    font-weight: 600;
                }
                
                .activity-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem 0;
                    border-bottom: 1px solid #f3f4f6;
                }
                
                .activity-item:last-child {
                    border-bottom: none;
                }
                
                .activity-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 0.875rem;
                }
                
                .activity-item.order .activity-icon { background: #3b82f6; }
                .activity-item.product .activity-icon { background: #f59e0b; }
                .activity-item.customer .activity-icon { background: #8b5cf6; }
                .activity-item.stock .activity-icon { background: #ef4444; }
                
                .activity-content {
                    flex: 1;
                }
                
                .activity-message {
                    color: #1f2937;
                    font-weight: 500;
                    margin-bottom: 0.25rem;
                }
                
                .activity-time {
                    color: #6b7280;
                    font-size: 0.75rem;
                }
                
                .top-product-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 0.75rem 0;
                    border-bottom: 1px solid #f3f4f6;
                }
                
                .top-product-item:last-child {
                    border-bottom: none;
                }
                
                .product-rank {
                    width: 24px;
                    height: 24px;
                    background: #dc2626;
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.75rem;
                    font-weight: 600;
                }
                
                .product-name {
                    flex: 1;
                    color: #1f2937;
                    font-weight: 500;
                }
                
                .product-sales {
                    color: #6b7280;
                    font-size: 0.875rem;
                }
                
                .admin-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: white;
                    padding: 1rem 1.5rem;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    z-index: 10001;
                    transform: translateX(100%);
                    transition: transform 0.3s ease;
                    border-left: 4px solid #3b82f6;
                }
                
                .admin-notification.show {
                    transform: translateX(0);
                }
                
                .admin-notification.success {
                    border-left-color: #10b981;
                    color: #065f46;
                }
                
                .admin-notification.error {
                    border-left-color: #ef4444;
                    color: #991b1b;
                }
                
                .admin-notification.info {
                    border-left-color: #3b82f6;
                    color: #1e40af;
                }
                
                .settings-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                }
                
                .settings-card {
                    background: white;
                    padding: 1.5rem;
                    border-radius: 12px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    border: 1px solid #e5e7eb;
                }
                
                .settings-card h3 {
                    margin: 0 0 1rem 0;
                    color: #1f2937;
                    font-size: 1.125rem;
                    font-weight: 600;
                }
                
                .setting-item {
                    margin-bottom: 1rem;
                }
                
                .setting-item:last-child {
                    margin-bottom: 0;
                }
                
                .setting-item label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                    color: #374151;
                    font-size: 0.875rem;
                }
                
                .setting-item input,
                .setting-item textarea {
                    width: 100%;
                    padding: 0.5rem;
                    border: 1px solid #d1d5db;
                    border-radius: 6px;
                    font-size: 0.875rem;
                }
                
                .setting-item textarea {
                    resize: vertical;
                    min-height: 80px;
                }
                
                .settings-actions {
                    display: flex;
                    gap: 1rem;
                    justify-content: flex-end;
                }
                
                @media (max-width: 768px) {
                    .dashboard-content {
                        width: 100%;
                        height: 100%;
                        margin: 0;
                        border-radius: 0;
                    }
                    
                    .dashboard-nav {
                        overflow-x: auto;
                    }
                    
                    .overview-stats {
                        grid-template-columns: 1fr;
                    }
                    
                    .filters-container {
                        flex-direction: column;
                    }
                    
                    .filter-group input,
                    .filter-group select {
                        min-width: auto;
                        width: 100%;
                    }
                    
                    .table-container {
                        overflow-x: auto;
                    }
                    
                    .settings-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }
}

// Initialize admin dashboard
const adminDashboard = new AdminDashboard();

// Export for global access
window.adminDashboard = adminDashboard;