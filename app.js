/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundscores, activePlayer, gamePlaying, prevDiceValue, prevDiceValue2, scoreToWin, scoreInput, prevScoreToWin,
    diceValue, diceValue2;

document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {
        document.getElementById('setScoreForm').style.display = 'none';
        diceValue = Math.floor(Math.random() * 6) + 1;
        diceValue2 = Math.floor(Math.random() * 6) + 1;

        var dice1DOM = document.getElementById('dice');
        dice1DOM.style.display = 'block';
        dice1DOM.src = 'dice-' + diceValue + '.png';

        var dice2DOM = document.getElementById('dice2');
        dice2DOM.style.display = 'block';
        dice2DOM.src = 'dice-' + diceValue2 + '.png';

        if ((prevDiceValue === 6 || prevDiceValue2 === 6) && (diceValue === 6 || diceValue2 === 6)) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]
            nextPlayer(null, null, true);

        } else if (diceValue !== 1 && diceValue2 !== 1) {
            roundScore += diceValue + diceValue2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else {
            nextPlayer(diceValue, diceValue2, false)
        }

        smallDieDOM = document.getElementById('smallDie');
        smallDie2DOM = document.getElementById('smallDie2');
        previousRoll = document.getElementById('previousRoll');

        smallDieDOM.style.display = 'block';
        smallDie2DOM.style.display = 'block';
        previousRoll.style.display = 'block';

        prevDiceValue ? smallDieDOM.src = 'dice-' + prevDiceValue + '.png' : smallDieDOM.style.display = 'none'
        prevDiceValue2 ? smallDie2DOM.src = 'dice-' + prevDiceValue2 + '.png' : smallDie2DOM.style.display = 'none';
        prevDiceValue ? null : previousRoll.style.display = 'none';

        prevDiceValue = diceValue;
        prevDiceValue2 = diceValue2
    }

});

document.getElementById('setScoreForm').addEventListener('submit', function () {
    event.preventDefault();
    scoreToWin = document.getElementById('score-input').value;
    prevScoreToWin = scoreToWin;
    document.getElementById('newScore').textContent = scoreToWin;
    document.getElementById('newScoreWrapper').style.display = 'block';
    document.getElementById('setScoreForm').style.display = 'none';

    setTimeout(function () {
        document.getElementById('newScoreWrapper').style.display = 'none';
        document.getElementById('setScoreForm').style.display = 'block';
    }, 2000)
})

document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gamePlaying) {
        scores[activePlayer] += roundScore;

        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]

        if (scores[activePlayer] >= scoreToWin) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.getElementById('dice').style.display = 'none';
            document.getElementById('dice2').style.display = 'none';
            document.getElementById('smallDie').style.display = 'none';
            document.getElementById('smallDie2').style.display = 'none';
            document.getElementById('previousRoll').style.display = 'none';
            document.getElementById('doubleSixes').style.display = 'none';
            document.getElementById('rolledOne').style.display = 'none';
            document.querySelector('.btn-roll').setAttribute('disabled', true);
            document.querySelector('.btn-hold').setAttribute('disabled', true);
            gamePlaying = false;


        } else {

            nextPlayer();
        }

    }

});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {

    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    scoreToWin = prevScoreToWin ? prevScoreToWin : 100;
    document.getElementById('score-input').value = prevScoreToWin ? prevScoreToWin : scoreToWin;;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';

    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');


    document.querySelector('.btn-roll').removeAttribute('disabled', false);
    document.querySelector('.btn-hold').removeAttribute('disabled', false);

    document.getElementById('dice').style.display = 'none';
    document.getElementById('dice2').style.display = 'none';
    document.getElementById('smallDie').style.display = 'none';
    document.getElementById('smallDie2').style.display = 'none';
    document.getElementById('setScoreForm').style.display = 'block';
    document.getElementById('newScoreWrapper').style.display = 'none';
    document.getElementById('rolledOne').style.display = 'none';
    document.getElementById('doubleSixes').style.display = 'none';
    document.getElementById('previousRoll').style.display = 'none';

}


function nextPlayer(rdiceValue, rdiceValue2, doubleSix) {
    var timeOut = 0;
    prevDiceValue = null;
    prevDiceValue2 = null;
    diceValue = null;
    diceValue2 = null;

    if (rdiceValue === 1 || rdiceValue2 === 1) {
        document.getElementById('rolledOne').style.display = 'block';

        document.querySelector('.btn-roll').setAttribute('disabled', true);
        document.querySelector('.btn-hold').setAttribute('disabled', true);

        timeOut = 1000;
    }

    if (doubleSix) {
        document.getElementById('doubleSixes').style.display = 'block';

        document.querySelector('.btn-roll').setAttribute('disabled', true);
        document.querySelector('.btn-hold').setAttribute('disabled', true);

        timeOut = 1000;

    }

    setTimeout(function () {
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        document.getElementById('dice').style.display = 'none';
        document.getElementById('dice2').style.display = 'none';
        document.getElementById('smallDie').style.display = 'none';
        document.getElementById('smallDie2').style.display = 'none';
        document.getElementById('rolledOne').style.display = 'none';
        document.getElementById('doubleSixes').style.display = 'none';
        document.getElementById('previousRoll').style.display = 'none';


        document.querySelector('.btn-roll').removeAttribute('disabled', false);
        document.querySelector('.btn-hold').removeAttribute('disabled', false);

    }, timeOut)

}


init();
