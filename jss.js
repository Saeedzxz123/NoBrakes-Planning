
const player = document.getElementById("player");
const restart = document.getElementById('restartB')
const gameArea = document.getElementById("gameArea");
const pointBox = document.getElementById("pointBox");





const levelScore = {
    1:150,
    2:300,
    3:600

}


let score = 0;


let x = 300;  
let y = 200;  
const speed = 5; 

let dx =0;
let dy =0;


/* document.addEventListener('click',)
 */ 


document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();


    if (key === "w"  || key === 'arrowup') {  
        dx = 0;
        dy = -speed;
    }
    if (key === "s" || key === 'arrowdown') {  
        dx = 0;
        dy = speed;
    }
    if (key === "a" || key === 'arrowleft') {  
        dx = -speed;
        dy = 0;
    }
    if (key === "d" || key === 'arrowright') {  
        dx = speed;
        dy = 0;
    }
    
});

function gameLoop() {
    x += dx;
    y += dy;

   
       


    player.style.left = x + "px";
    player.style.top = y + "px";

    
    checkPointBoxCollision()
    requestAnimationFrame(gameLoop);
}

gameLoop();

setInterval(() => {
    if (dx !== 0 || dy !== 0) {  
        score ++;               
        document.getElementById("score").innerText = "Score: " + score;
    }
}, 500); 








function spawnPointBox() {
    const areaWidth = gameArea.clientWidth;
    const areaHeight = gameArea.clientHeight;

    const boxSize = 8;

    const randomX = Math.floor(Math.random() * (areaWidth - boxSize));
    const randomY = Math.floor(Math.random() * (areaHeight - boxSize));

    pointBox.style.left = randomX + "px";
    pointBox.style.top = randomY + "px";
}


function checkPointBoxCollision() {
    const p = player.getBoundingClientRect();
    const b = pointBox.getBoundingClientRect();
    // console.log( 'p: ' + p.left)
    // console.log(b.right)

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

  














/* console */
console.log(score)

console.log(player.style.left)


