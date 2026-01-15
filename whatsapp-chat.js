// WhatsApp Chat Widget for AutoParts Egypt
class WhatsAppChat {
    constructor() {
        this.phoneNumber = '201010514741';
        this.isOpen = false;
        this.messages = [];
        this.init();
    }
    
    init() {
        this.createChatWidget();
        this.setupEventListeners();
        this.loadPredefinedMessages();
    }
    
    createChatWidget() {
        const chatHTML = `
            <!-- WhatsApp Chat Button -->
            <div class="whatsapp-chat-btn" id="whatsapp-chat-btn">
                <i class="fab fa-whatsapp"></i>
                <div class="chat-notification" id="chat-notification">
                    <span>مرحباً! كيف يمكنني مساعدتك؟</span>
                </div>
            </div>
            
            <!-- WhatsApp Chat Widget -->
            <div class="whatsapp-chat-widget" id="whatsapp-chat-widget">
                <div class="chat-header">
                    <div class="chat-avatar">
                        <i class="fab fa-whatsapp"></i>
                    </div>
                    <div class="chat-info">
                        <div class="chat-name">AutoParts Egypt</div>
                        <div class="chat-status">
                            <span class="status-indicator online"></span>
                            متاح الآن
                        </div>
                    </div>
                    <button class="chat-close" id="chat-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="chat-body" id="chat-body">
                    <div class="chat-welcome">
                        <div class="welcome-avatar">
                            <i class="fab fa-whatsapp"></i>
                        </div>
                        <h3>مرحباً بك في AutoParts Egypt!</h3>
                        <p>نحن هنا لمساعدتك في العثور على قطع الغيار المناسبة لسيارتك</p>
                    </div>
                    
                    <div class="quick-actions">
                        <h4>كيف يمكنني مساعدتك؟</h4>
                        <div class="action-buttons">
                            <button class="action-btn" data-message="أريد الاستفسار عن قطع غيار لسيارتي">
                                <i class="fas fa-car"></i>
                                استفسار عن قطع الغيار
                            </button>
                            <button class="action-btn" data-message="أريد معرفة حالة طلبي">
                                <i class="fas fa-shipping-fast"></i>
                                تتبع الطلب
                            </button>
                            <button class="action-btn" data-message="أريد معرفة أسعار الشحن">
                                <i class="fas fa-truck"></i>
                                أسعار الشحن
                            </button>
                            <button class="action-btn" data-message="أحتاج مساعدة في اختيار القطع المناسبة">
                                <i class="fas fa-question-circle"></i>
                                مساعدة في الاختيار
                            </button>
                            <button class="action-btn" data-message="أريد التحدث مع خدمة العملاء">
                                <i class="fas fa-headset"></i>
                                خدمة العملاء
                            </button>
                        </div>
                    </div>
                    
                    <div class="chat-messages" id="chat-messages">
                        <!-- Messages will appear here -->
                    </div>
                </div>
                
                <div class="chat-footer">
                    <div class="message-input-container">
                        <input type="text" id="message-input" placeholder="اكتب رسالتك هنا..." maxlength="500">
                        <button class="send-btn" id="send-btn">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                    <div class="chat-footer-info">
                        <small>سيتم فتح WhatsApp لإرسال الرسالة</small>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatHTML);
        this.addChatStyles();
    }
    
    addChatStyles() {
        const styles = `
            <style>
                .whatsapp-chat-btn {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    width: 60px;
                    height: 60px;
                    background: #25d366;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
                    z-index: 1000;
                    transition: all 0.3s ease;
                    animation: pulse 2s infinite;
                }
                
                .whatsapp-chat-btn:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6);
                }
                
                .whatsapp-chat-btn i {
                    font-size: 28px;
                    color: white;
                }
                
                .chat-notification {
                    position: absolute;
                    bottom: 70px;
                    right: 0;
                    background: white;
                    padding: 12px 16px;
                    border-radius: 20px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    max-width: 200px;
                    opacity: 0;
                    transform: translateY(10px);
                    animation: showNotification 3s ease 2s;
                    pointer-events: none;
                }
                
                .chat-notification::after {
                    content: '';
                    position: absolute;
                    bottom: -8px;
                    right: 20px;
                    width: 0;
                    height: 0;
                    border-left: 8px solid transparent;
                    border-right: 8px solid transparent;
                    border-top: 8px solid white;
                }
                
                .chat-notification span {
                    font-size: 14px;
                    color: #333;
                    line-height: 1.4;
                }
                
                @keyframes pulse {
                    0% {
                        box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
                    }
                    50% {
                        box-shadow: 0 4px 12px rgba(37, 211, 102, 0.6), 0 0 0 10px rgba(37, 211, 102, 0.1);
                    }
                    100% {
                        box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
                    }
                }
                
                @keyframes showNotification {
                    0%, 90% {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    10%, 80% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                }
                
                .whatsapp-chat-widget {
                    position: fixed;
                    bottom: 90px;
                    right: 20px;
                    width: 350px;
                    height: 500px;
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
                    z-index: 1001;
                    display: none;
                    flex-direction: column;
                    overflow: hidden;
                    animation: slideInUp 0.3s ease;
                }
                
                .whatsapp-chat-widget.open {
                    display: flex;
                }
                
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .chat-header {
                    background: #25d366;
                    color: white;
                    padding: 16px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                
                .chat-avatar {
                    width: 40px;
                    height: 40px;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .chat-avatar i {
                    font-size: 20px;
                }
                
                .chat-info {
                    flex: 1;
                }
                
                .chat-name {
                    font-weight: 600;
                    font-size: 16px;
                    margin-bottom: 2px;
                }
                
                .chat-status {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 12px;
                    opacity: 0.9;
                }
                
                .status-indicator {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #4fc3f7;
                }
                
                .status-indicator.online {
                    background: #4caf50;
                }
                
                .chat-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 18px;
                    cursor: pointer;
                    padding: 4px;
                    border-radius: 4px;
                    transition: background 0.2s;
                }
                
                .chat-close:hover {
                    background: rgba(255, 255, 255, 0.1);
                }
                
                .chat-body {
                    flex: 1;
                    padding: 20px;
                    overflow-y: auto;
                    background: #f0f2f5;
                }
                
                .chat-welcome {
                    text-align: center;
                    margin-bottom: 24px;
                }
                
                .welcome-avatar {
                    width: 60px;
                    height: 60px;
                    background: #25d366;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 16px;
                }
                
                .welcome-avatar i {
                    font-size: 28px;
                    color: white;
                }
                
                .chat-welcome h3 {
                    font-size: 18px;
                    margin-bottom: 8px;
                    color: #333;
                }
                
                .chat-welcome p {
                    font-size: 14px;
                    color: #666;
                    line-height: 1.4;
                }
                
                .quick-actions {
                    margin-bottom: 20px;
                }
                
                .quick-actions h4 {
                    font-size: 16px;
                    margin-bottom: 12px;
                    color: #333;
                }
                
                .action-buttons {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                
                .action-btn {
                    background: white;
                    border: 1px solid #e0e0e0;
                    border-radius: 12px;
                    padding: 12px 16px;
                    text-align: right;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 14px;
                    color: #333;
                }
                
                .action-btn:hover {
                    background: #f5f5f5;
                    border-color: #25d366;
                    transform: translateY(-1px);
                }
                
                .action-btn i {
                    color: #25d366;
                    font-size: 16px;
                    width: 20px;
                    text-align: center;
                }
                
                .chat-messages {
                    margin-top: 20px;
                }
                
                .message {
                    margin-bottom: 12px;
                    display: flex;
                }
                
                .message.sent {
                    justify-content: flex-end;
                }
                
                .message-bubble {
                    max-width: 80%;
                    padding: 10px 14px;
                    border-radius: 16px;
                    font-size: 14px;
                    line-height: 1.4;
                }
                
                .message.received .message-bubble {
                    background: white;
                    color: #333;
                    border-bottom-left-radius: 4px;
                }
                
                .message.sent .message-bubble {
                    background: #dcf8c6;
                    color: #333;
                    border-bottom-right-radius: 4px;
                }
                
                .chat-footer {
                    background: white;
                    border-top: 1px solid #e0e0e0;
                    padding: 12px 16px;
                }
                
                .message-input-container {
                    display: flex;
                    gap: 8px;
                    align-items: center;
                }
                
                #message-input {
                    flex: 1;
                    border: 1px solid #e0e0e0;
                    border-radius: 20px;
                    padding: 10px 16px;
                    font-size: 14px;
                    outline: none;
                    background: #f8f9fa;
                }
                
                #message-input:focus {
                    border-color: #25d366;
                    background: white;
                }
                
                .send-btn {
                    width: 40px;
                    height: 40px;
                    background: #25d366;
                    border: none;
                    border-radius: 50%;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                }
                
                .send-btn:hover {
                    background: #128c7e;
                    transform: scale(1.05);
                }
                
                .send-btn:disabled {
                    background: #ccc;
                    cursor: not-allowed;
                    transform: none;
                }
                
                .chat-footer-info {
                    text-align: center;
                    margin-top: 8px;
                }
                
                .chat-footer-info small {
                    color: #666;
                    font-size: 11px;
                }
                
                /* Mobile Responsive */
                @media (max-width: 768px) {
                    .whatsapp-chat-widget {
                        width: calc(100vw - 40px);
                        height: calc(100vh - 140px);
                        right: 20px;
                        bottom: 90px;
                    }
                    
                    .whatsapp-chat-btn {
                        bottom: 20px;
                        right: 20px;
                    }
                    
                    .chat-notification {
                        max-width: 150px;
                        font-size: 12px;
                    }
                }
                
                /* RTL Support */
                [dir="rtl"] .whatsapp-chat-btn {
                    left: 20px;
                    right: auto;
                }
                
                [dir="rtl"] .whatsapp-chat-widget {
                    left: 20px;
                    right: auto;
                }
                
                [dir="rtl"] .chat-notification {
                    left: 0;
                    right: auto;
                }
                
                [dir="rtl"] .chat-notification::after {
                    left: 20px;
                    right: auto;
                }
                
                [dir="rtl"] .action-btn {
                    text-align: left;
                }
                
                [dir="rtl"] .message.sent {
                    justify-content: flex-start;
                }
                
                [dir="rtl"] .message.received {
                    justify-content: flex-end;
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }
    
    setupEventListeners() {
        // Chat button click
        document.getElementById('whatsapp-chat-btn').addEventListener('click', () => {
            this.toggleChat();
        });
        
        // Close button
        document.getElementById('chat-close').addEventListener('click', () => {
            this.closeChat();
        });
        
        // Action buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.action-btn')) {
                const message = e.target.closest('.action-btn').dataset.message;
                this.sendMessage(message);
            }
        });
        
        // Send button
        document.getElementById('send-btn').addEventListener('click', () => {
            this.sendCustomMessage();
        });
        
        // Enter key in input
        document.getElementById('message-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendCustomMessage();
            }
        });
        
        // Input validation
        document.getElementById('message-input').addEventListener('input', (e) => {
            const sendBtn = document.getElementById('send-btn');
            sendBtn.disabled = !e.target.value.trim();
        });
        
        // Close chat when clicking outside
        document.addEventListener('click', (e) => {
            const chatWidget = document.getElementById('whatsapp-chat-widget');
            const chatBtn = document.getElementById('whatsapp-chat-btn');
            
            if (this.isOpen && 
                !chatWidget.contains(e.target) && 
                !chatBtn.contains(e.target)) {
                this.closeChat();
            }
        });
    }
    
    loadPredefinedMessages() {
        // Load common messages based on user behavior
        this.predefinedMessages = {
            'cart_abandonment': 'لاحظت أن لديك منتجات في سلة التسوق. هل تحتاج مساعدة في إتمام الطلب؟',
            'product_inquiry': 'أريد الاستفسار عن منتج معين',
            'shipping_inquiry': 'كم تكلفة الشحن إلى منطقتي؟',
            'warranty_inquiry': 'ما هي شروط الضمان؟',
            'installation_service': 'هل تقدمون خدمة التركيب؟'
        };
    }
    
    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }
    
    openChat() {
        const widget = document.getElementById('whatsapp-chat-widget');
        widget.classList.add('open');
        this.isOpen = true;
        
        // Hide notification
        const notification = document.getElementById('chat-notification');
        notification.style.display = 'none';
        
        // Track chat open event
        if (window.analytics) {
            analytics.trackEvent('whatsapp_chat_opened');
        }
    }
    
    closeChat() {
        const widget = document.getElementById('whatsapp-chat-widget');
        widget.classList.remove('open');
        this.isOpen = false;
        
        // Track chat close event
        if (window.analytics) {
            analytics.trackEvent('whatsapp_chat_closed', {
                messages_sent: this.messages.length
            });
        }
    }
    
    sendMessage(message) {
        // Add message to chat
        this.addMessageToChat(message, 'sent');
        
        // Generate WhatsApp URL
        const whatsappUrl = this.generateWhatsAppUrl(message);
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Track message sent
        if (window.analytics) {
            analytics.trackEvent('whatsapp_message_sent', {
                message_type: 'predefined',
                message_length: message.length
            });
        }
        
        // Add auto-response
        setTimeout(() => {
            this.addMessageToChat('شكراً لرسالتك! سيتم الرد عليك في أقرب وقت ممكن.', 'received');
        }, 1000);
    }
    
    sendCustomMessage() {
        const input = document.getElementById('message-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Add message to chat
        this.addMessageToChat(message, 'sent');
        
        // Clear input
        input.value = '';
        document.getElementById('send-btn').disabled = true;
        
        // Generate WhatsApp URL
        const whatsappUrl = this.generateWhatsAppUrl(message);
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Track message sent
        if (window.analytics) {
            analytics.trackEvent('whatsapp_message_sent', {
                message_type: 'custom',
                message_length: message.length
            });
        }
        
        // Add auto-response
        setTimeout(() => {
            this.addMessageToChat('تم إرسال رسالتك بنجاح! سيتم الرد عليك قريباً.', 'received');
        }, 1000);
    }
    
    addMessageToChat(message, type) {
        const messagesContainer = document.getElementById('chat-messages');
        
        const messageElement = document.createElement('div');
        messageElement.className = `message ${type}`;
        messageElement.innerHTML = `
            <div class="message-bubble">
                ${message}
            </div>
        `;
        
        messagesContainer.appendChild(messageElement);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Store message
        this.messages.push({
            text: message,
            type: type,
            timestamp: new Date().toISOString()
        });
    }
    
    generateWhatsAppUrl(message) {
        // Add context information
        let contextMessage = message;
        
        // Add current page context
        const currentPage = window.location.pathname;
        if (currentPage !== '/') {
            contextMessage += `\n\nالصفحة الحالية: ${window.location.href}`;
        }
        
        // Add cart information if available
        if (window.cart && cart.getItemCount() > 0) {
            const cartSummary = cart.getSummary();
            contextMessage += `\n\nسلة التسوق:\n`;
            cartSummary.items.forEach(item => {
                contextMessage += `- ${item.part.name} x${item.quantity}\n`;
            });
            contextMessage += `الإجمالي: ${translationManager.formatCurrency(cartSummary.total)}`;
        }
        
        // Add user information if logged in
        if (window.auth && auth.isLoggedIn()) {
            const user = auth.getCurrentUser();
            contextMessage += `\n\nمعلومات العميل:\n`;
            contextMessage += `الاسم: ${user.firstName} ${user.lastName}\n`;
            contextMessage += `البريد الإلكتروني: ${user.email}`;
        }
        
        // Add timestamp
        contextMessage += `\n\nوقت الرسالة: ${new Date().toLocaleString('ar-EG')}`;
        
        // Encode message
        const encodedMessage = encodeURIComponent(contextMessage);
        
        // Generate WhatsApp URL
        return `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`;
    }
    
    // Show chat for specific scenarios
    showChatForCartAbandonment() {
        if (!this.isOpen) {
            this.openChat();
            setTimeout(() => {
                this.addMessageToChat(this.predefinedMessages.cart_abandonment, 'received');
            }, 1000);
        }
    }
    
    showChatForProductInquiry(productName) {
        if (!this.isOpen) {
            this.openChat();
            setTimeout(() => {
                this.addMessageToChat(`هل تحتاج مساعدة بخصوص ${productName}؟`, 'received');
            }, 1000);
        }
    }
    
    // Update phone number
    updatePhoneNumber(newNumber) {
        this.phoneNumber = newNumber;
    }
    
    // Get chat statistics
    getChatStats() {
        return {
            totalMessages: this.messages.length,
            sentMessages: this.messages.filter(m => m.type === 'sent').length,
            receivedMessages: this.messages.filter(m => m.type === 'received').length,
            isOpen: this.isOpen
        };
    }
}

// Initialize WhatsApp chat
document.addEventListener('DOMContentLoaded', () => {
    window.whatsappChat = new WhatsAppChat();
    
    // Show chat notification after 30 seconds
    setTimeout(() => {
        if (!whatsappChat.isOpen) {
            const notification = document.getElementById('chat-notification');
            if (notification) {
                notification.style.display = 'block';
            }
        }
    }, 30000);
    
    // Cart abandonment detection
    if (window.cart) {
        let cartAbandonmentTimer;
        
        window.addEventListener('cartUpdated', () => {
            clearTimeout(cartAbandonmentTimer);
            
            if (cart.getItemCount() > 0) {
                cartAbandonmentTimer = setTimeout(() => {
                    whatsappChat.showChatForCartAbandonment();
                }, 300000); // 5 minutes
            }
        });
    }
});

// Export for global use
window.WhatsAppChat = WhatsAppChat;