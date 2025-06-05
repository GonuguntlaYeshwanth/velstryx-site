// Fetch cart from sessionStorage
const cart = JSON.parse(sessionStorage.getItem('cart')) || {};
const summaryEl = document.getElementById('order-summary');

let total = 0;
let summaryHTML = '<h3>Order Summary</h3><ul>';
for (const item of Object.values(cart)) {
  summaryHTML += `<li>${item.name} x ${item.quantity} = ₹${(item.price * item.quantity).toFixed(2)}</li>`;
  total += item.price * item.quantity;
}
summaryHTML += `</ul><strong>Total: ₹${total.toFixed(2)}</strong>`;
summaryEl.innerHTML = summaryHTML;

// Handle payment form submit
document.getElementById('payment-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Payment successful! Thank you for your order.');

  // Clear cart from sessionStorage
  sessionStorage.removeItem('cart');

  // Redirect back to homepage or confirmation page
  window.location.href = 'index.html';
});