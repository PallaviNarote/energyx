const API_URL = "http://localhost:5000";

let cart = [];


// ======================================
// LOAD PRODUCTS FROM BACKEND
// ======================================

async function loadProducts() {

    const container = document.getElementById("productContainer");

    try {

        console.log("Loading products...");

        const response = await fetch(
            `${API_URL}/api/products`
        );

        if (!response.ok) {
            throw new Error("Failed to load products");
        }

        const products = await response.json();

        console.log("Products received:", products);

        container.innerHTML = "";

        products.forEach(function(product) {

            const card = document.createElement("div");

            card.className = "product-card";

            card.innerHTML = `
                
                <div class="product-image">
                    <img src="image/img${product.id}.png" alt="${product.name}">
                </div>

                <h3>${product.name}</h3>

                <p>${product.category}</p>

                <div class="price">
                    ₹${product.price}
                </div>

                <button class="add-button">
                    Add To Cart
                </button>

            `;

            // Find the Add To Cart button
            const button =
                card.querySelector(".add-button");

            // Add click event
            button.addEventListener("click", function() {

                addToCart(product);

            });

            container.appendChild(card);

        });

    } catch (error) {

        console.error(
            "Product loading error:",
            error
        );

        container.innerHTML = `

            <div style="
                grid-column: 1 / -1;
                text-align: center;
                padding: 50px;
            ">

                <h3 style="color:#ff3b30;">
                    Products could not be loaded
                </h3>

                <p style="color:#aaa;">
                    Please check the browser console.
                </p>

            </div>

        `;

    }
}


// ======================================
// ADD TO CART
// ======================================

function addToCart(product) {

    console.log(
        "Adding to cart:",
        product
    );

    const existingProduct =
        cart.find(function(item) {

            return item.id === product.id;

        });


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            category: product.category,

            quantity: 1

        });

    }


    updateCart();

}


// ======================================
// UPDATE CART COUNT
// ======================================

function updateCart() {

    const cartCount =
        document.getElementById("cartCount");


    const totalItems =
        cart.reduce(

            function(total, item) {

                return total + item.quantity;

            },

            0

        );


    cartCount.textContent = totalItems;


    displayCart();

}


// ======================================
// DISPLAY CART
// ======================================

function displayCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");


    if (!cartItems || !cartTotal) {
        return;
    }


    cartItems.innerHTML = "";


    // Empty cart

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <p class="empty-cart">
                Your cart is empty.
            </p>

        `;

        cartTotal.textContent = "0";

        return;
    }


    let total = 0;


    cart.forEach(function(item) {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;


        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ₹${item.price} × ${item.quantity}
                </p>

            </div>


            <div class="cart-item-right">

                <strong>
                    ₹${itemTotal}
                </strong>

                <button class="remove-button">
                    Remove
                </button>

            </div>

        `;


        const removeButton =
            cartItem.querySelector(
                ".remove-button"
            );


        removeButton.addEventListener(
            "click",
            function() {

                removeFromCart(item.id);

            }
        );


        cartItems.appendChild(cartItem);

    });


    cartTotal.textContent = total;

}


// ======================================
// REMOVE FROM CART
// ======================================

function removeFromCart(id) {

    cart =
        cart.filter(function(item) {

            return item.id !== id;

        });


    updateCart();

}


// ======================================
// OPEN CART
// ======================================

function openCart() {

    const cartPanel =
        document.getElementById("cartPanel");


    cartPanel.classList.add("active");


    displayCart();

}


// ======================================
// CLOSE CART
// ======================================

function closeCart() {

    const cartPanel =
        document.getElementById("cartPanel");


    cartPanel.classList.remove("active");

}


// ======================================
// CHECKOUT
// ======================================

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    alert(
        "Checkout feature will be added soon!"
    );

}


// ======================================
// CONTACT FORM
// ======================================

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const name =
                document.getElementById("name").value;


            const email =
                document.getElementById("email").value;


            const message =
                document.getElementById("message").value;


            try {

                const response =
                    await fetch(
                        `${API_URL}/api/contact`,
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({
                                    name,
                                    email,
                                    message
                                })

                        }
                    );


                const data =
                    await response.json();


                document
                    .getElementById("formMessage")
                    .textContent =
                    data.message;


                contactForm.reset();

            } catch (error) {

                console.error(error);

                document
                    .getElementById("formMessage")
                    .textContent =
                    "Unable to send message.";

            }

        }
    );

}


// ======================================
// START WEBSITE
// ======================================

loadProducts();