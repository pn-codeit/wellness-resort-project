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
    cartCount.hidden = count === 0;
    cartTotal.textContent = `${total.toFixed(2)} €`;
    cartPayload.value = JSON.stringify(cart);
    cartEmpty.hidden = cart.length > 0;

    cartItems.innerHTML = cart.map((item) => `
      <div class="cart-line">
        <div>
          <strong>${item.name}</strong>
          <small>${item.qty} x ${item.price.toFixed(2)} €</small>
        </div>
        <div class="cart-line-right">
          <b>${(item.qty * item.price).toFixed(2)} €</b>
          <button class="cart-remove-btn" type="button" data-remove-id="${item.id}" aria-label="Entfernen">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
          </button>
        </div>
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

    const removeButton = event.target.closest('[data-remove-id]');
    if (removeButton) {
      const id = Number(removeButton.dataset.removeId);
      const index = cart.findIndex((item) => item.id === id);
      if (index !== -1) cart.splice(index, 1);
      renderCart();
    }

    if (event.target.closest('[data-open-cart]')) cartPanel.hidden = false;
    if (event.target.closest('[data-close-cart]') || event.target === cartPanel) cartPanel.hidden = true;

    const filter = event.target.closest('button[data-category]');
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
