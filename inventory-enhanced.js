// Enhanced Inventory Management System
class EnhancedInventoryManager {
    constructor() {
        this.parts = [];
        this.categories = [
            { id: 'engine', name: 'قطع المحرك', icon: 'fas fa-cog' },
            { id: 'brakes', name: 'الفرامل', icon: 'fas fa-stop-circle' },
            { id: 'suspension', name: 'التعليق', icon: 'fas fa-arrows-alt-v' },
            { id: 'electrical', name: 'الكهرباء', icon: 'fas fa-bolt' },
            { id: 'body', name: 'قطع الهيكل', icon: 'fas fa-car' },
            { id: 'transmission', name: 'ناقل الحركة', icon: 'fas fa-cogs' },
            { id: 'cooling', name: 'التبريد', icon: 'fas fa-thermometer-half' },
            { id: 'exhaust', name: 'العادم', icon: 'fas fa-wind' },
            { id: 'interior', name: 'الداخلية', icon: 'fas fa-chair' },
            { id: 'exterior', name: 'الخارجية', icon: 'fas fa-car-side' }
        ];
        this.lowStockThreshold = 5;
        this.suppliers = [];
        this.stockMovements = [];
        this.init();
    }
    
    init() {
        this.loadFromStorage();
        this.loadSampleData();
    }
    
    loadFromStorage() {
        const stored = localStorage.getItem('autoparts_inventory_enhanced');
        if (stored) {
            const data = JSON.parse(stored);
            this.parts = data.parts || [];
            this.suppliers = data.suppliers || [];
            this.stockMovements = data.stockMovements || [];
        }
    }
    
    saveToStorage() {
        const data = {
            parts: this.parts,
            suppliers: this.suppliers,
            stockMovements: this.stockMovements
        };
        localStorage.setItem('autoparts_inventory_enhanced', JSON.stringify(data));
    }
    
    // Load sample data if empty
    loadSampleData() {
        if (this.parts.length === 0) {
            this.parts = this.generateSampleParts();
            this.suppliers = this.generateSampleSuppliers();
            this.saveToStorage();
        }
    }
    
    generateSampleSuppliers() {
        return [
            {
                id: 'supplier_1',
                name: 'شركة قطع غيار الشرق الأوسط',
                contact: 'أحمد محمد',
                phone: '01012345678',
                email: 'info@mideastparts.com',
                address: 'القاهرة، مصر',
                rating: 4.5,
                isActive: true
            },
            {
                id: 'supplier_2',
                name: 'مؤسسة النيل للسيارات',
                contact: 'محمد علي',
                phone: '01098765432',
                email: 'sales@nileauto.com',
                address: 'الإسكندرية، مصر',
                rating: 4.2,
                isActive: true
            },
            {
                id: 'supplier_3',
                name: 'شركة الدلتا للقطع الأصلية',
                contact: 'سارة أحمد',
                phone: '01155667788',
                email: 'orders@deltaparts.com',
                address: 'طنطا، مصر',
                rating: 4.8,
                isActive: true
            }
        ];
    }
    
    generateSampleParts() {
        const sampleParts = [];
        const brands = ['toyota', 'hyundai', 'kia', 'nissan', 'chevrolet', 'bmw', 'mercedes', 'peugeot'];
        const categories = this.categories.map(c => c.id);
        
        // Generate more diverse parts
        const partTemplates = [
            // Engine parts
            { name: 'فلتر زيت المحرك', category: 'engine', basePrice: 150, icon: 'fas fa-filter' },
            { name: 'فلتر الهواء', category: 'engine', basePrice: 200, icon: 'fas fa-wind' },
            { name: 'شمعات الإشعال', category: 'engine', basePrice: 80, icon: 'fas fa-bolt' },
            { name: 'سير التوقيت', category: 'engine', basePrice: 450, icon: 'fas fa-cog' },
            { name: 'طلمبة المياه', category: 'engine', basePrice: 380, icon: 'fas fa-tint' },
            { name: 'رادياتير التبريد', category: 'cooling', basePrice: 850, icon: 'fas fa-thermometer-half' },
            
            // Brake parts
            { name: 'تيل فرامل أمامي', category: 'brakes', basePrice: 380, icon: 'fas fa-stop-circle' },
            { name: 'تيل فرامل خلفي', category: 'brakes', basePrice: 320, icon: 'fas fa-stop-circle' },
            { name: 'أقراص الفرامل', category: 'brakes', basePrice: 850, icon: 'fas fa-compact-disc' },
            { name: 'زيت الفرامل', category: 'brakes', basePrice: 120, icon: 'fas fa-oil-can' },
            
            // Suspension parts
            { name: 'مساعدين أمامي', category: 'suspension', basePrice: 600, icon: 'fas fa-arrows-alt-v' },
            { name: 'مساعدين خلفي', category: 'suspension', basePrice: 550, icon: 'fas fa-arrows-alt-v' },
            { name: 'سوست التعليق', category: 'suspension', basePrice: 340, icon: 'fas fa-compress-arrows-alt' },
            { name: 'عمود التوازن', category: 'suspension', basePrice: 450, icon: 'fas fa-balance-scale' },
            
            // Electrical parts
            { name: 'الدينامو', category: 'electrical', basePrice: 1800, icon: 'fas fa-battery-three-quarters' },
            { name: 'المارش', category: 'electrical', basePrice: 1500, icon: 'fas fa-play-circle' },
            { name: 'بطارية السيارة', category: 'electrical', basePrice: 950, icon: 'fas fa-car-battery' },
            { name: 'لمبات الإنارة', category: 'electrical', basePrice: 90, icon: 'fas fa-lightbulb' },
            
            // Body parts
            { name: 'مرآة جانبية', category: 'body', basePrice: 420, icon: 'fas fa-mirror' },
            { name: 'صدام أمامي', category: 'body', basePrice: 2200, icon: 'fas fa-car-crash' },
            { name: 'صدام خلفي', category: 'body', basePrice: 1800, icon: 'fas fa-car-crash' },
            { name: 'فانوس أمامي', category: 'body', basePrice: 650, icon: 'fas fa-lightbulb' },
            
            // Transmission parts
            { name: 'زيت الجير', category: 'transmission', basePrice: 280, icon: 'fas fa-oil-can' },
            { name: 'فلتر الجير', category: 'transmission', basePrice: 320, icon: 'fas fa-filter' },
            { name: 'دبرياج', category: 'transmission', basePrice: 1200, icon: 'fas fa-cogs' },
            
            // Interior parts
            { name: 'مقعد السائق', category: 'interior', basePrice: 2500, icon: 'fas fa-chair' },
            { name: 'عجلة القيادة', category: 'interior', basePrice: 800, icon: 'fas fa-steering-wheel' },
            { name: 'تابلوه السيارة', category: 'interior', basePrice: 1500, icon: 'fas fa-tachometer-alt' }
        ];
        
        let partId = 1;
        
        brands.forEach(brand => {
            const brandData = carBrands.find(b => b.id === brand);
            if (!brandData) return;
            
            brandData.models.forEach(model => {
                partTemplates.forEach(template => {
                    // Price variation based on brand
                    let priceMultiplier = 1;
                    if (['bmw', 'mercedes'].includes(brand)) {
                        priceMultiplier = 1.8;
                    } else if (['toyota', 'nissan'].includes(brand)) {
                        priceMultiplier = 1.2;
                    }
                    
                    const part = {
                        id: `part_${partId++}`,
                        name: `${template.name} - ${brandData.name} ${model.name}`,
                        category: template.category,
                        brand: brand,
                        model: model.id,
                        price: Math.round(template.basePrice * priceMultiplier),
                        stock: Math.floor(Math.random() * 50) + 1,
                        image: template.icon,
                        description: `${template.name} عالي الجودة لسيارة ${brandData.name} ${model.name}`,
                        partNumber: `${brand.toUpperCase()}-${template.category.toUpperCase()}-${String(partId).padStart(3, '0')}`,
                        supplier: this.getRandomSupplierId(),
                        minStock: 5,
                        maxStock: 100,
                        location: `رف ${Math.floor(Math.random() * 10) + 1}-${String.fromCharCode(65 + Math.floor(Math.random() * 5))}`,
                        weight: Math.round((Math.random() * 5 + 0.5) * 100) / 100,
                        dimensions: {
                            length: Math.round(Math.random() * 50 + 10),
                            width: Math.round(Math.random() * 30 + 5),
                            height: Math.round(Math.random() * 20 + 3)
                        },
                        warranty: Math.floor(Math.random() * 12) + 6, // 6-18 months
                        isOriginal: Math.random() > 0.3, // 70% original parts
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    };
                    
                    sampleParts.push(part);
                });
            });
        });
        
        return sampleParts;
    }
    
    getRandomSupplierId() {
        const supplierIds = ['supplier_1', 'supplier_2', 'supplier_3'];
        return supplierIds[Math.floor(Math.random() * supplierIds.length)];
    }
    
    // Enhanced part management
    getParts(filters = {}) {
        let filtered = [...this.parts];
        
        if (filters.brand) {
            filtered = filtered.filter(part => part.brand === filters.brand);
        }
        
        if (filters.model) {
            filtered = filtered.filter(part => part.model === filters.model);
        }
        
        if (filters.category) {
            filtered = filtered.filter(part => part.category === filters.category);
        }
        
        if (filters.supplier) {
            filtered = filtered.filter(part => part.supplier === filters.supplier);
        }
        
        if (filters.stock === 'in-stock') {
            filtered = filtered.filter(part => part.stock > 0);
        } else if (filters.stock === 'out-of-stock') {
            filtered = filtered.filter(part => part.stock === 0);
        } else if (filters.stock === 'low-stock') {
            filtered = filtered.filter(part => part.stock <= this.lowStockThreshold && part.stock > 0);
        }
        
        if (filters.original !== undefined) {
            filtered = filtered.filter(part => part.isOriginal === filters.original);
        }
        
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filtered = filtered.filter(part => 
                part.name.toLowerCase().includes(searchTerm) ||
                part.description.toLowerCase().includes(searchTerm) ||
                part.partNumber.toLowerCase().includes(searchTerm)
            );
        }
        
        if (filters.priceMin) {
            filtered = filtered.filter(part => part.price >= filters.priceMin);
        }
        
        if (filters.priceMax) {
            filtered = filtered.filter(part => part.price <= filters.priceMax);
        }
        
        // Sorting
        if (filters.sortBy) {
            filtered.sort((a, b) => {
                switch (filters.sortBy) {
                    case 'name':
                        return a.name.localeCompare(b.name);
                    case 'price-asc':
                        return a.price - b.price;
                    case 'price-desc':
                        return b.price - a.price;
                    case 'stock-asc':
                        return a.stock - b.stock;
                    case 'stock-desc':
                        return b.stock - a.stock;
                    case 'newest':
                        return new Date(b.createdAt) - new Date(a.createdAt);
                    default:
                        return 0;
                }
            });
        }
        
        return filtered;
    }
    
    getPartById(id) {
        return this.parts.find(part => part.id === id);
    }
    
    addPart(partData) {
        const newPart = {
            id: this.generateId(),
            ...partData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        this.parts.push(newPart);
        this.saveToStorage();
        
        // Record stock movement
        this.recordStockMovement(newPart.id, 'add', newPart.stock, 'Initial stock');
        
        return newPart;
    }
    
    updatePart(partId, updates) {
        const partIndex = this.parts.findIndex(part => part.id === partId);
        if (partIndex !== -1) {
            const oldStock = this.parts[partIndex].stock;
            this.parts[partIndex] = { 
                ...this.parts[partIndex], 
                ...updates,
                updatedAt: new Date().toISOString()
            };
            
            // Record stock movement if stock changed
            if (updates.stock !== undefined && updates.stock !== oldStock) {
                const difference = updates.stock - oldStock;
                this.recordStockMovement(partId, difference > 0 ? 'add' : 'remove', Math.abs(difference), 'Manual adjustment');
            }
            
            this.saveToStorage();
            return this.parts[partIndex];
        }
        return null;
    }
    
    deletePart(partId) {
        const partIndex = this.parts.findIndex(part => part.id === partId);
        if (partIndex !== -1) {
            this.parts.splice(partIndex, 1);
            this.saveToStorage();
            return true;
        }
        return false;
    }
    
    // Stock management
    updateStock(partId, quantity, reason = 'Manual adjustment') {
        const part = this.getPartById(partId);
        if (part) {
            const oldStock = part.stock;
            part.stock = Math.max(0, part.stock + quantity);
            part.updatedAt = new Date().toISOString();
            
            this.saveToStorage();
            
            // Record stock movement
            this.recordStockMovement(partId, quantity > 0 ? 'add' : 'remove', Math.abs(quantity), reason);
            
            // Check for low stock
            if (part.stock <= this.lowStockThreshold && part.stock > 0) {
                this.notifyLowStock(part);
            }
            
            // Trigger inventory update event
            window.dispatchEvent(new CustomEvent('inventoryUpdated', { 
                detail: { partId, oldStock, newStock: part.stock } 
            }));
            
            return true;
        }
        return false;
    }
    
    // Stock movements tracking
    recordStockMovement(partId, type, quantity, reason) {
        const movement = {
            id: this.generateId(),
            partId,
            type, // 'add', 'remove', 'sale', 'return'
            quantity,
            reason,
            timestamp: new Date().toISOString(),
            user: window.auth?.getCurrentUser()?.id || 'system'
        };
        
        this.stockMovements.push(movement);
        this.saveToStorage();
    }
    
    getStockMovements(partId = null, limit = 50) {
        let movements = [...this.stockMovements];
        
        if (partId) {
            movements = movements.filter(m => m.partId === partId);
        }
        
        return movements
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, limit);
    }
    
    // Statistics and reporting
    getStockStatistics() {
        const total = this.parts.length;
        const inStock = this.parts.filter(part => part.stock > 0).length;
        const lowStock = this.getLowStockParts().length;
        const outOfStock = this.getOutOfStockParts().length;
        const totalValue = this.parts.reduce((sum, part) => sum + (part.price * part.stock), 0);
        
        // Category breakdown
        const categoryStats = this.categories.map(category => {
            const categoryParts = this.parts.filter(part => part.category === category.id);
            return {
                ...category,
                count: categoryParts.length,
                value: categoryParts.reduce((sum, part) => sum + (part.price * part.stock), 0),
                lowStock: categoryParts.filter(part => part.stock <= this.lowStockThreshold && part.stock > 0).length
            };
        });
        
        // Brand breakdown
        const brandStats = {};
        this.parts.forEach(part => {
            if (!brandStats[part.brand]) {
                brandStats[part.brand] = { count: 0, value: 0 };
            }
            brandStats[part.brand].count++;
            brandStats[part.brand].value += part.price * part.stock;
        });
        
        return {
            total,
            inStock,
            lowStock,
            outOfStock,
            totalValue,
            categoryStats,
            brandStats
        };
    }
    
    getLowStockParts() {
        return this.parts.filter(part => part.stock <= this.lowStockThreshold && part.stock > 0);
    }
    
    getOutOfStockParts() {
        return this.parts.filter(part => part.stock === 0);
    }
    
    getTopSellingParts(limit = 10) {
        // This would be based on sales data in a real system
        return this.parts
            .sort((a, b) => (b.totalSold || 0) - (a.totalSold || 0))
            .slice(0, limit);
    }
    
    // Supplier management
    getSuppliers() {
        return this.suppliers;
    }
    
    addSupplier(supplierData) {
        const newSupplier = {
            id: this.generateId(),
            ...supplierData,
            createdAt: new Date().toISOString()
        };
        
        this.suppliers.push(newSupplier);
        this.saveToStorage();
        return newSupplier;
    }
    
    updateSupplier(supplierId, updates) {
        const supplierIndex = this.suppliers.findIndex(s => s.id === supplierId);
        if (supplierIndex !== -1) {
            this.suppliers[supplierIndex] = { ...this.suppliers[supplierIndex], ...updates };
            this.saveToStorage();
            return this.suppliers[supplierIndex];
        }
        return null;
    }
    
    // Utility methods
    generateId() {
        return 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    notifyLowStock(part) {
        if (window.showNotification) {
            window.showNotification(
                `تحذير: مخزون منخفض - ${part.name} (${part.stock} متبقي)`,
                'warning'
            );
        }
        
        // In a real system, send email/SMS notifications
        console.log(`Low stock alert: ${part.name} - ${part.stock} remaining`);
    }
    
    // Barcode generation (simulation)
    generateBarcode(partId) {
        const part = this.getPartById(partId);
        if (part) {
            return `${part.brand.toUpperCase()}${part.partNumber}${partId.slice(-4)}`;
        }
        return null;
    }
    
    // Export data
    exportInventoryData(format = 'json') {
        const data = {
            parts: this.parts,
            suppliers: this.suppliers,
            stockMovements: this.stockMovements,
            exportDate: new Date().toISOString()
        };
        
        if (format === 'json') {
            return JSON.stringify(data, null, 2);
        } else if (format === 'csv') {
            return this.convertToCSV(this.parts);
        }
        
        return data;
    }
    
    convertToCSV(data) {
        const headers = ['ID', 'Name', 'Category', 'Brand', 'Model', 'Price', 'Stock', 'Part Number'];
        const csvContent = [
            headers.join(','),
            ...data.map(part => [
                part.id,
                `"${part.name}"`,
                part.category,
                part.brand,
                part.model,
                part.price,
                part.stock,
                part.partNumber
            ].join(','))
        ].join('\n');
        
        return csvContent;
    }
    
    // Search and filtering helpers
    searchParts(query) {
        const searchTerm = query.toLowerCase();
        return this.parts.filter(part => 
            part.name.toLowerCase().includes(searchTerm) ||
            part.description.toLowerCase().includes(searchTerm) ||
            part.partNumber.toLowerCase().includes(searchTerm) ||
            part.brand.toLowerCase().includes(searchTerm)
        );
    }
    
    getPartsByCategory(categoryId) {
        return this.parts.filter(part => part.category === categoryId);
    }
    
    getPartsByBrand(brandId) {
        return this.parts.filter(part => part.brand === brandId);
    }
    
    getPartsBySupplier(supplierId) {
        return this.parts.filter(part => part.supplier === supplierId);
    }
}

// Initialize enhanced inventory manager
document.addEventListener('DOMContentLoaded', () => {
    window.enhancedInventory = new EnhancedInventoryManager();
});

// Export for global use
window.EnhancedInventoryManager = EnhancedInventoryManager;