// Sets the amount of guesses a user has used and how many are available at the start of a round
let numberOfGuessesUsed = 1;
let startingAmountOfGuesses = 11;

// Getting elements from the DOM
let numberInput = document.querySelector('.numberInput');
let submitButton = document.querySelector('.submitButton');
let previousGuess = document.querySelector('#previousGuess');
let guessesRemaining = document.querySelector('#guessesRemaining');
let guessResult = document.querySelector('#guessResult');

// Write a function that randomly selects a number between 1 - 100, the user then has to guess this number
function randomIntBetween(min, max) { // min and max numbers included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

const randomNumber = randomIntBetween(1, 100)

// Getting a reference to the container div that already exists in the HTML
const container = document.querySelector('.container');

// Creating a button to refresh the page
const newGame = document.createElement('button');
newGame.textContent = "Play Again";
newGame.setAttribute("id", "refresh");

// Function to refresh the page
function refreshPage() {
    window.location.reload(true);
}

// Accessing the gameTitle heading (h2) that already exists in the HTML
const gameTitle = document.querySelector('.gameTitle');

// Display text in case the user inputs anything other than a number between 1 - 100
const wrongInput = document.createElement('div');
wrongInput.textContent = "Please enter a number between 1 and 100";
wrongInput.setAttribute("id", "textAlert");
wrongInput.style.fontSize = "20px";
wrongInput.style.fontWeight = "500";
wrongInput.style.marginTop = "20px";

// Plays a round - checks the user's guess and alerts if they entered anything other than a number between 1 - 100
// - alerts if they guessed too high, too low, or correctly - also increments the amount of guesses used
function playRound(guess) {
    guess = parseInt(numberInput.value);
    numberInput.value = "";

    if (isNaN(guess)|| guess < 1 || guess > 100) {
        gameTitle.appendChild(wrongInput);
        guessResult.textContent = " ";
        numberOfGuessesUsed--;
    
    } if (guess === randomNumber) {
        numberOfGuessesUsed++;
        guessesRemaining.textContent = "Guesses Remaining: " + `${startingAmountOfGuesses - numberOfGuessesUsed}`;
        guessResult.textContent = "Nice! You guessed the correct number!";
        submitButton.removeEventListener('click', playRound);
        container.appendChild(newGame);

        } else if (numberOfGuessesUsed === startingAmountOfGuesses) {
            guessResult.textContent = "You ran out of guesses! The number was " + `${randomNumber}` + "!";
            submitButton.removeEventListener('click', playRound);
            container.appendChild(newGame);
    
    } else if (guess < randomNumber) {
        numberOfGuessesUsed++;
        guessesRemaining.textContent = "Guesses Remaining: " + `${startingAmountOfGuesses - numberOfGuessesUsed}`;
        guessResult.textContent = "Too low. Try again!";
    
    } else if (guess > randomNumber) {
        numberOfGuessesUsed++;
        guessesRemaining.textContent = "Guesses Remaining: " + `${startingAmountOfGuesses - numberOfGuessesUsed}`;
        guessResult.textContent = "Too high. Try again!";
    }
}

// Event listeners for the submit and play again button
submitButton.addEventListener('click', playRound);
newGame.addEventListener('click', refreshPage);