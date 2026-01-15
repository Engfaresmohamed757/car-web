// Main Application Logic
class AutoPartsApp {
    constructor() {
        this.selectedBrand = null;
        this.selectedModel = null;
        this.currentFilters = {};
        this.isLoading = false;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadBrands();
        this.loadParts();
        this.setupTheme();
        this.setupSearch();
        this.hideLoadingScreen();
        
        // Check for admin access
        this.checkAdminAccess();
    }
    
    setupEventListeners() {
        // Navigation
        this.setupNavigation();
        
        // Language switcher
        document.getElementById('lang-toggle')?.addEventListener('click', () => {
            const currentLang = translationManager.currentLanguage;
            const newLang = currentLang === 'en' ? 'ar' : 'en';
            translationManager.setLanguage(newLang);
        });
        
        // Theme toggle
        document.getElementById('theme-toggle')?.addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Search
        document.getElementById('search-input')?.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });
        
        // Filters
        document.getElementById('category-filter')?.addEventListener('change', (e) => {
            this.currentFilters.category = e.target.value;
            this.loadParts();
        });
        
        document.getElementById('stock-filter')?.addEventListener('change', (e) => {
            this.currentFilters.stock = e.target.value;
            this.loadParts();
        });
        
        // CTA Button
        document.getElementById('choose-car-btn')?.addEventListener('click', () => {
            this.scrollToSection('brands');
        });
        
        // Mobile menu
        this.setupMobileMenu();
        
        // Language change event
        window.addEventListener('languageChanged', () => {
            this.updateDynamicContent();
        });
        
        // Scroll animations
        this.setupScrollAnimations();
    }
    
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href').substring(1);
                this.scrollToSection(target);
            });
        });
    }
    
    setupMobileMenu() {
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        mobileToggle?.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    setupTheme() {
        const savedTheme = localStorage.getItem('autoparts_theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
    }
    
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('autoparts_theme', newTheme);
        this.updateThemeIcon(newTheme);
    }
    
    updateThemeIcon(theme) {
        const themeIcon = document.querySelector('#theme-toggle i');
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
    
    setupSearch() {
        let searchTimeout;
        const searchInput = document.getElementById('search-input');
        
        searchInput?.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.handleSearch(e.target.value);
            }, 300);
        });
    }
    
    handleSearch(query) {
        this.currentFilters.search = query;
        this.loadParts();
    }
    
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);
        
        // Observe sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = section.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    hideLoadingScreen() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
        }, 1500);
    }
    
    loadBrands() {
        const brandsGrid = document.getElementById('brands-grid');
        if (!brandsGrid) return;
        
        brandsGrid.innerHTML = '';
        
        carBrands.forEach(brand => {
            const brandCard = this.createBrandCard(brand);
            brandsGrid.appendChild(brandCard);
        });
    }
    
    createBrandCard(brand) {
        const card = document.createElement('div');
        card.className = `brand-card ${brand.popular ? 'popular' : ''}`;
        card.dataset.brandId = brand.id;
        
        // Check if logo is an SVG file or Font Awesome icon
        const logoElement = brand.logo.includes('.svg') 
            ? `<img src="${brand.logo}" alt="${brand.name} Logo" class="brand-logo">`
            : `<i class="${brand.logo} brand-logo"></i>`;
        
        card.innerHTML = `
            <div class="brand-logo-container">
                ${logoElement}
            </div>
            <div class="brand-name">${brand.name}</div>
        `;
        
        card.addEventListener('click', () => {
            this.selectBrand(brand);
        });
        
        return card;
    }
    
    selectBrand(brand) {
        this.selectedBrand = brand;
        this.selectedModel = null;
        
        // Update UI
        document.querySelectorAll('.brand-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        document.querySelector(`[data-brand-id="${brand.id}"]`).classList.add('selected');
        
        // Load models
        this.loadModels(brand.models);
        
        // Show models section
        const modelsSection = document.getElementById('models');
        modelsSection.style.display = 'block';
        
        // Scroll to models
        setTimeout(() => {
            this.scrollToSection('models');
        }, 300);
        
        // Update filters
        this.currentFilters.brand = brand.id;
        this.loadParts();
    }
    
    loadModels(models) {
        const modelsGrid = document.getElementById('models-grid');
        if (!modelsGrid) return;
        
        modelsGrid.innerHTML = '';
        
        models.forEach(model => {
            const modelCard = this.createModelCard(model);
            modelsGrid.appendChild(modelCard);
        });
    }
    
    createModelCard(model) {
        const card = document.createElement('div');
        card.className = 'model-card';
        card.dataset.modelId = model.id;
        
        card.innerHTML = `
            <div class="model-image">
                <i class="fas fa-car"></i>
            </div>
            <div class="model-name">${model.name}</div>
            <div class="model-year">${model.year}</div>
        `;
        
        card.addEventListener('click', () => {
            this.selectModel(model);
        });
        
        return card;
    }
    
    selectModel(model) {
        this.selectedModel = model;
        
        // Update UI
        document.querySelectorAll('.model-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        document.querySelector(`[data-model-id="${model.id}"]`).classList.add('selected');
        
        // Update filters
        this.currentFilters.model = model.id;
        this.loadParts();
        
        // Scroll to parts
        setTimeout(() => {
            this.scrollToSection('parts');
        }, 300);
        
        showNotification(t('notifications.modelSelected') || `${model.name} selected`, 'success');
    }
    
    loadParts() {
        const partsGrid = document.getElementById('parts-grid');
        if (!partsGrid) return;
        
        this.isLoading = true;
        partsGrid.innerHTML = '<div class="loading">Loading parts...</div>';
        
        // Simulate loading delay
        setTimeout(() => {
            const parts = inventoryManager.getParts(this.currentFilters);
            
            partsGrid.innerHTML = '';
            
            if (parts.length === 0) {
                partsGrid.innerHTML = `
                    <div class="no-parts">
                        <i class="fas fa-search"></i>
                        <p>No parts found matching your criteria</p>
                    </div>
                `;
                return;
            }
            
            parts.forEach(part => {
                const partCard = this.createPartCard(part);
                partsGrid.appendChild(partCard);
            });
            
            this.isLoading = false;
        }, 500);
    }
    
    createPartCard(part) {
        const card = document.createElement('div');
        card.className = 'part-card';
        card.dataset.partId = part.id;
        
        const isInStock = part.stock > 0;
        const stockClass = isInStock ? 'in-stock' : 'out-of-stock';
        const stockText = isInStock ? t('stock.inStock') : t('stock.outOfStock');
        const price = translationManager.formatCurrency(part.price);
        
        card.innerHTML = `
            <div class="part-image">
                <i class="${part.image}"></i>
            </div>
            <div class="part-info">
                <h3 class="part-name">${part.name}</h3>
                <div class="part-price">${price}</div>
                <div class="part-stock">
                    <span class="stock-indicator ${stockClass}"></span>
                    <span>${stockText} ${isInStock ? `(${part.stock})` : ''}</span>
                </div>
                <button class="add-to-cart-btn" ${!isInStock ? 'disabled' : ''} 
                        onclick="cart.addItem('${part.id}')">
                    ${isInStock ? t('cart.addToCart') : t('cart.outOfStock')}
                </button>
            </div>
        `;
        
        return card;
    }
    
    updateDynamicContent() {
        // Reload parts to update translations
        this.loadParts();
        
        // Update other dynamic content
        if (window.cart) {
            cart.updateDisplay();
        }
    }
    
    checkAdminAccess() {
        // Simple admin check - in production, this should be more secure
        const isAdmin = localStorage.getItem('autoparts_admin') === 'true';
        if (isAdmin) {
            document.getElementById('admin-panel-btn').style.display = 'block';
            document.getElementById('admin-panel-btn').addEventListener('click', () => {
                if (window.adminPanel) {
                    adminPanel.show();
                }
            });
        }
        
        // Admin login shortcut (Ctrl+Shift+A)
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'A') {
                const password = prompt('Enter admin password:');
                if (password === 'admin123') {
                    localStorage.setItem('autoparts_admin', 'true');
                    location.reload();
                }
            }
        });
    }
}

// Notification System
function showNotification(message, type = 'info', duration = 3000) {
    const container = document.getElementById('notifications');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    container.appendChild(notification);
    
    // Auto remove after duration
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, duration);
}

// PWA Installation
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show install button or notification
    showNotification('Install AutoParts Egypt app for better experience', 'info', 5000);
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new AutoPartsApp();
    window.showNotification = showNotification;
});

// Export for global use
window.AutoPartsApp = AutoPartsApp;