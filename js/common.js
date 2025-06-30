document.addEventListener("DOMContentLoaded", () => {
  // Promo bar close
  const closePromo = document.querySelector(".vv-close-promo");
  if (closePromo) {
    closePromo.addEventListener("click", () => {
      document.querySelector(".vv-promo-bar").style.display = "none";
    });
  }

  // Sticky Header - Always stick, with animation class
  const header = document.getElementById("vv-header");
  let lastScroll = 0;
  if (header) {
    header.classList.add("sticky"); // always apply sticky

    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 50) {
        header.classList.add("is-scrolling"); // Add animation class (e.g. shadow)
      } else {
        header.classList.remove("is-scrolling");
      }

      lastScroll = currentScroll;
    });
  }

  // Offcanvas toggle
  const toggleMenu = document.querySelector(".vv-toggle-menu");
  const closeCanvas = document.querySelector(".vv-close-offcanvas");
  const offcanvas = document.querySelector(".vv-offcanvas");

  if (toggleMenu && closeCanvas && offcanvas) {
    toggleMenu.addEventListener("click", () => {
      offcanvas.classList.add("active");
    });

    closeCanvas.addEventListener("click", () => {
      offcanvas.classList.remove("active");
    });
  }
});

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
// function updateCartCount() {
//    const cart = getCart();
//    const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
//    const cartBadge = document.getElementById('cartHeadRound');
//    if (cartBadge) {
//       cartBadge.innerText = totalCount;
//    }
// }

// // On page load, update cart count
// document.addEventListener("DOMContentLoaded", updateCartCount);


// function updateCartCount() {
//   const cart = JSON.parse(localStorage.getItem("cart")) || [];
//   const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
//   const cartBadge = document.getElementById("cartHeadRound");
//   if (cartBadge) {
//     cartBadge.innerText = totalCount;
//   }
// }
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

// Call it immediately (once DOM is ready)
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


document.addEventListener("DOMContentLoaded", function () {
  document.body.addEventListener("click", function (e) {
    const btn = e.target.closest(".vv-products-shop");
    if (btn) {
      window.location.href = "products.html";
    }
  });
});







document.addEventListener("DOMContentLoaded", () => {
  const fadeElems = document.querySelectorAll('.vv-fade-down');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target); // Run once only
      }
    });
  }, {
    threshold: 0.1
  });

  fadeElems.forEach(el => observer.observe(el));
});



document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("newsletterForm");
  const thankYou = document.getElementById("newsletterThankYou");

  if (!form || !thankYou) return;

  // If already subscribed, skip form
  const savedEmail = localStorage.getItem("newsletterData");
  if (savedEmail) {
    form.classList.add("d-none");
    thankYou.classList.remove("d-none");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const input = form.querySelector("input[type='email']");
    const email = input.value.trim();

    if (email) {
      localStorage.setItem("newsletterData", email);
      form.classList.add("d-none");
      thankYou.classList.remove("d-none");
    }
  });
});
