document.addEventListener('DOMContentLoaded', () => {
    initProducts();
    initFilters();
    initSidebarToggle(); // Sidebar toggle functionality for mobile
    initSidebar(); // Ensure sidebar links are initialized
    initCollapsibleSearch();
    initAnimation();
});

function initSidebarToggle() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const body = document.body;

    function openSidebar() {
        if (sidebar) sidebar.classList.add('open');
        if (overlay) overlay.classList.add('active');
        body.style.overflow = 'hidden'; // prevent scrolling
    }

    function closeSidebar() {
        if (sidebar) sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        body.style.overflow = '';
    }

    if (sidebarToggle && sidebar && overlay) {
        sidebarToggle.addEventListener('click', openSidebar);
        overlay.addEventListener('click', closeSidebar);
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeSidebar();
            }
        });
    }
    window.closeSidebar = closeSidebar;
}


// Initialize product cards with interaction and order drawer
function initProducts() {
    const productCards = document.querySelectorAll('.product-card');

    // --- Drawer DOM inject ---
    if (!document.querySelector('.order-drawer-backdrop')) {
        const drawerBackdrop = document.createElement('div');
        drawerBackdrop.className = 'order-drawer-backdrop';
        drawerBackdrop.style.display = 'none';
        drawerBackdrop.innerHTML = `<div class="order-drawer" tabindex="-1">
          <div class="order-drawer-header">
            <h3>Order</h3>
            <button class="order-drawer-close" aria-label="Close">&times;</button>
          </div>
          <div class="order-drawer-content"></div>
        </div>`;
        document.body.appendChild(drawerBackdrop);
        // Event for backdrop and close button
        drawerBackdrop.addEventListener('click', function(e) {
          if (e.target === drawerBackdrop) hideDrawer();
        });
        drawerBackdrop.querySelector('.order-drawer-close').onclick = hideDrawer;
    }
    const drawerBackdrop = document.querySelector('.order-drawer-backdrop');
    const drawerElem = drawerBackdrop.querySelector('.order-drawer');
    const drawerContent = drawerElem.querySelector('.order-drawer-content');

    function showDrawer(html) {
        drawerContent.innerHTML = html;
        drawerBackdrop.style.display = 'block';
        setTimeout(() => {drawerElem.classList.add('open');}, 10);
        document.body.style.overflow = 'hidden';
    }
    function hideDrawer() {
        drawerElem.classList.remove('open');
        setTimeout(() => {
          drawerBackdrop.style.display = 'none';
          document.body.style.overflow = '';
        }, 300);
    }
    window.hideOrderDrawer = hideDrawer;

    productCards.forEach(card => {
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        });

        // Add click handlers to buttons inside card (disable, handled in drawer)
        card.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.onclick = e => e.stopPropagation();
        });

        // --- Drawer launch logic ---
        card.addEventListener('click', function() {
            const productName = card.querySelector('.product-name').textContent;
            const productPrice = card.querySelector('.product-price').textContent.replace(/[^\d]/g, '');
            const productImg = card.querySelector('.product-image').getAttribute('src');
            const productCategory = card.querySelector('.product-category')?.textContent || '';
            const desc = `${productName} in category ${productCategory}`;
            showDrawer(renderOrderDrawer({
                name: productName,
                price: productPrice,
                img: productImg,
                desc: desc,
                vendors: [{
                  img: 'img/IMG_1907.jpeg', // TODO: dynamic
                  name: 'OLUMS Tech Incoporations'
                }]
            }));
            setupDrawerLogic();
        });
    });

    function renderOrderDrawer(data) {
      // Only one vendor for now - TODO: Multiple if available
      return `<div class="order-drawer-product" style="display:flex;gap:12px;align-items:center;">
        <img src="${data.img}" alt="Product" style="width:80px;height:80px;object-fit:cover;border-radius:6px;">
        <div class="order-drawer-product-details" style="flex:1;">
          <h4 style="margin:0 0 6px 0;">${data.name}</h4>
          <div class="category" style="font-size:14px;color:#666;">${data.desc}</div>
          <div class="price" style="font-weight:600;margin-top:6px;">&#8358;${Number(data.price).toLocaleString()}</div>
          <div style="padding-top:6px; font-size:14px;color:#444;"><b>Vendor:</b> <a href="about-vendor.html?vendor=olums" class="vendor-link" style="color:#3f51b5;text-decoration:none;cursor:pointer;">${data.vendors[0].name}</a></div>
        </div>
      </div>
      <div style="margin-bottom:1.3rem;">
        <div style="font-weight:500;color:#666;">Quantity:</div>
        <div style="display:flex;align-items:center;gap:16px;margin-top:5px;margin-bottom:12px;">
          <button class="qty-btn" id="drawerQtyDecrease" style="width:28px;height:28px;background:#4386bd;color:#fff;border-radius:50%;font-size:20px;border:none;cursor:pointer;">-</button>
          <span id="drawerQtyCount" style="min-width:30px;display:inline-block;text-align:center;font-size:16px;">1</span>
          <button class="qty-btn" id="drawerQtyIncrease" style="width:28px;height:28px;background:#4386bd;color:#fff;border-radius:50%;font-size:20px;border:none;cursor:pointer;">+</button>
        </div>
      </div>
      <div class="order-drawer-actions" style="display:flex;gap:12px;">
        <button class="add-to-cart" style="flex:1;padding:10px;background:#4CAF50;color:#fff;border:none;border-radius:4px;cursor:pointer;font-weight:600;">Add to Cart</button>
        <button class="buy-now" style="flex:1;padding:10px;background:#2196F3;color:#fff;border:none;border-radius:4px;cursor:pointer;font-weight:600;">Buy Now</button>
      </div>`;
    }
    function setupDrawerLogic() {
      let qty = 1;
      const qtyCount = drawerContent.querySelector('#drawerQtyCount');
      const increase = drawerContent.querySelector('#drawerQtyIncrease');
      const decrease = drawerContent.querySelector('#drawerQtyDecrease');
      increase.onclick = () => { qty++; qtyCount.textContent = qty; };
      decrease.onclick = () => { if(qty > 1) qty--; qtyCount.textContent = qty; };

      // Add vendor link handler to redirect to about-vendor.html
      const vendorLink = drawerContent.querySelector('.vendor-link');
      if (vendorLink) {
        vendorLink.onclick = function(e) {
          e.stopPropagation(); // Prevent drawer from closing when clicking the vendor link

          // Store vendor data in localStorage for about-vendor.js to use
          // Creating a custom vendor object for OLUMS Tech Incoporations
          const vendorData = {
            id: 'olums',
            name: 'OLUMS Tech Incoporations',
            desc: 'Premier tech retailer specializing in quality gadgets and accessories.',
            fullDesc: 'OLUMS Tech Incoporations is a leading technology retailer that offers a wide range of premium gadgets, smartphones, and accessories. Established in 2019, we pride ourselves on bringing authentic products with official warranties to our customers. Our expert staff provides personalized recommendations and excellent after-sales support.',
            image: 'img/IMG_1907.jpeg',
            badges: ['Verified', 'Top Rated', 'Official Seller'],
            stats: { rating: '4.8', products: 35, reviews: 127 },
            type: 'Tech Retailer',
            location: 'University Campus Area',
            since: '2019',
            categories: 'Smartphones, Accessories, Audio Devices, Computers',
            contact: {
              phone: '+234 801 234 5678',
              email: 'support@olumstech.com',
              website: 'www.olumstech.com'
            }
          };

          // Store the vendor ID for the about-vendor page
          localStorage.setItem('selectedVendorId', 'olums');

          // Also store the full vendor data in case it's not in the default list
          localStorage.setItem('customVendorData', JSON.stringify(vendorData));

          // Redirect will happen through the href attribute
        };
      }

      drawerContent.querySelector('.add-to-cart').onclick = function(){
        alert(`Added ${qty} item${qty > 1 ? 's' : ''} to cart!`);
        hideDrawer();
      };
      drawerContent.querySelector('.buy-now').onclick = function(){
        alert(`Buying ${qty} item${qty > 1 ? 's' : ''} now!`);
        hideDrawer();
      };
    }
}

// Initialize category and filter functionality
function initFilters() {
    const filterBtn = document.querySelector('.banner-cta .btn');
    const filterLinks = document.querySelectorAll('.sidebar-menu a');

    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            // In a real app, this would open a modal with additional filter options
            alert('This would open a detailed filter modal with price range, brands, etc.');
        });
    }

    filterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default navigation
            e.preventDefault();

            // Get the current active link and remove the active class
            const activeLink = this.closest('.sidebar-section').querySelector('li.active');
            if (activeLink) {
                activeLink.classList.remove('active');
            }

            // Add active class to the clicked link's parent li
            this.parentElement.classList.add('active');

            // Get the category name
            const categoryName = this.textContent.trim();

            // In a real app, this would filter products by category
            if (categoryName == 'Tech & Gadgets') {
                // Not triggering for main category to avoid reloading the page
                alert(`Filtering products by: ${categoryName}`);
            }
        });
    });
}

// Initialize sidebar functionality
function initSidebar() {
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    const MOBILE_WIDTH = 768;

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active from previous
            const activeLink = document.querySelector('.sidebar-menu li.active');
            if (activeLink) activeLink.classList.remove('active');
            this.parentElement.classList.add('active');

            const categoryName = this.textContent.trim();
            let destination = null;
            if (categoryName.includes('All Services')) destination = 'index.html';
            else if (categoryName.includes('Tech & Gadgets')) destination = 'tech-gadgets.html';
            else if (categoryName.includes('Food & Delivery')) destination = 'food-delivery.html';
            else if (categoryName.includes('Skincare & Beauty')) destination = 'skincare-beauty.html';
            else if (categoryName.includes('Events & Concerts')) destination = 'events-concerts.html';
            else if (categoryName.includes('Fashion & Accessories')) destination = 'fashion-accessories.html';
            else if (categoryName.includes('Home Services')) destination = 'home-services.html';
            else if (categoryName.includes('Chinese Vendors')) destination = 'chinese-vendors.html';

            function navigate() {
                if (destination) {
                    window.location.href = destination;
                } else {
                    alert(`${categoryName} category selected. Content would be filtered accordingly.`);
                }
            }

            if (window.innerWidth <= MOBILE_WIDTH) {
                // Always close the sidebar IMMEDIATELY after clicking a category
                if (typeof window.closeSidebar === 'function') {
                    window.closeSidebar();
                } else {
                    // fallback close if closeSidebar not defined yet
                    const sidebar = document.querySelector('.sidebar');
                    const overlay = document.querySelector('.sidebar-overlay');
                    document.body.style.overflow = '';
                    if (sidebar) sidebar.classList.remove('open');
                    if (overlay) overlay.classList.remove('active');
                }
                setTimeout(navigate, 10); // minimal delay so navigation happens after sidebar hides
            } else {
                navigate();
            }
        });
    });
}

// Initialize animations for a smoother experience
function initAnimation() {
    // Animate welcome banner
    const welcomeBanner = document.querySelector('.welcome-banner');
    if (welcomeBanner) {
        welcomeBanner.style.opacity = '0';
        welcomeBanner.style.transform = 'translateY(20px)';
        setTimeout(() => {
            welcomeBanner.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            welcomeBanner.style.opacity = '1';
            welcomeBanner.style.transform = 'translateY(0)';
        }, 100);
    }

    // Animate product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 + (100 * index % 3)); // Stagger by row for a nicer effect
    });
}

// Handle responsive menu
window.addEventListener('resize', handleResponsiveLayout);

function handleResponsiveLayout() {
    // Add mobile-specific features here
    if (window.innerWidth <= 768) {
        // This would handle mobile-specific features in a real app
    }
}

// --- Collapsible Search Functionality ---
function initCollapsibleSearch() {
    const searchToggle = document.querySelector('.search-toggle');
    const searchContainer = document.querySelector('.search-box-container');
    const searchClose = document.querySelector('.search-close');
    const searchInput = document.querySelector('.search-box input');

    if (!searchToggle || !searchContainer || !searchClose || !searchInput) return;

    // Toggle search form visibility
    searchToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        searchContainer.classList.add('active');
        searchInput.focus();
    });

    // Close search functionality
    function closeSearch() {
        searchContainer.classList.remove('active');
        searchInput.value = '';
    }

    searchClose.addEventListener('click', closeSearch);

    // Hide search form when clicking outside
    document.addEventListener('click', function(e) {
        const navSearch = document.querySelector('.nav-search');
        if (!navSearch.contains(e.target)) {
            closeSearch();
        }
    });

    // Handle search submit (Enter key)
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                // Replace with actual search logic
                alert(`Searching for: ${query}`);
            }
            closeSearch();
        } else if (e.key === 'Escape') {
            closeSearch();
        }
    });
}
