/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let scores, activePlayer, roundScore, gamePlaying, previousDice;

const diceDOM = document.querySelector('.dice');
const current0 = document.getElementById('current-0');
const current1 = document.getElementById('current-1');
const panel0 = document.querySelector('.player-0-panel');
const panel1 = document.querySelector('.player-1-panel');
const score0 = document.getElementById('score-0');
const score1 = document.getElementById('score-1');
const name0 = document.getElementById('name-0');
const name1 = document.getElementById('name-1');

init();

document.querySelector('.btn-roll').addEventListener('click', () => {
  if (gamePlaying) {
    let dice = Math.floor(Math.random() * 6) + 1;
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    if (dice === 6 && previousDice === 6) {
      scores[activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent = '0';
      nextPlayer();
    } else if (dice !== 1) {
      //add score
      previousDice = dice;
      roundScore += dice;
      document.getElementById(
        'current-' + activePlayer
      ).textContent = roundScore;
    } else {
      //move to next player
      nextPlayer();
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', () => {
  if (gamePlaying) {
    //add current score to global score
    scores[activePlayer] += roundScore;

    //update UI
    document.querySelector('#score-' + activePlayer).textContent =
      scores[activePlayer];

    // check if player won the game
    if (scores[activePlayer] >= 20) {
      document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
      diceDOM.style.display = 'none';
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.add('winner');
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.remove('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  previousDice = 0;
  roundScore = 0;
  current0.textContent = '0';
  current1.textContent = '0';
  panel0.classList.toggle('active');
  panel1.classList.toggle('active');
  diceDOM.style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  diceDOM.style.display = 'none';
  score0.textContent = '0';
  current0.textContent = '0';
  score1.textContent = '0';
  current1.textContent = '0';
  name0.textContent = 'Player 1';
  name1.textContent = 'Player 2';
  panel0.classList.remove('winner');
  panel1.classList.remove('winner');
  panel0.classList.remove('active');
  panel0.classList.add('active');
  panel1.classList.remove('active');
  gamePlaying = true;
}
