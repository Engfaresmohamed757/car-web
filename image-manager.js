// Advanced Image Management System for PartsHub Egypt
class ImageManager {
    constructor() {
        this.imageCache = new Map();
        this.defaultImages = {
            cars: {
                toyota: 'assets/images/cars/toyota-corolla.jpg',
                hyundai: 'assets/images/cars/hyundai-elantra.jpg',
                kia: 'assets/images/cars/kia-cerato.jpg',
                nissan: 'assets/images/cars/nissan-sunny.jpg',
                chevrolet: 'assets/images/cars/chevrolet-cruze.jpg',
                bmw: 'assets/images/cars/bmw-3series.jpg',
                mercedes: 'assets/images/cars/mercedes-c-class.jpg',
                peugeot: 'assets/images/cars/peugeot-301.jpg'
            },
            parts: {
                engine: 'assets/images/parts/oil-filter-1.jpg',
                brakes: 'assets/images/parts/brake-pads-1.jpg',
                suspension: 'assets/images/parts/shock-absorbers-1.jpg',
                electrical: 'assets/images/parts/battery-1.jpg',
                body: 'assets/images/parts/side-mirror-1.jpg',
                default: 'assets/images/parts/default-part.jpg'
            }
        };
        
        this.pinterestStyleImages = {
            cars: [
                {
                    brand: 'toyota',
                    model: 'corolla',
                    images: [
                        'https://i.pinimg.com/564x/1a/2b/3c/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p.jpg',
                        'https://i.pinimg.com/564x/2b/3c/4d/2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q.jpg'
                    ]
                },
                {
                    brand: 'hyundai',
                    model: 'elantra',
                    images: [
                        'https://i.pinimg.com/564x/3c/4d/5e/3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r.jpg',
                        'https://i.pinimg.com/564x/4d/5e/6f/4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s.jpg'
                    ]
                }
            ],
            parts: [
                {
                    category: 'engine',
                    name: 'oil-filter',
                    images: [
                        'https://i.pinimg.com/564x/5e/6f/7g/5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t.jpg',
                        'https://i.pinimg.com/564x/6f/7g/8h/6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u.jpg'
                    ]
                },
                {
                    category: 'brakes',
                    name: 'brake-pads',
                    images: [
                        'https://i.pinimg.com/564x/7g/8h/9i/7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v.jpg',
                        'https://i.pinimg.com/564x/8h/9i/0j/8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w.jpg'
                    ]
                }
            ]
        };
        
        this.init();
    }
    
    init() {
        this.preloadDefaultImages();
        this.setupImageLazyLoading();
        this.setupImageErrorHandling();
    }
    
    preloadDefaultImages() {
        // Preload critical images
        Object.values(this.defaultImages.parts).forEach(src => {
            this.preloadImage(src);
        });
        
        // Preload brand logos
        Object.values(this.defaultImages.cars).forEach(src => {
            this.preloadImage(src);
        });
    }
    
    preloadImage(src) {
        if (this.imageCache.has(src)) return;
        
        const img = new Image();
        img.onload = () => {
            this.imageCache.set(src, {
                loaded: true,
                element: img,
                timestamp: Date.now()
            });
        };
        img.onerror = () => {
            this.imageCache.set(src, {
                loaded: false,
                error: true,
                timestamp: Date.now()
            });
        };
        img.src = src;
    }
    
    getCarImage(brand, model = null) {
        // Try to get specific model image first
        if (model) {
            const specificImage = this.pinterestStyleImages.cars.find(
                car => car.brand === brand && car.model === model
            );
            if (specificImage && specificImage.images.length > 0) {
                return specificImage.images[0];
            }
        }
        
        // Fallback to brand default
        return this.defaultImages.cars[brand] || this.defaultImages.cars.toyota;
    }
    
    getPartImage(category, partName = null) {
        // Try to get specific part image first
        if (partName) {
            const specificImage = this.pinterestStyleImages.parts.find(
                part => part.category === category && part.name === partName
            );
            if (specificImage && specificImage.images.length > 0) {
                return specificImage.images[0];
            }
        }
        
        // Fallback to category default
        return this.defaultImages.parts[category] || this.defaultImages.parts.default;
    }
    
    getProductImages(product) {
        if (product.images && product.images.length > 0) {
            return product.images;
        }
        
        // Generate images based on product data
        const images = [];
        
        // Add main product image
        images.push(this.getPartImage(product.category, product.id));
        
        // Add category-specific images
        const categoryImages = this.pinterestStyleImages.parts.filter(
            part => part.category === product.category
        );
        
        categoryImages.forEach(categoryImage => {
            if (categoryImage.images && categoryImage.images.length > 0) {
                images.push(...categoryImage.images.slice(0, 2));
            }
        });
        
        return images.slice(0, 4); // Limit to 4 images
    }
    
    createImageGallery(images, productName) {
        const gallery = document.createElement('div');
        gallery.className = 'image-gallery';
        
        const mainImage = document.createElement('div');
        mainImage.className = 'main-image';
        
        const mainImg = document.createElement('img');
        mainImg.src = images[0] || this.defaultImages.parts.default;
        mainImg.alt = productName;
        mainImg.className = 'main-img';
        mainImage.appendChild(mainImg);
        
        const thumbnails = document.createElement('div');
        thumbnails.className = 'thumbnails';
        
        images.forEach((src, index) => {
            const thumb = document.createElement('img');
            thumb.src = src;
            thumb.alt = `${productName} - صورة ${index + 1}`;
            thumb.className = `thumbnail ${index === 0 ? 'active' : ''}`;
            thumb.onclick = () => this.switchMainImage(mainImg, src, thumbnails, thumb);
            thumbnails.appendChild(thumb);
        });
        
        gallery.appendChild(mainImage);
        gallery.appendChild(thumbnails);
        
        return gallery;
    }
    
    switchMainImage(mainImg, newSrc, thumbnailsContainer, activeThumbnail) {
        mainImg.src = newSrc;
        
        // Update active thumbnail
        thumbnailsContainer.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.classList.remove('active');
        });
        activeThumbnail.classList.add('active');
    }
    
    setupImageLazyLoading() {
        if ('IntersectionObserver' in window) {
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
            
            // Observe all lazy images
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    setupImageErrorHandling() {
        document.addEventListener('error', (e) => {
            if (e.target.tagName === 'IMG') {
                this.handleImageError(e.target);
            }
        }, true);
    }
    
    handleImageError(img) {
        // Try to determine the appropriate fallback
        let fallbackSrc = this.defaultImages.parts.default;
        
        if (img.classList.contains('brand-logo')) {
            fallbackSrc = 'assets/images/brands/default-brand.svg';
        } else if (img.classList.contains('car-image')) {
            fallbackSrc = this.defaultImages.cars.toyota;
        } else if (img.classList.contains('product-image')) {
            fallbackSrc = this.defaultImages.parts.default;
        }
        
        // Prevent infinite loop
        if (img.src !== fallbackSrc) {
            img.src = fallbackSrc;
        }
    }
    
    optimizeImage(src, width = null, height = null, quality = 80) {
        // In a real implementation, this would call an image optimization service
        // For now, we'll return the original src with parameters
        const url = new URL(src, window.location.origin);
        
        if (width) url.searchParams.set('w', width);
        if (height) url.searchParams.set('h', height);
        if (quality !== 80) url.searchParams.set('q', quality);
        
        return url.toString();
    }
    
    createResponsiveImage(src, alt, sizes = null) {
        const img = document.createElement('img');
        img.alt = alt;
        
        if (sizes) {
            // Create srcset for different screen sizes
            const srcset = sizes.map(size => 
                `${this.optimizeImage(src, size.width)} ${size.width}w`
            ).join(', ');
            
            img.srcset = srcset;
            img.sizes = sizes.map(size => 
                `(max-width: ${size.breakpoint}px) ${size.width}px`
            ).join(', ');
        }
        
        img.src = src;
        return img;
    }
    
    addImageUploadHandler(inputElement, callback) {
        inputElement.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            const validFiles = files.filter(file => this.isValidImageFile(file));
            
            if (validFiles.length === 0) {
                alert('يرجى اختيار ملفات صور صالحة (JPG, PNG, WebP)');
                return;
            }
            
            validFiles.forEach(file => {
                this.processImageFile(file, callback);
            });
        });
    }
    
    isValidImageFile(file) {
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        const maxSize = 5 * 1024 * 1024; // 5MB
        
        return validTypes.includes(file.type) && file.size <= maxSize;
    }
    
    processImageFile(file, callback) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                // Resize if needed
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                const maxWidth = 800;
                const maxHeight = 600;
                
                let { width, height } = img;
                
                if (width > maxWidth || height > maxHeight) {
                    const ratio = Math.min(maxWidth / width, maxHeight / height);
                    width *= ratio;
                    height *= ratio;
                }
                
                canvas.width = width;
                canvas.height = height;
                
                ctx.drawImage(img, 0, 0, width, height);
                
                canvas.toBlob((blob) => {
                    const optimizedFile = new File([blob], file.name, {
                        type: 'image/jpeg',
                        lastModified: Date.now()
                    });
                    
                    callback(optimizedFile, canvas.toDataURL('image/jpeg', 0.8));
                }, 'image/jpeg', 0.8);
            };
            img.src = e.target.result;
        };
        
        reader.readAsDataURL(file);
    }
    
    createImagePreview(src, name) {
        const preview = document.createElement('div');
        preview.className = 'image-preview';
        
        const img = document.createElement('img');
        img.src = src;
        img.alt = name;
        
        const overlay = document.createElement('div');
        overlay.className = 'image-overlay';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-image-btn';
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.onclick = () => preview.remove();
        
        overlay.appendChild(deleteBtn);
        preview.appendChild(img);
        preview.appendChild(overlay);
        
        return preview;
    }
    
    // Pinterest-style image loading with masonry layout
    createMasonryGallery(container, images) {
        container.className = 'masonry-gallery';
        
        images.forEach((image, index) => {
            const item = document.createElement('div');
            item.className = 'masonry-item';
            
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt || `صورة ${index + 1}`;
            img.loading = 'lazy';
            
            img.onload = () => {
                item.style.height = `${img.naturalHeight * (250 / img.naturalWidth)}px`;
            };
            
            item.appendChild(img);
            container.appendChild(item);
        });
    }
}

// Initialize image manager
const imageManager = new ImageManager();

// Export for global access
window.imageManager = imageManager;

// Add CSS for image components
const imageStyles = `
<style>
.image-gallery {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.main-image {
    width: 100%;
    height: 300px;
    overflow: hidden;
    border-radius: 8px;
    background: #f3f4f6;
}

.main-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.main-img:hover {
    transform: scale(1.05);
}

.thumbnails {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    padding: 0.5rem 0;
}

.thumbnail {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
    cursor: pointer;
    opacity: 0.7;
    transition: all 0.3s ease;
    border: 2px solid transparent;
}

.thumbnail:hover,
.thumbnail.active {
    opacity: 1;
    border-color: #dc2626;
}

.image-preview {
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 8px;
    overflow: hidden;
    border: 2px solid #e5e7eb;
}

.image-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.image-preview:hover .image-overlay {
    opacity: 1;
}

.delete-image-btn {
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.masonry-gallery {
    column-count: 3;
    column-gap: 1rem;
    padding: 1rem;
}

.masonry-item {
    break-inside: avoid;
    margin-bottom: 1rem;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.masonry-item:hover {
    transform: translateY(-4px);
}

.masonry-item img {
    width: 100%;
    height: auto;
    display: block;
}

@media (max-width: 768px) {
    .masonry-gallery {
        column-count: 2;
    }
    
    .thumbnails {
        justify-content: center;
    }
}

@media (max-width: 480px) {
    .masonry-gallery {
        column-count: 1;
    }
}

.lazy {
    opacity: 0;
    transition: opacity 0.3s;
}

.lazy.loaded {
    opacity: 1;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', imageStyles);