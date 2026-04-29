class ProductsRenderer {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.products = [...productsData.cards];
        this.filteredProducts = [...this.products];
        this.cart = this.loadCart();
        this.currentSort = 'name-az';
        this.currentFilters = {
            rating: {
                5: false,
                4: false,
                3: false
            },
            minPrice: 10,
            maxPrice: 100
        };
        this.init();
    }
    
    init() {
        this.updateCartCount();
        this.setupCustomSelect();
        this.setupFilterPanel();
        this.setupFiltersAndSort();
        this.applyFiltersAndSort();
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
            if (totalItems > 0) {
                cartCounter.textContent = totalItems;
                cartCounter.style.display = 'flex';
            } else {
                cartCounter.style.display = 'none';
            }
        }
    }
    
    showNotification(productName) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span><img src="img/icons8-галочка-3.svg" alt="Success" class="notification-icon"></span>
                    <p>${productName}added to cart</p>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    addToCart(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.showNotification(product.name);
    }

    createRating(rating, showScore = false, score = null) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += `<img class="star" src="img/icons8-star-100.png" alt="★">`;
            } else {
                stars += `<img class="star" src="img/icons8-star-100-2.png" alt="☆">`;
            }
        }
        
        if (showScore && score) {
            stars += `<span class="common_score">${score}</span>`;
        }
        
        return stars;
    }
    
setupCustomSelect() {
    const customSelect = document.querySelector('.custom-select');
    if (!customSelect) {
        console.log('Custom select not found');
        return;
    }
    
    const selectedDiv = customSelect.querySelector('.select-selected');
    const options = customSelect.querySelectorAll('.select-option');
    
    console.log('Found custom select:', customSelect);
    console.log('Options count:', options.length);

    if (options.length > 0 && !customSelect.querySelector('.select-option.selected')) {
        options[0].classList.add('selected');
        const selectedText = options[0].querySelector('p')?.textContent || options[0].querySelector('span:first-child')?.textContent;
        const selectedSpan = selectedDiv?.querySelector('h5');
        if (selectedSpan && selectedText) selectedSpan.textContent = selectedText;
    }

    if (selectedDiv) {
        selectedDiv.addEventListener('click', (e) => {
            e.stopPropagation();
            customSelect.classList.toggle('active');
            console.log('Toggled active:', customSelect.classList.contains('active'));
        });
    }

    options.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const sortValue = option.getAttribute('data-value');
            console.log('Option clicked:', sortValue);
            
            if (sortValue) {
                this.currentSort = sortValue;
                this.applyFiltersAndSort();
                options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                const selectedText = option.querySelector('p')?.textContent || option.querySelector('span:first-child')?.textContent;
                const selectedSpan = selectedDiv?.querySelector('h5');
                if (selectedSpan && selectedText) selectedSpan.textContent = selectedText;
            }
            
            customSelect.classList.remove('active');
        });
    });
    
    document.addEventListener('click', (e) => {
        if (!customSelect.contains(e.target)) {
            customSelect.classList.remove('active');
        }
    });
}

    setupFilterPanel() {
        const filterBtn = document.querySelector('.filters_btm');
        const filterPanel = document.querySelector('.filter_o');
        const closeBtn = document.querySelector('.close');
        const mainBlock = document.querySelector('.main');
        
        if (filterBtn && filterPanel) {
            filterBtn.addEventListener('click', () => {
                if (filterPanel.style.display === 'none' || filterPanel.style.display === '') {
                    filterPanel.style.display = 'block';
                } else {
                    filterPanel.style.display = 'none';
                    if (mainBlock) mainBlock.style.gridTemplateRows = '';
                }
            });
        }
        
        if (closeBtn && filterPanel) {
            closeBtn.addEventListener('click', () => {
                filterPanel.style.display = 'none';
                if (mainBlock) mainBlock.style.gridTemplateRows = '';
            });
        }
        
        window.addEventListener('resize', () => {
            if (filterPanel && window.innerWidth > 1024) {
                filterPanel.style.display = 'none';
                if (mainBlock) mainBlock.style.gridTemplateRows = '';
            }
        });
    }

    setupFiltersAndSort() {
    const ratingCheckboxes = document.querySelectorAll('.rating_checkbox .checkbox');
    ratingCheckboxes.forEach((checkbox, index) => {
        const ratingValue = [5, 4, 3][index];
        checkbox.checked = this.currentFilters.rating[ratingValue];
        
        checkbox.addEventListener('change', (e) => {
            this.currentFilters.rating[ratingValue] = e.target.checked;
            this.applyFiltersAndSort();
        });
    });
    
    const minPriceInput = document.querySelector('.price_range .minmax:first-child .input_num');
    if (minPriceInput) {
        minPriceInput.value = this.currentFilters.minPrice;
        minPriceInput.addEventListener('change', (e) => {
            this.currentFilters.minPrice = parseInt(e.target.value) || 0;
            this.applyFiltersAndSort();
        });
    }
    const maxPriceInput = document.querySelector('.price_range .minmax:last-child .input_num');
    if (maxPriceInput) {
        maxPriceInput.value = this.currentFilters.maxPrice;
        maxPriceInput.addEventListener('change', (e) => {
            this.currentFilters.maxPrice = parseInt(e.target.value) || 100;
            this.applyFiltersAndSort();
        });
    }
    
    const mobileRatingCheckboxes = document.querySelectorAll('.filter_o .rating_checkbox .checkbox');
    mobileRatingCheckboxes.forEach((checkbox, index) => {
        const ratingValue = [5, 4, 3][index];
        checkbox.checked = this.currentFilters.rating[ratingValue];
        checkbox.addEventListener('change', (e) => {
            this.currentFilters.rating[ratingValue] = e.target.checked;
            this.applyFiltersAndSort();
            const mainCheckbox = document.querySelectorAll('.filter .rating_checkbox .checkbox')[index];
            if (mainCheckbox) mainCheckbox.checked = e.target.checked;
        });
    });
    
    const mobileMinPrice = document.querySelector('.filter_o .price_range .minmax:first-child .input_num');
    if (mobileMinPrice) {
        mobileMinPrice.value = this.currentFilters.minPrice;
        mobileMinPrice.addEventListener('change', (e) => {
            this.currentFilters.minPrice = parseInt(e.target.value) || 0;
            this.applyFiltersAndSort();
            const mainMinPrice = document.querySelector('.filter .price_range .minmax:first-child .input_num');
            if (mainMinPrice) mainMinPrice.value = e.target.value;
        });
    }
    
    const mobileMaxPrice = document.querySelector('.filter_o .price_range .minmax:last-child .input_num');
    if (mobileMaxPrice) {
        mobileMaxPrice.value = this.currentFilters.maxPrice;
        mobileMaxPrice.addEventListener('change', (e) => {
            this.currentFilters.maxPrice = parseInt(e.target.value) || 100;
            this.applyFiltersAndSort();
            const mainMaxPrice = document.querySelector('.filter .price_range .minmax:last-child .input_num');
            if (mainMaxPrice) mainMaxPrice.value = e.target.value;
        });
    }
}
    sortProducts() {
        switch(this.currentSort) {
            case 'name-az':
                this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-za':
                this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'price-low':
                this.filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                this.filteredProducts.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }
    }
filterProducts() {
    const hasActiveRatingFilter = Object.values(this.currentFilters.rating).some(value => value === true);
    if (!hasActiveRatingFilter && this.currentFilters.minPrice === 10 && this.currentFilters.maxPrice === 100) {
        this.filteredProducts = [...this.products];
        return;
    }

    this.filteredProducts = this.products.filter(product => {
        const ratingOk = hasActiveRatingFilter ? this.currentFilters.rating[Math.floor(product.rating)] === true : true;
        const priceOk = product.price >= this.currentFilters.minPrice && 
                       product.price <= this.currentFilters.maxPrice;
        return ratingOk && priceOk;
    });
}

    applyFiltersAndSort() {
        this.filterProducts();
        this.sortProducts();
        this.render();
        this.updateProductsCount();
    }
    
    updateProductsCount() {
        const countElement = document.querySelector('.product_in_all');
        if (countElement) {
            countElement.textContent = `${this.filteredProducts.length} products`;
        }
    }

    createCard(product) {
    return `
        <div class="product_card" data-product-id="${product.id}">
            <a href="product_page.html?id=${product.id}" class="product-main-link">
                <div class="img_frame">
                    <img class="product_img" src="${product.image}" alt="${product.name}">
                    <div class="price_pl"><span class="price_span">$${product.price}</span></div>
                    <div class="add_info">
                        <div class="card_info">
                            <h5>${product.name}</h5>
                            <div class="rating">
                                ${this.createRating(product.rating, true, `(${product.reviews})`)}
                            </div>
                        </div>
                        <div class="btm_price">
                            <p class="price">$${product.oldPrice}</p>
                            <button class="buy_btn" data-id="${product.id}">
                                <img class="buy_icon" src="img/icons8-тележка-64.png" alt="Buy">
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card_info">
                    <h5>${product.name}</h5>
                    <div class="rating">
                        ${this.createRating(product.rating, true, `(${product.reviews})`)}
                    </div>
                </div>
            </a>
        </div>
    `;
}

    render() {
        if (!this.container) return;
        
        if (this.filteredProducts.length === 0) {
            this.container.innerHTML = `<div class="no-products">No products found matching your criteria</div>`;
            return;
        }
        
        let html = '';
        this.filteredProducts.forEach(product => {
            html += this.createCard(product);
        });
        this.container.innerHTML = html;
        
        this.addBuyButtonsListeners();
    }

    addBuyButtonsListeners() {
        document.querySelectorAll('.buy_btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const productId = parseInt(btn.getAttribute('data-id'));
                const product = this.products.find(p => p.id === productId);
                if (product) {
                    this.addToCart(product);
                }
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const cardsContainer = document.querySelector('.card_holder');
    if (cardsContainer) {
        window.productsRenderer = new ProductsRenderer('.card_holder');
    }
});