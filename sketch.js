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
var circleSize;
var pos_x;
var pos_y;
var compSize;
function preload() {
  saxSound=loadSound('./assets/soiSax.mp3');
  brassSound=loadSound('./assets/soiBrass.mp3');
  backingSound=loadSound('./assets/soiBacking.mp3');

  jazzPlayer=loadImage('./assets/jazzPlayer.png');
  jazztime=loadImage('./assets/jazztime.png');

}

function setup() {
  createCanvas(windowWidth,windowHeight);
  noStroke();
  rectMode(CENTER);
  angleMode(DEGREES);


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
    }

    push()
    background(244, 237, 208,180);
    if(width==height) {translate(-90,20)};
    push();
    translate(0,vol2*100);
    image(jazzPlayer,-120,-250,900/1.2,780/1.2);
    blendMode(MULTIPLY);
    pop();
    fill(247, 123, 14,230);
    rotate(30);
    blendMode(DARKEST);
    rect(150,400,width*0.6,height);
    push();
    rotate(15);
    rect(-500,700,width*0.1,height);
    pop();
    rotate(-20);
    rect(0,-400,width*1.5,height*0.5);
    pop();

  } else {
    saxSound.pause();
    brassSound.pause();
    backingSound.pause();
    background(50)
  }


  push();
  blendMode(MULTIPLY);
  sax.fullCircle(-400,-250,500,100,vol,color(255, 73, 167)); //pos_x,pos_y,circleSize,multiplier,analyzer_vol,fullCol
  blendMode(BLEND);
  // sax.holeCircle(-370,-30,800,3,500,vol,244, 237, 208); //pos_x,pos_y,circleSize,sized,multiplier,analyzer_vol,bg_col
  blendMode(MULTIPLY);
  brass.fullCircle(0,50,200,800,vol2,color(255, 73, 167,200));
  brass.fullCircle(130,-120,100,300,vol2,color(255, 73, 167,200));
  pop();

  push();
  blendMode(MULTIPLY);
  backing.rect(100,-300,600,vol2,800,50,vol4,-30,30,color(255, 73, 167)); //pos_x,pos_y,rectWidth,analyzer_volW,multiplierW,rectHeight,analyzer_volH,multiplierH,rot,rectCol
  pop();

  push();
  blendMode(MULTIPLY);
  backing.rect(300,-260,600,vol2,1000,20,vol4,-60,30,color(255, 73, 167)); //pos_x,pos_y,rectWidth,analyzer_volW,multiplierW,rectHeight,analyzer_volH,multiplierH,rot,rectCol
  pop();
  push();
  blendMode(MULTIPLY);
  backing.rect(-100,260,600,vol2,800,60,vol4,-60,-30,color(255, 73, 167)); //pos_x,pos_y,rectWidth,analyzer_volW,multiplierW,rectHeight,analyzer_volH,multiplierH,rot,rectCol
  pop();

  push();
  rotate(-30+vol*6);
  scale(0.3);
  blendMode(MULTIPLY);
  if(width==height) {translate(width*1.1,height*0.4);}
  image(jazztime,-1600,-1200);

  pop();
}

function Instrument() {

  this.holeCircle = function(pos_x,pos_y,circleSize,sized,multiplier,analyzer_vol,bg_col) {
    fill(bg_col);
    ellipse(pos_x,pos_y,circleSize/sized+analyzer_vol*multiplier,circleSize/sized+analyzer_vol*multiplier);
  }
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
function allReset() {saxSound.setVolume(1);brassSound.setVolume(1); backingSound.setVolume(1);}

function windowResized() {resizeCanvas(windowWidth,windowHeight);}

var distActivator = circleSize/1.5

function mouseMoved(){

  // var dr1 = dist(mx,my,pos_x,pos_y);
  // var dr2 = dist(mx,my,pos2x,pos2y);
  // var dr3 = dist(mx,my,pos3x,pos3y);
  // mx = mouseX - width/2;
  // my = mouseY - height/2;
  // saxSound.amp(1-dr1/1000);
  // brassSound.amp(1-dr2/1000);
  // if(dr1<distActivator) {soloSax();}
  // if(dr2<distActivator) {solobrass();}
}
