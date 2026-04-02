const TRANSLATIONS = {
    ua: { nav_catalog:"Каталог",nav_orders:"Мої замовлення",nav_login:"Увійти",nav_register:"Реєстрація",nav_logout:"Вийти",nav_hi:"Привіт,",hero_badge:"🌿 Офіційний партнер doTERRA",hero_title_1:"Природна",hero_title_2:"Сила Олій",hero_subtitle:"Сертифіковані чисті ефірні олії doTERRA для здоров'я, краси та гармонії вашої родини",hero_btn:"Обрати олії →",catalog_title:"Каталог олій doTERRA",search_placeholder:"Пошук олій...",cat_all:"Всі",in_stock:"в наявності",out_of_stock:"Немає в наявності",add_to_cart:"До кошика",added:"✓ Додано!",no_products:"Товари не знайдено",loading:"Завантаження...",cart_title:"Ваш кошик",cart_empty:"Кошик порожній 🌿",cart_total:"Разом:",checkout:"Оформити замовлення",order_success:"✅ Замовлення успішно оформлено!",order_fail:"Не вдалось оформити замовлення",orders_title:"Мої замовлення",orders_empty:"Замовлень ще немає",orders_loading:"Завантаження замовлень...",orders_fail:"Не вдалось завантажити замовлення",chat_title:"🌿 AI Консультант doTERRA",chat_welcome:"👋 Привіт! Я консультант з ефірних олій doTERRA. Запитайте мене про будь-яку олію!",chat_placeholder:"Запитайте про олії...",chat_send:"→",chat_error:"Вибачте, зараз не можу відповісти. Спробуйте пізніше.",login_title:"Вхід",login_btn:"Увійти",login_switch:"Немає акаунту?",login_switch_link:"Зареєструватись",login_error:"Невірний email або пароль",register_title:"Створити акаунт",register_btn:"Зареєструватись",register_switch:"Вже є акаунт?",register_switch_link:"Увійти",register_error:"Реєстрація не вдалась. Email вже використовується." },
    en: { nav_catalog:"Catalog",nav_orders:"My Orders",nav_login:"Login",nav_register:"Register",nav_logout:"Logout",nav_hi:"Hi,",hero_badge:"🌿 Official doTERRA Partner",hero_title_1:"Nature's",hero_title_2:"Pure Power",hero_subtitle:"Certified pure essential oils by doTERRA for health, beauty and harmony of your family",hero_btn:"Shop Oils →",catalog_title:"doTERRA Essential Oils",search_placeholder:"Search oils...",cat_all:"All",in_stock:"in stock",out_of_stock:"Out of stock",add_to_cart:"Add to Cart",added:"✓ Added!",no_products:"No products found",loading:"Loading...",cart_title:"Your Cart",cart_empty:"Your cart is empty 🌿",cart_total:"Total:",checkout:"Checkout",order_success:"✅ Order placed successfully!",order_fail:"Failed to place order",orders_title:"My Orders",orders_empty:"No orders yet",orders_loading:"Loading orders...",orders_fail:"Failed to load orders",chat_title:"🌿 doTERRA AI Consultant",chat_welcome:"👋 Hello! I'm your doTERRA essential oils consultant. Ask me anything about our oils!",chat_placeholder:"Ask about oils...",chat_send:"→",chat_error:"Sorry, I can't respond right now.",login_title:"Login",login_btn:"Login",login_switch:"No account?",login_switch_link:"Register",login_error:"Invalid email or password",register_title:"Create Account",register_btn:"Create Account",register_switch:"Already have an account?",register_switch_link:"Login",register_error:"Registration failed." },
    ru: { nav_catalog:"Каталог",nav_orders:"Мои заказы",nav_login:"Войти",nav_register:"Регистрация",nav_logout:"Выйти",nav_hi:"Привет,",hero_badge:"🌿 Официальный партнёр doTERRA",hero_title_1:"Природная",hero_title_2:"Сила Масел",hero_subtitle:"Сертифицированные чистые эфирные масла doTERRA для здоровья, красоты и гармонии вашей семьи",hero_btn:"Выбрать масла →",catalog_title:"Каталог масел doTERRA",search_placeholder:"Поиск масел...",cat_all:"Все",in_stock:"в наличии",out_of_stock:"Нет в наличии",add_to_cart:"В корзину",added:"✓ Добавлено!",no_products:"Товары не найдены",loading:"Загрузка...",cart_title:"Ваша корзина",cart_empty:"Корзина пуста 🌿",cart_total:"Итого:",checkout:"Оформить заказ",order_success:"✅ Заказ успешно оформлен!",order_fail:"Не удалось оформить заказ",orders_title:"Мои заказы",orders_empty:"Заказов пока нет",orders_loading:"Загрузка заказов...",orders_fail:"Не удалось загрузить заказы",chat_title:"🌿 ИИ Консультант doTERRA",chat_welcome:"👋 Привет! Я ваш консультант по эфирным маслам doTERRA. Спросите меня о любом масле!",chat_placeholder:"Спросите о маслах...",chat_send:"→",chat_error:"Извините, сейчас не могу ответить.",login_title:"Вход",login_btn:"Войти",login_switch:"Нет аккаунта?",login_switch_link:"Зарегистрироваться",login_error:"Неверный email или пароль",register_title:"Создать аккаунт",register_btn:"Зарегистрироваться",register_switch:"Уже есть аккаунт?",register_switch_link:"Войти",register_error:"Регистрация не удалась." },
    de: { nav_catalog:"Katalog",nav_orders:"Meine Bestellungen",nav_login:"Anmelden",nav_register:"Registrieren",nav_logout:"Abmelden",nav_hi:"Hallo,",hero_badge:"🌿 Offizieller doTERRA Partner",hero_title_1:"Natürliche",hero_title_2:"Ölkraft",hero_subtitle:"Zertifiziert reine ätherische Öle von doTERRA für Gesundheit, Schönheit und Harmonie Ihrer Familie",hero_btn:"Öle entdecken →",catalog_title:"doTERRA Ätherische Öle",search_placeholder:"Öle suchen...",cat_all:"Alle",in_stock:"auf Lager",out_of_stock:"Nicht verfügbar",add_to_cart:"In den Warenkorb",added:"✓ Hinzugefügt!",no_products:"Keine Produkte",loading:"Wird geladen...",cart_title:"Ihr Warenkorb",cart_empty:"Ihr Warenkorb ist leer 🌿",cart_total:"Gesamt:",checkout:"Zur Kasse",order_success:"✅ Bestellung erfolgreich!",order_fail:"Bestellung fehlgeschlagen",orders_title:"Meine Bestellungen",orders_empty:"Noch keine Bestellungen",orders_loading:"Bestellungen laden...",orders_fail:"Laden fehlgeschlagen",chat_title:"🌿 doTERRA KI-Beraterin",chat_welcome:"👋 Hallo! Ich bin Ihre doTERRA Ölberaterin. Fragen Sie mich zu jedem Öl!",chat_placeholder:"Fragen Sie zu Ölen...",chat_send:"→",chat_error:"Entschuldigung, ich kann gerade nicht antworten.",login_title:"Anmelden",login_btn:"Anmelden",login_switch:"Noch kein Konto?",login_switch_link:"Registrieren",login_error:"Ungültige E-Mail oder Passwort",register_title:"Konto erstellen",register_btn:"Konto erstellen",register_switch:"Bereits ein Konto?",register_switch_link:"Anmelden",register_error:"Registrierung fehlgeschlagen." }
};

let currentLang = localStorage.getItem('lang') || 'ua';
function t(key) { return TRANSLATIONS[currentLang][key] || TRANSLATIONS['ua'][key] || key; }

function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    applyTranslations();
    updateLangButtons();
    const welcome = document.querySelector('#chatMessages .chat-msg.bot');
    if (welcome) welcome.textContent = t('chat_welcome');
}

function updateLangButtons() {
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang===currentLang));
}

function applyTranslations() {
    const s = (id,txt) => { const el=document.getElementById(id); if(el) el.textContent=txt; };
    const a = (id,attr,val) => { const el=document.getElementById(id); if(el) el.setAttribute(attr,val); };
    s('navCatalog',t('nav_catalog')); s('navOrders',t('nav_orders'));
    s('navLogin',t('nav_login')); s('navRegister',t('nav_register')); s('navLogout',t('nav_logout'));
    s('heroBadge',t('hero_badge')); s('heroTitle1',t('hero_title_1')); s('heroTitle2',t('hero_title_2'));
    s('heroSubtitle',t('hero_subtitle')); s('heroBtn',t('hero_btn'));
    s('catalogTitle',t('catalog_title')); a('searchInput','placeholder',t('search_placeholder'));
    s('cartTitle',t('cart_title')); s('cartTotalLabel',t('cart_total')); s('checkoutBtn',t('checkout'));
    s('chatTitle',t('chat_title')); a('chatInput','placeholder',t('chat_placeholder')); s('chatSendBtn',t('chat_send'));
    s('loginTitle',t('login_title')); s('loginBtn',t('login_btn')); s('loginSwitch',t('login_switch')); s('loginSwitchLink',t('login_switch_link'));
    s('registerTitle',t('register_title')); s('registerBtn',t('register_btn')); s('registerSwitch',t('register_switch')); s('registerSwitchLink',t('register_switch_link'));
    s('ordersTitle',t('orders_title'));
    if(typeof updateCartUI==='function') updateCartUI();
    if(typeof allProducts!=='undefined'&&allProducts.length&&document.getElementById('catalogSection').style.display!=='none') {
        renderCategories(allProducts); renderProductsTranslated(allProducts);
    }
}

const EUR_RATE = 0.92;
function formatPrice(usd) { return '€' + (usd * EUR_RATE).toFixed(2); }

const langNames = { ua:'Ukrainian', en:'English', ru:'Russian', de:'German' };
const translationCache = { ua:{}, en:{}, ru:{}, de:{} };

async function translateProducts(products) {
    if (currentLang==='ua') return products;
    const toTranslate = products.filter(p => !translationCache[currentLang][p.name]);
    if (toTranslate.length > 0) {F
        const chunks = [];
        for (let i=0; i<toTranslate.length; i+=8) chunks.push(toTranslate.slice(i,i+8));
        for (const chunk of chunks) {
            const list = chunk.map((p,i) => `${i+1}. NAME: ${p.name} | DESC: ${p.description}`).join('\n');
            const prompt = `Translate ONLY the descriptions (not names) to ${langNames[currentLang]}. Return ONLY a JSON array, no other text:\n[{"name":"exact product name","desc":"translated description"},...]\n\nProducts:\n${list}`;
            try {
                const res = await fetch('/api/chat', {
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({message:prompt})
                });
                const data = await res.json();
                const match = data.reply.match(/\[[\s\S]*?\]/);
                if (match) {
                    const translated = JSON.parse(match[0]);
                    translated.forEach(item => {
                        if (item.name && item.desc) {
                            translationCache[currentLang][item.name] = item.desc;
                        }
                    });
                }
            } catch(e) { console.log('Translation error:', e); }
        }
    }
    return products.map(p => ({
        ...p,
        description: translationCache[currentLang][p.name] || p.description
    }));
}
