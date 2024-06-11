var canvas=document.getElementById("gameCanvas");
var ctx=canvas.getContext("2d");
var dx=0;
var dy=-10;
var foodX, foodY;
let score=0;

function drawCanvas(){
 ctx.fillStyle="white";
 ctx.fillRect(0,0,canvas.width,canvas.height);
 ctx.strokeStyle="black";
 ctx.strokeRect(0,0,canvas.width,canvas.height);
}

function clearCanvas(){
 drawCanvas();
}

let snake = [  {x: 150, y: 150}, 
               {x: 140, y: 150},  
               {x: 130, y: 150},  
               {x: 120, y: 150},  
               {x: 110, y: 150}
             ];
         
 function drawSnakePart(snakePart) { 
      ctx.fillStyle = 'lightgreen';  
      ctx.strokeStyle = 'darkgreen';
      ctx.fillRect(snakePart.x, snakePart.y, 10, 10); 
      ctx.strokeRect(snakePart.x, snakePart.y, 10,10);
 }
 function drawSnake() { 
      snake.forEach(drawSnakePart);
     }    
 function advanceSnake(){
      
     //  using unshift we add a new head and by removing the last element  
      const head={x:snake[0].x + dx, y:snake[0].y+dy};
      
      snake.unshift(head);
      // you get the location of where the x or y cordinate of the snake's respective parts 
      const didEatFood=snake[0].x == foodX && snake[0].y == foodY;
      if(didEatFood){
         createFood();
         score +=10;
         //one of the changes i decided to add to the game is to give a message to the user giving their final score
         document.getElementById('score').innerHTML="Your Score "+score;
      }else{
      snake.pop();
        }  

     }       
 

 function changeDirection(event){
     const LEFT_KEY = 37;
     const RIGHT_KEY = 39;  
     const UP_KEY = 38;  
     const DOWN_KEY = 40;
     const keyPressed=event.keyCode;
     const goingUp=dy===-10;
     const goingDown=dy===10;
     const goingLeft=dx===-10;
     const goingRight=dx===10;

 if (keyPressed===LEFT_KEY && !goingRight){
     dx=-10;
     dy=0;
 }
 if (keyPressed===UP_KEY && !goingDown){
     dx=0;
     dy=-10;
 }
 if (keyPressed===RIGHT_KEY && !goingLeft){
     dx=10;
     dy=0;
 }
 if (keyPressed===DOWN_KEY&& !goingUp){
     dx=0;
     dy=10;
 }
 // without this part here if the user changes the direction before 100ms lapsed the game will end 
 if (changeDirection()){
    return;
    changeDirection= true;
 }        
}
// math.round returns a floating number between 0 to 1
// the max-min assures that the number will remain within the canvas 
// then we round the number and multipy by 10 
function setRandTen(min,max){
 return Math.round((Math.random() * (max-min) ) / 10) * 10;
}
function createFood() {
 foodX = setRandTen(0, canvas.width - 10); // Adjusted canvas.width
 foodY = setRandTen(0, canvas.height - 10); // Adjusted canvas.height
 snake.forEach(function isFoodOnSnake(part) {
     const foodIsOnSnake = part.x === foodX && part.y === foodY;
     if (foodIsOnSnake)
         createFood();
 });
}
  function drawFood() { 
     ctx.fillStyle = 'red'; 
  ctx.strokeStyle = 'darkred';
   ctx.fillRect(foodX, foodY, 10, 10); 
   ctx.strokeRect(foodX, foodY, 10, 10);
 }

 function didGameEnd(){
    
     for(let i=4; i<snake.length; i++){  
    // didCollide would immediately evaluate to true if the index was 0, so the game would end.
    // i=4 is because it is  impossible for the first three parts to touch each other.
         const didCollide= snake[i].x=== snake[0].x && snake[i].y==snake[0].y;
         if (didCollide){ 
            return true;             
        }
     }

     const hitLeftWall= snake[0].x<0;
     const hitRightWall= snake[0].x>canvas.width-10;
     const hitTopWall= snake[0].y<0;
     const hitBottomWall= snake[0].y>canvas.height-10;

     return hitTopWall|| hitBottomWall|| hitLeftWall|| hitRightWall|| hitRightWall     
 }

 function moveSnake(){
    // in set time out we delay the change direction, so it can occur periodically every 100ms
    setTimeout(function onTick(){
        changeDirection=false;
        if (didGameEnd()) {
            document.getElementById('score').innerHTML="Thank You for Playing! Your Final Score "+score;
            return;}  // when you do return it exits the function without further execution 
       clearCanvas();           
       advanceSnake();  
       drawSnake();
       drawFood();

    },100 )
    
}

document.addEventListener("keydown",changeDirection);
createFood(); 
setInterval(moveSnake,100);
    
         