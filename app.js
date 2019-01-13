/*
GAME FUNCTION
- Player must guess a number between a min and a max.
- Player gets a certain number of guesses.
- Notify player of guesses remaining.
- Notify player of the correct answer when failed.
- Allow player to choose to play again.
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('click', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener('click', function(){
  // Convert guess string to integer
  let guess = parseInt(guessInput.value);

  // Validate input
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Check if won
  if(guess === winningNum){

    // Game over - won
    gameOver(true, `${winningNum} is correct...YOU WIN!`);

  } else {

    // Wrong number
    guessesLeft -= 1; // Same as writing 'guessesLeft = guessesLeft - 1'

    if(guessesLeft === 0){

      // Game over - lost
      gameOver(false, `Game over...you lost. The correct number was ${winningNum}!`);

    } else {
      // Game continues - answer wrong

      // Change border color
      guessInput.style.borderColor = 'red';

      // Clear input
      guessInput.value = '';

      // Set message
      if(guessesLeft === 1){
        setMessage(`${guess} is not correct. You have ${guessesLeft} guess left!`, 'red');
      } else {
        setMessage(`${guess} is not correct. You have ${guessesLeft} guesses left!`, 'red');
      }

    }
  }
});

// Game over
function gameOver(won, msg){
  
  let color;
  let bgColor;
  won === true ? (color = 'green', bgColor = '#d5fdd5') : (color = 'red', bgColor = '#ffcccc');
  
  // Disable input
  guessInput.disabled = true;
  // Change color
  message.style.color = color;
  // Change border color
  guessInput.style.borderColor = color;
  // Change background color
  guessInput.style.background = bgColor;
  // Set message
  setMessage(msg);

  // Play again
  guessBtn.value = 'Play again';
  // Append new class
  guessBtn.className += 'play-again';

}

// Get winning number
function getRandomNum(){
  return Math.floor(Math.random()*(max-min+1)+min);
}

// Set message
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}