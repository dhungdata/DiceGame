// const p1 = document.getElementById('p-01');

let diceRoll = [0,0,0,0];
let roundScore = [0,0];//first index is user's round score. second index is CPU's round score.
let totalScore = [0,0];//first index is user's total score. second index is CPU's total score.
let roundTurn = 0;// 3 rounds total.
let activePlayer = 0;//0 is user playing. 1 is CPU playing.

function randomizeDice(){
    if(activePlayer === 0){
        diceRoll[0] = Math.floor( Math.random() * 6 )+1;
        diceRoll[1] = Math.floor( Math.random() * 6 )+1;
    }else{
        diceRoll[2] = Math.floor( Math.random() * 6 )+1;
        diceRoll[3] = Math.floor( Math.random() * 6 )+1;
    }
}

function diceGame(dice1, dice2){
    if(activePlayer === 0){
        if(dice1 === 1 || dice2 === 1){
            roundScore[0] = 0;
            totalScore[0] += 0;
            console.log(`P1 - Dice1: ${dice1} Dice2: ${dice2}. Round Score: ${roundScore[0]}`);
            console.log("P1's Total Score: " + totalScore[0]+"\n");
            activePlayer = 1;
        }else if(dice1 === dice2){
            roundScore[0] = (dice1+dice2)*2;
            totalScore[0] += (dice1+dice2)*2;
            console.log(`P1 - (Dice1: ${dice1} Dice2: ${dice2})*2. Round Score: ${roundScore[0]}`);
            console.log("P1's Total Score: " + totalScore[0]+"\n");
            activePlayer = 1;
        }else{
            roundScore[0] = dice1 + dice2;
            totalScore[0] += dice1 + dice2;
            console.log(`P1 - Dice1: ${dice1} Dice2: ${dice2}. Round Score: ${roundScore[0]}`);
            console.log("P1's Total Score: " + totalScore[0]+"\n");
            activePlayer = 1;
        }
    }else{
        if(dice1 === 1 || dice2 === 1){
            roundScore[1] = 0;
            totalScore[1] += o;
            console.log(`P2 - Dice1: ${dice1} Dice2: ${dice2}. Round Score: ${roundScore[1]}`);
            console.log("P2's Total Score: " + totalScore[1]+"\n");
            activePlayer = 0;
        }else if(dice1 === dice2){
            roundScore[1] = (dice1+dice2)*2;
            totalScore[1] += (dice1+dice2)*2;
            console.log(`P2 - (Dice1: ${dice1} Dice2: ${dice2})*2. Round Score: ${roundScore[1]}`);
            console.log("P2's Total Score: " + totalScore[1]+"\n");
            activePlayer = 0;
        }else{
            roundScore[1] = dice1 + dice2;
            totalScore[1] += dice1 + dice2;
            console.log(`P2 - Dice1: ${dice1} Dice2: ${dice2}. Round Score: ${roundScore[1]}`);
            console.log("P2's Total Score: " + totalScore[1]+"\n");
            activePlayer = 0;
        }
    }
}

const rollDice = document.getElementById("btn-rollDice");
rollDice.addEventListener('click', function(){
});
function play(){//click 'Roll Dice' button to play.
    activePlayer = 0;
    randomizeDice();
    diceGame(diceRoll[0], diceRoll[1]);
    
    activePlayer = 1;
    randomizeDice();
    diceGame(diceRoll[2], diceRoll[3]);

    roundTurn += 1;
    if(roundTurn === 3){
        console.log(`\nGame Over`);
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

play();play();play();

// // new game button; Reset everything.
// const newGame = document.getElementById("btn-newGame");
// newGame.addEventListener('click', function(){
//     totalScore = [0,0]
//     roundScore = 0;
//     activePlayer = 0;
// });