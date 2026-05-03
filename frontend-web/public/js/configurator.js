const root = document.querySelector('[data-booking-root]');

if (root) {
  const totalNode = root.querySelector('[data-total]');
  const totalInput = root.querySelector('[data-total-input]');

  function numberFrom(input, key) {
    return Number(input.dataset[key] || 0);
  }

  function calculateTotal() {
    const duration = root.querySelector('input[name="duration"]:checked');
    const room = root.querySelector('input[name="room"]:checked');
    const nights = duration ? numberFrom(duration, 'nights') : 0;
    let total = duration ? numberFrom(duration, 'price') : 0;

    root.querySelectorAll('input[name="treatments"]:checked').forEach((input) => {
      total += numberFrom(input, 'price');
    });

    if (room) total += numberFrom(room, 'pricePerNight') * nights;

    root.querySelectorAll('input[name="extras"]:checked').forEach((input) => {
      total += numberFrom(input, 'price') + numberFrom(input, 'pricePerNight') * nights;
    });

    totalNode.textContent = `${total.toLocaleString('de-DE')} €`;
    totalInput.value = String(total);
  }

  root.addEventListener('change', calculateTotal);
  calculateTotal();
}
