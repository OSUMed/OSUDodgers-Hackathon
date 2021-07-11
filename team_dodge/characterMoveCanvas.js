pic = new Image();
pic.src = 'https://i.imgur.com/9JbbBgL.png';
pic.onload = function() { window.requestAnimationFrame(move);
};


framecanv = document.querySelector('canvas');
visual = framecanv.getContext('2d');



const FACTOR_ONE = 500;
const FACTOR_TWO = 1;
const maxFPS = 20;
const FACTOR_THREE = 400;
const LoopMove = [0, 1, 0, 1];
const tall = FACTOR_TWO * FACTOR_THREE;
const wide = FACTOR_TWO * FACTOR_ONE;


function board(XCord, YCord, factor1, factor2) {
  visual.drawImage(pic,
                XCord * FACTOR_ONE, YCord * FACTOR_THREE, FACTOR_ONE, FACTOR_THREE,
                factor1, factor2, wide, tall);
}


var LoopIter = 0;
var direct = 0;
var numFPS = 0;

function move() {   window.requestAnimationFrame(move);
}

WASDInput = {};

window.addEventListener('keydown', keyDownListener, false);
function keyDownListener(event) {
  WASDInput[event.key] = true;
}


window.addEventListener('keyup', keyUpListener, false);
function keyUpListener(event) {
  WASDInput[event.key] = false;
}




var XCordinate = 0;
var YCordinate = 0;
const ACCELERATION = 4;
const LEFT_VIEW = 2;
const UP_VIEW = 1;
const DOWN_VIEW = 0;
const RIGHT_VIEW = 3
var direct = DOWN_VIEW;


function move() {
  visual.clearRect(0, 0, framecanv.width, framecanv.height);
  
  var boundedmotion = false;

  if (WASDInput.s) {
    YCordinate = YCordinate + ACCELERATION;
    direct = UP_VIEW;
    boundedmotion = true;
  } else if (WASDInput.w) {
    YCordinate = YCordinate - ACCELERATION;
    direct = UP_VIEW;
    boundedmotion = true;
  }
  if (WASDInput.d) {
    XCordinate = XCordinate + ACCELERATION;
    direct = DOWN_VIEW;
    boundedmotion = true;
  } else if (WASDInput.a) {
    XCordinate = XCordinate - ACCELERATION;
    direct = DOWN_VIEW;
    boundedmotion = true;
  }

 if (boundedmotion){
   numFPS++;
   if (numFPS >= maxFPS){
     numFPS = 0;
     LoopIter++;
     if (LoopIter >= LoopMove.length){
       LoopIter = 0;
     }
   }
 }
  
  if (!boundedmotion){
    LoopIter = 0;
  }

  board(LoopMove[LoopIter], direct, XCordinate, YCordinate);
  window.requestAnimationFrame(move);
}
