const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

let numWrong = 0;

// Loop over the chars in `word` and create divs.
//

const createDivsForChars = (word) => {
  const wordContainer = document.querySelector('#word-container');
  for (const letter of word) {
    wordContainer.insertAdjacentHTML('beforeend', `<div class="letter-box ${letter}"></div>`);
  }
};

// Loop over each letter in `ALPHABET` and generate buttons.
//
const generateLetterButtons = () => {
  const letterButtonContainer = document.querySelector('#letter-buttons');
  for (const char of ALPHABET) {
    letterButtonContainer.insertAdjacentHTML('beforeend', `<button>${char}</button>`);
  }
};

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
  buttonEl.disabled = true;
};

// Return `true` if `letter` is in the word.
//
const isLetterInWord = (letter) => document.querySelector(`div.${letter}`) !== null;

// Called when `letter` is in word. Update contents of divs with `letter`.
//
const handleCorrectGuess = (letter) => {
  const boxes = document.querySelectorAll(`.letter-box.${letter}`);
  for (const box of boxes){
    box.insertAdjacentHTML('afterbegin',`${letter}`); //adds letter to div
  }
};

//
// Called when `letter` is not in word.
//
// Increment `numWrong` and update the shark image.
// If the shark gets the person (5 wrong guesses), disable
// all buttons and show the "play again" message.

const handleWrongGuess = () => {
  numWrong += 1;
  const image = document.querySelector('img') //if we had other images we'd need to be more specific
  image.setAttribute('src', `static/images/guess${numWrong}.png`);
  if (numWrong >= 5){
    const buttons = document.querySelectorAll('button');
    for (const button of buttons){
      disableLetterButton(button);
    }
    const message = document.querySelector('#play-again');
    message.setAttribute('style','display: block');
  }
};

//  Reset game state. Called before restarting the game.
const resetGame = () => {
  window.location = '/sharkwords';
};

// This is like if __name__ == '__main__' in Python
//
(function startGame() {
  // For now, we'll hardcode the word that the user has to guess.
  const word = 'hello';

  createDivsForChars(word);
  generateLetterButtons();

  for (const button of document.querySelectorAll('button')) {
    // add an event handler to handle clicking on a letter button
    button.addEventListener('click', (evt) => {
      const letter = evt.target.innerHTML;
      console.log(letter);
      disableLetterButton(evt.target);
      if (isLetterInWord(letter)){
        handleCorrectGuess(letter);
        }
      else {
        handleWrongGuess();
      }
    })
  }

  // add an event handler to handle clicking on the Play Again button
  const playAgain = document.querySelector('#play-again');
  playAgain.addEventListener('click', resetGame)
})();
