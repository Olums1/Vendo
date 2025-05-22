document.addEventListener('DOMContentLoaded', () => {
    // Get form elements
    const signinForm = document.getElementById('signinForm');
    const emailOrUsernameInput = document.getElementById('emailOrUsername');
    const passwordInput = document.getElementById('password');
    const emailOrUsernameError = document.getElementById('emailOrUsernameError');
    const passwordError = document.getElementById('passwordError');
    const togglePasswordButton = document.querySelector('.toggle-password');
    
    // Add functionality to toggle password visibility
    if (togglePasswordButton) {
        togglePasswordButton.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
        });
    }
    
    // Form validation functions
    function validateEmailOrUsername(value) {
        return value.trim().length >= 3;
    }
    
    function validatePassword(password) {
        return password.length >= 6;
    }
    
    // Add input event listeners for real-time validation
    emailOrUsernameInput.addEventListener('input', function() {
        if (!validateEmailOrUsername(this.value) && this.value.trim() !== '') {
            emailOrUsernameError.textContent = 'Please enter a valid email or username (at least 3 characters)';
        } else {
            emailOrUsernameError.textContent = '';
        }
    });
    
    passwordInput.addEventListener('input', function() {
        if (!validatePassword(this.value) && this.value !== '') {
            passwordError.textContent = 'Password must be at least 6 characters';
        } else {
            passwordError.textContent = '';
        }
    });
    
    // Handle form submission
    signinForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        let isValid = true;
        
        // Validate email or username
        if (!validateEmailOrUsername(emailOrUsernameInput.value.trim())) {
            emailOrUsernameError.textContent = 'Please enter a valid email or username';
            isValid = false;
        } else {
            emailOrUsernameError.textContent = '';
        }
        
        // Validate password
        if (!validatePassword(passwordInput.value)) {
            passwordError.textContent = 'Password must be at least 6 characters';
            isValid = false;
        } else {
            passwordError.textContent = '';
        }
        
        if (isValid) {
            // In a real app, this would send the credentials to a server for authentication
            // For demo purposes, we'll just simulate a successful login
            const mockSignIn = () => {
                // Store user data in localStorage (in a real app, this would be a JWT token or similar)
                const userData = {
                    name: emailOrUsernameInput.value.trim().split('@')[0], // Extract username from email
                    isLoggedIn: true
                };
                //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-
                localStorage.setItem('userName', userData.name);
                if (!localStorage.getItem('userType')) localStorage.setItem('userType', 'customer');//-=-=-=-=-=-=-=-
                
                // Redirect to dashboard
                window.location.href = 'index.html';
            };
            
            // Simulate a sign-in delay (would be an API call in a real app)
            setTimeout(() => {
                mockSignIn();
            }, 500);
        }
    });
    
    // If user is already logged in, redirect to dashboard
    const checkLoginStatus = () => {
        const userName = localStorage.getItem('userName');
        if (userName) {
            window.location.href = 'index.html';
        }
    };
    
    // Check login status when the page loads
    checkLoginStatus();
});
