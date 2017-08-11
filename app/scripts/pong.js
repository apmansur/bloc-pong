var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
  window.setTimeout(callback, 1000 / 60)
}
var canvas = document.getElementById('pong-table')
var width = 1000
var height = 500
canvas.width = width
canvas.height = height
var context = canvas.getContext('2d')
var player = new Player()
var computer = new Computer()
var net = new Net()
var ball = new Ball()

var pressedKeys = {}

var render = function () {
  context.fillStyle = 'white'
  context.fillRect(0, 0, width, height)
  player.render()
  computer.render()
  net.render()
  ball.render()
}

var update = function () {
  player.update()
  computer.update()
  ball.update()
}

var step = function () {
  update()
  render()
  animate(step)
}

// *** PADDLE ***

function Paddle (x, y, width, height) {
  this.x = x
  this.y = y
  this.width = width
  this.height = height
  this.speed = 0
  this.score = 0
};

Paddle.prototype.render = function () {
  context.fillStyle = 'black'
  context.fillRect(this.x, this.y, this.width, this.height)
}

Paddle.prototype.move = function (x, y) {
  this.x += x
  this.y += y
  this.speed = y
  if (this.y < 50) {
    this.y = 50
    this.speed = 0
  } else if (this.y > (canvas.height - 50)) {
    this.y = canvas.height - 50
    this.speed = 0
  }
}

// *** COMPUTER ***

function Computer () {
  this.paddle = new Paddle(canvas.width - 50, 50, 25, 100)
  this.twoPlayer = true
};

Computer.prototype.render = function () {
  this.paddle.render()
}

Computer.prototype.update = function () {
  // TODO Implement computer paddle moving to track ball
  for (var key in pressedKeys) {
    if (key === '83') {
      this.paddle.move(0, 4)
    } else if (key === '87') {
      this.paddle.move(0, -4)
    }
  }
}

// *** PLAYER ***

function Player () {
  this.paddle = new Paddle(0, 50, 25, 100)
};

Player.prototype.render = function () {
  this.paddle.render()
}

Player.prototype.update = function () {
  for (var key in pressedKeys) {
    if (key === '40') {
      this.paddle.move(0, 4)
    } else if (key === '38') {
      this.paddle.move(0, -4)
    }
  }
}


// *** BALL ***

function Ball () {
  this.x = canvas.width / 2
  this.y = canvas.height / 2
  this.radius = 15
  this.startAngle = 1 * Math.PI
  this.endAngle = 0.9999999 * Math.PI
  this.counterClockwise = false
  this.xspeed = 1;
  this.yspeed = 0;
}



Ball.prototype.render = function () {
  context.beginPath()
  context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.counterClockwise)
  context.lineWidth = 1
  context.strokeStyle = 'black'
  context.stroke()
}



Ball.prototype.update = function () {
  // TODO Implement ball movement
  // *** Collision Detection ***// 
 var xLeftPaddle = player.paddle.x + player.paddle.width/2;
 var xRightPaddle = computer.paddle.x - computer.paddle.width/2;
 var yLeftPaddleTop = player.paddle.y - player.paddle.height/2;
 var yLeftPaddleBottom = player.paddle.y + player.paddle.height/2;
 var yRightPaddleTop = computer.paddle.y - computer.paddle.height/2;
 var yRightPaddleBottom = computer.paddle.y + computer.paddle.height/2;
 
 var rightXBall = this.x + this.radius;
 var leftXBall= this.x - this.radius;
 
  if((this.x + this.radius > canvas.width)){
        //collision paddle add to score
     }
  else if (this.x - this.radius < 0) {
    //collision paddle add to score
  }
  else if(this.y + this.radius){
     this.y = (-this.y);
     this.y = canvas.height-this.radius;
  }

  else if (this.y - this.radius == ){
     this.yspeed = (-this.yspeed);
     this.y = this.radius;
  }

if(/*ball hits paddle*/){
    this.xspeed = (-this.xspeed);
    
}
}

// *** NET ***

function Net () {
  this.x = canvas.width / 2
  this.p1 = 10
  this.p2 = canvas.height - 10
};

Net.prototype.render = function () {
  context.beginPath()
  context.moveTo(canvas.width / 2, this.p1)
  context.lineTo(canvas.width / 2, this.p2)
  context.strokeStyle = 'black'
  context.stroke()
}

// *** ANIMATION ***

animate(step)

window.addEventListener('keydown', function (event) {
  pressedKeys[event.keyCode] = true
})

window.addEventListener('keyup', function (event) {
  delete pressedKeys[event.keyCode]
})
