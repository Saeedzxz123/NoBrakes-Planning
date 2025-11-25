
const player = document.getElementById("player");
const restart = document.getElementById('restartB')
const gameArea = document.getElementById("gameArea");
const pointBox = document.getElementById("pointBox");
const start = document.getElementById("start");
const sandbox = document.getElementById("sandboxB");
const enemy = document.getElementById("enemyBox");


 let gamePaused = true; 
 
let level = 1;

const levelScore = {
    1:150,
    2:300,
    3:600,
};


let score = 0;

// player 
let x = 300;  
let y = 200;  
let speed = 5; 

let directionX  =0;
let directionY =0;




document.getElementById("start").onclick = () => {
    gamePaused = false;     
    document.getElementById("start").style.display = "none"; 
};


document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();


    if (key === "w"  || key === 'arrowup') {  
        directionX = 0;
        directionY = -1;
    }
    if (key === "s" || key === 'arrowdown') {  
        directionX = 0;
        directionY = 1;
    }
    if (key === "a" || key === 'arrowleft') {  
        directionX = -1;
        directionY = 0;
    }
    if (key === "d" || key === 'arrowright') {  
        directionX = 1;
        directionY = 0;
    }
    
});

function gameLoop() {
/*     if(!gamePaused){ */ 
    x += directionX * speed;
    y += directionY * speed;





    player.style.left = x + "px";
    player.style.top = y + "px";

    
    checkPointBoxCollision()
    requestAnimationFrame(gameLoop);
    checkLevelUp();
    }

function checkLevelUp() {
    if (score >= levelScore[level]) {

        level ++;
        speed += 3;     

        document.getElementById("levelInfo").innerText = "Level " + level;

        if (level > 3) {
            document.getElementById("levelInfo").innerText = "All levels completd";
        
        }
    }
}



gameLoop();

setInterval(() => {
    if (directionX !== 0 || directionY !== 0) {  
        score ++;               
        document.getElementById("score").innerText = "Score: " + score;
    }
}, 100);  




function spawnEnemy() {
    const areaWidth = gameArea.clientWidth;
    const areaHeight = gameArea.clientHeight;

    const boxSize = 40;

    const randomX = Math.floor(Math.random() * (areaWidth - boxSize - 20));
    const randomY = Math.floor(Math.random() * (areaHeight - boxSize - 20));

    enemy.style.left = randomX + "px";
    enemy.style.top = randomY + "px";
}






function spawnPointBox() {
    const areaWidth = gameArea.clientWidth;
    const areaHeight = gameArea.clientHeight;

    const boxSize = 8;

    const randomX = Math.floor(Math.random() * (areaWidth - boxSize - 20));
    const randomY = Math.floor(Math.random() * (areaHeight - boxSize - 20));

    pointBox.style.left = randomX + "px";
    pointBox.style.top = randomY + "px";
}


function checkPointBoxCollision() {
    const p = player.getBoundingClientRect();
    const b = pointBox.getBoundingClientRect();


    if (
        p.left < b.right &&
        p.right > b.left &&
        p.top < b.bottom &&
        p.bottom > b.top
    ) {
        console.log('eat')
        score += 10;
        score.innerText = "Score: " + score;

        spawnPointBox();
    }
}

spawnPointBox();

spawnEnemy();












/* console */
console.log(score)

console.log(player.style.left)


