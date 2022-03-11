var gamestate  =  0;
var firstImg, secondImg, diverImg, pearlImg, gemImg, fishBImg, fishYImg, bgImg
var sea
var diver
var fishGroup
var goldGroup
var score = 0
var lives = 5
var min = 1
var time = min*60
var countdown 
var heartImg;

function preload (){
firstImg = loadImage("assets/firstPage.png")

secondImg = loadImage("assets/instructionImg.png")

diverImg = loadImage("assets/scuba diver.png")

pearlImg = loadImage("assets/pearl.png")

gemImg = loadImage("assets/gem.gif")

fishBImg = loadImage ("assets/blackfish.png")

fishYImg = loadImage ("assets/yellowfish.png")

bgImg = loadImage ("assets/scrolling.png")

heartImg = loadImage("assets/heart.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  imageMode('CENTER')

  sea = createSprite (600,200)
  sea.addImage("sea",bgImg)
  sea.visible = false
  sea.scale= 2

  diver = createSprite(width/2,height-200)
  diver.addImage("diver",diverImg)
  diver.visible = false

  fishGroup = new Group()

  goldGroup = new Group()

  timer()
}

function draw() {
  background(255,255,255);  


  if (gamestate == 0){
  background(firstImg)

  if (keyDown("space")){
    gamestate  =1
  }
  }

  if (gamestate == 1){
       background(secondImg)

       if (keyDown("s")){
        gamestate  =2
      }
  }

  if (gamestate == 2){
    gameplay()
  }



}

function gameplay(){
  drawSprites();

  console.log(time)
  textSize (30)
  fill ("white")
  text("score: "+ score, width-200,100)
//  text ("lives: "+ lives,100,100)

  sea.visible = true 
  sea.velocityY=10

  //for displaying life
  for (var i = 0; i < lives; i++) {
    image(heartImg, 30 + (i * 70),50,40,40);
    }

  diver.collide(goldGroup, function(collector, collected){
    score +=10
    collected.remove()
  })

  diver.isTouching(fishGroup, function(collector, collected){
   
    lives -=1
   collected.remove();
   collector.x =width/2;
   collector.y = height-200;

  })

  
  if (  sea.y > 1000){
    sea.y = sea.height/2
  }
  diver.visible=true

  if(keyDown(RIGHT_ARROW)){
     diver.x+=6
  }

  if(keyDown(LEFT_ARROW)){
    diver.x-=6
 }

 if(keyDown(DOWN_ARROW)){
  diver.y+=6
}

if(keyDown(UP_ARROW)){
 diver.y-=6
}
 if(keyDown(UP_ARROW)&& keyDown(RIGHT_ARROW)){
  diver.x+=6
  diver.y-=5
}

if(keyDown(UP_ARROW)&& keyDown(LEFT_ARROW)){
  diver.x-=6
  diver.y-=5
}

if(keyDown(DOWN_ARROW)&& keyDown(RIGHT_ARROW)){
  diver.x+=6
  diver.y+=5
}

if(keyDown(DOWN_ARROW)&& keyDown(LEFT_ARROW)){
  diver.x-=6
  diver.y+=5
}

if (frameCount%60==0){
  var ran = Math.round(random(1,4))
  if (ran==1){
    spawnFish(fishBImg,+7,0.2,0)
  }
  if (ran==2){
    spawnFish(fishYImg,-7,0.5,width)
  }

  if (ran==3){
    spawnGold(gemImg,0.1)
  }

  if (ran==4){
    spawnGold(pearlImg,1)
  }
}

  

}

function spawnFish(spriteImage,v,scale,x){
  var sprite = createSprite(x,random(height/2-100, height/2+100))
  sprite.addImage(spriteImage)
  sprite.scale=scale
  sprite.velocityX = v
  fishGroup.add(sprite)
}

function spawnGold(spriteImage,scale){

  var sprite = createSprite(random(0,width),random(height/2-100, height/2+100))
  sprite.addImage(spriteImage)
  sprite.scale = scale
  sprite.lifetime = 100
  goldGroup.add(sprite)
  sprite.debug = true
}

function timer(){

  setInterval(updatecountdown,1000)
}

function updatecountdown(){
  var m = Math.floor(time/60)
  var sec = time%60
  time = time -1
  if(time==0&& score>50){
    console.log ("mission accomplished")
game_over()
  }

  if((time==0&& score<50) || lives<=0){
    console.log ("mission incomplete")
    game_over2()
  }
}
function game_over(){
  swal(
    {
      title: `You Win!`, 
      text: "Thanks for playing!!",
      imageUrl:
       "assets/pearl.png",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}
function game_over2(){
  swal(
    {
      title: `You lost :(`, 
      text: "Try again next time!",
      imageUrl: 
       "assets/scuba diver.png", 
       imageSize:"150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}