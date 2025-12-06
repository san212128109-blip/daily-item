// ----- Login Choice -----
const customerBtn = document.getElementById('customerBtn');
const adminBtn = document.getElementById('adminBtn');
const customerLogin = document.getElementById('customerLogin');
const adminLogin = document.getElementById('adminLogin');
const customerPage = document.getElementById('customerPage');
const adminPanel = document.getElementById('adminPanel');

customerBtn.onclick = ()=>{ customerLogin.style.display='block'; adminLogin.style.display='none'; }
adminBtn.onclick = ()=>{ adminLogin.style.display='block'; customerLogin.style.display='none'; }

// ----- Customer Login -----
const customerLoginBtn = document.getElementById('customerLoginBtn');
const customerPhone = document.getElementById('customerPhone');

customerLoginBtn.onclick = ()=>{
  if(customerPhone.value){
    localStorage.setItem('customerPhone', customerPhone.value);
    loadCustomerPage();
  } else alert("Enter phone number");
}

if(localStorage.getItem('customerPhone')){
  loadCustomerPage();
}

function loadCustomerPage(){
  customerLogin.style.display='none';
  customerPage.style.display='block';
  loadProducts();
  document.getElementById('paymentNumber').innerText = localStorage.getItem('paymentNumber') || 'Not set';
}

// ----- Admin Login -----
const adminLoginBtn = document.getElementById('adminLoginBtn');
adminLoginBtn.onclick = ()=>{
  const username = document.getElementById('adminUser').value;
  const password = document.getElementById('adminPass').value;
  if(username === "Daily" && password === "nafis128!@*"){
    adminLogin.style.display='none';
    adminPanel.style.display='block';
    loadAdminProducts();
  } else { alert("Wrong credentials"); }
}

// ----- Products -----
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

// ----- Search -----
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

// ----- Admin Panel -----
const savePayment = document.getElementById('savePayment');
const adminPayment = document.getElementById('adminPayment');
const addProductBtn = document.getElementById('addProductBtn');
const adminProducts = document.getElementById('adminProducts');

if(!localStorage.getItem('products')) localStorage.setItem('products', JSON.stringify([]));

savePayment.onclick = ()=>{
  const val = adminPayment.value.trim();
  if(val){ localStorage.setItem('paymentNumber', val); alert("Saved!"); } 
  else alert("Enter number");
}

addProductBtn.onclick = ()=>{
  const name = document.getElementById('prodName').value;
  const price = document.getElementById('prodPrice').value;
  const image = document.getElementById('prodImage').value;
  const category = document.getElementById('prodCategory').value;
  if(name && price && category){
    let prods = JSON.parse(localStorage.getItem('products')) || [];
    prods.push({name, price, image, category});
    localStorage.setItem('products', JSON.stringify(prods));
    loadAdminProducts();
    alert("Product added!");
  } else alert("Fill all fields");
}

function loadAdminProducts(){
  const prods = JSON.parse(localStorage.getItem('products')) || [];
  adminProducts.innerHTML='';
  prods.forEach((p,i)=>{
    adminProducts.innerHTML += `<div class="productCard">
      <img src="${p.image}" width="100"><br>
      <b>${p.name}</b> - ৳${p.price}<br>
      Category: ${p.category}
      <button onclick="deleteProduct(${i})">Delete</button>
    </div>`;
  });
}

window.deleteProduct = function(i){
  let prods = JSON.parse(localStorage.getItem('products'));
  prods.splice(i,1);
  localStorage.setItem('products', JSON.stringify(prods));
  loadAdminProducts();
}
