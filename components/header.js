// components/header.js
export function loadHeader() {
  const header = document.createElement("mainheader");

  header.innerHTML = `
    <!-- Promo Banner -->
    <div class="vv-promo-bar text-white text-end px-3 py-2 position-relative">
      <span class="vv-promoTextTop">Sign up and get 40% off your first order. <a href="#">Sign Up Now</a></span>
      <button class="vv-close-promo position-absolute end-0 top-0 mt-1 me-3 bg-transparent border-0 text-white fs-5">&times;</button>
    </div>

    <!-- Header -->
    <header id="vv-header" class="vv-header">
      <nav class="navbar navbar-expand-lg bg-white">
        <div class="container px-3">
          <a class="navbar-brand" href="/">
            <img src="images/BrandLogoColor.svg" alt="VibeVogue" width="200" />
          </a>

          <div class="d-flex align-items-center ms-auto d-lg-none gap-2">
            <a href="javascript:void(0)"><img src="images/search.svg" alt="Search" class="vv-icon" /></a>
            <a href="wishlist.html"><img src="images/favriote.svg" alt="Favorites" class="vv-icon" /><span class="favHedr" id="favHeadRound">0</span></a>
            <a href="cart.html"><img src="images/cart.svg" alt="Cart" class="vv-icon" /> <span class="cartHedr" id="cartHeadRound">0</span></a>
            <button class="vv-toggle-menu border-0 bg-transparent p-0">
              <img src="images/menu.svg" alt="Menu" width="28" />
            </button>
          </div>

          <div class="custom-navbar collapse navbar-collapse justify-content-center d-none d-lg-flex">
            <ul class="navbar-nav">
              <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
              <li class="nav-item"><a class="nav-link" href="products.html">Shop</a></li>
              <li class="nav-item"><a class="nav-link" href="about.html">About</a></li>
              <li class="nav-item"><a class="nav-link" href="blog.html">Blog</a></li>
              <li class="nav-item"><a class="nav-link" href="contactus.html">Contact</a></li>
            </ul>
          </div>

          <div class="d-none d-lg-flex align-items-center gap-3 ms-auto customNavRightBar">
            <a href="login.html" class="logiNSign">Login/Signup</a>

            <!-- My Account Dropdown -->
            <div class="dropdown myAccountDropdown d-none">
              <a href="#" class="dropdown-toggle text-dark" id="myAccountDropdownLink" data-bs-toggle="dropdown" aria-expanded="false">
                My Account
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="myAccountDropdownLink">
               
                <li><a class="dropdown-item" href="order-confirmation.html">My Orders</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="javascript:void(0)" id="logoutBtn">Logout</a></li>
              </ul>
            </div>

            <a href="javascript:void(0)"><img src="images/search.svg" alt="Search" class="vv-icon" /></a>
            <a href="wishlist.html"><img src="images/favriote.svg" alt="Favorites" class="vv-icon" /><span class="favHedr" id="favHeadRound">0</span></a>
            <a href="cart.html"><img src="images/cart.svg" alt="Cart" class="vv-icon" /> <span class="cartHedr" id="cartHeadRound">0</span></a>
          </div>
        </div>
      </nav>
    </header>

    <!-- Offcanvas Menu -->
    <div class="vv-offcanvas">
      <button class="vv-close-offcanvas">
        <img src="images/close.svg" alt="Close" width="20" />
      </button>
      <ul class="vv-offcanvas-menu list-unstyled mt-5 px-4">
        <li><a href="index.html">Home</a></li>
        <li><a href="products.html">Shop</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="blog.html">Blog</a></li>
        <li><a href="contactus.html">Contact</a></li>
        <li class="offcanvas-auth-link"><a href="login.html">Login/Signup</a></li>
      </ul>
    </div>
  `;

  document.body.prepend(header);

  // Wait for DOM to fully render before accessing elements
  setTimeout(() => {
    const isLoggedIn = !!localStorage.getItem("vvLoggedIn");

    const loginLink = document.querySelector(".logiNSign");
    const accountDropdown = document.querySelector(".myAccountDropdown");
    const offcanvasLoginLink = document.querySelector(".offcanvas-auth-link");

    if (isLoggedIn) {
      loginLink?.classList.add("d-none");
      accountDropdown?.classList.remove("d-none");
      if (offcanvasLoginLink) offcanvasLoginLink.innerHTML = `<a href="profile.html">My Account</a>`;
    } else {
      loginLink?.classList.remove("d-none");
      accountDropdown?.classList.add("d-none");
      if (offcanvasLoginLink) offcanvasLoginLink.innerHTML = `<a href="login.html">Login/Signup</a>`;
    }

    // Logout logic
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("vvLoggedIn");
        window.location.href = "login.html";
      });
    }
  }, 50);



  // === Add Search Functionality ===
const searchIcon = document.querySelectorAll('img[alt="Search"]');
const mainHeaderEl = document.querySelector(".vv-header");

// Create search container
const searchContainer = document.createElement("div");
searchContainer.className = "vv-search-container position-absolute top-100 start-50 translate-middle-x bg-white p-3 rounded shadow-sm d-none w-100";
searchContainer.style.zIndex = "9999";
searchContainer.innerHTML = `
  <input type="text" class="form-control mb-2" id="vvSearchInput" placeholder="Search for products...">
  <ul class="list-group small" id="vvSearchResults" style="max-height: 200px; overflow-y: auto;"></ul>
`;
mainHeaderEl.appendChild(searchContainer);

// Toggle search bar on icon click
searchIcon.forEach(icon => {
  icon.addEventListener("click", () => {
    searchContainer.classList.toggle("d-none");
    document.getElementById("vvSearchInput").focus();
  });
});

// Search logic
document.getElementById("vvSearchInput").addEventListener("input", function () {
  const query = this.value.trim().toLowerCase();
  const resultsList = document.getElementById("vvSearchResults");
  resultsList.innerHTML = "";

  if (!query || !window.allShopProducts) return;

  const results = allShopProducts.filter(p => p.name.toLowerCase().includes(query)).slice(0, 5);

  if (results.length === 0) {
    resultsList.innerHTML = `<li class="list-group-item text-muted">No results found.</li>`;
    return;
  }

  results.forEach(product => {
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-action";
    li.textContent = product.name;
    li.addEventListener("click", () => {
      window.location.href = `productinner.html?id=${product.id}`;
    });
    resultsList.appendChild(li);
  });
});

}
