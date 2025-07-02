$(document).ready(function () {
  $(".vv-faq-question").on("click", function () {
    const answer = $(this).next(".vv-faq-answer");
    const plusIcon = $(this).find(".vv-plus-icon");
    const minusIcon = $(this).find(".vv-minus-icon");

    // Toggle icons and answer
    answer.slideToggle(200);
    plusIcon.toggleClass("d-none");
    minusIcon.toggleClass("d-none");

    // Optional: Close other open FAQs
    $(this).parent().siblings().find(".vv-faq-answer").slideUp(200);
    $(this).parent().siblings().find(".vv-plus-icon").removeClass("d-none");
    $(this).parent().siblings().find(".vv-minus-icon").addClass("d-none");
  });
});
