import { handleCheckoutButton } from './cart-summary-handler.js';

// Assuming 'allShopProducts' is globally available (e.g., imported from products.js)
const cartItemsEl = document.getElementById("cartItems");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCart() {
  cartItemsEl.innerHTML = "";

  const cartSummary = document.querySelector(".vv-cart-summary");

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="text-center py-5">
        <h5 class="text-muted">🛒 Your cart is empty.</h5>
        <p>Add some items to get started.</p>
        <a href="products.html" class="btn btn-dark mt-3">Go to Shop</a>
      </div>
    `;

    if (cartSummary) {
      cartSummary.innerHTML = ""; // clear summary section
    }

    return; // stop execution if cart is empty
  }

  let subtotal = 0;
  const deliveryFee = 15;

  cart.forEach((item, index) => {
    const product = allShopProducts.find(p => p.id === item.id);
    const price = product.price * item.quantity;
    subtotal += price;

    const colorName = product.colors.find(c => c.code === item.selectedColor)?.name || "Default";

    const itemHTML = `
      <div class="d-flex flex-column flex-md-row gap-3 border-bottom pb-3 mb-3">
        <img src="${product.colors[0].images[0]}" alt="Product" class="vv-cart-img rounded" width="80">
        <div class="flex-grow-1">
          <h6 class="fw-bold mb-1">${product.name}</h6>
          <div class="text-muted small">Size: ${item.selectedSize || "Default"}</div>
          <div class="text-muted small">Color: ${colorName}</div>
          <div class="fw-bold mt-2">₹${product.price}</div>
        </div>
        <div class="d-flex align-items-center gap-2">
          <button class="btn btn-light btn-sm" onclick="window.decreaseQuantity(${index})">-</button>
          <span class="fw-bold">${item.quantity}</span>
          <button class="btn btn-light btn-sm" onclick="window.increaseQuantity(${index})">+</button>
          <button class="btn text-danger" onclick="window.removeItem(${index})">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9zm2 4h2v11h-2V7z"/>
            </svg>
          </button>
        </div>
      </div>
    `;

    cartItemsEl.insertAdjacentHTML("beforeend", itemHTML);
  });

  // const discount = Math.round(subtotal * 0.4);
  const orderItems = JSON.parse(localStorage.getItem("vvOrders")) || [];

  const discountRate = orderItems.length > 0 ? 0.2 : 0.4;

  const discount = Math.round(subtotal * discountRate);

  const total = subtotal - discount + deliveryFee;
  // Update discount label text dynamically


  cartSummary.innerHTML = `
    <h6 class="fw-bold mb-4">Order Summary</h6>
    <div class="d-flex justify-content-between mb-2">
      <span>Subtotal</span>
      <span class="fw-bold">₹${subtotal}</span>
    </div>
    <div class="d-flex justify-content-between mb-2">
      <span id="discountLabel">Discount (-40%)</span>
      <span class="text-danger">-₹${discount}</span>
    </div>
    <div class="d-flex justify-content-between mb-3">
      <span>Delivery Fee</span>
      <span class="fw-bold">₹${deliveryFee}</span>
    </div>
    <div class="d-flex justify-content-between border-top pt-3 mb-3">
      <span class="fw-bold">Total</span>
      <span class="fw-bold fs-5">₹${total}</span>
    </div>
    <div class="input-group mb-3 vv-promo-wrap">
      <input type="text" class="form-control" placeholder="Add promo code" disabled>
      <button class="btn btn-dark" disabled>Apply</button>
    </div>

    <!-- Success Message -->
    <div class="alert alert-success p-2 mb-3 small rounded vv-promo-message">
      <strong>VVSAVE</strong> code applied successfully!
    </div>
    <button class="btn btn-dark w-100 d-flex justify-content-between align-items-center go-to-Checkout">
      Go to Checkout
      <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
        <path d="M10 17l5-5-5-5v10z"/>
      </svg>
    </button>
  `;

  const discountLabel = document.getElementById("discountLabel");
if (discountLabel) {
  discountLabel.textContent = `Discount (-${discountRate * 100}%)`;
}

  handleCheckoutButton();
}


// Make functions global
window.increaseQuantity = function (index) {
  cart[index].quantity += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
};

window.decreaseQuantity = function (index) {
  cart[index].quantity -= 1;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
};

window.removeItem = function (index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
  updateCartCount()
  redirectIfCartEmpty()
};

updateCart();



function updateCartCount() {
  setTimeout(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartBadge = document.getElementById("cartHeadRound");

    if (cartBadge) {
      cartBadge.innerText = totalCount;
    }
  }, 100); // Delay to ensure header is loaded (adjust if needed)
}


function redirectIfCartEmpty() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    window.location.href = "products.html";
  }
}

// Call it immediately on page load
redirectIfCartEmpty();
