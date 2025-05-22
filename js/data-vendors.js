document.addEventListener('DOMContentLoaded', () => {
    // Initialize the page components
    initUserInfo();
    initVendorCards();
    initFilterOptions();
    initOfferCards();
    initAnimations();
});

// Initialize user info from localStorage
function initUserInfo() {
    const userName = localStorage.getItem('userName') || 'User';
    document.querySelector('.user-name').textContent = userName;
}

// Initialize vendor cards with interactions
function initVendorCards() {
    const vendorCards = document.querySelectorAll('.vendor-card');

    vendorCards.forEach(card => {
        // Add click handlers to vendor cards
        card.addEventListener('click', function() {
            const vendorName = this.querySelector('h3').textContent;
            // In a real app, this would navigate to the vendor's page
            alert(`You selected ${vendorName}. This would navigate to their services page.`);
        });

        // Add click handler for view buttons
        const viewBtn = card.querySelector('.view-btn');
        if (viewBtn) {
            viewBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent the card click event from firing
                const vendorName = card.querySelector('h3').textContent;
                // In a real app, this would navigate to the vendor's page
                alert(`You'll see services from ${vendorName}`);
            });
        }
    });
}

// Initialize filter options in the sidebar
function initFilterOptions() {
    const filterCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');

    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Get all selected network providers
            const selectedNetworks = Array.from(document.querySelectorAll('.filter-option input[type="checkbox"]:checked'))
                .map(input => input.id);

            // In a real app, this would filter the vendors based on the selected networks
            if (selectedNetworks.length === 0) {
                alert('No networks selected. Please select at least one network provider.');
                this.checked = true; // Ensure at least one is checked
            } else {
                console.log('Filtering by networks:', selectedNetworks);
                // This would trigger an API call or filter the displayed vendors
                simulateFilteringVendors(selectedNetworks);
            }
        });
    });

    // Add event listeners for the sidebar filter options
    const filterOptions = document.querySelectorAll('.sidebar-menu li a');
    filterOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();

            // Get the category name
            const categoryName = this.textContent.trim();

            // Check if this is the Airtime & Data link
            if (categoryName.includes('Airtime & Data')) {
                // Already on this page, do nothing or just refresh
                return;
            }

            // Handle Home link to go back to dashboard
            if (categoryName.includes('All Services')) {
                window.location.href = 'index.html';
                return;
            }

            // Handle Food Vendor link to go to food & delivery
            if (categoryName.includes('Food & Delivery')) {
                window.location.href = 'food-vendors.html';
                return;
            }

             // Handle Skincare Vendor link to go to skincare & beauty
             if (categoryName.includes('Skincare & Beauty')) {
                window.location.href = 'skincare-vendors.html';
                return;
            }

            // Remove active class from all options
            document.querySelectorAll('.sidebar-menu li').forEach(li => {
                li.classList.remove('active');
            });

            // Add active class to the clicked option
            this.parentElement.classList.add('active');

            // In a real app, this would filter the vendors based on the selected filter
            simulateFilteringByOption(categoryName);
        });
    });
}

// Simulate filtering vendors (for demo purposes)
function simulateFilteringVendors(selectedNetworks) {
    // In a real app, this would be replaced with actual filtering logic
    const vendorCards = document.querySelectorAll('.vendor-card');

    // Show a loading state
    vendorCards.forEach(card => {
        card.style.opacity = '0.5';
    });

    // Simulate API delay
    setTimeout(() => {
        vendorCards.forEach(card => {
            card.style.opacity = '1';
        });

        // Show a message about the applied filter
        alert(`Vendors filtered to show those supporting: ${selectedNetworks.join(', ')}`);
    }, 500);
}

// Simulate filtering by sidebar option (for demo purposes)
function simulateFilteringByOption(filterType) {
    // In a real app, this would be replaced with actual filtering logic
    const vendorCards = document.querySelectorAll('.vendor-card');

    // Show a loading state
    vendorCards.forEach(card => {
        card.style.opacity = '0.5';
    });

    // Simulate API delay
    setTimeout(() => {
        vendorCards.forEach(card => {
            card.style.opacity = '1';
        });

        // Show a message about the applied filter
        alert(`Vendors filtered by: ${filterType}`);
    }, 500);
}

// Initialize special offer cards
function initOfferCards() {
    const offerCards = document.querySelectorAll('.offer-card');
    const offerBtns = document.querySelectorAll('.offer-btn');

    // Add click handlers to offer cards
    offerCards.forEach(card => {
        card.addEventListener('click', function() {
            const offerTitle = this.querySelector('h3').textContent;
            // In a real app, this would open the offer details
            alert(`You selected the "${offerTitle}" offer. This would show more details.`);
        });
    });

    // Add click handlers to "Get Offer" buttons
    offerBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent the card click event from firing
            const offerCard = this.closest('.offer-card');
            const offerTitle = offerCard.querySelector('h3').textContent;
            const provider = offerCard.querySelector('.offer-provider').textContent.replace('By ', '');

            // In a real app, this would add the offer to the user's account or navigate to checkout
            alert(`The "${offerTitle}" offer from ${provider} has been added to your cart!`);
        });
    });
}

// Add animations for a smoother user experience
function initAnimations() {
    // Animate the vendor cards entrance
    const vendorCards = document.querySelectorAll('.vendor-card');
    vendorCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 100)); // Stagger the animations
    });

    // Animate the special offers section
    const offerCards = document.querySelectorAll('.offer-card');
    offerCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 700 + (index * 100)); // Start after vendor cards with staggered timing
    });
}
