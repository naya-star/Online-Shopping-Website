// index.html - Full-Width Fading Slideshow for Flash Sale
let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.querySelectorAll(".header-flash-sale .mySlides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}
// index.html - Horizontal New Arrivals Carousel
const arrivalsCarousel = document.querySelector('.new-arrivals .product-list');
const prevArrivalsButton = document.querySelector('.prev-arrivals');
const nextArrivalsButton = document.querySelector('.next-arrivals');

if (arrivalsCarousel && prevArrivalsButton && nextArrivalsButton) {
    const itemWidthWithMargin = 220; // Adjust this value to match item width + margin-right in CSS

    prevArrivalsButton.addEventListener('click', () => {
        arrivalsCarousel.scrollLeft -= itemWidthWithMargin;
    });

    nextArrivalsButton.addEventListener('click', () => {
        arrivalsCarousel.scrollLeft += itemWidthWithMargin;
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
        item.style.display = 'grid'; // Or 'block', whichever you are using in your CSS
    });

    const categorySelect = document.getElementById('categorySelect');
    if (categorySelect) {
        categorySelect.addEventListener('change', () => {
            const selectedCategory = categorySelect.value;
            filterProducts(selectedCategory);
        });
    }
});
// index.html - new arrivals view details
document.addEventListener('DOMContentLoaded', function() {
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');

    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productItem = this.closest('.product-item');
            const details = productItem.querySelector('.product-details');
            if (details) {
                details.style.display = details.style.display === 'none' ? 'block' : 'none';
            }
        });
    });

    const closeDetailsButtons = document.querySelectorAll('.close-details-btn');
    closeDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productItem = this.closest('.product-item');
            const details = productItem.querySelector('.product-details');
            if (details) {
                details.style.display = 'none';
            }
        });
    });
});
// product.html - Filter Products by Category
function filterProducts(category) {
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'grid'; // Or 'block'
        } else {
            item.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartNotification = document.getElementById('cart-notification');
    const cartContainer = document.getElementById('cart-container');
    const cartItemsList = document.getElementById('cart-items');
    const openCartButton = document.getElementById('open-cart-button');
    const closeCartButton = document.getElementById('close-cart-btn');

    console.log("DOM is fully loaded and parsed"); // Add this line

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log("Add to Cart button clicked!"); // Add this line
            const productId = this.dataset.productId;
            const productName = this.dataset.productName;

            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ id: productId, name: productName, quantity: 1 });
            }

            updateCartDisplay();
            showNotification(`${productName} added to cart!`);
        });
    });

    openCartButton.addEventListener('click', () => {
        console.log("Open Cart button clicked!"); // Add this line
        cartContainer.style.display = 'block';
    });

    closeCartButton.addEventListener('click', () => {
        cartContainer.style.display = 'none';
    });

    let cart = []; // Array to store cart items (each item could be an object with id, name, quantity)

    function showNotification(message) {
        cartNotification.textContent = message;
        cartNotification.style.display = 'block';
        setTimeout(() => {
            cartNotification.style.display = 'none';
        }, 3000); // Hide after 3 seconds
    }

    function updateCartDisplay() {
        cartItemsList.innerHTML = ''; // Clear the current cart display
        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} (Quantity: ${item.quantity})`;

            const incrementButton = document.createElement('button');
            incrementButton.textContent = '+';
            incrementButton.addEventListener('click', () => {
                item.quantity++;
                updateCartDisplay();
            });

            const decrementButton = document.createElement('button');
            decrementButton.textContent = '-';
            decrementButton.addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                    updateCartDisplay();
                } else {
                    // Optionally remove the item if quantity is 1 and decrement is clicked
                    cart = cart.filter(cartItem => cartItem.id !== item.id);
                    updateCartDisplay();
                }
            });

            listItem.appendChild(document.createTextNode(' ')); // Add some space
            listItem.appendChild(decrementButton);
            listItem.appendChild(document.createTextNode(' '));
            listItem.appendChild(incrementButton);

            cartItemsList.appendChild(listItem);
        });
    }

    // Optional: Initialize cart from local storage on page load
    const storedCart = localStorage.getItem('shoppingCart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCartDisplay();
    }

    // Optional: Save cart to local storage whenever it changes
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    });
});
// contact.html - Basic Form Submission Feedback
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm && formMessage) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Simulate form submission (replace with actual backend logic)
        formMessage.textContent = 'Sending message...';
        setTimeout(() => {
            formMessage.textContent = 'Message sent successfully!';
            formMessage.classList.add('success'); // You might want to add a success class in CSS
            contactForm.reset();
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.classList.remove('success');
            }, 3000); // Clear message after 3 seconds
        }, 1500); // Simulate a 1.5-second sending time
    });
}