const player = document.getElementById("player");
const restartb = document.getElementById("restartB");
const gameArea = document.getElementById("gameArea");
const pointBox = document.getElementById("pointBox");
const sandBox = document.getElementById("sandBoxB");
const boxEnemy = document.getElementById("enemyBox");

let level = 1;
let score = 0;

const levelScore = {
    1: 150,
    2: 300,
    3: 600
};

let x = 300;
let y = 200;
let speed = 5;

let directionX = 0;
let directionY = 0;
let canMove = true;

let gameOver = false;
let gamePause = false;

let limitless = false;
let speedBoostInterval = null;

document.addEventListener("keydown", (event) => {
    if (!canMove) return;
    const key = event.key.toLowerCase();

    if (key === "w" || key === "arrowup") {
        directionX = 0;
        directionY = -1;
    }
    if (key === "s" || key === "arrowdown") {
        directionX = 0;
        directionY = 1;
    }
    if (key === "a" || key === "arrowleft") {
        directionX = -1;
        directionY = 0;
    }
    if (key === "d" || key === "arrowright") {
        directionX = 1;
        directionY = 0;
    }
});

function gameLoop() {
    if (!gameOver && !gamePause) {
        x += directionX * speed;
        y += directionY * speed;

        player.style.left = x + "px";
        player.style.top = y + "px";

        checkWallCollision();
        checkEnemyCollision();
        checkPointBoxCollision();
        checkLevelUp();
    }

    requestAnimationFrame(gameLoop);
}

function checkLevelUp() {
    if (score >= levelScore[level] && level <= 3) {
        gamePause = true;
        canMove = false;

        directionX = 0;
        directionY = 0;
        x = 300;
        y = 200;

        document.getElementById("levelInfo").innerText =
            "Level " + level + " completed!";

        document.getElementById("continueB").style.display = "block";
     
        level++;
        speed += 3;
        
    }

    if (level > 3 && !limitless) {
        document.getElementById("levelInfo").innerText = "All levels completed!";
    }
}

document.getElementById("continueB").onclick = () => {
    canMove = true;
    gamePause = false;
    document.getElementById("continueB").style.display = "none";
    document.getElementById("levelInfo").innerText =
            "Level " + level ;
    if (level > 3) {
        limitless = true;

        score = 0;
        speed = 5;

        document.getElementById("score").innerText = "Score: 0";
        document.getElementById("levelInfo").innerText = "Limitless Mode";

        if (speedInterval) clearInterval(speedInterval);

        speedInterval = setInterval(() => {
            speed *= 1.10;
        }, 2000);
    }

    spawnPointBox();
    spawnEnemy();
};

setInterval(() => {
    if (!gameOver) {
        if (directionX !== 0 || directionY !== 0) {
            score++;
            document.getElementById("score").innerText = "Score: " + score;
        }
    }
}, 10);

function spawnEnemy() {
    const areaW = gameArea.clientWidth;
    const areaH = gameArea.clientHeight;
    const size = 80;

    boxEnemy.innerHTML = ""; 

    for (let i = 0; i < 5; i++) {
        const enemy = document.createElement("div");
        enemy.classList.add("enemy");
        enemy.style.width = Math.random() *  size + 20 + "px";
        enemy.style.height = Math.random() *  size + 20 + "px";
        enemy.style.position = "absolute";

        enemy.style.left = Math.random() * (areaW - size) + "px";
        enemy.style.top = Math.random() * (areaH - size) + "px";

        boxEnemy.appendChild(enemy);
    }
}

function spawnPointBox() {
    const areaW = gameArea.clientWidth;
    const areaH = gameArea.clientHeight;
    const size = 10;

    pointBox.style.left = Math.random() * (areaW - size - 20) + "px";
    pointBox.style.top = Math.random() * (areaH - size - 20) + "px";
}

function checkPointBoxCollision() {
    const p = player.getBoundingClientRect();
    const b = pointBox.getBoundingClientRect();

    if (p.left < b.right &&
        p.right > b.left &&
        p.top < b.bottom &&
        p.bottom > b.top) {

        score += 10;
        document.getElementById("score").innerText = "Score: " + score;
        spawnPointBox();
    }
}

function checkEnemyCollision() {
    const p = player.getBoundingClientRect();
    const enemies = document.querySelectorAll(".enemy");

    for (let enemy of enemies) {
        const e = enemy.getBoundingClientRect();

        if (p.left < e.right &&
            p.right > e.left &&
            p.top < e.bottom &&
            p.bottom > e.top) {

            loseGame("You hit an enemy!");
            return;
        }
    }
}

function checkWallCollision() {
    const areaW = gameArea.clientWidth;
    const areaH = gameArea.clientHeight;

    const playerW = player.clientWidth;
    const playerH = player.clientHeight;

    if (x < 0 || x + playerW > areaW ||
        y < 0 || y + playerH > areaH) {
        loseGame("You hit the wall!");
    }
}

function loseGame(reason) {
    gameOver = true;
    document.getElementById("levelInfo").innerText =
        reason + " — Game Over!";

    document.getElementById("restartB").style.display = "block";

    if (speedBoostInterval) clearInterval(speedBoostInterval);
}

spawnPointBox();
spawnEnemy();
gameLoop();

function restartGame() {
x = 300;
y = 200;
speed = 5;

directionX = 0;
directionY = 0;
canMove = true;

gameOver = false;
gamePause = false;


limitless = false;
speedBoostInterval = null;

    document.getElementById("score").innerText = "Score: 0";
    document.getElementById("levelInfo").innerText = "Level 1";

    if (speedBoostInterval) clearInterval(speedBoostInterval);

    spawnPointBox();
    spawnEnemy();
}

sandBox.onclick = () => {
    canMove = true;
    gamePause = false;
    restartGame();
    sandBox.style.display = "none";
};

restartb.onclick = () => {
    restartGame();
};
