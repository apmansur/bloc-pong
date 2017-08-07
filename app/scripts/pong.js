var canvas = document.getElementById("pong-table");
var context = canvas.getContext('2d');


function Paddle(x, y) {
    this.x = x;
    this.y = y;
    this.width = 25;
    this.height = 100;
    this.speed = 3 px;
};

Paddle.prototype.move = function () {
    if ( /*down key is pressed key code keypress.key = 40*/ ) {
        if (this.y > /*the start of canvas*/ ) {
            this.y =- this.speed;
        } else {
            this.y = this.y
         } 
    else if ( /*up key is pressed key code keypress.key = 38*/ ) {
            if (this.y < canvas.height) {
                this.y = +this.speed
            }
        }
    }
};

function Player() {
    var paddle = new Paddle(0, 50);
    paddle.render()
};

function Computer() {
    var paddle = new Paddle(canvas.width - 50, 50);
    paddle.render()
};

function Ball() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.radius = 15;
    this.startAngle = 1 * Math.PI;
    this.endAngle = 0.9999999 * Math.PI;
    this.counterClockwise = false;
};


function Net() {
    this.x = canvas.width / 2;
    this.p1 = 10;
    this.p2 = canvas.height - 10
};


// render functions

Net.prototype.render = function () {
    context.beginPath();
    context.moveTo(canvas.width / 2, this.p1);
    context.lineTo(canvas.width / 2, this.p2);
    context.strokeStyle = "black";
    context.stroke();
};
Ball.prototype.render = function () {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.counterClockwise);
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.stroke();
};
Paddle.prototype.render = function () {
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.fillStyle = 'black';
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.stroke();
};

//aniamtion

var startTime = -1;
var animationLength = 2000;
var animate = window.requestAnimationFrame ||
    function (step) {
        window.setTimeout(step, 1000 / 60)
    };

function step(timestamp) {
    // Calculate animation progress
    var progress = 0;

    if (startTime < 0) {
        startTime = timestamp;
    } else {
        progress = timestamp - startTime;
    }

    // Do animation ...
    if (progress < animationLength) {
        requestAnimationFrame(doAnimation);
    }
}

window.requestAnimationFrame(step).addEventListener(/*keypress*/);
}

//asynchronous key input??

window.onload = function () {
    var player = Player();
    var computer = Computer();
    var net = new Net();
    var ball = new Ball();

    player;
    computer;
    net.render();
    ball.render();

}
