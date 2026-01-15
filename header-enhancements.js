// Header Button Enhancements
class HeaderEnhancements {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupTooltips();
        this.setupButtonStates();
        this.setupMobileAuthMenu();
        this.setupCartAnimation();
        this.setupThemeToggleAnimation();
        this.setupSearchEnhancements();
    }
    
    // Add tooltips to header buttons
    setupTooltips() {
        const tooltips = {
            '#theme-toggle': 'تبديل الوضع المظلم/المضيء',
            '#lang-toggle': 'تغيير اللغة',
            '#cart-toggle': 'سلة التسوق',
            '.auth-btn-nav[onclick*="login"]': 'تسجيل الدخول',
            '.auth-btn-nav[onclick*="register"]': 'إنشاء حساب جديد',
            '.user-btn': 'قائمة المستخدم'
        };
        
        Object.entries(tooltips).forEach(([selector, tooltip]) => {
            const element = document.querySelector(selector);
            if (element) {
                element.setAttribute('data-tooltip', tooltip);
            }
        });
    }
    
    // Setup button loading and success states
    setupButtonStates() {
        document.addEventListener('click', (e) => {
            const button = e.target.closest('.header-btn, .auth-btn-nav, .cart-btn');
            if (button && !button.classList.contains('no-animation')) {
                this.animateButtonClick(button);
            }
        });
    }
    
    animateButtonClick(button) {
        // Add loading state
        button.classList.add('loading');
        
        // Remove loading state after a short delay
        setTimeout(() => {
            button.classList.remove('loading');
            button.classList.add('success');
            
            // Remove success state
            setTimeout(() => {
                button.classList.remove('success');
            }, 1000);
        }, 500);
    }
    
    // Setup mobile authentication menu
    setupMobileAuthMenu() {
        // Create mobile auth toggle button
        const authContainer = document.getElementById('auth-container');
        if (authContainer && window.innerWidth <= 575) {
            this.createMobileAuthToggle();
        }
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 575) {
                this.createMobileAuthToggle();
            } else {
                this.removeMobileAuthToggle();
            }
        });
    }
    
    createMobileAuthToggle() {
        const authContainer = document.getElementById('auth-container');
        const authButtons = authContainer.querySelector('.auth-buttons');
        
        if (authButtons && !document.querySelector('.mobile-auth-toggle')) {
            const toggle = document.createElement('button');
            toggle.className = 'mobile-auth-toggle';
            toggle.innerHTML = '<i class="fas fa-user"></i>';
            toggle.onclick = () => this.toggleMobileAuthMenu();
            
            authContainer.insertBefore(toggle, authButtons);
            authButtons.classList.add('mobile-auth-menu');
        }
    }
    
    removeMobileAuthToggle() {
        const toggle = document.querySelector('.mobile-auth-toggle');
        const authButtons = document.querySelector('.auth-buttons');
        
        if (toggle) {
            toggle.remove();
        }
        
        if (authButtons) {
            authButtons.classList.remove('mobile-auth-menu', 'show');
        }
    }
    
    toggleMobileAuthMenu() {
        const authButtons = document.querySelector('.auth-buttons');
        if (authButtons) {
            authButtons.classList.toggle('show');
        }
    }
    
    // Setup cart animation
    setupCartAnimation() {
        const cartBtn = document.getElementById('cart-toggle');
        const cartCount = document.getElementById('cart-count');
        
        if (cartBtn && cartCount) {
            // Watch for cart count changes
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList' || mutation.type === 'characterData') {
                        const count = parseInt(cartCount.textContent) || 0;
                        
                        if (count > 0) {
                            cartBtn.classList.add('has-items');
                            cartCount.classList.add('new');
                            
                            setTimeout(() => {
                                cartCount.classList.remove('new');
                            }, 500);
                        } else {
                            cartBtn.classList.remove('has-items');
                        }
                    }
                });
            });
            
            observer.observe(cartCount, {
                childList: true,
                characterData: true,
                subtree: true
            });
        }
    }
    
    // Setup theme toggle animation
    setupThemeToggleAnimation() {
        const themeBtn = document.getElementById('theme-toggle');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => {
                const icon = themeBtn.querySelector('i');
                if (icon) {
                    // Rotate icon during transition
                    icon.style.transform = 'rotate(180deg)';
                    
                    setTimeout(() => {
                        // Update icon based on current theme
                        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
                        icon.style.transform = 'rotate(0deg)';
                    }, 150);
                }
            });
        }
    }
    
    // Setup search enhancements
    setupSearchEnhancements() {
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.querySelector('.search-btn');
        
        if (searchInput && searchBtn) {
            // Add search suggestions
            this.setupSearchSuggestions(searchInput);
            
            // Enhanced search button animation
            searchBtn.addEventListener('click', () => {
                if (searchInput.value.trim()) {
                    searchBtn.classList.add('loading');
                    
                    setTimeout(() => {
                        searchBtn.classList.remove('loading');
                        searchBtn.classList.add('success');
                        
                        setTimeout(() => {
                            searchBtn.classList.remove('success');
                        }, 1000);
                    }, 800);
                }
            });
            
            // Enter key support
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    searchBtn.click();
                }
            });
        }
    }
    
    setupSearchSuggestions(searchInput) {
        const suggestions = [
            'فلتر زيت',
            'تيل فرامل',
            'شمعات إشعال',
            'مساعدين',
            'بطارية',
            'رادياتير',
            'سير توقيت',
            'فلتر هواء'
        ];
        
        let suggestionsList = null;
        
        searchInput.addEventListener('input', (e) => {
            const value = e.target.value.toLowerCase();
            
            if (value.length > 1) {
                const matches = suggestions.filter(s => 
                    s.toLowerCase().includes(value)
                ).slice(0, 5);
                
                if (matches.length > 0) {
                    this.showSuggestions(searchInput, matches);
                } else {
                    this.hideSuggestions();
                }
            } else {
                this.hideSuggestions();
            }
        });
        
        // Hide suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                this.hideSuggestions();
            }
        });
    }
    
    showSuggestions(input, suggestions) {
        this.hideSuggestions();
        
        const suggestionsList = document.createElement('div');
        suggestionsList.className = 'search-suggestions';
        suggestionsList.innerHTML = suggestions.map(suggestion => 
            `<div class="suggestion-item" onclick="this.selectSuggestion('${suggestion}')">${suggestion}</div>`
        ).join('');
        
        input.parentNode.appendChild(suggestionsList);
        
        // Add click handlers
        suggestionsList.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                input.value = item.textContent;
                this.hideSuggestions();
                input.focus();
            });
        });
    }
    
    hideSuggestions() {
        const existing = document.querySelector('.search-suggestions');
        if (existing) {
            existing.remove();
        }
    }
    
    // Public methods for external use
    showButtonLoading(selector) {
        const button = document.querySelector(selector);
        if (button) {
            button.classList.add('loading');
        }
    }
    
    hideButtonLoading(selector) {
        const button = document.querySelector(selector);
        if (button) {
            button.classList.remove('loading');
        }
    }
    
    showButtonSuccess(selector) {
        const button = document.querySelector(selector);
        if (button) {
            button.classList.remove('loading');
            button.classList.add('success');
            
            setTimeout(() => {
                button.classList.remove('success');
            }, 1000);
        }
    }
    
    showButtonError(selector) {
        const button = document.querySelector(selector);
        if (button) {
            button.classList.remove('loading');
            button.classList.add('error');
            
            setTimeout(() => {
                button.classList.remove('error');
            }, 1000);
        }
    }
    
    updateCartCount(count) {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = count;
            cartCount.classList.add('updated');
            
            setTimeout(() => {
                cartCount.classList.remove('updated');
            }, 500);
        }
    }
}

// Add search suggestions styles
const searchStyles = `
    <style>
        .search-suggestions {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--bg-color);
            border: 1px solid var(--border-color);
            border-top: none;
            border-radius: 0 0 8px 8px;
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            max-height: 200px;
            overflow-y: auto;
        }
        
        .suggestion-item {
            padding: var(--spacing-2) var(--spacing-3);
            cursor: pointer;
            transition: var(--transition);
            border-bottom: 1px solid var(--border-color);
        }
        
        .suggestion-item:last-child {
            border-bottom: none;
        }
        
        .suggestion-item:hover {
            background: var(--surface-color);
            color: var(--primary-color);
        }
        
        .mobile-auth-toggle {
            display: none;
        }
        
        @media (max-width: 575px) {
            .mobile-auth-toggle {
                display: flex;
            }
            
            .auth-buttons.mobile-auth-menu {
                position: absolute;
                top: calc(100% + 10px);
                right: 0;
                background: rgba(31, 41, 55, 0.95);
                backdrop-filter: blur(10px);
                padding: var(--spacing-2);
                border-radius: 8px;
                display: none;
                flex-direction: column;
                gap: var(--spacing-1);
                min-width: 120px;
                box-shadow: var(--shadow-lg);
            }
            
            .auth-buttons.mobile-auth-menu.show {
                display: flex;
            }
            
            .auth-buttons.mobile-auth-menu .auth-btn-nav {
                width: 100%;
                justify-content: center;
                padding: var(--spacing-2);
            }
        }
    </style>
`;

// Initialize header enhancements when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add styles
    document.head.insertAdjacentHTML('beforeend', searchStyles);
    
    // Initialize enhancements
    window.headerEnhancements = new HeaderEnhancements();
});

// Export for global use
window.HeaderEnhancements = HeaderEnhancements;