// Sample product data for each vendor
const PRODUCTS_DATA = {
  'chinchun': [
    {
      id: 'cc-p1',
      name: 'Xiaomi Redmi Note 12 Pro',
      price: 189000,
      image: 'img/products/redmi-note12.jpg',
      category: 'smartphones',
      condition: 'New',
      stock: 15
    },
    {
      id: 'cc-p2',
      name: 'Xiaomi Mi True Wireless Earbuds',
      price: 25000,
      image: 'img/products/mi-earbuds.jpg',
      category: 'audio',
      condition: 'New',
      stock: 30
    },
    {
      id: 'cc-p3',
      name: 'Xiaomi Mi Band 7',
      price: 18500,
      image: 'img/products/mi-band7.jpg',
      category: 'accessories',
      condition: 'New',
      stock: 22
    },
    {
      id: 'cc-p4',
      name: 'OnePlus Nord CE 3 Lite',
      price: 195000,
      image: 'img/products/oneplus-nord.jpg',
      category: 'smartphones',
      condition: 'New',
      stock: 10
    },
    {
      id: 'cc-p5',
      name: 'Xiaomi Wireless Power Bank 10000mAh',
      price: 15000,
      image: 'img/products/mi-powerbank.jpg',
      category: 'accessories',
      condition: 'New',
      stock: 35
    },
    {
      id: 'cc-p6',
      name: 'Realme C55 (6GB/128GB)',
      price: 115000,
      image: 'img/products/realme-c55.jpg',
      category: 'smartphones',
      condition: 'New',
      stock: 18
    },
    {
      id: 'cc-p7',
      name: 'Xiaomi Bluetooth Speaker',
      price: 13500,
      image: 'img/products/mi-speaker.jpg',
      category: 'audio',
      condition: 'New',
      stock: 12
    },
    {
      id: 'cc-p8',
      name: 'Realme Buds Air 3',
      price: 22000,
      image: 'img/products/realme-buds.jpg',
      category: 'audio',
      condition: 'New',
      stock: 17
    }
  ],
  'huawei-phone': [
    {
      id: 'hp-p1',
      name: 'Huawei P40 Pro',
      price: 350000,
      image: 'img/products/huawei-p40.jpg',
      category: 'smartphones',
      condition: 'New',
      stock: 8
    },
    {
      id: 'hp-p2',
      name: 'Huawei MatePad 11',
      price: 215000,
      image: 'img/products/huawei-matepad.jpg',
      category: 'smartphones',
      condition: 'New',
      stock: 12
    },
    {
      id: 'hp-p3',
      name: 'Huawei FreeBuds 5i',
      price: 48000,
      image: 'img/products/huawei-freebuds.jpg',
      category: 'audio',
      condition: 'New',
      stock: 20
    },
    {
      id: 'hp-p4',
      name: 'Huawei Watch GT3 Pro',
      price: 145000,
      image: 'img/products/huawei-watch.jpg',
      category: 'accessories',
      condition: 'New',
      stock: 7
    },
    {
      id: 'hp-p5',
      name: 'Huawei Nova 9',
      price: 187000,
      image: 'img/products/huawei-nova9.jpg',
      category: 'smartphones',
      condition: 'New',
      stock: 14
    },
    {
      id: 'hp-p6',
      name: 'Huawei SuperCharge Power Bank',
      price: 28000,
      image: 'img/products/huawei-powerbank.jpg',
      category: 'accessories',
      condition: 'New',
      stock: 22
    }
  ],
  'nokia-stores': [
    {
      id: 'ns-p1',
      name: 'Nokia X30 5G',
      price: 210000,
      image: 'img/products/nokia-x30.jpg',
      category: 'smartphones',
      condition: 'New',
      stock: 9
    },
    {
      id: 'ns-p2',
      name: 'Nokia G60 5G',
      price: 135000,
      image: 'img/products/nokia-g60.jpg',
      category: 'smartphones',
      condition: 'New',
      stock: 13
    },
    {
      id: 'ns-p3',
      name: 'Nokia C32',
      price: 62000,
      image: 'img/products/nokia-c32.jpg',
      category: 'smartphones',
      condition: 'New',
      stock: 18
    },
    {
      id: 'ns-p4',
      name: 'Nokia 105 (2023)',
      price: 9500,
      image: 'img/products/nokia-105.jpg',
      category: 'smartphones',
      condition: 'New',
      stock: 32
    },
    {
      id: 'ns-p5',
      name: 'Nokia Power Earbuds Lite',
      price: 21000,
      image: 'img/products/nokia-earbuds.jpg',
      category: 'audio',
      condition: 'New',
      stock: 14
    }
  ],
  'china-mobile': [
    {
      id: 'cm-p1',
      name: 'Infinix Hot 30i',
      price: 62000,
      image: 'img/products/infinix-hot30i.jpg',
      category: 'smartphones',
      condition: 'New',
      stock: 25
    },
    {
      id: 'cm-p2',
      name: 'Tecno Spark 10 Pro',
      price: 89000,
      image: 'img/products/tecno-spark10.jpg',
      category: 'smartphones',
      condition: 'New',
      stock: 19
    },
    {
      id: 'cm-p3',
      name: 'Vivo Y36',
      price: 113000,
      image: 'img/products/vivo-y36.jpg',
      category: 'smartphones',
      condition: 'New',
      stock: 11
    },
    {
      id: 'cm-p4',
      name: 'Tecno Phantom V Fold',
      price: 430000,
      image: 'img/products/tecno-phantom.jpg',
      category: 'smartphones',
      condition: 'New',
      stock: 5
    },
    {
      id: 'cm-p5',
      name: 'Infinix Zero 30',
      price: 210000,
      image: 'img/products/infinix-zero30.jpg',
      category: 'smartphones',
      condition: 'New',
      stock: 8
    },
    {
      id: 'cm-p6',
      name: 'Tecno Camon 20 Premier',
      price: 182000,
      image: 'img/products/tecno-camon20.jpg',
      category: 'smartphones',
      condition: 'New',
      stock: 12
    },
    {
      id: 'cm-p7',
      name: 'Vivo Y22s',
      price: 92000,
      image: 'img/products/vivo-y22s.jpg',
      category: 'smartphones',
      condition: 'New',
      stock: 16
    }
  ],
  'huawei-stores': [
    {
      id: 'hs-p1',
      name: 'Huawei Mate 50 Pro',
      price: 520000,
      image: 'img/products/huawei-mate50.jpg',
      category: 'smartphones',
      condition: 'New',
      stock: 6
    },
    {
      id: 'hs-p2',
      name: 'Huawei MateBook X Pro',
      price: 950000,
      image: 'img/products/huawei-matebook.jpg',
      category: 'smartphones',
      condition: 'New',
      stock: 4
    },
    {
      id: 'hs-p3',
      name: 'Huawei MatePad Pro 12.6',
      price: 380000,
      image: 'img/products/huawei-matepad-pro.jpg',
      category: 'smartphones',
      condition: 'New',
      stock: 7
    },
    {
      id: 'hs-p4',
      name: 'Huawei Watch 4 Pro',
      price: 245000,
      image: 'img/products/huawei-watch4.jpg',
      category: 'accessories',
      condition: 'New',
      stock: 9
    },
    {
      id: 'hs-p5',
      name: 'Huawei FreeBuds Pro 3',
      price: 130000,
      image: 'img/products/huawei-freebuds-pro.jpg',
      category: 'audio',
      condition: 'New',
      stock: 13
    },
    {
      id: 'hs-p6',
      name: 'Huawei Sound Joy Speaker',
      price: 85000,
      image: 'img/products/huawei-speaker.jpg',
      category: 'audio',
      condition: 'New',
      stock: 11
    },
    {
      id: 'hs-p7',
      name: 'Huawei Vision S Smart TV (55")',
      price: 615000,
      image: 'img/products/huawei-tv.jpg',
      category: 'accessories',
      condition: 'New',
      stock: 3
    },
    {
      id: 'hs-p8',
      name: 'Huawei Mobile Router 4G',
      price: 37000,
      image: 'img/products/huawei-router.jpg',
      category: 'accessories',
      condition: 'New',
      stock: 15
    }
  ],
  // Add OLUMS Tech products
  'olums': [
    {
      id: 'olums-p1',
      name: 'iPhone 15 Pro',
      price: 1099000,
      image: 'img/iphone15pro.jpeg',
      category: 'smartphones',
      condition: 'New',
      stock: 10
    },
    {
      id: 'olums-p2',
      name: 'Galaxy S25 Ultra',
      price: 1180000,
      image: 'img/galaxyS25.jpeg',
      category: 'smartphones',
      condition: 'New',
      stock: 7
    },
    {
      id: 'olums-p3',
      name: 'Apple Airpods Pro',
      price: 179000,
      image: 'img/airpodspro.jpeg',
      category: 'audio',
      condition: 'New',
      stock: 15
    },
    {
      id: 'olums-p4',
      name: 'JBL Speaker',
      price: 59900,
      image: 'img/jblspeaker.jpeg',
      category: 'audio',
      condition: 'New',
      stock: 8
    },
    {
      id: 'olums-p5',
      name: 'iPhone Cases',
      price: 3999,
      image: 'img/iphonecase.jpeg',
      category: 'accessories',
      condition: 'New',
      stock: 25
    },
    {
      id: 'olums-p6',
      name: 'Powerbank',
      price: 29000,
      image: 'img/powerbank.jpeg',
      category: 'accessories',
      condition: 'New',
      stock: 18
    }
  ]
};

// Format price as Naira
function formatNaira(num) {
  num = Number(num);
  return '₦' + num.toLocaleString();
}

// We'll share the vendor object via window
window.addEventListener('DOMContentLoaded', function() {
  // Display products when tab is clicked
  document.getElementById('productsTab').addEventListener('click', loadProducts);

  // Set up filter functionality
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', function() {
      // Update active state
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      this.classList.add('active');

      // Filter products
      const filter = this.getAttribute('data-filter');
      loadProducts(filter);
    });
  });

  // Preload products in background
  setTimeout(() => loadProducts('all', true), 500);
});

// Load products with optional filter and silent mode
function loadProducts(filter = 'all', silent = false) {
  const productsGrid = document.getElementById('productsGrid');
  // Get current vendor ID from localStorage or use a default
  const currentVendorId = localStorage.getItem('selectedVendorId') || 'chinchun';
  const vendorProducts = PRODUCTS_DATA[currentVendorId] || [];

  // If silent mode and products are already loaded, don't do anything visible
  if (silent && productsGrid.children.length > 0) return;

  // Filter products if needed
  let filteredProducts = vendorProducts;
  if (typeof filter === 'string' && filter !== 'all') {
    filteredProducts = vendorProducts.filter(p => p.category === filter);
  } else if (typeof filter === 'object' && filter.target) {
    // Handle case when called from event listener
    const activeFilter = document.querySelector('.filter-pill.active');
    const filterValue = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
    if (filterValue !== 'all') {
      filteredProducts = vendorProducts.filter(p => p.category === filterValue);
    }
  }

  // Clear current products
  productsGrid.innerHTML = '';

  // Display loading placeholders if we have no products yet
  if (filteredProducts.length === 0) {
    productsGrid.innerHTML = '<div class="no-products">No products found in this category</div>';
    return;
  }

  // Create and append product cards
  filteredProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'300\\' viewBox=\\'0 0 400 300\\' fill=\\'none\\'%3E%3Crect width=\\'400\\' height=\\'300\\' fill=\\'%23f5f7fa\\'/%3E%3Crect x=\\'160\\' y=\\'120\\' width=\\'80\\' height=\\'80\\' rx=\\'40\\' fill=\\'%23e0e8f0\\'/%3E%3Crect x=\\'120\\' y=\\'80\\' width=\\'160\\' height=\\'160\\' rx=\\'80\\' stroke=\\'%23d0d8e0\\' stroke-width=\\'8\\' fill=\\'none\\'/%3E%3C/svg%3E';">
      <div class="product-details">
        <h3 class="product-title">${product.name}</h3>
        <div class="product-price">${formatNaira(product.price)}</div>
        <div class="product-meta">
          <span>${product.condition}</span>
          <span>${product.stock} in stock</span>
        </div>
      </div>
    `;

    // Add click handler
    productCard.addEventListener('click', function() {
      alert(`Viewing ${product.name}`);
      // In a real app, this would navigate to a product details page
      // window.location.href = `product-details.html?id=${product.id}`;
    });

    productsGrid.appendChild(productCard);
  });
}

// Add sample product images as fallbacks
function handleImageError(img) {
  img.src = 'img/product-placeholder.jpg';
}
