const choices = document.querySelectorAll('.choice');
const score = document.getElementById('score');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const modal = document.querySelector('.modal');
const scoreboard = {
    player: 0,
    computer: 0
}

// Play game
function play(e) {
    restart.style.display = 'inline-block';
    const playerChoice = e.target.id;
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);

    showWinner(winner, computerChoice);
    
}

// Get computers choice
function getComputerChoice() {
    const rand = Math.random();

    if(rand < 0.34) 
        return 'rock';

    if(rand <= 0.67) 
        return 'paper';
    
    return 'scissors';
}

// Get game winner
function getWinner(playerChoice, computerChoice) {
    if(playerChoice === computerChoice) 
        return 'draw';

    if(playerChoice === 'rock' && computerChoice === 'scissors') 
        return 'player';
     
    if(playerChoice === 'paper' && computerChoice === 'rock') 
        return 'player';
    
    if(playerChoice === 'scissors' && computerChoice === 'paper')
        return 'player';
    
    return 'computer';
}

function showWinner(winner, computerChoice) {
    if (winner === 'player') {
        scoreboard.player++;

        result.innerHTML = `
            <h1 class="text-win">You Win</h1>
            <i class="fas fa-hand-${computerChoice} fa-10x"></i>
            <p> Computer chose <strong>${computerChoice}</strong>
        `;
    }else if(winner === 'computer') {
        scoreboard.computer++;

        result.innerHTML = `
            <h1 class="text-lose">You Lose</h1>
            <i class="fas fa-hand-${computerChoice} fa-10x"></i>
            <p> Computer chose <strong>${computerChoice}</strong>
        `;
    }else {
        result.innerHTML = `
            <h1>It's A Draw</h1>
            <i class="fas fa-hand-${computerChoice} fa-10x"></i>
            <p> Computer Chose <strong>${computerChoice}</strong>
        `;
    }

    // update scoreboard
    score.innerHTML = `
        <p>Player: ${scoreboard.player}</p>
        <p>Computer: ${scoreboard.computer}</p>
    `;

    modal.style.display = 'block';
}

// restart game
function restartGame() {
    scoreboard.player = 0;
    scoreboard.computer = 0;

    score.innerHTML = `
        <p>Player: ${scoreboard.player}</p>
        <p>Computer: ${scoreboard.computer}</p>
    `;

    restart.style.display = 'none';
}

// clear modal
function clearModal(e) {
    if(e.target == modal)
        modal.style.display = 'none';
}

// Event listeners
choices.forEach(choice => choice.addEventListener('click', play));
window.addEventListener('click', clearModal);
restart.addEventListener('click', restartGame);