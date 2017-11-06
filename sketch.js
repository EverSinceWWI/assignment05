var sax;
var brass;
var backing;
var analyzerSax;
var analyzerBrass;
var analyzerBacking;
var analyzer_vol;
var saxSound;
var brassSound;
var backingSound;
var compSize;
var mx;
var my;
var activRadius1=380;
var activX1 = -400;
var activY1 = -350;
var activRadius2=400;
var activX2 = 260;
var activY2 = 190;
var satList = ['62.1','93.6','100','100'] //[0]background [1]orange [2]pinkSax [3]pinkBrass

function preload() {
  saxSound=loadSound('./assets/soiSax.mp3');
  brassSound=loadSound('./assets/soiBrass.mp3');
  backingSound=loadSound('./assets/soiAll.mp3');

  jazzPlayer=loadImage('./assets/jazzPlayer.png');
  jazztime=loadImage('./assets/jazztime.png');

}

function setup() {
  createCanvas(windowWidth,windowHeight);
  noStroke();
  rectMode(CENTER);
  angleMode(DEGREES);
  colorMode(HSL);


  analyzerSax = new p5.Amplitude();
  analyzerBrass = new p5.Amplitude();
  analyzerBacking = new p5.Amplitude();
  analyzerSax.setInput(saxSound);
  analyzerBrass.setInput(brassSound);
  analyzerBacking.setInput(backingSound);

  sax = new Instrument();
  brass = new Instrument();
  backing = new Instrument();

}

function draw() {
  var vol = analyzerSax.getLevel();
  var vol2 = analyzerBrass.getLevel();
  var vol4 = analyzerBacking.getLevel();

  translate(width/2,height/2);

  scale(compSize/800);
  if(width>height) {compSize=height;}
  else {compSize=width;}

  if (mouseX != -1) {
    if (backingSound.isPlaying() === false) {
      saxSound.play();
      brassSound.play();
      backingSound.play();
      saxSound.setVolume(0);
      brassSound.setVolume(0);

    }
var volSwitch2 = vol4*30
var volSwitch3 = vol4*800
if(satList[2]==0) {volSwitch2=vol2*100; volSwitch3=vol2*800}

    push();
    background(48,satList[0], 88.6,180);
    if(width==height) {translate(-90,20)};
    push();
    translate(0,volSwitch2);
    image(jazzPlayer,-120,-250,900/1.2,780/1.2);

    blendMode(MULTIPLY);
    pop();

    fill(28,satList[1], 51.2,230);
    blendMode(DARKEST);
    backing.rect(150,400,width*0.6,vol4,10,height,vol4,100,30,color(28,satList[1], 51.2,230))
    backing.rect(-500,700,width*0.1,vol4,10,height,vol4,30,15,color(28,satList[1], 51.2,230))
    backing.rect(0,-400,width*1.5,vol4,10,height*0.5,vol4,20,-20,color(28,satList[1], 51.2,230))
    pop();

  } else {
    saxSound.pause();
    brassSound.pause();
    backingSound.pause();
    background(50)
  }

  push();
  blendMode(MULTIPLY);
  sax.fullCircle(-400,-250,500,100,vol,color(329,satList[2], 64.3)); //pos_x,pos_y,circleSize,multiplier,analyzer_vol,fullCol
  blendMode(BLEND);
  blendMode(MULTIPLY);
  brass.fullCircle(0,50,200,1,volSwitch2,color(329,satList[3], 64.3,200));
  brass.fullCircle(130,-120,100,1,volSwitch2,color(329,satList[3], 64.3,200));
  pop();

  push();
  blendMode(MULTIPLY);
  backing.rect(100,-300,600,volSwitch3,1,50,vol2,10,30,color(329,satList[3], 64.3)); //pos_x,pos_y,rectWidth,analyzer_volW,multiplierW,rectHeight,analyzer_volH,multiplierH,rot,rectCol
  pop();

  push();
  blendMode(MULTIPLY);
  backing.rect(300,-260,600,volSwitch3,1,20,vol2,20,30,color(329,satList[3], 64.3)); //pos_x,pos_y,rectWidth,analyzer_volW,multiplierW,rectHeight,analyzer_volH,multiplierH,rot,rectCol
  pop();

  push();
  blendMode(MULTIPLY);
  backing.rect(-100,260,600,volSwitch3,1,60,vol2,20,-30,color(329,satList[3], 64.3)); //pos_x,pos_y,rectWidth,analyzer_volW,multiplierW,rectHeight,analyzer_volH,multiplierH,rot,rectCol
  pop();

  var volSwitch1 = vol4*2
  if(satList[3]==0) {volSwitch1=vol*7}

  push();
  rotate(-30+volSwitch1);
  scale(0.3);
  blendMode(MULTIPLY);
  if(width==height) {translate(width*1.1,height*0.4);}
  image(jazztime,-1600,-1200);

  pop();



  //ACTIVATOR GUIDES
  push();
  translate(0,0);
  // fill(45,45,45,80);
  noFill();
  noStroke();
  ellipse(activX1,activY1,activRadius1*2);
  ellipse(activX2,activY2,activRadius2*2);
  pop();

}

function Instrument() {

  this.fullCircle = function(pos_x,pos_y,circleSize,multiplier,analyzer_vol,fullCol) {
    fill(fullCol);
    ellipse(pos_x,pos_y,circleSize+analyzer_vol*multiplier,circleSize+analyzer_vol*multiplier);
  }
  this.rect = function(pos_x,pos_y,rectWidth,analyzer_volW,multiplierW,rectHeight,analyzer_volH,multiplierH,rot,rectCol) {
    fill(rectCol);
    rotate(rot)
    rect(pos_x,pos_y,rectWidth+analyzer_volW*multiplierW,rectHeight+analyzer_volH*multiplierH)
  }
}

function allStop() {saxSound.stop(); brassSound.stop(); backingSound.stop();}
function allPlay() {saxSound.play(); brassSound.play(); backingSound.play();}
function soloSax() {saxSound.setVolume(1); brassSound.setVolume(0); backingSound.setVolume(0);}
function soloBrass() {brassSound.setVolume(1); saxSound.setVolume(0); backingSound.setVolume(0);}
function allReset() {saxSound.setVolume(0);brassSound.setVolume(0); backingSound.setVolume(1);}

function windowResized() {resizeCanvas(windowWidth,windowHeight);}

function mouseMoved(){
  var dr1 = dist(mx,my,activX1,activY1);
  var dr2 = dist(mx,my,activX2,activY2);
  mx = mouseX-width/2;
  my = mouseY-height/2;

  if(dr1<activRadius1 && dr1 !==0) {soloSax(); satList[0]=0; satList[1]=0; satList[2]=100; satList[3]=0;}
  else if(dr2<activRadius2) {soloBrass(); satList[0]=0; satList[1]=0; satList[2]=0; satList[3]=100;}
  else{allReset(); bgSat=62.1; satList[0]=62.1; satList[1]=93.6; satList[2]=100; satList[3]=100;}
}
