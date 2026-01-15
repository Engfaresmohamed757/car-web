// Authentication Modals Controller for AutoZone Egypt

class AuthModals {
    constructor() {
        this.loginModal = null;
        this.registerModal = null;
        this.init();
    }
    
    init() {
        this.setupModals();
        this.setupEventListeners();
        this.checkAuthState();
    }
    
    setupModals() {
        // Get modal elements
        this.loginModal = document.getElementById('login-modal');
        this.registerModal = document.getElementById('register-modal');
    }
    
    setupEventListeners() {
        // Show login modal
        const showLoginBtn = document.getElementById('show-login-modal');
        if (showLoginBtn) {
            showLoginBtn.addEventListener('click', () => this.showLoginModal());
        }
        
        // Show register modal
        const showRegisterBtn = document.getElementById('show-register-modal');
        if (showRegisterBtn) {
            showRegisterBtn.addEventListener('click', () => this.showRegisterModal());
        }
        
        // Close login modal
        const closeLoginBtn = document.getElementById('close-login-modal');
        if (closeLoginBtn) {
            closeLoginBtn.addEventListener('click', () => this.closeLoginModal());
        }
        
        const loginOverlay = document.getElementById('login-modal-overlay');
        if (loginOverlay) {
            loginOverlay.addEventListener('click', () => this.closeLoginModal());
        }
        
        // Close register modal
        const closeRegisterBtn = document.getElementById('close-register-modal');
        if (closeRegisterBtn) {
            closeRegisterBtn.addEventListener('click', () => this.closeRegisterModal());
        }
        
        const registerOverlay = document.getElementById('register-modal-overlay');
        if (registerOverlay) {
            registerOverlay.addEventListener('click', () => this.closeRegisterModal());
        }
        
        // Switch between modals
        const switchToRegister = document.getElementById('switch-to-register');
        if (switchToRegister) {
            switchToRegister.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeLoginModal();
                this.showRegisterModal();
            });
        }
        
        const switchToLogin = document.getElementById('switch-to-login');
        if (switchToLogin) {
            switchToLogin.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeRegisterModal();
                this.showLoginModal();
            });
        }
        
        // Login form submission
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
        
        // Register form submission
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }
        
        // Logout button
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleLogout();
            });
        }
        
        // User menu toggle
        const userMenuToggle = document.getElementById('user-menu-toggle');
        if (userMenuToggle) {
            userMenuToggle.addEventListener('click', () => {
                const dropdown = document.getElementById('user-dropdown');
                if (dropdown) {
                    dropdown.classList.toggle('active');
                }
            });
        }
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            const userMenu = document.querySelector('.user-menu');
            const dropdown = document.getElementById('user-dropdown');
            if (userMenu && dropdown && !userMenu.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }
    
    showLoginModal() {
        if (this.loginModal) {
            this.loginModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    closeLoginModal() {
        if (this.loginModal) {
            this.loginModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    showRegisterModal() {
        if (this.registerModal) {
            this.registerModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    closeRegisterModal() {
        if (this.registerModal) {
            this.registerModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const rememberMe = document.getElementById('remember-me').checked;
        
        // Validate
        if (!email || !password) {
            this.showNotification('يرجى ملء جميع الحقول', 'error');
            return;
        }
        
        // Check if user exists
        const users = JSON.parse(localStorage.getItem('autozone_users') || '[]');
        const user = users.find(u => u.email === email);
        
        if (!user) {
            this.showNotification('البريد الإلكتروني غير مسجل', 'error');
            return;
        }
        
        // Check password (in real app, use proper hashing)
        if (user.password !== this.hashPassword(password)) {
            this.showNotification('كلمة المرور غير صحيحة', 'error');
            return;
        }
        
        // Login successful
        user.lastLogin = new Date().toISOString();
        this.saveUser(user);
        this.setCurrentUser(user, rememberMe);
        
        this.showNotification('تم تسجيل الدخول بنجاح!', 'success');
        this.closeLoginModal();
        this.updateAuthUI();
        
        // Reset form
        document.getElementById('login-form').reset();
    }
    
    handleRegister(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('register-firstName').value;
        const lastName = document.getElementById('register-lastName').value;
        const email = document.getElementById('register-email').value;
        const phone = document.getElementById('register-phone').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirmPassword').value;
        const acceptTerms = document.getElementById('accept-terms').checked;
        
        // Validate
        if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
            this.showNotification('يرجى ملء جميع الحقول', 'error');
            return;
        }
        
        if (!acceptTerms) {
            this.showNotification('يجب الموافقة على الشروط والأحكام', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            this.showNotification('كلمات المرور غير متطابقة', 'error');
            return;
        }
        
        if (password.length < 6) {
            this.showNotification('كلمة المرور يجب أن تكون 6 أحرف على الأقل', 'error');
            return;
        }
        
        // Phone validation
        const phoneRegex = /^01[0-9]{9}$/;
        if (!phoneRegex.test(phone)) {
            this.showNotification('رقم الهاتف يجب أن يبدأ بـ 01 ويتكون من 11 رقم', 'error');
            return;
        }
        
        // Check if user exists
        const users = JSON.parse(localStorage.getItem('autozone_users') || '[]');
        if (users.find(u => u.email === email)) {
            this.showNotification('البريد الإلكتروني مستخدم بالفعل', 'error');
            return;
        }
        
        if (users.find(u => u.phone === phone)) {
            this.showNotification('رقم الهاتف مستخدم بالفعل', 'error');
            return;
        }
        
        // Create new user
        const newUser = {
            id: 'user_' + Date.now(),
            firstName,
            lastName,
            email,
            phone,
            password: this.hashPassword(password),
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            role: 'customer',
            status: 'active',
            verified: false
        };
        
        users.push(newUser);
        localStorage.setItem('autozone_users', JSON.stringify(users));
        
        // Auto login
        this.setCurrentUser(newUser, true);
        
        this.showNotification('تم إنشاء الحساب بنجاح!', 'success');
        this.closeRegisterModal();
        this.updateAuthUI();
        
        // Reset form
        document.getElementById('register-form').reset();
    }
    
    handleLogout() {
        localStorage.removeItem('autozone_current_user');
        sessionStorage.removeItem('autozone_current_user');
        
        this.showNotification('تم تسجيل الخروج بنجاح', 'success');
        this.updateAuthUI();
        
        // Reload page
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
    
    setCurrentUser(user, remember) {
        const userData = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            role: user.role,
            picture: user.picture || null
        };
        
        if (remember) {
            localStorage.setItem('autozone_current_user', JSON.stringify(userData));
        } else {
            sessionStorage.setItem('autozone_current_user', JSON.stringify(userData));
        }
    }
    
    getCurrentUser() {
        const stored = localStorage.getItem('autozone_current_user') || 
                      sessionStorage.getItem('autozone_current_user');
        return stored ? JSON.parse(stored) : null;
    }
    
    saveUser(user) {
        const users = JSON.parse(localStorage.getItem('autozone_users') || '[]');
        const index = users.findIndex(u => u.id === user.id);
        if (index !== -1) {
            users[index] = user;
            localStorage.setItem('autozone_users', JSON.stringify(users));
        }
    }
    
    checkAuthState() {
        const user = this.getCurrentUser();
        if (user) {
            this.updateAuthUI();
        }
    }
    
    updateAuthUI() {
        const user = this.getCurrentUser();
        const notLoggedSection = document.getElementById('auth-not-logged');
        const loggedSection = document.getElementById('auth-logged');
        
        if (user) {
            // Show logged in UI
            if (notLoggedSection) notLoggedSection.style.display = 'none';
            if (loggedSection) loggedSection.style.display = 'block';
            
            // Update user info
            const userName = document.getElementById('user-name');
            if (userName) {
                userName.textContent = user.firstName + ' ' + user.lastName;
            }
            
            const userAvatar = document.getElementById('user-avatar');
            if (userAvatar) {
                if (user.picture) {
                    userAvatar.src = user.picture;
                } else {
                    // Use default avatar with initials
                    const initials = user.firstName.charAt(0) + user.lastName.charAt(0);
                    userAvatar.src = `https://ui-avatars.com/api/?name=${initials}&background=dc2626&color=fff&size=128`;
                }
            }
        } else {
            // Show not logged in UI
            if (notLoggedSection) notLoggedSection.style.display = 'flex';
            if (loggedSection) loggedSection.style.display = 'none';
        }
    }
    
    hashPassword(password) {
        // Simple hash for demo (use proper hashing in production)
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString();
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
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
}

// Google Sign-In Handler
function handleGoogleSignIn(response) {
    try {
        const credential = response.credential;
        const payload = parseJwt(credential);
        
        const googleUser = {
            id: 'google_' + payload.sub,
            firstName: payload.given_name || '',
            lastName: payload.family_name || '',
            email: payload.email,
            picture: payload.picture,
            provider: 'google',
            role: 'customer',
            status: 'active',
            verified: true,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
        };
        
        // Save or update user
        const users = JSON.parse(localStorage.getItem('autozone_users') || '[]');
        let existingUser = users.find(u => u.email === googleUser.email);
        
        if (!existingUser) {
            users.push(googleUser);
            localStorage.setItem('autozone_users', JSON.stringify(users));
            existingUser = googleUser;
        } else {
            existingUser.lastLogin = new Date().toISOString();
            existingUser.picture = googleUser.picture;
            localStorage.setItem('autozone_users', JSON.stringify(users));
        }
        
        // Set current user
        window.authModals.setCurrentUser(existingUser, true);
        window.authModals.showNotification('تم تسجيل الدخول بنجاح!', 'success');
        window.authModals.closeLoginModal();
        window.authModals.closeRegisterModal();
        window.authModals.updateAuthUI();
        
    } catch (error) {
        console.error('Google Sign-In Error:', error);
        window.authModals.showNotification('حدث خطأ في تسجيل الدخول بـ Google', 'error');
    }
}

function handleGoogleSignUp() {
    // Trigger Google One Tap
    if (typeof google !== 'undefined') {
        google.accounts.id.prompt();
    }
}

function parseJwt(token) {
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

function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const button = event.target.closest('button');
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Initialize
const authModals = new AuthModals();
window.authModals = authModals;

// Add notification styles
const notificationStyles = `
<style>
.notification {
    position: fixed;
    top: 100px;
    right: 20px;
    background: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    z-index: 10001;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    min-width: 300px;
}

.notification.show {
    transform: translateX(0);
}

.notification i {
    font-size: 1.5rem;
}

.notification-success {
    border-right: 4px solid #10b981;
    color: #065f46;
}

.notification-success i {
    color: #10b981;
}

.notification-error {
    border-right: 4px solid #ef4444;
    color: #991b1b;
}

.notification-error i {
    color: #ef4444;
}

.notification-info {
    border-right: 4px solid #3b82f6;
    color: #1e40af;
}

.notification-info i {
    color: #3b82f6;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', notificationStyles);