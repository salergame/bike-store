// Создание кастомного курсора
const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

const cursorFollower = document.createElement('div');
cursorFollower.className = 'cursor-follower';
document.body.appendChild(cursorFollower);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

// Плавная анимация курсора
function animateCursor() {
    // Плавное движение основного курсора
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    // Плавное движение следящего курсора
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';

    requestAnimationFrame(animateCursor);
}

// Обновление позиции курсора
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Эффект увеличения курсора при наведении на интерактивные элементы
const interactiveElements = document.querySelectorAll('a, button, input, textarea');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
        cursorFollower.style.borderColor = 'var(--accent-color)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
        cursorFollower.style.borderColor = 'var(--primary-color)';
    });
});

// Запуск анимации курсора
animateCursor();

// Данные для каталога велосипедов
const bikes = [
    {
        id: 1,
        name: 'Mountain Pro X1',
        price: '45 000 ₽',
        type: 'Горный',
        weight: '12.5 кг',
        gears: '24 скорости',
        wheelSize: '29"',
        image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: 'Профессиональный горный велосипед с улучшенной подвеской и надежными дисковыми тормозами.'
    },
    {
        id: 2,
        name: 'City Cruiser',
        price: '35 000 ₽',
        image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: 'Комфортный городской велосипед'
    },
    {
        id: 3,
        name: 'Street Racer',
        price: '55 000 ₽',
        type: 'Спортивный',
        weight: '8.5 кг',
        gears: '21 скорость',
        wheelSize: '28"',
        image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        description: 'Спортивный велосипед для города'
    },
    {
        id: 4,
        name: 'Electric Pro',
        price: '85 000 ₽',
        image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        description: 'Современный электровелосипед'
    }
];

// Функция для открытия модального окна
function openModal(bike) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${bike.name}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="modal-image">
                    <img src="${bike.image}" alt="${bike.name}">
                </div>
                <div class="modal-info">
                    <div class="bike-specs">
                        <div class="spec-item">
                            <i class="fas fa-bicycle"></i>
                            <span>Тип: ${bike.type}</span>
                        </div>
                        <div class="spec-item">
                            <i class="fas fa-weight"></i>
                            <span>Вес: ${bike.weight}</span>
                        </div>
                        <div class="spec-item">
                            <i class="fas fa-cog"></i>
                            <span>Передачи: ${bike.gears}</span>
                        </div>
                        <div class="spec-item">
                            <i class="fas fa-tachometer-alt"></i>
                            <span>Размер колес: ${bike.wheelSize}</span>
                        </div>
                    </div>
                    <p>${bike.description}</p>
                    <div class="modal-price">${bike.price}</div>
                    <div class="modal-buttons">
                        <button class="modal-button buy-now">Купить сейчас</button>
                        <button class="modal-button add-to-cart">В корзину</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    
    // Анимация появления
    setTimeout(() => modal.classList.add('active'), 10);

    // Обработчики закрытия
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => closeModal(modal));
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
    });

    // В функции openModal обновляем обработчик кнопки "В корзину"
    const addToCartBtn = modal.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', () => {
        addToCart(bike);
        closeModal(modal);
    });
}

// Функция закрытия модального окна
function closeModal(modal) {
    modal.classList.remove('active');
    setTimeout(() => modal.remove(), 300);
}

// Обновляем функцию создания карточек
function createBikeCards() {
    const catalogGrid = document.querySelector('.catalog-grid');
    
    bikes.forEach(bike => {
        const card = document.createElement('div');
        card.className = 'bike-card';
        card.innerHTML = `
            <div class="bike-image">
                <img src="${bike.image}" alt="${bike.name}">
            </div>
            <h3>${bike.name}</h3>
            <div class="bike-specs">
                ${bike.type ? `<span class="bike-spec active">${bike.type}</span>` : ''}
                ${bike.wheelSize ? `<span class="bike-spec">${bike.wheelSize}</span>` : ''}
            </div>
            <div class="bike-price">${bike.price}</div>
            <div class="bike-buttons">
                <button class="bike-button cart">В корзину</button>
                <button class="bike-button details">Характеристики</button>
            </div>
        `;
        
        // Обработчики кнопок
        const cartButton = card.querySelector('.bike-button.cart');
        const detailsButton = card.querySelector('.bike-button.details');
        
        cartButton.addEventListener('click', (e) => {
            e.stopPropagation();
            addToCart(bike);
        });
        
        detailsButton.addEventListener('click', (e) => {
            e.stopPropagation();
            openModal(bike);
        });
        
        catalogGrid.appendChild(card);
    });
}

// Функция для показа формы заказа
function showOrderForm(bikeId) {
    const bike = bikes.find(b => b.id === bikeId);
    const form = document.createElement('div');
    form.className = 'order-form-overlay';
    form.innerHTML = `
        <div class="order-form">
            <h3>Заказ велосипеда ${bike.name}</h3>
            <form id="orderForm">
                <input type="text" placeholder="Ваше имя" required>
                <input type="tel" placeholder="Телефон" required>
                <input type="email" placeholder="Email" required>
                <textarea placeholder="Комментарий"></textarea>
                <div class="form-buttons">
                    <button type="submit" class="submit-button">Отправить заказ</button>
                    <button type="button" class="cancel-button" onclick="this.closest('.order-form-overlay').remove()">Отмена</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(form);

    // Обработка отправки формы
    form.querySelector('#orderForm').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Спасибо за заказ! Мы свяжемся с вами в ближайшее время.');
        form.remove();
    });
}

// Плавная прокрутка к секциям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Анимация появления элементов при прокрутке
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .about-content, .contacts-content, .bike-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Изменяем функцию parallaxEffect, чтобы убрать линии
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.backgroundPositionY = scrolled * speed + 'px';
    });
}

// Добавляем функцию для управления чатом
function initializeChat() {
    const floatingChat = document.querySelector('.floating-chat');
    if (!floatingChat) return; // Проверяем наличие элемента

    const chatToggle = floatingChat.querySelector('.chat-toggle');
    if (!chatToggle) return;

    // Обработчик клика по кнопке чата
    chatToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        floatingChat.classList.toggle('active');
        console.log('Кнопка чата нажата');
    });

    // Закрытие при клике вне кнопки
    document.addEventListener('click', (e) => {
        if (!floatingChat.contains(e.target)) {
            floatingChat.classList.remove('active');
        }
    });

    // Предотвращаем закрытие при клике на кнопки соцсетей
    const chatButtons = floatingChat.querySelectorAll('.chat-button');
    chatButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
}

// Добавляем функцию фильтрации
function filterBikes() {
    // Заглушка для функции фильтрации
    console.log('Фильтрация...');
}

// Добавляем функцию для управления видимостью навбара при прокрутке
let lastScrollTop = 0;

function handleNavbarVisibility() {
    const navbar = document.querySelector('.main-nav');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Показываем навбар при прокрутке вверх и скрываем при прокрутке вниз
    if (scrollTop > lastScrollTop && scrollTop > 70) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }

    lastScrollTop = scrollTop;
}

// Добавляем функцию для управления корзиной
function initializeCart() {
    // Создаем HTML для модального окна корзины
    const cartModal = document.createElement('div');
    cartModal.className = 'cart-modal';
    cartModal.innerHTML = `
        <div class="cart-header">
            <h3>Корзина</h3>
            <button class="cart-close">&times;</button>
        </div>
        <div class="cart-items">
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Ваша корзина пуста</p>
            </div>
        </div>
        <div class="cart-footer">
            <div class="cart-total">
                <span>Итого:</span>
                <span class="cart-total-price">0 ₽</span>
            </div>
            <button class="checkout-button">Оформить заказ</button>
        </div>
    `;

    // Создаем оверлей для корзины
    const cartOverlay = document.createElement('div');
    cartOverlay.className = 'cart-overlay';

    // Добавляем элементы на страницу
    document.body.appendChild(cartOverlay);
    document.body.appendChild(cartModal);

    // Обработчики событий
    const cartButton = document.querySelector('.cart-button');
    const closeButton = cartModal.querySelector('.cart-close');

    function openCart() {
        cartModal.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeCart() {
        cartModal.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    cartButton.addEventListener('click', openCart);
    closeButton.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    // Функция для добавления товара в корзину
    window.addToCart = function(bike) {
        const cartItems = cartModal.querySelector('.cart-items');
        const emptyCart = cartItems.querySelector('.empty-cart');
        if (emptyCart) {
            cartItems.innerHTML = '';
        }

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${bike.image}" alt="${bike.name}">
            <div class="cart-item-info">
                <h4 class="cart-item-title">${bike.name}</h4>
                <div class="cart-item-price">${bike.price}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus">-</button>
                    <span>1</span>
                    <button class="quantity-btn plus">+</button>
                </div>
            </div>
            <button class="cart-item-remove">
                <i class="fas fa-trash"></i>
            </button>
        `;

        cartItems.appendChild(cartItem);
        updateCartCount();
        updateCartTotal();
    };
}

// Функция обновления счетчика товаров в корзине
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.querySelectorAll('.cart-item');
    cartCount.textContent = cartItems.length;
}

// Функция обновления общей стоимости
function updateCartTotal() {
    const cartItems = document.querySelectorAll('.cart-item');
    let total = 0;
    
    cartItems.forEach(item => {
        const priceText = item.querySelector('.cart-item-price').textContent;
        const quantity = parseInt(item.querySelector('.cart-item-quantity span').textContent);
        const price = parseInt(priceText.replace(/[^\d]/g, ''));
        total += price * quantity;
    });

    const cartTotal = document.querySelector('.cart-total-price');
    cartTotal.textContent = total.toLocaleString() + ' ₽';
}

// Добавить в функцию initializeNavigation или в DOMContentLoaded
function initializeMobileMenu() {
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (!burgerMenu || !navLinks) return;

    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Закрытие меню при клике вне его
    document.addEventListener('click', (e) => {
        if (!burgerMenu.contains(e.target) && !navLinks.contains(e.target)) {
            burgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// Изменяем инициализацию
document.addEventListener('DOMContentLoaded', () => {
    createBikeCards();
    window.addEventListener('scroll', () => {
        animateOnScroll();
        parallaxEffect();
    });
    
    // Добавляем стили для анимации
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .about-content, .contacts-content, .bike-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s, transform 0.5s;
        }
        .bike-card {
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            transition: all 0.3s;
        }
        .bike-card:hover {
            transform: translateY(-10px) scale(1.02);
        }
        .bike-image {
            position: relative;
            overflow: hidden;
        }
        .bike-image img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            transition: transform 0.3s;
        }
        .bike-card:hover .bike-image img {
            transform: scale(1.1);
        }
        .bike-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.3s;
        }
        .bike-card:hover .bike-overlay {
            opacity: 1;
        }
        .view-details {
            background: transparent;
            color: white;
            border: 2px solid white;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s;
            font-family: var(--graffiti-font);
        }
        .view-details:hover {
            background: white;
            color: var(--primary-color);
        }
        .bike-card h3 {
            padding: 15px;
            margin: 0;
            font-family: var(--graffiti-font);
        }
        .bike-card p {
            padding: 0 15px;
            color: #666;
        }
        .bike-card .price {
            padding: 15px;
            font-weight: bold;
            color: var(--primary-color);
            font-family: var(--graffiti-font);
        }
        .bike-card .buy-button {
            margin: 15px;
            padding: 10px 20px;
            background: transparent;
            color: var(--primary-color);
            border: 2px solid var(--primary-color);
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s;
            font-family: var(--graffiti-font);
        }
        .bike-card .buy-button:hover {
            background: var(--primary-color);
            color: white;
        }
        .order-form-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s;
        }
        .order-form-overlay.active {
            opacity: 1;
        }
        .order-form {
            background: white;
            padding: 30px;
            border-radius: 10px;
            width: 90%;
            max-width: 500px;
            transform: translateY(20px);
            opacity: 0;
            transition: all 0.3s;
        }
        .order-form-overlay.active .order-form {
            transform: translateY(0);
            opacity: 1;
        }
        .form-buttons {
            display: flex;
            gap: 10px;
            margin-top: 20px;
        }
        .cancel-button {
            background: transparent;
            color: #666;
            border: 2px solid #666;
            padding: 15px;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s;
            font-family: var(--graffiti-font);
        }
        .cancel-button:hover {
            background: #666;
            color: white;
        }
    `;
    document.head.appendChild(style);
    
    // Добавляем стили для исправления линий в шапке
    const fixStyle = document.createElement('style');
    fixStyle.textContent = `
        .header {
            border-bottom: none !important;
            overflow: visible !important;
        }
        .header::before {
            display: none;
        }
        .header-top {
            border-bottom: none !important;
            box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
        }
        .header-top::after {
            display: none;
        }
    `;
    document.head.appendChild(fixStyle);

    // Удаляем предыдущие слушатели событий и добавляем новый для кнопки
    document.getElementById('applyFilters').addEventListener('click', filterBikes);

    // Добавляем обработку Enter для поля поиска
    document.getElementById('searchBikes').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            filterBikes();
        }
    });

    // Инициализируем чат
    initializeChat();

    // Добавляем обработчик прокрутки для навбара
    window.addEventListener('scroll', handleNavbarVisibility);

    // Обработчик для кнопки корзины
    const cartButton = document.querySelector('.cart-button');
    cartButton.addEventListener('click', () => {
        // Здесь можно добавить логику открытия корзины
        console.log('Корзина открыта');
    });

    // Добавляем инициализацию корзины
    initializeCart();

    // Добавляем инициализацию мобильного меню
    initializeMobileMenu();
}); 