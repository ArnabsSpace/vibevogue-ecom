

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



// $('.vv-slick-products').slick({
//   slidesToShow: 4,
//   slidesToScroll: 1,
//   dots: false,
//   arrows: false,
//   responsive: [
//     {
//       breakpoint: 992,
//       settings: { slidesToShow: 2 }
//     },
//     {
//       breakpoint: 576,
//       settings: { slidesToShow: 1 }
//     }
//   ]
// });















  




















  