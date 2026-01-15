// Translation System
const translations = {
    en: {
        // Navigation
        nav: {
            home: "Home",
            brands: "Brands",
            parts: "Parts",
            services: "Services",
            contact: "Contact"
        },
        
        // Hero Section
        hero: {
            title: "قطع غيار السيارات في مصر",
            subtitle: "قطع غيار عالية الجودة لجميع ماركات السيارات مع توصيل سريع في جميع أنحاء مصر",
            cta: "اختر سيارتك"
        },
        
        // Brands Section
        brands: {
            title: "اختر ماركة سيارتك"
        },
        
        // Models Section
        models: {
            title: "Select Your Model"
        },
        
        // Parts Section
        parts: {
            title: "Spare Parts"
        },
        
        // Filters
        filters: {
            category: "Category",
            all: "All",
            engine: "Engine",
            brakes: "Brakes",
            suspension: "Suspension",
            electrical: "Electrical",
            body: "Body Parts",
            stock: "Stock",
            inStock: "In Stock",
            outOfStock: "Out of Stock"
        },
        
        // Services Section
        services: {
            title: "Our Services",
            delivery: {
                title: "Fast Delivery",
                desc: "Same day delivery in Cairo and Giza"
            },
            installation: {
                title: "Installation Service",
                desc: "Professional installation by certified mechanics"
            },
            warranty: {
                title: "Warranty",
                desc: "1 year warranty on all genuine parts"
            },
            support: {
                title: "24/7 Support",
                desc: "Round the clock customer support"
            }
        },
        
        // Cart
        cart: {
            title: "Shopping Cart",
            total: "Total:",
            checkout: "Checkout",
            whatsapp: "Order via WhatsApp",
            empty: "Your cart is empty",
            addToCart: "Add to Cart",
            outOfStock: "Out of Stock"
        },
        
        // Search
        search: {
            placeholder: "Search parts..."
        },
        
        // Stock Status
        stock: {
            inStock: "In Stock",
            outOfStock: "Out of Stock",
            lowStock: "Low Stock"
        },
        
        // Footer
        footer: {
            desc: "Your trusted partner for genuine car spare parts in Egypt",
            contact: "Contact Info",
            social: "Follow Us"
        },
        
        // Admin Panel
        admin: {
            title: "Admin Dashboard",
            products: "Products",
            orders: "Orders",
            inventory: "Inventory",
            addProduct: "Add Product",
            editProduct: "Edit Product",
            deleteProduct: "Delete Product",
            updateStock: "Update Stock",
            orderStatus: "Order Status",
            pending: "Pending",
            shipped: "Shipped",
            delivered: "Delivered",
            cancelled: "Cancelled"
        },
        
        // Authentication
        auth: {
            login: "Login",
            register: "Register",
            logout: "Logout",
            email: "Email",
            password: "Password",
            confirmPassword: "Confirm Password",
            firstName: "First Name",
            lastName: "Last Name",
            phone: "Phone Number",
            remember: "Remember Me",
            forgot: "Forgot Password?",
            resetPassword: "Reset Password",
            sendReset: "Send Reset Link",
            backToLogin: "Back to Login",
            noAccount: "Don't have an account? Register now",
            hasAccount: "Already have an account? Login",
            agreeTerms: "I agree to the Terms and Conditions",
            profile: "Profile",
            or: "or",
            google: "Login with Google",
            googleRegister: "Register with Google"
        },
        
        // Payment
        payment: {
            title: "Complete Payment",
            method: "Payment Method",
            details: "Payment Details",
            confirmation: "Confirmation",
            creditCard: "Credit Card",
            paypal: "PayPal",
            fawry: "Fawry",
            vodafoneCash: "Vodafone Cash",
            bankTransfer: "Bank Transfer",
            cashOnDelivery: "Cash on Delivery",
            cardNumber: "Card Number",
            expiryDate: "Expiry Date",
            cvv: "CVV",
            cardHolder: "Card Holder Name",
            total: "Total",
            subtotal: "Subtotal",
            shipping: "Shipping",
            fees: "Fees",
            tax: "Tax"
        },
        
        // Notifications
        notifications: {
            addedToCart: "Added to cart successfully",
            removedFromCart: "Removed from cart",
            stockUpdated: "Stock updated successfully",
            orderPlaced: "Order placed successfully",
            error: "An error occurred",
            lowStock: "Low stock warning"
        },
        
        // Common
        common: {
            save: "Save",
            cancel: "Cancel",
            delete: "Delete",
            edit: "Edit",
            add: "Add",
            update: "Update",
            confirm: "Confirm",
            yes: "Yes",
            no: "No",
            loading: "Loading...",
            price: "Price",
            quantity: "Quantity",
            total: "Total",
            name: "Name",
            description: "Description",
            category: "Category",
            brand: "Brand",
            model: "Model"
        }
    },
    
    ar: {
        // Navigation
        nav: {
            home: "الرئيسية",
            brands: "الماركات",
            parts: "قطع الغيار",
            services: "الخدمات",
            contact: "اتصل بنا"
        },
        
        // Hero Section
        hero: {
            title: "قطع غيار السيارات في مصر",
            subtitle: "قطع غيار عالية الجودة لجميع ماركات السيارات مع توصيل سريع في جميع أنحاء مصر",
            cta: "اختر سيارتك"
        },
        
        // Brands Section
        brands: {
            title: "اختر ماركة سيارتك"
        },
        
        // Models Section
        models: {
            title: "اختر الموديل"
        },
        
        // Parts Section
        parts: {
            title: "قطع الغيار"
        },
        
        // Filters
        filters: {
            category: "الفئة",
            all: "الكل",
            engine: "المحرك",
            brakes: "الفرامل",
            suspension: "التعليق",
            electrical: "الكهرباء",
            body: "أجزاء الهيكل",
            stock: "المخزون",
            inStock: "متوفر",
            outOfStock: "غير متوفر"
        },
        
        // Services Section
        services: {
            title: "خدماتنا",
            delivery: {
                title: "توصيل سريع",
                desc: "توصيل في نفس اليوم في القاهرة والجيزة"
            },
            installation: {
                title: "خدمة التركيب",
                desc: "تركيب احترافي بواسطة فنيين معتمدين"
            },
            warranty: {
                title: "الضمان",
                desc: "ضمان سنة واحدة على جميع القطع الأصلية"
            },
            support: {
                title: "دعم 24/7",
                desc: "دعم العملاء على مدار الساعة"
            }
        },
        
        // Cart
        cart: {
            title: "سلة التسوق",
            total: "الإجمالي:",
            checkout: "إتمام الشراء",
            whatsapp: "اطلب عبر واتساب",
            empty: "سلة التسوق فارغة",
            addToCart: "أضف للسلة",
            outOfStock: "غير متوفر"
        },
        
        // Search
        search: {
            placeholder: "ابحث عن قطع الغيار..."
        },
        
        // Stock Status
        stock: {
            inStock: "متوفر",
            outOfStock: "غير متوفر",
            lowStock: "مخزون منخفض"
        },
        
        // Footer
        footer: {
            desc: "شريكك الموثوق لقطع غيار السيارات الأصلية في مصر",
            contact: "معلومات الاتصال",
            social: "تابعنا"
        },
        
        // Admin Panel
        admin: {
            title: "لوحة الإدارة",
            products: "المنتجات",
            orders: "الطلبات",
            inventory: "المخزون",
            addProduct: "إضافة منتج",
            editProduct: "تعديل منتج",
            deleteProduct: "حذف منتج",
            updateStock: "تحديث المخزون",
            orderStatus: "حالة الطلب",
            pending: "في الانتظار",
            shipped: "تم الشحن",
            delivered: "تم التسليم",
            cancelled: "ملغي"
        },
        
        // Authentication
        auth: {
            login: "تسجيل الدخول",
            register: "إنشاء حساب جديد",
            logout: "تسجيل الخروج",
            email: "البريد الإلكتروني",
            password: "كلمة المرور",
            confirmPassword: "تأكيد كلمة المرور",
            firstName: "الاسم الأول",
            lastName: "الاسم الأخير",
            phone: "رقم الهاتف",
            remember: "تذكرني",
            forgot: "نسيت كلمة المرور؟",
            resetPassword: "استعادة كلمة المرور",
            sendReset: "إرسال رابط الاستعادة",
            backToLogin: "العودة لتسجيل الدخول",
            noAccount: "ليس لديك حساب؟ سجل الآن",
            hasAccount: "لديك حساب بالفعل؟ سجل الدخول",
            agreeTerms: "أوافق على الشروط والأحكام",
            profile: "الملف الشخصي",
            or: "أو",
            google: "الدخول بجوجل",
            googleRegister: "التسجيل بجوجل"
        },
        
        // Payment
        payment: {
            title: "إتمام الدفع",
            method: "طريقة الدفع",
            details: "تفاصيل الدفع",
            confirmation: "التأكيد",
            creditCard: "بطاقة ائتمان",
            paypal: "PayPal",
            fawry: "فوري",
            vodafoneCash: "فودافون كاش",
            bankTransfer: "تحويل بنكي",
            cashOnDelivery: "الدفع عند الاستلام",
            cardNumber: "رقم البطاقة",
            expiryDate: "تاريخ الانتهاء",
            cvv: "CVV",
            cardHolder: "اسم حامل البطاقة",
            total: "الإجمالي",
            subtotal: "المجموع الفرعي",
            shipping: "الشحن",
            fees: "الرسوم",
            tax: "الضرائب"
        },
        
        // Notifications
        notifications: {
            addedToCart: "تم إضافة المنتج للسلة بنجاح",
            removedFromCart: "تم إزالة المنتج من السلة",
            stockUpdated: "تم تحديث المخزون بنجاح",
            orderPlaced: "تم تقديم الطلب بنجاح",
            error: "حدث خطأ",
            lowStock: "تحذير مخزون منخفض"
        },
        
        // Common
        common: {
            save: "حفظ",
            cancel: "إلغاء",
            delete: "حذف",
            edit: "تعديل",
            add: "إضافة",
            update: "تحديث",
            confirm: "تأكيد",
            yes: "نعم",
            no: "لا",
            loading: "جاري التحميل...",
            price: "السعر",
            quantity: "الكمية",
            total: "الإجمالي",
            name: "الاسم",
            description: "الوصف",
            category: "الفئة",
            brand: "الماركة",
            model: "الموديل"
        }
    }
};

// Translation Manager
class TranslationManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('autoparts_language') || 'en';
        this.isRTL = this.currentLanguage === 'ar';
        this.init();
    }
    
    init() {
        this.updateDirection();
        this.translatePage();
        this.updateLanguageButton();
    }
    
    setLanguage(lang) {
        if (translations[lang]) {
            this.currentLanguage = lang;
            this.isRTL = lang === 'ar';
            localStorage.setItem('autoparts_language', lang);
            this.updateDirection();
            this.translatePage();
            this.updateLanguageButton();
            
            // Trigger custom event for other components
            window.dispatchEvent(new CustomEvent('languageChanged', {
                detail: { language: lang, isRTL: this.isRTL }
            }));
        }
    }
    
    updateDirection() {
        document.documentElement.dir = this.isRTL ? 'rtl' : 'ltr';
        document.documentElement.lang = this.currentLanguage;
    }
    
    translatePage() {
        // Translate elements with data-translate attribute
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.getTranslation(key);
            if (translation) {
                element.textContent = translation;
            }
        });
        
        // Translate placeholder attributes
        const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            const translation = this.getTranslation(key);
            if (translation) {
                element.placeholder = translation;
            }
        });
    }
    
    getTranslation(key) {
        const keys = key.split('.');
        let translation = translations[this.currentLanguage];
        
        for (const k of keys) {
            if (translation && translation[k]) {
                translation = translation[k];
            } else {
                // Fallback to English if translation not found
                translation = translations.en;
                for (const fallbackKey of keys) {
                    if (translation && translation[fallbackKey]) {
                        translation = translation[fallbackKey];
                    } else {
                        return key; // Return key if no translation found
                    }
                }
                break;
            }
        }
        
        return typeof translation === 'string' ? translation : key;
    }
    
    updateLanguageButton() {
        const langButton = document.getElementById('current-lang');
        if (langButton) {
            langButton.textContent = this.currentLanguage.toUpperCase();
        }
    }
    
    // Helper method to get translated text programmatically
    t(key) {
        return this.getTranslation(key);
    }
    
    // Format numbers based on language
    formatNumber(number) {
        if (this.currentLanguage === 'ar') {
            // Convert to Arabic-Indic numerals
            return number.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
        }
        return number.toString();
    }
    
    // Format currency
    formatCurrency(amount) {
        const formatted = new Intl.NumberFormat(this.currentLanguage === 'ar' ? 'ar-EG' : 'en-EG', {
            style: 'currency',
            currency: 'EGP',
            minimumFractionDigits: 0
        }).format(amount);
        
        return formatted;
    }
    
    // Format date
    formatDate(date) {
        return new Intl.DateTimeFormat(this.currentLanguage === 'ar' ? 'ar-EG' : 'en-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    }
}

// Initialize translation manager
const translationManager = new TranslationManager();

// Export for global use
window.translationManager = translationManager;
window.t = (key) => translationManager.t(key);