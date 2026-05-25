const root = document.querySelector('[data-booking-root]');

if (root) {
  const totalNode = root.querySelector('[data-total]');
  const totalInput = root.querySelector('[data-total-input]');
  const form = root.querySelector('form');
  const datePicker = root.querySelector('[data-date-picker]');
  const dateInput = root.querySelector('[data-arrival-date]');
  const dateToggle = root.querySelector('[data-date-toggle]');
  const dateLabel = root.querySelector('[data-date-label]');
  const dateCalendar = root.querySelector('[data-date-calendar]');
  const dateMessage = root.querySelector('[data-date-message]');
  const availabilityNode = document.querySelector('[data-booking-availability]');
  const availability = availabilityNode ? JSON.parse(availabilityNode.textContent || '{}') : {};
  const availableDates = new Set(availability.availableDates || []);
  const unavailableDates = new Set(availability.unavailableDates || []);
  const locale = document.documentElement.lang === 'en' ? 'en-GB' : 'de-DE';
  let calendarMonth = availability.minArrivalDate ? dateFromKey(availability.minArrivalDate) : new Date();

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

  function firstAvailableDate() {
    if (Array.isArray(availability.availableDates) && availability.availableDates.length > 0) {
      return availability.availableDates[0];
    }

    return availability.minArrivalDate || '';
  }

  function dateFromKey(key) {
    const [year, month, day] = String(key || '').split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  function keyFromDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function formatDate(key, options = { day: '2-digit', month: 'long', year: 'numeric' }) {
    return dateFromKey(key).toLocaleDateString(locale, options);
  }

  function monthKey(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  }

  function isAvailable(key) {
    if (!key) return false;
    if (availability.minArrivalDate && key < availability.minArrivalDate) return false;
    if (availability.maxArrivalDate && key > availability.maxArrivalDate) return false;
    if (unavailableDates.has(key)) return false;
    return availableDates.size === 0 || availableDates.has(key);
  }

  function renderCalendar() {
    if (!dateCalendar) return;

    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const offset = (first.getDay() + 6) % 7;
    const minMonth = availability.minArrivalDate ? monthKey(dateFromKey(availability.minArrivalDate)) : null;
    const maxMonth = availability.maxArrivalDate ? monthKey(dateFromKey(availability.maxArrivalDate)) : null;
    const currentMonth = monthKey(calendarMonth);
    const weekdays = [];

    for (let i = 0; i < 7; i += 1) {
      const weekdayDate = new Date(2026, 5, 1 + i);
      weekdays.push(weekdayDate.toLocaleDateString(locale, { weekday: 'short' }));
    }

    let cells = '';
    for (let i = 0; i < offset; i += 1) {
      cells += '<span class="date-cell empty"></span>';
    }

    for (let day = 1; day <= last.getDate(); day += 1) {
      const date = new Date(year, month, day);
      const key = keyFromDate(date);
      const disabled = !isAvailable(key);
      const selected = key === dateInput.value;
      cells += `
        <button
          class="date-cell${selected ? ' selected' : ''}"
          type="button"
          data-date-value="${key}"
          ${disabled ? 'disabled' : ''}
          aria-label="${formatDate(key)}"
        >${day}</button>
      `;
    }

    dateCalendar.innerHTML = `
      <div class="date-picker-header">
        <button type="button" data-date-prev ${minMonth && currentMonth <= minMonth ? 'disabled' : ''} aria-label="Previous month">&lsaquo;</button>
        <strong>${calendarMonth.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}</strong>
        <button type="button" data-date-next ${maxMonth && currentMonth >= maxMonth ? 'disabled' : ''} aria-label="Next month">&rsaquo;</button>
      </div>
      <div class="date-weekdays">
        ${weekdays.map((day) => `<span>${day}</span>`).join('')}
      </div>
      <div class="date-grid" role="grid">
        ${cells}
      </div>
    `;
  }

  function openCalendar() {
    if (!dateCalendar || !dateToggle) return;
    dateCalendar.hidden = false;
    dateToggle.setAttribute('aria-expanded', 'true');
    renderCalendar();
  }

  function closeCalendar() {
    if (!dateCalendar || !dateToggle) return;
    dateCalendar.hidden = true;
    dateToggle.setAttribute('aria-expanded', 'false');
  }

  function setSelectedDate(key) {
    if (!dateInput || !isAvailable(key)) return;
    dateInput.value = key;
    if (dateLabel) dateLabel.textContent = formatDate(key);
    calendarMonth = dateFromKey(key);
    updateDateValidity();
    renderCalendar();
    closeCalendar();
  }

  function updateDateValidity() {
    if (!dateInput) return;

    const value = dateInput.value;
    let message = '';

    if (!value) {
      message = document.documentElement.lang === 'en'
        ? 'Please choose an arrival date.'
        : 'Bitte waehlen Sie ein Anreisedatum.';
    } else if (value && unavailableDates.has(value)) {
      message = dateInput.dataset.unavailableMessage || 'Dieser Anreisetag ist nicht verfuegbar.';
    } else if (value && availability.minArrivalDate && value < availability.minArrivalDate) {
      message = dateInput.dataset.rangeMessage || 'Bitte waehlen Sie ein spaeteres Datum.';
    } else if (value && availability.maxArrivalDate && value > availability.maxArrivalDate) {
      message = dateInput.dataset.rangeMessage || 'Bitte waehlen Sie ein Datum im verfuegbaren Zeitraum.';
    }

    dateInput.setCustomValidity(message);
    if (dateMessage) dateMessage.textContent = message;
    if (dateToggle) dateToggle.setAttribute('aria-invalid', message ? 'true' : 'false');
    return message;
  }

  if (dateInput) {
    dateInput.dataset.unavailableMessage = document.documentElement.lang === 'en'
      ? 'This arrival date is not available.'
      : 'Dieser Anreisetag ist nicht verfuegbar.';
    dateInput.dataset.rangeMessage = document.documentElement.lang === 'en'
      ? 'Please choose a date in the available range.'
      : 'Bitte waehlen Sie ein Datum im verfuegbaren Zeitraum.';

    const defaultDate = firstAvailableDate();
    if (defaultDate) calendarMonth = dateFromKey(defaultDate);
    updateDateValidity();
    renderCalendar();
  }

  if (dateToggle) {
    dateToggle.addEventListener('click', () => {
      if (dateCalendar.hidden) openCalendar();
      else closeCalendar();
    });
  }

  if (dateCalendar) {
    dateCalendar.addEventListener('click', (event) => {
      const prev = event.target.closest('[data-date-prev]');
      const next = event.target.closest('[data-date-next]');
      const dateButton = event.target.closest('[data-date-value]');

      if (prev) {
        calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1);
        renderCalendar();
      }

      if (next) {
        calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1);
        renderCalendar();
      }

      if (dateButton) {
        setSelectedDate(dateButton.dataset.dateValue);
      }
    });
  }

  document.addEventListener('click', (event) => {
    if (datePicker && !datePicker.contains(event.target)) closeCalendar();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeCalendar();
  });

  if (form) {
    form.addEventListener('submit', (event) => {
      const dateError = updateDateValidity();
      if (dateError) {
        event.preventDefault();
        openCalendar();
      }
    });
  }

  root.addEventListener('change', calculateTotal);
  calculateTotal();
}
