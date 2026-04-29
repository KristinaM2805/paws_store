
class ShoppingBag {
    constructor() {
        this.cart = this.loadCart();
        this.promoApplied = false;
        this.discountRate = 0;
        this.discountAmount = 0;
        this.originalPromoHTML = null;
        this.init();
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

    getSubtotal() {
        let subtotal = 0;
        document.querySelectorAll('.item_in_char').forEach(item => {
            const priceElement = item.querySelector('.prices h5');
            if (priceElement) {
                const price = parseFloat(priceElement.textContent.replace('$', '').trim());
                if (!isNaN(price)) {
                    subtotal += price;
                }
            }
        });
        return subtotal;
    }
    
    updateShippingStatus() {
        const subtotal = this.getSubtotal();
        const freeShippingThreshold = 50;
        const remainingAmount = freeShippingThreshold - subtotal;
        
        const shippingTextElement = document.querySelector('.qlifd_box p');
        const qualifiedBox = document.querySelector('.qlifd_box');
        
        if (!shippingTextElement || !qualifiedBox) return;
        
        if (subtotal >= freeShippingThreshold) {
            shippingTextElement.textContent = 'Qualified!';
            shippingTextElement.style.color = '#00A63E';
            const icon = qualifiedBox.querySelector('img');
            if (icon) icon.src = '/img/icons8-галочка-64.png';
            icon.style.display="flex";
        } else {
            shippingTextElement.textContent = `$${remainingAmount.toFixed(2)} away`;
            shippingTextElement.style.color = '#F54900';
            const icon = qualifiedBox.querySelector('img');
            icon.style.display="none";
        }
    }
    
    showNotification(message, isError = false, productName = null, quantity = null) {
        const notification = document.createElement('div');
        notification.className = `cart-notification ${isError ? 'error-notification' : 'success-notification'}`;
        
        if (productName) {
            notification.innerHTML = `
                <div class="notification-content">
                    <img src="/img/icons8-галочка-64.png" alt="Success" class="notification-icon">
                    <div class="notification-text">
                        <strong>${productName}</strong>
                        <span>${quantity} × added to cart</span>
                    </div>
                    <a href="/shoping_bag.html" class="notification-link">View Cart →</a>
                </div>
            `;
        } else if (message === 'Item removed') {
            notification.innerHTML = `
                <div class="notification-content">
                    <span><img src="/img/icons8-галочка-3.svg" alt="Success" class="notification-icon"></span>
                        <p>Item removed from cart</p>
                </div>
            `;
        } else if (isError) {
            notification.innerHTML = `
                <div class="notification-content">
                    <div class="error-circle">
                        <span class="exclamation-mark">!</span>
                    </div>
                    <div class="notification-text">
                        <p>${message}</p>
                    </div>
                </div>
            `;
        } else {
            notification.innerHTML = `
                <div class="notification-content">
                     <span><img src="/img/icons8-галочка-3.svg" alt="Success" class="notification-icon"></span>
                        <p>${message}</p>
                </div>
            `;
        }
        
        document.body.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
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
                quantity: 1,
                category: product.category
            });
        }
        this.saveCart();
        this.showNotification(product.name, false, product.name, 1);
    }
    
    applyPromoCode(code) {
        if (!code || code.trim() === '') {
            return;
        }
        
        if (code === 'SAVE10') {
            this.promoApplied = true;
            this.discountRate = 0.1;
            this.showPromoCodeBadge();
            this.updateOrderTotal();
            this.showNotification('Promo code applied! 10% discount', false);
        } else {
            this.showNotification('Invalid promo code', true);
        }
    }
    
    showPromoCodeBadge() {
        const promocodeContainer = document.querySelector('.promocode_flied');
        if (!promocodeContainer) return;
        
        this.originalPromoHTML = promocodeContainer.innerHTML;
        
        promocodeContainer.innerHTML = `
            <div class="promo-code-badge">
                <div class="promo-code-badge-left">
                    <div class="promo-check-circle">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 6L9 17L4 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="promo-code-badge-text">
                        <span class="promo-code-name">SAVE10</span>
                        <span class="promo-code-discount">10% discount applied</span>
                    </div>
                </div>
                <button class="promo-code-remove" title="Remove promo code">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        `;
        
        const removeBtn = promocodeContainer.querySelector('.promo-code-remove');
        if (removeBtn) {
            removeBtn.addEventListener('click', () => this.removePromoCode());
        }
    }
    
    removePromoCode() {
        this.promoApplied = false;
        this.discountRate = 0;
        
        const promocodeContainer = document.querySelector('.promocode_flied');
        if (promocodeContainer && this.originalPromoHTML) {
            promocodeContainer.innerHTML = this.originalPromoHTML;
            this.setupPromoCodeListener();
        }
        
        this.updateOrderTotal();
        this.showNotification('Promo code removed', false);
    }
    
    setupPromoCodeListener() {
        const applyBtn = document.querySelector('.promocode_flied button');
        const promoInput = document.querySelector('.promocode_flied input');
        
        if (applyBtn && promoInput) {
            const newApplyBtn = applyBtn.cloneNode(true);
            applyBtn.parentNode.replaceChild(newApplyBtn, applyBtn);
            
            newApplyBtn.addEventListener('click', () => {
                const code = promoInput.value.trim().toUpperCase();
                this.applyPromoCode(code);
            });
            
            promoInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const code = promoInput.value.trim().toUpperCase();
                    this.applyPromoCode(code);
                }
            });
        }
    }
    
    updateOrderTotal() {
        let subtotal = 0;
        let itemCount = 0;
        
        document.querySelectorAll('.item_in_char').forEach(item => {
            const priceElement = item.querySelector('.prices h5');
            if (priceElement) {
                const price = parseFloat(priceElement.textContent.replace('$', '').trim());
                if (!isNaN(price)) {
                    subtotal += price;
                    itemCount++;
                }
            }
        });
        
        this.discountAmount = this.promoApplied ? subtotal * this.discountRate : 0;
        const discountedSubtotal = subtotal - this.discountAmount;
        const tax = discountedSubtotal * 0.08;
        const total = discountedSubtotal + tax;
        
        const subtotalElement = document.querySelector('.account .subtotal');
        const taxElement = document.querySelector('.account .tax');
        const totalElement = document.querySelector('.total_price .total');
        const bagCountElement = document.querySelector('.name_of_page_and_iteam p');
        const itemCountElement = document.querySelector('.order_summery_header p');
        if (subtotalElement) subtotalElement.textContent = `$${discountedSubtotal.toFixed(2)}`;
        if (taxElement) taxElement.textContent = `$${tax.toFixed(2)}`;
        if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
        ;
        const discountBlock = document.querySelector('.account .discount-block');
        if (this.promoApplied) {
        if (discountBlock) {
            discountBlock.querySelector('.promo_p').textContent = `-$${this.discountAmount.toFixed(2)}`;
            discountBlock.style.display = 'flex';
        }
    } else {
        if (discountBlock) discountBlock.style.display = 'none';
    }
        
        const word = itemCount === 1 ? 'item' : 'items';
        if (itemCountElement) itemCountElement.textContent = `${itemCount} ${word} in your bag`;
        if (bagCountElement) bagCountElement.textContent = `${itemCount} ${word} ready for checkout`;
        this.updateShippingStatus();
        this.updateCartDisplay();
    }
    
    updateCartDisplay() {
        const items = document.querySelectorAll('.item_in_char');
        const hasItems = items.length > 0;
        const cartFull = document.querySelector('.shoppin_bag_way, .bag_main');
        const cartEmpty = document.getElementById('empty-cart');
        const mainContainer = document.querySelector('.bag_main');
        
        if (hasItems) {
            if (cartFull) cartFull.style.display = 'block';
            if (cartEmpty) cartEmpty.style.display = 'none';
            if (mainContainer) mainContainer.style.display = 'block';
        } else {
            if (cartFull) cartFull.style.display = 'none';
            if (cartEmpty) cartEmpty.style.display = 'block';
            if (mainContainer) mainContainer.style.display = 'none';
        }
    }
    
    renderCart() {
        const container = document.querySelector('.list_to_buy');
        if (!container) return;
        
        if (this.cart.length === 0) {
            container.innerHTML = '';
            this.updateOrderTotal();
            return;
        }
        
        let html = '';
        this.cart.forEach(item => {
            const totalPrice = item.price * item.quantity;
            html += `
                <div class="item_in_char" data-product-id="${item.id}" data-original-price="${item.price}">
                    <a class="link_product" href="/product_page.html?id=${item.id}">
                        <div class="img_wrapper">
                            <img src="${item.image}" alt="${item.name}" onerror="this.src='/img/placeholder.png'">
                        </div>
                    </a>
                    <div class="shopping_item_info">
                        <div class="name_category">
                            <a class="link_product_t" href="/product_page.html?id=${item.id}">${item.name}</a>
                            <p>${item.category || 'Pet Product'}</p>
                        </div>
                        <div class="quantity_iteam">
                            <div class="quantiti_spn">
                                <button class="qty-minus" tabindex="0">-</button>
                                <span class="qty-num">${item.quantity}</span>
                                <button class="qty-plus" tabindex="0">+</button>
                            </div>
                        </div>
                        <div class="price_delete">
                            <div class="prices">
                                <h5 class="item-price">$${totalPrice.toFixed(2)}</h5>
                                <p>$${item.price.toFixed(2)}</p>
                            </div>
                            <button class="delete-item"><img src="/img/icons8-мусорное-ведро-64.png" alt="Delete"></button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
        this.attachItemEvents();
        this.updateOrderTotal();
    }
    
    attachItemEvents() {
        document.querySelectorAll('.quantiti_spn').forEach(block => {
            const minusBtn = block.querySelector('.qty-minus');
            const plusBtn = block.querySelector('.qty-plus');
            const quantitySpan = block.querySelector('.qty-num');
            const itemBlock = block.closest('.item_in_char');
            const productId = parseInt(itemBlock.dataset.productId);
            let quantity = parseInt(quantitySpan.textContent);
            const product = this.cart.find(p => p.id === productId);
            
            minusBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (quantity > 1) {
                    quantity--;
                    quantitySpan.textContent = quantity;
                    if (product) product.quantity = quantity;
                    this.saveCart();
                    this.renderCart();
                }
            });
            
            plusBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (quantity < 99) {
                    quantity++;
                    quantitySpan.textContent = quantity;
                    if (product) product.quantity = quantity;
                    this.saveCart();
                    this.renderCart();
                }
            });
        });
        
        document.querySelectorAll('.delete-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemBlock = btn.closest('.item_in_char');
                const productId = parseInt(itemBlock.dataset.productId);
                this.cart = this.cart.filter(p => p.id !== productId);
                this.saveCart();
                this.renderCart();
                this.showNotification('Item removed', false);
            });
        });
    }
    
    init() {
        this.renderCart();
        this.setupPromoCodeListener();
        this.updateCartCount();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.shoppingBag = new ShoppingBag();
});