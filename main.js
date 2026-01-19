const generateButton = document.getElementById('generate');
const menuResult = document.getElementById('menu-result');
const themeToggle = document.getElementById('theme-toggle');
const lunchMenus = [
  '김치찌개',
  '된장찌개',
  '제육볶음',
  '비빔밥',
  '돈까스',
  '칼국수',
  '쌀국수',
  '냉면',
  '불고기',
  '치킨샐러드',
  '샌드위치',
  '초밥',
  '파스타',
  '마라탕',
  '카레',
  '토스트',
  '라면',
  '우동'
];
let lastRecommendation = '';

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.textContent = isDark ? '화이트 모드' : '다크 모드';
}

function initTheme() {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark' || storedTheme === 'light') {
    applyTheme(storedTheme);
    return;
  }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(prefersDark ? 'dark' : 'light');
}

function recommendLunch() {
  if (lunchMenus.length === 0) {
    menuResult.textContent = '메뉴 목록이 비어 있어요.';
    return;
  }
  let nextMenu = lunchMenus[Math.floor(Math.random() * lunchMenus.length)];
  if (lunchMenus.length > 1) {
    while (nextMenu === lastRecommendation) {
      nextMenu = lunchMenus[Math.floor(Math.random() * lunchMenus.length)];
    }
  }
  lastRecommendation = nextMenu;
  menuResult.textContent = nextMenu;
}

generateButton.addEventListener('click', recommendLunch);
themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', nextTheme);
  applyTheme(nextTheme);
});

// Generate recommendation on initial load
initTheme();
recommendLunch();
