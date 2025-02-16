document.addEventListener("DOMContentLoaded", function () {
    // Elements
    const budgetInput = document.getElementById("budget");
    const remainingBudgetSpan = document.getElementById("remaining-budget");
    const saveBudgetButton = document.createElement("button");
    saveBudgetButton.textContent = "Save Budget";
    saveBudgetButton.className = "px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition";
    budgetInput.insertAdjacentElement("afterend", saveBudgetButton);

    const searchInput = document.getElementById("search");
    const searchResults = document.getElementById("search-results");
    const clearSearchButton = document.getElementById("clear-search-results");

    const cartItemsList = document.getElementById("cart-items");
    const totalPriceSpan = document.getElementById("total-price");

    const checkoutButton = document.getElementById("checkout");
    const clearCartButton = document.getElementById("clear-cart");

    const customNameInput = document.getElementById("custom-name");
    const customPriceInput = document.getElementById("custom-price");
    const addCustomItemButton = document.getElementById("add-custom-item");

    const resetAppButton = document.getElementById("reset-app");
    const signOutButton = document.getElementById("signout-button");
    const clearBudgetButton = document.getElementById("clear-budget");

    let budget = localStorage.getItem("budget") ? parseFloat(localStorage.getItem("budget")) : 0;
    let remainingBudget = budget;
    let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    let customItems = localStorage.getItem("customItems") ? JSON.parse(localStorage.getItem("customItems")) : [];

    const defaultProducts = [
        { name: "Apple", price: 1.5 },
        { name: "Banana", price: 0.9 },
        { name: "Milk", price: 2.3 },
        { name: "Bread", price: 2.0 },
        { name: "Eggs", price: 3.5 },
        { name: "Orange", price: 1.2 },
        { name: "Potatoes", price: 1.0 },
        { name: "Tomato", price: 2.5 },
        { name: "Cucumber", price: 1.7 },
        { name: "Carrot", price: 1.3 },
        { name: "Lettuce", price: 2.0 },
        { name: "Onion", price: 1.8 },
        { name: "Spinach", price: 2.2 },
        { name: "Chicken Breast", price: 5.0 },
        { name: "Beef Steak", price: 7.0 },
        { name: "Salmon", price: 8.5 },
        { name: "Tuna", price: 4.5 },
        { name: "Pork Chop", price: 6.0 },
        { name: "Bacon", price: 4.0 },
        { name: "Hot Dog", price: 3.2 },
        { name: "Cheddar Cheese", price: 3.8 },
        { name: "Mozzarella", price: 4.0 },
        { name: "Yogurt", price: 2.0 },
        { name: "Butter", price: 3.0 },
        { name: "Cream Cheese", price: 2.8 },
        { name: "Ice Cream", price: 5.0 },
        { name: "Pizza", price: 6.5 },
        { name: "Frozen Fries", price: 2.3 },
        { name: "Lasagna", price: 8.0 },
        { name: "Spaghetti", price: 1.5 },
        { name: "Rice", price: 1.2 },
        { name: "Pasta", price: 1.8 },
        { name: "Cereal", price: 3.5 },
        { name: "Oats", price: 2.0 },
        { name: "Granola", price: 4.0 },
        { name: "Canned Beans", price: 1.0 },
        { name: "Canned Corn", price: 1.0 },
        { name: "Canned Soup", price: 1.5 },
        { name: "Canned Tuna", price: 1.2 },
        { name: "Peanut Butter", price: 2.5 },
        { name: "Jam", price: 2.5 },
        { name: "Honey", price: 3.5 },
        { name: "Salt", price: 0.5 },
        { name: "Sugar", price: 1.0 },
        { name: "Flour", price: 1.8 },
        { name: "Baking Powder", price: 1.0 },
        { name: "Vanilla Extract", price: 4.5 },
        { name: "Olive Oil", price: 5.0 },
        { name: "Vegetable Oil", price: 2.0 },
        { name: "Vinegar", price: 1.5 },
        { name: "Soy Sauce", price: 2.0 },
        { name: "Hot Sauce", price: 1.7 },
        { name: "Mustard", price: 1.0 },
        { name: "Ketchup", price: 1.5 },
        { name: "Mayonnaise", price: 2.5 },
        { name: "Toothpaste", price: 2.0 },
        { name: "Shampoo", price: 3.0 },
        { name: "Conditioner", price: 3.0 },
        { name: "Soap", price: 1.5 },
        { name: "Dish Soap", price: 2.0 },
        { name: "Laundry Detergent", price: 4.0 },
        { name: "Toilet Paper", price: 3.5 },
        { name: "Paper Towels", price: 3.0 },
        { name: "Trash Bags", price: 2.0 },
        { name: "Aluminum Foil", price: 1.5 },
        { name: "Plastic Wrap", price: 1.0 },
        { name: "Ziploc Bags", price: 2.5 },
        { name: "Sponges", price: 2.0 },
        { name: "Toilet Cleaner", price: 3.0 },
        { name: "Disinfecting Wipes", price: 2.5 },
        { name: "Clorox", price: 2.8 },
        { name: "Gloves", price: 3.0 },
        { name: "Light Bulbs", price: 1.2 },
        { name: "Batteries", price: 4.0 },
        { name: "Extension Cord", price: 5.0 },
        { name: "Phone Charger", price: 8.0 },
        { name: "Earphones", price: 10.0 },
        { name: "Laptop", price: 500.0 },
        { name: "Coffee", price: 4.5 },
        { name: "Tea", price: 2.5 },
        { name: "Juice", price: 3.0 },
        { name: "Water Bottles", price: 1.0 },
        { name: "Soda", price: 1.5 },
        { name: "Wine", price: 15.0 },
        { name: "Beer", price: 12.0 },
        { name: "Whiskey", price: 25.0 },
        { name: "Rum", price: 20.0 },
        { name: "Vodka", price: 18.0 },
        { name: "Tequila", price: 22.0 },
        { name: "Cigarettes", price: 10.0 },
        { name: "Cigars", price: 15.0 },
        { name: "Lighter", price: 1.5 },
        { name: "Matches", price: 1.0 },
        { name: "Tissues", price: 2.0 },
        { name: "Gum", price: 1.2 },
        { name: "Candy", price: 2.5 },
        { name: "Chocolate", price: 3.0 },
        { name: "Cookies", price: 2.0 },
        { name: "Chips", price: 1.8 },
        { name: "Popcorn", price: 2.0 },
        { name: "Nuts", price: 3.5 },
        { name: "Granola Bars", price: 2.5 },
        { name: "Protein Bars", price: 3.0 },
        { name: "Rice Cakes", price: 2.0 },
        { name: "Trail Mix", price: 4.0 },
        { name: "Jerky", price: 5.0 },
        { name: "Frozen Vegetables", price: 2.0 },
        { name: "Frozen Fruit", price: 3.0 },
        { name: "Frozen Meals", price: 4.5 },
        { name: "Frozen Pizza", price: 6.0 },
        { name: "Frozen Breakfast", price: 3.5 },
        { name: "Frozen Snacks", price: 2.5 },// default products list...
    ];

    function updateBudgetDisplay() {
        remainingBudgetSpan.textContent = remainingBudget.toFixed(2);
        budgetInput.value = budget;
    }

    function updateCartDisplay() {
        cartItemsList.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.className = "flex justify-between items-center bg-white p-3 border-b";

            li.innerHTML = `
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <button class="remove-item px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition" data-index="${index}">Remove</button>
            `;
            cartItemsList.appendChild(li);
            total += item.price;
        });

        totalPriceSpan.textContent = total.toFixed(2);

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                remainingBudget += cart[index].price;
                cart.splice(index, 1);
                saveCart();
                updateCartDisplay();
                updateBudgetDisplay();
            });
        });
    }

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Save Budget
    saveBudgetButton.addEventListener("click", function () {
        budget = parseFloat(budgetInput.value);
        remainingBudget = budget;
        localStorage.setItem("budget", budget);
        updateBudgetDisplay();
    });

    // Add Custom Item
    addCustomItemButton.addEventListener("click", function () {
        const customName = customNameInput.value.trim();
        const customPrice = parseFloat(customPriceInput.value.trim());

        if (customName && !isNaN(customPrice) && customPrice > 0) {
            const newCustomItem = { name: customName, price: customPrice };
            customItems.push(newCustomItem);
            localStorage.setItem("customItems", JSON.stringify(customItems));
            customNameInput.value = "";
            customPriceInput.value = "";
            updateSearchResults();
        }
    });

    // Update Search Results
    function updateSearchResults() {
        const searchQuery = searchInput.value.toLowerCase();
        searchResults.innerHTML = "";

        const filteredProducts = [
            ...defaultProducts,
            ...customItems,
        ].filter(product => product.name.toLowerCase().includes(searchQuery));

        filteredProducts.forEach(product => {
            const li = document.createElement("li");
            li.className = "flex justify-between items-center p-3 bg-gray-100";
            li.innerHTML = `
                <span>${product.name} - $${product.price.toFixed(2)}</span>
                <button class="add-to-cart px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition" data-product='${JSON.stringify(product)}'>Add to Cart</button>
            `;
            searchResults.appendChild(li);
        });

        document.querySelectorAll(".add-to-cart").forEach(button => {
            button.addEventListener("click", function () {
                const product = JSON.parse(this.getAttribute("data-product"));
                if (remainingBudget >= product.price) {
                    cart.push(product);
                    remainingBudget -= product.price;
                    saveCart();
                    updateCartDisplay();
                    updateBudgetDisplay();
                } else {
                    alert("You don't have enough budget.");
                }
            });
        });
    }

    searchInput.addEventListener("input", updateSearchResults);
    clearSearchButton.addEventListener("click", () => {
        searchInput.value = "";
        searchResults.innerHTML = "";
    });

    clearCartButton.addEventListener("click", function () {
        cart = [];
        saveCart();
        updateCartDisplay();
        remainingBudget = budget;
        updateBudgetDisplay();
    });

    checkoutButton.addEventListener("click", function () {
        if (cart.length > 0) {
            alert("Checkout successful!");
            cart = [];
            saveCart();
            updateCartDisplay();
            remainingBudget = budget;
            updateBudgetDisplay();
        } else {
            alert("Your cart is empty.");
        }
    });

    // Clear Budget
    clearBudgetButton.addEventListener("click", function () {
        budget = 0;
        remainingBudget = 0;
        localStorage.setItem("budget", budget);
        updateBudgetDisplay();
    });

    // Reset App
    resetAppButton.addEventListener("click", function () {
        localStorage.clear(); // Clear all localStorage items
        budget = 0;
        remainingBudget = 0;
        cart = [];
        customItems = [];
        updateBudgetDisplay();
        updateCartDisplay();
    });

    signOutButton.addEventListener("click", function () {
        // Clear the localStorage
        localStorage.clear();
    
        // Redirect to the login page (replace 'login.html' with the actual path of your login page)
        window.location.href = "login.html"; // Make sure to use the correct path to your login page
    });
    
    

    // Initialize App
    updateBudgetDisplay();
    updateCartDisplay();
});

