const words = [
  "adaptable",
  "pocket",
  "shock",
  "crabby",
  "stage",
  "wealthy",
  "birthday",
  "grumpy",
  "chance",
  "produce",
  "calendar",
  "nonchalant",
];

const maxWrongGuesses = 5;
let wordToGuess = "";
let guessedLetters = [];
let wrongGuesses = 0;
let imageCount = 1;

//Random word from 'words' array
const randomWord = () => words[Math.floor(Math.random() * words.length)];

window.addEventListener("load", () => {
  const meltingSnowman = document.querySelector(".melting-snowman");
  const wordContainer = document.querySelector(".word-display");
  const guessesText = document.querySelector(".guesses");
  const allLetters = document.querySelector(".all-letters");
  const message = document.querySelector(".message");
  meltingSnowman.innerHTML = `<img src="images/snowman1.png" alt="MeltingSnowman 1">`;
  wordContainer.style.display = "none";
  guessesText.style.display = "none";
  allLetters.style.display = "none";
  message.style.display = "none";
});

//Function to start playing
const startPlaying = () => {
  const playButton = document.querySelector(".play-button");
  const wordContainer = document.querySelector(".word-display");
  const guessesText = document.querySelector(".guesses");
  const allLetters = document.querySelector(".all-letters");
  const message = document.querySelector(".message");
  playButton.style.visibility = "hidden";
  wordContainer.style.display = "block";
  guessesText.style.display = "block";
  allLetters.style.display = "block";
  message.style.display = "block";
  wrongGuesses = 0;
  wordToGuess = randomWord();
  guessedLetters = Array(wordToGuess.length).fill("_");
  console.log(wordToGuess);

  updateWordDisplay();
  updateGuesses();
  updateMeltingSnowman();

  //Generate alphabet buttons
  allLetters.innerHTML = "";
  for (let i = 0; i < 26; i++) {
    const alphabet = String.fromCharCode(97 + i);
    const letterButton = document.createElement("button");
    letterButton.innerText = alphabet;
    letterButton.addEventListener("click", () => {
      guessLetter(alphabet);
    });
    allLetters.appendChild(letterButton);
  }
};

//Update the word display
const updateWordDisplay = () => {
  const wordContainer = document.querySelector(".word-display");
  wordContainer.innerText = guessedLetters.join(" ");
};

//Update melting snowman image
const updateMeltingSnowman = () => {
  const meltingSnowman = document.querySelector(".melting-snowman");
  if (imageCount <= 5) {
    meltingSnowman.innerHTML = `<img src="images/snowman${imageCount}.png" alt="MeltingSnowman ${imageCount}">`;
    imageCount++;
  }
};

//Update the remaining guesses left
const updateGuesses = () => {
  const guessesText = document.querySelector(".guesses");
  guessesText.innerText = `you have ${
    maxWrongGuesses - wrongGuesses
  } guesses left`;
};

//Letter guessing
const guessLetter = (alphabet) => {
  const message = document.querySelector(".message");
  message.innerText = "";
  if (guessedLetters.includes(alphabet)) {
    message.innerText = "you've already guessed that letter";
    return;
  }
  for (i = 0; i < wordToGuess.length; i++) {
    if (wordToGuess[i] === alphabet) {
      guessedLetters[i] = alphabet;
      updateWordDisplay();
    }
  }
  if (!wordToGuess.includes(alphabet)) {
    wrongGuesses++;
    updateGuesses();
    updateMeltingSnowman();
  }
  updateWinOrLoss();
};

const updateWinOrLoss = () => {
  const meltingSnowman = document.querySelector(".melting-snowman");
  const allLetterButtons = document.querySelectorAll(".all-letters button");
  if (guessedLetters.join("") === wordToGuess) {
    meltingSnowman.innerHTML = `<img src="images/youWin.png" alt="you win">`;
    disableAlphabetButtons(allLetterButtons);
  }
  if (wrongGuesses >= maxWrongGuesses) {
    meltingSnowman.innerHTML = `<img src="images/gameOver.png" alt="game over">`;
    disableAlphabetButtons(allLetterButtons);
  }
};

// Function to disable all letter buttons.
const disableAlphabetButtons = (buttons) => {
  buttons.forEach((button) => {
    button.disabled = true;
    button.removeEventListener("click", guessLetter);
  });
};
