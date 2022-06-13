 let inputDir = {x: 0, y: 0};
const foodSound = new Audio('food.mp3');
const gameOver = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 7;
let lastPaintTime = 0;
let snakeArr = [{x: 5,y: 6}];
let board = document.getElementById("board");
food = {x: 6, y: 7};
let gamescore = 0;
// Game function
function main(ctime) {
  window.requestAnimationFrame(main);
  if((ctime-lastPaintTime)/1000 < 1/speed) {
      return;
  }
  lastPaintTime = ctime;
  gameEngine();
}
function isCollied(snakeArr) {
    //when snake eat itself
    for(let i = 1; i<snakeArr.length; i++) {
        if(snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y) {
           return true; 
        }
    }
    if(snakeArr[0].x >= 18 || snakeArr[0].x <= 0 ) {
        return true;
    }
    if( snakeArr[0].y >= 18 || snakeArr[0].y <= 0) {
        return true;
    }
   
}
function gameEngine() {
 //part: 1 updating the snake array $ food
    if(isCollied(snakeArr)) {
        gameOver.play();
        musicSound.pause();
        direction = {x: 0, y: 0};
        alert("Game Over ,Please Enter any Key");
        snakeArr = [{x: 13,y: 15}];
        musicSound.play();
        gamescore = 0;
    }
    //if you eatan the food, generate the new food & increment the score.
  if(snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
      foodSound.play();
      gamescore += 1;
      score.innerHTML = "Score:" + gamescore;
      snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
      let a = 2;
      let b = 16;
      food = {x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())};
  }
   //Moving the snake
   for(let i = snakeArr.length-2; i>=0; i--) {
       snakeArr[i+1] = {...snakeArr[i]};
       
   }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    musicSound.play();

 //part: 2 Display the snake and food
 //Display the snake
 board.innerHTML = "";
 snakeArr.forEach((e,index)=> {
    let snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if(index == 0) {
        snakeElement.classList.add('head');
    }
    else {
        snakeElement.classList.add('snake');
    }
    
    board.appendChild(snakeElement);
 })
 // Display the food
 let foodElement = document.createElement('div');
 foodElement.style.gridRowStart = food.y;
 foodElement.style.gridColumnStart = food.x;
 foodElement.classList.add('food');
 board.appendChild(foodElement);
}




// mian logic
window.requestAnimationFrame(main);
window.addEventListener('keydown', (e)=> {
   inputDir = { x: 0, y: 1};
   moveSound.play();
   switch(e.key) {
       case "ArrowUp":
           inputDir.x = 0;
           inputDir.y = -1;
           break;
       case "ArrowDown":
        inputDir.x = 0;
        inputDir.y = 1;
           break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
           break;
           case "ArrowLeft":
            inputDir.x = -1;
           inputDir.y = 0;
            break;
   }
})