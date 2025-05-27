// Sidebar and logout interactions for customer profile page

document.addEventListener('DOMContentLoaded', function () {
    // Sidebar toggle elements
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');

    // Attach handlers only if all exist
    if (sidebarToggle && sidebar && sidebarOverlay) {
        sidebarToggle.addEventListener('click', function () {
            sidebar.classList.add('active');
            sidebarOverlay.classList.add('active');
        });
        sidebarOverlay.addEventListener('click', function () {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        });
        window.addEventListener('resize', function () {
            if (window.innerWidth > 768) {
                sidebar.classList.remove('active');
                sidebarOverlay.classList.remove('active');
            }
        });
    }

    // Logout functionality
    const logoutLink = document.querySelector('a[href="signin.html"], a[href="./signin.html"]');
    if (logoutLink) {
        logoutLink.addEventListener('click', function (e) {
            e.preventDefault();
            // Clear storage
            localStorage.clear();
            sessionStorage.clear();
            // Redirect to signin page
            window.location.href = 'signin.html';
        });
    }
});
