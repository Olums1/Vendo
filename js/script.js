document.addEventListener('DOMContentLoaded', () => {
    // Initialize dashboard components
    initServiceCards();
    initVendorCards();
    initPromoCards();
    initNavigation();
    initSidebarToggle();
    initProfileDropdown();
    initSidebar();
    initCollapsibleSearch();
    initUserMenu();
    handleResponsiveLayout();
    

    // Get user name from local storage or use a default
    const userName = localStorage.getItem('userName') || 'User';
    document.querySelector('.user-name').textContent = userName;

    // Also update welcome banner if exists
    const userNameDisplay = document.querySelector('.user-name-display');
    if (userNameDisplay) {
        userNameDisplay.textContent = userName;
    }

    // Simulate loading notifications
    const notificationCount = 2; // Can be dynamic based on actual data
    document.querySelector('.notification-badge').textContent = notificationCount;

    // Run animations for a smoother experience
    setTimeout(animateEntrance, 200);

    // Add profile dropdown logic
    
// ... existing code ...
// ... after initSidebarToggle ...

});

// Initialize service cards with click events
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        // Add click handler
        card.addEventListener('click', function() {
            const serviceName = this.querySelector('.service-name').textContent;

            // Check if this is the Tech & Gadgets card
            if (serviceName === 'Tech & Gadgets' || this.classList.contains('tech')) {
                window.location.href = 'tech-gadgets.html';
            }
            // Check if this is the Food & Delivery card
            else if (serviceName === 'Food & Delivery' || this.classList.contains('food')) {
                window.location.href = 'food-delivery.html';
            }
            // Check if this is the Skincare & Beauty card
            else if (serviceName === 'Skincare & Beauty' || this.classList.contains('skin')) {
                window.location.href = 'skincare-beauty.html';
            }
            // Check if this is the Events & Concerts card
            else if (serviceName === 'Events & Concerts' || this.classList.contains('event')) {
                window.location.href = 'events-concerts.html';
            }
            // Check if this is the Fashion & Accessories card
            else if (serviceName === 'Fashion & Accessories' || this.classList.contains('fashion')) {
                window.location.href = 'fashion-accessories.html';
            }
            // Check if this is the Home Servives card
            else if (serviceName === 'Home Services' || this.classList.contains('home-services')) {
                window.location.href = 'home-services.html';
            }
            // Check if this is the Chinese Vendor card
            else if (serviceName === 'Chinese Vendors' || this.classList.contains('chinese-vendors')) {
                window.location.href = 'chinese-vendors.html';
            }
             else {
                // For other services, keep the alert for now
                alert(`You selected the ${serviceName} service`);
            }
        });

        // Ensure images are visible
        const image = card.querySelector('.service-icon img');
        if (image) {
            image.style.display = 'block';

            // Add error handling for images
            image.addEventListener('error', function() {
                // If image fails to load, add a fallback background color based on card class
                const cardElement = this.closest('.service-card');
                if (cardElement.classList.contains('tech')) {
                    cardElement.style.backgroundColor = 'var(--tech-color)';
                } else if (cardElement.classList.contains('food')) {
                    cardElement.style.backgroundColor = 'var(--food-color)';
                } else if (cardElement.classList.contains('beauty')) {
                    cardElement.style.backgroundColor = 'var(--beauty-color)';
                } else if (cardElement.classList.contains('events')) {
                    cardElement.style.backgroundColor = 'var(--events-color)';
                } else if (cardElement.classList.contains('home-services')) {
                    cardElement.style.backgroundColor = 'var(--home-services-color)';
                } else if (cardElement.classList.contains('fashion-accessories')) {
                    cardElement.style.backgroundColor = 'var(--fashion-color)';
                }
                this.style.display = 'none'; // Hide the broken image
            });
        }
    });

    // Show images in service cards
    const serviceIcons = document.querySelectorAll('.service-icon img');
    serviceIcons.forEach(icon => {
        icon.style.display = 'block';
    });
}

// Initialize vendor cards
function initVendorCards() {
    const vendorCards = document.querySelectorAll('.vendor-card');

    vendorCards.forEach(card => {
        const vendorLink = card.querySelector('.vendor-link');

        if (vendorLink) {
            vendorLink.addEventListener('click', function(e) {
                e.preventDefault();
                const vendorName = card.querySelector('.vendor-name').textContent;
                alert(`You selected ${vendorName}'s services`);
            });
        }
    });
}

// Initialize promo cards with interactions
function initPromoCards() {
    const promoCards = document.querySelectorAll('.promo-card');

    promoCards.forEach(card => {
        // Add click event for the card
        card.addEventListener('click', function() {
            const brandName = this.querySelector('.brand-name').textContent;
            const discount = this.querySelector('.discount-amount').textContent;
            // This would open the promo details page in a real app
            alert(`You selected the ${brandName} promotion: ${discount}`);
        });

        // Add click event for the claim button
        const claimBtn = card.querySelector('.btn-small');
        if (claimBtn) {
            claimBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent card click event
                const brandName = card.querySelector('.brand-name').textContent;
                alert(`Coupon from ${brandName} has been added to your account!`);
            });
        }
    });
}

// Initialize main navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Get the current active link and remove the active class
            const activeLink = document.querySelector('.nav-links li.active');
            if (activeLink) {
                activeLink.classList.remove('active');
            }

            // Add active class to the clicked link's parent li
            this.parentElement.classList.add('active');

            // Handle specific navigation actions
            const navText = this.textContent.trim().toLowerCase();

            switch(navText) {
                case 'home':
                    // Already on home page
                    break;
                case 'orders':
                    // This would navigate to orders in a real app
                    alert('Orders page would open here');
                    break;
                case 'scan':
                    // This would open the scanner in a real app
                    alert('QR Code scanner would open here');
                    break;
                default:
                    break;
            }
        });
    });

    // Handle notification icon
    const notificationIcon = document.querySelector('.notification-icon');
    if (notificationIcon) {
        notificationIcon.addEventListener('click', function() {
            alert('Notifications panel would open here');
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
            else if (categoryName.includes('Technology')) destination = 'chinese-tech1.html';
            else if (categoryName.includes('Skincare')) destination = 'chinese-skin1.html';
            else if (categoryName.includes('Fashion')) destination = 'chinese-fashion1.html';
            else if (categoryName.includes('My Profile')) destination = 'customer-profile.html';
            else if (categoryName.includes('Home')) destination = 'index.html';
            else if (categoryName.includes('Logout')) destination = 'signin.html';

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


// Add animations for a more engaging experience
function animateEntrance() {
    // Animate sidebar
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.style.opacity = '0';
        sidebar.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            sidebar.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            sidebar.style.opacity = '1';
            sidebar.style.transform = 'translateX(0)';
        }, 100);
    }

    // Animate welcome banner
    const welcomeBanner = document.querySelector('.welcome-banner');
    if (welcomeBanner) {
        welcomeBanner.style.opacity = '0';
        welcomeBanner.style.transform = 'translateY(20px)';
        setTimeout(() => {
            welcomeBanner.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            welcomeBanner.style.opacity = '1';
            welcomeBanner.style.transform = 'translateY(0)';
        }, 200);
    }

    // Animate service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 + (100 * index));
    });

    // Animate vendor cards
    const vendorCards = document.querySelectorAll('.vendor-card');
    vendorCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 600 + (100 * index));
    });

    // Animate promo cards
    const promoCards = document.querySelectorAll('.promo-card');
    promoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 900 + (100 * index));
    });
}

// Add responsive menu toggle for mobile devices
function initSidebarToggle() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const body = document.body;

    function openSidebar() {
        console.log('Sidebar toggle clicked: opening sidebar');
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

        // Close sidebar on escape press
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeSidebar();
            }
        });
    }
    // Always expose closeSidebar but do not programmatically open sidebar EXCEPT via toggle
    window.closeSidebar = closeSidebar;
}

// --- Profile Dropdown Navigation ---
function initProfileDropdown() {
    const userMenu = document.querySelector('.user-menu');
    const dropdown = document.getElementById('profileDropdown');
    const dropdownIcon = userMenu ? userMenu.querySelector('.dropdown-icon') : null;

    // Toggle dropdown on profile/icon click
    function toggleDropdown(e) {
        e.stopPropagation();
        if (dropdown) {
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        }
    }
    if (userMenu) {
        userMenu.addEventListener('click', toggleDropdown);
    }
    // Hide on outside click
    document.addEventListener('click', function (e) {
        if (dropdown && !userMenu.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });

    // My Profile handled in HTML with location.href
    // Logout handler
    window.logoutUser = function() {
        // Clear user info etc.
        localStorage.removeItem('userName');
        window.location.href = 'signin.html';
    };
    // For custom toggle in HTML (if needed)
    window.toggleProfileDropdown = function() {
        if (dropdown) {
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        }
    };
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