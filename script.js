// --------- Login Choice ----------
const customerBtn = document.getElementById('customerBtn');
const adminBtn = document.getElementById('adminBtn');
const customerLogin = document.getElementById('customerLogin');
const adminLogin = document.getElementById('adminLogin');
const customerPage = document.getElementById('customerPage');

customerBtn.onclick = ()=>{ customerLogin.style.display='block'; adminLogin.style.display='none'; }
adminBtn.onclick = ()=>{ adminLogin.style.display='block'; customerLogin.style.display='none'; }

// --------- Customer Login ----------
const customerLoginBtn = document.getElementById('customerLoginBtn');
const customerPhone = document.getElementById('customerPhone');

customerLoginBtn.onclick = ()=>{
  if(customerPhone.value){
    localStorage.setItem('customerPhone', customerPhone.value);
    loadCustomerPage();
  } else { alert("Enter phone number"); }
}

// Auto login if already logged in
if(localStorage.getItem('customerPhone')){
  loadCustomerPage();
}

function loadCustomerPage(){
  customerLogin.style.display='none';
  customerPage.style.display='block';
  loadProducts();
  document.getElementById('paymentNumber').innerText = localStorage.getItem('paymentNumber') || 'Not set';
}

// --------- Products ----------
let products = JSON.parse(localStorage.getItem('products')) || [];

function loadProducts(){
  const list = document.getElementById('productsList');
  list.innerHTML='';
  products.forEach((p,i)=>{
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
