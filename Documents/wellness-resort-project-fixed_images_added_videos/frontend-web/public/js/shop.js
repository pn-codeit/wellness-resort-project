const shopRoot = document.querySelector('[data-shop-root]');

if (shopRoot) {
  const cart = [];
  const cartPanel = shopRoot.querySelector('[data-cart]');
  const cartItems = shopRoot.querySelector('[data-cart-items]');
  const cartEmpty = shopRoot.querySelector('[data-cart-empty]');
  const cartCount = shopRoot.querySelector('[data-cart-count]');
  const cartTotal = shopRoot.querySelector('[data-cart-total]');
  const cartPayload = shopRoot.querySelector('[data-cart-payload]');

  function renderCart() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

    cartCount.textContent = String(count);
    cartTotal.textContent = `${total.toFixed(2)} €`;
    cartPayload.value = JSON.stringify(cart);
    cartEmpty.hidden = cart.length > 0;

    cartItems.innerHTML = cart.map((item) => `
      <div class="cart-line">
        <div>
          <strong>${item.name}</strong>
          <small>${item.qty} x ${item.price.toFixed(2)} €</small>
        </div>
        <b>${(item.qty * item.price).toFixed(2)} €</b>
      </div>
    `).join('');
  }

  shopRoot.addEventListener('click', (event) => {
    const addButton = event.target.closest('[data-add-product]');
    if (addButton) {
      const product = JSON.parse(addButton.dataset.addProduct);
      const existing = cart.find((item) => item.id === product.id);
      if (existing) existing.qty += 1;
      else cart.push({ ...product, qty: 1 });
      renderCart();
    }

    if (event.target.closest('[data-open-cart]')) cartPanel.hidden = false;
    if (event.target.closest('[data-close-cart]') || event.target === cartPanel) cartPanel.hidden = true;

    const filter = event.target.closest('[data-category]');
    if (filter) {
      shopRoot.querySelectorAll('[data-category]').forEach((button) => button.classList.remove('active'));
      filter.classList.add('active');
      const category = filter.dataset.category;
      shopRoot.querySelectorAll('[data-product-card]').forEach((card) => {
        card.hidden = category !== 'Alle' && category !== 'All' && card.dataset.category !== category;
      });
    }
  });

  renderCart();
}
