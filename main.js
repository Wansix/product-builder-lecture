class LottoNumbers extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .lotto-numbers {
          display: flex;
          gap: 10px;
          margin: 20px 0;
        }
        .number {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.5rem;
          font-weight: bold;
          color: white;
          background-color: #ccc;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
      </style>
      <div class="lotto-numbers">
      </div>
    `;
  }

  setNumbers(numbers) {
    const container = this.shadowRoot.querySelector('.lotto-numbers');
    container.innerHTML = '';
    for (const number of numbers) {
      const circle = document.createElement('div');
      circle.className = 'number';
      circle.textContent = number;
      circle.style.backgroundColor = this.getColor(number);
      container.appendChild(circle);
    }
  }

  getColor(number) {
    if (number <= 10) return '#fbc400'; // Yellow
    if (number <= 20) return '#69c8f2'; // Blue
    if (number <= 30) return '#ff7272'; // Red
    if (number <= 40) return '#aaa';     // Gray
    return '#b0d840';      // Green
  }
}

customElements.define('lotto-numbers', LottoNumbers);

const generateButton = document.getElementById('generate');
const lottoNumbersElement = document.querySelector('lotto-numbers');

function generateLottoNumbers() {
  const numbers = new Set();
  while (numbers.size < 6) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNumber);
  }
  lottoNumbersElement.setNumbers([...numbers].sort((a, b) => a - b));
}

generateButton.addEventListener('click', generateLottoNumbers);

// Generate numbers on initial load
generateLottoNumbers();