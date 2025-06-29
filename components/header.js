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
        <a class="navbar-brand" href="#">
          <img src="images/BrandLogoColor.svg" alt="VibeVogue" width="200" />
        </a>

        <div class="d-flex align-items-center ms-auto d-lg-none">
          <img src="images/search.svg" alt="Search" class="vv-icon me-3" />
          <img src="images/favriote.svg" alt="Favorites" class="vv-icon me-3" />
          <img src="images/cart.svg" alt="Cart" class="vv-icon me-3" />
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
            <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
          </ul>
        </div>


        <div class="d-none d-lg-flex align-items-center gap-3 ms-auto customNavRightBar">
          <a href="login.html" class="logiNSign">Login/Signup</a>
          <a href="#"><img src="images/search.svg" alt="Search" class="vv-icon" /></a>
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
      <li><a href="contact.html">Contact</a></li>
      <li><a href="login.html">Login/Signup</a></li>
    </ul>
  </div>
  `;

  document.body.prepend(header);
}
