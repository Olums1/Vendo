document.addEventListener('DOMContentLoaded', () => {
    // Initialize page components
    initVendorCards();
    initOfferCards();
    initSidebarToggle();
    initProfileDropdown();
    initSidebar();
    initCollapsibleSearch();
    initFilters();

    // Get user name from local storage
    const userName = localStorage.getItem('userName') || 'User';
    const userNameElement = document.querySelector('.user-name');
    if (userNameElement) {
        userNameElement.textContent = userName;
    }

    // Handle notifications count
    const notificationCount = 2; // Can be dynamic based on actual data
    const notificationBadge = document.querySelector('.notification-badge');
    if (notificationBadge) {
        notificationBadge.textContent = notificationCount;
    }

    // Add some animation effects
    animateEntrance();

    // Multiline truncation fallback for all vendor-desc (in case browser doesn't support line-clamp)
    truncateAllVendorDescriptions();
    window.addEventListener('resize', truncateAllVendorDescriptions);
});

// Multiline truncation for vendor-desc using JS fallback
function truncateAllVendorDescriptions() {
    const maxLines = 3;
    const vendorDescs = document.querySelectorAll('.vendor-desc');
    vendorDescs.forEach(desc => truncateMultiline(desc, maxLines));
}

// Initialize vendor cards with click events
function initVendorCards() {
    const vendorCards = document.querySelectorAll('.vendor-card');

    vendorCards.forEach(card => {
        const vendorNameElement = card.querySelector('.vendor-name') || card.querySelector('h3') || card.querySelector('h4');
        const vendorName = vendorNameElement ? vendorNameElement.textContent : 'Unknown Vendor';

        // Get vendor id from mapped names
        let vendorId = vendorName
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9\-]/g, '');

        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        });

        // Add click event for both card and view/contact buttons
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('view-btn') && !e.target.classList.contains('contact-btn')) {
                localStorage.setItem('selectedVendorId', vendorId);
                window.location.href = 'about-vendor.html';
            }
        });

        // View button
        const viewBtns = card.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                localStorage.setItem('selectedVendorId', vendorId);
                window.location.href = 'about-vendor.html';
            });
        });

        // Contact button (if it exists)
        const contactBtns = card.querySelectorAll('.contact-btn');
        contactBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                localStorage.setItem('selectedVendorId', vendorId);
                window.location.href = 'about-vendor.html#contact';
            });
        });
    });
}

// Initialize offer cards with interactions
function initOfferCards() {
    const offerCards = document.querySelectorAll('.offer-card');

    offerCards.forEach(card => {
        const offerTitle = card.querySelector('h3') ? card.querySelector('h3').textContent : 'Special Offer';
        const offerProvider = card.querySelector('.offer-provider') ? card.querySelector('.offer-provider').textContent.replace('By ', '') : 'Unknown Provider';

        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        });

        // Add click event for the offer button
        const offerBtn = card.querySelector('.offer-btn');
        if (offerBtn) {
            offerBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                alert(`You've claimed "${offerTitle}" from ${offerProvider}!`);
            });
        }
    });
}

// Initialize sidebar category links
function initSidebar() {
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const linkText = this.textContent.trim();

            // Skip if it's the current active category (Tech & Gadgets)
            if (linkText === 'Tech & Gadgets') {
                e.preventDefault();
                return;
            }

            // For Food & Delivery, redirect to food-delivery.html
            if (linkText === 'Food & Delivery') {
                window.location.href = 'food-delivery.html';
                return;
            }

            // For All Services, redirect to dashboard
            if (linkText === 'All Services') {
                window.location.href = 'index.html';
                return;
            }

            // For Skincare & Beauty, redirect to skincare-vendors.html
            if (linkText === 'Skincare & Beauty') {
                window.location.href = 'skincare-beauty.html';
                return;
            }

            // For other categories in the future we can redirect to their pages
            if (linkText == 'Top Rated' && linkText !== 'Popular' && linkText !== 'Recently Added') {
                e.preventDefault();
                alert(`${linkText} vendors page would open here.`);
            }
        });
    });

    // Handle filter links (Top Rated, Popular, Recently Added)
    const filterLinks = document.querySelectorAll('.sidebar-menu a');
    filterLinks.forEach(link => {
        const linkText = link.textContent.trim();
        if (linkText === 'Top Rated' || linkText === 'Popular' || linkText === 'Recently Added') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                alert(`${linkText} vendors page would open here.`);

                // Remove active class from current filter
                const activeFilter = document.querySelector('.sidebar-menu li.active');
                if (activeFilter && activeFilter.querySelector('a').textContent.trim() !== 'Tech & Gadgets') {
                    activeFilter.classList.remove('active');
                }

                // Add active class to clicked filter
                this.parentElement.classList.add('active');

                // In a real app, this would filter the vendors based on the selection
                alert(`Showing ${linkText} tech vendors.`);
            });
        }
    });
}

// Initialize tech type filters
function initFilters() {
    const filterCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');

    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const techType = this.id;
            const isChecked = this.checked;

            // In a real app, this would filter the vendors based on tech type
            if (isChecked) {
                alert(`Showing vendors with ${techType} products.`);
            } else {
                alert(`Hiding vendors with ${techType} products.`);
            }
        });
    });
}

// Animate elements on page load
function animateEntrance() {
    // Animate page header
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
        pageHeader.style.opacity = 0;
        setTimeout(() => {
            pageHeader.style.transition = 'opacity 0.5s ease';
            pageHeader.style.opacity = 1;
        }, 100);
    }

    // Animate vendor cards with staggered delay
    const vendorCards = document.querySelectorAll('.vendor-card');
    vendorCards.forEach((card, index) => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = 1;
            card.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });

    // Animate offer cards with staggered delay
    const offerCards = document.querySelectorAll('.offer-card');
    offerCards.forEach((card, index) => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = 1;
            card.style.transform = 'translateY(0)';
        }, 600 + (index * 100));
    });
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

// --- Profile Dropdown Navigation ---
function initProfileDropdown() {
    const userMenu = document.querySelector('.user-menu');
    const dropdown = document.getElementById('profileDropdown');

    // Toggle dropdown on entire user menu click
    function toggleDropdown(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Profile dropdown toggle clicked'); // Debug log
        if (dropdown) {
            const isVisible = dropdown.style.display === 'block';
            dropdown.style.display = isVisible ? 'none' : 'block';
            console.log('Dropdown is now:', dropdown.style.display); // Debug log
        }
    }

    if (userMenu && dropdown) {
        // Remove any existing event listeners
        userMenu.removeEventListener('click', toggleDropdown);
        // Add the click event listener to the entire user menu
        userMenu.addEventListener('click', toggleDropdown);
        console.log('Profile dropdown initialized'); // Debug log
    }

    // Hide dropdown when clicking outside
    document.addEventListener('click', function (e) {
        if (dropdown && userMenu && !userMenu.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });

    // Logout handler
    window.logoutUser = function() {
        localStorage.removeItem('userName');
        window.location.href = 'signin.html';
    };

    // Global toggle function (backup)
    window.toggleProfileDropdown = function() {
        if (dropdown) {
            const isVisible = dropdown.style.display === 'block';
            dropdown.style.display = isVisible ? 'none' : 'block';
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

// Truncate multiline text helper function
function truncateMultiline(element, maxLines) {
    if (!element) return;

    const lineHeight = parseFloat(window.getComputedStyle(element).lineHeight);
    const maxHeight = lineHeight * maxLines;

    if (element.scrollHeight > maxHeight) {
        element.style.maxHeight = maxHeight + 'px';
        element.style.overflow = 'hidden';
    }
}
