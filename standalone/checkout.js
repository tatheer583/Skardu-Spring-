document.addEventListener('DOMContentLoaded', () => {
  const orderForm = document.getElementById('order-form');
  const productSelect = document.getElementById('product');
  const quantityInput = document.getElementById('quantity');
  const submitBtn = document.getElementById('submit-btn');
  const successMessage = document.getElementById('success-message');
  const errorMessage = document.getElementById('error-message');

  // Create a Total Price Display element
  const totalDisplay = document.createElement('div');
  totalDisplay.className = 'total-price-box';
  totalDisplay.style.margin = '1rem 0';
  totalDisplay.style.padding = '1.2rem';
  totalDisplay.style.background = '#f0f5fa';
  totalDisplay.style.borderRadius = '12px';
  totalDisplay.style.border = '1px solid #d0e0f0';
  totalDisplay.style.display = 'flex';
  totalDisplay.style.justifyContent = 'space-between';
  totalDisplay.style.alignItems = 'center';
  totalDisplay.innerHTML = `
    <span style="color: #666; font-size: 0.9rem; font-weight: 500;">Order Total:</span>
    <span id="total-amount" style="color: #0A2E5C; font-size: 1.4rem; font-weight: 700;">Rs. 0</span>
  `;
  
  if (orderForm) {
    // Insert before the error message
    orderForm.insertBefore(totalDisplay, errorMessage);

    // Calculation Logic
    const calculateTotal = () => {
      const selectedOption = productSelect.options[productSelect.selectedIndex];
      const price = selectedOption ? parseInt(selectedOption.getAttribute('data-price')) : 0;
      const qty = parseInt(quantityInput.value) || 0;
      const total = price * qty;
      document.getElementById('total-amount').textContent = `Rs. ${total.toLocaleString()}`;
    };

    // Listen for changes
    productSelect.addEventListener('change', calculateTotal);
    quantityInput.addEventListener('input', calculateTotal);
    quantityInput.addEventListener('change', calculateTotal);

    // Form Submission
    orderForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Clear previous messages
      errorMessage.style.display = 'none';
      errorMessage.textContent = '';
      
      // Update UI state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Placing Order...';

      // Gather form data
      const formData = {
        customerName: document.getElementById('customerName').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        product: productSelect.value,
        quantity: parseInt(quantityInput.value, 10)
      };

      try {
        // Send POST request to the local backend
        const response = await fetch('http://localhost:5000/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
          // Success! Hide form and show success message
          orderForm.style.display = 'none';
          successMessage.style.display = 'block';
        } else {
          // Validation or server error
          throw new Error(data.error || 'Failed to place order.');
        }

      } catch (error) {
        // Handle errors
        console.error('Order Submission Error:', error);
        errorMessage.style.display = 'block';
        errorMessage.textContent = error.message || 'Network error. Please make sure the backend server is running.';
      } finally {
        // Restore UI state
        submitBtn.disabled = false;
        submitBtn.textContent = 'Place Order';
      }
    });
  }
});
