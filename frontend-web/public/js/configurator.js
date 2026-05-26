const root = document.querySelector('[data-booking-root]');

if (root) {
  const totalNode = root.querySelector('[data-total]');
  const totalInput = root.querySelector('[data-total-input]');
  const durationInput = root.querySelector('[data-duration-input]');
  const roomCountInput = root.querySelector('[data-room-count]');
  const roomCountHint = root.querySelector('[data-room-count-hint]');
  const form = root.querySelector('form');

  const rangeCheckInInput = root.querySelector('[data-range-checkin]');
  const rangeCheckOutInput = root.querySelector('[data-range-checkout]');
  const rangeNightsInput = root.querySelector('[data-range-nights-value]');
  const rangeCheckInLabel = root.querySelector('[data-range-checkin-label]');
  const rangeCheckOutLabel = root.querySelector('[data-range-checkout-label]');
  const rangeNightsBadge = root.querySelector('[data-range-nights-badge]');
  const rangeGrid = root.querySelector('[data-range-grid]');
  const rangeWeekdays = root.querySelector('[data-range-weekdays]');
  const rangeMonthLabel = root.querySelector('[data-range-month-label]');
  const rangePrevBtn = root.querySelector('[data-range-prev]');
  const rangeNextBtn = root.querySelector('[data-range-next]');
  const rangeHint = root.querySelector('[data-range-hint]');

  const availabilityNode = document.querySelector('[data-booking-availability]');
  const availability = availabilityNode ? JSON.parse(availabilityNode.textContent || '{}') : {};
  const availableDates = new Set(availability.availableDates || []);
  const unavailableDates = new Set(availability.unavailableDates || []);
  const roomInventory = availability.roomInventory || {};
  const roomBookedByDate = availability.roomBookedByDate || {};
  const locale = document.documentElement.lang === 'en' ? 'en-GB' : 'de-DE';
  const lang = document.documentElement.lang === 'en' ? 'en' : 'de';

  let rangeCheckIn = '';
  let rangeCheckOut = '';
  // 0 = awaiting check-in, 1 = check-in set awaiting check-out, 2 = both set
  let rangeState = 0;
  let rangeHover = '';
  let calendarMonth = availability.minArrivalDate ? dateFromKey(availability.minArrivalDate) : new Date();
  let lastAutoRoomCount = roomCountInput ? Number(roomCountInput.value || 1) : 1;

  function numberFrom(input, key) {
    if (!input) return 0;
    return Number(input.dataset[key] || 0);
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

  function addDaysToKey(key, days) {
    const date = dateFromKey(key);
    date.setDate(date.getDate() + days);
    return keyFromDate(date);
  }

  function dateKeysBetween(fromKey, toKey) {
    const dates = [];
    if (!fromKey || !toKey || toKey <= fromKey) return dates;

    for (let cursor = fromKey; cursor < toKey; cursor = addDaysToKey(cursor, 1)) {
      dates.push(cursor);
    }

    return dates;
  }

  function formatDate(key, options = { day: '2-digit', month: 'long', year: 'numeric' }) {
    return dateFromKey(key).toLocaleDateString(locale, options);
  }

  function monthKey(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  }

  function nightsBetween(fromKey, toKey) {
    if (!fromKey || !toKey) return 0;
    const from = dateFromKey(fromKey);
    const to = dateFromKey(toKey);
    return Math.round((to - from) / (1000 * 60 * 60 * 24));
  }

  function basePriceForNights(nights) {
    return 0;
  }

  function durationIdForNights(nights) {
    if (nights <= 2) return 'weekend';
    if (nights <= 4) return 'midweek';
    if (nights <= 7) return 'week';
    return 'twoweeks';
  }

  function guestCount() {
    const adults = Number(root.querySelector('input[name="adults"]')?.value || 0);
    const children = Number(root.querySelector('input[name="children"]')?.value || 0);
    return Math.max(1, adults + children);
  }

  function guestBreakdown() {
    return {
      adults: Number(root.querySelector('input[name="adults"]')?.value || 0),
      children: Number(root.querySelector('input[name="children"]')?.value || 0)
    };
  }

  function selectedRoomLimits() {
    const room = root.querySelector('input[name="room"]:checked');
    const capacity = Math.max(1, numberFrom(room, 'capacity') || 2);
    return {
      capacity,
      adultCapacity: Math.max(1, numberFrom(room, 'adultCapacity') || capacity),
      childCapacity: Math.max(0, numberFrom(room, 'childCapacity') || capacity)
    };
  }

  function selectedRoomId() {
    return root.querySelector('input[name="room"]:checked')?.value || '';
  }

  function selectedRoomInventory() {
    return Number(roomInventory[selectedRoomId()] || 0);
  }

  function minRoomsForSelection() {
    const guests = guestBreakdown();
    const limits = selectedRoomLimits();
    const byGuests = Math.ceil(guestCount() / limits.capacity);
    const byAdults = Math.ceil(guests.adults / limits.adultCapacity);
    const byChildren = limits.childCapacity > 0 ? Math.ceil(guests.children / limits.childCapacity) : 1;
    return Math.max(1, byGuests, byAdults, byChildren);
  }

  function updateRoomCount() {
    if (!roomCountInput) return 1;

    const minRooms = minRoomsForSelection();
    const currentRoomCount = Number(roomCountInput.value || 0);
    const maxRooms = selectedRoomInventory();
    const shouldFollowMinimum = currentRoomCount <= lastAutoRoomCount;

    roomCountInput.min = String(minRooms);
    if (maxRooms > 0) roomCountInput.max = String(maxRooms);
    if (shouldFollowMinimum || currentRoomCount < minRooms) {
      roomCountInput.value = String(minRooms);
    }
    if (maxRooms > 0 && Number(roomCountInput.value || 0) > maxRooms) {
      roomCountInput.value = String(maxRooms);
    }
    lastAutoRoomCount = minRooms;

    if (roomCountHint) {
      roomCountHint.textContent = lang === 'de'
        ? `Mindestens ${minRooms} ${minRooms === 1 ? 'Zimmer' : 'Zimmer'} für diese Gästezahl`
        : `At least ${minRooms} ${minRooms === 1 ? 'room' : 'rooms'} for this guest count`;
    }

    return Number(roomCountInput.value || minRooms);
  }

  function isCheckInAvailable(key) {
    if (!key) return false;
    if (availability.minArrivalDate && key < availability.minArrivalDate) return false;
    if (availability.maxArrivalDate && key > availability.maxArrivalDate) return false;
    if (unavailableDates.has(key)) return false;
    if (availableDates.size > 0 && !availableDates.has(key)) return false;
    return isRoomAvailableForRange(key, addDaysToKey(key, 1));
  }

  function isRoomAvailableForRange(fromKey, toKey) {
    const roomId = selectedRoomId();
    if (!roomId) return true;

    const inventory = Number(roomInventory[roomId] || 0);
    if (inventory <= 0) return false;

    const minRooms = minRoomsForSelection();
    if (minRooms > inventory) return false;

    const requestedRooms = Number(roomCountInput?.value || minRoomsForSelection());
    const roomCount = Math.min(Math.max(minRooms, requestedRooms), inventory);
    return dateKeysBetween(fromKey, toKey).every((key) => {
      const booked = Number(roomBookedByDate[roomId]?.[key] || 0);
      return booked + roomCount <= inventory;
    });
  }

  function ensureSelectedRangeIsAvailable() {
    if (rangeCheckIn && !isCheckInAvailable(rangeCheckIn)) {
      rangeCheckIn = '';
      rangeCheckOut = '';
      rangeState = 0;
      updateRangeDisplay();
      return;
    }

    if (rangeCheckIn && rangeCheckOut && !isRoomAvailableForRange(rangeCheckIn, rangeCheckOut)) {
      rangeCheckOut = '';
      rangeState = 1;
      updateRangeDisplay();
    }
  }

  function calculateTotal() {
    const nights = Number(rangeNightsInput ? rangeNightsInput.value : 0);
    const roomCount = updateRoomCount();
    let total = basePriceForNights(nights) * roomCount;
    if (durationInput) durationInput.value = nights > 0 ? durationIdForNights(nights) : '';

    const room = root.querySelector('input[name="room"]:checked');
    root.querySelectorAll('input[name="treatments"]:checked').forEach((input) => {
      total += numberFrom(input, 'price');
    });
    if (room) total += numberFrom(room, 'pricePerNight') * nights * roomCount;
    root.querySelectorAll('input[name="extras"]:checked').forEach((input) => {
      total += numberFrom(input, 'price') + numberFrom(input, 'pricePerNight') * nights;
    });

    totalNode.textContent = `${total.toLocaleString('de-DE')} €`;
    totalInput.value = String(total);
  }

  function renderRangeCalendar() {
    if (!rangeGrid) return;

    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const first = new Date(year, month, 1);
    const last = new Date(year, month + 1, 0);
    const offset = (first.getDay() + 6) % 7;
    const currentMonthKey = monthKey(calendarMonth);
    const minMonth = availability.minArrivalDate ? monthKey(dateFromKey(availability.minArrivalDate)) : null;
    const maxMonth = availability.maxArrivalDate ? monthKey(dateFromKey(availability.maxArrivalDate)) : null;

    if (rangeWeekdays) {
      const weekdays = [];
      for (let i = 0; i < 7; i += 1) {
        const d = new Date(2026, 5, 1 + i);
        weekdays.push(d.toLocaleDateString(locale, { weekday: 'short' }));
      }
      rangeWeekdays.innerHTML = weekdays.map((d) => `<span>${d}</span>`).join('');
    }

    if (rangeMonthLabel) {
      rangeMonthLabel.textContent = calendarMonth.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
    }

    if (rangePrevBtn) rangePrevBtn.disabled = !!(minMonth && currentMonthKey <= minMonth);
    if (rangeNextBtn) rangeNextBtn.disabled = !!(maxMonth && currentMonthKey >= maxMonth);

    const effectiveEnd = rangeCheckOut
      || (rangeState === 1 && rangeHover && rangeHover > rangeCheckIn ? rangeHover : '');

    let cells = '';
    for (let i = 0; i < offset; i += 1) {
      cells += '<span class="date-cell empty"></span>';
    }

    for (let day = 1; day <= last.getDate(); day += 1) {
      const date = new Date(year, month, day);
      const key = keyFromDate(date);
      const isStart = key === rangeCheckIn;
      const isEnd = key === rangeCheckOut;
      const isHoverEnd = rangeState === 1 && key === rangeHover && rangeHover > rangeCheckIn;
      const inRange = !!(rangeCheckIn && effectiveEnd && key > rangeCheckIn && key < effectiveEnd);

      let disabled = false;
      if (rangeState === 1) {
        disabled = key <= rangeCheckIn || !isRoomAvailableForRange(rangeCheckIn, key);
      } else {
        disabled = !isCheckInAvailable(key);
      }

      const classes = ['date-cell'];
      if (isStart) classes.push('range-start');
      if (isEnd || isHoverEnd) classes.push('range-end');
      if (inRange) classes.push('in-range');

      cells += `<button class="${classes.join(' ')}" type="button" data-date-value="${key}" ${disabled ? 'disabled' : ''} aria-label="${formatDate(key)}">${day}</button>`;
    }

    rangeGrid.innerHTML = cells;
  }

  function updateRangeDisplay() {
    const nights = nightsBetween(rangeCheckIn, rangeCheckOut);

    if (rangeCheckInLabel) {
      rangeCheckInLabel.textContent = rangeCheckIn
        ? formatDate(rangeCheckIn, { day: '2-digit', month: 'short' })
        : (lang === 'de' ? 'Datum wählen' : 'Select date');
    }

    if (rangeCheckOutLabel) {
      rangeCheckOutLabel.textContent = rangeCheckOut
        ? formatDate(rangeCheckOut, { day: '2-digit', month: 'short' })
        : (lang === 'de' ? 'Datum wählen' : 'Select date');
    }

    if (rangeNightsBadge) {
      rangeNightsBadge.textContent = nights > 0
        ? (lang === 'de' ? `${nights} Nächte` : `${nights} nights`)
        : '—';
      rangeNightsBadge.classList.toggle('range-nights-badge--active', nights > 0);
    }

    if (rangeHint) {
      rangeHint.classList.remove('range-hint--error');
      if (rangeState === 0 || rangeState === 2) {
        rangeHint.textContent = lang === 'de' ? 'Wählen Sie Ihr Anreisedatum' : 'Select your check-in date';
      } else {
        rangeHint.textContent = lang === 'de' ? 'Wählen Sie Ihr Abreisedatum' : 'Select your check-out date';
      }
    }

    if (rangeCheckInInput) rangeCheckInInput.value = rangeCheckIn;
    if (rangeCheckOutInput) rangeCheckOutInput.value = rangeCheckOut;
    if (rangeNightsInput) rangeNightsInput.value = String(nights);
  }

  function selectRangeDate(key) {
    if (rangeState === 0 || rangeState === 2) {
      if (!isCheckInAvailable(key)) return;
      rangeCheckIn = key;
      rangeCheckOut = '';
      rangeState = 1;
      calendarMonth = dateFromKey(key);
    } else if (key <= rangeCheckIn) {
      if (!isCheckInAvailable(key)) return;
      rangeCheckIn = key;
      rangeCheckOut = '';
      calendarMonth = dateFromKey(key);
    } else {
      rangeCheckOut = key;
      rangeState = 2;
    }
    updateRangeDisplay();
    renderRangeCalendar();
    calculateTotal();
  }

  if (rangeGrid) {
    function handleRangeDateActivation(event) {
      const btn = event.target.closest('[data-date-value]');
      if (!btn || btn.disabled) return;
      event.preventDefault();
      selectRangeDate(btn.dataset.dateValue);
    }

    rangeGrid.addEventListener('pointerdown', handleRangeDateActivation);

    rangeGrid.addEventListener('click', (event) => {
      if (event.detail === 0) handleRangeDateActivation(event);
    });

    rangeGrid.addEventListener('mouseover', (event) => {
      const btn = event.target.closest('[data-date-value]');
      if (btn && rangeState === 1 && rangeHover !== btn.dataset.dateValue) {
        rangeHover = btn.dataset.dateValue;
        renderRangeCalendar();
      }
    });

    rangeGrid.addEventListener('mouseleave', () => {
      if (rangeState === 1) {
        rangeHover = '';
        renderRangeCalendar();
      }
    });
  }

  if (rangePrevBtn) {
    rangePrevBtn.addEventListener('click', () => {
      calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1);
      renderRangeCalendar();
    });
  }

  if (rangeNextBtn) {
    rangeNextBtn.addEventListener('click', () => {
      calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1);
      renderRangeCalendar();
    });
  }

  if (form) {
    form.addEventListener('submit', (event) => {
      if (!rangeCheckIn || !rangeCheckOut) {
        event.preventDefault();
        if (rangeHint) {
          rangeHint.textContent = lang === 'de'
            ? 'Bitte wählen Sie Anreise- und Abreisedatum.'
            : 'Please select check-in and check-out dates.';
          rangeHint.classList.add('range-hint--error');
        }
      }
    });
  }

  if (roomCountInput) {
    roomCountInput.addEventListener('input', () => {
      const minRooms = minRoomsForSelection();
      const maxRooms = selectedRoomInventory();
      const currentRoomCount = Number(roomCountInput.value || 0);
      if (currentRoomCount < minRooms) {
        roomCountInput.value = String(minRooms);
      }
      if (maxRooms > 0 && Number(roomCountInput.value || 0) > maxRooms) {
        roomCountInput.value = String(maxRooms);
      }
      calculateTotal();
    });
  }

  root.addEventListener('change', () => {
    ensureSelectedRangeIsAvailable();
    renderRangeCalendar();
    calculateTotal();
  });

  const defaultDate = availability.minArrivalDate || '';
  if (defaultDate) calendarMonth = dateFromKey(defaultDate);
  updateRangeDisplay();
  calculateTotal();
  renderRangeCalendar();
}
