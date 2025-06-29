// 

import { handleCheckoutButton } from './cart-summary-handler.js';
// Assuming 'products' array is already available (e.g. from products.js)
const cartItemsEl = document.getElementById("cartItems");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCart() {
  cartItemsEl.innerHTML = "";
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
          <button class="btn btn-light btn-sm" onclick="decreaseQuantity(${index})">-</button>
          <span class="fw-bold">${item.quantity}</span>
          <button class="btn btn-light btn-sm" onclick="increaseQuantity(${index})">+</button>
          <button class="btn text-danger" onclick="removeItem(${index})">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9zm2 4h2v11h-2V7z"/>
            </svg>
          </button>
        </div>
      </div>
    `;
    
    cartItemsEl.insertAdjacentHTML("beforeend", itemHTML);
  });

  // Update summary
  const discount = Math.round(subtotal * 0.2);
  const total = subtotal - discount + deliveryFee;

  document.querySelector(".vv-cart-summary").innerHTML = `
    <h6 class="fw-bold mb-4">Order Summary</h6>
    <div class="d-flex justify-content-between mb-2">
      <span>Subtotal</span>
      <span class="fw-bold">₹${subtotal}</span>
    </div>
    <div class="d-flex justify-content-between mb-2">
      <span>Discount (-20%)</span>
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
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Add promo code">
      <button class="btn btn-dark">Apply</button>
    </div>
    <button class="btn btn-dark w-100 d-flex justify-content-between align-items-center go-to-Checkout">
      Go to Checkout
      <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
        <path d="M10 17l5-5-5-5v10z"/>
      </svg>
    </button>
  `;
handleCheckoutButton();

}

function increaseQuantity(index) {
  cart[index].quantity += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function decreaseQuantity(index) {
  cart[index].quantity -= 1;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1); // remove if 0
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

updateCart();
