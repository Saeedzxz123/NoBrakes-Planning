const player = document.getElementById("player");
const restartb = document.getElementById("restartB");
const gameArea = document.getElementById("gameArea");
const pointBox = document.getElementById("pointBox");
const enemy = document.getElementById("enemyBox");
const sandBox =document.getElementById('sandBoxB')
let level = 1;
let score = 0;

const levelScore = {
    1: 150,
    2: 300,
    3: 600
};


//  player
let x = 300;
let y = 200;
let speed = 5;

let directionX = 0;
let directionY = 0;
let canMove = true;  

let sandBoxs = false;
let gameOver = false;
let gamePause = false;


// movment
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
    if (score >= levelScore[level]) {
        
        gamePause = true;
        canMove = false;   

        directionX = 0;
        directionY = 0;

        document.getElementById("levelInfo").innerText =
        "Level " + level + " completed!";
        
                document.getElementById("continueB").style.display = "block";
        
        level++;
        speed += 3;
        
 }

    if (level > 3) {
            document.getElementById("levelInfo").innerText =
            "All levels completed!";
        }

    }




document.getElementById("continueB").onclick = () => {
    canMove = true;    
    gamePause = false; 
    document.getElementById("continueB").style.display = "none";
        if (level > 3) { document.getElementById("levelInfo").innerText =
            "limetless mode";
}
        spawnPointBox();
        spawnEnemy();   

}
setInterval(() => {
    if (!gameOver) {
        if (directionX !== 0 || directionY !== 0) {
            score++;
            document.getElementById("score").innerText = "Score: " + score;
           
        }
    }
}, 10);

// SPAWN 
function spawnEnemy() {
    const box = document.getElementById("enemyBox");
    const areaW = box.clientWidth;
    const areaH = box.clientHeight;
    const size = 40;

    for (let i = 0; i < 5; i++) {


        const enemy = document.createElement("div");
        enemy.classList.add("enemy");

        enemy.style.left = Math.random() * (areaW - size) + "px";
        enemy.style.top = Math.random() * (areaH - size) + "px";

        box.appendChild(enemy);
    }
}



function spawnPointBox() {
    const areaW = gameArea.clientWidth;
    const areaH = gameArea.clientHeight;

    const size = 10;

    pointBox.style.left = Math.random() * (areaW - size) + "px";
    pointBox.style.top = Math.random() * (areaH - size) + "px";
}




function checkPointBoxCollision() {
    const p = player.getBoundingClientRect();
    const b = pointBox.getBoundingClientRect();

    if (p.left < b.right && p.right > b.left && p.top < b.bottom && p.bottom > b.top) {
        score += 10;
        document.getElementById("score").innerText = "Score: " + score;

        spawnPointBox();
    }
}

function checkEnemyCollision() {
    const p = player.getBoundingClientRect();
    const e = enemy.getBoundingClientRect();

    if (p.left < e.right && p.right > e.left && p.top < e.bottom && p.bottom > e.top) {
        loseGame("You hit the enemy!");
    }
}


function checkWallCollision() {
    const areaW = gameArea.clientWidth;
    const areaH = gameArea.clientHeight;

    const playerW = player.clientWidth;
    const playerH = player.clientHeight;

    if (x < 0 || x + playerW > areaW || y < 0 || y + playerH > areaH) {
        loseGame("You hit the wall!");
    }
}

function loseGame(reason) {
    gameOver = true;
    document.getElementById("levelInfo").innerText = reason + " — Game Over!";
            document.getElementById("restartB").style.display = "block";

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

    score = 0;
    level = 1;
    speed = 5;




    document.getElementById("score").innerText = "Score: 0";
    document.getElementById("levelInfo").innerText = "Level 1";

    document.getElementById("continueB").style.display = "none";
    document.getElementById("lossScreen").style.display = "none";

    spawnPointBox();
    spawnEnemy();
    

    
}


document.getElementById("sandBoxB").onclick = () => {
    canMove = true;    
    gamePause = false; 
    restartGame()
    document.getElementById("sandBoxB").style.display = "none";
};




restartb.onclick = () => {
    restartGame();
};



