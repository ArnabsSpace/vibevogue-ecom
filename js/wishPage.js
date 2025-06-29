document.addEventListener("DOMContentLoaded", () => {
  const wishlistContainer = document.getElementById("wishlistContainer");
  const storageKey = "wishlistProducts";

  function getWishlist() {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  }

  function saveWishlist(data) {
    localStorage.setItem(storageKey, JSON.stringify(data));
    updateWishlistCountLive(); // update count if badge exists
  }

  function updateWishlistCountLive() {
    const el = document.getElementById("favHeadRound");
    if (el) el.innerText = getWishlist().length;
  }

  function renderWishlist() {
    const wishlistData = getWishlist();

    if (!wishlistData.length) {
      wishlistContainer.innerHTML = `<h2 class="text-center text-muted">No products in wishlist</h2>`;
      return;
    }

    let html = "";

    wishlistData.forEach(product => {
      const discount = Math.round(
        ((parseFloat(product.originalPrice.replace("₹", "")) - parseFloat(product.price.replace("₹", ""))) /
          parseFloat(product.originalPrice.replace("₹", ""))) * 100
      );

      const stars = product.rating || "★★★★★";
      const firstImage = product.image || "images/default.png";

      html += `
        <div class="col-lg-4 col-md-4 col-sm-6 col-12 wishlist-card" data-id="${product.id}">
          <div class="vv-product-card shadow-sm rounded p-2 bg-white text-center">
            <div class="d-flex justify-content-between align-items-start mb-2 customCardProdHead">
              <span class="vv-discount-badge badge bg-danger text-white">${discount}% OFF</span>
              <button class="btn btn-sm p-0 border-0 bg-transparent vv-fav-btn active" data-id="${product.id}" title="Remove from wishlist">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385C2.856 9.14 4.905 11.165 8 13.25c3.095-2.085 5.144-4.11 6.286-5.812.955-1.885.837-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748Z"/>
                </svg>
              </button>
            </div>

            <a href="productinner.html?id=${product.id}" class="prodCardAnchor">
              <div class="vv-product-img">
                <img src="${firstImage}" width="430" height="512" alt="${product.name}" class="img-fluid">
              </div>

              <div class="vv-product-info text-start px-1">
                <h6 class="vv-product-title mb-1">${product.name}</h6>
                <div class="d-flex align-items-center gap-1 mb-1">
                  <div class="vv-rating text-warning small">${stars}</div>
                  <small class="text-muted">(${product.ratingCount})</small>
                </div>
                <div class="d-flex align-items-center gap-2 mb-2">
                  <span class="fw-bold text-success">₹${product.price}</span>
                  <del class="text-muted small">₹${product.originalPrice}</del>
                </div>
              </div>
            </a>
          </div>
        </div>
      `;
    });

    wishlistContainer.innerHTML = html;
  }

  function setupWishlistRemoveEvents() {
    wishlistContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".vv-fav-btn");
      if (!btn) return;

      const productId = btn.getAttribute("data-id");

      // Remove from localStorage
      const updatedList = getWishlist().filter(item => item.id !== productId);
      saveWishlist(updatedList);

      // Remove card from DOM
      const card = wishlistContainer.querySelector(`.wishlist-card[data-id="${productId}"]`);
      if (card) card.remove();

      // If no items left, show message
      if (updatedList.length === 0) {
        wishlistContainer.innerHTML = `<h2 class="text-center text-muted">No products in wishlist</h2>`;
      }
    });
  }

  // Initialize
  renderWishlist();
  setupWishlistRemoveEvents();
});
