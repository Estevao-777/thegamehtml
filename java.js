const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

const scoreElement = document.createElement('div');
scoreElement.className = 'score';
scoreElement.innerText = 'Pontuação: 0';
document.body.appendChild(scoreElement);

const restartButton = document.createElement('button');
restartButton.innerText = '⟲ Reiniciar Jogo';
restartButton.className = 'restart-btn';
restartButton.style.display = 'none';
document.body.appendChild(restartButton);

let score = 0;
let gameOver = false;

const updateScore = setInterval(() => {
    score++;
    scoreElement.innerText = `Pontuação: ${score}`;
}, 100);

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = 'imagens/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        clearInterval(loop);
        clearInterval(updateScore);
        restartButton.style.display = 'block';
        gameOver = true;
    }
}, 10);

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        if (gameOver) {
            location.reload();
        } else {
            mario.classList.add('jump');
            setTimeout(() => {
                mario.classList.remove('jump');
            }, 500);
        }
    }
});

restartButton.addEventListener('click', () => {
    location.reload();
});
