const PRODUCTS = [
  {id:"hoodie",name:"Core Logo Hoodie",price:5499,category:"tops",description:"Black fleece • white chest print"},
  {id:"jesus_tee",name:"Jesus Changes Everything Tee",price:3299,category:"tops",description:"Black tee • bold faith message"},
  {id:"not_world",name:"Not of This World Tee",price:3499,category:"tops",description:"Oversized black tee • statement back print"},
  {id:"sweatpants",name:"Core Logo Sweatpants",price:4499,category:"bottoms",description:"Black relaxed jogger"},
  {id:"shorts",name:"Set Apart Training Shorts",price:2999,category:"bottoms",description:"Black athletic shorts"},
  {id:"crown_hat",name:"Core Logo Cap",price:2499,category:"accessories",description:"Black cap • front wordmark"},
  {id:"beanie",name:"Set Apart Beanie",price:2299,category:"accessories",description:"Black rib-knit beanie"},
  {id:"sneaker",name:"Set Apart Street Sneaker",price:6999,category:"footwear",description:"Black/white sneaker concept"}
];
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const money = (cents) => (cents/100).toLocaleString("en-US",{style:"currency",currency:"USD"});
let cart = {};
try { cart = JSON.parse(localStorage.getItem("setApartCart") || "{}") || {}; } catch { cart = {}; }
const totalCount = () => Object.values(cart).reduce((n,q)=>n+q,0);
const totalPrice = () => Object.entries(cart).reduce((n,[id,q])=>n+(PRODUCTS.find(p=>p.id===id)?.price||0)*q,0);
function saveCart(){try{localStorage.setItem("setApartCart",JSON.stringify(cart));}catch{} renderCart();}
function renderCart(){
  const count=totalCount();
  $("#cart-count").textContent=count; $("#cart-count-large").textContent=count;
  $("#cart-total").textContent=money(totalPrice());
  const items=$("#cart-items");
  const entries=Object.entries(cart).filter(([id,q])=>PRODUCTS.some(p=>p.id===id)&&q>0);
  if(!entries.length){items.innerHTML='<p class="empty-cart">Your bag is empty. Go find your piece.</p>';$("#checkout-button").disabled=true;$("#checkout-note").textContent="Orders open after products and fulfillment are verified.";return;}
  $("#checkout-button").disabled=true;
  $("#checkout-note").textContent="Orders open after products and fulfillment are verified.";
  items.innerHTML=entries.map(([id,q])=>{const p=PRODUCTS.find(x=>x.id===id);return '<div class="cart-line"><div><h3>'+p.name+'</h3><p>'+money(p.price)+' each</p><div class="qty-controls"><button data-qty="-1" data-id="'+id+'" aria-label="Remove one '+p.name+'">−</button><span>'+q+'</span><button data-qty="1" data-id="'+id+'" aria-label="Add one '+p.name+'">+</button></div></div><strong>'+money(p.price*q)+'</strong></div>';}).join("");
  items.querySelectorAll("[data-qty]").forEach(b=>b.addEventListener("click",()=>{const id=b.dataset.id;cart[id]=(cart[id]||0)+Number(b.dataset.qty);if(cart[id]<=0)delete cart[id];saveCart();}));
}
function toast(message){const t=$("#toast");t.textContent=message;t.classList.add("show");clearTimeout(window.__toastTimer);window.__toastTimer=setTimeout(()=>t.classList.remove("show"),2400);}
function openCart(){document.body.classList.add("cart-open");$("#cart-panel").setAttribute("aria-hidden","false");}
function closeCart(){document.body.classList.remove("cart-open");$("#cart-panel").setAttribute("aria-hidden","true");}
$$(".add-button").forEach(b=>b.addEventListener("click",()=>{cart[b.dataset.id]=(cart[b.dataset.id]||0)+1;saveCart();toast("Added to your bag.");}));
$("#cart-open").addEventListener("click",openCart);$("#cart-close").addEventListener("click",closeCart);$("#cart-backdrop").addEventListener("click",closeCart);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCart();});
$$(".filter").forEach(b=>b.addEventListener("click",()=>{$$(".filter").forEach(x=>x.classList.toggle("active",x===b));$$(".product-card").forEach(card=>{card.hidden=b.dataset.filter!=="all"&&card.dataset.category!==b.dataset.filter;});}));
$("#checkout-button").addEventListener("click",()=>{
  toast("Orders open after real products and fulfillment are verified.");
});
$("#newsletter-form").addEventListener("submit",e=>{e.preventDefault();$("#newsletter-message").textContent="Thanks! Email signup isn't connected yet, so no email was saved.";toast("Signup demo only — email service not connected.");});
$("#year").textContent=new Date().getFullYear();
const params=new URLSearchParams(location.search);
if(params.get("order")==="success"){cart={};saveCart();toast("Thanks for your order!");history.replaceState({}, "", location.pathname);}
else if(params.get("order")==="cancelled"){toast("Checkout canceled. Your bag is still here.");history.replaceState({}, "", location.pathname);}
renderCart();
