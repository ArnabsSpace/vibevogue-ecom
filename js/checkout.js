document.querySelector('.vv-payment-method').addEventListener('change', function () {
  const cardFields = document.querySelector('.vv-card-fields');
  if (this.value === 'card') {
    cardFields.classList.remove('d-none');
  } else {
    cardFields.classList.add('d-none');
  }
});

// Handle form submission
document.querySelector('#vvCheckoutForm').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Order placed successfully!');
  window.location.href = 'order-confirmation.html'; // example
});

// VISA (Demo)	4242 4242 4242 4242	12/34	123