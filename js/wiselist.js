// ✅ Single centralized wishlist setup function
function bindWishlistButtons() {
  const key = "wishlistProducts";

  function getWishlist() {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  function saveWishlist(data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  function isInWishlist(id) {
    const wishlist = getWishlist();
    return wishlist.some(item => item.id === id);
  }

  function removeFromWishlist(id) {
    const wishlist = getWishlist();
    const updated = wishlist.filter(item => item.id !== id);
    saveWishlist(updated);
  }

  // Loop through all wishlist buttons
  document.querySelectorAll(".vv-fav-btn").forEach(btn => {
    const productId = btn.getAttribute("data-id");

    // Prevent duplicate event bindings by cloning
    const newBtn = btn.cloneNode(true);
    btn.replaceWith(newBtn);

    // Add active class if already in wishlist
    if (isInWishlist(productId)) {
      newBtn.classList.add("active");
    }

    // Add click listener
    newBtn.addEventListener("click", () => {
      const wishlist = getWishlist();

      if (isInWishlist(productId)) {
        removeFromWishlist(productId);
        newBtn.classList.remove("active");
        console.log(`Removed product ID: ${productId}`);
      } else {
        const card = newBtn.closest(".vv-product-card");
        const product = {
          id: productId,
          name: card.querySelector(".vv-product-title")?.textContent.trim(),
          price: card.querySelector(".fw-bold")?.textContent.trim(),
          originalPrice: card.querySelector("del")?.textContent.trim(),
          ratingCount: card.querySelector("small.text-muted")?.textContent.trim(),
          rating: card.querySelector(".vv-rating")?.textContent.trim(),
          image: card.querySelector("img")?.getAttribute("src")
        };

        wishlist.push(product);
        saveWishlist(wishlist);
        newBtn.classList.add("active");
        console.log(`Added to wishlist: ${product.name}`);
      }
    });
  });
}
