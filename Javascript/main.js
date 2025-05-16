console.log("JavaScript is connected!");

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
// index.html - new arrivals view details
document.addEventListener('DOMContentLoaded', function() {
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
    const allProductDetails = document.querySelectorAll('.product-details'); // Select all details
    const productList = document.querySelector('.product-list');
    const prevButton = document.querySelector('.prev-arrivals');
    const nextButton = document.querySelector('.next-arrivals');

    // Functionality for "View Details" buttons
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation();
            const productItem = this.closest('.product-item');
            const targetDetails = productItem.querySelector('.product-details');

            allProductDetails.forEach(details => {
                if (details !== targetDetails) {
                    details.style.display = 'none';
                }
            });

            if (targetDetails) {
                targetDetails.style.display = targetDetails.style.display === 'none' ? 'block' : 'none';
            }
        });
    });

    // Functionality for "Close Details" buttons
    const closeDetailsButtons = document.querySelectorAll('.close-details-btn');
    closeDetailsButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation();
            const productItem = this.closest('.product-item');
            const details = productItem.querySelector('.product-details');
            if (details) {
                details.style.display = 'none';
            }
        });
    });

    // Functionality for the previous arrow button
    if (prevButton && productList) {
        prevButton.addEventListener('click', function() {
            productList.scrollLeft -= 320; // Adjust scroll amount as needed
        });
    }

    // Functionality for the next arrow button
    if (nextButton && productList) {
        nextButton.addEventListener('click', function() {
            productList.scrollLeft += 320; // Adjust scroll amount as needed
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburgerBtn');
  const nav = document.getElementById('navMenu');

  hamburger.addEventListener('click', function () {
    nav.classList.toggle('show');
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

// Grab the DOM elements
const cartNotification = document.getElementById('cart-notification');
const cartContainer = document.getElementById('cart-container');
const cartItems = document.getElementById('cart-items');
const openCartButton = document.getElementById('open-cart-button');
const closeCartButton = document.getElementById('close-cart-btn');

// Show the cart
function showCart() {
    cartContainer.style.display = 'block';
}

// Hide the cart
function hideCart() {
    cartContainer.style.display = 'none';
}

// Show notification
function showNotification(message) {
    cartNotification.textContent = message;
    cartNotification.style.display = 'block';

    setTimeout(() => {
        cartNotification.style.display = 'none';
    }, 2000); // Hide after 2 seconds
}

// Add item to cart
function addToCart(productId, productName) {
    const li = document.createElement('li');
    li.innerHTML = `
        ${productName}
        <button onclick="removeFromCart(this)">Remove</button>
    `;
    cartItems.appendChild(li);
    showNotification(`${productName} added to cart`);
}

// Remove item from cart
function removeFromCart(button) {
    const li = button.parentElement;
    li.remove();
    showNotification(`Item removed from cart`);
}

// Attach event listeners to all Add to Cart buttons
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function () {
        const productId = this.getAttribute('data-product-id');
        const productName = this.getAttribute('data-product-name');
        addToCart(productId, productName);
    });
});

// Open and close cart button functionality
openCartButton.addEventListener('click', showCart);
closeCartButton.addEventListener('click', hideCart);

// Hide cart and notification by default on load
window.addEventListener('DOMContentLoaded', () => {
    cartContainer.style.display = 'none';
    cartNotification.style.display = 'none';
});

// contact.html - Form Submission to Netlify
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const thankYouMessage = document.getElementById('thank-you-message');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default Netlify form handling

            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(new FormData(form)).toString(),
            })
            .then(() => {
                form.style.display = 'none'; // Hide the form
                thankYouMessage.style.display = 'block'; // Show the thank you message
            })
            .catch(error => console.error('Error:', error));
        });
    }
});