//*** Global Variables ***

var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
  window.setTimeout(callback, 1000 / 60);
};
var canvas = document.getElementById('pong-table');
var width = 1000;
var height = 500;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');
var player = new Player();
var computer = new Computer();
var net = new Net();
var ball = new Ball();
var pressedKeys = {};
var difficulty = 0.1;

var random = function(diff) {
  return diff * Math.random();
};

var endMessage = function(winner){
  context.font = "4em Verdana";
   context.fillStyle = "green";
  context.textAlign = "center";
   context.fillText((winner + "has won the game!") , 500, 250); 
};

var endGame = function(player, computer){
  if (player.paddle.score == 11 ){
    endMessage("Player 1");
    step();
  }
   else if (computer.paddle.score == 1){
     if (computer.paddle.twoPlayer === false){
       endMessage("Computer");
       step();
       console.log("hello");
     }
     else{
       endMessage("Player 2");
     }
  
   }
};



//*** Render Game ***

var render = function () {
  context.fillStyle = 'black';
  context.fillRect(0, 0, width, height);
  player.render();
  computer.render();
  net.render();
  ball.render();
  score();
};

var update = function () {
  endGame(player, computer);
  player.update();
  computer.update();
  
  ball.update();
  
};

var step = function () {
  update();
  render();
  animate(step);
};

//*** Score ***

var score =  function (){
    context.font = "2.5em Verdana";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText(player.paddle.score , 450, 50); 
    context.font = "2.5em Verdana";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText(computer.paddle.score , 550, 50);
};



// *** PADDLE ***

function Paddle (x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speed = 1;
  this.score = 0;
}

Paddle.prototype.render = function () {
  context.fillStyle = 'white';
  context.fillRect(this.x, this.y, this.width, this.height);
};

Paddle.prototype.move = function (x, y) {
  this.x += x;
  this.y += y;
  this.speed = y;
  if (this.y + this.height/2 < 50) {
    this.y = 50 - this.height/2;
    this.speed = 0;
  } else if (this.y + this.height/2 > (canvas.height - 50)) {
    this.y = canvas.height - 50 - this.height/2;
    this.speed = 0;
  }
};


// *** COMPUTER ***

function Computer () {
  this.paddle = new Paddle(canvas.width - 30 , 50, 25, 100);
  this.twoPlayer = false;
}

Computer.prototype.render = function () {
  this.paddle.render();
};

Computer.prototype.update = function () {
  // TODO Implement computer paddle moving to track ball

  if (computer.twoPlayer === false){
    // difference between ball x and the paddle x
    var diff = -(((this.paddle.y + (this.paddle.height/2))) - ball.y);
    if (diff < 0 && diff < -4) {
        diff = -5;
  
    }
    else if (diff > 0 && diff > 4) {
        diff = 5;
    }
    this.paddle.move(0, random(diff));
    if ((this.paddle.y + this.paddle.height) > 500) {
        this.paddle.y = 400;
    }
    else if (this.paddle.y <0){
      this.paddle.y = 0;
    }
  }
  else {
  for (var key in pressedKeys) {
    if (key === '40') {
      this.paddle.move(0, 4);
    } else if (key === '38') {
      this.paddle.move(0, -4);
    }
  }
  }
};

//computer AI

// *** PLAYER ***

function Player () {
  this.paddle = new Paddle(5, 50, 25, 100);
}

Player.prototype.render = function () {
  this.paddle.render();
};

Player.prototype.update = function () {
  for (var key in pressedKeys) {
    if (key === '83') {
      this.paddle.move(0, 4);
    } else if (key === '87') {
      this.paddle.move(0, -4);
    }
  }
};

//pause the game with space key
function keyDown(space) {
  if (space.keycode == 19) pauseGame();
} 

function pauseGame() {
  if (!gamePaused) {
    game = clearTimeout(game);
    gamePaused = true;
  } else if (gamePaused) {
    game = setTimeout(gameLoop, 1000 / 60);
    gamePaused = false;
  }
}


// *** BALL ***

function Ball () {
  this.x = canvas.width / 2;
  this.y = canvas.height / 2;
  this.radius = 20;
  this.startAngle = 0;
  this.endAngle = 2 * Math.PI;
  this.counterClockwise = false;
  this.xspeed = 5;
  this.yspeed = 0;
}

Ball.prototype.render = function () {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.counterClockwise);
  context.fillStyle = 'white';
  context.fill();
};

Ball.prototype.reset = function (){
  this.xspeed = 3;
  this.yspeed = 0;
  this.x = canvas.width / 2;
  this.y = canvas.height / 2;
};


//*** Collison ***

Ball.prototype.update = function () {
  var leftBall = this.x - this.radius;
  var rightBall = this.x + this.radius;
  var topBall = this.y - this.radius;
  var bottomBall = this.y + this.radius;
  
  this.x += this.xspeed;
  this.y += this.yspeed;
  
  //if paddle goes out of x bounds of canvas
 if(rightBall > canvas.width){
       player.paddle.score += 1;
       this.reset();
       
     }
  else if (leftBall < 0) {
    computer.paddle.score += 1;
    console.log(computer.paddle.score);
    this.reset();
  } 
  
  //if paddle goes out of y bounds for canvas (ball top and bottom is reverse of canvas)
  else if(bottomBall > canvas.height){
     this.yspeed = (-this.yspeed);
     this.y = canvas.height-this.radius;
  }

  else if (topBall < 0){
     this.yspeed = (-this.yspeed);
     this.y = this.radius;
  }
  
  
  if (leftBall < 500) {
  if (leftBall < (player.paddle.x + player.paddle.width) && rightBall > player.paddle.x && topBall < (player.paddle.y + player.paddle.height) && bottomBall > player.paddle.y) {
    this.xspeed = 3
    this.yspeed += (player.paddle.speed/4)
    this.x += this.xspeed
  }
} else {
  if (leftBall < (computer.paddle.x + computer.paddle.width) && rightBall > computer.paddle.x && topBall < (computer.paddle.y + computer.paddle.height) && bottomBall > computer.paddle.y) {
    this.xspeed = -3
    this.yspeed += (computer.paddle.speed/4)
    console.log(this.yspeed)
    this.x += this.xspeed
  }
}
};


// *** NET ***

function Net () {
  this.x = canvas.width / 2;
  this.p1 = 0;
  this.p2 = canvas.height;
}

Net.prototype.render = function () {
  context.beginPath();
  context.moveTo(canvas.width / 2, this.p1);
  context.lineTo(canvas.width / 2, this.p2);
  context.strokeStyle = 'white';
  context.setLineDash([20, 10]);
  context.lineWidth= 5;
  context.stroke();
};

// *** ANIMATION ***

animate(step);

window.addEventListener('keydown', function (event) {
  pressedKeys[event.keyCode] = true;
});

window.addEventListener('keyup', function (event) {
  delete pressedKeys[event.keyCode];
});
