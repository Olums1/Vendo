// JS for Vendor Profile
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('button').forEach(btn => {
        if (btn.textContent.includes('Edit Profile')) {
            btn.addEventListener('click', function() {
                alert('Edit Vendor Profile features coming soon!');
            });
        }
        if (btn.textContent.includes('Add Product')) {
            btn.addEventListener('click', function() {
                alert('Add Product form coming soon!');
            });
        }
        if (btn.textContent.includes('Add Promo')) {
            btn.addEventListener('click', function() {
                alert('Add Promotion form coming soon!');
            });
        }
    });
});
