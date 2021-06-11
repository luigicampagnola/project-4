'use strict';
// elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

let currentScore, scores, activePlayer, playing;



const init = () =>{
    //Starting conditions
    currentScore = 0;
    scores = [0, 0];
    activePlayer = 0;
    playing = true;    
    diceEl.classList.add('hidden'); // escondiendo el dice element.
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
}
init();

const switchPlayer = () =>{
    document.getElementById(`current--${activePlayer}`)
    .textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}

const clickHold = ()=>{
    if (playing){
        scores[activePlayer] += currentScore; // add activeplayer score to current score
        document.getElementById(`score--${activePlayer}`) // sets score to active player
        .textContent = scores[activePlayer];
        // if current player is >= 100 he wins
        if(scores[activePlayer]>= 100){
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            switchPlayer();
        }
    }
}

const rollDice = () =>{
    if (playing){
        // 1. generate random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        // 2. display dce
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        //3. check for dice 1

        if(dice !== 1){
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`)
            .textContent = currentScore;
        } else {
            switchPlayer();
        } 
    }
}



btnRoll.addEventListener('click',  rollDice)

btnHold.addEventListener('click', clickHold)

btnNew.addEventListener('click', init)

