'use strict';

loadWords('words.json')
  .then(displayWords)
  .then(() => {
    const checked = [];
    setCheckListener(checked);
    setBtnClickListener(checked);
  });

async function loadWords(url) {
  const response = await fetch(url);
  const obj = await response.json();
  return obj.words;
}

function displayWords(words) {
  const wordElements = words.map(createWordElement);
  const wordsList = document.querySelector('.words');
  wordsList.append(...wordElements);
}

function createWordElement({ term, definition }) {
  const wordElement = document.createElement('li');
  wordElement.setAttribute('class', 'word');
  wordElement.innerHTML = `
    <div>
      <input type="checkbox" class="word__checkbox" />
      <span class="word__term">${term}</span>
    </div>
    <span class="word__definition">${definition}</span>
    `;

  return wordElement;
}

function setCheckListener(checked) {
  const words = document.querySelector('.words');
  words.addEventListener('change', e => {
    const target = e.target;
    if (target.checked) {
      checked.push(target);
    } else {
      const index = checked.indexOf(target);
      checked.splice(index, 1);
    }
  });
}

function setBtnClickListener(checked) {
  const startBtn = document.querySelector('.header__start');
  const scrollBtn = document.querySelector('.header__scroll');

  startBtn.addEventListener('click', () => {
    if (
      !confirm('시작하면 체크된 목록을 수정할 수 없습니다. 시작하겠습니까?')
    ) {
      return;
    }

    const checkboxes = document.querySelectorAll('.word__checkbox');
    checkboxes.forEach(box => box.setAttribute('disabled', 'true'));

    startBtn.classList.add('header__btn--hidden');
    scrollBtn.classList.remove('header__btn--hidden');
  });

  let i = 0;
  scrollBtn.addEventListener('click', () => {
    if (checked.length === 0) {
      return;
    }
    checked[i++].scrollIntoView({ block: 'center', behavior: 'smooth' });
    i = i >= checked.length ? 0 : i;
  });
}
