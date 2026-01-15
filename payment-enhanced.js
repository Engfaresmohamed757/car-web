// Enhanced Payment System for AutoParts Egypt
class EnhancedPaymentSystem {
    constructor() {
        this.paymentMethods = [
            {
                id: 'cash',
                name: 'الدفع عند الاستلام',
                icon: 'fas fa-money-bill-wave',
                description: 'ادفع عند وصول الطلب',
                available: true,
                fees: 0,
                minAmount: 0,
                maxAmount: 5000
            },
            {
                id: 'card',
                name: 'بطاقة ائتمان/خصم',
                icon: 'fas fa-credit-card',
                description: 'فيزا، ماستركارد، ميزة',
                available: true,
                fees: 0,
                minAmount: 50,
                maxAmount: 50000
            },
            {
                id: 'bank_transfer',
                name: 'تحويل بنكي',
                icon: 'fas fa-university',
                description: 'تحويل مباشر للحساب البنكي',
                available: true,
                fees: 0,
                minAmount: 100,
                maxAmount: 100000
            },
            {
                id: 'fawry',
                name: 'فوري',
                icon: 'fas fa-store',
                description: 'ادفع من أقرب نقطة فوري',
                available: true,
                fees: 5,
                minAmount: 10,
                maxAmount: 10000
            },
            {
                id: 'vodafone_cash',
                name: 'فودافون كاش',
                icon: 'fas fa-mobile-alt',
                description: 'محفظة فودافون الإلكترونية',
                available: true,
                fees: 0,
                minAmount: 10,
                maxAmount: 15000
            }
        ];
        
        this.bankAccounts = [
            {
                bank: 'البنك الأهلي المصري',
                accountNumber: '1234567890123456',
                accountName: 'AutoParts Egypt',
                iban: 'EG380003000012345678901234567'
            }
        ];
        
        this.currentOrder = null;
        this.init();
    }
    
    init() {
        this.createPaymentModal();
        this.setupEventListeners();
    }
}