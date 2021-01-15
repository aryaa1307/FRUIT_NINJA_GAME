var k,kimg;
var f,f1img,f2img,f3img,f4img,fruitGroup;
var e,eimg,eGroup;
var score;
var gameState;
var gameOver;
var gameOversound,kSound;

function preload()
{
  kimg=loadImage("sword.png");
  f1img=loadImage("fruit1.png");
  f2img=loadImage("fruit2.png");
  f3img=loadImage("fruit3.png");
  f4img=loadImage("fruit4.png");
  eimg=loadAnimation("alien1.png");
  gameOver=loadImage("gameover.png");
  gameOversound=loadSound("gameover.mp3");
  kSound=loadSound("knifeSwooshSound.mp3");
}

function setup()
{
  createCanvas(500, 500);
  k=createSprite(200,200,10,50);
  k.addImage(kimg);
  k.scale=0.7;
  
  score=0;
  gameState="play";
  
  fruitGroup=createGroup();
  eGroup=createGroup();

   k.setCollider("circle",0,0,40);
  // k.debug=true;
}

function draw()
{
 background("pink");  
  
 if (gameState==="play")
 {
   k.y=World.mouseY;
   k.x=World.mouseX;
   
   if(k.isTouching(fruitGroup))
     {
       score=score+2;
       fruitGroup.destroyEach();
       kSound.play();
     }
   
   if(k.isTouching(eGroup))
     {
       gameState="end";
       gameOversound.play();
     }
   
   fruit();
   enemy();
 }  
else if(gameState==="end")
  {
    k.addImage(gameOver);
    k.scale=1.5;
    k.y=250;
    k.x=250;
    eGroup.destroyEach();
    fruitGroup.destroyEach();
    eGroup.velocityX=0;
    fruitGroup.velocityX=0;
  }
 drawSprites(); 
textSize(20) ; 
text("Score: "+ score, 400,50);
}

function fruit() 
{
  if (frameCount % 80 === 0) 
    {
    f=createSprite(400,200,20,20);  
    fruit.scale=0.2;
    var r=Math.round(random(1,4));
    switch(r)
      {
     case 1:
     f.addImage(f1img);
     f.scale=0.2;     
     break;
     case 2:
     f.addImage(f2img);  
     f.scale=0.2;     
     break;
     case 3:
     f.addImage(f3img);
     f.scale=0.2;     
     break;   
     case 4:
     f.addImage(f4img);
     f.scale=0.2;     
     break;
      }
     f.y=Math.round(random(50,340));
     f.velocityX=-7;
     f.setLifetime=100;
     fruitGroup.add(f); 
    }
 }

function enemy ()
{
 if (frameCount % 200 === 0)
   {
     e=createSprite(400,200,20,20);
     e.addAnimation("moving",eimg);
     e.y=Math.round(random(100,30));
     e.velocityX=-8;
     e.setLifetime=50;
     eGroup.add(e);
   }
}


