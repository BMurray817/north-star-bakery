// North Star Bakery - Touchstone 4

// Product data
const bakeryProducts = [
    { id: "signature-loaf", name: "Signature Loaf", category: "Artisan Breads" },
    { id: "whole-wheat", name: "Whole Wheat", category: "Artisan Breads" },
    { id: "sourdough", name: "Sourdough", category: "Artisan Breads" },

    { id: "croissant", name: "Croissant", category: "Pastries" },
    { id: "cinnamon-roll", name: "Cinnamon Roll", category: "Pastries" },
    { id: "fruit-danish", name: "Fruit Danish", category: "Pastries" },

    { id: "vanilla-cake", name: "Vanilla Cake", category: "Cakes and Celebrations" },
    { id: "chocolate-cake", name: "Chocolate Cake", category: "Cakes and Celebrations" },
    { id: "custom-cake", name: "Custom Cake", category: "Cakes and Celebrations" }
];

// Second array used to keep track of favorites
let favorites = [];


// -------------------------
// FAVORITES
// -------------------------

// Load saved favorites from localStorage
function loadFavorites() {
    const savedFavorites = localStorage.getItem("northStarFavorites");

    if (savedFavorites) {
        favorites = JSON.parse(savedFavorites);
    }

    displayFavorites();
    updateFavoriteButtons();
}


// Save favorites to localStorage
function saveFavorites() {
    localStorage.setItem(
        "northStarFavorites",
        JSON.stringify(favorites)
    );
}


// Add or remove a favorite
function toggleFavorite(productId) {
    const product = bakeryProducts.find(
        item => item.id === productId
    );

    if (!product) {
        return;
    }

    const existingFavorite = favorites.find(
        item => item.id === productId
    );

    if (existingFavorite) {
        favorites = favorites.filter(
            item => item.id !== productId
        );
    } else {
        favorites.push(product);
    }

    saveFavorites();
    displayFavorites();
    updateFavoriteButtons();
}


// Display favorites on the Products page
function displayFavorites() {
    const favoritesList = document.querySelector("#favorites-list");
    const emptyMessage = document.querySelector("#favorites-empty");

    if (!favoritesList || !emptyMessage) {
        return;
    }

    favoritesList.innerHTML = "";

    if (favorites.length === 0) {
        emptyMessage.hidden = false;
        return;
    }

    emptyMessage.hidden = true;

    favorites.forEach(product => {
        const listItem = document.createElement("li");

        listItem.textContent =
            `${product.name} — ${product.category}`;

        favoritesList.appendChild(listItem);
    });
}


// Update favorite button text
function updateFavoriteButtons() {
    const buttons = document.querySelectorAll(".favorite-button");

    buttons.forEach(button => {
        const productId = button.dataset.productId;

        const isFavorite = favorites.some(
            item => item.id === productId
        );

        if (isFavorite) {
            button.textContent = "Remove Favorite";
            button.setAttribute("aria-pressed", "true");
        } else {
            button.textContent = "Add to Favorites";
            button.setAttribute("aria-pressed", "false");
        }
    });
}


// Set up favorite buttons
function setupFavoriteButtons() {
    const buttons = document.querySelectorAll(".favorite-button");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            toggleFavorite(button.dataset.productId);
        });
    });
}


// -------------------------
// FORM VALIDATION
// -------------------------

// Show an error message near a form field
function showError(field, message) {
    const errorElement = document.querySelector(
        `#${field.id}-error`
    );

    if (errorElement) {
        errorElement.textContent = message;
    }

    field.setAttribute("aria-invalid", "true");
}


// Remove an error message
function clearError(field) {
    const errorElement = document.querySelector(
        `#${field.id}-error`
    );

    if (errorElement) {
        errorElement.textContent = "";
    }

    field.removeAttribute("aria-invalid");
}


// Validate the contact form
function validateContactForm(event) {
    const form = event.currentTarget;

    const nameField = form.querySelector("#customer-name");
    const emailField = form.querySelector("#customer-email");
    const detailsField = form.querySelector("#item-details");

    let formIsValid = true;

    clearError(nameField);
    clearError(emailField);
    clearError(detailsField);

    // Check 1: name must contain at least 2 characters
    if (nameField.value.trim().length < 2) {
        showError(
            nameField,
            "Please enter at least 2 characters for your name."
        );

        formIsValid = false;
    }

    // Check 2: email must use a valid format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailField.value.trim())) {
        showError(
            emailField,
            "Please enter a valid email address."
        );

        formIsValid = false;
    }

    // Check 3: request details must contain at least 10 characters
    if (detailsField.value.trim().length < 10) {
        showError(
            detailsField,
            "Please enter at least 10 characters about your request."
        );

        formIsValid = false;
    }

    // Stop the form from submitting if anything is invalid
    if (!formIsValid) {
        event.preventDefault();
    }
}


// Set up form validation
function setupFormValidation() {
    const contactForm = document.querySelector("#contact-form");

    if (!contactForm) {
        return;
    }

    contactForm.addEventListener(
        "submit",
        validateContactForm
    );
}


// -------------------------
// CONTACT INFORMATION STORAGE
// -------------------------

// Save the customer's name and email
function saveContactInfo() {
    const nameField = document.querySelector("#customer-name");
    const emailField = document.querySelector("#customer-email");

    if (!nameField || !emailField) {
        return;
    }

    const contactInfo = {
        name: nameField.value,
        email: emailField.value
    };

    localStorage.setItem(
        "northStarContactInfo",
        JSON.stringify(contactInfo)
    );
}


// Load saved name and email
function loadContactInfo() {
    const nameField = document.querySelector("#customer-name");
    const emailField = document.querySelector("#customer-email");

    if (!nameField || !emailField) {
        return;
    }

    const savedInfo = localStorage.getItem(
        "northStarContactInfo"
    );

    if (savedInfo) {
        const contactInfo = JSON.parse(savedInfo);

        nameField.value = contactInfo.name || "";
        emailField.value = contactInfo.email || "";
    }
}


// Save contact information as the user types
function setupContactStorage() {
    const nameField = document.querySelector("#customer-name");
    const emailField = document.querySelector("#customer-email");

    if (!nameField || !emailField) {
        return;
    }

    nameField.addEventListener(
        "input",
        saveContactInfo
    );

    emailField.addEventListener(
        "input",
        saveContactInfo
    );
}


// -------------------------
// PAGE SETUP
// -------------------------

document.addEventListener("DOMContentLoaded", function () {
    setupFavoriteButtons();
    loadFavorites();

    setupFormValidation();

    loadContactInfo();
    setupContactStorage();
});