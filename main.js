'use strict';

loadWords('words.json').then(displayWords);

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
