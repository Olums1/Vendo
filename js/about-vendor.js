// Vendor data with extended information for detailed about page
const VENDORS_DATA = [
  {
    id: 'chinchun',
    name: 'Chin Chun Marketing',
    desc: 'Trusted supplier of Chinese smartphones and electronic gadgets.',
    fullDesc: 'Chin Chun Marketing is a premier importer and distributor of high-quality Chinese smartphones and electronic gadgets. Established in 2017, we provide wholesale and retail customers with authentic products at competitive prices. Our team personally sources products directly from manufacturers in Shenzhen, ensuring quality control at every step.',
    image: '/img/chinchun.jpg',
    badges: ['Verified', 'Top Rated', 'Fast Delivery'],
    stats: { rating: '4.9' },
    type: 'Wholesaler & Retailer',
    location: 'Technology Market, Lagos',
    since: '2017',
    categories: 'Smartphones, Accessories, Audio Devices',
    contact: {
      phone: '+234 812 345 6789',
      email: 'info@chinchunmarketing.com',
      website: 'www.chinchunmarketing.com'
    }
  },
  {
    id: 'huawei-phone',
    name: 'Huawei Phone',
    desc: 'Direct source for Huawei smartphones, tablets, and accessories.',
    fullDesc: 'Huawei Phone is an authorized Huawei distributor specializing in the latest smartphones, tablets, and accessories. We offer the complete range of Huawei products with official warranties and after-sales support. Our technical team provides expert advice on selecting the right Huawei device for your needs and offers setup assistance for all purchased devices.',
    image: '/img/huawei2.jpg',
    badges: ['Verified', 'Top Rated', 'Fast Delivery'],
    stats: { rating: '4.7' },
    type: 'Authorized Distributor',
    location: 'Computer Village, Ikeja',
    since: '2015',
    categories: 'Huawei Phones, Tablets, Accessories',
    contact: {
      phone: '+234 802 987 6543',
      email: 'sales@huaweiphone.ng',
      website: 'www.huaweiphone.ng'
    }
  },
  {
    id: 'nokia-stores',
    name: 'Nokia Stores',
    desc: 'Genuine Nokia phones and popular electronics at great prices.',
    fullDesc: 'Nokia Stores offers a curated selection of genuine Nokia phones and popular electronics at competitive prices. We focus on durability and reliability, just like the Nokia brand itself. From classic feature phones to modern smartphones, our store provides trusted Nokia devices with genuine parts and reliable service. We also stock a range of other reliable electronics brands that meet our quality standards.',
    image: '/img/nokia.jpg',
    badges: ['Verified', 'Top Rated', 'Fast Delivery'],
    stats: { rating: '4.4' },
    type: 'Brand Retailer',
    location: 'Kano City Mall',
    since: '2012',
    categories: 'Nokia Phones, Feature Phones, Accessories',
    contact: {
      phone: '+234 703 456 7890',
      email: 'contact@nokiastores.com.ng',
      website: 'www.nokiastores.com.ng'
    }
  },
  {
    id: 'china-mobile',
    name: 'China Mobile',
    desc: 'Chinese mobile phones and gadgets at affordable rates.',
    fullDesc: 'China Mobile specializes in bringing the latest Chinese mobile phones and gadgets to the Nigerian market at affordable rates. We carefully select devices that offer excellent features at budget-friendly prices, making technology accessible to everyone. Our team regularly travels to China to source unique products not commonly found in mainstream stores, giving our customers access to innovative technology ahead of the curve.',
    image: '/img/chinamobile.jpg',
    badges: ['Verified', 'Top Rated', 'Fast Delivery'],
    stats: { rating: '4.3' },
    type: 'Specialty Importer',
    location: 'Alaba International Market, Lagos',
    since: '2018',
    categories: 'Budget Phones, Chinese Brands, Accessories',
    contact: {
      phone: '+234 813 987 6543',
      email: 'hello@chinamobileng.com',
      website: 'www.chinamobileng.com'
    }
  },
  {
    id: 'huawei-stores',
    name: 'Huawei Stores',
    desc: 'Original Huawei devices and the latest tech from China.',
    fullDesc: 'Huawei Stores is dedicated to bringing you the complete ecosystem of Huawei products and the latest technology from China. From flagship smartphones to cutting-edge laptops, tablets, wearables, and smart home devices, we offer the entire Huawei product lineup with manufacturer warranties. Our trained staff can demonstrate how Huawei devices work together seamlessly, creating a connected experience across all your technology.',
    image: '/img/huawei.jpg',
    badges: ['Verified', 'Top Rated', 'Fast Delivery'],
    stats: { rating: '4.6' },
    type: 'Brand Specialist',
    location: 'Lekki Phase 1, Lagos',
    since: '2016',
    categories: 'Huawei Ecosystem, Smart Devices, Premium Tech',
    contact: {
      phone: '+234 905 432 1098',
      email: 'support@huaweistores.ng',
      website: 'www.huaweistores.ng'
    }
  },
  // Add OLUMS Tech Incoporations as a default vendor in the list
  {
    id: 'olums',
    name: 'OLUMS Tech Incoporations',
    desc: 'Premier tech retailer specializing in quality gadgets and accessories.',
    fullDesc: 'OLUMS Tech Incoporations is a leading technology retailer that offers a wide range of premium gadgets, smartphones, and accessories. Established in 2019, we pride ourselves on bringing authentic products with official warranties to our customers. Our expert staff provides personalized recommendations and excellent after-sales support.',
    image: 'img/IMG_1907.jpeg',
    badges: ['Verified', 'Top Rated', 'Official Seller'],
    stats: { rating: '4.8' },
    type: 'Tech Retailer',
    location: 'University Campus Area',
    since: '2019',
    categories: 'Smartphones, Accessories, Audio Devices, Computers',
    contact: {
      phone: '+234 801 234 5678',
      email: 'support@olumstech.com',
      website: 'www.olumstech.com'
    }
  }
];

// Helper - get vendor by id
function getVendorById(id) {
  return VENDORS_DATA.find(v => v.id === id);
}

// Format price as Naira (if needed)
function formatNaira(num) {
  num = Number(num);
  return '₦' + num.toLocaleString();
}

// Check for custom vendor data passed from other pages
let customVendorData = null;
try {
  const storedCustomData = localStorage.getItem('customVendorData');
  if (storedCustomData) {
    customVendorData = JSON.parse(storedCustomData);
  }
} catch (e) {
  console.error('Error parsing custom vendor data:', e);
}

// Get vendor ID from URL parameter or localStorage
let vendorId;
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('vendor')) {
  vendorId = urlParams.get('vendor');
} else {
  vendorId = localStorage.getItem('selectedVendorId') || VENDORS_DATA[0].id;
}

// Get the vendor data either from custom data or from predefined list
let vendor;
if (customVendorData && customVendorData.id === vendorId) {
  vendor = customVendorData;
} else {
  vendor = getVendorById(vendorId) || VENDORS_DATA[0];
}

window.addEventListener('DOMContentLoaded', function () {
    // Back arrow functionality
    var backBtn = document.querySelector('.about-vendor-back');
    if (backBtn) {
      backBtn.addEventListener('click', function(){
        window.history.back();
      });
    }
    // Hero section
    document.getElementById('aboutVendorImg').src = vendor.image;
    document.getElementById('aboutVendorName').textContent = vendor.name;
    document.getElementById('aboutVendorDesc').textContent = vendor.desc;

    // Badges
    const badgeBox = document.getElementById('aboutVendorBadges');
    badgeBox.innerHTML = vendor.badges.map(badge => {
        let icon = 'star';
        if (badge.toLowerCase().includes('verified')) icon = 'verified';
        else if (badge.toLowerCase().includes('rated')) icon = 'star_rate';
        else if (badge.toLowerCase().includes('delivery')) icon = 'local_shipping';
        else if (badge.toLowerCase().includes('trusted')) icon = 'thumb_up';
        else if (badge.toLowerCase().includes('seller')) icon = 'trending_up';
        else if (badge.toLowerCase().includes('official')) icon = 'storefront';
        else if (badge.toLowerCase().includes('affordable')) icon = 'savings';
        else if (badge.toLowerCase().includes('popular')) icon = 'whatshot';
        else if (badge.toLowerCase().includes('premium')) icon = 'diamond';
        else if (badge.toLowerCase().includes('service')) icon = 'support_agent';
        return `<span class="about-vendor-badge"><span class="material-icons" style="font-size:16px;vertical-align:middle;">${icon}</span> ${badge}</span>`;
    }).join('');

    // Stats
    let statsDiv = document.getElementById('aboutVendorStats');
    if(statsDiv && vendor.stats){
        statsDiv.innerHTML = `
        <div><span class="material-icons" style="font-size:18px;vertical-align:middle;">star</span> <b>${vendor.stats.rating}</b> Rating</div>
        `;
    }

    // Full description section
    document.getElementById('aboutVendorFullDesc').textContent = vendor.fullDesc;

    // Vendor details
    document.getElementById('aboutVendorType').textContent = vendor.type;
    document.getElementById('aboutVendorLocation').textContent = vendor.location;
    document.getElementById('aboutVendorSince').textContent = vendor.since;
    document.getElementById('aboutVendorCategories').textContent = vendor.categories;

    // Contact information
    document.getElementById('aboutVendorPhone').textContent = vendor.contact.phone;
    document.getElementById('aboutVendorEmail').textContent = vendor.contact.email;
    document.getElementById('aboutVendorWebsite').textContent = vendor.contact.website;

    // Contact button
    document.getElementById('aboutVendorContact').onclick = function(){
        window.location.href = `mailto:${vendor.contact.email}?subject=Inquiry about your services`;
    };

    // View products button
    document.getElementById('aboutVendorViewProductsBtn').onclick = function(){
        // Select the products tab
        document.getElementById('productsTab').click();
    };

    // Clear stored custom vendor data after using it
    localStorage.removeItem('customVendorData');
});
