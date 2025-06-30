// product.html (in <script>)
const urlParams = new URLSearchParams(window.location.search);
const idFromUrl = urlParams.get("id");
const idFromLocalSt = localStorage.getItem("selectedProductId");

let selectedProductId = idFromUrl || localStorage.getItem("selectedProductId");

// Optional: fallback or error
if (!selectedProductId) {
  alert("No product selected");
  window.location.href = "shop.html"; // redirect back
} else {
  console.log(idFromLocalSt);
}


const singleproduct = allShopProducts.find(p => p.id === selectedProductId);

if (!singleproduct) {
  alert("Product not found");
  window.location.href = "products.html";
} 
// else {
//   console.log(singleproduct)
// }

function renderFeatureList(features) {
  const featureListElement = document.getElementById("vvFeature");
  featureListElement.innerHTML = features.map(f => `<li>${f}</li>`).join("");
}
const featureli = allShopProducts.find(p => p.id === selectedProductId);

renderFeatureList(featureli.features);

// ⬇️ Main render function
function renderFullProduct(product) {
  const container = document.getElementById("vv-ProdDetails");
  console.log(product);

  
  
  // const colorDots = renderColorDots(product.colors);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  // const stars = "★".repeat(Math.floor(product.rating)) + "☆".repeat(5 - Math.floor(product.rating));
  const colorDots = product.colors.map(c => `<span class="dot vv-color-dot d-inline-block rounded-circle bg-success vv-color-circle" data-color="${c.code};" style="width: 24px; height: 24px;background-color: ${c.code};"></span>`).join('');

  const sizeAll = product.sizes.map(s => `<option value="${s[0]}">${s[0]}</option>`).join('');

  const html = `
    <span>${product.id}</span>
<h3 class="prodInnerProdName">${product.name}</h3>
<p class="text-muted">${product.brand}</p>
<div class="vv-rating d-flex align-items-center gap-2">
<span class="bg-light px-2 py-1 rounded fw-bold">${product.rating}⭐</span>
<span class="text-muted small">${product.ratingCount}k Rating</span>
</div>
<div class="vv-price mt-3">
<h4 class="">₹${product.price} <span class="mainPriceInnerOld">MRP. <strong>₹${product.originalPrice}</strong></span> <span class="offInnerPrice">(${discount}% OFF)</span></h4>
<p class="text-muted small">Inclusive of all taxes*</p>
</div>


<div class="vv-colors mt-4">
<label class="fw-bold d-block mb-2">Select Colors</label>
<div class="d-flex gap-2">
    ${colorDots}
</div>
</div>


<div class="vv-size-guide mt-4">
<label class="fw-bold d-block mb-2">Size Guide</label>
<select class="form-select" id="productSize">
    ${sizeAll}
</select>
</div>


<div class="mt-4">
<button class="btn btn-dark w-100" type="button" id="addToCartBtn">Add To Cart</button>
<button class="btn btn-dark w-100 offLoad" type="button" id="goToCartBtn">Go To Cart</button>
</div>


<div class="vv-product-actions d-flex justify-content-between align-items-center mt-3">
<span class="d-flex align-items-center gap-2 small text-muted">
    <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m1 17h-2v-2h2v2m1.07-7.75l-.9.92C12.45 12.9 12 13.5 12 15h-2v-.5c0-1 .45-1.7 1.17-2.41l1.24-1.26c.37-.36.59-.86.59-1.41c0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25Z"/></svg>
    Easy Return
</span>
<span class="d-flex align-items-center gap-2 small text-muted">
    <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12.1 18.55c-.1 0-.1 0 0 0C10.14 17.24 4 13.19 4 8.61c0-2.34 1.84-4.18 4.18-4.18c1.42 0 2.67.69 3.42 1.74c.75-1.05 2-1.74 3.42-1.74c2.34 0 4.18 1.84 4.18 4.18c0 4.58-6.14 8.63-8.1 9.94Z"/></svg>
    Add To Wish List
</span>
</div>
   
  `;

  container.innerHTML = html;






document.addEventListener("DOMContentLoaded", () => {
  const addToCartBtn = document.getElementById("addToCartBtn");

  if (!addToCartBtn) return;

  addToCartBtn.addEventListener("click", () => {
    const selectedSize = document.getElementById("productSize")?.value || null;
    const selectedColor = product.colors[0].code || "#000000"; // Or use a selected swatch logic
    const productId = product.id;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(
      (item) =>
        item.id === productId &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: productId,
        quantity: 1,
        selectedSize: selectedSize,
        selectedColor: selectedColor,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // ✅ Update Add to Cart Button
    addToCartBtn.innerHTML = "Go To Cart";
    addToCartBtn.classList.add("offLoad");
    const gotocartbtn = document.getElementById('goToCartBtn');
    gotocartbtn.classList.remove('offLoad');
    addToCartBtn.setAttribute("disabled", true);

//     addToCartBtn.classList.add("disabledAddToCart"); // Optional: style purpose only
// addToCartBtn.removeAttribute("disabled");

// // Add event listener for redirecting to cart
gotocartbtn.addEventListener("click", function handleGoToCartClick() {
  window.location.href = "cart.html";
});

    // ✅ Update cart count in header
    updateCartHeaderCount();
  });

  updateCartHeaderCount(); // Initial update when page loads
});

}

renderFullProduct(singleproduct);


function updateCartHeaderCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartBadge = document.getElementById("cartHeadRound"); // Your span ID in header
  if (cartBadge) {
    cartBadge.innerText = totalItems;
  }
}









// Function to get cart from localStorage
function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

// Function to save cart to localStorage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to update cart count in header
function updateCartCount() {
  const cart = getCart();
  const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartBadge = document.getElementById('cartHeadRound');
  if (cartBadge) {
    cartBadge.innerText = totalCount;
  }
}

// Function to handle Add to Cart
function handleAddToCart(product) {
  const cart = getCart();
  const existingProduct = cart.find(p => p.id === product.id && p.selectedColor === product.selectedColor && p.selectedSize === product.selectedSize);

  if (existingProduct) {
    existingProduct.quantity += product.quantity;
  } else {
    cart.push(product);
  }

  saveCart(cart);
  updateCartCount();

  // Disable button and change text
  const btn = document.getElementById('addToCartBtn');
  if (btn) {
    btn.innerHTML = 'Added to Cart';
    btn.classList.add('disabled');
    btn.setAttribute('disabled', true);
  }
}















// const gallery = renderGallery(singleproduct.colors[0].images);



function initGallery(imageList) {

  
  const thumbnailWrapper = document.querySelector(".thumbnail");
  const mainImage = document.querySelector(".mainImage");

  // Clear existing content (optional if rendering again)
  thumbnailWrapper.innerHTML = "";
  mainImage.innerHTML = "";

  // Set initial main image
  mainImage.innerHTML = `<img src="${imageList[0]}" alt="" class="img-fluid">`;

  // Create thumbnails
  imageList.forEach((src, index) => {
    const thumb = document.createElement("div");
    thumb.className = `thumbnailBox${index === 0 ? " active" : ""}`;
    thumb.innerHTML = `<img src="${src}" alt="" class="img-fluid">`;
    thumbnailWrapper.appendChild(thumb);

    // On click – change main image
    thumb.addEventListener("click", () => {
      mainImage.innerHTML = `<img src="${src}" alt="" class="img-fluid">`;
      document.querySelectorAll(".thumbnailBox").forEach(el => el.classList.remove("active"));
      thumb.classList.add("active");
    });
  });

  // Zoom effect on hover
  mainImage.addEventListener("mousemove", (e) => {
    const img = mainImage.querySelector("img");
    const rect = mainImage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const translateX = (mainImage.offsetWidth / 2 - x) * 2;
    const translateY = (mainImage.offsetHeight / 2 - y) * 2;
    img.style.transform = `translate(${translateX}px, ${translateY}px) scale(3)`;
  });

  mainImage.addEventListener("mouseleave", () => {
    const img = mainImage.querySelector("img");
    img.style.transform = "translate(0, 0) scale(1)";
  });
}

// const gallery = allShopProducts.find(p => p.id === selectedProductId);
initGallery(singleproduct.colors[0].images);
























