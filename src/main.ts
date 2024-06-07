// create buttons with letters of the alphabet
const alphabet: string = "abcdefghijklmnopqrstuvwxyz";
const guessed: string[] = [];
const liveScore = document.getElementById("lives") as HTMLElement;
const wordlist = [
  "Lepra",
  "Leckomio",
  "Fructose",
  "Amalgam",
  "Zamperoni",
  "AllCopsAreBastards",
];
let word: string;
let hiddenWord: string;
let lives = 9;
// save the eventListener callback function, to be able to reference them again later
const listeners: Record<string, () => void> = {};

const alphabetDiv = document.getElementById("alphabet");

// iterate over alphabet and create letter buttons
for (let letter of alphabet) {
  createLetterButton(letter);
}

// function to create buttons with alphabet-letters
function createLetterButton(letter: string) {
  // create new button
  let newLetter = document.createElement("div");
  newLetter.innerHTML = `<button
  type="button"
  class="letter btn btn-primary"
  id=${letter}>${letter}</button>`;
  listeners[letter] = () => handleGuess(letter);
  // TODO add EventListener for click that calls 'handleGuess(letter)'
  newLetter.firstChild?.addEventListener("click", listeners[letter]);

  // append to alphabetDiv
  alphabetDiv?.appendChild(newLetter);
}

// function to start game
function startGame() {
  // choose a random word from wordlist
  word = wordlist[Math.floor(Math.random() * wordlist.length)];
  liveScore.innerText = `You only have ${lives} left. Make them count, bitch!`;
  liveScore.style.color = "white";

  encryptWord();

  const hangmanItems: NodeListOf<HTMLDialogElement> =
    document.querySelectorAll(".hangman-item");
  hangmanItems.forEach((item) => (item.style.display = "none"));
}

function encryptWord() {
  // Access div with id 'word' and create a new div with its content
  const wordDiv = document.getElementById("word");
  hiddenWord = word
    .split("")
    .map((letter) => {
      console.log(letter, word, guessed);
      return guessed.includes(letter.toLowerCase()) ? letter : "_";
    })
    .join(" ");
  wordDiv!.innerHTML = `${hiddenWord}`;
  wordDiv!.style.color = "white";
}

function handleGuess(letter: string) {
  const letterButtons = document.querySelectorAll(".letter");
  // disable button after click
  console.log(letter);
  // disable letters that we already guessed
  const letterButton = document.getElementById(letter) as HTMLButtonElement;
  letterButton.disabled = true;

  // keep track of all the letters we already guessed
  guessed.push(letter);

  // check if the letter is in the answer
  if (word.match(letter)) {
    encryptWord();
    setTimeout(() => {
      if (!hiddenWord.includes("_")) {
        alert("You won!!!");
        letterButtons.forEach((btn) =>
          btn.removeEventListener("click", listeners[btn.id])
        );
      }
    }, 300);
  } else {
    if (lives > 0) {
      const item = document.getElementById(
        `hangman_${lives}`
      ) as HTMLDivElement;
      item.style.display = "inline";
      lives--;
      liveScore.innerText = `You only have ${lives} left. Make them count, bitch!`;
      liveScore.style.color = "white";
    }
    console.log(`Remaining lives: ${lives}`);

    setTimeout(() => {
      if (lives <= 0) {
        alert("You lost!!!");
      }
    }, 300);
  }
}

startGame();

// const alphabet: string = "abcdefghijklmnopqrstuvwxyz";
// const guessed: string[] = [];
// const alphabetDiv = document.getElementById("alphabet");
// let wrongGuess = 0;
// const listeners: Record<string, () => void> = {};
// let lives = 9;
// const wordList = [
//   "Lepra",
//   "Mutschekipsche",
//   "Fructose",
//   "Amalgam",
//   "UlliHoeness",
//   "Papperlapapp",
//   "",
// ];
// let word: string;
// let hiddenWord: string;

// // iterate over alphabet and create letter buttons

// for (let letter of alphabet) {
//   createLetterButton(letter);
// }

// function createLetterButton(letter: string) {
//   // Create a new button element
//   const newLetter = document.createElement("div");
//   newLetter.innerHTML = `<button type="button" class="letter btn btn-primary" id="${letter}">${letter}</button>`;

//   alphabetDiv?.appendChild(newLetter);

//   // Add event listener for click that calls 'handleGuess(letter)'
//   newLetter.firstChild?.addEventListener("click", () => handleGuess(letter));
// }

// // array of possible words

// // function to start game
// function startGame(): void {
//   word = wordList[Math.floor(Math.random() * wordList.length)];
//   // return wordList[randomWord];
//   console.log(word);

//   encryptWord();
// }

// function encryptWord() {
//   // Access div with id 'word' and create a new div with its content
//   const wordDiv = document.getElementById("word");
//   hiddenWord = word
//     .split("")
//     .map((letter) => {
//       console.log(letter, word, guessed);
//       return guessed.includes(letter.toLowerCase()) ? letter : "_";
//     })
//     .join(" ");
//   wordDiv!.innerHTML = `${hiddenWord}`;
//   wordDiv!.style.color = "white";
// }

// // function handleGuess disable button after click

// function handleGuess(letter: string) {
//   // Return a disabled button with Bootstrap styling
//   console.log(letter);
//   // return `<button type="button" class="btn btn-primary" disabled>${letter}</button>`;
//   // disable letters that we already guessed
//   const letterButton = document.getElementById(letter) as HTMLDivElement;
//   letterButton?.classList.add("disabled");
//   letterButton.disabled = true;

//   // keep track of all the letters we already guessed
//   guessed.push(letter);
//   // check if the letter is in the answer
//   if (word.match(letter)) {
//     encryptWord();
//     setTimeout(() => {
//       if (!hiddenWord.includes("_")) {
//         alert("You Won!");
//       }
//     }, 1000);
//   } else {
//     if (lives > 0) {
//       lives--;
//     }
//     console.log(`Remaining lives: ${lives}`);
//     setTimeout(() => {
//       if (lives <= 0) {
//         alert("You lost!");
//         const letterButton = document.querySelector(".letter");

//         // code was copied showing error
//         // letterButton.forEach(btn.removeEventlistener("click", () => handleGuess(btn.id)) => {

//         // });
//       }
//     });
//   }
// }

// startGame();
