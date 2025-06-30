function renderStaticSlider(containerId, colorName, limit = 6) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.warn(`[Slider] Container with ID "${containerId}" not found.`);
    return;
  }

  if (!window.allShopProducts) {
    console.error(`[Slider] allShopProducts is not loaded. Please check if data.js is included before sliderComponent.js.`);
    return;
  }

  const filteredProducts = allShopProducts.filter(p =>
    p.colors.some(c => c.name.toLowerCase() === colorName.toLowerCase())
  );

  if (filteredProducts.length === 0) {
    console.warn(`[Slider] No products found for color "${colorName}".`);
    return;
  }

  console.log(`[Slider] Found ${filteredProducts.length} product(s) for color "${colorName}". Rendering max ${limit}.`);

  const limitedProducts = filteredProducts.slice(0, limit);

  const productCards = limitedProducts.map(product => {
    const image = product.colors[0]?.images[0] || "images/placeholder.png";
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    const colorDots = product.colors.map(c => `<span class="vv-color-dot" style="background-color: ${c.code};"></span>`).join('');

    return `
      <div class="vv-product-card shadow-sm rounded p-2 bg-white text-center">
        <div class="d-flex justify-content-between align-items-start mb-2 customCardProdHead">
          <span class="vv-discount-badge badge bg-danger text-white">${discount}% OFF</span>
          <button class="btn btn-sm p-0 border-0 bg-transparent vv-fav-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385C2.856 9.14 4.905 11.165 8 13.25c3.095-2.085 5.144-4.11 6.286-5.812.955-1.885.837-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748Z"/>
            </svg>
          </button>
        </div>
        <a href="productinner.html?id=${product.id}" class="prodCardAnchor">
          <div class="vv-product-img">
            <img src="${image}" alt="${product.name}" class="img-fluid">
          </div>
          <div class="vv-product-info text-start px-1">
            <h6 class="vv-product-title mb-1">${product.name}</h6>
            <div class="d-flex align-items-center gap-1 mb-1">
              <div class="vv-rating text-warning small">${'★'.repeat(Math.floor(product.rating))}</div>
              <small class="text-muted">(${product.ratingCount})</small>
            </div>
            <div class="d-flex align-items-center gap-2 mb-2">
              <span class="fw-bold text-success">₹${product.price}</span>
              <del class="text-muted small">₹${product.originalPrice}</del>
            </div>
            <div class="d-flex gap-2">${colorDots}</div>
          </div>
        </a>
      </div>
    `;
  }).join("");

  container.innerHTML = productCards;

  // Wait and then initialize slick
  setTimeout(() => {
    if (typeof $ === "undefined" || typeof $.fn.slick !== "function") {
      console.error("[Slider] jQuery or Slick not loaded.");
      return;
    }

    $('#' + containerId).slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      dots: false,
      arrows: false,
      responsive: [
        {
          breakpoint: 992,
          settings: { slidesToShow: 2 }
        },
        {
          breakpoint: 576,
          settings: { slidesToShow: 1 }
        }
      ]
    });

    console.log(`[Slider] Slick initialized on #${containerId}`);
  }, 150);
}

window.renderStaticSlider = renderStaticSlider;
