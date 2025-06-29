// Get cart from localStorage
function getCart() {
   const cart = localStorage.getItem('cart');
   return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
   localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart count in header (used everywhere)
function updateCartCount() {
   const cart = getCart();
   const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
   const cartBadge = document.getElementById('cartHeadRound');
   if (cartBadge) {
      cartBadge.innerText = totalCount;
   }
}

// On page load, update cart count
document.addEventListener("DOMContentLoaded", updateCartCount);










// Wish list update


function updateWishlistCountLive() {
  const key = "wishlistProducts";
  const wishlistCountEl = document.getElementById("favHeadRound");

  function update() {
    const wishlist = JSON.parse(localStorage.getItem(key)) || [];
    if (wishlistCountEl) {
      wishlistCountEl.innerText = wishlist.length;
    }
  }

  // Initial run
  update();

  // Listen for changes from other tabs
  window.addEventListener("storage", (e) => {
    if (e.key === key) update();
  });

  // Check every second for changes in same tab
  setInterval(update, 100);
}

// ✅ Call the function when the DOM is ready
document.addEventListener("DOMContentLoaded", updateWishlistCountLive);
