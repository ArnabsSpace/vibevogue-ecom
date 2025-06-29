export function handleCheckoutButton() {
  const checkoutBtn = document.querySelector(".go-to-Checkout");

  if (checkoutBtn) {
    console.log("✅ Checkout button found, adding listener");

    checkoutBtn.addEventListener("click", () => {
      console.log("🛒 Checkout button clicked");

      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (isLoggedIn) {
        window.location.href = "checkout.html";
      } else {
        window.location.href = "login.html";
      }
    });
  } else {
    console.warn("❌ Go-to-Checkout button not found in DOM");
  }
}
