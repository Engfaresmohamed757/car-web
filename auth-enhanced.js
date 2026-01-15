// Enhanced Authentication System for AutoParts Egypt
class EnhancedAuthSystem {
    constructor() {
        this.currentUser = null;
        this.users = [];
        this.sessions = [];
        this.init();
    }
    
    init() {
        this.loadUsers();
        this.checkSession();
        this.createAuthModals();
        this.setupEventListeners();
        this.setupGoogleAuth();
    }
    
    // User Management
    loadUsers() {
        const stored = localStorage.getItem('autoparts_users');
        if (stored) {
            this.users = JSON.parse(stored);
        }
    }
    
    saveUsers() {
        localStorage.setItem('autoparts_users', JSON.stringify(this.users));
    }
    
    generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    // Registration
    handleRegister() {
        const firstName = document.getElementById('register-firstName').value.trim();
        const lastName = document.getElementById('register-lastName').value.trim();
        const email = document.getElementById('register-email').value.trim().toLowerCase();
        const phone = document.getElementById('register-phone').value.trim();
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirmPassword').value;
        
        // Enhanced validation
        if (!firstName || !lastName || !email || !phone || !password) {
            showNotification('جميع الحقول مطلوبة', 'error');
            return;
        }
        
        if (password.length < 6) {
            showNotification('كلمة المرور يجب أن تكون 6 أحرف على الأقل', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            showNotification('كلمات المرور غير متطابقة', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('البريد الإلكتروني غير صحيح', 'error');
            return;
        }
        
        // Phone validation (Egyptian mobile numbers)
        const phoneRegex = /^01[0-9]{9}$/;
        if (!phoneRegex.test(phone)) {
            showNotification('رقم الهاتف يجب أن يبدأ بـ 01 ويتكون من 11 رقم', 'error');
            return;
        }
        
        // Check if user already exists
        if (this.users.find(u => u.email === email)) {
            showNotification('البريد الإلكتروني مستخدم بالفعل', 'error');
            return;
        }
        
        if (this.users.find(u => u.phone === phone)) {
            showNotification('رقم الهاتف مستخدم بالفعل', 'error');
            return;
        }
        
        // Create new user with enhanced profile
        const newUser = {
            id: this.generateUserId(),
            firstName,
            lastName,
            email,
            phone,
            password: this.hashPassword(password), // In real app, use proper hashing
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            addresses: [],
            orders: [],
            preferences: {
                language: 'ar',
                currency: 'EGP',
                notifications: {
                    email: true,
                    sms: true,
                    orderUpdates: true,
                    promotions: false
                }
            },
            profile: {
                avatar: null,
                dateOfBirth: null,
                gender: null,
                city: null,
                governorate: null
            },
            isActive: true,
            emailVerified: false,
            phoneVerified: false,
            role: 'customer', // customer, admin
            loyaltyPoints: 0,
            totalSpent: 0
        };
        
        this.users.push(newUser);
        this.saveUsers();
        this.loginUser(newUser, false);
        this.closeModal('register-modal');
        showNotification('تم إنشاء الحساب بنجاح! مرحباً بك في AutoParts Egypt', 'success');
        
        // Track registration event
        if (window.analytics) {
            analytics.trackEvent('user_register', {
                method: 'email',
                user_id: newUser.id
            });
        }
        
        // Send welcome email (simulation)
        this.sendWelcomeEmail(newUser);
    }
    
    // Login
    handleLogin() {
        const email = document.getElementById('login-email').value.trim().toLowerCase();
        const password = document.getElementById('login-password').value;
        const remember = document.getElementById('remember-me').checked;
        
        if (!email || !password) {
            showNotification('البريد الإلكتروني وكلمة المرور مطلوبان', 'error');
            return;
        }
        
        const user = this.users.find(u => u.email === email && u.password === this.hashPassword(password));
        
        if (user) {
            if (!user.isActive) {
                showNotification('الحساب معطل. يرجى التواصل مع الدعم الفني', 'error');
                return;
            }
            
            // Update last login
            user.lastLogin = new Date().toISOString();
            this.saveUsers();
            
            this.loginUser(user, remember);
            this.closeModal('login-modal');
            showNotification('تم تسجيل الدخول بنجاح', 'success');
            
            // Track login event
            if (window.analytics) {
                analytics.trackEvent('user_login', {
                    method: 'email',
                    user_id: user.id
                });
            }
        } else {
            showNotification('البريد الإلكتروني أو كلمة المرور غير صحيحة', 'error');
        }
    }
    
    // Simple password hashing (use bcrypt in production)
    hashPassword(password) {
        // This is just for demo - use proper hashing in production
        return btoa(password + 'autoparts_salt');
    }
    
    // Login user and create session
    loginUser(user, remember) {
        this.currentUser = user;
        
        const session = {
            userId: user.id,
            createdAt: new Date().toISOString()
        };
        
        if (remember) {
            localStorage.setItem('autoparts_session', JSON.stringify(session));
        } else {
            sessionStorage.setItem('autoparts_session', JSON.stringify(session));
        }
        
        this.updateUserInterface();
    }
    
    // Logout
    logout() {
        // Track logout event
        if (window.analytics && this.currentUser) {
            analytics.trackEvent('user_logout', {
                user_id: this.currentUser.id
            });
        }
        
        this.currentUser = null;
        localStorage.removeItem('autoparts_session');
        sessionStorage.removeItem('autoparts_session');
        this.updateUserInterface();
        this.closeUserDropdown();
        showNotification('تم تسجيل الخروج بنجاح', 'success');
    }
    
    // Check existing session
    checkSession() {
        const session = JSON.parse(localStorage.getItem('autoparts_session') || 
                                 sessionStorage.getItem('autoparts_session') || 'null');
        
        if (session) {
            const user = this.users.find(u => u.id === session.userId);
            if (user && user.isActive) {
                this.currentUser = user;
            } else {
                // Clean invalid session
                localStorage.removeItem('autoparts_session');
                sessionStorage.removeItem('autoparts_session');
            }
        }
    }
    
    // User interface updates
    updateUserInterface() {
        const authButtons = document.querySelector('.auth-buttons');
        const userMenu = document.querySelector('.user-menu');
        
        if (this.currentUser) {
            // Hide auth buttons, show user menu
            if (authButtons) authButtons.style.display = 'none';
            if (!userMenu) {
                this.createUserMenu();
            } else {
                userMenu.style.display = 'block';
                this.updateUserMenu();
            }
        } else {
            // Show auth buttons, hide user menu
            if (authButtons) authButtons.style.display = 'flex';
            if (userMenu) userMenu.style.display = 'none';
        }
    }
    
    // Create user menu
    createUserMenu() {
        const navActions = document.querySelector('.nav-actions');
        if (!navActions) return;
        
        const userMenuHTML = `
            <div class="user-menu">
                <button class="user-btn" onclick="auth.toggleUserDropdown()">
                    <i class="fas fa-user"></i>
                    <span class="user-name">${this.currentUser.firstName}</span>
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="user-dropdown" id="user-dropdown">
                    <a href="#" onclick="auth.showModal('profile-modal')">
                        <i class="fas fa-user"></i>
                        الملف الشخصي
                    </a>
                    <a href="#" onclick="auth.showAddresses()">
                        <i class="fas fa-map-marker-alt"></i>
                        العناوين
                    </a>
                    <a href="#" onclick="auth.showOrderHistory()">
                        <i class="fas fa-shopping-bag"></i>
                        طلباتي
                    </a>
                    <a href="#" onclick="auth.showLoyaltyPoints()">
                        <i class="fas fa-star"></i>
                        نقاط الولاء
                    </a>
                    <a href="#" onclick="auth.logout()">
                        <i class="fas fa-sign-out-alt"></i>
                        تسجيل الخروج
                    </a>
                </div>
            </div>
        `;
        
        navActions.insertAdjacentHTML('beforeend', userMenuHTML);
        this.addNavAuthStyles();
    }
    
    // Update user menu
    updateUserMenu() {
        const userName = document.querySelector('.user-name');
        if (userName) {
            userName.textContent = this.currentUser.firstName;
        }
    }
    
    // Toggle user dropdown
    toggleUserDropdown() {
        const dropdown = document.getElementById('user-dropdown');
        if (dropdown) {
            dropdown.classList.toggle('open');
        }
    }
    
    closeUserDropdown() {
        const dropdown = document.getElementById('user-dropdown');
        if (dropdown) {
            dropdown.classList.remove('open');
        }
    }
    
    // Utility methods
    isLoggedIn() {
        return this.currentUser !== null;
    }
    
    getCurrentUser() {
        return this.currentUser;
    }
    
    requireAuth(callback) {
        if (this.isLoggedIn()) {
            callback();
        } else {
            this.showModal('login-modal');
        }
    }
    
    // Modal management
    showModal(modalId) {
        document.getElementById(modalId).style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
        document.body.style.overflow = '';
    }
    
    // Send welcome email (simulation)
    sendWelcomeEmail(user) {
        console.log(`Welcome email sent to ${user.email}`);
        // In real app, integrate with email service
    }
    
    // Google Authentication setup
    setupGoogleAuth() {
        // Load Google Sign-In API
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => {
            if (window.google) {
                google.accounts.id.initialize({
                    client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with actual client ID
                    callback: this.handleGoogleResponse.bind(this)
                });
            }
        };
        document.head.appendChild(script);
    }
    
    // Handle Google Sign-In response
    handleGoogleResponse(response) {
        const payload = JSON.parse(atob(response.credential.split('.')[1]));
        
        let user = this.users.find(u => u.email === payload.email);
        
        if (!user) {
            // Create new user from Google data
            user = {
                id: this.generateUserId(),
                firstName: payload.given_name,
                lastName: payload.family_name,
                email: payload.email,
                phone: '',
                password: '', // No password for Google users
                googleId: payload.sub,
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString(),
                addresses: [],
                orders: [],
                preferences: {
                    language: 'ar',
                    currency: 'EGP',
                    notifications: {
                        email: true,
                        sms: false,
                        orderUpdates: true,
                        promotions: false
                    }
                },
                profile: {
                    avatar: payload.picture,
                    dateOfBirth: null,
                    gender: null,
                    city: null,
                    governorate: null
                },
                isActive: true,
                emailVerified: true,
                phoneVerified: false,
                role: 'customer',
                loyaltyPoints: 0,
                totalSpent: 0
            };
            
            this.users.push(user);
            this.saveUsers();
        }
        
        this.loginUser(user, true);
        this.closeModal('login-modal');
        this.closeModal('register-modal');
        showNotification('تم تسجيل الدخول بجوجل بنجاح', 'success');
    }
    
    // Login with Google
    loginWithGoogle() {
        if (window.google) {
            google.accounts.id.prompt();
        }
    }
    
    // Register with Google
    registerWithGoogle() {
        this.loginWithGoogle();
    }
    
    // Create authentication modals
    createAuthModals() {
        const authHTML = `
            <!-- Login Modal -->
            <div id="login-modal" class="auth-modal" style="display: none;">
                <div class="auth-overlay" onclick="auth.closeModal('login-modal')"></div>
                <div class="auth-content">
                    <div class="auth-header">
                        <h2 data-translate="auth.login">تسجيل الدخول</h2>
                        <button class="auth-close" onclick="auth.closeModal('login-modal')">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form id="login-form" class="auth-form">
                        <div class="form-group">
                            <label data-translate="auth.email">البريد الإلكتروني</label>
                            <input type="email" id="login-email" required>
                        </div>
                        <div class="form-group">
                            <label data-translate="auth.password">كلمة المرور</label>
                            <input type="password" id="login-password" required>
                        </div>
                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" id="remember-me">
                                <span data-translate="auth.remember">تذكرني</span>
                            </label>
                        </div>
                        <button type="submit" class="auth-btn primary" data-translate="auth.login">
                            تسجيل الدخول
                        </button>
                        <div class="auth-divider">
                            <span data-translate="auth.or">أو</span>
                        </div>
                        <button type="button" class="auth-btn google" onclick="auth.loginWithGoogle()">
                            <i class="fab fa-google"></i>
                            <span data-translate="auth.google">الدخول بجوجل</span>
                        </button>
                    </form>
                    <div class="auth-links">
                        <a href="#" onclick="auth.showModal('forgot-modal')" data-translate="auth.forgot">
                            نسيت كلمة المرور؟
                        </a>
                        <a href="#" onclick="auth.showModal('register-modal')" data-translate="auth.noAccount">
                            ليس لديك حساب؟ سجل الآن
                        </a>
                    </div>
                </div>
            </div>

            <!-- Register Modal -->
            <div id="register-modal" class="auth-modal" style="display: none;">
                <div class="auth-overlay" onclick="auth.closeModal('register-modal')"></div>
                <div class="auth-content">
                    <div class="auth-header">
                        <h2 data-translate="auth.register">إنشاء حساب جديد</h2>
                        <button class="auth-close" onclick="auth.closeModal('register-modal')">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form id="register-form" class="auth-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label data-translate="auth.firstName">الاسم الأول</label>
                                <input type="text" id="register-firstName" required>
                            </div>
                            <div class="form-group">
                                <label data-translate="auth.lastName">الاسم الأخير</label>
                                <input type="text" id="register-lastName" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label data-translate="auth.email">البريد الإلكتروني</label>
                            <input type="email" id="register-email" required>
                        </div>
                        <div class="form-group">
                            <label data-translate="auth.phone">رقم الهاتف</label>
                            <input type="tel" id="register-phone" placeholder="01xxxxxxxxx" required>
                        </div>
                        <div class="form-group">
                            <label data-translate="auth.password">كلمة المرور</label>
                            <input type="password" id="register-password" minlength="6" required>
                        </div>
                        <div class="form-group">
                            <label data-translate="auth.confirmPassword">تأكيد كلمة المرور</label>
                            <input type="password" id="register-confirmPassword" required>
                        </div>
                        <div class="form-group">
                            <label class="checkbox-label">
                                <input type="checkbox" id="agree-terms" required>
                                <span data-translate="auth.agreeTerms">أوافق على الشروط والأحكام</span>
                            </label>
                        </div>
                        <button type="submit" class="auth-btn primary" data-translate="auth.register">
                            إنشاء الحساب
                        </button>
                        <div class="auth-divider">
                            <span data-translate="auth.or">أو</span>
                        </div>
                        <button type="button" class="auth-btn google" onclick="auth.registerWithGoogle()">
                            <i class="fab fa-google"></i>
                            <span data-translate="auth.googleRegister">التسجيل بجوجل</span>
                        </button>
                    </form>
                    <div class="auth-links">
                        <a href="#" onclick="auth.showModal('login-modal')" data-translate="auth.hasAccount">
                            لديك حساب بالفعل؟ سجل الدخول
                        </a>
                    </div>
                </div>
            </div>

            <!-- Forgot Password Modal -->
            <div id="forgot-modal" class="auth-modal" style="display: none;">
                <div class="auth-overlay" onclick="auth.closeModal('forgot-modal')"></div>
                <div class="auth-content">
                    <div class="auth-header">
                        <h2 data-translate="auth.resetPassword">استعادة كلمة المرور</h2>
                        <button class="auth-close" onclick="auth.closeModal('forgot-modal')">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form id="forgot-form" class="auth-form">
                        <div class="form-group">
                            <label data-translate="auth.email">البريد الإلكتروني</label>
                            <input type="email" id="forgot-email" required>
                        </div>
                        <button type="submit" class="auth-btn primary" data-translate="auth.sendReset">
                            إرسال رابط الاستعادة
                        </button>
                    </form>
                    <div class="auth-links">
                        <a href="#" onclick="auth.showModal('login-modal')" data-translate="auth.backToLogin">
                            العودة لتسجيل الدخول
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', authHTML);
        this.addAuthStyles();
    }
    
    // Event listeners
    setupEventListeners() {
        // Form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'login-form') {
                e.preventDefault();
                this.handleLogin();
            } else if (e.target.id === 'register-form') {
                e.preventDefault();
                this.handleRegister();
            } else if (e.target.id === 'forgot-form') {
                e.preventDefault();
                this.handleForgotPassword();
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.user-menu')) {
                this.closeUserDropdown();
            }
        });
    }
    
    // Handle forgot password
    handleForgotPassword() {
        const email = document.getElementById('forgot-email').value.trim().toLowerCase();
        
        if (!email) {
            showNotification('البريد الإلكتروني مطلوب', 'error');
            return;
        }
        
        const user = this.users.find(u => u.email === email);
        
        if (user) {
            // In real app, send actual reset email
            showNotification('تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني', 'success');
            this.closeModal('forgot-modal');
        } else {
            showNotification('البريد الإلكتروني غير موجود', 'error');
        }
    }
    
    // Add authentication styles
    addAuthStyles() {
        const styles = `
            <style>
                .auth-modal {
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
                
                .auth-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.5);
                }
                
                .auth-content {
                    position: relative;
                    width: 90%;
                    max-width: 400px;
                    max-height: 90vh;
                    background: var(--bg-color);
                    border-radius: 12px;
                    overflow-y: auto;
                    box-shadow: var(--shadow-lg);
                }
                
                .auth-header {
                    padding: var(--spacing-4);
                    border-bottom: 1px solid var(--border-color);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .auth-close {
                    background: none;
                    border: none;
                    font-size: var(--font-size-xl);
                    color: var(--text-secondary);
                    cursor: pointer;
                    padding: var(--spacing-2);
                }
                
                .auth-form {
                    padding: var(--spacing-4);
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
                
                .checkbox-label {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-2);
                    cursor: pointer;
                }
                
                .auth-btn {
                    width: 100%;
                    padding: var(--spacing-3);
                    border: none;
                    border-radius: 6px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: var(--transition);
                    margin-bottom: var(--spacing-2);
                }
                
                .auth-btn.primary {
                    background: var(--primary-color);
                    color: white;
                }
                
                .auth-btn.primary:hover {
                    background: #b91c1c;
                }
                
                .auth-btn.google {
                    background: #4285f4;
                    color: white;
                }
                
                .auth-btn.google:hover {
                    background: #3367d6;
                }
                
                .auth-divider {
                    text-align: center;
                    margin: var(--spacing-4) 0;
                    position: relative;
                }
                
                .auth-divider::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: var(--border-color);
                }
                
                .auth-divider span {
                    background: var(--bg-color);
                    padding: 0 var(--spacing-3);
                    color: var(--text-secondary);
                }
                
                .auth-links {
                    padding: var(--spacing-4);
                    text-align: center;
                    border-top: 1px solid var(--border-color);
                }
                
                .auth-links a {
                    color: var(--primary-color);
                    text-decoration: none;
                    display: block;
                    margin-bottom: var(--spacing-2);
                }
                
                .auth-links a:hover {
                    text-decoration: underline;
                }
                
                .user-menu {
                    position: relative;
                }
                
                .user-btn {
                    background: var(--surface-color);
                    border: 1px solid var(--border-color);
                    color: var(--text-primary);
                    padding: var(--spacing-2) var(--spacing-3);
                    border-radius: 6px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-2);
                    transition: var(--transition);
                }
                
                .user-btn:hover {
                    background: var(--primary-color);
                    color: white;
                }
                
                .user-dropdown {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    min-width: 200px;
                    background: var(--bg-color);
                    border: 1px solid var(--border-color);
                    border-radius: 6px;
                    box-shadow: var(--shadow-lg);
                    z-index: 1000;
                    display: none;
                }
                
                .user-dropdown.open {
                    display: block;
                    animation: fadeInDown 0.3s ease;
                }
                
                .user-dropdown a {
                    display: block;
                    padding: var(--spacing-3);
                    color: var(--text-primary);
                    text-decoration: none;
                    border-bottom: 1px solid var(--border-color);
                }
                
                .user-dropdown a:last-child {
                    border-bottom: none;
                }
                
                .user-dropdown a:hover {
                    background: var(--surface-color);
                    color: var(--primary-color);
                }
                
                @media (max-width: 768px) {
                    .auth-content {
                        width: 95%;
                        margin: var(--spacing-4);
                    }
                    
                    .form-row {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }
    
    // Add navigation auth styles
    addNavAuthStyles() {
        const navAuthStyles = `
            <style>
                .auth-buttons {
                    display: flex;
                    gap: var(--spacing-2);
                    align-items: center;
                }
                
                .auth-btn-nav {
                    background: var(--surface-color);
                    border: 1px solid var(--border-color);
                    color: var(--text-primary);
                    padding: var(--spacing-2) var(--spacing-3);
                    border-radius: 6px;
                    cursor: pointer;
                    transition: var(--transition);
                    font-size: var(--font-size-sm);
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-2);
                }
                
                .auth-btn-nav:hover {
                    background: var(--primary-color);
                    color: white;
                }
                
                .auth-btn-nav.register {
                    background: var(--primary-color);
                    color: white;
                    border-color: var(--primary-color);
                }
                
                .auth-btn-nav.register:hover {
                    background: #b91c1c;
                }
                
                @media (max-width: 768px) {
                    .auth-btn-nav span {
                        display: none;
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', navAuthStyles);
    }
    
    // Create auth buttons for navigation
    createAuthButtons() {
        const navActions = document.querySelector('.nav-actions');
        if (!navActions) return;
        
        const authButtonsHTML = `
            <div class="auth-buttons">
                <button class="auth-btn-nav" onclick="auth.showModal('login-modal')">
                    <i class="fas fa-sign-in-alt"></i>
                    <span data-translate="auth.login">تسجيل الدخول</span>
                </button>
                <button class="auth-btn-nav register" onclick="auth.showModal('register-modal')">
                    <i class="fas fa-user-plus"></i>
                    <span data-translate="auth.register">إنشاء حساب</span>
                </button>
            </div>
        `;
        
        navActions.insertAdjacentHTML('beforeend', authButtonsHTML);
    }
}

// Initialize enhanced auth system
document.addEventListener('DOMContentLoaded', () => {
    window.auth = new EnhancedAuthSystem();
    
    // Create auth buttons if not logged in
    if (!auth.isLoggedIn()) {
        auth.createAuthButtons();
    }
});

// Export for global use
window.EnhancedAuthSystem = EnhancedAuthSystem;

    
    // Google Authentication Setup
    setupGoogleAuth() {
        // Google OAuth Configuration
        window.handleGoogleSignIn = (response) => {
            this.handleGoogleCallback(response);
        };
        
        // Initialize Google Sign-In button
        if (typeof google !== 'undefined') {
            google.accounts.id.initialize({
                client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com', // Replace with your actual client ID
                callback: this.handleGoogleCallback.bind(this),
                auto_select: false,
                cancel_on_tap_outside: true
            });
        }
    }
    
    // Handle Google Sign-In Callback
    handleGoogleCallback(response) {
        try {
            // Decode JWT token
            const credential = response.credential;
            const payload = this.parseJwt(credential);
            
            // Extract user information
            const googleUser = {
                id: 'google_' + payload.sub,
                email: payload.email,
                firstName: payload.given_name || '',
                lastName: payload.family_name || '',
                fullName: payload.name,
                picture: payload.picture,
                emailVerified: payload.email_verified,
                provider: 'google',
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };
            
            // Check if user exists
            let existingUser = this.users.find(u => u.email === googleUser.email);
            
            if (!existingUser) {
                // Create new user from Google account
                existingUser = {
                    ...googleUser,
                    phone: '',
                    addresses: [],
                    orders: [],
                    preferences: {
                        language: 'ar',
                        currency: 'EGP',
                        notifications: {
                            email: true,
                            sms: false,
                            push: true
                        }
                    },
                    role: 'customer',
                    status: 'active',
                    verified: true
                };
                
                this.users.push(existingUser);
                this.saveUsers();
                
                showNotification('تم إنشاء حساب جديد بنجاح!', 'success');
            } else {
                // Update existing user
                existingUser.lastLogin = new Date().toISOString();
                existingUser.picture = googleUser.picture;
                this.saveUsers();
                
                showNotification('مرحباً بعودتك!', 'success');
            }
            
            // Login user
            this.currentUser = existingUser;
            this.createSession(existingUser);
            this.updateAuthUI();
            this.closeAuthModal();
            
        } catch (error) {
            console.error('Google Sign-In Error:', error);
            showNotification('حدث خطأ في تسجيل الدخول بـ Google', 'error');
        }
    }
    
    // Parse JWT token
    parseJwt(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('JWT Parse Error:', error);
            return null;
        }
    }
    
    // Render Google Sign-In Button
    renderGoogleButton(containerId) {
        if (typeof google !== 'undefined') {
            google.accounts.id.renderButton(
                document.getElementById(containerId),
                {
                    theme: 'outline',
                    size: 'large',
                    text: 'signin_with',
                    shape: 'rectangular',
                    logo_alignment: 'left',
                    width: '100%'
                }
            );
        }
    }
    
    // Show Google Sign-In Prompt
    showGoogleOneTap() {
        if (typeof google !== 'undefined' && !this.currentUser) {
            google.accounts.id.prompt();
        }
    }
}

// Initialize enhanced auth system
const enhancedAuth = new EnhancedAuthSystem();
window.enhancedAuth = enhancedAuth;

// Show Google One Tap on page load (after 2 seconds)
setTimeout(() => {
    if (window.enhancedAuth && !window.enhancedAuth.currentUser) {
        window.enhancedAuth.showGoogleOneTap();
    }
}, 2000);