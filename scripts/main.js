// const p1 = document.getElementById('p-01');

let diceRoll = [0,0];//First index is dice #1. second index is dice #2.
let roundScore = [0,0];//First index is user's round score. Second index is CPU's round score.
let totalScore = [0,0];//First index is user's total score. Second index is CPU's total score.
let roundTurn = 0;// 3 rounds total.
let activePlayer = 0;//0 is user playing. 1 is CPU playing.

let userHasNotStartedAnimationYet = true;
let popupAnimationHandler;
let opacityValue = 0;
const popUp      = document.getElementById('pop-up');
const closePopup = document.getElementById('btn-close');

/* Switch active player between user and CPU */
function switchPlayer(){
    if(activePlayer === 0){//If player is user...
        activePlayer = 1;  //...then switch to CPU
    }else{               //Else if player is CPU...
        activePlayer = 0;//... then switch to user
    }
}

/* Randomize dice #1 & #2 */
function randomizeDice(){
    diceRoll[0] = Math.floor( Math.random() * 6 )+1;
    diceRoll[1] = Math.floor( Math.random() * 6 )+1;
}

/* Change the image of the dice */
function changeDiceImage(){
    let diceImage1 = "";
    let diceImage2 = "";

    if(diceRoll[0]===1){
        diceImage1 = "images/1.png";
    }else if(diceRoll[0]===2){
        diceImage1 = "images/2.png";
    }else if(diceRoll[0]===3){
        diceImage1 = "images/3.png";
    }else if(diceRoll[0]===4){
        diceImage1 = "images/4.png";
    }else if(diceRoll[0]===5){
        diceImage1 = "images/5.png";
    }else{
        diceImage1 = "images/6.png";
    }

    if(diceRoll[1]===1){
        diceImage2 = "images/1.png";
    }else if(diceRoll[1]===2){
        diceImage2 = "images/2.png";
    }else if(diceRoll[1]===3){
        diceImage2 = "images/3.png";
    }else if(diceRoll[1]===4){
        diceImage2 = "images/4.png";
    }else if(diceRoll[1]===5){
        diceImage2 = "images/5.png";
    }else if(diceRoll[1]===6){
        diceImage2 = "images/6.png";
    }

    if(activePlayer === 0){//If player is user
        //Display user dice #1 image
        document.getElementById('player1-dice1-image').src = diceImage1;
        document.getElementById('player1-dice1-image').style.display = "block";
        //Display user dice #2 image
        document.getElementById('player1-dice2-image').src = diceImage2;
        document.getElementById('player1-dice2-image').style.display = "block";
    }else{//else if player is CPU
        //Display CPU dice #1 image
        document.getElementById('player2-dice1-image').src = diceImage1;
        document.getElementById('player2-dice1-image').style.display = "block";
        //Display CPU dice #2 image
        document.getElementById('player2-dice2-image').src = diceImage2;
        document.getElementById('player2-dice2-image').style.display = "block";
    }
}

/* Display to HTML the round score and total score for the players */
function displayScores(){
    if(activePlayer === 0){
        document.getElementById('round-score1').innerHTML = `${roundScore}`;
        document.getElementById('total-score1').innerHTML = `${totalScore[activePlayer]}`;
    }else{
        document.getElementById('round-score2').innerHTML = `${roundScore}`;
        document.getElementById('total-score2').innerHTML = `${totalScore[activePlayer]}`;
    }
}

/* The main functionality of the dice game */
function diceGame(dice1, dice2){
    if(dice1 === 1 || dice2 === 1){//If either dice is a 1...
        roundScore = 0;            //...the value is 0.
        totalScore[activePlayer] += roundScore;
            
        changeDiceImage();//Display dice #1 & #2
        console.log(`Player ${activePlayer} - Dice1: ${dice1} Dice2: ${dice2}. Round Score: ${roundScore}`);

        displayScores();//Display the round score and total score
        console.log(`Player ${activePlayer}'s Total Score: ${totalScore[activePlayer]}\n`);

        switchPlayer();//
    }else if(dice1 === dice2){//If dice 1 & 2 are the same number...
        roundScore = (dice1+dice2)*2;//...add the two values of the dice*2
        totalScore[activePlayer] += roundScore;

        changeDiceImage();
        console.log(`Player ${activePlayer} - (Dice1: ${dice1} Dice2: ${dice2})*2. Round Score: ${roundScore}`);
        
        displayScores();
        console.log(`Player ${activePlayer}'s Total Score: ${totalScore[activePlayer]}\n`);
        
        switchPlayer();
    }else{
        roundScore = dice1 + dice2; //Add the two dices normally
        totalScore[activePlayer] += roundScore;

        changeDiceImage();
        console.log(`Player ${activePlayer} - Dice1: ${dice1} Dice2: ${dice2}. Round Score: ${roundScore}`);
        
        displayScores();
        console.log(`Player ${activePlayer}'s Total Score: ${totalScore[activePlayer]}\n`);
        
        switchPlayer();
    }
}

/* Fade in pop-up message box */
function fadeIn(){
    opacityValue = opacityValue + .05;
    if(opacityValue <= 1){
        popUp.style.opacity = opacityValue;
        requestAnimationFrame( fadeIn );
    }else{
        popUp.style.opacity = 1;
    }    
}

/* Allow user to close and hide the pop-up after they have seen it */
closePopup.addEventListener("click", function(){
    //Enable the button in the pop-up so that clicking it will hide the pop-up (eg: either change opacity from 1 back to 0, or apply a display property of none)
    popUp.style.opacity = "0";//Note: Current CSS style of id="pop-up" is opacity:0;
    newGame(); //Reset everything when you close the pop-up message.
});

/* 'Roll Dice' button to play */
const rollDice = document.getElementById("btn-rollDice");
rollDice.addEventListener('click', function(){
    //User Roll Dice
    randomizeDice();
    diceGame(diceRoll[0], diceRoll[1]);
    
    //CPU Roll Dice
    randomizeDice();
    diceGame(diceRoll[0], diceRoll[1]);
    roundTurn += 1;

    //Game Over message after three rounds
    if(roundTurn === 3){
        console.log(`Game Over`);
        if(totalScore[0] > totalScore[1]){

            popupAnimationHandler = requestAnimationFrame( fadeIn );
            // $('#pop-up').hide().fadeIn();

            console.log(`${totalScore[0]} > ${totalScore[1]}`);
            console.log("Congratulations! You win!\n");

            document.getElementById('game-over-msg').innerHTML = `${totalScore[0]} > ${totalScore[1]}\n\nCongratulations! You win!`;
        }else if(totalScore[0] < totalScore[1]){
 
            popupAnimationHandler = requestAnimationFrame( fadeIn );
            // $('#pop-up').hide().fadeIn();

            console.log(`${totalScore[0]} < ${totalScore[1]}`);
            console.log("You lost! The CPU wins.\n");

            document.getElementById('game-over-msg').innerHTML = `${totalScore[0]} < ${totalScore[1]}\n\nYou lost! The CPU wins.`;
        }else{
  
            popupAnimationHandler = requestAnimationFrame( fadeIn );
            // $('#pop-up').hide().fadeIn();

            console.log(`${totalScore[0]} = ${totalScore[1]}`);
            console.log("Tie game\n");

            document.getElementById('game-over-msg').innerHTML = `${totalScore[0]} = ${totalScore[1]}\n\nTie game`;
        }
    }
});

/* Click to start a new game */
const newGameButton = document.getElementById("btn-newGame");
newGameButton.addEventListener('click', function(){
    newGame();
});

/* New game; reset everything */
function newGame(){
    diceRoll = [0,0];
    roundScore = [0,0];
    totalScore = [0,0];
    roundTurn = 0;
    activePlayer = 0;
    document.getElementById('player1-dice1-image').style.display = "none";
    document.getElementById('player1-dice2-image').style.display = "none";
    document.getElementById('player2-dice1-image').style.display = "none";
    document.getElementById('player2-dice2-image').style.display = "none";
    document.getElementById('round-score1').innerHTML = "";
    document.getElementById('total-score1').innerHTML = "";
    document.getElementById('round-score2').innerHTML = "";
    document.getElementById('total-score2').innerHTML = "";
}

/* Edit player's name */
const editName = document.getElementById("btn-editName");
editName.addEventListener('click', function(){
    player1 = prompt("Enter your name");

    document.getElementById('your-name').innerHTML = player1;
});