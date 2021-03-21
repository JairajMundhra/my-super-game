var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var PLAY=1;
var END=0
var o1,o2,o3,o4,o5,o6;
var cloud,cloudImage;
var klaus;
var orignal;
var score;
var gameState=PLAY;
var gameOver,gameOImage;
var restart,restartImage;
var die,checkpoint,jump;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  gameOImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
  
  groundImage = loadImage("ground2.png");
   cloudImage = loadImage("cloud.png");
  o1=loadImage("obstacle1.png");
   o2=loadImage("obstacle2.png");
   o3=loadImage("obstacle3.png");
  o4=loadImage("obstacle4.png");
   o5=loadImage("obstacle5.png");
   o6=loadImage("obstacle6.png");
  die=loadSound("die.mp3");
  jump=loadSound("jump.mp3");
  checkpoint=loadSound("checkPoint.mp3");
}

function setup() {

  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
 
  
  score=0;
  
  klaus=new Group();
  orignal=new Group();
  
  //generate random numbers
 
  //console.log();
  trex.setCollider("rectangle",0,0,50,90);
  
   gameOver=createSprite(300,100,100,100);
  gameOver.addImage(gameOImage);
  
  
  restart=createSprite(300,150,100,100);
  restart.addImage("restart",restartImage);
  restart.scale=0.5;
  restart.visible=false;
   gameOver.visible=false;
}

function draw() {
  //set background color
  background(180);
 
  text("score: "+score, 500,40);
  

  
  
  if(gameState===PLAY){
    // jump when the space key is pressed
    if(keyDown("space")&& trex.y >= 150  ) {
       trex.velocityY = -10;
      jump.play();
    }
  
    trex.velocityY = trex.velocityY + 0.5
   ground.velocityX =-(5+(score/100));
    if (ground.x < 0){
      
      ground.x = ground.width/2;
      
    }     
    
     score+=Math.round(getFrameRate()/68);
    //console.log(getFrameRate());                        
    if(score%100===0&&score>0){
      checkpoint.play();
    
    }
  
   if(orignal.isTouching(trex)){
     gameState=END;
     die.play();
     
     
   }
  
  }
  
  if(gameState===END){
    ground.velocityX=0;
    klaus.setVelocityXEach(0);
    orignal.setVelocityXEach(0);
    klaus.setLifetimeEach(-1);
     orignal.setLifetimeEach(-1);
    
    trex.changeAnimation("collided",trex_collided);
    restart.visible=true;
    gameOver.visible=true;
    
    if(mousePressedOver(restart)){
      reset();
    }
  }
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  
  
    //Spawn Clouds
    spawnClouds();
    spawnCacti();
  drawSprites();
}

//function to spawn the clouds
function spawnClouds(){
 if(frameCount%60===0){
 cloud=createSprite(620,100,10,10);
  
   
   var rand =  Math.round(random(30,120))
   cloud.y=rand;
   cloud.addImage("cloud",cloudImage);
   cloud.scale=0.5; 
   cloud.velocityX=-3;
   cloud.lifetime=210;
   cloud.depth=trex.depth;
   trex.depth+=1
   klaus.add(cloud);
 }
  
  
}

function spawnCacti(){
 if(frameCount%60===0){
 cactus=createSprite(620,170,10,10);
  
   
   var rand =  Math.round(random(1,6))
   switch( rand){
     case 1: cactus.addImage("obstacle",o1);
       break;
        case 2: cactus.addImage("obstacle",o2);
       break;
        case 3: cactus.addImage("obstacle",o3);
       break;
        case 4: cactus.addImage("obstacle",o4);
       break;
        case 5: cactus.addImage("obstacle",o5);
       break;
        case 6: cactus.addImage("obstacle",o6);
       break;
       default:break;
   }
   cactus.scale=0.5; 
   cactus.velocityX=-(5+(score/100));
   cactus.lifetime=130;
  orignal.add(cactus);
 }
  
  
}
function reset(){
  score=0;
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  orignal.destroyEach();
  klaus.destroyEach();
  trex.changeAnimation("running",trex_running);
}

