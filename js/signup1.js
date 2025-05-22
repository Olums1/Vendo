document.addEventListener('DOMContentLoaded', () => {
    // Get elements
    const signInBtn = document.querySelector('#signInBtn');
    const signUpBtn = document.querySelector('#signUpBtn');
    const userTypeSelection = document.querySelector('.user-type-selection');
    const serviceProviderBtn = document.querySelector('#serviceProviderBtn');
    const customerBtn = document.querySelector('#customerBtn');

    // Event listener for Sign Up button
    signUpBtn.addEventListener('click', () => {
        userTypeSelection.style.display = userTypeSelection.style.display === 'block' ? 'none' : 'block';
    });

    // Event listener for Sign In button
    signInBtn.addEventListener('click', () => {
        // Redirect to sign in page
        window.location.href = 'signin.html';
    });

    // Event listeners for user type buttons
    serviceProviderBtn.addEventListener('click', () => {
        window.location.href = 'service-provider-signup.html';
    });

    customerBtn.addEventListener('click', () => {
        window.location.href = 'customer-signup.html';
    });
});
