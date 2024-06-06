const alphabet: string = "abcdefghijklmnopqrstuvwxyz";

const alphabetDiv = document.getElementById("alphabet");

// iterate over alphabet and create letter buttons

for (let letter of alphabet) {
  createLetterButton(letter);
}

function createLetterButton(letter: string) {
  // Create a new button element
  const newLetter = document.createElement("div");
  newLetter.innerHTML = `<button type="button" class="letter btn btn-primary" id="${letter}">${letter}</button>`;

  alphabetDiv?.appendChild(newLetter);

  // Add event listener for click that calls 'handleGuess(letter)'
  newLetter.addEventListener("click", () => handleGuess(letter));
}

function handleGuess(letter: string) {
  // Return a disabled button with Bootstrap styling
  return `<button type="button" class="btn btn-primary" disabled>${letter}</button>`;
}

// array of possible words

const wordList = [
  "Lepra",
  "Mutschekipsche",
  "Fructose",
  "Amalgam",
  "UlliHoeness",
  "Papperlapapp",
  "",
];
let word: string;
let hiddenWord: string;
// function to start game
function startGame(): void {
  word = wordList[Math.floor(Math.random() * wordList.length)];
  // return wordList[randomWord];
  console.log(word);

  encryptWord();
}

function encryptWord() {
  // Access div with id 'word' and create a new div with its content
  const wordDiv = document.getElementById("word");
  hiddenWord = word
    .split("")
    .map((letter) => {
      return "_";
    })
    .join(" ");
  wordDiv!.innerHTML = `${hiddenWord}`;
  wordDiv!.style.color = "white";
}
// function handleGuess disable button after click

startGame();
