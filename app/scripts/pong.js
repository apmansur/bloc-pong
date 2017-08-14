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
  
  //if paddle goes out of x bounds of canvas
  
 if(this.x + this.radius > canvas.width){
       player.paddle.score += 1;
     }
  else if (this.x - this.radius < 0) {
    computer.paddle.score += 1;
  } 
  
  //if paddle goes out of y bounds for canvas
  else if(this.y + this.radius > canvas.height){
     this.yspeed = (-this.yspeed);
     this.y = canvas.height-this.radius;
  }

  else if (this.y - this.radius < 0){
     this.yspeed = (-this.yspeed);
     this.y = this.radius;
  }
};

if (this.x <= player.paddle.x + player.paddle.width/2) {

    //in case of issues with the ball moving small px in a given frame
    var tolerance = 2;

    // Detect if ball hits front of paddle
    // y collision should be from 1/2 the ball width above the paddle's edge
    // to 1/2 the ball width below the paddle's edge
    if (this.x + tolerance >= player.paddle.x + player.paddle.width/2 
            && this.y - this.radius >= player.paddle.y
            && this.y + this.radius <= player.paddle.y + player.paddle.height/2) {
        this.xspeed = -this.xspeed;

  
    } else if (this.y - this.radius >= player.paddle.y
            && this.y <= player.paddle.y
            && this.x - this.radius >= player.paddle.x) {

        // Get the position of the center of the ball
        var x = this.x + this.radius;
        var y = this.y + this.radius;

        // Get the position of the corner of the paddle
        var px = player.paddle.x + player.paddle.width/2;
        var py = player.paddle.y;
        if (this.y + this.radius > player.paddle.y) {
            // if the ball is below the top edge, use the bottom corner
            // of the paddle - else use the top corner of the paddle
            py += player.paddle.height/2;
        }
        

        // Do some trig to determine if the ball surface touched the paddle edge
        // Calc the distance (C = sqrt(A^2 + B^2))
        var dist = Math.pow(Math.pow(x - px, 2) + Math.pow(y - py, 2), 0.5);

        // Check if the distance is within the padding zone
        if (dist <= this.radius && dist >= this.radius - tolerance) {
            // Get the angle of contact as Arc-sin of dx/dy
            var angle = Math.asin(x - px / y - py);

            // Adjust the velocity accordingly
            this.vy = (-this.yspeed * Math.cos(angle)) + (-this.xspeed * Math.sin(angle));
            this.vx = (-this.xspeed * Math.cos(angle)) + (-this.yspeed * Math.sin(angle));
        }

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
});
