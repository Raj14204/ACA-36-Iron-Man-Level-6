//global variables
var ironman;
var Diamondimg,diamondGroup,diamondscore=0,diamondsound;
var bg, backgroundImg;
var stoneIMG,stonesgroup;
var spikesIMG,spikesgroup;
var gamestate="play";

function preload() {
    //preload function is use to load all the game assets  
    backgroundImg = loadImage("images/bg.jpg");
    ironmanimg=loadImage("images/iron.png");
    stoneIMG=loadImage("images/stone.png");
    Diamondimg=loadImage("images/diamond.png");
    diamondsound=loadSound("sound/coinsound.mp3");
    spikesIMG=loadImage("images/spikes.png");

}

function setup() {
    //create canvas
    createCanvas(1000, 600);
  //create background  sprite
    bg = createSprite(580,300);
    bg.addImage(backgroundImg);
    //scale is use increase or decrease the size
    bg.scale=2;
    bg.velocityY=-5;
  //create ironman sprite
    ironman=createSprite(50,500);
    ironman.addImage(ironmanimg)
    ironman.scale=0.4;
    //making the groups 
    stonesgroup= new Group();
    diamondGroup=new Group();
    spikesgroup=new Group();
  }

  function draw() {
  if (gamestate==="play"){
    //scroll background 
    if(bg.y<225){
      bg.y=bg.width/4;
    }
    //moving ironman with mouse
    ironman.x= mouseX;
    ironman.y= mouseY; 
     //preventing ironman moving out with stones 
    if (ironman.x<50){
      ironman.x=50;

    }
  //preventing iron man moving out from the right
  if (ironman.x>(950)){
    ironman.x=950;
  }
  //calling the function  genrate stones
  genratestone();
  //make ironman to step(collide) on stone
  for (var i=0;i<(stonesgroup).length;i++){
    var temp=(stonesgroup).get(i);
      if (temp.isTouching(ironman)){
        ironman.collide(temp)
  }

  }
  //calling the function  genrate diamonds
  genratediamond();
  //make ironman to catch the diamond
    for(var i=0;i<(diamondGroup).length;i++){
      var temp=diamondGroup.get(i);
        if (temp.isTouching(ironman)){
          //to play the sound 
          diamondsound.play();
          //to increase the score by 1
          diamondscore++;
          //to destroy the diamond
          temp.destroy();  
        temp=null;    
      }  
  }
  //calling the function  genrate spikes
  genratespikes();
  for (var i=0;i<(spikesgroup).length;i++){
    var temp =spikesgroup.get(i);
      if (temp.isTouching(ironman)){
        //it will decriase the score by 5 if ironman touch 
        diamondscore=diamondscore-5;
        temp.destroy();
        temp=null;
      }
  }
  if(diamondscore<=-10 || ironman.y>610){
    gamestate ="END";
   }
}
if (gamestate==="END"){
  bg.velocityY=0;
  ironman.velocityY=0;
  diamondGroup.setVelocityY(0);
  spikesgroup.setVelocityY(0);
  stonesgroup.setVelocityY(0);
  diamondGroup.setLifetimeEach(-1);
  spikesGroup.setLifetimeEach(-1);
  stonesGroup.setLifetimeEach(-1);

}
  //function use to display the sprites
  drawSprites()
  //to increase the font size 
  textSize(20);
  fill("brown")
  //to disply the score 
  text("diamond collected:" + diamondscore,500,50);


   
}
function genratestone(){
 if (frameCount % 70===0){
    var stone=createSprite(1200,120,40,10);
    stone.x=random(0,1000);
    stone.addImage(stoneIMG);
    stone.scale=0.5;
    stone.velocityY=-5;

    stone.lifetime=250;  
    stonesgroup.add(stone);

} 
}

function genratediamond(){
  if (frameCount % 50===0){
      var diamond=createSprite(1200,120,40,10);
      diamond.x=round (random(0 ,800));
      diamond.y=round(random(0,600));
      //console.log(coin.y);\
      diamond.addImage(Diamondimg);
      diamond.scale=0.5;
      diamond.velocityY=-5;
      diamond.lifetime=1200;
      diamondGroup.add(diamond);

      
  
  }
}
function genratespikes(){
if (frameCount%50===0){
  var spikes=createSprite(1200,120,40,10);
  spikes.x=round(random(0,800));
  spikes.y=round(random(0,600));
  spikes.addImage(spikesIMG);
  spikes.scale=0.5;
  spikes.velocityY=-5;
  spikes.lifetime=1200;
  spikesgroup.add(spikes);
}
}