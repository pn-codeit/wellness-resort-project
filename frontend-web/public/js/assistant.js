const examples = document.querySelectorAll('[data-fill-example]');
const assistantInput = document.querySelector('.assistant-panel textarea');

examples.forEach((button) => {
  button.addEventListener('click', () => {
    if (!assistantInput) return;
    assistantInput.value = button.dataset.fillExample;
    assistantInput.focus();
  });
});
