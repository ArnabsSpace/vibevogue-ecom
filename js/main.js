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











  document.addEventListener("DOMContentLoaded", function () {
    const current = window.location.pathname.split("/").pop();
    document.querySelectorAll(".custom-navbar .nav-link").forEach(link => {
      if (link.getAttribute("href") === current) {
        link.classList.add("active");
      }
    });
  });


  $(document).ready(function(){
      $('.vv-slick-review').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        arrows: false,
        dots: false,
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
  });



$('.vv-slick-products').slick({
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












  




















  