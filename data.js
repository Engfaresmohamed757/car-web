// Car Brands Data
const carBrands = [
    {
        id: 'toyota',
        name: 'Toyota',
        logo: 'assets/images/brands/toyota-logo.svg',
        popular: true,
        models: [
            { id: 'corolla', name: 'Corolla', year: '2015-2024' },
            { id: 'camry', name: 'Camry', year: '2012-2024' },
            { id: 'rav4', name: 'RAV4', year: '2013-2024' },
            { id: 'prius', name: 'Prius', year: '2010-2024' },
            { id: 'yaris', name: 'Yaris', year: '2014-2024' }
        ]
    },
    {
        id: 'hyundai',
        name: 'Hyundai',
        logo: 'assets/images/brands/hyundai-logo.svg',
        popular: true,
        models: [
            { id: 'elantra', name: 'Elantra', year: '2016-2024' },
            { id: 'tucson', name: 'Tucson', year: '2015-2024' },
            { id: 'accent', name: 'Accent', year: '2012-2024' },
            { id: 'santa-fe', name: 'Santa Fe', year: '2013-2024' },
            { id: 'i10', name: 'i10', year: '2014-2024' }
        ]
    },
    {
        id: 'kia',
        name: 'Kia',
        logo: 'assets/images/brands/kia-logo.svg',
        popular: true,
        models: [
            { id: 'cerato', name: 'Cerato', year: '2016-2024' },
            { id: 'sportage', name: 'Sportage', year: '2015-2024' },
            { id: 'picanto', name: 'Picanto', year: '2014-2024' },
            { id: 'sorento', name: 'Sorento', year: '2013-2024' },
            { id: 'rio', name: 'Rio', year: '2012-2024' }
        ]
    },
    {
        id: 'nissan',
        name: 'Nissan',
        logo: 'assets/images/brands/nissan-logo.svg',
        popular: true,
        models: [
            { id: 'sunny', name: 'Sunny', year: '2014-2024' },
            { id: 'sentra', name: 'Sentra', year: '2016-2024' },
            { id: 'x-trail', name: 'X-Trail', year: '2015-2024' },
            { id: 'altima', name: 'Altima', year: '2013-2024' },
            { id: 'micra', name: 'Micra', year: '2015-2024' }
        ]
    },
    {
        id: 'chevrolet',
        name: 'Chevrolet',
        logo: 'assets/images/brands/chevrolet-logo.svg',
        popular: true,
        models: [
            { id: 'aveo', name: 'Aveo', year: '2012-2020' },
            { id: 'cruze', name: 'Cruze', year: '2014-2024' },
            { id: 'captiva', name: 'Captiva', year: '2013-2024' },
            { id: 'optra', name: 'Optra', year: '2010-2018' },
            { id: 'lanos', name: 'Lanos', year: '2008-2016' }
        ]
    },
    {
        id: 'bmw',
        name: 'BMW',
        logo: 'assets/images/brands/bmw-logo.svg',
        popular: false,
        models: [
            { id: '3-series', name: '3 Series', year: '2012-2024' },
            { id: '5-series', name: '5 Series', year: '2010-2024' },
            { id: 'x3', name: 'X3', year: '2014-2024' },
            { id: 'x5', name: 'X5', year: '2013-2024' },
            { id: '1-series', name: '1 Series', year: '2015-2024' }
        ]
    },
    {
        id: 'mercedes',
        name: 'Mercedes-Benz',
        logo: 'assets/images/brands/mercedes-logo.svg',
        popular: false,
        models: [
            { id: 'c-class', name: 'C-Class', year: '2014-2024' },
            { id: 'e-class', name: 'E-Class', year: '2012-2024' },
            { id: 'glc', name: 'GLC', year: '2016-2024' },
            { id: 'a-class', name: 'A-Class', year: '2018-2024' },
            { id: 's-class', name: 'S-Class', year: '2013-2024' }
        ]
    },
    {
        id: 'peugeot',
        name: 'Peugeot',
        logo: 'assets/images/brands/peugeot-logo.svg',
        popular: true,
        models: [
            { id: '301', name: '301', year: '2013-2024' },
            { id: '308', name: '308', year: '2014-2024' },
            { id: '2008', name: '2008', year: '2016-2024' },
            { id: '508', name: '508', year: '2015-2024' },
            { id: '3008', name: '3008', year: '2017-2024' }
        ]
    }
];

// Spare Parts Data - Extended with more products
const spareParts = [
    // Toyota Corolla Parts
    {
        id: 'engine-oil-filter-toyota',
        name: 'فلتر زيت المحرك',
        category: 'engine',
        price: 150,
        stock: 25,
        brand: 'toyota',
        model: 'corolla',
        image: 'fas fa-filter',
        description: 'فلتر زيت عالي الجودة لتويوتا كورولا',
        partNumber: 'TOY-OF-001',
        images: ['assets/images/parts/oil-filter-1.jpg', 'assets/images/parts/oil-filter-2.jpg']
    },
    {
        id: 'air-filter-toyota',
        name: 'فلتر الهواء',
        category: 'engine',
        price: 200,
        stock: 15,
        brand: 'toyota',
        model: 'corolla',
        image: 'fas fa-wind',
        description: 'فلتر هواء ممتاز لأداء محرك مثالي',
        partNumber: 'TOY-AF-001',
        images: ['assets/images/parts/air-filter-1.jpg']
    },
    {
        id: 'spark-plugs-toyota',
        name: 'شمعات الإشعال (4 قطع)',
        category: 'engine',
        price: 320,
        stock: 8,
        brand: 'toyota',
        model: 'corolla',
        image: 'fas fa-bolt',
        description: 'شمعات إشعال NGK لتويوتا كورولا',
        partNumber: 'TOY-SP-001',
        images: ['assets/images/parts/spark-plugs-1.jpg']
    },
    {
        id: 'timing-belt-toyota',
        name: 'سير التوقيت',
        category: 'engine',
        price: 450,
        stock: 0,
        brand: 'toyota',
        model: 'corolla',
        image: 'fas fa-cog',
        description: 'سير توقيت أصلي لتويوتا كورولا',
        partNumber: 'TOY-TB-001',
        images: ['assets/images/parts/timing-belt-1.jpg']
    },
    {
        id: 'radiator-toyota',
        name: 'رادياتير التبريد',
        category: 'engine',
        price: 850,
        stock: 5,
        brand: 'toyota',
        model: 'corolla',
        image: 'fas fa-thermometer-half',
        description: 'رادياتير تبريد أصلي لتويوتا كورولا',
        partNumber: 'TOY-RAD-001',
        images: ['assets/images/parts/radiator-1.jpg']
    },
    {
        id: 'water-pump-toyota',
        name: 'طلمبة المياه',
        category: 'engine',
        price: 380,
        stock: 12,
        brand: 'toyota',
        model: 'corolla',
        image: 'fas fa-tint',
        description: 'طلمبة مياه عالية الجودة',
        partNumber: 'TOY-WP-001',
        images: ['assets/images/parts/water-pump-1.jpg']
    },
    
    // Brake Parts - Toyota
    {
        id: 'brake-pads-front-toyota',
        name: 'تيل فرامل أمامي',
        category: 'brakes',
        price: 380,
        stock: 12,
        brand: 'toyota',
        model: 'corolla',
        image: 'fas fa-stop-circle',
        description: 'تيل فرامل سيراميك للعجلات الأمامية',
        partNumber: 'TOY-BP-F001',
        images: ['assets/images/parts/brake-pads-front-1.jpg']
    },
    {
        id: 'brake-pads-rear-toyota',
        name: 'تيل فرامل خلفي',
        category: 'brakes',
        price: 320,
        stock: 18,
        brand: 'toyota',
        model: 'corolla',
        image: 'fas fa-stop-circle',
        description: 'تيل فرامل سيراميك للعجلات الخلفية',
        partNumber: 'TOY-BP-R001',
        images: ['assets/images/parts/brake-pads-rear-1.jpg']
    },
    {
        id: 'brake-discs-toyota',
        name: 'أقراص الفرامل (زوج)',
        category: 'brakes',
        price: 850,
        stock: 6,
        brand: 'toyota',
        model: 'corolla',
        image: 'fas fa-compact-disc',
        description: 'أقراص فرامل مهواة لتويوتا كورولا',
        partNumber: 'TOY-BD-001',
        images: ['assets/images/parts/brake-discs-1.jpg']
    },
    {
        id: 'brake-fluid-toyota',
        name: 'زيت الفرامل',
        category: 'brakes',
        price: 120,
        stock: 30,
        brand: 'toyota',
        model: 'corolla',
        image: 'fas fa-oil-can',
        description: 'زيت فرامل DOT 4 عالي الجودة',
        partNumber: 'TOY-BF-001',
        images: ['assets/images/parts/brake-fluid-1.jpg']
    },
    
    // Suspension Parts - Toyota
    {
        id: 'shock-absorbers-toyota',
        name: 'مساعدين (زوج)',
        category: 'suspension',
        price: 1200,
        stock: 4,
        brand: 'toyota',
        model: 'corolla',
        image: 'fas fa-arrows-alt-v',
        description: 'مساعدين غاز لقيادة مريحة',
        partNumber: 'TOY-SA-001',
        images: ['assets/images/parts/shock-absorbers-1.jpg']
    },
    {
        id: 'coil-springs-toyota',
        name: 'سوست التعليق (زوج)',
        category: 'suspension',
        price: 680,
        stock: 7,
        brand: 'toyota',
        model: 'corolla',
        image: 'fas fa-compress-arrows-alt',
        description: 'سوست تعليق قوية لتويوتا كورولا',
        partNumber: 'TOY-CS-001',
        images: ['assets/images/parts/coil-springs-1.jpg']
    },
    {
        id: 'stabilizer-bar-toyota',
        name: 'عمود التوازن',
        category: 'suspension',
        price: 450,
        stock: 8,
        brand: 'toyota',
        model: 'corolla',
        image: 'fas fa-balance-scale',
        description: 'عمود توازن أمامي لتويوتا كورولا',
        partNumber: 'TOY-SB-001',
        images: ['assets/images/parts/stabilizer-bar-1.jpg']
    },
    
    // Electrical Parts - Toyota
    {
        id: 'alternator-toyota',
        name: 'الدينامو',
        category: 'electrical',
        price: 1800,
        stock: 3,
        brand: 'toyota',
        model: 'corolla',
        image: 'fas fa-battery-three-quarters',
        description: 'دينامو 12 فولت لتويوتا كورولا',
        partNumber: 'TOY-ALT-001',
        images: ['assets/images/parts/alternator-1.jpg']
    },
    {
        id: 'starter-motor-toyota',
        name: 'المارش',
        category: 'electrical',
        price: 1500,
        stock: 5,
        brand: 'toyota',
        model: 'corolla',
        image: 'fas fa-play-circle',
        description: 'مارش عالي القوة',
        partNumber: 'TOY-SM-001',
        images: ['assets/images/parts/starter-motor-1.jpg']
    },
    {
        id: 'headlight-bulbs-toyota',
        name: 'لمبات الإنارة الأمامية (زوج)',
        category: 'electrical',
        price: 180,
        stock: 20,
        brand: 'toyota',
        model: 'corolla',
        image: 'fas fa-lightbulb',
        description: 'لمبات LED للإنارة الأمامية لرؤية أفضل',
        partNumber: 'TOY-HB-001',
        images: ['assets/images/parts/headlight-bulbs-1.jpg']
    },
    {
        id: 'battery-toyota',
        name: 'بطارية السيارة',
        category: 'electrical',
        price: 950,
        stock: 8,
        brand: 'toyota',
        model: 'corolla',
        image: 'fas fa-car-battery',
        description: 'بطارية 12V 70Ah لتويوتا كورولا',
        partNumber: 'TOY-BAT-001',
        images: ['assets/images/parts/battery-1.jpg']
    },
    
    // Body Parts - Toyota
    {
        id: 'side-mirror-right-toyota',
        name: 'مرآة جانبية يمين',
        category: 'body',
        price: 420,
        stock: 8,
        brand: 'toyota',
        model: 'corolla',
        image: 'fas fa-mirror',
        description: 'مرآة جانبية كهربائية مع تدفئة',
        partNumber: 'TOY-SM-R001',
        images: ['assets/images/parts/side-mirror-1.jpg']
    },
    {
        id: 'side-mirror-left-toyota',
        name: 'مرآة جانبية يسار',
        category: 'body',
        price: 420,
        stock: 6,
        brand: 'toyota',
        model: 'corolla',
        image: 'fas fa-mirror',
        description: 'مرآة جانبية كهربائية مع تدفئة',
        partNumber: 'TOY-SM-L001',
        images: ['assets/images/parts/side-mirror-2.jpg']
    },
    {
        id: 'bumper-front-toyota',
        name: 'صدام أمامي',
        category: 'body',
        price: 2200,
        stock: 2,
        brand: 'toyota',
        model: 'corolla',
        image: 'fas fa-car-crash',
        description: 'صدام أمامي أصلي لتويوتا كورولا',
        partNumber: 'TOY-FB-001',
        images: ['assets/images/parts/bumper-front-1.jpg']
    },
    {
        id: 'bumper-rear-toyota',
        name: 'صدام خلفي',
        category: 'body',
        price: 1800,
        stock: 3,
        brand: 'toyota',
        model: 'corolla',
        image: 'fas fa-car-crash',
        description: 'صدام خلفي أصلي لتويوتا كورولا',
        partNumber: 'TOY-RB-001',
        images: ['assets/images/parts/bumper-rear-1.jpg']
    },
    
    // Hyundai Elantra Parts
    {
        id: 'oil-filter-hyundai',
        name: 'فلتر زيت المحرك',
        category: 'engine',
        price: 140,
        stock: 30,
        brand: 'hyundai',
        model: 'elantra',
        image: 'fas fa-filter',
        description: 'فلتر زيت أصلي لهيونداي إلانترا',
        partNumber: 'HYU-OF-001',
        images: ['assets/images/parts/oil-filter-hyundai-1.jpg']
    },
    {
        id: 'brake-pads-hyundai',
        name: 'تيل فرامل أمامي',
        category: 'brakes',
        price: 360,
        stock: 15,
        brand: 'hyundai',
        model: 'elantra',
        image: 'fas fa-stop-circle',
        description: 'تيل فرامل ممتاز لهيونداي إلانترا',
        partNumber: 'HYU-BP-001',
        images: ['assets/images/parts/brake-pads-hyundai-1.jpg']
    },
    {
        id: 'air-filter-hyundai',
        name: 'فلتر الهواء',
        category: 'engine',
        price: 180,
        stock: 20,
        brand: 'hyundai',
        model: 'elantra',
        image: 'fas fa-wind',
        description: 'فلتر هواء عالي الكفاءة لهيونداي إلانترا',
        partNumber: 'HYU-AF-001',
        images: ['assets/images/parts/air-filter-hyundai-1.jpg']
    },
    
    // BMW 3 Series Parts
    {
        id: 'oil-filter-bmw',
        name: 'فلتر زيت المحرك',
        category: 'engine',
        price: 280,
        stock: 12,
        brand: 'bmw',
        model: '3-series',
        image: 'fas fa-filter',
        description: 'فلتر زيت أصلي BMW للفئة الثالثة',
        partNumber: 'BMW-OF-001',
        images: ['assets/images/parts/oil-filter-bmw-1.jpg']
    },
    {
        id: 'brake-pads-bmw',
        name: 'تيل فرامل أمامي',
        category: 'brakes',
        price: 650,
        stock: 8,
        brand: 'bmw',
        model: '3-series',
        image: 'fas fa-stop-circle',
        description: 'تيل فرامل عالي الأداء لBMW الفئة الثالثة',
        partNumber: 'BMW-BP-001',
        images: ['assets/images/parts/brake-pads-bmw-1.jpg']
    },
    {
        id: 'air-filter-bmw',
        name: 'فلتر الهواء',
        category: 'engine',
        price: 320,
        stock: 10,
        brand: 'bmw',
        model: '3-series',
        image: 'fas fa-wind',
        description: 'فلتر هواء أصلي BMW للفئة الثالثة',
        partNumber: 'BMW-AF-001',
        images: ['assets/images/parts/air-filter-bmw-1.jpg']
    },
    
    // Mercedes C-Class Parts
    {
        id: 'oil-filter-mercedes',
        name: 'فلتر زيت المحرك',
        category: 'engine',
        price: 320,
        stock: 10,
        brand: 'mercedes',
        model: 'c-class',
        image: 'fas fa-filter',
        description: 'فلتر زيت أصلي مرسيدس للفئة C',
        partNumber: 'MER-OF-001',
        images: ['assets/images/parts/oil-filter-mercedes-1.jpg']
    },
    {
        id: 'air-filter-mercedes',
        name: 'فلتر الهواء',
        category: 'engine',
        price: 380,
        stock: 6,
        brand: 'mercedes',
        model: 'c-class',
        image: 'fas fa-wind',
        description: 'فلتر هواء ممتاز لمرسيدس الفئة C',
        partNumber: 'MER-AF-001',
        images: ['assets/images/parts/air-filter-mercedes-1.jpg']
    },
    {
        id: 'brake-pads-mercedes',
        name: 'تيل فرامل أمامي',
        category: 'brakes',
        price: 750,
        stock: 5,
        brand: 'mercedes',
        model: 'c-class',
        image: 'fas fa-stop-circle',
        description: 'تيل فرامل أصلي لمرسيدس الفئة C',
        partNumber: 'MER-BP-001',
        images: ['assets/images/parts/brake-pads-mercedes-1.jpg']
    },
    
    // Kia Cerato Parts
    {
        id: 'oil-filter-kia',
        name: 'فلتر زيت المحرك',
        category: 'engine',
        price: 130,
        stock: 25,
        brand: 'kia',
        model: 'cerato',
        image: 'fas fa-filter',
        description: 'فلتر زيت عالي الجودة لكيا سيراتو',
        partNumber: 'KIA-OF-001',
        images: ['assets/images/parts/oil-filter-kia-1.jpg']
    },
    {
        id: 'brake-pads-kia',
        name: 'تيل فرامل أمامي',
        category: 'brakes',
        price: 340,
        stock: 18,
        brand: 'kia',
        model: 'cerato',
        image: 'fas fa-stop-circle',
        description: 'تيل فرامل ممتاز لكيا سيراتو',
        partNumber: 'KIA-BP-001',
        images: ['assets/images/parts/brake-pads-kia-1.jpg']
    },
    
    // Nissan Sunny Parts
    {
        id: 'oil-filter-nissan',
        name: 'فلتر زيت المحرك',
        category: 'engine',
        price: 145,
        stock: 22,
        brand: 'nissan',
        model: 'sunny',
        image: 'fas fa-filter',
        description: 'فلتر زيت أصلي لنيسان صني',
        partNumber: 'NIS-OF-001',
        images: ['assets/images/parts/oil-filter-nissan-1.jpg']
    },
    {
        id: 'brake-pads-nissan',
        name: 'تيل فرامل أمامي',
        category: 'brakes',
        price: 350,
        stock: 16,
        brand: 'nissan',
        model: 'sunny',
        image: 'fas fa-stop-circle',
        description: 'تيل فرامل عالي الجودة لنيسان صني',
        partNumber: 'NIS-BP-001',
        images: ['assets/images/parts/brake-pads-nissan-1.jpg']
    },
    
    // Chevrolet Cruze Parts
    {
        id: 'oil-filter-chevrolet',
        name: 'فلتر زيت المحرك',
        category: 'engine',
        price: 160,
        stock: 18,
        brand: 'chevrolet',
        model: 'cruze',
        image: 'fas fa-filter',
        description: 'فلتر زيت أصلي لشيفروليه كروز',
        partNumber: 'CHE-OF-001',
        images: ['assets/images/parts/oil-filter-chevrolet-1.jpg']
    },
    {
        id: 'brake-pads-chevrolet',
        name: 'تيل فرامل أمامي',
        category: 'brakes',
        price: 370,
        stock: 14,
        brand: 'chevrolet',
        model: 'cruze',
        image: 'fas fa-stop-circle',
        description: 'تيل فرامل ممتاز لشيفروليه كروز',
        partNumber: 'CHE-BP-001',
        images: ['assets/images/parts/brake-pads-chevrolet-1.jpg']
    },
    
    // Peugeot 301 Parts
    {
        id: 'oil-filter-peugeot',
        name: 'فلتر زيت المحرك',
        category: 'engine',
        price: 155,
        stock: 20,
        brand: 'peugeot',
        model: '301',
        image: 'fas fa-filter',
        description: 'فلتر زيت أصلي لبيجو 301',
        partNumber: 'PEU-OF-001',
        images: ['assets/images/parts/oil-filter-peugeot-1.jpg']
    },
    {
        id: 'brake-pads-peugeot',
        name: 'تيل فرامل أمامي',
        category: 'brakes',
        price: 365,
        stock: 12,
        brand: 'peugeot',
        model: '301',
        image: 'fas fa-stop-circle',
        description: 'تيل فرامل عالي الجودة لبيجو 301',
        partNumber: 'PEU-BP-001',
        images: ['assets/images/parts/brake-pads-peugeot-1.jpg']
    }
];

// Inventory Management
class InventoryManager {
    constructor() {
        this.parts = [...spareParts];
        this.lowStockThreshold = 5;
        this.loadFromStorage();
    }
    
    loadFromStorage() {
        const stored = localStorage.getItem('autoparts_inventory');
        if (stored) {
            this.parts = JSON.parse(stored);
        }
    }
    
    saveToStorage() {
        localStorage.setItem('autoparts_inventory', JSON.stringify(this.parts));
    }
    
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
        
        if (filters.stock === 'in-stock') {
            filtered = filtered.filter(part => part.stock > 0);
        } else if (filters.stock === 'out-of-stock') {
            filtered = filtered.filter(part => part.stock === 0);
        }
        
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filtered = filtered.filter(part => 
                part.name.toLowerCase().includes(searchTerm) ||
                part.description.toLowerCase().includes(searchTerm) ||
                part.partNumber.toLowerCase().includes(searchTerm)
            );
        }
        
        return filtered;
    }
    
    getPartById(id) {
        return this.parts.find(part => part.id === id);
    }
    
    updateStock(partId, quantity) {
        const part = this.getPartById(partId);
        if (part) {
            part.stock = Math.max(0, part.stock + quantity);
            this.saveToStorage();
            
            // Check for low stock
            if (part.stock <= this.lowStockThreshold && part.stock > 0) {
                this.notifyLowStock(part);
            }
            
            return true;
        }
        return false;
    }
    
    addPart(partData) {
        const newPart = {
            id: this.generateId(),
            ...partData
        };
        this.parts.push(newPart);
        this.saveToStorage();
        return newPart;
    }
    
    updatePart(partId, updates) {
        const partIndex = this.parts.findIndex(part => part.id === partId);
        if (partIndex !== -1) {
            this.parts[partIndex] = { ...this.parts[partIndex], ...updates };
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
    
    generateId() {
        return 'part_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    notifyLowStock(part) {
        if (window.showNotification) {
            window.showNotification(
                `Low stock alert: ${part.name} (${part.stock} remaining)`,
                'warning'
            );
        }
    }
    
    getLowStockParts() {
        return this.parts.filter(part => part.stock <= this.lowStockThreshold && part.stock > 0);
    }
    
    getOutOfStockParts() {
        return this.parts.filter(part => part.stock === 0);
    }
    
    getStockStatistics() {
        const total = this.parts.length;
        const inStock = this.parts.filter(part => part.stock > 0).length;
        const lowStock = this.getLowStockParts().length;
        const outOfStock = this.getOutOfStockParts().length;
        
        return {
            total,
            inStock,
            lowStock,
            outOfStock,
            totalValue: this.parts.reduce((sum, part) => sum + (part.price * part.stock), 0)
        };
    }
}

// Order Management
class OrderManager {
    constructor() {
        this.orders = [];
        this.loadFromStorage();
    }
    
    loadFromStorage() {
        const stored = localStorage.getItem('autoparts_orders');
        if (stored) {
            this.orders = JSON.parse(stored);
        }
    }
    
    saveToStorage() {
        localStorage.setItem('autoparts_orders', JSON.stringify(this.orders));
    }
    
    createOrder(orderData) {
        const order = {
            id: this.generateOrderId(),
            ...orderData,
            status: 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        this.orders.push(order);
        this.saveToStorage();
        return order;
    }
    
    updateOrderStatus(orderId, status) {
        const order = this.orders.find(o => o.id === orderId);
        if (order) {
            order.status = status;
            order.updatedAt = new Date().toISOString();
            this.saveToStorage();
            return order;
        }
        return null;
    }
    
    getOrders(filters = {}) {
        let filtered = [...this.orders];
        
        if (filters.status) {
            filtered = filtered.filter(order => order.status === filters.status);
        }
        
        return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    getOrderById(orderId) {
        return this.orders.find(order => order.id === orderId);
    }
    
    generateOrderId() {
        return 'ORD-' + Date.now().toString().slice(-8);
    }
}

// Initialize managers
const inventoryManager = new InventoryManager();
const orderManager = new OrderManager();

// Export for use in other files
window.carBrands = carBrands;
window.inventoryManager = inventoryManager;
window.orderManager = orderManager;


// Additional Car Parts - Extended Inventory
const additionalParts = [
    // Suspension Parts
    {
        id: 'shock-absorbers-front-toyota',
        name: 'مساعدين أمامي (زوج)',
        category: 'suspension',
        price: 1200,
        stock: 6,
        brand: 'toyota',
        model: 'corolla',
        image: 'fas fa-arrows-alt-v',
        description: 'مساعدين غاز أمامي عالي الجودة لتويوتا كورولا',
        partNumber: 'TOY-SA-F001',
        images: ['https://i.pinimg.com/564x/ab/cd/ef/abcdef1234567890abcdef1234567890.jpg']
    },
    {
        id: 'shock-absorbers-rear-toyota',
        name: 'مساعدين خلفي (زوج)',
        category: 'suspension',
        price: 1100,
        stock: 8,
        brand: 'toyota',
        model: 'corolla',
        image: 'fas fa-arrows-alt-v',
        description: 'مساعدين غاز خلفي لقيادة مريحة',
        partNumber: 'TOY-SA-R001',
        images: ['https://i.pinimg.com/564x/12/34/56/123456789abcdef0123456789abcdef0.jpg']
    },
    
    // Lighting Parts
    {
        id: 'headlight-left-toyota',
        name: 'فانوس أمامي يسار',
        category: 'electrical',
        price: 850,
        stock: 4,
        brand: 'toyota',
        model: 'corolla',
        image: 'fas fa-lightbulb',
        description: 'فانوس أمامي LED يسار لتويوتا كورولا',
        partNumber: 'TOY-HL-L001',
        images: ['https://i.pinimg.com/564x/23/45/67/234567890abcdef1234567890abcdef1.jpg']
    },
    {
        id: 'headlight-right-toyota',
        name: 'فانوس أمامي يمين',
        category: 'electrical',
        price: 850,
        stock: 4,
        brand: 'toyota',
        model: 'corolla',
        image: 'fas fa-lightbulb',
        description: 'فانوس أمامي LED يمين لتويوتا كورولا',
        partNumber: 'TOY-HL-R001',
        images: ['https://i.pinimg.com/564x/34/56/78/3456789abcdef01234567890abcdef12.jpg']
    },
    {
        id: 'taillight-left-toyota',
        name: 'فانوس خلفي يسار',
        category: 'electrical',
        price: 650,
        stock: 5,
        brand: 'toyota',
        model: 'corolla',
        image: 'fas fa-lightbulb',
        description: 'فانوس خلفي LED يسار',
        partNumber: 'TOY-TL-L001',
        images: ['https://i.pinimg.com/564x/45/67/89/456789abcdef012345678901abcdef23.jpg']
    },
    
    // Cooling System
    {
        id: 'thermostat-toyota',
        name: 'ثرموستات المحرك',
        category: 'engine',
        price: 180,
        stock: 15,
        brand: 'toyota',
        model: 'corolla',
        image: 'fas fa-thermometer-half',
        description: 'ثرموستات أصلي لتنظيم حرارة المحرك',
        partNumber: 'TOY-TH-001',
        images: ['https://i.pinimg.com/564x/56/78/9a/56789abcdef0123456789012abcdef34.jpg']
    },
    {
        id: 'coolant-hose-toyota',
        name: 'خرطوم المياه العلوي',
        category: 'engine',
        price: 120,
        stock: 20,
        brand: 'toyota',
        model: 'corolla',
        image: 'fas fa-tint',
        description: 'خرطوم مياه التبريد العلوي',
        partNumber: 'TOY-CH-001',
        images: ['https://i.pinimg.com/564x/67/89/ab/6789abcdef01234567890123abcdef45.jpg']
    },
    
    // Transmission Parts
    {
        id: 'transmission-oil-filter-toyota',
        name: 'فلتر زيت الفتيس',
        category: 'engine',
        price: 280,
        stock: 10,
        brand: 'toyota',
        model: 'corolla',
        image: 'fas fa-filter',
        description: 'فلتر زيت الفتيس الأوتوماتيك',
        partNumber: 'TOY-TOF-001',
        images: ['https://i.pinimg.com/564x/78/9a/bc/789abcdef012345678901234abcdef56.jpg']
    },
    {
        id: 'clutch-kit-toyota',
        name: 'طقم الدبرياج (كامل)',
        category: 'engine',
        price: 1800,
        stock: 3,
        brand: 'toyota',
        model: 'corolla',
        image: 'fas fa-cog',
        description: 'طقم دبرياج كامل مع الاسطوانة',
        partNumber: 'TOY-CK-001',
        images: ['https://i.pinimg.com/564x/89/ab/cd/89abcdef0123456789012345abcdef67.jpg']
    },
    
    // Hyundai Parts
    {
        id: 'engine-mount-hyundai',
        name: 'كاوتش المكينة',
        category: 'engine',
        price: 320,
        stock: 12,
        brand: 'hyundai',
        model: 'elantra',
        image: 'fas fa-cog',
        description: 'كاوتش تثبيت المحرك لهيونداي إلانترا',
        partNumber: 'HYU-EM-001',
        images: ['https://i.pinimg.com/564x/9a/bc/de/9abcdef01234567890123456abcdef78.jpg']
    },
    {
        id: 'fuel-pump-hyundai',
        name: 'طلمبة البنزين',
        category: 'engine',
        price: 950,
        stock: 5,
        brand: 'hyundai',
        model: 'elantra',
        image: 'fas fa-gas-pump',
        description: 'طلمبة بنزين كهربائية لهيونداي إلانترا',
        partNumber: 'HYU-FP-001',
        images: ['https://i.pinimg.com/564x/ab/cd/ef/abcdef0123456789012345678abcdef89.jpg']
    },
    {
        id: 'wheel-bearing-hyundai',
        name: 'رولمان بلي العجلة الأمامية',
        category: 'suspension',
        price: 280,
        stock: 18,
        brand: 'hyundai',
        model: 'elantra',
        image: 'fas fa-circle',
        description: 'رولمان بلي أمامي عالي الجودة',
        partNumber: 'HYU-WB-001',
        images: ['https://i.pinimg.com/564x/bc/de/f0/bcdef012345678901234567890abcdef.jpg']
    },
    
    // Kia Parts
    {
        id: 'cabin-filter-kia',
        name: 'فلتر المكيف',
        category: 'electrical',
        price: 150,
        stock: 25,
        brand: 'kia',
        model: 'cerato',
        image: 'fas fa-wind',
        description: 'فلتر مكيف الهواء لكيا سيراتو',
        partNumber: 'KIA-CF-001',
        images: ['https://i.pinimg.com/564x/cd/ef/01/cdef0123456789012345678901abcdef.jpg']
    },
    {
        id: 'wiper-blades-kia',
        name: 'مساحات الزجاج (زوج)',
        category: 'body',
        price: 180,
        stock: 30,
        brand: 'kia',
        model: 'cerato',
        image: 'fas fa-wind',
        description: 'مساحات زجاج أمامي سيليكون',
        partNumber: 'KIA-WB-001',
        images: ['https://i.pinimg.com/564x/de/f0/12/def01234567890123456789012abcdef.jpg']
    },
    {
        id: 'door-handle-kia',
        name: 'مقبض الباب الخارجي',
        category: 'body',
        price: 220,
        stock: 8,
        brand: 'kia',
        model: 'cerato',
        image: 'fas fa-door-open',
        description: 'مقبض باب خارجي كروم',
        partNumber: 'KIA-DH-001',
        images: ['https://i.pinimg.com/564x/ef/01/23/ef0123456789012345678901234abcdef.jpg']
    },
    
    // BMW Parts
    {
        id: 'oxygen-sensor-bmw',
        name: 'حساس الأكسجين',
        category: 'engine',
        price: 850,
        stock: 4,
        brand: 'bmw',
        model: '3-series',
        image: 'fas fa-microchip',
        description: 'حساس أكسجين أصلي BMW',
        partNumber: 'BMW-OS-001',
        images: ['https://i.pinimg.com/564x/f0/12/34/f01234567890123456789012345abcdef.jpg']
    },
    {
        id: 'control-arm-bmw',
        name: 'ذراع التعليق الأمامي',
        category: 'suspension',
        price: 1200,
        stock: 6,
        brand: 'bmw',
        model: '3-series',
        image: 'fas fa-wrench',
        description: 'ذراع تعليق أمامي سفلي BMW',
        partNumber: 'BMW-CA-001',
        images: ['https://i.pinimg.com/564x/01/23/45/012345678901234567890123456abcdef.jpg']
    },
    
    // Mercedes Parts
    {
        id: 'mass-airflow-sensor-mercedes',
        name: 'حساس الهواء',
        category: 'engine',
        price: 1200,
        stock: 3,
        brand: 'mercedes',
        model: 'c-class',
        image: 'fas fa-microchip',
        description: 'حساس كتلة الهواء لمرسيدس',
        partNumber: 'MER-MAF-001',
        images: ['https://i.pinimg.com/564x/12/34/56/123456789012345678901234567abcdef.jpg']
    },
    {
        id: 'window-regulator-mercedes',
        name: 'مكينة الزجاج الأمامية',
        category: 'electrical',
        price: 950,
        stock: 4,
        brand: 'mercedes',
        model: 'c-class',
        image: 'fas fa-window-maximize',
        description: 'مكينة رفع الزجاج الكهربائية',
        partNumber: 'MER-WR-001',
        images: ['https://i.pinimg.com/564x/23/45/67/234567890123456789012345678abcdef.jpg']
    },
    
    // Nissan Parts
    {
        id: 'cv-joint-nissan',
        name: 'كرسية المحور',
        category: 'suspension',
        price: 450,
        stock: 10,
        brand: 'nissan',
        model: 'sunny',
        image: 'fas fa-cog',
        description: 'كرسية محور أمامي لنيسان صني',
        partNumber: 'NIS-CV-001',
        images: ['https://i.pinimg.com/564x/34/56/78/345678901234567890123456789abcdef.jpg']
    },
    {
        id: 'horn-nissan',
        name: 'بوق السيارة',
        category: 'electrical',
        price: 120,
        stock: 15,
        brand: 'nissan',
        model: 'sunny',
        image: 'fas fa-volume-up',
        description: 'بوق كهربائي عالي الصوت',
        partNumber: 'NIS-HN-001',
        images: ['https://i.pinimg.com/564x/45/67/89/456789012345678901234567890abcdef.jpg']
    },
    
    // Chevrolet Parts
    {
        id: 'ignition-coil-chevrolet',
        name: 'كويل الإشعال',
        category: 'engine',
        price: 380,
        stock: 12,
        brand: 'chevrolet',
        model: 'cruze',
        image: 'fas fa-bolt',
        description: 'كويل إشعال لشيفروليه كروز',
        partNumber: 'CHE-IC-001',
        images: ['https://i.pinimg.com/564x/56/78/9a/56789012345678901234567890abcdef.jpg']
    },
    {
        id: 'tie-rod-end-chevrolet',
        name: 'طرف عمود الدركسون',
        category: 'suspension',
        price: 180,
        stock: 20,
        brand: 'chevrolet',
        model: 'cruze',
        image: 'fas fa-wrench',
        description: 'طرف عمود دركسون خارجي',
        partNumber: 'CHE-TRE-001',
        images: ['https://i.pinimg.com/564x/67/89/ab/6789012345678901234567890abcdef1.jpg']
    },
    
    // Peugeot Parts
    {
        id: 'fuel-filter-peugeot',
        name: 'فلتر البنزين',
        category: 'engine',
        price: 140,
        stock: 18,
        brand: 'peugeot',
        model: '301',
        image: 'fas fa-filter',
        description: 'فلتر بنزين لبيجو 301',
        partNumber: 'PEU-FF-001',
        images: ['https://i.pinimg.com/564x/78/9a/bc/789012345678901234567890abcdef12.jpg']
    },
    {
        id: 'fog-light-peugeot',
        name: 'كشاف ضباب',
        category: 'electrical',
        price: 280,
        stock: 10,
        brand: 'peugeot',
        model: '301',
        image: 'fas fa-lightbulb',
        description: 'كشاف ضباب أمامي LED',
        partNumber: 'PEU-FL-001',
        images: ['https://i.pinimg.com/564x/89/ab/cd/89012345678901234567890abcdef123.jpg']
    }
];

// Merge additional parts with existing parts
spareParts.push(...additionalParts);