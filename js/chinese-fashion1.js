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
    document.querySelector('.user-name').textContent = userName;

    // Handle notifications count
    const notificationCount = 2; // Can be dynamic based on actual data
    document.querySelector('.notification-badge').textContent = notificationCount;

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

function truncateMultiline(element, maxLines) {
    const lineHeight = parseFloat(window.getComputedStyle(element).lineHeight);
    const maxHeight = lineHeight * maxLines;
    const originalText = element.getAttribute('data-original-text') || element.textContent;
    element.setAttribute('data-original-text', originalText); // Preserve original
    element.textContent = originalText;

    // Temporarily reset styles and text to measure
    element.style.overflow = 'visible';
    element.style.textOverflow = 'clip';
    element.style.display = 'block';

    // Truncate if overflowing
    if (element.scrollHeight > maxHeight + 1) {
        let text = originalText;
        let low = 0, high = text.length, mid;
        let truncated = '';
        while (low < high) {
            mid = Math.floor((low + high) / 2);
            element.textContent = text.slice(0, mid) + '...';
            if (element.scrollHeight > maxHeight + 1) {
                high = mid; // Too long
            } else {
                truncated = element.textContent;
                low = mid + 1; // Try longer
            }
        }
        element.textContent = truncated;
    } else {
        element.textContent = originalText;
    }
    // Restore styles
    element.style.overflow = 'hidden';
    element.style.textOverflow = 'ellipsis';
    element.style.display = '-webkit-box';
    element.style.webkitBoxOrient = 'vertical';
    element.style.webkitLineClamp = maxLines;
}

// Initialize vendor cards with click events
function initVendorCards() {
    const vendorCards = document.querySelectorAll('.vendor-card');

    vendorCards.forEach(card => {
        const vendorName = card.querySelector('h3').textContent;

        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        });

        // Add click event for view button
        const viewBtn = card.querySelector('.view-btn');
        if (viewBtn) {
            viewBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                alert(`You would view ${vendorName}'s details and menu here.`);
            });
        }
    });
}

// Initialize offer cards with interactions
function initOfferCards() {
    const offerCards = document.querySelectorAll('.offer-card');

    offerCards.forEach(card => {
        const offerTitle = card.querySelector('h3').textContent;
        const offerProvider = card.querySelector('.offer-provider').textContent.replace('By ', '');

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

            // Skip if it's the current active category (Food & Delivery)
            if (linkText === 'Food & Delivery') {
                e.preventDefault();
                return;
            }

            // For Tech & Gadgets, redirect to tech-gadgets.html
            if (linkText === 'Tech & Gadgets') {
                window.location.href = 'tech-gadgets.html';
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
                if (activeFilter && activeFilter.querySelector('a').textContent.trim() !== 'Food & Delivery') {
                    activeFilter.classList.remove('active');
                }

                // Add active class to clicked filter
                this.parentElement.classList.add('active');

                // In a real app, this would filter the vendors based on the selection
                alert(`Showing ${linkText} food vendors.`);
            });
        }
    });
}

// Initialize food type filters
function initFilters() {
    const filterCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');

    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const foodType = this.id;
            const isChecked = this.checked;

            // In a real app, this would filter the vendors based on food type
            if (isChecked) {
                alert(`Showing vendors with ${foodType} cuisine.`);
            } else {
                alert(`Hiding vendors with ${foodType} cuisine.`);
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