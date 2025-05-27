document.addEventListener('DOMContentLoaded', () => {
    // Get all forms
    const serviceProviderForm = document.getElementById('serviceProviderForm');
    const customerForm = document.getElementById('customerForm');

    // Get all password toggle buttons
    const toggleButtons = document.querySelectorAll('.toggle-password');

    // Add functionality to toggle password visibility
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
        });
    });

    // Form validation functions
    function validateName(name) {
        return name.length >= 3;
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePhone(phone) {
        // Nigerian phone number format validation
        const phoneRegex = /^([0-9]{11})$/;
        return phoneRegex.test(phone);
    }

    function validatePassword(password) {
        // Password must be at least 8 characters and include at least one number and one letter
        return password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
    }

    function validateConfirmPassword(password, confirmPassword) {
        return password === confirmPassword;
    }

    function validateForm(form) {
        let isValid = true;

        // Validate name
        const nameInput = form.querySelector('#name');
        const nameError = form.querySelector('#nameError');
        if (!validateName(nameInput.value.trim())) {
            nameError.textContent = 'Name must be at least 3 characters';
            isValid = false;
        } else {
            nameError.textContent = '';
        }

        // Validate email
        const emailInput = form.querySelector('#email');
        const emailError = form.querySelector('#emailError');
        if (!validateEmail(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        } else {
            emailError.textContent = '';
        }

        // Validate state selection
        const stateSelect = form.querySelector('#state');
        if (stateSelect) {
            // Customer form validation
            const stateError = form.querySelector('#stateError');
            if (!stateSelect.value) {
                stateError.textContent = 'Please select your state';
                isValid = false;
            } else {
                stateError.textContent = '';
            }
        }

        // Validate phone
        const phoneInput = form.querySelector('#phone');
        const phoneError = form.querySelector('#phoneError');
        if (!validatePhone(phoneInput.value.trim())) {
            phoneError.textContent = 'Please enter a valid 11-digit phone number';
            isValid = false;
        } else {
            phoneError.textContent = '';
        }

        // Validate business/service (only for service provider)
        const businessInput = form.querySelector('#business');
        if (businessInput) {
            const businessError = form.querySelector('#businessError');
            if (businessInput.value.trim().length < 3) {
                businessError.textContent = 'Please describe your service (at least 3 characters)';
                isValid = false;
            } else {
                businessError.textContent = '';
            }
        }

        // Validate password
        const passwordInput = form.querySelector('#password');
        const passwordError = form.querySelector('#passwordError');
        if (!validatePassword(passwordInput.value)) {
            passwordError.textContent = 'Password must be at least 8 characters and include numbers and letters';
            isValid = false;
        } else {
            passwordError.textContent = '';
        }

        // Validate confirm password
        const confirmPasswordInput = form.querySelector('#confirmPassword');
        const confirmPasswordError = form.querySelector('#confirmPasswordError');
        if (!validateConfirmPassword(passwordInput.value, confirmPasswordInput.value)) {
            confirmPasswordError.textContent = 'Passwords do not match';
            isValid = false;
        } else {
            confirmPasswordError.textContent = '';
        }

        return isValid;
    }

    // Add input event listeners for real-time validation
    function addInputListeners(form) {
        // Name validation
        const nameInput = form.querySelector('#name');
        nameInput.addEventListener('input', function() {
            const nameError = form.querySelector('#nameError');
            if (!validateName(this.value.trim()) && this.value.trim() !== '') {
                nameError.textContent = 'Name must be at least 3 characters';
            } else {
                nameError.textContent = '';
            }
        });

        // Email validation
        const emailInput = form.querySelector('#email');
        emailInput.addEventListener('input', function() {
            const emailError = form.querySelector('#emailError');
            if (!validateEmail(this.value.trim()) && this.value.trim() !== '') {
                emailError.textContent = 'Please enter a valid email address';
            } else {
                emailError.textContent = '';
            }
        });

        // Phone validation
        const phoneInput = form.querySelector('#phone');
        phoneInput.addEventListener('input', function() {
            const phoneError = form.querySelector('#phoneError');
            if (!validatePhone(this.value.trim()) && this.value.trim() !== '') {
                phoneError.textContent = 'Please enter a valid 11-digit phone number';
            } else {
                phoneError.textContent = '';
            }
        });

        // Business validation (only for service provider)
        const businessInput = form.querySelector('#business');
        if (businessInput) {
            businessInput.addEventListener('input', function() {
                const businessError = form.querySelector('#businessError');
                if (this.value.trim().length < 3 && this.value.trim() !== '') {
                    businessError.textContent = 'Please describe your service (at least 3 characters)';
                } else {
                    businessError.textContent = '';
                }
            });
        }

        // Password validation
        const passwordInput = form.querySelector('#password');
        passwordInput.addEventListener('input', function() {
            const passwordError = form.querySelector('#passwordError');
            if (!validatePassword(this.value) && this.value !== '') {
                passwordError.textContent = 'Password must be at least 8 characters and include numbers and letters';
            } else {
                passwordError.textContent = '';
            }

            // Also update confirm password validation if it has a value
            const confirmPasswordInput = form.querySelector('#confirmPassword');
            const confirmPasswordError = form.querySelector('#confirmPasswordError');
            if (confirmPasswordInput.value !== '') {
                if (!validateConfirmPassword(this.value, confirmPasswordInput.value)) {
                    confirmPasswordError.textContent = 'Passwords do not match';
                } else {
                    confirmPasswordError.textContent = '';
                }
            }
        });

        // Confirm password validation
        const confirmPasswordInput = form.querySelector('#confirmPassword');
        confirmPasswordInput.addEventListener('input', function() {
            const passwordInput = form.querySelector('#password');
            const confirmPasswordError = form.querySelector('#confirmPasswordError');
            if (!validateConfirmPassword(passwordInput.value, this.value)) {
                confirmPasswordError.textContent = 'Passwords do not match';
            } else {
                confirmPasswordError.textContent = '';
            }
        });
    }

    // Add form submission handlers
    if (serviceProviderForm) {
        addInputListeners(serviceProviderForm);

        serviceProviderForm.addEventListener('submit', function(event) {
            event.preventDefault();

            if (validateForm(this)) {
                // Save user data to localStorage
                const name = this.querySelector('#name').value;
                localStorage.setItem('userName', name);
                // Redirect to dashboard
                window.location.href = 'index.html';
            }
        });
    }

    if (customerForm) {
        addInputListeners(customerForm);

        customerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            if (validateForm(this)) {
                // Save user data to localStorage
                const name = this.querySelector('#name').value;
                localStorage.setItem('userName', name);
                localStorage.setItem('userType', 'customer');
                // Redirect to dashboard
                window.location.href = 'index.html';
            }
        });
    }
});
