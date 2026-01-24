const scrollButtons = document.querySelectorAll('[data-scroll]');
const copyButtons = document.querySelectorAll('[data-copy-target]');
const checklist = document.querySelector('[data-checklist]');

scrollButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-scroll');
    const target = document.getElementById(targetId);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

copyButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const targetId = button.getAttribute('data-copy-target');
    const target = document.getElementById(targetId);
    if (!target) return;
    const text = target.innerText.trim();

    try {
      await navigator.clipboard.writeText(text);
      const original = button.textContent;
      button.textContent = '복사 완료';
      setTimeout(() => {
        button.textContent = original;
      }, 1400);
    } catch (error) {
      button.textContent = '복사 실패';
      setTimeout(() => {
        button.textContent = '다시 복사';
      }, 1400);
    }
  });
});

if (checklist) {
  const checkboxes = Array.from(checklist.querySelectorAll('input[type="checkbox"]'));
  const progressBar = checklist.querySelector('.progress-bar span');
  const progressText = checklist.querySelector('.progress-text');

  const updateProgress = () => {
    const total = checkboxes.length;
    const checked = checkboxes.filter((box) => box.checked).length;
    const percent = total === 0 ? 0 : Math.round((checked / total) * 100);
    progressBar.style.width = `${percent}%`;
    progressText.textContent = `${checked}/${total} 완료 (${percent}%)`;
  };

  checkboxes.forEach((box) => {
    box.addEventListener('change', updateProgress);
  });

  updateProgress();
}
