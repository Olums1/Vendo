// List of Nigerian States
const nigerianStates = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "FCT - Abuja",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara"
];

// Sort states alphabetically (they're already sorted, but just to be sure)
nigerianStates.sort();

// Wait for DOM to be fully loaded before populating the select
document.addEventListener('DOMContentLoaded', () => {
    // Find all state select dropdowns
    const stateSelects = document.querySelectorAll('select[name="state"]');

    // Populate each dropdown with the states
    stateSelects.forEach(select => {
        nigerianStates.forEach(state => {
            const option = document.createElement('option');
            option.value = state;
            option.textContent = state;
            select.appendChild(option);
        });
    });
});
