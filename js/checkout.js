document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const isLoggedIn = !!localStorage.getItem("vvLoggedIn");

  if (!isLoggedIn || cart.length === 0) {
    window.location.href = "products.html";
    return;
  }

  // Show/hide card input
  document.querySelector('.vv-payment-method').addEventListener('change', function () {
    const cardFields = document.querySelector('.vv-card-fields');
    cardFields.classList.toggle('d-none', this.value !== 'card');
  });

  // Handle checkout submission
  document.querySelector('#vvCheckoutForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const billing = Object.fromEntries(formData.entries());
    const paymentMethod = billing.paymentMethod;

    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    // Validate card details if selected
    if (paymentMethod === "card") {
      const cardNumber = billing.cardNumber?.replace(/\s/g, "");
      if (cardNumber !== "4242424242424242" || billing.expiryDate !== "12/34" || billing.cvv !== "123") {
        alert("Invalid card. Use: 4242 4242 4242 4242, Exp: 12/34, CVV: 123");
        return;
      }
    }

    const order = {
      id: "ORD" + Date.now(),
      user: localStorage.getItem("vvLoggedIn"),
      billingInfo: billing,
      paymentType: paymentMethod,
      status: "Processing",
      items: cart,
      total: calculateTotal(cart),
      createdAt: new Date().toISOString()
    };

    // Save to vvOrders
    const orders = JSON.parse(localStorage.getItem("vvOrders")) || [];
    orders.push(order);
    localStorage.setItem("vvOrders", JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem("cart");

    // alert(`Order placed via ${paymentMethod === 'card' ? 'Card' : 'Cash on Delivery'}`);
    window.location.href = "order-confirmation.html";
  });
  

  // Calculate total with fake discount & shipping
  function calculateTotal(cartItems) {
    const subtotal = cartItems.reduce((acc, item) => {
      const product = allShopProducts.find(p => p.id === item.id);
      return acc + (product.price * item.quantity);
    }, 0);
    const discount = Math.round(subtotal * 0.2);
    const shipping = 50;
    return subtotal - discount + shipping;
  }
});
