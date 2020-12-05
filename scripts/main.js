const p1 = document.getElementById('p-01');

let diceRoll = [0,0];
let roundScore = [0,0];//first index is user's round score. second index is CPU's round score.
let totalScore = [0,0];//first index is user's total score. second index is CPU's total score.
let roundTurn = 0;// 3 rounds total.
let activePlayer = 0;//0 is user playing. 1 is CPU playing.

function switchPlayer(){
    //switching active player
    if(activePlayer === 0){//if player is user...
        activePlayer = 1;  //...then switch to CPU
    }else{               //else if player is CPU...
        activePlayer = 0;//... then switch to user
    }
}

function randomizeDice(){
    diceRoll[0] = Math.floor( Math.random() * 6 )+1;
    diceRoll[1] = Math.floor( Math.random() * 6 )+1;
}

function diceGame(dice1, dice2){
    if(dice1 === 1 || dice2 === 1){
        roundScore = 0;
        totalScore[activePlayer] += roundScore;
        console.log(`Player ${activePlayer} - Dice1: ${dice1} Dice2: ${dice2}. Round Score: ${roundScore}`);
        console.log(`Player ${activePlayer}'s Total Score: ${totalScore[activePlayer]}\n`);
        switchPlayer();
    }else if(dice1 === dice2){
        roundScore = (dice1+dice2)*2;
        totalScore[activePlayer] += roundScore;
        console.log(`Player ${activePlayer} - (Dice1: ${dice1} Dice2: ${dice2})*2. Round Score: ${roundScore}`);
        console.log(`Player ${activePlayer}'s Total Score: ${totalScore[activePlayer]}\n`);
        switchPlayer();
    }else{
        roundScore = dice1 + dice2;
        totalScore[activePlayer] += roundScore;
        console.log(`Player ${activePlayer} - Dice1: ${dice1} Dice2: ${dice2}. Round Score: ${roundScore}`);
        console.log(`Player ${activePlayer}'s Total Score: ${totalScore[activePlayer]}\n`);
        switchPlayer();
    }
}

const rollDice = document.getElementById("btn-rollDice");
rollDice.addEventListener('click', function(){
});
function play(){//click 'Roll Dice' button to play.
    //User Roll Dice
    randomizeDice();
    diceGame(diceRoll[0], diceRoll[1]);
    
    //CPU Roll Dice
    randomizeDice();
    diceGame(diceRoll[0], diceRoll[1]);

    roundTurn += 1;
    
    if(roundTurn === 3){
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
    }
}

// new game button; Reset everything.
const newGame = document.getElementById("btn-newGame");
newGame.addEventListener('click', function(){
    totalScore = [0,0]
    roundScore = 0;
    activePlayer = 0;

});

play();play();play();