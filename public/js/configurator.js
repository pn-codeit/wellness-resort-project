const rooms = [
  { id: 1, name: "Standard Room", price: 90, description: "Comfortable room for a relaxing stay." },
  { id: 2, name: "Deluxe Room", price: 140, description: "More space and a premium atmosphere." },
  { id: 3, name: "Suite", price: 220, description: "Luxury suite with exclusive comfort." }
];

const packages = [
  { id: 1, name: "Relax Package", price: 60, description: "Sauna and relaxation experience." },
  { id: 2, name: "Detox Package", price: 85, description: "Wellness program for body and mind." },
  { id: 3, name: "Premium Spa Package", price: 120, description: "Full premium spa experience." }
];

const extras = [
  { id: 1, name: "Full Body Massage", price: 40 },
  { id: 2, name: "Sauna Access", price: 20 },
  { id: 3, name: "Yoga Class", price: 25 },
  { id: 4, name: "Candle-Light Dinner", price: 50 },
  { id: 5, name: "Breakfast in Room", price: 30 }
];

const state = {
  duration: 2,
  room: null,
  package: null,
  extras: []
};

const durationSelect = document.getElementById("duration");
const roomOptions = document.getElementById("room-options");
const packageOptions = document.getElementById("package-options");
const extraOptions = document.getElementById("extra-options");
const continueBtn = document.getElementById("continue-btn");

function renderRooms() {
  roomOptions.innerHTML = "";
  rooms.forEach((room) => {
    const card = document.createElement("div");
    card.className = `config-card ${state.room?.id === room.id ? "selected" : ""}`;
    card.innerHTML = `
      <h3>${room.name}</h3>
      <p>${room.description}</p>
      <p><strong>€${room.price}</strong> / night</p>
    `;
    card.addEventListener("click", () => {
      state.room = room;
      renderRooms();
      updateSummary();
    });
    roomOptions.appendChild(card);
  });
}

function renderPackages() {
  packageOptions.innerHTML = "";
  packages.forEach((pkg) => {
    const card = document.createElement("div");
    card.className = `config-card ${state.package?.id === pkg.id ? "selected" : ""}`;
    card.innerHTML = `
      <h3>${pkg.name}</h3>
      <p>${pkg.description}</p>
      <p><strong>€${pkg.price}</strong></p>
    `;
    card.addEventListener("click", () => {
      state.package = pkg;
      renderPackages();
      updateSummary();
    });
    packageOptions.appendChild(card);
  });
}

function renderExtras() {
  extraOptions.innerHTML = "";
  extras.forEach((extra) => {
    const label = document.createElement("label");
    label.className = "extra-item";

    const checked = state.extras.some((item) => item.id === extra.id);

    label.innerHTML = `
      <span>${extra.name} (€${extra.price})</span>
      <input type="checkbox" ${checked ? "checked" : ""}>
    `;

    const checkbox = label.querySelector("input");
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        state.extras.push(extra);
      } else {
        state.extras = state.extras.filter((item) => item.id !== extra.id);
      }
      updateSummary();
    });

    extraOptions.appendChild(label);
  });
}

function calculateTotal() {
  const roomTotal = state.room ? state.room.price * state.duration : 0;
  const packageTotal = state.package ? state.package.price : 0;
  const extrasTotal = state.extras.reduce((sum, extra) => sum + extra.price, 0);
  return roomTotal + packageTotal + extrasTotal;
}

function updateSummary() {
  document.getElementById("summary-duration").textContent = `${state.duration} Nights`;
  document.getElementById("summary-room").textContent = state.room ? state.room.name : "Not selected";
  document.getElementById("summary-package").textContent = state.package ? state.package.name : "Not selected";
  document.getElementById("summary-extras").textContent =
    state.extras.length ? state.extras.map((e) => e.name).join(", ") : "None";
  document.getElementById("summary-price").textContent = calculateTotal();
}

durationSelect.addEventListener("change", (event) => {
  state.duration = Number(event.target.value);
  updateSummary();
});

continueBtn.addEventListener("click", () => {
  if (!state.room || !state.package) {
    alert("Please select a room and a package before continuing.");
    return;
  }

  localStorage.setItem("wellnessBooking", JSON.stringify({
    duration: state.duration,
    room: state.room,
    package: state.package,
    extras: state.extras,
    total: calculateTotal()
  }));

  window.location.href = "/booking";
});

renderRooms();
renderPackages();
renderExtras();
updateSummary();