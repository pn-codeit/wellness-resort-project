document.addEventListener('click', (event) => {
  const link = event.target.closest('.nav-links a');
  const toggle = document.getElementById('nav-toggle');
  if (link && toggle) toggle.checked = false;
});
