/* ============================================ */
/* ESSENTIA — JavaScript Completo              */
/* Menu · Carrinho · Wishlist · Busca · Dark   */
/* Scroll Reveal · Cupom · Prova Social        */
/* Checkout · Promo Bar                        */
/* ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    'use strict';

    // ============================================ //
    // 0. UTILS                                     //
    // ============================================ //

    function formatPrice(price) {
        return 'R$ ' + parseFloat(price).toFixed(2).replace('.', ',');
    }

    function formatPriceNum(price) {
        return parseFloat(price).toFixed(2);
    }

    // Produtos data (for search)
    const produtosData = [
        { name: 'Jaqueta Oversized', category: 'Streetwear', price: 289.90, icon: '🧥', badge: 'bestseller' },
        { name: 'Camiseta Algodão Orgânico', category: 'Minimalista', price: 89.90, icon: '👕', badge: 'new' },
        { name: 'Vestido Assimétrico', category: 'Alternativo', price: 199.90, icon: '👗', badge: '' },
        { name: 'Calça Cargo Baggy', category: 'Streetwear', price: 179.90, icon: '👖', badge: 'limited' },
        { name: 'Blusa Cropped Linho', category: 'Minimalista', price: 129.90, icon: '👚', badge: '' },
        { name: 'Moletom Com Capuz', category: 'Casual', price: 159.90, icon: '🧶', badge: '' },
        { name: 'Saia Plissada Preta', category: 'Alternativo', price: 149.90, icon: '👗', badge: '' },
        { name: 'Camisa Oversized', category: 'Casual', price: 139.90, icon: '👔', badge: 'new' },
        { name: 'Corset Gótico', category: 'Alternativo', price: 259.90, icon: '🖤', badge: 'bestseller' },
    ];

    // ============================================ //
    // 1. MOBILE MENU — TOGGLE                     //
    // ============================================ //

    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mainNav = document.getElementById('mainNav');

    if (hamburgerBtn && mainNav) {
        hamburgerBtn.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('header__nav--open');
            hamburgerBtn.setAttribute('aria-expanded', isOpen);
            hamburgerBtn.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        mainNav.querySelectorAll('.header__nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('header__nav--open');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                hamburgerBtn.setAttribute('aria-label', 'Abrir menu');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mainNav.classList.contains('header__nav--open')) {
                mainNav.classList.remove('header__nav--open');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                hamburgerBtn.setAttribute('aria-label', 'Abrir menu');
                document.body.style.overflow = '';
                hamburgerBtn.focus();
            }
        });
    }

    // ============================================ //
    // 2. NAVEGAÇÃO — ACTIVE LINK                  //
    // ============================================ //

    const navLinks = document.querySelectorAll('.header__nav-link');

    function updateActiveLink() {
        const scrollPos = window.scrollY + 120;

        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                const currentId = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveLink();
                ticking = false;
            });
            ticking = true;
        }
    });

    // ============================================ //
    // 3. FILTRO DE PRODUTOS POR ESTILO            //
    // ============================================ //

    const filtrosContainer = document.getElementById('filtrosContainer');
    const produtosGrid = document.getElementById('produtosGrid');
    const filtroBtns = document.querySelectorAll('.filtro__btn');

    if (filtrosContainer && produtosGrid) {
        filtroBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filtroBtns.forEach(b => b.classList.remove('filtro__btn--active'));
                btn.classList.add('filtro__btn--active');

                const filterValue = btn.dataset.filter;
                const cards = produtosGrid.querySelectorAll('.produto-card');

                cards.forEach(card => {
                    if (filterValue === 'todos') {
                        card.classList.remove('hidden');
                    } else {
                        const category = card.dataset.category;
                        card.classList.toggle('hidden', category !== filterValue);
                    }
                });
            });
        });
    }

    // ============================================ //
    // 4. CARROSSEL DE DEPOIMENTOS                 //
    // ============================================ //

    const track = document.getElementById('carrosselTrack');
    const prevBtn = document.getElementById('carrosselPrev');
    const nextBtn = document.getElementById('carrosselNext');
    const dots = document.querySelectorAll('.carrossel__dot');

    if (track && prevBtn && nextBtn && dots.length) {
        let currentIndex = 0;
        const totalSlides = dots.length;
        let autoPlayInterval;

        function goToSlide(index) {
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;

            currentIndex = index;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;

            dots.forEach((dot, i) => {
                dot.classList.toggle('carrossel__dot--active', i === currentIndex);
            });
        }

        function nextSlide() { goToSlide(currentIndex + 1); }
        function prevSlide() { goToSlide(currentIndex - 1); }

        nextBtn.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
        prevBtn.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                goToSlide(parseInt(dot.dataset.index));
                resetAutoPlay();
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') { nextSlide(); resetAutoPlay(); }
            else if (e.key === 'ArrowLeft') { prevSlide(); resetAutoPlay(); }
        });

        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, 5000);
        }

        function resetAutoPlay() {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        }

        const carrossel = document.getElementById('carrossel');
        carrossel.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        carrossel.addEventListener('mouseleave', startAutoPlay);

        startAutoPlay();
    }

    // ============================================ //
    // 5. DARK MODE                                //
    // ============================================ //

    const themeToggleBtn = document.getElementById('themeToggleBtn');

    if (themeToggleBtn) {
        // Load saved theme
        const savedTheme = localStorage.getItem('essentia_theme') || 'light';
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.body.classList.add('dark-mode');
        }

        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.documentElement.removeAttribute('data-theme');
                document.body.classList.remove('dark-mode');
                localStorage.setItem('essentia_theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                document.body.classList.add('dark-mode');
                localStorage.setItem('essentia_theme', 'dark');
            }
        });
    }

    // ============================================ //
    // 6. SEARCH OVERLAY                           //
    // ============================================ //

    const searchToggleBtn = document.getElementById('searchToggleBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchCloseBtn = document.getElementById('searchCloseBtn');
    const searchInput = document.getElementById('searchInput');
    const searchForm = document.getElementById('searchForm');
    const searchResults = document.getElementById('searchResults');

    function openSearch() {
        searchOverlay.classList.add('search-overlay--visible');
        searchOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        setTimeout(() => searchInput.focus(), 100);
    }

    function closeSearch() {
        searchOverlay.classList.remove('search-overlay--visible');
        searchOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        searchInput.value = '';
        searchResults.innerHTML = '<p class="search-overlay__hint">Digite o nome de um produto, estilo ou categoria...</p>';
    }

    function performSearch(query) {
        const q = query.toLowerCase().trim();
        if (!q) {
            searchResults.innerHTML = '<p class="search-overlay__hint">Digite o nome de um produto, estilo ou categoria...</p>';
            return;
        }

        const results = produtosData.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
        );

        if (results.length === 0) {
            searchResults.innerHTML = `<p class="search-overlay__hint">Nenhum resultado encontrado para "${q}". Tente outro termo.</p>`;
            return;
        }

        let html = '<div class="search-overlay__results-grid">';
        results.forEach(p => {
            html += `
                <div class="search-overlay__result-item" data-name="${p.name}">
                    <span class="search-overlay__result-icon">${p.icon}</span>
                    <div class="search-overlay__result-info">
                        <strong>${p.name}</strong>
                        <span>${p.category}</span>
                    </div>
                    <span class="search-overlay__result-price">${formatPrice(p.price)}</span>
                </div>
            `;
        });
        html += '</div>';
        searchResults.innerHTML = html;

        // Click to add to cart
        searchResults.querySelectorAll('.search-overlay__result-item').forEach(item => {
            item.addEventListener('click', () => {
                const name = item.dataset.name;
                const product = produtosData.find(p => p.name === name);
                if (product) {
                    addToCart(product.name, product.price, product.category);
                    closeSearch();
                }
            });
        });
    }

    if (searchToggleBtn && searchOverlay) {
        searchToggleBtn.addEventListener('click', openSearch);
        searchCloseBtn.addEventListener('click', closeSearch);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchOverlay.classList.contains('search-overlay--visible')) {
                closeSearch();
            }
            // Ctrl+K to open search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                openSearch();
            }
        });

        // Click outside to close
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) closeSearch();
        });

        // Real-time search
        searchInput.addEventListener('input', () => performSearch(searchInput.value));

        // Form submit
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            performSearch(searchInput.value);
        });
    }

    // ============================================ //
    // 7. CART — CARRINHO LATERAL + CUPOM          //
    // ============================================ //

    const cartToggleBtn = document.getElementById('cartToggleBtn');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartCloseBtn = document.getElementById('cartCloseBtn');
    const cartItems = document.getElementById('cartItems');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTotal = document.getElementById('cartTotal');
    const cartBadge = document.getElementById('cartBadge');
    const cartCheckoutBtn = document.getElementById('cartCheckoutBtn');
    const cartDiscountRow = document.getElementById('cartDiscountRow');
    const cartDiscount = document.getElementById('cartDiscount');
    const couponInput = document.getElementById('couponInput');
    const couponApplyBtn = document.getElementById('couponApplyBtn');
    const couponMsg = document.getElementById('couponMsg');

    let cart = [];
    let appliedCoupon = null;
    const validCoupons = {
        'ESSENTIA20': { type: 'percent', value: 20, label: 'ESSENTIA20' },
        'FRETEGRATIS': { type: 'free_shipping', value: 0, label: 'FRETEGRATIS' },
        'BEMVINDO': { type: 'fixed', value: 30, label: 'BEMVINDO' },
    };

    function saveCart() {
        localStorage.setItem('essentia_cart', JSON.stringify(cart));
        if (appliedCoupon) {
            localStorage.setItem('essentia_coupon', JSON.stringify(appliedCoupon));
        } else {
            localStorage.removeItem('essentia_coupon');
        }
    }

    function loadCart() {
        const saved = localStorage.getItem('essentia_cart');
        if (saved) {
            try { cart = JSON.parse(saved); } catch { cart = []; }
        }
        const savedCoupon = localStorage.getItem('essentia_coupon');
        if (savedCoupon) {
            try { appliedCoupon = JSON.parse(savedCoupon); } catch { appliedCoupon = null; }
        }
    }

    function getSubtotal() {
        return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    }

    function getDiscount(subtotal) {
        if (!appliedCoupon) return 0;
        if (appliedCoupon.type === 'percent') {
            return subtotal * (appliedCoupon.value / 100);
        }
        if (appliedCoupon.type === 'fixed') {
            return Math.min(appliedCoupon.value, subtotal);
        }
        return 0;
    }

    function updateCartUI() {
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        cartBadge.textContent = totalItems;

        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="cart-sidebar__empty">Seu carrinho está vazio.</p>';
            cartSubtotal.textContent = 'R$ 0,00';
            cartTotal.textContent = 'R$ 0,00';
            cartCheckoutBtn.disabled = true;
            cartDiscountRow.style.display = 'none';
            return;
        }

        cartCheckoutBtn.disabled = false;

        let html = '';
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.qty;
            html += `
                <div class="cart-item" data-index="${index}">
                    <div class="cart-item__image">👕</div>
                    <div class="cart-item__info">
                        <div class="cart-item__name">${item.name}</div>
                        <div class="cart-item__category">${item.category}</div>
                        <div class="cart-item__price">${formatPrice(itemTotal)}</div>
                    </div>
                    <div class="cart-item__actions">
                        <button class="cart-item__remove" data-index="${index}" aria-label="Remover ${item.name}">Remover</button>
                        <div class="cart-item__qty">
                            <button class="cart-item__qty-btn" data-index="${index}" data-action="decr" aria-label="Diminuir quantidade">−</button>
                            <span class="cart-item__qty-value">${item.qty}</span>
                            <button class="cart-item__qty-btn" data-index="${index}" data-action="incr" aria-label="Aumentar quantidade">+</button>
                        </div>
                    </div>
                </div>
            `;
        });

        cartItems.innerHTML = html;

        const subtotal = getSubtotal();
        const discount = getDiscount(subtotal);
        const total = subtotal - discount;

        cartSubtotal.textContent = formatPrice(subtotal);

        if (discount > 0) {
            cartDiscountRow.style.display = 'flex';
            cartDiscount.textContent = `- ${formatPrice(discount)}`;
        } else {
            cartDiscountRow.style.display = 'none';
        }

        cartTotal.textContent = formatPrice(total);
        saveCart();
    }

    function addToCart(name, price, category) {
        const existing = cart.find(item => item.name === name);
        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ name, price: parseFloat(price), category, qty: 1 });
        }
        updateCartUI();
        openCart();

        cartBadge.style.transform = 'scale(1.4)';
        setTimeout(() => { cartBadge.style.transform = 'scale(1)'; }, 200);
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCartUI();
    }

    function changeQty(index, delta) {
        if (cart[index]) {
            cart[index].qty += delta;
            if (cart[index].qty <= 0) {
                cart.splice(index, 1);
            }
            updateCartUI();
        }
    }

    function openCart() {
        cartSidebar.classList.add('cart-sidebar--open');
        cartSidebar.setAttribute('aria-hidden', 'false');
        cartOverlay.classList.add('overlay--visible');
        cartOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeCart() {
        cartSidebar.classList.remove('cart-sidebar--open');
        cartSidebar.setAttribute('aria-hidden', 'true');
        cartOverlay.classList.remove('overlay--visible');
        cartOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Cart event listeners
    if (cartToggleBtn && cartSidebar && cartOverlay) {
        cartToggleBtn.addEventListener('click', () => {
            if (cartSidebar.classList.contains('cart-sidebar--open')) {
                closeCart();
            } else {
                openCart();
            }
        });

        cartCloseBtn.addEventListener('click', closeCart);
        cartOverlay.addEventListener('click', closeCart);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && cartSidebar.classList.contains('cart-sidebar--open')) {
                closeCart();
            }
        });

        // Event delegation for cart items
        cartItems.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('cart-item__remove')) {
                removeFromCart(parseInt(target.dataset.index));
            }
            if (target.classList.contains('cart-item__qty-btn')) {
                const index = parseInt(target.dataset.index);
                changeQty(index, target.dataset.action === 'incr' ? 1 : -1);
            }
        });

        // Add to cart buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                addToCart(btn.dataset.name, btn.dataset.price, btn.dataset.category);
            });
        });

        // Coupon apply
        if (couponApplyBtn) {
            couponApplyBtn.addEventListener('click', () => {
                const code = couponInput.value.trim().toUpperCase();
                if (!code) {
                    couponMsg.textContent = 'Digite um cupom.';
                    couponMsg.style.color = 'var(--color-accent)';
                    return;
                }

                if (validCoupons[code]) {
                    appliedCoupon = validCoupons[code];
                    couponMsg.textContent = `🎉 Cupom ${code} aplicado!`;
                    couponMsg.style.color = '#2d6a4f';
                    updateCartUI();
                } else {
                    appliedCoupon = null;
                    couponMsg.textContent = 'Cupom inválido ou expirado.';
                    couponMsg.style.color = 'var(--color-accent)';
                    updateCartUI();
                }
            });
        }

        // Checkout
        cartCheckoutBtn.addEventListener('click', () => {
            if (cart.length === 0) return;
            // Save cart to localStorage for checkout page
            localStorage.setItem('essentia_cart_checkout', JSON.stringify(cart));
            localStorage.setItem('essentia_coupon_checkout', JSON.stringify(appliedCoupon));
            window.location.href = 'checkout.html';
        });

        // Load saved cart
        loadCart();
        updateCartUI();
    }

    // ============================================ //
    // 8. WISHLIST / FAVORITOS                     //
    // ============================================ //

    const wishlistToggleBtn = document.getElementById('wishlistToggleBtn');
    const wishlistSidebar = document.getElementById('wishlistSidebar');
    const wishlistOverlay = document.getElementById('wishlistOverlay');
    const wishlistCloseBtn = document.getElementById('wishlistCloseBtn');
    const wishlistItems = document.getElementById('wishlistItems');
    const wishlistBadge = document.getElementById('wishlistBadge');
    const bottomNavWishlist = document.getElementById('bottomNavWishlist');

    let wishlist = [];

    function saveWishlist() {
        localStorage.setItem('essentia_wishlist', JSON.stringify(wishlist));
    }

    function loadWishlist() {
        const saved = localStorage.getItem('essentia_wishlist');
        if (saved) {
            try { wishlist = JSON.parse(saved); } catch { wishlist = []; }
        }
    }

    function updateWishlistUI() {
        wishlistBadge.textContent = wishlist.length;

        if (wishlist.length === 0) {
            wishlistItems.innerHTML = '<p class="wishlist-sidebar__empty">Nenhum favorito ainda. Clique no ♥ dos produtos para adicionar.</p>';
            return;
        }

        let html = '';
        wishlist.forEach((item, index) => {
            html += `
                <div class="wishlist-item" data-index="${index}">
                    <div class="wishlist-item__image">${item.icon || '👕'}</div>
                    <div class="wishlist-item__info">
                        <div class="wishlist-item__name">${item.name}</div>
                        <div class="wishlist-item__category">${item.category}</div>
                        <div class="wishlist-item__price">${formatPrice(item.price)}</div>
                    </div>
                    <div class="wishlist-item__actions">
                        <button class="wishlist-item__add-cart btn btn--primary" data-name="${item.name}" data-price="${item.price}" data-category="${item.category}">
                            Adicionar
                        </button>
                        <button class="wishlist-item__remove" data-index="${index}" aria-label="Remover ${item.name}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                    </div>
                </div>
            `;
        });

        wishlistItems.innerHTML = html;

        // Add to cart from wishlist
        wishlistItems.querySelectorAll('.wishlist-item__add-cart').forEach(btn => {
            btn.addEventListener('click', () => {
                addToCart(btn.dataset.name, btn.dataset.price, btn.dataset.category);
            });
        });

        // Remove from wishlist
        wishlistItems.querySelectorAll('.wishlist-item__remove').forEach(btn => {
            btn.addEventListener('click', () => {
                wishlist.splice(parseInt(btn.dataset.index), 1);
                updateWishlistUI();
                saveWishlist();
            });
        });

        saveWishlist();
    }

    function toggleWishlistItem(name, price, category, icon) {
        const existingIndex = wishlist.findIndex(item => item.name === name);
        if (existingIndex >= 0) {
            wishlist.splice(existingIndex, 1);
        } else {
            wishlist.push({ name, price: parseFloat(price), category, icon: icon || '👕' });
        }
        updateWishlistUI();
    }

    function openWishlist() {
        wishlistSidebar.classList.add('wishlist-sidebar--open');
        wishlistSidebar.setAttribute('aria-hidden', 'false');
        wishlistOverlay.classList.add('overlay--visible');
        wishlistOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeWishlist() {
        wishlistSidebar.classList.remove('wishlist-sidebar--open');
        wishlistSidebar.setAttribute('aria-hidden', 'true');
        wishlistOverlay.classList.remove('overlay--visible');
        wishlistOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (wishlistToggleBtn && wishlistSidebar && wishlistOverlay) {
        wishlistToggleBtn.addEventListener('click', () => {
            if (wishlistSidebar.classList.contains('wishlist-sidebar--open')) {
                closeWishlist();
            } else {
                openWishlist();
            }
        });

        wishlistCloseBtn.addEventListener('click', closeWishlist);
        wishlistOverlay.addEventListener('click', closeWishlist);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && wishlistSidebar.classList.contains('wishlist-sidebar--open')) {
                closeWishlist();
            }
        });

        // Bottom nav wishlist
        if (bottomNavWishlist) {
            bottomNavWishlist.addEventListener('click', openWishlist);
        }

        // Add wishlist buttons to product cards (heart icon)
        document.querySelectorAll('.produto-card').forEach(card => {
            const addBtn = card.querySelector('.add-to-cart-btn');
            if (!addBtn) return;

            const name = addBtn.dataset.name;
            const price = addBtn.dataset.price;
            const category = addBtn.dataset.category;

            const heartBtn = document.createElement('button');
            heartBtn.className = 'produto-card__wishlist-btn';
            heartBtn.setAttribute('aria-label', `Favoritar ${name}`);
            heartBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
            `;

            const imageContainer = card.querySelector('.produto-card__image');
            if (imageContainer) {
                imageContainer.appendChild(heartBtn);
            }

            heartBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const icon = card.querySelector('.produto-card__placeholder-icon')?.textContent || '👕';
                toggleWishlistItem(name, price, category, icon);
                heartBtn.classList.toggle('produto-card__wishlist-btn--active');

                if (heartBtn.classList.contains('produto-card__wishlist-btn--active')) {
                    // Micro feedback
                    heartBtn.style.transform = 'scale(1.3)';
                    setTimeout(() => { heartBtn.style.transform = 'scale(1)'; }, 200);
                }
            });

            // Check if already in wishlist
            loadWishlist();
            if (wishlist.some(w => w.name === name)) {
                heartBtn.classList.add('produto-card__wishlist-btn--active');
            }
        });

        loadWishlist();
        updateWishlistUI();
    }

    // ============================================ //
    // 9. SCROLL REVEAL (Intersection Observer)    //
    // ============================================ //

    const revealElements = document.querySelectorAll('[data-reveal]');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ============================================ //
    // 10. PROMO BAR — COUNTDOWN + CLOSE           //
    // ============================================ //

    const promoBar = document.getElementById('promoBar');
    const promoBarClose = document.getElementById('promoBarClose');
    const promoCountdown = document.getElementById('promoCountdown');

    if (promoBar) {
        // Check if closed before
        if (localStorage.getItem('essentia_promo_closed') === 'true') {
            promoBar.classList.add('promo-bar--hidden');
        }

        if (promoBarClose) {
            promoBarClose.addEventListener('click', () => {
                promoBar.classList.add('promo-bar--hidden');
                localStorage.setItem('essentia_promo_closed', 'true');
            });
        }

        // Countdown timer
        if (promoCountdown) {
            const endTime = new Date();
            endTime.setHours(23, 59, 59, 0);

            function updateCountdown() {
                const now = new Date();
                const diff = endTime - now;
                if (diff <= 0) {
                    promoCountdown.textContent = 'Promoção encerrada';
                    return;
                }
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                promoCountdown.textContent = `⏱ Encerra em ${hours}h ${minutes}m ${seconds}s`;
            }

            updateCountdown();
            setInterval(updateCountdown, 1000);
        }
    }

    // ============================================ //
    // 11. SOCIAL PROOF — NOTIFICAÇÕES             //
    // ============================================ //

    const socialProof = document.getElementById('socialProof');
    const socialProofText = document.getElementById('socialProofText');
    const socialProofAvatar = document.getElementById('socialProofAvatar');
    const socialProofTime = document.getElementById('socialProofTime');

    const socialProofNames = ['João', 'Maria', 'Pedro', 'Ana', 'Lucas', 'Rafa', 'Julia', 'Gabi', 'Bruno', 'Carla'];
    const socialProofProducts = [
        { name: 'Jaqueta Oversized', icon: 'J' },
        { name: 'Camiseta Algodão Orgânico', icon: 'C' },
        { name: 'Calça Cargo Baggy', icon: 'C' },
        { name: 'Corset Gótico', icon: 'C' },
        { name: 'Vestido Assimétrico', icon: 'V' },
        { name: 'Moletom Com Capuz', icon: 'M' },
        { name: 'Saia Plissada Preta', icon: 'S' },
    ];

    function showSocialProof() {
        const name = socialProofNames[Math.floor(Math.random() * socialProofNames.length)];
        const product = socialProofProducts[Math.floor(Math.random() * socialProofProducts.length)];
        const minutes = Math.floor(Math.random() * 15) + 1;

        socialProofAvatar.textContent = name.charAt(0);
        socialProofText.innerHTML = `<strong>${name}</strong> comprou <strong>${product.name}</strong>`;
        socialProofTime.textContent = `há ${minutes} minutos`;

        socialProof.classList.remove('social-proof--hidden');

        setTimeout(() => {
            socialProof.classList.add('social-proof--hidden');
        }, 5000);
    }

    if (socialProof) {
        // Show first after 8 seconds
        setTimeout(showSocialProof, 8000);

        // Then every 30-60 seconds
        setInterval(() => {
            if (Math.random() > 0.4) { // 60% chance
                showSocialProof();
            }
        }, 35000);
    }

    // ============================================ //
    // 12. BOTTOM NAVIGATION MOBILE                //
    // ============================================ //

    const bottomNav = document.getElementById('bottomNav');

    if (bottomNav) {
        // Bottom nav search
        const bottomNavSearch = document.getElementById('bottomNavSearch');
        if (bottomNavSearch) {
            bottomNavSearch.addEventListener('click', () => {
                openSearch();
            });
        }

        // Bottom nav cart
        const bottomNavCart = document.getElementById('bottomNavCart');
        if (bottomNavCart) {
            bottomNavCart.addEventListener('click', () => {
                openCart();
            });
        }

        // Bottom nav active state on scroll
        const bottomLinks = bottomNav.querySelectorAll('.bottom-nav__link');
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY + 100;
            let activeSection = 'home';

            document.querySelectorAll('section[id]').forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                if (scrollY >= top && scrollY < top + height) {
                    activeSection = section.getAttribute('id');
                }
            });

            bottomLinks.forEach(link => {
                const nav = link.dataset.nav;
                if (nav === 'home' && (activeSection === 'hero' || activeSection === 'propósito')) {
                    link.classList.add('bottom-nav__link--active');
                } else if (nav === activeSection) {
                    link.classList.add('bottom-nav__link--active');
                } else if (!['search', 'wishlist', 'cart'].includes(nav)) {
                    link.classList.remove('bottom-nav__link--active');
                }
            });
        });

        // Smooth scroll for bottom nav home link
        const homeLink = bottomNav.querySelector('[data-nav="home"]');
        if (homeLink) {
            homeLink.addEventListener('click', (e) => {
                e.preventDefault();
                document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
            });
        }
    }

    // ============================================ //
    // 13. CUSTOM ORDER — FORMULÁRIO               //
    // ============================================ //

    const customOrderForm = document.getElementById('customOrderForm');
    const customOrderMsg = document.getElementById('customOrderMsg');

    if (customOrderForm) {
        customOrderForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('customName').value.trim();
            const email = document.getElementById('customEmail').value.trim();
            const desc = document.getElementById('customDesc').value.trim();

            if (!name) {
                customOrderMsg.textContent = 'Por favor, informe seu nome.';
                customOrderMsg.className = 'custom-order__msg custom-order__msg--error';
                return;
            }

            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                customOrderMsg.textContent = 'Por favor, informe um e-mail válido.';
                customOrderMsg.className = 'custom-order__msg custom-order__msg--error';
                return;
            }

            if (!desc) {
                customOrderMsg.textContent = 'Por favor, descreva sua ideia para a peça.';
                customOrderMsg.className = 'custom-order__msg custom-order__msg--error';
                return;
            }

            customOrderMsg.textContent = 'Pedido enviado! Entraremos em contato em até 48 horas 🖤';
            customOrderMsg.className = 'custom-order__msg custom-order__msg--success';
            customOrderForm.reset();

            setTimeout(() => {
                customOrderMsg.textContent = '';
                customOrderMsg.className = 'custom-order__msg';
            }, 6000);
        });
    }

    // ============================================ //
    // 14. NEWSLETTER — VALIDAÇÃO                  //
    // ============================================ //

    const newsletterForm = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('emailInput');
    const newsletterError = document.getElementById('newsletterError');
    const newsletterSuccess = document.getElementById('newsletterSuccess');

    if (newsletterForm && emailInput) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        function showError(message) {
            newsletterError.textContent = message;
            emailInput.classList.add('error');
            newsletterSuccess.textContent = '';
        }

        function showSuccess(message) {
            newsletterSuccess.textContent = message;
            emailInput.classList.remove('error');
            newsletterError.textContent = '';
        }

        function clearMessages() {
            newsletterError.textContent = '';
            newsletterSuccess.textContent = '';
            emailInput.classList.remove('error');
        }

        emailInput.addEventListener('input', () => {
            if (emailInput.value.trim() !== '') clearMessages();
        });

        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = emailInput.value.trim();

            if (!email) {
                showError('Por favor, insira seu e-mail.');
                emailInput.focus();
                return;
            }

            if (!emailRegex.test(email)) {
                showError('E-mail inválido. Verifique o formato.');
                emailInput.focus();
                return;
            }

            showSuccess('Pronto! Agora você faz parte da comunidade Essentia 🖤');
            emailInput.value = '';
            emailInput.blur();
        });
    }

    // ============================================ //
    // 15. CHECKOUT — PÁGINA DEDICADA               //
    // ============================================ //

    const isCheckoutPage = document.location.pathname.includes('checkout.html');

    if (isCheckoutPage) {
        let checkoutCart = [];
        let checkoutCoupon = null;

        function loadCheckoutData() {
            const savedCart = localStorage.getItem('essentia_cart_checkout');
            const savedCoupon = localStorage.getItem('essentia_coupon_checkout');
            if (savedCart) { try { checkoutCart = JSON.parse(savedCart); } catch { checkoutCart = []; } }
            if (savedCoupon) { try { checkoutCoupon = JSON.parse(savedCoupon); } catch { checkoutCoupon = null; } }
        }

        const $ = (id) => document.getElementById(id);
        const summaryItems = $('checkoutSummaryItems');
        const summarySubtotal = $('checkoutSubtotal');
        const summaryDiscount = $('checkoutDiscount');
        const summaryDiscountRow = $('checkoutDiscountRow');
        const summaryShipping = $('checkoutShipping');
        const summaryTotal = $('checkoutTotal');
        const stepContents = { 1: $('checkoutStep1'), 2: $('checkoutStep2'), 3: $('checkoutStep3'), 4: $('checkoutStep4') };
        const stepElements = document.querySelectorAll('.checkout__step');
        const shippingRadios = document.querySelectorAll('input[name="shipping"]');
        const paymentRadios = document.querySelectorAll('input[name="payment"]');
        const creditCardForm = $('creditCardForm');
        const cardInstallments = $('cardInstallments');
        const checkoutReview = $('checkoutReview');
        const checkoutMsg = $('checkoutMsg');
        const finishBtn = $('checkoutFinishBtn');

        let currentStep = 1;
        let selectedShipping = 'express';
        let selectedPayment = 'credit';
        const shippingPrices = { express: 29.90, standard: 15.90, free: 0 };

        function getSubtotal() { return checkoutCart.reduce((s, i) => s + i.price * i.qty, 0); }
        function getDiscount(subtotal) {
            if (!checkoutCoupon) return 0;
            if (checkoutCoupon.type === 'percent') return subtotal * (checkoutCoupon.value / 100);
            if (checkoutCoupon.type === 'fixed') return Math.min(checkoutCoupon.value, subtotal);
            return 0;
        }
        function getShipping() { return (checkoutCoupon && checkoutCoupon.type === 'free_shipping') ? 0 : (shippingPrices[selectedShipping] || 0); }
        function getPixDisc(subtotal) { return selectedPayment === 'pix' ? subtotal * 0.05 : 0; }
        function getTotal(subtotal, disc, ship, pix) { return subtotal - disc - pix + ship; }

        function renderCheckoutSummary() {
            if (!summaryItems) return;
            const subtotal = getSubtotal();
            const discount = getDiscount(subtotal);
            const shipping = getShipping();
            const pixDisc = getPixDisc(subtotal);
            const total = getTotal(subtotal, discount, shipping, pixDisc);

            if (checkoutCart.length === 0) {
                summaryItems.innerHTML = '<p style="color: var(--color-text-muted); font-size: var(--text-sm);">Nenhum item no carrinho.</p>';
            } else {
                let html = '';
                checkoutCart.forEach(item => {
                    html += `<div class="checkout__summary-item"><span class="checkout__summary-item-qty">${item.qty}x</span><span class="checkout__summary-item-name">${item.name}</span><span class="checkout__summary-item-price">${formatPrice(item.price * item.qty)}</span></div>`;
                });
                summaryItems.innerHTML = html;
            }

            summarySubtotal.textContent = formatPrice(subtotal);
            if (discount > 0) { summaryDiscountRow.style.display = 'flex'; summaryDiscount.textContent = `- ${formatPrice(discount)}`; }
            else { summaryDiscountRow.style.display = 'none'; }

            let pixRow = $('checkoutPixDiscountRow');
            if (pixDisc > 0) {
                if (!pixRow) {
                    pixRow = document.createElement('div');
                    pixRow.className = 'checkout__summary-row';
                    pixRow.id = 'checkoutPixDiscountRow';
                    pixRow.style.color = '#2d6a4f';
                    pixRow.innerHTML = `<span>Desconto Pix (5%)</span><span id="checkoutPixDiscount">- ${formatPrice(pixDisc)}</span>`;
                    document.querySelector('.checkout__summary-total').parentNode.insertBefore(pixRow, document.querySelector('.checkout__summary-total'));
                } else { pixRow.style.display = 'flex'; $('checkoutPixDiscount').textContent = `- ${formatPrice(pixDisc)}`; }
            } else if (pixRow) { pixRow.style.display = 'none'; }

            summaryShipping.textContent = shipping === 0 ? 'Grátis' : formatPrice(shipping);
            summaryTotal.textContent = formatPrice(total);
            updateInstallments(total);
        }

        function updateInstallments(total) {
            if (!cardInstallments) return;
            cardInstallments.innerHTML = [1, 2, 3, 6, 12].map(n => `<option value="${n}">${n}x de ${formatPrice(n === 1 ? total : total / n)} (sem juros)</option>`).join('');
        }

        function goToStep(step) {
            if (step < 1 || step > 4) return;
            Object.keys(stepContents).forEach(k => { if (stepContents[k]) stepContents[k].style.display = 'none'; });
            if (stepContents[step]) stepContents[step].style.display = 'block';
            currentStep = step;
            stepElements.forEach(el => {
                const s = parseInt(el.dataset.step);
                el.classList.remove('checkout__step--active', 'checkout__step--completed');
                if (s === step) el.classList.add('checkout__step--active');
                else if (s < step) el.classList.add('checkout__step--completed');
            });
            if (step === 4) renderOrderReview();
            const formSection = document.querySelector('.checkout__form-section');
            if (formSection) formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        function validateAddressForm() {
            const required = ['addrName', 'addrPhone', 'addrCep', 'addrStreet', 'addrNumber', 'addrDistrict', 'addrCity', 'addrState'];
            for (const id of required) {
                const field = document.getElementById(id);
                if (!field || !field.value.trim()) {
                    if (field) { field.focus(); field.style.borderColor = 'var(--color-accent)'; setTimeout(() => field.style.borderColor = '', 2000); }
                    return false;
                }
            }
            return true;
        }

        function renderOrderReview() {
            if (!checkoutReview) return;
            const subtotal = getSubtotal(), discount = getDiscount(subtotal), shipping = getShipping(), pixDisc = getPixDisc(subtotal), total = getTotal(subtotal, discount, shipping, pixDisc);
            const addr = {
                name: $('addrName')?.value || '', phone: $('addrPhone')?.value || '',
                street: $('addrStreet')?.value || '', number: $('addrNumber')?.value || '',
                complement: $('addrComplement')?.value || '', district: $('addrDistrict')?.value || '',
                city: $('addrCity')?.value || '', state: $('addrState')?.value || '', cep: $('addrCep')?.value || ''
            };
            const shipLabels = { express: 'Expresso (1-3 dias úteis)', standard: 'Padrão (5-10 dias úteis)', free: 'Frete Grátis (10-15 dias úteis)' };
            const payLabels = { credit: 'Cartão de crédito', pix: 'Pix (5% desconto)', boleto: 'Boleto bancário' };

            checkoutReview.innerHTML = `
                <div class="checkout__review-section"><h3>📦 Endereço de entrega</h3><p>${addr.name} — ${addr.phone}</p><p>${addr.street}, ${addr.number}${addr.complement ? ', ' + addr.complement : ''}</p><p>${addr.district} — ${addr.city}, ${addr.state}</p><p>CEP: ${addr.cep}</p></div>
                <div class="checkout__review-section"><h3>🚚 Frete</h3><p>${shipLabels[selectedShipping] || selectedShipping}</p></div>
                <div class="checkout__review-section"><h3>💳 Pagamento</h3><p>${payLabels[selectedPayment] || selectedPayment}</p></div>
                <div class="checkout__review-section"><h3>🛒 Itens</h3>${checkoutCart.map(i => `<p>${i.qty}x ${i.name} — ${formatPrice(i.price * i.qty)}</p>`).join('')}</div>
                <div class="checkout__review-total">
                    <p>Subtotal: ${formatPrice(subtotal)}</p>${discount > 0 ? `<p style="color:#2d6a4f;">Desconto: - ${formatPrice(discount)}</p>` : ''}${pixDisc > 0 ? `<p style="color:#2d6a4f;">Desconto Pix: - ${formatPrice(pixDisc)}</p>` : ''}
                    <p>Frete: ${shipping === 0 ? 'Grátis' : formatPrice(shipping)}</p>
                    <p class="checkout__review-total-price">Total: ${formatPrice(total)}</p>
                </div>`;
        }

        function finalizePurchase() {
            const btn = finishBtn;
            if (btn) { btn.disabled = true; btn.textContent = 'Processando...'; }
            setTimeout(() => {
                checkoutMsg.className = 'checkout__msg checkout__msg--success';
                checkoutMsg.innerHTML = `<strong>🎉 Pedido confirmado!</strong><br />Seu pedido foi realizado com sucesso. Você receberá um e-mail com os detalhes.<br /><small>Nº do pedido: #ESS-${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}</small>`;
                if (btn) { btn.disabled = true; btn.textContent = '✅ Pedido Confirmado'; }
                ['essentia_cart_checkout', 'essentia_coupon_checkout', 'essentia_cart', 'essentia_coupon'].forEach(k => localStorage.removeItem(k));
                launchConfetti();
            }, 1500);
        }

        function launchConfetti() {
            const colors = ['#c44536', '#0d0d0d', '#f0a500', '#2d6a4f', '#ffffff'];
            for (let i = 0; i < 60; i++) {
                const piece = document.createElement('div');
                piece.className = 'confetti-piece';
                piece.style.cssText = `left:${Math.random()*100}vw;background:${colors[Math.floor(Math.random()*colors.length)]};width:${Math.random()*8+4}px;height:${Math.random()*8+4}px;border-radius:${Math.random()>0.5?'50%':'2px'};animation-duration:${Math.random()*2+2}s;animation-delay:${Math.random()*1.5}s;`;
                document.body.appendChild(piece);
                setTimeout(() => piece.remove(), 4000);
            }
        }

        // --- Initialize checkout ---
        loadCheckoutData();
        renderCheckoutSummary();

        document.querySelectorAll('.checkout__next-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const next = parseInt(btn.dataset.next);
                if (currentStep === 1 && next === 2) {
                    if (!validateAddressForm()) {
                        checkoutMsg.textContent = 'Preencha todos os campos obrigatórios (*) antes de continuar.';
                        checkoutMsg.className = 'checkout__msg checkout__msg--error';
                        setTimeout(() => { checkoutMsg.textContent = ''; checkoutMsg.className = 'checkout__msg'; }, 3000);
                        return;
                    }
                    checkoutMsg.textContent = '';
                    checkoutMsg.className = 'checkout__msg';
                }
                goToStep(next);
            });
        });

        document.querySelectorAll('.checkout__prev-btn').forEach(btn => {
            btn.addEventListener('click', () => goToStep(parseInt(btn.dataset.prev)));
        });

        shippingRadios.forEach(radio => {
            radio.addEventListener('change', () => { selectedShipping = radio.value; renderCheckoutSummary(); });
        });

        paymentRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                selectedPayment = radio.value;
                if (creditCardForm) creditCardForm.style.display = selectedPayment === 'credit' ? 'block' : 'none';
                renderCheckoutSummary();
            });
        });

        // Card formatting
        if ($('cardNumber')) $('cardNumber').addEventListener('input', (e) => { e.target.value = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim(); });
        if ($('cardExpiry')) $('cardExpiry').addEventListener('input', (e) => { let v = e.target.value.replace(/\D/g, ''); if (v.length > 2) v = v.slice(0,2) + '/' + v.slice(2,4); e.target.value = v; });
        if ($('cardCvv')) $('cardCvv').addEventListener('input', (e) => { e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4); });
        if (finishBtn) finishBtn.addEventListener('click', finalizePurchase);

        // Auto-format CEP and phone
        if ($('addrCep')) $('addrCep').addEventListener('input', (e) => { let v = e.target.value.replace(/\D/g, ''); if (v.length > 5) v = v.slice(0,5) + '-' + v.slice(5,8); e.target.value = v; });
        if ($('addrPhone')) $('addrPhone').addEventListener('input', (e) => { let v = e.target.value.replace(/\D/g, ''); if (v.length > 2) v = '(' + v.slice(0,2) + ') ' + v.slice(2); if (v.length > 10) v = v.slice(0,10) + '-' + v.slice(10,14); e.target.value = v; });

        console.log('✅ Checkout carregado —', checkoutCart.length, 'itens no pedido');
    }

});

