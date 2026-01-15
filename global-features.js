// Global Features for AutoParts Egypt - International Version

class GlobalFeatures {
    constructor() {
        this.currencies = {
            'EGP': { symbol: 'ج.م', rate: 1, locale: 'ar-EG' },
            'USD': { symbol: '$', rate: 0.032, locale: 'en-US' },
            'EUR': { symbol: '€', rate: 0.030, locale: 'en-EU' },
            'SAR': { symbol: 'ر.س', rate: 0.12, locale: 'ar-SA' },
            'AED': { symbol: 'د.إ', rate: 0.118, locale: 'ar-AE' },
            'GBP': { symbol: '£', rate: 0.026, locale: 'en-GB' }
        };
        
        this.countries = {
            'EG': { name: 'Egypt', code: '+20', flag: '🇪🇬', currency: 'EGP', shipping: 0 },
            'SA': { name: 'Saudi Arabia', code: '+966', flag: '🇸🇦', currency: 'SAR', shipping: 50 },
            'AE': { name: 'UAE', code: '+971', flag: '🇦🇪', currency: 'AED', shipping: 45 },
            'US': { name: 'United States', code: '+1', flag: '🇺🇸', currency: 'USD', shipping: 100 },
            'GB': { name: 'United Kingdom', code: '+44', flag: '🇬🇧', currency: 'GBP', shipping: 80 },
            'DE': { name: 'Germany', code: '+49', flag: '🇩🇪', currency: 'EUR', shipping: 70 }
        };
        
        this.currentCountry = localStorage.getItem('autoparts_country') || 'EG';
        this.currentCurrency = localStorage.getItem('autoparts_currency') || 'EGP';
        
        this.init();
    }
    
    init() {
        this.createGlobalControls();
        this.setupEventListeners();
        this.updateGlobalDisplay();
        this.initializeGeolocation();
        this.setupCurrencyConverter();
        this.initializeShippingCalculator();
    }
    
    createGlobalControls() {
        const globalControlsHTML = `
            <div class="global-controls">
                <div class="country-selector">
                    <button class="country-btn" id="country-selector-btn">
                        <span class="country-flag" id="current-country-flag">🇪🇬</span>
                        <span class="country-name" id="current-country-name">Egypt</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="country-dropdown" id="country-dropdown">
                        ${Object.entries(this.countries).map(([code, country]) => `
                            <div class="country-option" data-country="${code}">
                                <span class="country-flag">${country.flag}</span>
                                <span class="country-name">${country.name}</span>
                                <span class="country-code">${country.code}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="currency-selector">
                    <button class="currency-btn" id="currency-selector-btn">
                        <span class="currency-symbol" id="current-currency-symbol">ج.م</span>
                        <span class="currency-code" id="current-currency-code">EGP</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="currency-dropdown" id="currency-dropdown">
                        ${Object.entries(this.currencies).map(([code, currency]) => `
                            <div class="currency-option" data-currency="${code}">
                                <span class="currency-symbol">${currency.symbol}</span>
                                <span class="currency-code">${code}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        // Add to navigation
        const navActions = document.querySelector('.nav-actions');
        if (navActions) {
            navActions.insertAdjacentHTML('afterbegin', globalControlsHTML);
        }
        
        this.addGlobalStyles();
    }
    
    addGlobalStyles() {
        const styles = `
            <style>
                .global-controls {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-2);
                }
                
                .country-selector,
                .currency-selector {
                    position: relative;
                }
                
                .country-btn,
                .currency-btn {
                    background: var(--surface-color);
                    border: 1px solid var(--border-color);
                    color: var(--text-primary);
                    padding: var(--spacing-2) var(--spacing-3);
                    border-radius: 6px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-2);
                    font-size: var(--font-size-sm);
                    transition: var(--transition);
                    min-width: 100px;
                }
                
                .country-btn:hover,
                .currency-btn:hover {
                    background: var(--primary-color);
                    color: white;
                    border-color: var(--primary-color);
                }
                
                .country-dropdown,
                .currency-dropdown {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: var(--bg-color);
                    border: 1px solid var(--border-color);
                    border-radius: 6px;
                    box-shadow: var(--shadow-lg);
                    z-index: 1000;
                    display: none;
                    max-height: 200px;
                    overflow-y: auto;
                }
                
                .country-dropdown.open,
                .currency-dropdown.open {
                    display: block;
                    animation: fadeInDown 0.3s ease;
                }
                
                .country-option,
                .currency-option {
                    padding: var(--spacing-2) var(--spacing-3);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-2);
                    transition: var(--transition);
                    font-size: var(--font-size-sm);
                }
                
                .country-option:hover,
                .currency-option:hover {
                    background: var(--surface-color);
                }
                
                .country-flag {
                    font-size: var(--font-size-lg);
                }
                
                .country-code {
                    margin-left: auto;
                    color: var(--text-secondary);
                    font-size: var(--font-size-xs);
                }
                
                .currency-symbol {
                    font-weight: 600;
                }
                
                .shipping-calculator {
                    background: var(--surface-color);
                    padding: var(--spacing-4);
                    border-radius: 8px;
                    margin: var(--spacing-4) 0;
                }
                
                .shipping-info {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: var(--spacing-2);
                }
                
                .shipping-cost {
                    font-weight: 600;
                    color: var(--primary-color);
                }
                
                .delivery-time {
                    color: var(--text-secondary);
                    font-size: var(--font-size-sm);
                }
                
                .international-notice {
                    background: linear-gradient(135deg, var(--accent-color), var(--primary-color));
                    color: white;
                    padding: var(--spacing-3);
                    border-radius: 6px;
                    text-align: center;
                    margin: var(--spacing-4) 0;
                    font-size: var(--font-size-sm);
                }
                
                .currency-converter {
                    background: var(--surface-color);
                    padding: var(--spacing-3);
                    border-radius: 6px;
                    margin: var(--spacing-2) 0;
                    font-size: var(--font-size-xs);
                    color: var(--text-secondary);
                }
                
                @media (max-width: 768px) {
                    .global-controls {
                        flex-direction: column;
                        gap: var(--spacing-1);
                    }
                    
                    .country-btn,
                    .currency-btn {
                        min-width: 80px;
                        padding: var(--spacing-1) var(--spacing-2);
                        font-size: var(--font-size-xs);
                    }
                    
                    .country-name {
                        display: none;
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }
    
    setupEventListeners() {
        // Country selector
        document.addEventListener('click', (e) => {
            if (e.target.closest('#country-selector-btn')) {
                this.toggleDropdown('country-dropdown');
            } else if (e.target.closest('.country-option')) {
                const countryCode = e.target.closest('.country-option').dataset.country;
                this.setCountry(countryCode);
            } else if (e.target.closest('#currency-selector-btn')) {
                this.toggleDropdown('currency-dropdown');
            } else if (e.target.closest('.currency-option')) {
                const currencyCode = e.target.closest('.currency-option').dataset.currency;
                this.setCurrency(currencyCode);
            } else {
                // Close dropdowns when clicking outside
                document.querySelectorAll('.country-dropdown, .currency-dropdown').forEach(dropdown => {
                    dropdown.classList.remove('open');
                });
            }
        });
        
        // Update prices when currency changes
        window.addEventListener('currencyChanged', () => {
            this.updateAllPrices();
        });
        
        // Update shipping when country changes
        window.addEventListener('countryChanged', () => {
            this.updateShippingInfo();
        });
    }
    
    toggleDropdown(dropdownId) {
        const dropdown = document.getElementById(dropdownId);
        if (dropdown) {
            dropdown.classList.toggle('open');
            
            // Close other dropdowns
            document.querySelectorAll('.country-dropdown, .currency-dropdown').forEach(d => {
                if (d.id !== dropdownId) {
                    d.classList.remove('open');
                }
            });
        }
    }
    
    setCountry(countryCode) {
        if (this.countries[countryCode]) {
            this.currentCountry = countryCode;
            localStorage.setItem('autoparts_country', countryCode);
            
            // Auto-set currency based on country
            const countryCurrency = this.countries[countryCode].currency;
            this.setCurrency(countryCurrency);
            
            this.updateGlobalDisplay();
            this.closeDropdowns();
            
            // Trigger event
            window.dispatchEvent(new CustomEvent('countryChanged', {
                detail: { country: countryCode, countryData: this.countries[countryCode] }
            }));
            
            showNotification(`Country changed to ${this.countries[countryCode].name}`, 'success');
        }
    }
    
    setCurrency(currencyCode) {
        if (this.currencies[currencyCode]) {
            this.currentCurrency = currencyCode;
            localStorage.setItem('autoparts_currency', currencyCode);
            
            this.updateGlobalDisplay();
            this.closeDropdowns();
            
            // Trigger event
            window.dispatchEvent(new CustomEvent('currencyChanged', {
                detail: { currency: currencyCode, currencyData: this.currencies[currencyCode] }
            }));
            
            showNotification(`Currency changed to ${currencyCode}`, 'success');
        }
    }
    
    closeDropdowns() {
        document.querySelectorAll('.country-dropdown, .currency-dropdown').forEach(dropdown => {
            dropdown.classList.remove('open');
        });
    }
    
    updateGlobalDisplay() {
        const country = this.countries[this.currentCountry];
        const currency = this.currencies[this.currentCurrency];
        
        // Update country display
        const countryFlag = document.getElementById('current-country-flag');
        const countryName = document.getElementById('current-country-name');
        if (countryFlag) countryFlag.textContent = country.flag;
        if (countryName) countryName.textContent = country.name;
        
        // Update currency display
        const currencySymbol = document.getElementById('current-currency-symbol');
        const currencyCode = document.getElementById('current-currency-code');
        if (currencySymbol) currencySymbol.textContent = currency.symbol;
        if (currencyCode) currencyCode.textContent = this.currentCurrency;
    }
    
    convertPrice(priceInEGP) {
        const currency = this.currencies[this.currentCurrency];
        const convertedPrice = priceInEGP * currency.rate;
        
        return new Intl.NumberFormat(currency.locale, {
            style: 'currency',
            currency: this.currentCurrency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(convertedPrice);
    }
    
    updateAllPrices() {
        // Update part prices
        document.querySelectorAll('.part-price').forEach(priceElement => {
            const originalPrice = parseFloat(priceElement.dataset.originalPrice || priceElement.textContent.replace(/[^\d.]/g, ''));
            if (originalPrice) {
                priceElement.dataset.originalPrice = originalPrice;
                priceElement.textContent = this.convertPrice(originalPrice);
            }
        });
        
        // Update cart total
        if (window.cart) {
            cart.updateDisplay();
        }
    }
    
    initializeGeolocation() {
        if (navigator.geolocation && !localStorage.getItem('autoparts_country')) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.detectCountryFromLocation(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    console.log('Geolocation not available:', error);
                }
            );
        }
    }
    
    async detectCountryFromLocation(lat, lon) {
        try {
            // In a real application, you would use a geolocation API
            // For demo purposes, we'll use a simple approximation
            const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
            const data = await response.json();
            
            if (data.countryCode && this.countries[data.countryCode]) {
                this.setCountry(data.countryCode);
            }
        } catch (error) {
            console.log('Could not detect country from location:', error);
        }
    }
    
    setupCurrencyConverter() {
        // Add currency converter to cart
        const cartFooter = document.querySelector('.cart-footer');
        if (cartFooter) {
            const converterHTML = `
                <div class="currency-converter" id="currency-converter">
                    <small>Prices shown in ${this.currentCurrency}. Original prices in EGP.</small>
                </div>
            `;
            cartFooter.insertAdjacentHTML('afterbegin', converterHTML);
        }
    }
    
    initializeShippingCalculator() {
        // Add shipping calculator to cart
        const cartItems = document.getElementById('cart-items');
        if (cartItems) {
            const shippingHTML = `
                <div class="shipping-calculator" id="shipping-calculator">
                    <div class="shipping-info">
                        <span>Shipping to ${this.countries[this.currentCountry].name}:</span>
                        <span class="shipping-cost" id="shipping-cost">Free</span>
                    </div>
                    <div class="delivery-time" id="delivery-time">
                        Estimated delivery: 3-5 business days
                    </div>
                </div>
            `;
            cartItems.insertAdjacentHTML('afterend', shippingHTML);
        }
        
        this.updateShippingInfo();
    }
    
    updateShippingInfo() {
        const country = this.countries[this.currentCountry];
        const shippingCost = document.getElementById('shipping-cost');
        const deliveryTime = document.getElementById('delivery-time');
        
        if (shippingCost) {
            if (country.shipping === 0) {
                shippingCost.textContent = 'Free';
                shippingCost.style.color = 'var(--success-color, #10b981)';
            } else {
                shippingCost.textContent = this.convertPrice(country.shipping);
                shippingCost.style.color = 'var(--primary-color)';
            }
        }
        
        if (deliveryTime) {
            const days = this.currentCountry === 'EG' ? '1-2' : 
                         ['SA', 'AE'].includes(this.currentCountry) ? '3-5' : '7-14';
            deliveryTime.textContent = `Estimated delivery: ${days} business days`;
        }
        
        // Show international notice for non-Egyptian customers
        this.showInternationalNotice();
    }
    
    showInternationalNotice() {
        if (this.currentCountry !== 'EG') {
            const existingNotice = document.querySelector('.international-notice');
            if (existingNotice) {
                existingNotice.remove();
            }
            
            const noticeHTML = `
                <div class="international-notice">
                    <i class="fas fa-globe"></i>
                    International shipping available! We deliver worldwide with tracking.
                    <br>
                    <small>Customs duties may apply for international orders.</small>
                </div>
            `;
            
            const cartHeader = document.querySelector('.cart-header');
            if (cartHeader) {
                cartHeader.insertAdjacentHTML('afterend', noticeHTML);
            }
        }
    }
    
    getShippingCost() {
        return this.countries[this.currentCountry].shipping;
    }
    
    getCurrentCountryData() {
        return this.countries[this.currentCountry];
    }
    
    getCurrentCurrencyData() {
        return this.currencies[this.currentCurrency];
    }
    
    // Multi-language phone number formatting
    formatPhoneNumber(number) {
        const country = this.countries[this.currentCountry];
        return `${country.code} ${number}`;
    }
    
    // International tax calculation
    calculateTax(subtotal) {
        const taxRates = {
            'EG': 0.14,  // 14% VAT in Egypt
            'SA': 0.15,  // 15% VAT in Saudi Arabia
            'AE': 0.05,  // 5% VAT in UAE
            'US': 0.08,  // Average sales tax
            'GB': 0.20,  // 20% VAT in UK
            'DE': 0.19   // 19% VAT in Germany
        };
        
        const taxRate = taxRates[this.currentCountry] || 0;
        return subtotal * taxRate;
    }
    
    // International payment methods
    getAvailablePaymentMethods() {
        const paymentMethods = {
            'EG': ['cash', 'card', 'fawry', 'vodafone_cash'],
            'SA': ['card', 'stc_pay', 'apple_pay', 'paypal'],
            'AE': ['card', 'apple_pay', 'google_pay', 'paypal'],
            'US': ['card', 'paypal', 'apple_pay', 'google_pay'],
            'GB': ['card', 'paypal', 'apple_pay', 'google_pay'],
            'DE': ['card', 'paypal', 'sofort', 'giropay']
        };
        
        return paymentMethods[this.currentCountry] || ['card', 'paypal'];
    }
}

// Initialize global features
document.addEventListener('DOMContentLoaded', () => {
    window.globalFeatures = new GlobalFeatures();
});

// Export for global use
window.GlobalFeatures = GlobalFeatures;