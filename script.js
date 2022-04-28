// GAME FUNCTION:
// -Player must guess a number between min and max 
// -Player gets a certain amount of guesses
// -Notify player of guesses remaining
// -Notify player of the correct answer if loose 
// -Let player choose to play again 


// Game values
let min = 1;
let max = 10;
let winningNum = getWinningNum(min, max);
let guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessBtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');

// Assign UI min and max

minNum.textContent = min;
maxNum.textContent = max;

// Play Again event listener

game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload()
    }
})

// Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

//   Validate
if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter the number between ${min} and ${max}`, 'red');
}

// Check if won
if(guess === winningNum){
    
    gameOver(true, `${winningNum} is correct. YOU WIN!`);

}else{
    // Wrong Number
    guessesLeft -=1

    if(guessesLeft === 0){
        // Game over - lost
        
        gameOver(false, `Game over, you lost. The winning number was ${winningNum}`);

        }else{
        // Game continues answer wrong
            // Change input color
            guessInput.style.borderColor = 'red';

            // clear Input
            guessInput.value = '';

            //Tell user the number of chances left
            setMessage(`${guess} not correct, ${guessesLeft} guesses left.`, 'red');
         }
}

});

// Game Over

function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';

     // Disable input
     guessInput.disabled = true;

     // Change input color
     guessInput.style.borderColor = color;

    //  Set text color
    message.style.color = color;

     // Set message
     setMessage(msg);

    //  Play Again?

    guessBtn.value = 'Play Again';

    // Add a className
    guessBtn.className +='play-again';
 
}

// Get winning Number

function getWinningNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}


// Set Message

function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}