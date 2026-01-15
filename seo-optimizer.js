// SEO Optimizer for AutoParts Egypt - Global Version

class SEOOptimizer {
    constructor() {
        this.structuredData = {};
        this.metaTags = {};
        this.currentPage = 'home';
        this.init();
    }
    
    init() {
        this.setupStructuredData();
        this.optimizeMetaTags();
        this.setupOpenGraph();
        this.setupTwitterCards();
        this.setupCanonicalURLs();
        this.setupHreflang();
        this.trackPageViews();
        this.optimizeImages();
        this.setupBreadcrumbs();
    }
    
    setupStructuredData() {
        // Organization Schema
        const organizationSchema = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "AutoParts Egypt",
            "alternateName": "قطع غيار السيارات مصر",
            "url": "https://autoparts-egypt.com",
            "logo": "https://autoparts-egypt.com/assets/images/logo.png",
            "description": "Premium car spare parts in Egypt with fast delivery across the Middle East and worldwide shipping",
            "foundingDate": "2024",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Cairo Automotive District",
                "addressLocality": "Cairo",
                "addressRegion": "Cairo Governorate",
                "postalCode": "11511",
                "addressCountry": "EG"
            },
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+20-101-051-4741",
                "contactType": "customer service",
                "availableLanguage": ["English", "Arabic"],
                "areaServed": ["EG", "SA", "AE", "US", "GB", "DE"]
            },
            "sameAs": [
                "https://facebook.com/autoparts-egypt",
                "https://instagram.com/autoparts-egypt",
                "https://twitter.com/autoparts_egypt"
            ],
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Car Spare Parts Catalog",
                "itemListElement": [
                    {
                        "@type": "OfferCatalog",
                        "name": "Engine Parts",
                        "itemListElement": []
                    },
                    {
                        "@type": "OfferCatalog", 
                        "name": "Brake Parts",
                        "itemListElement": []
                    }
                ]
            }
        };
        
        // Website Schema
        const websiteSchema = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "AutoParts Egypt",
            "url": "https://autoparts-egypt.com",
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://autoparts-egypt.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
            }
        };
        
        // E-commerce Schema
        const ecommerceSchema = {
            "@context": "https://schema.org",
            "@type": "Store",
            "name": "AutoParts Egypt",
            "image": "https://autoparts-egypt.com/assets/images/store.jpg",
            "description": "Leading automotive parts retailer in Egypt and Middle East",
            "priceRange": "$$",
            "currenciesAccepted": "EGP, USD, EUR, SAR, AED, GBP",
            "paymentAccepted": "Cash, Credit Card, PayPal, Mobile Payment",
            "openingHours": "Mo-Su 09:00-21:00",
            "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Automotive Parts",
                "itemListElement": []
            }
        };
        
        this.injectStructuredData('organization', organizationSchema);
        this.injectStructuredData('website', websiteSchema);
        this.injectStructuredData('store', ecommerceSchema);
    }
    
    injectStructuredData(type, data) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = `schema-${type}`;
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
    }
    
    optimizeMetaTags() {
        const metaTags = {
            // Basic Meta Tags
            'description': 'Premium car spare parts in Egypt. Toyota, BMW, Mercedes, Hyundai parts with fast delivery. International shipping available. قطع غيار السيارات في مصر',
            'keywords': 'car parts egypt, spare parts, automotive, toyota parts, bmw parts, mercedes parts, قطع غيار, قطع غيار السيارات, مصر',
            'author': 'AutoParts Egypt',
            'robots': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
            'googlebot': 'index, follow',
            'viewport': 'width=device-width, initial-scale=1.0, viewport-fit=cover',
            
            // Geo Tags
            'geo.region': 'EG-C',
            'geo.placename': 'Cairo, Egypt',
            'geo.position': '30.0444;31.2357',
            'ICBM': '30.0444, 31.2357',
            
            // Language Tags
            'content-language': 'en, ar',
            'language': 'English, Arabic',
            
            // Mobile Tags
            'mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-status-bar-style': 'black-translucent',
            'apple-mobile-web-app-title': 'AutoParts Egypt',
            'application-name': 'AutoParts Egypt',
            'msapplication-TileColor': '#dc2626',
            'theme-color': '#dc2626',
            
            // Security Tags
            'referrer': 'strict-origin-when-cross-origin',
            'format-detection': 'telephone=no'
        };
        
        Object.entries(metaTags).forEach(([name, content]) => {
            this.updateMetaTag(name, content);
        });
    }
    
    updateMetaTag(name, content) {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = name;
            document.head.appendChild(meta);
        }
        meta.content = content;
    }
    
    setupOpenGraph() {
        const ogTags = {
            'og:type': 'website',
            'og:site_name': 'AutoParts Egypt',
            'og:title': 'AutoParts Egypt - Premium Car Spare Parts',
            'og:description': 'Premium car spare parts in Egypt with international shipping. Toyota, BMW, Mercedes, Hyundai parts with fast delivery.',
            'og:image': 'https://autoparts-egypt.com/assets/images/og-image.jpg',
            'og:image:width': '1200',
            'og:image:height': '630',
            'og:image:alt': 'AutoParts Egypt - Car Spare Parts',
            'og:url': 'https://autoparts-egypt.com',
            'og:locale': 'en_US',
            'og:locale:alternate': 'ar_EG'
        };
        
        Object.entries(ogTags).forEach(([property, content]) => {
            this.updateOGTag(property, content);
        });
    }
    
    updateOGTag(property, content) {
        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('property', property);
            document.head.appendChild(meta);
        }
        meta.content = content;
    }
    
    setupTwitterCards() {
        const twitterTags = {
            'twitter:card': 'summary_large_image',
            'twitter:site': '@autoparts_egypt',
            'twitter:creator': '@autoparts_egypt',
            'twitter:title': 'AutoParts Egypt - Premium Car Spare Parts',
            'twitter:description': 'Premium car spare parts in Egypt with international shipping. Fast delivery worldwide.',
            'twitter:image': 'https://autoparts-egypt.com/assets/images/twitter-card.jpg',
            'twitter:image:alt': 'AutoParts Egypt - Car Spare Parts'
        };
        
        Object.entries(twitterTags).forEach(([name, content]) => {
            this.updateTwitterTag(name, content);
        });
    }
    
    updateTwitterTag(name, content) {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = name;
            document.head.appendChild(meta);
        }
        meta.content = content;
    }
    
    setupCanonicalURLs() {
        const canonical = document.querySelector('link[rel="canonical"]') || document.createElement('link');
        canonical.rel = 'canonical';
        canonical.href = window.location.origin + window.location.pathname;
        
        if (!document.querySelector('link[rel="canonical"]')) {
            document.head.appendChild(canonical);
        }
    }
    
    setupHreflang() {
        const hreflangTags = [
            { lang: 'en', href: 'https://autoparts-egypt.com/en' },
            { lang: 'ar', href: 'https://autoparts-egypt.com/ar' },
            { lang: 'x-default', href: 'https://autoparts-egypt.com' }
        ];
        
        hreflangTags.forEach(({ lang, href }) => {
            const link = document.createElement('link');
            link.rel = 'alternate';
            link.hreflang = lang;
            link.href = href;
            document.head.appendChild(link);
        });
    }
    
    trackPageViews() {
        // Google Analytics 4 setup
        if (typeof gtag !== 'undefined') {
            gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: document.title,
                page_location: window.location.href,
                content_group1: this.currentPage
            });
        }
        
        // Track page performance
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData && typeof gtag !== 'undefined') {
                        gtag('event', 'page_load_time', {
                            value: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
                            custom_parameter: this.currentPage
                        });
                    }
                }, 0);
            });
        }
    }
    
    optimizeImages() {
        // Add lazy loading to images
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach(img => {
            img.loading = 'lazy';
            img.decoding = 'async';
            
            // Add alt text if missing
            if (!img.alt) {
                img.alt = 'AutoParts Egypt - Car Spare Parts';
            }
        });
        
        // Optimize image formats
        if ('loading' in HTMLImageElement.prototype) {
            // Browser supports lazy loading
            console.log('Native lazy loading supported');
        } else {
            // Fallback for older browsers
            this.implementLazyLoading();
        }
    }
    
    implementLazyLoading() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    setupBreadcrumbs() {
        const breadcrumbSchema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://autoparts-egypt.com"
                }
            ]
        };
        
        // Add breadcrumb navigation to page
        const breadcrumbHTML = `
            <nav class="breadcrumb" aria-label="Breadcrumb">
                <ol class="breadcrumb-list">
                    <li class="breadcrumb-item">
                        <a href="/" class="breadcrumb-link">
                            <i class="fas fa-home"></i>
                            <span>Home</span>
                        </a>
                    </li>
                </ol>
            </nav>
        `;
        
        // Insert breadcrumb after header
        const header = document.querySelector('.header');
        if (header && !document.querySelector('.breadcrumb')) {
            header.insertAdjacentHTML('afterend', breadcrumbHTML);
        }
        
        this.injectStructuredData('breadcrumb', breadcrumbSchema);
    }
    
    updatePageSEO(pageType, data = {}) {
        this.currentPage = pageType;
        
        switch (pageType) {
            case 'product':
                this.setupProductSEO(data);
                break;
            case 'category':
                this.setupCategorySEO(data);
                break;
            case 'brand':
                this.setupBrandSEO(data);
                break;
            default:
                this.setupHomeSEO();
        }
    }
    
    setupProductSEO(product) {
        // Update title and meta description
        document.title = `${product.name} - ${product.brand} | AutoParts Egypt`;
        this.updateMetaTag('description', `${product.name} for ${product.brand}. Price: ${product.price} EGP. ${product.description}. Fast delivery in Egypt and worldwide shipping.`);
        
        // Product structured data
        const productSchema = {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "description": product.description,
            "brand": {
                "@type": "Brand",
                "name": product.brand
            },
            "sku": product.partNumber,
            "offers": {
                "@type": "Offer",
                "price": product.price,
                "priceCurrency": "EGP",
                "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
                "seller": {
                    "@type": "Organization",
                    "name": "AutoParts Egypt"
                }
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.5",
                "reviewCount": "127"
            }
        };
        
        this.injectStructuredData('product', productSchema);
    }
    
    setupCategorySEO(category) {
        document.title = `${category.name} Parts | AutoParts Egypt`;
        this.updateMetaTag('description', `Shop ${category.name} parts for all car brands. Premium quality automotive parts with fast delivery in Egypt and international shipping.`);
    }
    
    setupBrandSEO(brand) {
        document.title = `${brand.name} Parts | AutoParts Egypt`;
        this.updateMetaTag('description', `Genuine ${brand.name} spare parts in Egypt. Original and aftermarket parts with warranty. Fast delivery and international shipping available.`);
    }
    
    setupHomeSEO() {
        document.title = 'AutoParts Egypt - Premium Car Spare Parts | قطع غيار السيارات';
        this.updateMetaTag('description', 'Premium car spare parts in Egypt. Toyota, BMW, Mercedes, Hyundai parts with fast delivery. International shipping available. قطع غيار السيارات في مصر');
    }
    
    // Performance monitoring
    measureWebVitals() {
        if ('web-vital' in window) {
            // Measure Core Web Vitals
            getCLS(console.log);
            getFID(console.log);
            getFCP(console.log);
            getLCP(console.log);
            getTTFB(console.log);
        }
    }
    
    // Generate sitemap data
    generateSitemapData() {
        const sitemap = {
            pages: [
                { url: '/', priority: 1.0, changefreq: 'daily' },
                { url: '/brands', priority: 0.8, changefreq: 'weekly' },
                { url: '/parts', priority: 0.9, changefreq: 'daily' },
                { url: '/services', priority: 0.7, changefreq: 'monthly' }
            ],
            products: [],
            categories: []
        };
        
        return sitemap;
    }
    
    // Add rich snippets for FAQ
    addFAQSchema(faqs) {
        const faqSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        };
        
        this.injectStructuredData('faq', faqSchema);
    }
    
    // Monitor and report SEO issues
    auditSEO() {
        const issues = [];
        
        // Check for missing meta description
        if (!document.querySelector('meta[name="description"]')) {
            issues.push('Missing meta description');
        }
        
        // Check for missing title
        if (!document.title || document.title.length < 30) {
            issues.push('Title too short or missing');
        }
        
        // Check for missing alt tags
        const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
        if (imagesWithoutAlt.length > 0) {
            issues.push(`${imagesWithoutAlt.length} images missing alt text`);
        }
        
        // Check for missing h1
        if (!document.querySelector('h1')) {
            issues.push('Missing H1 tag');
        }
        
        return issues;
    }
}

// Initialize SEO optimizer
document.addEventListener('DOMContentLoaded', () => {
    window.seoOptimizer = new SEOOptimizer();
    
    // Add FAQ data
    const faqs = [
        {
            question: "Do you ship internationally?",
            answer: "Yes, we ship worldwide. Shipping costs and delivery times vary by destination."
        },
        {
            question: "Are your parts genuine?",
            answer: "We offer both genuine OEM parts and high-quality aftermarket parts with warranty."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept credit cards, PayPal, and local payment methods depending on your country."
        }
    ];
    
    seoOptimizer.addFAQSchema(faqs);
});

// Export for global use
window.SEOOptimizer = SEOOptimizer;