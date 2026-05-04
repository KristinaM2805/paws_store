
class ProductPage {
    constructor() {
        this.productId = this.getProductIdFromUrl();
        console.log('Product ID from URL:', this.productId);
        
        if (!this.productId || !productsData.productDetails[this.productId]) {
            console.error('Product not found for ID:', this.productId);
            window.location.href = '/about_page.html';
            return;
        }
        
        this.product = productsData.productDetails[this.productId];
        this.cart = this.loadCart();
        this.quantity = 1;
        this.init();
    }
    
    getProductIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const id = parseInt(params.get('id'));
        return isNaN(id) ? null : id;
    }
    
    loadCart() {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    }
    
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartCount();
    }
    
    updateCartCount() {
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCounter = document.querySelector('.cart-counter');
        if (cartCounter) {
            cartCounter.textContent = totalItems;
            cartCounter.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }
    
    showNotification(productName, quantity) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification success-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span><img src="img/icons8-галочка-3.svg" alt="Success" class="notification-icon"></span>
                    <p>${productName} added to cart</p>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    addToCart() {
        if (!this.product) return;

        const existingItem = this.cart.find(item => item.id === this.product.id);
        
        if (existingItem) {
            existingItem.quantity += this.quantity;
        } else {
            const cardProduct = productsData.cards.find(p => p.id === this.product.id);
            const price = cardProduct ? cardProduct.price : this.product.price;
            const image = cardProduct ? cardProduct.image : (this.product.images?.[0] || `img/product${this.product.id}.webp`);
            
            this.cart.push({
                id: this.product.id,
                name: this.product.name,
                price: price,
                image: image,
                quantity: this.quantity,
                category: this.product.category
            });
        }
        
        this.saveCart();
        this.showNotification(this.product.name, this.quantity);
    }
    
    updateQuantity(newValue) {
        const min = 1, max = 100;
        if (newValue >= min && newValue <= max) {
            this.quantity = newValue;
            const quantitySpan = document.querySelector('.quantity-value');
            if (quantitySpan) quantitySpan.textContent = this.quantity;
        }
    }
    
    createRating(rating, ratingText) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += `<img class="star" src="img/icons8-star-${i <= rating ? '100' : '100-2'}.png" alt="★">`;
        }
        stars += `<span class="common_score">${ratingText}</span>`;
        return stars;
    }
    
    createKeyHighlights(highlights) {
        return `
            <div class="key_highlights_box">
                <h3>Key Highlights</h3>
                <ul class="list_key">
                    ${highlights.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    createSpecifications(specs) {
        return `
            <div class="tech_specific">
                <div class="tech_specific_header">
                    <img src="img/tech_specific.png" alt="Specifications">
                    <h3>Technical Specifications</h3>
                </div>
                <div class="specific_holder">
                    ${specs.map(spec => `
                        <div class="specific_box">
                            <div class="imopent_icon"><img src="img/i.png"></div>
                            <div class="specific_txt">
                                <h6>${spec.label}</h6>
                                <p>${spec.value}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    setupCarousel() {
        const slidesContainer = document.querySelector('.carousel-slides');
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');
        let dots = document.querySelectorAll('.dot');
        
        if (!slidesContainer) return;
        
        if (this.product.images && this.product.images.length > 0) {
            slidesContainer.innerHTML = '';
            this.product.images.forEach(imgSrc => {
                const slide = document.createElement('div');
                slide.className = 'carousel-slide';
                slide.innerHTML = `<img src="${imgSrc}" alt="${this.product.name}">`;
                slidesContainer.appendChild(slide);
            });
        }
        
        let slideItems = document.querySelectorAll('.carousel-slide');
        if (slideItems.length === 0) return;
        
        const dotsContainer = document.querySelector('.carousel-dots');
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            slideItems.forEach((_, i) => {
                const dot = document.createElement('li');
                dot.className = 'dot' + (i === 0 ? ' active' : '');
                dotsContainer.appendChild(dot);
            });
            dots = document.querySelectorAll('.dot');
        }
        
        let currentIndex = 0;
        const totalSlides = slideItems.length;
        
        const updateCarousel = () => {
            slidesContainer.style.transform = `translateX(${-currentIndex * 100}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        };
        
        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        };
        
        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel();
        };
        
        if (nextBtn) {
            const newNextBtn = nextBtn.cloneNode(true);
            nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
            newNextBtn.addEventListener('click', nextSlide);
        }
        
        if (prevBtn) {
            const newPrevBtn = prevBtn.cloneNode(true);
            prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
            newPrevBtn.addEventListener('click', prevSlide);
        }
        
        dots.forEach((dot, index) => {
            const newDot = dot.cloneNode(true);
            dot.parentNode.replaceChild(newDot, dot);
            newDot.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
        });
        
        updateCarousel();
    }
    
    render() {
        if (!this.product) return;
        
        const endPoint = document.querySelector('.end_point');
        if (endPoint) endPoint.textContent = this.product.name;
        
        const categoryEl = document.querySelector('.product_category');
        if (categoryEl) categoryEl.textContent = this.product.category;
        
        const nameEl = document.querySelector('.product_name');
        if (nameEl) nameEl.textContent = this.product.name;
        
        const ratingEl = document.querySelector('.product_info_part .rating');
        if (ratingEl) ratingEl.innerHTML = this.createRating(this.product.rating, this.product.ratingText);
        
        const priceEl = document.querySelector('.product_price');
        if (priceEl) priceEl.textContent = `$${this.product.price}`;
        
        const descEl = document.querySelector('.discription p');
        if (descEl) descEl.textContent = this.product.description;
        
        const keyHighlightsEl = document.querySelector('.key_highlights_box');
        if (keyHighlightsEl && this.product.keyHighlights) {
            keyHighlightsEl.outerHTML = this.createKeyHighlights(this.product.keyHighlights);
        }
        
        const techSpecificEl = document.querySelector('.tech_specific');
        if (techSpecificEl && this.product.specifications) {
            techSpecificEl.outerHTML = this.createSpecifications(this.product.specifications);
        }
    }

renderRelatedProducts() {
    const container = document.getElementById('related-products-container');
    if (!container) return;
    const currentCategory = this.product.category;
    const relatedProducts = productsData.cards.filter(product => 
        product.category === currentCategory && product.id !== this.productId
    );
    if (relatedProducts.length === 0) {
        const relatedBlock = document.querySelector('.related_products');
        if (relatedBlock) relatedBlock.style.display = 'none';
        return;
    }

    let html = '';
    relatedProducts.forEach(product => {
        html += `
            <a href="/product_page.html?id=${product.id}" class="related_products_card">
                <div class="related_products_frame">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='img/placeholder.png'">
                </div>
                <div class="related_products_info">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                </div>
            </a>
        `;
    });
    
    container.innerHTML = html;
}
    
    setupEventListeners() {
        const minus = document.querySelector('.minus');
        const plus = document.querySelector('.plus');
        const buyBtn = document.querySelector('.buy_buttom');
        
        if (minus) {
            const newMinus = minus.cloneNode(true);
            minus.parentNode.replaceChild(newMinus, minus);
            newMinus.addEventListener('click', () => this.updateQuantity(this.quantity - 1));
        }
        
        if (plus) {
            const newPlus = plus.cloneNode(true);
            plus.parentNode.replaceChild(newPlus, plus);
            newPlus.addEventListener('click', () => this.updateQuantity(this.quantity + 1));
        }
        
        if (buyBtn) {
            const newBuyBtn = buyBtn.cloneNode(true);
            buyBtn.parentNode.replaceChild(newBuyBtn, buyBtn);
            newBuyBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addToCart();
            });
        }
    }
    
    init() {
        this.render();
        this.setupCarousel();
        this.setupEventListeners();
        this.updateCartCount();
        this.renderRelatedProducts();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProductPage();
});