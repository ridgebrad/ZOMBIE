var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie,zombieImg;
var heart1Img,heart2Img,heart3Img;
var bullet;
var bulletGroup,zombieGroup;
var heart;
var gameState=PLAY;
var PLAY=1;
var END=0;
var LIFE=2;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
zombieImg=loadImage("assets/zombie.png")
  bgImg = loadImage("assets/bg.jpeg")
heart2Img=loadAnimation("assets/heart_2.png")
//heart1Img=loadImage("asset/heart_1.png");
heart3Img=loadAnimation("assets/heart_3.png");
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,400,300)

bulletGroup=new Group();
zombieGroup=new Group();

heart=createSprite(displayWidth-200,80,110,10);
heart.addAnimation("red",heart3Img);
heart.scale=0.3;

}

function draw() {
  background(0); 




  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
 spawnBullets();

}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}


if(zombieGroup.isTouching(player)){
//heart.changeAnimation("red1",heart2Img);
gameState=LIFE;
zombieGroup.setVelocityXEach=0;

}

if(gameState===LIFE){
  heart.changeAnimation("red1",heart2Img);
}

spawnZombies();
drawSprites();
if(bulletGroup.isTouching(zombieGroup)){
  zombieGroup.destroyEach();
//  zombie.visible=false;
  bulletGroup.destroyEach();
}
}
function spawnZombies(){
 if(World.frameCount%100==0){
  zombie=createSprite(displayWidth,displayHeight/2,100,100);
  zombie.velocityX=-7;
  zombie.y=Math.round(random(150,displayHeight-50))
  zombie.addImage(zombieImg);
zombie.scale=0.2;

zombieGroup.add(zombie);
 }
}

function spawnBullets(){
  bullet=createSprite(displayWidth-1200, player.y-10,10,10);
  bullet.velocityX=20;
  bulletGroup.add(bullet);
}