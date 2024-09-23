document.addEventListener("DOMContentLoaded", function () {
    const productsContainer = document.getElementById("products");
    const cartSection = document.getElementById("cart");
    const checkoutSection = document.getElementById("checkout");
    const orderConfirmationSection = document.getElementById("order-confirmation");
    const cartItemsList = document.getElementById("cart-items");
    const checkoutForm = document.getElementById("checkout-form");
    const checkoutBtn = document.getElementById("checkout-btn");
    const totalPriceDisplay = document.getElementById("total-price");

    let cart = {};
    const products = [
        { name: "ADAM SMASHER PVC STATUE", price: 49.99, image: "https://gear.cdprojektred.com/cdn/shop/files/600x900_ADAMSTATUE1_600x900.jpg?v=1709109456" },
        { name: "JUDY ALVAREZ PVC STATUE", price: 60.00, image: "https://gear.cdprojektred.com/cdn/shop/files/600x900JUDYSTATUE3_600x900.jpg?v=1698249814" },
        { name: "PANAM PALMER PVC STATUE", price: 59.99, image: "https://gear.cdprojektred.com/cdn/shop/files/600x900PANAM2_600x900.jpg?v=1698250407" },
        { name: "SOLOMON REED PVC STATUE", price: 60.00, image: "https://gear.cdprojektred.com/cdn/shop/files/600x900REEDSTATUE5_600x900.jpg?v=1697699374" },
        { name: "PL GEAR COLLECTION", price: 180.00, image: "https://gear.cdprojektred.com/cdn/shop/products/Grid1_01e93978-77ed-42d6-90d0-b02e3e682c56_600x900.jpg?v=1695942754" },
        { name: "DAVID BHAI", price: 20.00, image: "https://gear.cdprojektred.com/cdn/shop/files/600x900_DAVIDPLUSH1_600x900.jpg?v=1707895215" },
        { name: "SAROJA", price: 20.00, image: "https://gear.cdprojektred.com/cdn/shop/files/600x900_LUCYPLUSH1_600x900.jpg?v=1707895386" },
        { name: "SAROJA CURTAIN", price: 35.00, image: "https://gear.cdprojektred.com/cdn/shop/files/600x900_LUCYCURTAIN4_600x900.jpg?v=1707218956" },
    ];
    products.forEach(product => {
        const card = createProductCard(product);
        productsContainer.appendChild(card);
    });

    productsContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("add-to-cart")) {
            const productCard = event.target.closest(".product-card");
            const productName = productCard.dataset.name;
            const productPrice = parseFloat(productCard.dataset.price);
            const productImage = productCard.dataset.image;

            addToCart(productName, productPrice, productImage);
        }
    });

    checkoutBtn.addEventListener("click", function() {
        if (Object.keys(cart).length > 0) {
            productsContainer.classList.add("hidden");
            checkoutBtn.style.display = "none";
            cartSection.style.display = "block";
            checkoutSection.style.display = "block";
            
            scrollToCheckout();
        } else {
            alert("Your shopping cart is empty.");
        }
    });

    checkoutForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const address = document.getElementById("address").value;
    
        if (Object.keys(cart).length > 0 && name && email && address) {
            showOrderConfirmation();
        } else {
            alert("Please ensure your cart is not empty and all form fields are filled.");
        }
    });
    
    function addToCart(name, price, image) {
        if (cart[name]) {
            cart[name].quantity += 1;
        } else {
            cart[name] = { price, image, quantity: 1 };
        }
        updateCartUI();
        scrollToCart();
    }

    function updateCartUI() {
        let items = Object.keys(cart);
        if (items.length > 0) {
            cartItemsList.innerHTML = items.map(name => {
                const { image, price, quantity } = cart[name];
                let quantityDropdown = '<select class="quantity-input" data-name="' + name + '">';
                for (let i = 1; i <= 10; i++) {
                    quantityDropdown += `<option value="${i}" ${i === quantity ? 'selected' : ''}>${i}</option>`;
                }
                quantityDropdown += '</select>';
                return `<li class="cart-item">
                    <img src="${image}" alt="${name}" class="cart-item-img">
                    <div class="product-details">
                        <span class="product-name-price">${name} - $${price.toFixed(2)}</span>
                        <span class="quantity-dropdown">Quantity: ${quantityDropdown}</span>
                    </div>
                    <button class="delete-item" data-name="${name}">🗑</button>
                </li>`;
            }).join("");
            cartSection.style.display = "block";
            calculateAndUpdateTotalPrice();
            attachEventListeners();
        } else {
            cartItemsList.innerHTML = "";
            cartSection.style.display = "none";
            if (checkoutSection.style.display === "block") {
                alert("Your cart is empty. You cannot proceed with the order.");
                window.location.href = "merchandise.html"; 
            }
        }
    }    
    
    function calculateAndUpdateTotalPrice() {
        let totalPrice = 0;
        Object.values(cart).forEach(item => {
            totalPrice += item.price * item.quantity;
        });
        totalPriceDisplay.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
    }

    function attachEventListeners() {
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', handleQuantityChange);
        });
        document.querySelectorAll(".delete-item").forEach(button => {
            button.addEventListener("click", handleDeleteItem);
        });
    }
    function handleQuantityChange(event) {
        const name = event.target.dataset.name;
        const newQuantity = parseInt(event.target.value, 10);
        if (newQuantity >= 1) {
            cart[name].quantity = newQuantity;
        } else {
            alert("Quantity must be at least 1.");
            return; 
        }
        updateCartUI();
    }

    function removeFromCart(name) {
        delete cart[name];
        updateCartUI();
    }

    function handleDeleteItem(event) {
        const itemName = event.target.dataset.name;
        removeFromCart(itemName);
    }

    function showOrderConfirmation() {
        checkoutSection.style.display = "none";
        orderConfirmationSection.style.display = "block";
        checkoutBtn.style.display = "none";
        cartSection.style.display = "none";
        const returnHomeButton = document.createElement("button"); 
        returnHomeButton.textContent = "Return to Home";
        returnHomeButton.classList.add("checkout-btn");
        returnHomeButton.addEventListener("click", function () {
            window.location.href = "merchandise.html";
        });
        orderConfirmationSection.appendChild(returnHomeButton);
    }

    function scrollToCart() {
        cartSection.scrollIntoView({ behavior: 'smooth' });
    }
    

    function scrollToCheckout() {
        const checkoutSection = document.getElementById("checkout");
        checkoutSection.scrollIntoView({ behavior: 'smooth' });
    }

   
    function createProductCard(product) {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.dataset.name = product.name;
        card.dataset.price = product.price.toFixed(2);
        card.dataset.image = product.image;

        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.name;
        img.classList.add("product-img");

        const name = document.createElement("h3");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.textContent = `$${product.price.toFixed(2)}`;
        price.classList.add("price");

        const addToCartBtn = document.createElement("button");
        addToCartBtn.textContent = "Add to Cart";
        addToCartBtn.classList.add("add-to-cart");

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(price);
        card.appendChild(addToCartBtn);

        return card;
    }
});
