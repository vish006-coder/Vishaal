const player = document.querySelector(".player");
const arrow = document.querySelector(".arrow");
const scoreTag = document.querySelector(".score");
const gameArea = document.querySelector("div[style*='background-color: black']");
const GAME_HEIGHT = 400;
const GAME_WIDTH = 900;
const BOX_SIZE = 40;

let PlayerY = 0;
let score = 0;
let arrowX = 850;
let arrowY = 40;
let gameOver = false;
let gameLoop;

function movearrow() {
    if (gameOver) return;

    arrowX -= 10;
    arrow.style.left = arrowX + "px";

    const a = arrow.getBoundingClientRect();
    const p = player.getBoundingClientRect();

    if (
        p.left < a.right &&
        p.right > a.left &&
        a.top < p.bottom &&
        a.bottom > p.top
    ) {
        endGame();
        return;
    }

    if (arrowX < -50) {
        score += 1;
        arrowX = 850;
        arrowY = Math.random() * (GAME_HEIGHT - BOX_SIZE);
    }

    arrow.style.top = arrowY + "px";
    scoreTag.innerHTML = score;
}

function endGame() {
    gameOver = true;
    clearInterval(gameLoop);
    scoreTag.innerHTML = score + " — GAME OVER (press R to restart)";
}

function restartGame() {
    gameOver = false;
    score = 0;
    arrowX = 850;
    arrowY = 40;
    PlayerY = 0;
    player.style.top = PlayerY + "px";
    scoreTag.innerHTML = score;
    gameLoop = setInterval(movearrow, 20);
}

gameLoop = setInterval(movearrow, 20);

document.addEventListener("keydown", (event) => {
    if (gameOver) {
        if (event.key === "r" || event.key === "R") {
            restartGame();
        }
        return;
    }

    if (event.key === "ArrowDown") {
        PlayerY += 10;
    }
    if (event.key === "ArrowUp") {
        PlayerY -= 10;
    }
    PlayerY = Math.max(0, Math.min(PlayerY, GAME_HEIGHT - BOX_SIZE));

    player.style.top = PlayerY + "px";
});