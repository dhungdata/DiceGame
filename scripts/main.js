// const p1 = document.getElementById('p-01');

let diceRoll = [0,0];//first index is dice #1. second index is dice #2.
let diceNumber = [1,2,3,4,5,6];
let roundScore = [0,0];//first index is user's round score. second index is CPU's round score.
let totalScore = [0,0];//first index is user's total score. second index is CPU's total score.
let roundTurn = 0;// 3 rounds total.
let activePlayer = 0;//0 is user playing. 1 is CPU playing.

/* Switch active player */
function switchPlayer(){
    if(activePlayer === 0){//if player is user...
        activePlayer = 1;  //...then switch to CPU
    }else{               //else if player is CPU...
        activePlayer = 0;//... then switch to user
    }
}

/* randomize dice #1 and #2 */
function randomizeDice(){
    diceRoll[0] = Math.floor( Math.random() * 6 )+1;
    diceRoll[1] = Math.floor( Math.random() * 6 )+1;
}

/* Changes the image of the dice */
function changeDiceImage(){
    let diceImage1 = ``;
    let diceImage2 = ``;

    if(diceRoll[0]===1){
        diceImage1 = `images/${diceNumber[0]}.png`;
    }
    if(diceRoll[1]===1){
        diceImage2 = `images/${diceNumber[0]}.png`;
    }
    if(diceRoll[0]===2){
        diceImage1 = `images/${diceNumber[1]}.png`;
    }
    if(diceRoll[1]===2){
        diceImage2 = `images/${diceNumber[1]}.png`;
    }
    if(diceRoll[0]===3){
        diceImage1 = `images/${diceNumber[2]}.png`;
    }
    if(diceRoll[1]===3){
        diceImage2 = `images/${diceNumber[2]}.png`;
    }
    if(diceRoll[0]===4){
        diceImage1 = `images/${diceNumber[3]}.png`;
    }
    if(diceRoll[1]===4){
        diceImage2 = `images/${diceNumber[3]}.png`;
    }
    if(diceRoll[0]===5){
        diceImage1 = `images/${diceNumber[4]}.png`;
    }
    if(diceRoll[1]===5){
        diceImage2 = `images/${diceNumber[4]}.png`;
    }
    if(diceRoll[0]===6){
        diceImage1 = `images/${diceNumber[5]}.png`;
    }
    if(diceRoll[1]===6){
        diceImage2 = `images/${diceNumber[5]}.png`;
    }

    if(activePlayer === 0){//if player is user...
        //User display Dice #1
        document.getElementById('player1-dice1-image').src = diceImage1;
        document.getElementById('player1-dice1-image').style.display = "block";
        //User display Dice #2
        document.getElementById('player1-dice2-image').src = diceImage2;
        document.getElementById('player1-dice2-image').style.display = "block";
    }else{//else if player is CPU...
        //CPU display Dice #1
        document.getElementById('player2-dice1-image').src = diceImage1;
        document.getElementById('player2-dice1-image').style.display = "block";
        //CPU display Dice #2
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
    if(dice1 === 1 || dice2 === 1){//if either dice is a 1...
        roundScore = 0;            //...the value is 0.
        totalScore[activePlayer] += roundScore;
            
        changeDiceImage();//Display Dice #1 & #2
        console.log(`Player ${activePlayer} - Dice1: ${dice1} Dice2: ${dice2}. Round Score: ${roundScore}`);

        displayScores();//Display the round score and total score
        console.log(`Player ${activePlayer}'s Total Score: ${totalScore[activePlayer]}\n`);

        switchPlayer();//
    }else if(dice1 === dice2){//if dice 1 & 2 are the same number...
        roundScore = (dice1+dice2)*2;//...add the two values of the dice*2
        totalScore[activePlayer] += roundScore;

        changeDiceImage();
        console.log(`Player ${activePlayer} - (Dice1: ${dice1} Dice2: ${dice2})*2. Round Score: ${roundScore}`);
        
        displayScores();
        console.log(`Player ${activePlayer}'s Total Score: ${totalScore[activePlayer]}\n`);
        
        switchPlayer();
    }else{
        roundScore = dice1 + dice2; //add the two dices normally
        totalScore[activePlayer] += roundScore;

        changeDiceImage();
        console.log(`Player ${activePlayer} - Dice1: ${dice1} Dice2: ${dice2}. Round Score: ${roundScore}`);
        
        displayScores();
        console.log(`Player ${activePlayer}'s Total Score: ${totalScore[activePlayer]}\n`);
        
        switchPlayer();
    }
}

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

    if(roundTurn === 3){//Game ends after three rounds
        console.log(`Game Over`);
        if(totalScore[0] > totalScore[1]){
            console.log(`${totalScore[0]} > ${totalScore[1]}`);
            console.log("Congratulations! You win!\n");
        }else if(totalScore[0] < totalScore[1]){
            console.log(`${totalScore[0]} < ${totalScore[1]}`);
            console.log("You lost! The CPU wins.\n");
        }else{
            console.log(`${totalScore[0]} = ${totalScore[1]}`);
            console.log("Tied game\n");
        }
        roundTurn = 0;
        // document.getElementById('player1-dice1-image').style.display = "none";
        // document.getElementById('player1-dice2-image').style.display = "none";
        // document.getElementById('player2-dice1-image').style.display = "none";
        // document.getElementById('player2-dice2-image').style.display = "none";
        // document.getElementById('round-score1').innerHTML = "";
        // document.getElementById('total-score1').innerHTML = "";
        // document.getElementById('round-score2').innerHTML = "";
        // document.getElementById('total-score2').innerHTML = "";
    }
});
// function play(){//click 'Roll Dice' button to play.
//     //User Roll Dice
//     randomizeDice();
//     diceGame(diceRoll[0], diceRoll[1]);
    
//     //CPU Roll Dice
//     randomizeDice();
//     diceGame(diceRoll[0], diceRoll[1]);

//     roundTurn += 1;

//     if(roundTurn === 3){
//         console.log(`Game Over`);
//         if(totalScore[0] > totalScore[1]){
//             console.log(`${totalScore[0]} > ${totalScore[1]}`);
//             console.log("Congratulations! You win!\n");
//         }else if(totalScore[0] < totalScore[1]){
//             console.log(`${totalScore[0]} < ${totalScore[1]}`);
//             console.log("You lost! The CPU wins.\n");
//         }else{
//             console.log(`${totalScore[0]} = ${totalScore[1]}`);
//             console.log("Tied game\n");
//         }
//         roundTurn = 0;
//         document.getElementById('player1-dice1-image').style.display = "none";
//         document.getElementById('player1-dice2-image').style.display = "none";
//         document.getElementById('player2-dice1-image').style.display = "none";
//         document.getElementById('player2-dice2-image').style.display = "none";
//         document.getElementById('round-score1').innerHTML = "";
//         document.getElementById('total-score1').innerHTML = "";
//         document.getElementById('round-score2').innerHTML = "";
//         document.getElementById('total-score2').innerHTML = "";
//     }
// }

/* New game button; Reset everything */
const newGame = document.getElementById("btn-newGame");
newGame.addEventListener('click', function(){
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
});

// function newGame(){
//     diceRoll = [0,0];
//     roundScore = [0,0];
//     totalScore = [0,0];
//     roundTurn = 0;
//     activePlayer = 0;
// document.getElementById('player1-dice1-image').style.display = "none";
// document.getElementById('player1-dice2-image').style.display = "none";
// document.getElementById('player2-dice1-image').style.display = "none";
// document.getElementById('player2-dice2-image').style.display = "none";
// document.getElementById('round-score1').innerHTML = "";
// document.getElementById('total-score1').innerHTML = "";
// document.getElementById('round-score2').innerHTML = "";
// document.getElementById('total-score2').innerHTML = "";
// }

// play();play();play();
// newGame();