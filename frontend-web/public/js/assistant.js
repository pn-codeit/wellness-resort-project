const examples = document.querySelectorAll('[data-fill-example]');
const assistantInput = document.querySelector('.assistant-form-card textarea');

examples.forEach((button) => {
  button.addEventListener('click', () => {
    if (!assistantInput) return;

    assistantInput.value = button.dataset.fillExample;
    assistantInput.focus();
  });
});

if (assistantInput) {
  assistantInput.addEventListener('input', () => {
    assistantInput.style.height = 'auto';
    assistantInput.style.height = `${assistantInput.scrollHeight}px`;
  });
}
