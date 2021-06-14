var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudImage, cloudGroup;
var obs, obsImg1, obsImg2, obsImg3, obsImg4, obsImg5, obsImg6, obsGroup;
var restart, restartImage;
var gameOver, gameOverImage;

var jumpSound;
var dieSound;
var checkPointSound;
var godSound;
var epicSound;

var PLAY = 1;
var END = 0;

var gameState = PLAY;

var score = 0;


function preload(){
  trex_running =                                      loadAnimation("TrexReCortado.png");
  trex_collided =                                     loadAnimation("trex_collided.png");
  
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("nube.png");
  
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
  godSound = loadSound("GodSound.mp3");
  epicSound = loadSound("epicSound.mp3");
  
  obsImg1 = loadImage("cactusRecortado.png");
  obsImg2 = loadImage("obstacle2.png");
  obsImg3 = loadImage("obstacle3.png");
  obsImg4 = loadImage("obstacle4.png");
  obsImg5 = loadImage("obstacle5.png");
  obsImg6 = loadImage("obstacle6.png"); 
  
 
  
}

function setup() {

  createCanvas(windowWidth,windowHeight)
  
  //crea el sprite del Trex
  trex = createSprite(50,height-70,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.setCollider("circle",90,0,50);
  trex.debug = false;
  
  trex.addAnimation("collided", trex_collided);
  
  gameOver = createSprite(width/2,height/2-50);
  gameOver.addImage("GameOver", gameOverImage);
  gameOver.visible = false;
  
  restart = createSprite(width/2,height/2);
  restart.addImage("Re-Start", restartImage);
  restart.visible = false;
  
  //crea el sprite del suelo
  ground = createSprite(width/2,height-80,width,2)
  ground.addImage("ground",groundImage);
  ground.x = ground.width/2;
  
  //crea el suelo invisible
  invisibleGround = createSprite(width/2,height-10,width,125);
  invisibleGround.visible = false;
  
  //genera números al azar
  //var rand =  Math.round(random(1,100))
 // console.log(rand)
  
  obsGroup = new Group();
  cloudGroup = new Group();
}

function draw() {
  //establece el color del fondo
  background("lightBlue");
  console.log(frameCount%40);

 // console.log(trex.y)

  if(gameState==PLAY){
    ground.velocityX = -(4+3*score/100);
    score = score+Math.round(getFrameRate()/60);
    
    if(score >700){
       background("navy");
       }
    
    if(score >900){
       background("lightBlue");
       }
    
    if(score == 1100){
       godSound.play();
       }
    
    if(score >1700){
        background("navy");
       }
    
    if(score >1900){
        background("lightBlue");
       }
    
    if(score == 2100){
       epicSound.play();
       }
    
    
    if(score >0&& score%100 == 0){
       
      checkPointSound.play();
      
       }

      //salta cuando se presiona la barra                 espaciadora
 if(touches.length>0||keyDown("space")&& trex.y >= height-120) {
    
    trex.velocityY = -13;
    jumpSound.play();
   touch = []
    
    }
    
    trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
   } 
   
  //aparece las nubes y obstaculos
  spawnClouds();
  spawnObstacles();

  if(obsGroup.isTouching(trex)){
    
    //dieSound.play();
    //gameState = END;
    trex.velocityY = -13;
    jumpSound.play();

  }

}else if(gameState==END){
  
   trex.changeAnimation("collided", trex_collided);
   ground.velocityX = 0;
   obsGroup.setVelocityXEach(0);
   cloudGroup.setVelocityXEach(0);
   obsGroup.setLifetimeEach(-1);
   cloudGroup.setLifetimeEach(-1);
   restart.visible = true;
   gameOver.visible = true;
  
}
  

  

  
  //evita que el Trex caiga
  trex.collide(invisibleGround);
  
    //console.log("tralala "+gameState);
  
    fill ("black");
  text("Score "+score,500,50);
  
  if(touches.length>0||mousePressedOver(restart)){
     
    reset();    
    touch = []
    
     }
     
  
  drawSprites();
}

//función para aprecer las nubes
function spawnClouds(){
  //Concatenacion = texto + operaciones arimetica
  if(frameCount%40==0){//40
    
      cloud = createSprite(width+20,height-300,40,10);
      cloud.addImage("cloud",cloudImage);
      cloud.velocityX = random(-3, -5);//5
      cloud.depth = trex.depth;
      cloud.scale = random(0.3, 0.9);//0.9
      cloud.y = random(10,400);//130
      trex.depth = trex.depth +1;
      cloud.lifetime = 210;
      cloudGroup.add(cloud);
    
      //if(cloud <100){
         
   // cloud.velocityX = ();
    
        // }
    
   }
  
}

function spawnObstacles (){
    
    if(frameCount%60==0){
      
      obs = createSprite(600,height-95,20,30);
      obs.scale = 0.5;
      obs.velocityX = -(6+score/100);
      obs.lifetime = 210;
      
    var rand =  Math.round(random(1,6));
    switch(rand){
        
      case 1: obs.addImage(obsImg1);
        break;
        
    case 2: obs.addImage(obsImg2);
      break;
      
    case 3: obs.addImage(obsImg3);
      break;
      
    case 4: obs.addImage(obsImg4);
       break;
       
    case 5: obs.addImage(obsImg5);
      break;
      
    case 6: obs.addImage(obsImg6);
      break;
        
    }

      obsGroup.add(obs);
      
 }
}

function reset(){
  
  gameState = PLAY;
  score = 0;
  restart.visible = false;
  gameOver.visible = false;
  obsGroup.destroyEach();
  cloudGroup.destroyEach();
  trex.changeAnimation("running", trex_running);
  
}