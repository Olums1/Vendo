// Upload product form page script

document.addEventListener('DOMContentLoaded', function(){
    // Back arrow functionality
    var backBtn = document.querySelector('.back-arrow-btn');
    if (backBtn) {
      backBtn.addEventListener('click', function(){
        window.history.back();
      });
    }
    const uploadForm = document.getElementById('uploadProductForm');
    const productImage = document.getElementById('productImage');
    const imgPreview = document.getElementById('imgPreview');
    const nameInput = document.getElementById('productName');
    const priceInput = document.getElementById('productPrice');
    const categoryInput = document.getElementById('productCategory');
    const descInput = document.getElementById('productDescription');
    // Error spans
    const imageError = document.getElementById('imageError');
    const nameError = document.getElementById('nameError');
    const priceError = document.getElementById('priceError');
    const categoryError = document.getElementById('categoryError');
    const descError = document.getElementById('descError');
    let imageDataUrl = '';

    if(productImage){
      productImage.addEventListener('change',function(){
          if (this.files && this.files[0]) {
              const f = this.files[0];
              const reader = new FileReader();
              reader.onload = function(e){
                  imgPreview.src=e.target.result;
                  imgPreview.style.display='block';
                  imageDataUrl = e.target.result;
              };
              reader.readAsDataURL(f);
              imageError.textContent='';
          }
      });
    }
    if(uploadForm){
      uploadForm.addEventListener('submit',function(e){
          e.preventDefault();
          let valid = true;
          // Validate all fields
          if (!imageDataUrl) {
              imageError.textContent='Product photo required.';valid = false;
          } else { imageError.textContent=''; }
          if (!nameInput.value || nameInput.value.trim().length<3) {
              nameError.textContent='Name must be at least 3 chars.';valid = false;
          } else { nameError.textContent = ''; }
          if (!priceInput.value || isNaN(priceInput.value) || +priceInput.value<0) {
              priceError.textContent='Enter a valid price.';valid = false;
          } else { priceError.textContent = ''; }
          if (!categoryInput.value) {
              categoryError.textContent='Pick a category.';valid = false;
          } else { categoryError.textContent = ''; }
          if (!descInput.value || descInput.value.trim().length<10) {
              descError.textContent='Description must be at least 10 chars.';valid = false;
          } else { descError.textContent = ''; }
          if (!valid) return;
          // Save product to localStorage
          let products = [];
          try { products = JSON.parse(localStorage.getItem('vendorProducts')||'[]'); } catch { products=[]; }
          products.push({
              image: imageDataUrl,
              name: nameInput.value.trim(),
              price: Number(priceInput.value),
              category: categoryInput.value,
              description: descInput.value.trim()
          });
          localStorage.setItem('vendorProducts', JSON.stringify(products));
          alert('Product uploaded successfully!');
          window.location.href='index.html';
          setTimeout(function(){ if(window.refreshVendorProducts) window.refreshVendorProducts(); },300);
      });
    }
  });
