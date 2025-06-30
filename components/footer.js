// components/footer.js
export function loadFooter() {
    const footer = document.createElement("mainfooter");
    footer.innerHTML = `<footer class="vv-main-footer  text-light pt-5 pb-3">
  <div class="container">
    <div class="row gy-4">
      <!-- Logo and Description -->
      <div class="col-lg-4 col-md-12 col-sm-12 col-12">
        <div class="d-flex align-items-center mb-3">
          <img src="images/BrandWhiteLogo.svg" alt="VibeVogue Logo" class="me-2">
        </div>
        <p class="small">
          At VibeVogue, our mission is to inspire confidence through fashion by delivering premium quality, brand-forward styles, and a seamless shopping experience.
        </p>
        <p class="small mb-1"><strong>Mail:</strong> support@vibevogue.com</p>
        <p class="small mb-1"><strong>Phone:</strong> 0-000-000-0000</p>
        <p class="small"><strong>Address:</strong> 549 Oak St. Crystal Lake, IL 60014</p>
        <div class="d-flex gap-2 mt-2">
          <img src="images/facebook.svg" alt="Facebook" class="vv-social-icon">
          <img src="images/twitter.svg" alt="Instagram" class="vv-social-icon">
          <img src="images/Instagram.svg" alt="Twitter" class="vv-social-icon">
          <img src="images/LinkedIn.svg" alt="LinkedIn" class="vv-social-icon">
          <img src="images/pint.svg" alt="Pinterest" class="vv-social-icon">
        </div>
      </div>



      <!-- Quick Shop -->
      <div class="col-12 col-lg-5 col-md-12 col-sm-12">
        <div class="row">
        <div class="col-md-4">
            <h6 class="mb-3 commonftrHead">Information</h6>
            <ul class="list-unstyled small commonftrlist">
            <li><a href="contactus.html" class="text-light text-decoration-none">Contact us</a></li>
            <li><a href="faq.html" class="text-light text-decoration-none">FAQs</a></li>
            <li><a href="about.html" class="text-light text-decoration-none">About us</a></li>
            <li><a href="blog.html" class="text-light text-decoration-none">Blog</a></li>
            </ul>
        </div>
        <div class="col-md-4">
            <h6 class="mb-3 commonftrHead">Quick Shop</h6>
            <ul class="list-unstyled small commonftrlist">
            <li><a href="products.html" class="text-light text-decoration-none">Winter</a></li>
            <li><a href="products.html" class="text-light text-decoration-none">Summer</a></li>
            <li><a href="products.html" class="text-light text-decoration-none">Festive</a></li>
            <li><a href="products.html" class="text-light text-decoration-none">Sweater</a></li>
            <li><a href="products.html" class="text-light text-decoration-none">Skirt</a></li>
            </ul>
        </div>
        <div class="col-md-4">
            <h6 class="mb-3 commonftrHead">Customer Services</h6>
            <ul class="list-unstyled small commonftrlist">
            <li><a href="privacy.html" class="text-light text-decoration-none">Privacy policy</a></li>
            <li><a href="terms.html" class="text-light text-decoration-none">Terms &amp; Conditions</a></li>
            <li><a href="faq.html" class="text-light text-decoration-none">FAQ</a></li>
            </ul>
        </div>
        </div>

      </div>


      <!-- Mailing List -->
      <div class="col-lg-3 col-md-12 col-12">
        <h6 class="mb-3 commonftrHead joinMailing">Join Our Mailing List</h6>
        <p class="small">Sign up to receive inspiration, product updates, and special offers from our team.</p>
        <form id="newsletterForm" class="d-flex newsletter-box-form">
          <input type="email" class="form-control newsletter-input" placeholder="example@gmail.com" required>
          <button type="submit" class="btn newsletter-submit-btn">Submit</button>
        </form>
        <p id="newsletterThankYou" class="small mt-2 text-success d-none">Thank you for subscribing!</p>
      </div>
    </div>

    <hr class="border-secondary mt-5">

    <!-- Bottom bar -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-center small mt-3">
      <div class="mb-2 mb-md-0">
        VibeVogue © 2025 | All Rights Reserved | Theme by
           <a href="https://arnabspace.in" class="text-light text-decoration-underline">arnabspace.in</a>
      </div>
      <div class="d-flex gap-2 mt-2 mt-md-0">
        <img src="images/visa.svg" alt="Visa" height="24">
        <img src="images/master.svg" alt="master" height="24">
        <img src="images/paypal.svg" alt="PayPal" height="24">
        <img src="images/applepay.svg" alt="Apple Pay" height="24">
        <img src="images/gpay.svg" alt="Google Pay" height="24">
      </div>
    </div>
  </div>
</footer>
`
document.body.append(footer);
}