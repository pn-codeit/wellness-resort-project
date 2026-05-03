const bookingData = JSON.parse(localStorage.getItem("wellnessBooking"));
const bookingMessage = document.getElementById("booking-message");
const bookingForm = document.getElementById("booking-form");

if (bookingData) {
  document.getElementById("booking-duration").textContent = `${bookingData.duration} Nights`;
  document.getElementById("booking-room").textContent = bookingData.room?.name || "-";
  document.getElementById("booking-package").textContent = bookingData.package?.name || "-";
  document.getElementById("booking-extras").textContent =
    bookingData.extras?.length ? bookingData.extras.map((e) => e.name).join(", ") : "None";
  document.getElementById("booking-price").textContent = bookingData.total || 0;
} else {
  bookingMessage.textContent = "No booking configuration found. Please return to the configurator.";
}

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!bookingData) {
    bookingMessage.textContent = "Booking cannot be completed because no configuration is available.";
    return;
  }

  bookingMessage.textContent = "Booking submitted successfully.";
  bookingForm.reset();
  localStorage.removeItem("wellnessBooking");
});