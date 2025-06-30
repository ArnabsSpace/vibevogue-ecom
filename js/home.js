 $(document).ready(function () {
    $('.vv-hero-image-slider').slick({
      fade: true,
      autoplay: true,
      autoplaySpeed: 4000,
      speed: 1000,
      arrows: false,
      dots: false,
      pauseOnHover: false,
      pauseOnFocus: false,
    });
  });


  $(document).ready(function () {
  const targetDate = new Date("2025-07-31T00:00:00").getTime(); // 🎯 Set your sale end date

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      $(".vv-time-num").text("00");
      clearInterval(timer); // stop the interval
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const timerBoxes = $(".vv-timer-box");

    if (timerBoxes.length >= 4) {
      $(timerBoxes[0]).find(".vv-time-num").text(String(days).padStart(2, '0'));
      $(timerBoxes[1]).find(".vv-time-num").text(String(hours).padStart(2, '0'));
      $(timerBoxes[2]).find(".vv-time-num").text(String(minutes).padStart(2, '0'));
      $(timerBoxes[3]).find(".vv-time-num").text(String(seconds).padStart(2, '0'));
    }
  }

  const timer = setInterval(updateCountdown, 1000); // update every second
  updateCountdown(); // initial run
});
