// Advanced Analytics for AutoParts Egypt - Global Version

class AnalyticsManager {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.userId = this.getUserId();
        this.events = [];
        this.pageViews = [];
        this.conversions = [];
        this.userBehavior = {
            timeOnPage: 0,
            scrollDepth: 0,
            clickHeatmap: [],
            searchQueries: [],
            cartAbandonment: []
        };
        
        this.init();
    }
    
    init() {
        this.setupGoogleAnalytics();
        this.setupFacebookPixel();
        this.setupCustomTracking();
        this.trackUserBehavior();
        this.setupConversionTracking();
        this.setupHeatmapTracking();
        this.trackPerformanceMetrics();
    }
    
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    getUserId() {
        let userId = localStorage.getItem('autoparts_user_id');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('autoparts_user_id', userId);
        }
        return userId;
    }
    
    setupGoogleAnalytics() {
        // Google Analytics 4 setup
        const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with actual ID
        
        // Load Google Analytics
        const script1 = document.createElement('script');
        script1.async = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(script1);
        
        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        
        gtag('js', new Date());
        gtag('config', GA_MEASUREMENT_ID, {
            page_title: document.title,
            page_location: window.location.href,
            custom_map: {
                'custom_parameter_1': 'user_type',
                'custom_parameter_2': 'country',
                'custom_parameter_3': 'currency'
            }
        });
        
        // Enhanced E-commerce setup
        gtag('config', GA_MEASUREMENT_ID, {
            custom_map: {
                'custom_parameter_1': 'item_category',
                'custom_parameter_2': 'item_brand'
            }
        });
    }
    
    setupFacebookPixel() {
        const FACEBOOK_PIXEL_ID = 'XXXXXXXXXXXXXXXXX'; // Replace with actual ID
        
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        
        fbq('init', FACEBOOK_PIXEL_ID);
        fbq('track', 'PageView');
        
        // Store fbq reference
        window.fbq = fbq;
    }
    
    setupCustomTracking() {
        // Track page load time
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            this.trackEvent('page_performance', {
                load_time: loadTime,
                page: window.location.pathname
            });
        });
        
        // Track page visibility
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.trackEvent('page_hidden', {
                    time_visible: Date.now() - this.pageStartTime
                });
            } else {
                this.pageStartTime = Date.now();
                this.trackEvent('page_visible', {});
            }
        });
        
        // Track errors
        window.addEventListener('error', (e) => {
            this.trackEvent('javascript_error', {
                message: e.message,
                filename: e.filename,
                lineno: e.lineno,
                colno: e.colno
            });
        });
    }
    
    trackUserBehavior() {
        // Track scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                this.userBehavior.scrollDepth = maxScroll;
                
                // Track milestone scrolls
                if ([25, 50, 75, 100].includes(scrollPercent)) {
                    this.trackEvent('scroll_depth', {
                        percent: scrollPercent,
                        page: window.location.pathname
                    });
                }
            }
        });
        
        // Track time on page
        this.pageStartTime = Date.now();
        window.addEventListener('beforeunload', () => {
            const timeOnPage = Date.now() - this.pageStartTime;
            this.userBehavior.timeOnPage = timeOnPage;
            this.trackEvent('time_on_page', {
                duration: timeOnPage,
                page: window.location.pathname
            });
        });
        
        // Track clicks
        document.addEventListener('click', (e) => {
            const element = e.target;
            const clickData = {
                element: element.tagName,
                class: element.className,
                id: element.id,
                text: element.textContent?.substring(0, 50),
                x: e.clientX,
                y: e.clientY,
                timestamp: Date.now()
            };
            
            this.userBehavior.clickHeatmap.push(clickData);
            
            // Track specific element clicks
            if (element.classList.contains('brand-card')) {
                this.trackEvent('brand_click', {
                    brand: element.dataset.brandId
                });
            } else if (element.classList.contains('part-card')) {
                this.trackEvent('part_click', {
                    part_id: element.dataset.partId
                });
            } else if (element.classList.contains('add-to-cart-btn')) {
                this.trackEvent('add_to_cart_click', {
                    part_id: element.closest('.part-card')?.dataset.partId
                });
            }
        });
    }
    
    setupConversionTracking() {
        // Track cart events
        window.addEventListener('cartUpdated', (e) => {
            const { action, item, quantity } = e.detail;
            
            if (action === 'add') {
                this.trackPurchaseEvent('add_to_cart', {
                    currency: window.globalFeatures?.currentCurrency || 'EGP',
                    value: item.price * quantity,
                    items: [{
                        item_id: item.id,
                        item_name: item.name,
                        item_category: item.category,
                        item_brand: item.brand,
                        price: item.price,
                        quantity: quantity
                    }]
                });
                
                // Facebook Pixel
                if (window.fbq) {
                    fbq('track', 'AddToCart', {
                        content_ids: [item.id],
                        content_type: 'product',
                        value: item.price * quantity,
                        currency: window.globalFeatures?.currentCurrency || 'EGP'
                    });
                }
            }
        });
        
        // Track purchases
        window.addEventListener('orderCompleted', (e) => {
            const { order } = e.detail;
            
            this.trackPurchaseEvent('purchase', {
                transaction_id: order.id,
                value: order.total,
                currency: window.globalFeatures?.currentCurrency || 'EGP',
                items: order.items.map(item => ({
                    item_id: item.partId,
                    item_name: item.partName,
                    item_category: item.category,
                    item_brand: item.brand,
                    price: item.price,
                    quantity: item.quantity
                }))
            });
            
            // Facebook Pixel
            if (window.fbq) {
                fbq('track', 'Purchase', {
                    content_ids: order.items.map(item => item.partId),
                    content_type: 'product',
                    value: order.total,
                    currency: window.globalFeatures?.currentCurrency || 'EGP'
                });
            }
        });
        
        // Track search events
        window.addEventListener('searchPerformed', (e) => {
            const { query, results } = e.detail;
            
            this.trackEvent('search', {
                search_term: query,
                results_count: results.length
            });
            
            this.userBehavior.searchQueries.push({
                query,
                results: results.length,
                timestamp: Date.now()
            });
        });
    }
    
    setupHeatmapTracking() {
        // Simple heatmap implementation
        const heatmapData = {
            clicks: [],
            scrolls: [],
            hovers: []
        };
        
        // Track mouse movements (throttled)
        let mouseTrackingTimeout;
        document.addEventListener('mousemove', (e) => {
            clearTimeout(mouseTrackingTimeout);
            mouseTrackingTimeout = setTimeout(() => {
                heatmapData.hovers.push({
                    x: e.clientX,
                    y: e.clientY,
                    timestamp: Date.now()
                });
            }, 100);
        });
        
        // Save heatmap data periodically
        setInterval(() => {
            if (heatmapData.clicks.length > 0 || heatmapData.hovers.length > 0) {
                localStorage.setItem('autoparts_heatmap', JSON.stringify(heatmapData));
            }
        }, 30000); // Save every 30 seconds
    }
    
    trackPerformanceMetrics() {
        // Core Web Vitals tracking
        if ('PerformanceObserver' in window) {
            // Largest Contentful Paint (LCP)
            new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    this.trackEvent('web_vital_lcp', {
                        value: entry.startTime,
                        rating: entry.startTime < 2500 ? 'good' : entry.startTime < 4000 ? 'needs_improvement' : 'poor'
                    });
                }
            }).observe({entryTypes: ['largest-contentful-paint']});
            
            // First Input Delay (FID)
            new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    this.trackEvent('web_vital_fid', {
                        value: entry.processingStart - entry.startTime,
                        rating: (entry.processingStart - entry.startTime) < 100 ? 'good' : 
                               (entry.processingStart - entry.startTime) < 300 ? 'needs_improvement' : 'poor'
                    });
                }
            }).observe({entryTypes: ['first-input']});
            
            // Cumulative Layout Shift (CLS)
            let clsValue = 0;
            new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                }
                this.trackEvent('web_vital_cls', {
                    value: clsValue,
                    rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs_improvement' : 'poor'
                });
            }).observe({entryTypes: ['layout-shift']});
        }
    }
    
    trackEvent(eventName, parameters = {}) {
        const event = {
            name: eventName,
            parameters: {
                ...parameters,
                session_id: this.sessionId,
                user_id: this.userId,
                timestamp: Date.now(),
                page: window.location.pathname,
                user_agent: navigator.userAgent,
                country: window.globalFeatures?.currentCountry || 'EG',
                currency: window.globalFeatures?.currentCurrency || 'EGP'
            }
        };
        
        this.events.push(event);
        
        // Send to Google Analytics
        if (window.gtag) {
            gtag('event', eventName, parameters);
        }
        
        // Send to custom analytics endpoint
        this.sendToCustomAnalytics(event);
        
        // Store locally for offline analysis
        this.storeEventLocally(event);
    }
    
    trackPurchaseEvent(eventName, ecommerceData) {
        // Google Analytics Enhanced Ecommerce
        if (window.gtag) {
            gtag('event', eventName, ecommerceData);
        }
        
        // Custom tracking
        this.trackEvent(eventName, ecommerceData);
    }
    
    sendToCustomAnalytics(event) {
        // In a real application, send to your analytics server
        if (navigator.sendBeacon) {
            const data = JSON.stringify(event);
            navigator.sendBeacon('/api/analytics', data);
        } else {
            // Fallback for older browsers
            fetch('/api/analytics', {
                method: 'POST',
                body: JSON.stringify(event),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).catch(error => {
                console.log('Analytics request failed:', error);
            });
        }
    }
    
    storeEventLocally(event) {
        const storedEvents = JSON.parse(localStorage.getItem('autoparts_analytics') || '[]');
        storedEvents.push(event);
        
        // Keep only last 100 events
        if (storedEvents.length > 100) {
            storedEvents.splice(0, storedEvents.length - 100);
        }
        
        localStorage.setItem('autoparts_analytics', JSON.stringify(storedEvents));
    }
    
    // A/B Testing functionality
    setupABTesting() {
        const tests = {
            'hero_button_color': {
                variants: ['red', 'blue', 'green'],
                weights: [0.33, 0.33, 0.34]
            },
            'product_card_layout': {
                variants: ['compact', 'detailed'],
                weights: [0.5, 0.5]
            }
        };
        
        Object.entries(tests).forEach(([testName, config]) => {
            const variant = this.getABTestVariant(testName, config);
            this.trackEvent('ab_test_assignment', {
                test_name: testName,
                variant: variant
            });
            
            // Apply variant
            document.body.classList.add(`ab-${testName}-${variant}`);
        });
    }
    
    getABTestVariant(testName, config) {
        const stored = localStorage.getItem(`ab_test_${testName}`);
        if (stored) {
            return stored;
        }
        
        const random = Math.random();
        let cumulative = 0;
        
        for (let i = 0; i < config.variants.length; i++) {
            cumulative += config.weights[i];
            if (random <= cumulative) {
                const variant = config.variants[i];
                localStorage.setItem(`ab_test_${testName}`, variant);
                return variant;
            }
        }
        
        return config.variants[0];
    }
    
    // User segmentation
    getUserSegment() {
        const behavior = this.userBehavior;
        const events = this.events;
        
        // Simple segmentation logic
        if (events.filter(e => e.name === 'purchase').length > 0) {
            return 'customer';
        } else if (events.filter(e => e.name === 'add_to_cart').length > 0) {
            return 'potential_customer';
        } else if (behavior.timeOnPage > 60000) { // More than 1 minute
            return 'engaged_visitor';
        } else {
            return 'visitor';
        }
    }
    
    // Generate analytics report
    generateReport() {
        const report = {
            session: {
                id: this.sessionId,
                user_id: this.userId,
                duration: Date.now() - this.pageStartTime,
                page_views: this.pageViews.length,
                events: this.events.length
            },
            behavior: this.userBehavior,
            segment: this.getUserSegment(),
            performance: {
                load_time: performance.timing.loadEventEnd - performance.timing.navigationStart,
                dom_ready: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart
            },
            device: {
                user_agent: navigator.userAgent,
                screen_resolution: `${screen.width}x${screen.height}`,
                viewport: `${window.innerWidth}x${window.innerHeight}`,
                language: navigator.language,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
            }
        };
        
        return report;
    }
    
    // Export data for analysis
    exportAnalyticsData() {
        const data = {
            events: this.events,
            behavior: this.userBehavior,
            heatmap: JSON.parse(localStorage.getItem('autoparts_heatmap') || '{}'),
            stored_events: JSON.parse(localStorage.getItem('autoparts_analytics') || '[]')
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `autoparts_analytics_${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }
}

// Initialize analytics
document.addEventListener('DOMContentLoaded', () => {
    window.analytics = new AnalyticsManager();
    
    // Setup A/B testing
    analytics.setupABTesting();
    
    // Track initial page view
    analytics.trackEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href
    });
});

// Export for global use
window.AnalyticsManager = AnalyticsManager;