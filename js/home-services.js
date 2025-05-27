document.addEventListener('DOMContentLoaded', () => {
    initProducts();
    initFilters();
    initSidebarToggle();
    initSidebar();
    initAnimation();
});

function initProducts() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px rgba(141,53,206,0.14)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        });
        const addToCartBtn = card.querySelector('.add-to-cart');
        const buyNowBtn = card.querySelector('.buy-now');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const name = card.querySelector('.product-name').textContent;
                this.textContent = "Added ✓";
                this.style.backgroundColor = "#43a047";
                setTimeout(() => {
                    this.textContent = "Add to Cart";
                    this.style.backgroundColor = "";
                }, 1500);
                console.log(`Added ${name} to cart`);
            });
        }
        if (buyNowBtn) {
            buyNowBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const name = card.querySelector('.product-name').textContent;
                alert(`Proceeding to buy ${name}`);
            });
        }
        card.addEventListener('click', function() {
            const name = this.querySelector('.product-name').textContent;
            alert(`Viewing details for ${name}`);
        });
    });
}

function initFilters() {
    const filterBtn = document.querySelector('.banner-cta .btn');
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            alert('This would open a filter modal for category, size, color, etc.');
        });
    }
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

function initAnimation() {
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
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 + (100 * index % 3));
    });
}

window.addEventListener('resize', handleResponsiveLayout);
function handleResponsiveLayout() {
    if (window.innerWidth <= 768) {
        // Mobile-specific adjustments if needed.
    }
}

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
