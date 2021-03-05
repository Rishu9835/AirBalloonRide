var balloon,backImg;
var database,position;

function preload(){
  backImg=loadImage("images/1.png");
  balloonImg=loadAnimation("images/2.png","images/3.png","images/4.png")
 
}
function setup() {
  database = firebase.database();
var balloonPosition=database.ref('balloon/height');
balloonPosition.on("value",readHeight,showError)

  createCanvas(1200,600);
  balloon=createSprite(100, 470, 50, 50);
  balloon.addAnimation("balloon",balloonImg);
  balloon.scale=0.5;
}

 function draw() {
  background(backImg); 
  fill("black");
  textSize(18)
  text("Use Arrow Keys To Move the Balloon",50,50);
  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balloon.addAnimation("air",balloonImg);
    balloon.x = balloon.x - 10;
}
else if(keyDown(RIGHT_ARROW)){
  updateHeight(10,0);
  balloon.addAnimation("air",balloonImg);
    balloon.x = balloon.x + 10;
}
else if(keyDown(UP_ARROW)){
  updateHeight(0,-10);
  balloon.y = balloon.y - 10;
  balloon.addAnimation("air",balloonImg);
  balloon.scale=balloon.scale-0.01;
    
    
}
else if(keyDown(DOWN_ARROW)){
  updateHeight(0,+10);
  balloon.y = balloon.y + 10;
  balloon.addAnimation("air",balloonImg);
  balloon.scale=balloon.scale+0.01;
    
} 
  drawSprites();
}

function updateHeight(x,y){
database.ref('balloon/height').set({
  'x': height.x + x,
  'y': height.y + y
});
}
function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("there is no error")
}