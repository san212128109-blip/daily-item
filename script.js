// --------- Slider ----------
let sliderImages = [
  "https://via.placeholder.com/1200x300?text=Banner+1",
  "https://via.placeholder.com/1200x300?text=Banner+2",
  "https://via.placeholder.com/1200x300?text=Banner+3"
];
let sliderIndex=0;
setInterval(()=>{
  document.getElementById('sliderImg').src = sliderImages[sliderIndex];
  sliderIndex = (sliderIndex+1) % sliderImages.length;
},3000);

// --------- Customer Login ----------
const customerLoginBtnHeader = document.getElementById('customerLoginBtnHeader');
const modal = document.getElementById('customerLoginModal');
const closeModal = document.querySelector('.close');
const customerLoginSubmit = document.getElementById('customerLoginSubmit');
const customerPhoneInput = document.getElementById('customerPhone');

customerLoginBtnHeader.onclick = ()=>{ modal.style.display='block'; }
closeModal.onclick = ()=>{ modal.style.display='none'; }

customerLoginSubmit.onclick = ()=>{
  if(customerPhoneInput.value){
    localStorage.setItem('customerPhone', customerPhoneInput.value);
    modal.style.display='none';
    loadProducts();
  } else alert("Enter phone number");
}

// Auto login
if(localStorage.getItem('customerPhone')){
  loadProducts();
}

// --------- Products ----------
let products = JSON.parse(localStorage.getItem('products')) || [];

function loadProducts(filterCategory){
  const list = document.getElementById('productsList');
  list.innerHTML='';
  let filtered = products;
  if(filterCategory) filtered = products.filter(p=>p.category===filterCategory);
  filtered.forEach(p=>{
    list.innerHTML += `<div class="productCard">
      <img src="${p.image}" width="100"><br>
      <b>${p.name}</b> - ৳${p.price}<br>
      Category: ${p.category}
    </div>`;
  });
}

// --------- Search ----------
document.getElementById('searchInput').addEventListener('input', function(){
  const val = this.value.toLowerCase();
  const filtered = products.filter(p=>p.name.toLowerCase().includes(val) || p.category.toLowerCase().includes(val));
  const list = document.getElementById('productsList');
  list.innerHTML='';
  filtered.forEach(p=>{
    list.innerHTML += `<div class="productCard">
      <img src="${p.image}" width="100"><br>
      <b>${p.name}</b> - ৳${p.price}<br>
      Category: ${p.category}
    </div>`;
  });
});

// --------- Category Filter ----------
document.querySelectorAll('.category-card').forEach(card=>{
  card.onclick = ()=> loadProducts(card.getAttribute('data-category'));
});

// --------- Payment Number ----------
document.getElementById('paymentNumber').innerText = localStorage.getItem('paymentNumber') || 'Not set';
