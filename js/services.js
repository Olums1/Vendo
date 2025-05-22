// This script manages the service category dropdown

document.addEventListener('DOMContentLoaded', () => {
    const businessSelect = document.getElementById('business');

    if (businessSelect) {
        // Basic functionality for dropdown, no icons or visual enhancements
        businessSelect.addEventListener('change', () => {
            // Just handle the selection change, no visual preview
            const selectedValue = businessSelect.value;
            // Custom logic for when selection changes can be added here if needed
        });
    }
});
