// const p1 = document.getElementById('p-01');

let diceRoll = [0,0];//First index is dice #1. second index is dice #2.
let roundScore = [0,0];//First index is user's round score. Second index is CPU's round score.
let totalScore = [0,0];//First index is user's total score. Second index is CPU's total score.
let roundTurn = 0;// 3 rounds total.
let activePlayer = 0;//0 is user playing. 1 is CPU playing.
let player1 = 'You';//Default name

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

        switchPlayer();
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

/* 'Roll Dice' button to play */
$("#btn-rollDice").click(function(){
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
            console.log(`${totalScore[0]} > ${totalScore[1]}`);
            console.log("Congratulations! You win!\n");
            
            popup();
            
            document.getElementById('game-over-msg').innerHTML = `${totalScore[0]} > ${totalScore[1]}\n\nCongratulations! You win!`;
        }else if(totalScore[0] < totalScore[1]){
            console.log(`${totalScore[0]} < ${totalScore[1]}`);
            console.log("You lost! The CPU wins.\n");

            popup();

            document.getElementById('game-over-msg').innerHTML = `${totalScore[0]} < ${totalScore[1]}\n\nYou lost! The CPU wins.`;
        }else{
            console.log(`${totalScore[0]} = ${totalScore[1]}`);
            console.log("Tie game\n");

            popup();

            document.getElementById('game-over-msg').innerHTML = `${totalScore[0]} = ${totalScore[1]}\n\nTie game`;
        }
    }
});

/* Popup message when the game is over */
function popup(){
    $('#overlay').fadeIn(100);
    $('#pop-up').fadeIn(200);
}

/* Close pope-up*/
$('#btn-close').click(function() {
    $('#pop-up').fadeOut(200, function() {
      $('#overlay').fadeOut(100);
      newGame(); //Reset everything when you close the pop-up message.
    });
});

/* Click to start a new game */
$("#btn-newGame").click(function(){
    newGame();
});

/* New game; reset everything */
function newGame(){
    diceRoll = [0,0];
    roundScore = [0,0];
    totalScore = [0,0];
    roundTurn = 0;
    activePlayer = 0;
    player1 = 'You';
    document.getElementById('your-name').innerHTML = player1;
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
$("#btn-editName").click(function(){
    player1 = prompt("Enter your name"); 
    document.getElementById('your-name').innerHTML = player1;
});