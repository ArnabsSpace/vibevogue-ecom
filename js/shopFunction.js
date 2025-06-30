$('.accordion-button').on('click', function () {
  const iconContainer = $(this).find('.vibeV-filter-icon');
  const plus = iconContainer.find('.plus-icon');
  const minus = iconContainer.find('.minus-icon');
  plus.toggleClass('d-none');
  minus.toggleClass('d-none');
});



document.addEventListener("DOMContentLoaded", () => {
  renderProducts(allShopProducts); // initial product render
  bindWishlistButtons();           // bind wishlist on initial load

  // product link click save
  document.addEventListener('click', function (e) {
    const anchor = e.target.closest('.prodCardAnchor');
    if (anchor) {
      const url = new URL(anchor.href);
      const productId = url.searchParams.get('id');
      localStorage.setItem("selectedProductId", productId);
    }
  });

  // Accordion icon logic
  const accordions = document.querySelectorAll(".accordion-collapse");
  accordions.forEach((accordion) => {
    accordion.addEventListener("shown.bs.collapse", function () {
      const btn = document.querySelector(`[data-bs-target="#${accordion.id}"]`);
      if (btn) {
        btn.querySelector(".plus-icon").classList.add("d-none");
        btn.querySelector(".minus-icon").classList.remove("d-none");
      }
    });

    accordion.addEventListener("hidden.bs.collapse", function () {
      const btn = document.querySelector(`[data-bs-target="#${accordion.id}"]`);
      if (btn) {
        btn.querySelector(".plus-icon").classList.remove("d-none");
        btn.querySelector(".minus-icon").classList.add("d-none");
      }
    });
  });
});


// ✅ Make renderProducts globally available
window.renderProducts = function (products) {
  const container = document.getElementById("productContainer");
  container.innerHTML = ""; // clear old

  products.forEach((product) => {
    const firstImage = product.colors[0].images[0];
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    const colorDots = product.colors.map(c => `<span class="vv-color-dot" style="background-color: ${c.code};"></span>`).join('');
    const stars = "★".repeat(Math.floor(product.rating)) + "☆".repeat(5 - Math.floor(product.rating));

    const card = `
      <div class="col-lg-4 col-md-4 col-sm-6 col-12">
        <div class="vv-product-card shadow-sm rounded p-2 bg-white text-center">
          <div class="d-flex justify-content-between align-items-start mb-2 customCardProdHead">
            <span class="vv-discount-badge badge bg-danger text-white">${discount}% OFF</span>
            <button class="btn btn-sm p-0 border-0 bg-transparent vv-fav-btn" data-id="${product.id}" id="addToWishlistBtn">
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

              <div class="d-flex gap-2">
                ${colorDots}
              </div>
            </div>
          </a>
        </div>
      </div>
    `;

    container.insertAdjacentHTML("beforeend", card);
  });

  // ✅ Bind wishlist buttons after render
  bindWishlistButtons();
};










document.addEventListener("DOMContentLoaded", function () {
    const accordions = document.querySelectorAll(".accordion-collapse");

    accordions.forEach((accordion) => {
      accordion.addEventListener("shown.bs.collapse", function () {
        const btn = document.querySelector(`[data-bs-target="#${accordion.id}"]`);
        if (btn) {
          const plusIcon = btn.querySelector(".plus-icon");
          const minusIcon = btn.querySelector(".minus-icon");

          plusIcon.classList.add("d-none");
          minusIcon.classList.remove("d-none");
        }
      });

      accordion.addEventListener("hidden.bs.collapse", function () {
        const btn = document.querySelector(`[data-bs-target="#${accordion.id}"]`);
        if (btn) {
          const plusIcon = btn.querySelector(".plus-icon");
          const minusIcon = btn.querySelector(".minus-icon");

          plusIcon.classList.remove("d-none");
          minusIcon.classList.add("d-none");
        }
      });
    });
  });







  document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.querySelector(".vv-filter-toggle");
  const closeBtn = document.querySelector(".vv-filter-close");
  const drawer = document.querySelector(".vv-filter-drawer");

  if (!drawer) return;

  // Open drawer on toggle button click
  toggleBtn?.addEventListener("click", () => {
    drawer.classList.remove("d-lg-none");
    drawer.classList.add("openVVmobFilter");
    document.body.classList.add("vv-no-scroll"); // Optional: lock scroll
  });

  // Close drawer on close button click
  closeBtn?.addEventListener("click", () => {
    drawer.classList.remove("openVVmobFilter");
    drawer.classList.add("d-lg-none");
    document.body.classList.remove("vv-no-scroll");
  });
});


    // document.addEventListener("DOMContentLoaded", function () {
    //   const drawer = document.querySelector(".vv-filter-drawer");

    //   if (!drawer) return;

    //   // Close drawer function
    //   const closeDrawer = () => {
    //     drawer.classList.remove("openVVmobFilter");
    //     drawer.classList.add("d-lg-none");
    //     document.body.classList.remove("vv-no-scroll");
    //   };

    //   // Auto-close on any input click inside the drawer
    //   drawer.querySelectorAll("input[type='radio'], input[type='checkbox']").forEach(input => {
    //     input.addEventListener("change", () => {
    //       closeDrawer();
    //     });
    //   });
    // });

