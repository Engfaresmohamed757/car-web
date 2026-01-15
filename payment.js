// Payment System for AutoParts Egypt
class PaymentSystem {
    constructor() {
        this.paymentMethods = {
            'credit_card': {
                name: 'بطاقة ائتمان',
                icon: 'fas fa-credit-card',
                enabled: true,
                fees: 0
            },
            'paypal': {
                name: 'PayPal',
                icon: 'fab fa-paypal',
                enabled: true,
                fees: 0.029
            },
            'fawry': {
                name: 'فوري',
                icon: 'fas fa-money-bill-wave',
                enabled: true,
                fees: 5
            },
            'vodafone_cash': {
                name: 'فودافون كاش',
                icon: 'fas fa-mobile-alt',
                enabled: true,
                fees: 0
            },
            'bank_transfer': {
                name: 'تحويل بنكي',
                icon: 'fas fa-university',
                enabled: true,
                fees: 0
            },
            'cash_on_delivery': {
                name: 'الدفع عند الاستلام',
                icon: 'fas fa-hand-holding-usd',
                enabled: true,
                fees: 10
            }
        };
        
        this.currentPayment = null;
        this.init();
    }
    
    init() {
        this.createPaymentModal();
        this.setupEventListeners();
        this.loadPaymentProviders();
    }
    
    createPaymentModal() {
        const paymentHTML = `
            <!-- Payment Modal -->
            <div id="payment-modal" class="payment-modal" style="display: none;">
                <div class="payment-overlay" onclick="payment.closeModal()"></div>
                <div class="payment-content">
                    <div class="payment-header">
                        <h2 data-translate="payment.title">إتمام الدفع</h2>
                        <button class="payment-close" onclick="payment.closeModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="payment-steps">
                        <div class="step active" data-step="1">
                            <span class="step-number">1</span>
                            <span class="step-title">طريقة الدفع</span>
                        </div>
                        <div class="step" data-step="2">
                            <span class="step-number">2</span>
                            <span class="step-title">تفاصيل الدفع</span>
                        </div>
                        <div class="step" data-step="3">
                            <span class="step-number">3</span>
                            <span class="step-title">التأكيد</span>
                        </div>
                    </div>
                    
                    <div class="payment-body">
                        <!-- Step 1: Payment Method Selection -->
                        <div id="payment-step-1" class="payment-step active">
                            <h3>اختر طريقة الدفع</h3>
                            <div class="payment-methods" id="payment-methods">
                                <!-- Payment methods will be loaded here -->
                            </div>
                        </div>
                        
                        <!-- Step 2: Payment Details -->
                        <div id="payment-step-2" class="payment-step">
                            <div id="payment-form-container">
                                <!-- Payment forms will be loaded here -->
                            </div>
                        </div>
                        
                        <!-- Step 3: Confirmation -->
                        <div id="payment-step-3" class="payment-step">
                            <div class="payment-summary">
                                <h3>ملخص الطلب</h3>
                                <div class="order-summary" id="order-summary">
                                    <!-- Order summary will be loaded here -->
                                </div>
                                <div class="payment-total">
                                    <div class="total-row">
                                        <span>المجموع الفرعي:</span>
                                        <span id="subtotal">0 EGP</span>
                                    </div>
                                    <div class="total-row">
                                        <span>الشحن:</span>
                                        <span id="shipping-cost">0 EGP</span>
                                    </div>
                                    <div class="total-row">
                                        <span>رسوم الدفع:</span>
                                        <span id="payment-fees">0 EGP</span>
                                    </div>
                                    <div class="total-row">
                                        <span>الضرائب:</span>
                                        <span id="tax-amount">0 EGP</span>
                                    </div>
                                    <div class="total-row final">
                                        <span>الإجمالي:</span>
                                        <span id="final-total">0 EGP</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="payment-footer">
                        <button class="payment-btn secondary" id="payment-back" onclick="payment.previousStep()" style="display: none;">
                            السابق
                        </button>
                        <button class="payment-btn primary" id="payment-next" onclick="payment.nextStep()">
                            التالي
                        </button>
                        <button class="payment-btn success" id="payment-confirm" onclick="payment.confirmPayment()" style="display: none;">
                            تأكيد الدفع
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Payment Success Modal -->
            <div id="payment-success-modal" class="payment-modal" style="display: none;">
                <div class="payment-overlay"></div>
                <div class="payment-content success-content">
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h2>تم الدفع بنجاح!</h2>
                    <p>شكراً لك، تم استلام طلبك وسيتم معالجته قريباً</p>
                    <div class="order-details">
                        <p><strong>رقم الطلب:</strong> <span id="success-order-id"></span></p>
                        <p><strong>المبلغ المدفوع:</strong> <span id="success-amount"></span></p>
                        <p><strong>طريقة الدفع:</strong> <span id="success-method"></span></p>
                    </div>
                    <div class="success-actions">
                        <button class="payment-btn primary" onclick="payment.closeSuccessModal()">
                            متابعة التسوق
                        </button>
                        <button class="payment-btn secondary" onclick="payment.trackOrder()">
                            تتبع الطلب
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', paymentHTML);
        this.addPaymentStyles();
    }
    
    addPaymentStyles() {
        const styles = `
            <style>
                .payment-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 10001;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .payment-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                }
                
                .payment-content {
                    position: relative;
                    background: var(--bg-color);
                    border-radius: 12px;
                    width: 90%;
                    max-width: 600px;
                    max-height: 90vh;
                    overflow-y: auto;
                    box-shadow: var(--shadow-lg);
                }
                
                .success-content {
                    text-align: center;
                    padding: var(--spacing-8);
                }
                
                .payment-header {
                    padding: var(--spacing-4);
                    border-bottom: 1px solid var(--border-color);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .payment-close {
                    background: none;
                    border: none;
                    font-size: var(--font-size-xl);
                    color: var(--text-secondary);
                    cursor: pointer;
                    padding: var(--spacing-2);
                }
                
                .payment-steps {
                    display: flex;
                    padding: var(--spacing-4);
                    border-bottom: 1px solid var(--border-color);
                }
                
                .step {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-2);
                    position: relative;
                    color: var(--text-secondary);
                }
                
                .step.active {
                    color: var(--primary-color);
                }
                
                .step.completed {
                    color: var(--success-color, #10b981);
                }
                
                .step:not(:last-child)::after {
                    content: '';
                    position: absolute;
                    right: -50%;
                    top: 50%;
                    width: 100%;
                    height: 2px;
                    background: var(--border-color);
                    transform: translateY(-50%);
                }
                
                .step.completed:not(:last-child)::after {
                    background: var(--success-color, #10b981);
                }
                
                .step-number {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    background: var(--surface-color);
                    border: 2px solid var(--border-color);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 600;
                    font-size: var(--font-size-sm);
                }
                
                .step.active .step-number {
                    background: var(--primary-color);
                    color: white;
                    border-color: var(--primary-color);
                }
                
                .step.completed .step-number {
                    background: var(--success-color, #10b981);
                    color: white;
                    border-color: var(--success-color, #10b981);
                }
                
                .step-title {
                    font-size: var(--font-size-sm);
                    font-weight: 500;
                }
                
                .payment-body {
                    padding: var(--spacing-4);
                    min-height: 300px;
                }
                
                .payment-step {
                    display: none;
                }
                
                .payment-step.active {
                    display: block;
                }
                
                .payment-methods {
                    display: grid;
                    gap: var(--spacing-3);
                }
                
                .payment-method {
                    border: 2px solid var(--border-color);
                    border-radius: 8px;
                    padding: var(--spacing-4);
                    cursor: pointer;
                    transition: var(--transition);
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-3);
                }
                
                .payment-method:hover {
                    border-color: var(--primary-color);
                    background: rgba(220, 38, 38, 0.05);
                }
                
                .payment-method.selected {
                    border-color: var(--primary-color);
                    background: rgba(220, 38, 38, 0.1);
                }
                
                .payment-method-icon {
                    font-size: var(--font-size-2xl);
                    color: var(--primary-color);
                    width: 40px;
                    text-align: center;
                }
                
                .payment-method-info {
                    flex: 1;
                }
                
                .payment-method-name {
                    font-weight: 600;
                    margin-bottom: var(--spacing-1);
                }
                
                .payment-method-desc {
                    font-size: var(--font-size-sm);
                    color: var(--text-secondary);
                }
                
                .payment-method-fees {
                    font-size: var(--font-size-sm);
                    color: var(--text-secondary);
                }
                
                .payment-form {
                    display: none;
                }
                
                .payment-form.active {
                    display: block;
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
                
                .form-group input,
                .form-group select {
                    width: 100%;
                    padding: var(--spacing-3);
                    border: 1px solid var(--border-color);
                    border-radius: 6px;
                    background: var(--surface-color);
                    color: var(--text-primary);
                    font-size: var(--font-size-base);
                }
                
                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: var(--spacing-3);
                }
                
                .card-icons {
                    display: flex;
                    gap: var(--spacing-2);
                    margin-top: var(--spacing-2);
                }
                
                .card-icon {
                    width: 40px;
                    height: 25px;
                    background: var(--surface-color);
                    border: 1px solid var(--border-color);
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: var(--font-size-sm);
                }
                
                .payment-summary {
                    background: var(--surface-color);
                    padding: var(--spacing-4);
                    border-radius: 8px;
                    margin-bottom: var(--spacing-4);
                }
                
                .order-summary {
                    margin-bottom: var(--spacing-4);
                }
                
                .order-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: var(--spacing-2) 0;
                    border-bottom: 1px solid var(--border-color);
                }
                
                .order-item:last-child {
                    border-bottom: none;
                }
                
                .payment-total {
                    border-top: 2px solid var(--border-color);
                    padding-top: var(--spacing-3);
                }
                
                .total-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: var(--spacing-2);
                }
                
                .total-row.final {
                    font-weight: 700;
                    font-size: var(--font-size-lg);
                    color: var(--primary-color);
                    border-top: 1px solid var(--border-color);
                    padding-top: var(--spacing-2);
                    margin-top: var(--spacing-2);
                }
                
                .payment-footer {
                    padding: var(--spacing-4);
                    border-top: 1px solid var(--border-color);
                    display: flex;
                    justify-content: space-between;
                    gap: var(--spacing-3);
                }
                
                .payment-btn {
                    padding: var(--spacing-3) var(--spacing-6);
                    border: none;
                    border-radius: 6px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: var(--transition);
                    flex: 1;
                }
                
                .payment-btn.primary {
                    background: var(--primary-color);
                    color: white;
                }
                
                .payment-btn.primary:hover {
                    background: #b91c1c;
                }
                
                .payment-btn.secondary {
                    background: var(--surface-color);
                    color: var(--text-primary);
                    border: 1px solid var(--border-color);
                }
                
                .payment-btn.success {
                    background: var(--success-color, #10b981);
                    color: white;
                }
                
                .success-icon {
                    font-size: 4rem;
                    color: var(--success-color, #10b981);
                    margin-bottom: var(--spacing-4);
                }
                
                .success-content h2 {
                    color: var(--success-color, #10b981);
                    margin-bottom: var(--spacing-3);
                }
                
                .order-details {
                    background: var(--surface-color);
                    padding: var(--spacing-4);
                    border-radius: 8px;
                    margin: var(--spacing-4) 0;
                    text-align: left;
                }
                
                .success-actions {
                    display: flex;
                    gap: var(--spacing-3);
                    margin-top: var(--spacing-6);
                }
                
                .security-info {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-2);
                    margin-top: var(--spacing-3);
                    padding: var(--spacing-3);
                    background: rgba(16, 185, 129, 0.1);
                    border-radius: 6px;
                    font-size: var(--font-size-sm);
                    color: var(--success-color, #10b981);
                }
                
                @media (max-width: 768px) {
                    .payment-content {
                        width: 95%;
                        margin: var(--spacing-2);
                    }
                    
                    .payment-steps {
                        flex-direction: column;
                        gap: var(--spacing-2);
                    }
                    
                    .step::after {
                        display: none;
                    }
                    
                    .form-row {
                        grid-template-columns: 1fr;
                    }
                    
                    .payment-footer {
                        flex-direction: column;
                    }
                    
                    .success-actions {
                        flex-direction: column;
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }
    
    setupEventListeners() {
        // Payment method selection
        document.addEventListener('click', (e) => {
            if (e.target.closest('.payment-method')) {
                this.selectPaymentMethod(e.target.closest('.payment-method').dataset.method);
            }
        });
        
        // Form validation
        document.addEventListener('input', (e) => {
            if (e.target.closest('.payment-form')) {
                this.validateForm();
            }
        });
    }
    
    loadPaymentProviders() {
        // Load Stripe
        const stripeScript = document.createElement('script');
        stripeScript.src = 'https://js.stripe.com/v3/';
        document.head.appendChild(stripeScript);
        
        // Load PayPal
        const paypalScript = document.createElement('script');
        paypalScript.src = 'https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID&currency=EGP';
        document.head.appendChild(paypalScript);
    }
    
    showPaymentModal(orderData) {
        this.currentOrder = orderData;
        this.currentStep = 1;
        
        this.loadPaymentMethods();
        this.updateOrderSummary();
        this.showStep(1);
        
        document.getElementById('payment-modal').style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    closeModal() {
        document.getElementById('payment-modal').style.display = 'none';
        document.body.style.overflow = '';
        this.resetPaymentForm();
    }
    
    loadPaymentMethods() {
        const container = document.getElementById('payment-methods');
        const availableMethods = this.getAvailablePaymentMethods();
        
        container.innerHTML = availableMethods.map(methodId => {
            const method = this.paymentMethods[methodId];
            const fees = method.fees > 0 ? 
                (method.fees < 1 ? `${(method.fees * 100).toFixed(1)}%` : `${method.fees} EGP`) : 
                'مجاني';
            
            return `
                <div class="payment-method" data-method="${methodId}">
                    <div class="payment-method-icon">
                        <i class="${method.icon}"></i>
                    </div>
                    <div class="payment-method-info">
                        <div class="payment-method-name">${method.name}</div>
                        <div class="payment-method-desc">
                            ${this.getMethodDescription(methodId)}
                        </div>
                    </div>
                    <div class="payment-method-fees">
                        رسوم: ${fees}
                    </div>
                </div>
            `;
        }).join('');
    }
    
    getAvailablePaymentMethods() {
        const country = window.globalFeatures?.currentCountry || 'EG';
        const methods = {
            'EG': ['credit_card', 'fawry', 'vodafone_cash', 'bank_transfer', 'cash_on_delivery'],
            'SA': ['credit_card', 'paypal', 'bank_transfer'],
            'AE': ['credit_card', 'paypal', 'bank_transfer'],
            'US': ['credit_card', 'paypal'],
            'GB': ['credit_card', 'paypal'],
            'DE': ['credit_card', 'paypal', 'bank_transfer']
        };
        
        return methods[country] || ['credit_card', 'paypal'];
    }
    
    getMethodDescription(methodId) {
        const descriptions = {
            'credit_card': 'فيزا، ماستركارد، أمريكان إكسبريس',
            'paypal': 'دفع آمن عبر PayPal',
            'fawry': 'ادفع في أقرب نقطة فوري',
            'vodafone_cash': 'محفظة فودافون الإلكترونية',
            'bank_transfer': 'تحويل مباشر من البنك',
            'cash_on_delivery': 'ادفع عند استلام الطلب'
        };
        
        return descriptions[methodId] || '';
    }
    
    selectPaymentMethod(methodId) {
        // Remove previous selection
        document.querySelectorAll('.payment-method').forEach(method => {
            method.classList.remove('selected');
        });
        
        // Add selection to clicked method
        document.querySelector(`[data-method="${methodId}"]`).classList.add('selected');
        
        this.selectedMethod = methodId;
        this.loadPaymentForm(methodId);
    }
    
    loadPaymentForm(methodId) {
        const container = document.getElementById('payment-form-container');
        
        switch (methodId) {
            case 'credit_card':
                container.innerHTML = this.getCreditCardForm();
                break;
            case 'paypal':
                container.innerHTML = this.getPayPalForm();
                break;
            case 'fawry':
                container.innerHTML = this.getFawryForm();
                break;
            case 'vodafone_cash':
                container.innerHTML = this.getVodafoneCashForm();
                break;
            case 'bank_transfer':
                container.innerHTML = this.getBankTransferForm();
                break;
            case 'cash_on_delivery':
                container.innerHTML = this.getCashOnDeliveryForm();
                break;
        }
    }
    
    getCreditCardForm() {
        return `
            <div class="payment-form active" id="credit-card-form">
                <h3>تفاصيل البطاقة الائتمانية</h3>
                <div class="form-group">
                    <label>رقم البطاقة</label>
                    <input type="text" id="card-number" placeholder="1234 5678 9012 3456" maxlength="19" required>
                    <div class="card-icons">
                        <div class="card-icon">VISA</div>
                        <div class="card-icon">MC</div>
                        <div class="card-icon">AMEX</div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>تاريخ الانتهاء</label>
                        <input type="text" id="card-expiry" placeholder="MM/YY" maxlength="5" required>
                    </div>
                    <div class="form-group">
                        <label>CVV</label>
                        <input type="text" id="card-cvv" placeholder="123" maxlength="4" required>
                    </div>
                </div>
                <div class="form-group">
                    <label>اسم حامل البطاقة</label>
                    <input type="text" id="card-holder" placeholder="الاسم كما هو مكتوب على البطاقة" required>
                </div>
                <div class="security-info">
                    <i class="fas fa-lock"></i>
                    <span>معلوماتك محمية بتشفير SSL 256-bit</span>
                </div>
            </div>
        `;
    }
    
    getPayPalForm() {
        return `
            <div class="payment-form active" id="paypal-form">
                <h3>الدفع عبر PayPal</h3>
                <p>سيتم تحويلك إلى PayPal لإتمام عملية الدفع بشكل آمن</p>
                <div id="paypal-button-container"></div>
                <div class="security-info">
                    <i class="fas fa-shield-alt"></i>
                    <span>محمي بواسطة PayPal Buyer Protection</span>
                </div>
            </div>
        `;
    }
    
    getFawryForm() {
        return `
            <div class="payment-form active" id="fawry-form">
                <h3>الدفع عبر فوري</h3>
                <div class="form-group">
                    <label>رقم الهاتف</label>
                    <input type="tel" id="fawry-phone" placeholder="01xxxxxxxxx" required>
                </div>
                <p>سيتم إرسال كود الدفع إلى رقم هاتفك لإتمام العملية في أقرب نقطة فوري</p>
                <div class="security-info">
                    <i class="fas fa-store"></i>
                    <span>ادفع في أكثر من 180,000 نقطة فوري في مصر</span>
                </div>
            </div>
        `;
    }
    
    getVodafoneCashForm() {
        return `
            <div class="payment-form active" id="vodafone-cash-form">
                <h3>الدفع عبر فودافون كاش</h3>
                <div class="form-group">
                    <label>رقم فودافون كاش</label>
                    <input type="tel" id="vodafone-number" placeholder="010xxxxxxxx" required>
                </div>
                <div class="form-group">
                    <label>الرقم السري</label>
                    <input type="password" id="vodafone-pin" placeholder="****" maxlength="4" required>
                </div>
                <div class="security-info">
                    <i class="fas fa-mobile-alt"></i>
                    <span>دفع آمن عبر محفظة فودافون الإلكترونية</span>
                </div>
            </div>
        `;
    }
    
    getBankTransferForm() {
        return `
            <div class="payment-form active" id="bank-transfer-form">
                <h3>التحويل البنكي</h3>
                <div class="bank-details">
                    <h4>تفاصيل الحساب البنكي:</h4>
                    <p><strong>اسم البنك:</strong> البنك الأهلي المصري</p>
                    <p><strong>رقم الحساب:</strong> 1234567890123456</p>
                    <p><strong>اسم المستفيد:</strong> AutoParts Egypt</p>
                    <p><strong>IBAN:</strong> EG380003000012345678901234</p>
                </div>
                <div class="form-group">
                    <label>رقم العملية (اختياري)</label>
                    <input type="text" id="transfer-reference" placeholder="رقم العملية من البنك">
                </div>
                <p><strong>ملاحظة:</strong> سيتم معالجة طلبك بعد تأكيد وصول التحويل (1-3 أيام عمل)</p>
            </div>
        `;
    }
    
    getCashOnDeliveryForm() {
        return `
            <div class="payment-form active" id="cash-delivery-form">
                <h3>الدفع عند الاستلام</h3>
                <div class="delivery-info">
                    <p>سيتم تحصيل قيمة الطلب عند التسليم</p>
                    <p><strong>رسوم إضافية:</strong> 10 جنيه مصري</p>
                    <p><strong>متاح في:</strong> القاهرة والجيزة فقط</p>
                </div>
                <div class="form-group">
                    <label class="checkbox-label">
                        <input type="checkbox" id="cod-confirm" required>
                        <span>أؤكد أنني سأكون متواجداً لاستلام الطلب</span>
                    </label>
                </div>
            </div>
        `;
    }
    
    nextStep() {
        if (this.currentStep === 1) {
            if (!this.selectedMethod) {
                showNotification('يرجى اختيار طريقة دفع', 'error');
                return;
            }
            this.currentStep = 2;
        } else if (this.currentStep === 2) {
            if (!this.validateCurrentForm()) {
                return;
            }
            this.currentStep = 3;
            this.updateOrderSummary();
        }
        
        this.showStep(this.currentStep);
    }
    
    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.showStep(this.currentStep);
        }
    }
    
    showStep(stepNumber) {
        // Update step indicators
        document.querySelectorAll('.step').forEach((step, index) => {
            step.classList.remove('active', 'completed');
            if (index + 1 < stepNumber) {
                step.classList.add('completed');
            } else if (index + 1 === stepNumber) {
                step.classList.add('active');
            }
        });
        
        // Show/hide step content
        document.querySelectorAll('.payment-step').forEach((step, index) => {
            step.classList.remove('active');
            if (index + 1 === stepNumber) {
                step.classList.add('active');
            }
        });
        
        // Update buttons
        const backBtn = document.getElementById('payment-back');
        const nextBtn = document.getElementById('payment-next');
        const confirmBtn = document.getElementById('payment-confirm');
        
        backBtn.style.display = stepNumber > 1 ? 'block' : 'none';
        nextBtn.style.display = stepNumber < 3 ? 'block' : 'none';
        confirmBtn.style.display = stepNumber === 3 ? 'block' : 'none';
    }
    
    validateCurrentForm() {
        const activeForm = document.querySelector('.payment-form.active');
        if (!activeForm) return true;
        
        const requiredFields = activeForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#ef4444';
                isValid = false;
            } else {
                field.style.borderColor = '';
            }
        });
        
        if (!isValid) {
            showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
        }
        
        return isValid;
    }
    
    updateOrderSummary() {
        const container = document.getElementById('order-summary');
        const subtotalEl = document.getElementById('subtotal');
        const shippingEl = document.getElementById('shipping-cost');
        const feesEl = document.getElementById('payment-fees');
        const taxEl = document.getElementById('tax-amount');
        const totalEl = document.getElementById('final-total');
        
        if (!this.currentOrder) return;
        
        // Calculate amounts
        const subtotal = this.currentOrder.total || 0;
        const shipping = window.globalFeatures?.getShippingCost() || 0;
        const paymentFees = this.calculatePaymentFees(subtotal);
        const tax = window.globalFeatures?.calculateTax(subtotal) || 0;
        const total = subtotal + shipping + paymentFees + tax;
        
        // Update order items
        if (this.currentOrder.items) {
            container.innerHTML = this.currentOrder.items.map(item => `
                <div class="order-item">
                    <span>${item.partName} x${item.quantity}</span>
                    <span>${translationManager.formatCurrency(item.total)}</span>
                </div>
            `).join('');
        }
        
        // Update totals
        subtotalEl.textContent = translationManager.formatCurrency(subtotal);
        shippingEl.textContent = shipping === 0 ? 'مجاني' : translationManager.formatCurrency(shipping);
        feesEl.textContent = paymentFees === 0 ? 'مجاني' : translationManager.formatCurrency(paymentFees);
        taxEl.textContent = translationManager.formatCurrency(tax);
        totalEl.textContent = translationManager.formatCurrency(total);
        
        this.finalAmount = total;
    }
    
    calculatePaymentFees(amount) {
        if (!this.selectedMethod) return 0;
        
        const method = this.paymentMethods[this.selectedMethod];
        if (method.fees < 1) {
            return amount * method.fees; // Percentage
        } else {
            return method.fees; // Fixed amount
        }
    }
    
    async confirmPayment() {
        try {
            // Show loading
            const confirmBtn = document.getElementById('payment-confirm');
            const originalText = confirmBtn.textContent;
            confirmBtn.textContent = 'جاري المعالجة...';
            confirmBtn.disabled = true;
            
            // Process payment based on method
            let paymentResult;
            switch (this.selectedMethod) {
                case 'credit_card':
                    paymentResult = await this.processCreditCardPayment();
                    break;
                case 'paypal':
                    paymentResult = await this.processPayPalPayment();
                    break;
                case 'fawry':
                    paymentResult = await this.processFawryPayment();
                    break;
                case 'vodafone_cash':
                    paymentResult = await this.processVodafoneCashPayment();
                    break;
                case 'bank_transfer':
                    paymentResult = await this.processBankTransferPayment();
                    break;
                case 'cash_on_delivery':
                    paymentResult = await this.processCashOnDeliveryPayment();
                    break;
                default:
                    throw new Error('طريقة دفع غير مدعومة');
            }
            
            if (paymentResult.success) {
                // Create order
                const orderData = {
                    ...this.currentOrder,
                    paymentMethod: this.selectedMethod,
                    paymentId: paymentResult.paymentId,
                    totalAmount: this.finalAmount,
                    status: paymentResult.requiresConfirmation ? 'pending_payment' : 'paid'
                };
                
                const order = orderManager.createOrder(orderData);
                
                // Update inventory
                if (this.currentOrder.items) {
                    this.currentOrder.items.forEach(item => {
                        inventoryManager.updateStock(item.partId, -item.quantity);
                    });
                }
                
                // Clear cart
                if (window.cart) {
                    cart.clear();
                }
                
                // Show success
                this.showSuccessModal(order, paymentResult);
                
                // Track conversion
                if (window.analytics) {
                    analytics.trackPurchaseEvent('purchase', {
                        transaction_id: order.id,
                        value: this.finalAmount,
                        currency: window.globalFeatures?.currentCurrency || 'EGP',
                        payment_method: this.selectedMethod
                    });
                }
                
            } else {
                throw new Error(paymentResult.error || 'فشل في معالجة الدفع');
            }
            
        } catch (error) {
            console.error('Payment error:', error);
            showNotification(error.message || 'حدث خطأ في معالجة الدفع', 'error');
            
            // Reset button
            confirmBtn.textContent = originalText;
            confirmBtn.disabled = false;
        }
    }
    
    async processCreditCardPayment() {
        // Simulate credit card processing
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    paymentId: 'cc_' + Date.now(),
                    requiresConfirmation: false
                });
            }, 2000);
        });
    }
    
    async processPayPalPayment() {
        // PayPal integration would go here
        return {
            success: true,
            paymentId: 'pp_' + Date.now(),
            requiresConfirmation: false
        };
    }
    
    async processFawryPayment() {
        return {
            success: true,
            paymentId: 'fawry_' + Date.now(),
            requiresConfirmation: true
        };
    }
    
    async processVodafoneCashPayment() {
        return {
            success: true,
            paymentId: 'vc_' + Date.now(),
            requiresConfirmation: false
        };
    }
    
    async processBankTransferPayment() {
        return {
            success: true,
            paymentId: 'bt_' + Date.now(),
            requiresConfirmation: true
        };
    }
    
    async processCashOnDeliveryPayment() {
        return {
            success: true,
            paymentId: 'cod_' + Date.now(),
            requiresConfirmation: false
        };
    }
    
    showSuccessModal(order, paymentResult) {
        document.getElementById('payment-modal').style.display = 'none';
        
        document.getElementById('success-order-id').textContent = order.id;
        document.getElementById('success-amount').textContent = translationManager.formatCurrency(this.finalAmount);
        document.getElementById('success-method').textContent = this.paymentMethods[this.selectedMethod].name;
        
        document.getElementById('payment-success-modal').style.display = 'flex';
    }
    
    closeSuccessModal() {
        document.getElementById('payment-success-modal').style.display = 'none';
        document.body.style.overflow = '';
    }
    
    trackOrder() {
        this.closeSuccessModal();
        // Redirect to order tracking page
        showNotification('سيتم إضافة صفحة تتبع الطلبات قريباً', 'info');
    }
    
    resetPaymentForm() {
        this.currentStep = 1;
        this.selectedMethod = null;
        this.currentOrder = null;
        this.finalAmount = 0;
        
        // Reset form fields
        document.querySelectorAll('.payment-form input').forEach(input => {
            input.value = '';
            input.style.borderColor = '';
        });
        
        // Reset selections
        document.querySelectorAll('.payment-method').forEach(method => {
            method.classList.remove('selected');
        });
    }
}

// Initialize payment system
document.addEventListener('DOMContentLoaded', () => {
    window.payment = new PaymentSystem();
});

// Export for global use
window.PaymentSystem = PaymentSystem;