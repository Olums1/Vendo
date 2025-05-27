// Universal Order JS – dynamic and ready for injection!

function getParams() {
    const url = new URL(window.location.href);
    return Object.fromEntries(url.searchParams.entries());
}

document.addEventListener('DOMContentLoaded', function() {
  let params = getParams();

  if (params.name) {
    orderData.name = params.name;
    if(params.price) orderData.price = +params.price;
    if(params.img) orderData.img = params.img;
    if(params.desc) orderData.desc = params.desc;
  }

  let qty = 1;
  const qtyCount = document.getElementById('qtyCount');
  document.getElementById('qtyIncrease').onclick = () => {
    qty += 1; qtyCount.textContent = qty;
  };
  document.getElementById('qtyDecrease').onclick = () => {
    if (qty > 1) qty -= 1;
    qtyCount.textContent = qty;
  };

  function resetVendorListeners() {
    const vendorBtns = document.querySelectorAll('.select-vendor-btn');
    vendorBtns.forEach(btn => {
      btn.onclick = function() {
        vendorBtns.forEach(b=>b.classList.remove('selected'));
        btn.classList.add('selected');
      }
    });
  }

  document.querySelector('.add-cart-btn').onclick = function() {
    alert(`Added ${qty} to cart!`);
  };
  document.querySelector('.buy-now-btn').onclick = function() {
    alert(`Buying ${qty} now!`);
  };

  document.getElementById('orderProductName').textContent = orderData.name;
  document.getElementById('orderProductPrice').innerHTML = `&#8358;${orderData.price.toLocaleString()}`;
  document.getElementById('orderProductImage').src = orderData.img;
  document.getElementById('orderProductDesc').textContent = orderData.desc;

  let paramsDiv = document.querySelector('.order-params');
  if (paramsDiv && orderData.params) {
    paramsDiv.innerHTML = orderData.params.map(p=>`<div class='order-param'><span>${p.icon}</span> <small>${p.text}</small></div>`).join('');
  }

  let vbox = document.querySelector('.order-vendor-list');
  if (vbox) {
    vbox.innerHTML = orderData.vendors.map(v=>`
      <div class="order-vendor">
        <img src="${v.img}" alt="Vendor" class="order-vendor-img">
        <div class="order-vendor-details">
          <div class="vendor-name">${v.name}</div>
          <div class="vendor-rating"><span>${v.medals}</span> <span>${v.rating}</span> | <span>${v.fans}</span></div>
        </div>
        <button class="select-vendor-btn">Select</button>
      </div>`).join('');
    resetVendorListeners();
  }

  document.querySelector('.order-back').onclick = function() {
    history.length>1 ? history.back() : window.location = 'index.html';
  };
});
