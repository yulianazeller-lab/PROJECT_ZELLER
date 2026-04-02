const API = '/api';
let token = localStorage.getItem('token');
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let allProducts = [];
let currentCategory = 'All';

document.addEventListener('DOMContentLoaded', () => {
    if (token) restoreSession();
    updateCartUI();
    updateLangButtons();
    applyTranslations();
});

function restoreSession() {
    const name = localStorage.getItem('userName');
    if (name) setLoggedIn(name);
}

async function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const errorEl = document.getElementById('loginError');
    try {
        const res = await fetch(`${API}/auth/login`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email,password}) });
        if (!res.ok) throw new Error(t('login_error'));
        const data = await res.json();
        token = data.token; localStorage.setItem('token',token); localStorage.setItem('userName',data.name);
        setLoggedIn(data.name); closeModal('loginModal'); errorEl.textContent='';
    } catch(e) { errorEl.textContent = e.message; }
}

async function register() {
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const errorEl = document.getElementById('regError');
    try {
        const res = await fetch(`${API}/auth/register`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({name,email,password}) });
        if (!res.ok) throw new Error(t('register_error'));
        const data = await res.json();
        token = data.token; localStorage.setItem('token',token); localStorage.setItem('userName',data.name);
        setLoggedIn(data.name); closeModal('registerModal'); errorEl.textContent='';
    } catch(e) { errorEl.textContent = e.message; }
}

function logout() {
    token=null; localStorage.removeItem('token'); localStorage.removeItem('userName');
    document.getElementById('authButtons').style.display='flex';
    document.getElementById('userInfo').style.display='none';
    document.getElementById('navOrders').style.display='none';
    showSection('hero');
}

function setLoggedIn(name) {
    document.getElementById('authButtons').style.display='none';
    document.getElementById('userInfo').style.display='flex';
    document.getElementById('userName').textContent=`${t('nav_hi')} ${name}!`;
    document.getElementById('navOrders').style.display='block';
}

function showSection(name) {
    document.getElementById('heroSection').style.display=name==='hero'?'flex':'none';
    document.getElementById('catalogSection').style.display=name==='catalog'?'block':'none';
    document.getElementById('ordersSection').style.display=name==='orders'?'block':'none';
    if(name==='catalog') loadProducts();
    if(name==='orders') loadOrders();
}

const OIL_STYLES = {
    'Lavender 15mL':         {emoji:'🌸',bg:'linear-gradient(160deg,#100820,#1e1038)',glow:'#a855f7'},
    'Lemon 15mL':            {emoji:'🍋',bg:'linear-gradient(160deg,#181000,#2a1c00)',glow:'#eab308'},
    'Peppermint 15mL':       {emoji:'🌿',bg:'linear-gradient(160deg,#041a0a,#082e12)',glow:'#22c55e'},
    'Frankincense 15mL':     {emoji:'🌳',bg:'linear-gradient(160deg,#180a00,#2e1400)',glow:'#c2661a'},
    'Tea Tree (Melaleuca) 15mL':{emoji:'🍃',bg:'linear-gradient(160deg,#041810,#082e1c)',glow:'#14b8a6'},
    'Wild Orange 15mL':      {emoji:'🍊',bg:'linear-gradient(160deg,#1a0800,#301400)',glow:'#f97316'},
    'Eucalyptus 15mL':       {emoji:'🌱',bg:'linear-gradient(160deg,#041c0c,#083018)',glow:'#16a34a'},
    'Ylang Ylang 15mL':      {emoji:'🌺',bg:'linear-gradient(160deg,#180018,#2e0030)',glow:'#ec4899'},
    'On Guard® Protective Blend 15mL':{emoji:'🛡️',bg:'linear-gradient(160deg,#1a0800,#2e1400)',glow:'#dc2626'},
    'Breathe® Respiratory Blend 15mL':{emoji:'💨',bg:'linear-gradient(160deg,#041420,#082438)',glow:'#3b82f6'},
    'DigestZen® Digestive Blend 15mL':{emoji:'🫧',bg:'linear-gradient(160deg,#041a0a,#082e12)',glow:'#10b981'},
    'Serenity® Restful Blend 15mL':   {emoji:'🌙',bg:'linear-gradient(160deg,#100820,#1a1030)',glow:'#8b5cf6'},
    'Balance® Grounding Blend 15mL':  {emoji:'⚖️',bg:'linear-gradient(160deg,#0a1008,#142010)',glow:'#84cc16'},
    "Beginner's Trio Kit":   {emoji:'🎁',bg:'linear-gradient(160deg,#100820,#1e1038)',glow:'#a855f7'},
    'Family Essentials Kit': {emoji:'👨‍👩‍👧‍👦',bg:'linear-gradient(160deg,#041a0a,#082e12)',glow:'#22c55e'},
    'Fractionated Coconut Oil 115mL':{emoji:'🥥',bg:'linear-gradient(160deg,#101010,#1e1e1e)',glow:'#d4d4d4'},
    'Petal Diffuser':        {emoji:'💧',bg:'linear-gradient(160deg,#041420,#082438)',glow:'#3b82f6'},
};

function getOilStyle(name) {
    return OIL_STYLES[name] || {emoji:'🫙',bg:'linear-gradient(160deg,#0d1410,#1a2a1c)',glow:'#4caf82'};
}

function renderOilCard(product, height='200px') {
    const s = getOilStyle(product.name);
    return `<div style="height:${height};background:${s.bg};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;position:relative;overflow:hidden;">
        <div style="position:absolute;width:120px;height:120px;border-radius:50%;background:${s.glow};filter:blur(35px);opacity:0.45;"></div>
        <div style="font-size:64px;position:relative;z-index:1;filter:drop-shadow(0 2px 8px rgba(0,0,0,0.5));">${s.emoji}</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.55);letter-spacing:0.08em;position:relative;z-index:1;">${product.category}</div>
    </div>`;
}

async function loadProducts() {
    try {
        const res = await fetch(`${API}/products`);
        allProducts = await res.json();
        renderCategories(allProducts);
        await renderProductsTranslated(allProducts);
    } catch(e) {
        document.getElementById('productsGrid').innerHTML=`<div class="no-products">${t('no_products')}</div>`;
    }
}

async function renderProductsTranslated(products) {
    const grid = document.getElementById('productsGrid');
    if (currentLang!=='ua') grid.innerHTML=`<div class="loading">🌿 ${t('loading')}</div>`;
    const translated = await translateProducts(products);
    renderProducts(translated);
}

function renderCategories(products) {
    const cats = [t('cat_all'), ...new Set(products.map(p=>p.category))];
    const activeLabel = currentCategory==='All'?t('cat_all'):currentCategory;
    document.getElementById('categoryFilters').innerHTML = cats.map(cat =>
        `<button class="cat-btn ${cat===activeLabel?'active':''}" onclick="filterCategory('${cat}')">${cat}</button>`
    ).join('');
}

async function filterCategory(cat) {
    const allLabel = t('cat_all');
    currentCategory = cat===allLabel?'All':cat;
    renderCategories(allProducts);
    const filtered = currentCategory==='All'?allProducts:allProducts.filter(p=>p.category===currentCategory);
    await renderProductsTranslated(filtered);
}

function searchProducts(query) {
    const filtered = allProducts.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        (p.description&&p.description.toLowerCase().includes(query.toLowerCase()))
    );
    renderProducts(filtered);
}

function renderProducts(products) {
    const grid = document.getElementById('productsGrid');
    window._productMap = {};
    products.forEach(p => window._productMap[p.id]=p);
    if (!products.length) { grid.innerHTML=`<div class="no-products">${t('no_products')}</div>`; return; }
    grid.innerHTML = products.map(p => `
        <div class="product-card" onclick="openProductModal(window._productMap[${p.id}])">
            ${renderOilCard(p)}
            <div class="product-info">
                <div class="product-category">${p.category}</div>
                <div class="product-name">${p.name}</div>
                <div class="product-desc">${p.description||''}</div>
                <div class="product-footer">
                    <div>
                        <div class="product-price">${formatPrice(parseFloat(p.price))}</div>
                        <div class="product-stock">${p.stock>0?`${p.stock} ${t('in_stock')}`:t('out_of_stock')}</div>
                    </div>
                    <button class="add-to-cart" onclick="event.stopPropagation();addToCart(${p.id},'${p.name.replace(/'/g,"\\'")}',${p.price})" ${p.stock===0?'disabled':''}>
                        ${t('add_to_cart')}
                    </button>
                </div>
            </div>
        </div>`
    ).join('');
}

let modalCurrentProduct = null;
function openProductModal(product) {
    modalCurrentProduct = product;
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductCategory').textContent = product.category;
    document.getElementById('modalProductDesc').textContent = product.description||'';
    document.getElementById('modalProductPrice').textContent = formatPrice(parseFloat(product.price));
    document.getElementById('modalProductStock').textContent = product.stock>0?`${product.stock} ${t('in_stock')}`:t('out_of_stock');
    document.getElementById('modalProductImg').innerHTML = renderOilCard(product, '260px');
    const btn = document.getElementById('modalAddToCart');
    btn.textContent = t('add_to_cart'); btn.disabled = product.stock===0;
    showModal('productModal');
}
function modalAddToCartClick() {
    if (!modalCurrentProduct) return;
    const p = modalCurrentProduct;
    const existing = cart.find(i=>i.id===p.id);
    if (existing) existing.quantity++;
    else cart.push({id:p.id,name:p.name,price:parseFloat(p.price),quantity:1});
    localStorage.setItem('cart',JSON.stringify(cart)); updateCartUI();
    const btn = document.getElementById('modalAddToCart');
    btn.textContent=t('added'); btn.style.background='#4ade80';
    setTimeout(()=>{btn.textContent=t('add_to_cart');btn.style.background='';},1200);
}

function addToCart(id,name,price) {
    const existing = cart.find(i=>i.id===id);
    if (existing) existing.quantity++;
    else cart.push({id,name,price:parseFloat(price),quantity:1});
    localStorage.setItem('cart',JSON.stringify(cart)); updateCartUI();
    const btn = event.target;
    btn.textContent=t('added'); btn.style.background='#4ade80';
    setTimeout(()=>{btn.textContent=t('add_to_cart');btn.style.background='';},1200);
}
function removeFromCart(id) { cart=cart.filter(i=>i.id!==id); localStorage.setItem('cart',JSON.stringify(cart)); updateCartUI(); }
function changeQty(id,delta) {
    const item=cart.find(i=>i.id===id);
    if(item){item.quantity+=delta; if(item.quantity<=0) removeFromCart(id); else{localStorage.setItem('cart',JSON.stringify(cart));updateCartUI();}}
}
function updateCartUI() {
    document.getElementById('cartCount').textContent=cart.reduce((s,i)=>s+i.quantity,0);
    const total=cart.reduce((s,i)=>s+i.price*i.quantity,0);
    document.getElementById('cartTotal').textContent=(total*EUR_RATE).toFixed(2);
    const container=document.getElementById('cartItems');
    if(!cart.length){container.innerHTML=`<div class="cart-empty">${t('cart_empty')}</div>`;return;}
    container.innerHTML=cart.map(item=>`
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${formatPrice(item.price*item.quantity)}</div>
            </div>
            <div class="cart-item-qty">
                <button class="qty-btn" onclick="changeQty(${item.id},-1)">−</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
            </div>
        </div>`).join('');
}
function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('open');
    document.getElementById('cartOverlay').classList.toggle('open');
}
async function checkout() {
    if(!token){toggleCart();showModal('loginModal');return;}
    if(!cart.length)return;
    try {
        const res=await fetch(`${API}/orders`,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},body:JSON.stringify({items:cart.map(i=>({productId:i.id,quantity:i.quantity}))})});
        if(!res.ok) throw new Error(t('order_fail'));
        cart=[]; localStorage.removeItem('cart'); updateCartUI(); toggleCart();
        showToast(t('order_success'),'success');
        try{const r=await fetch(`${API}/products`);allProducts=await r.json();renderCategories(allProducts);await renderProductsTranslated(allProducts);}catch(ex){}
    } catch(e){showToast(e.message,'error');}
}

async function loadOrders() {
    if(!token)return;
    const c=document.getElementById('ordersList');
    c.innerHTML=`<div class="loading">${t('orders_loading')}</div>`;
    try {
        const res=await fetch(`${API}/orders`,{headers:{'Authorization':`Bearer ${token}`}});
        const orders=await res.json();
        if(!orders.length){c.innerHTML=`<div class="loading">${t('orders_empty')}</div>`;return;}
        c.innerHTML=orders.map(o=>`
            <div class="order-card">
                <div class="order-header"><div class="order-id">Order #${o.id}</div><div class="order-status">${o.status}</div></div>
                ${o.items.map(i=>`<div class="order-item">• ${i.productName} × ${i.quantity} — ${formatPrice(parseFloat(i.price))}</div>`).join('')}
                <div class="order-total">Total: ${formatPrice(parseFloat(o.totalPrice))}</div>
            </div>`).join('');
    } catch(e){c.innerHTML=`<div class="loading">${t('orders_fail')}</div>`;}
}

function toggleChat() {
    const body=document.getElementById('chatBody');
    const icon=document.getElementById('chatToggleIcon');
    body.classList.toggle('open');
    icon.textContent=body.classList.contains('open')?'▼':'▲';
}
let chatHistory = [];

async function sendChat() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (!message) return;

    appendChatMsg(message, 'user');
    input.value = '';

    const typing = appendChatMsg('...', 'bot');

    try {
        const res = await fetch(`${API}/chat`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                message: message,
                history: chatHistory
            })
        });

        const data = await res.json();
        typing.textContent = data.reply;

        chatHistory.push({role: 'user', content: message});
        chatHistory.push({role: 'assistant', content: data.reply});

        if (chatHistory.length > 20) {
            chatHistory = chatHistory.slice(-20);
        }

    } catch(e) {
        typing.textContent = t('chat_error');
    }
}
function appendChatMsg(text,type) {
    const msgs=document.getElementById('chatMessages');
    const div=document.createElement('div');
    div.className=`chat-msg ${type}`; div.textContent=text;
    msgs.appendChild(div); msgs.scrollTop=msgs.scrollHeight;
    return div;
}

function showModal(id){document.getElementById(id).classList.add('open');}
function closeModal(id){document.getElementById(id).classList.remove('open');}
function switchModal(from,to){closeModal(from);showModal(to);}

function showToast(message,type='success') {
    const old=document.getElementById('toast');
    if(old)old.remove();
    const toast=document.createElement('div');
    toast.id='toast'; toast.textContent=message;
    toast.style.cssText=`position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:${type==='success'?'var(--accent)':'#e74c3c'};color:white;padding:1rem 2rem;border-radius:999px;font-size:0.95rem;font-weight:500;z-index:9999;box-shadow:0 8px 30px rgba(0,0,0,0.3);animation:toastIn 0.3s ease;`;
    document.body.appendChild(toast);
    setTimeout(()=>{toast.style.animation='toastOut 0.3s ease forwards';setTimeout(()=>toast.remove(),300);},3000);
}

document.addEventListener('DOMContentLoaded', () => {
    const welcome = document.getElementById('chatWelcome');
    if (welcome) welcome.textContent = t('chat_welcome');
});
