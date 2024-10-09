const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const cloud = document.querySelector('.cloud');
const gameOver = document.querySelector('.game-over');
const restartButton = document.querySelector('.restart');
const scoreDisplay = document.querySelector('.score');

let score = 0;
let isGameOver = false;

const jump = () => {
    if (!isGameOver) {
        mario.classList.add('jump');

        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500);
    }
}

const updateScore = () => {
    if (!isGameOver) {
        score += 1;
        scoreDisplay.textContent = `Score: ${score}`;
    }
}

const loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    const cloudPosition = +window.getComputedStyle(cloud).left.replace('px', '');

    if (pipePosition <= 100 && pipePosition > 0 && marioPosition < 60) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = 'imagens/game-over.png';
        mario.style.width = '70px';
        mario.style.marginLeft = '35px';

        cloud.style.animation = 'cloud 20s infinite linear';
        cloud.style.left = `${cloudPosition}px`;

        gameOver.style.visibility = 'visible';

        isGameOver = true;
        clearInterval(loop);
    }
}, 10);

// Função para reiniciar o jogo
const restart = () => {
    gameOver.style.visibility = 'hidden';
    
    // Reiniciar as animações e elementos
    pipe.style.animation = 'pipe-animations 1.5s infinite linear';
    pipe.style.left = ``;

    mario.src = 'imagens/mario.gif';
    mario.style.width = '130px';
    mario.style.bottom = '0px';
    mario.style.marginLeft = '';
    mario.style.animation = '';

    cloud.style.left = ``;

    // Reiniciar a pontuação
    score = 0;
    scoreDisplay.textContent = `Score: 0`;

    // Reiniciar o loop
    isGameOver = false;

    const loop = setInterval(() => {

        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
        const cloudPosition = +window.getComputedStyle(cloud).left.replace('px', '');
    
        if (pipePosition <= 100 && pipePosition > 0 && marioPosition < 60) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;

            mario.src = 'imagens/game-over.png';
            mario.style.width = '70px';
            mario.style.marginLeft = '35px';

            cloud.style.animation = 'cloud 20s infinite linear';
            cloud.style.left = `${cloudPosition}px`;

            gameOver.style.visibility = 'visible';

            isGameOver = true;
            clearInterval(loop);
        }
    }, 10);
}

// Atualiza a pontuação a cada segundo enquanto o jogo estiver ativo
setInterval(updateScore, 1000);

document.addEventListener('keydown', jump);
document.addEventListener('touchstart', jump);
restartButton.addEventListener('click', restart);
