var bg,bgImg;
var nave,naveImg;
var meteorito,meteoritoImg;
var bala,balaImg;
var balaGroup;
var metGroup;
var bullets = 110;
var score=0;
var gameState = "start"
var perder,ganar,explosion

function preload(){
  
  bgImg = loadImage("fondo.jpg")
  naveImg = loadImage("nave2.png")
  meteoritoImg = loadImage("meteorito1.png")
  balaImg = loadImage("bala.png")
  perder = loadSound ("lose.mp3")
  ganar = loadSound ("win.mp3")
  explosion = loadSound ("explosion.mp3")

}
function setup() {
  createCanvas(windowWidth,windowHeight);
  
   
  // Agregando la imagen de fondo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 2.0

nave = createSprite(displayWidth-1500, displayHeight-500, 50, 50);
 nave.addImage(naveImg)
   nave.scale = 0.3
   nave.debug = true
   nave.setCollider("rectangle",0,0,500,500)
  
balaGroup = new Group();
metGroup = new Group();
scoreboard= createElement("h1");
}

function draw() {
  background(0);  
  if (gameState === "start") {
    
  scoreboard.html("Puntuación: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)
  

  if(keyDown("UP_ARROW")||touches.length>0){
    nave.y = nave.y-30
  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
   nave.y = nave.y+30
  }

  if(keyWentDown("space")){
  
    dead();
    explosion.play()
    
  }


  if (metGroup.isTouching(nave)) {
    gameState = "lost"
    perder.play();
  }

  if (metGroup.isTouching(balaGroup)){ 

    
  
    for(var i=0;i<metGroup.length;i++){     
         
     if(metGroup[i].isTouching(balaGroup)){
          metGroup[i].destroy()
          balaGroup.destroyEach()
          score=score+2;
          } 
    }
   }
  
   
    if(bullets==0 && gameState!="bullet"){
       gameState = "bullet"
       perder.play()
        }
      if (score==100 && gameState!="won") {
        ganar.play();
        gameState="won"

        
      }

      enemy();
    }    
     
    drawSprites();

   if(gameState == "lost"){
     
     textSize(100)
     fill("red")
     text("Perdiste ja ja ja",displayWidth/2,displayHeight/2)
     metGroup.destroyEach()
     nave.destroy()
     
   }
   
   else if(gameState == "won"){
    
     textSize(100)
     fill("yellow")
     text("Ganaste",400,400)
     metGroup.destroyEach();
     nave.destroy();
     
   
   }
   
   else if(gameState == "bullet"){
    
    
     textSize(50)
     fill("yellow")
     text("¡Te quedaste sin balas!",470,410)
     metGroup.destroyEach();
     nave.destroy();
     bulletGroup.destroyEach();
     
     
   
   }


    
  

  
  

  textSize(30)
fill("#66D4C1")
text("balas="+bullets,displayWidth-200,displayHeight/2-300)
  
}

function enemy(){
  if(frameCount%50===0){

 
    meteorito = createSprite(windowWidth,random(200,600),40,40)

    meteorito.addImage(meteoritoImg)
    meteorito.scale = 0.15
    meteorito.velocityX = -3
    meteorito.debug= true
    meteorito.setCollider("rectangle",0,0,1300,400)
   
    meteorito.lifetime = 700
   metGroup.add(meteorito)
  }
  
}

function dead(){
  bala = createSprite(nave.x+50,nave.y,20,20)
  bala.addImage(balaImg)
  bala.scale = 0.1
  bala.velocityX = 5
  balaGroup.add(bala)
  bullets = bullets -1
}
