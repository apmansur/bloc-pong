    var canvas = document.getElementById("pong-table");
    var context = canvas.getContext('2d');
    context.fillStyle = "white";
    var game = new Game();
  

    Game.prototype.update = function () {
        if (this.paused)
            return;
        if (this.keys.isPressed(83)) { // DOWN
            this.player1.paddle.y = Math.min(canvas.height - this.player1.paddle.height, this.player1.paddle.y + 4);
        } else if (this.keys.isPressed(87)) { // UP
            this.player1.paddle.y = Math.max(0, this.player1.paddle.y - 4);
        }

        if (this.keys.isPressed(40)) { // DOWN
            this.computer.paddle.y = Math.min(canvas.height - this.computer.paddle.height, this.computer.paddle.y + 4);
        } else if (this.keys.isPressed(38)) { // UP
            this.computer.paddle.y = Math.max(0, this.computer.paddle.y - 4);
        }
    }
    
   function KeyListener() {
        this.pressedKeys = [];
        this.keydown = function (event) {
            this.pressedKeys[event.keyCode] = true;
        };
        this.keyup = function (event) {
            this.pressedKeys[event.keyCode] = false;
        };
        document.addEventListener("keydown", this.keydown.bind(this));
        document.addEventListener("keyup", this.keyup.bind(this));
    };

    KeyListener.prototype.isPressed = function (key) {
        return this.pressedKeys[key] ? true : false;
    };

    KeyListener.prototype.addKeyPressListener = function (keycode, callback) {
        document.addEventListener("keypress", function (event) {
            if (event.keyCode == keyCode)
                callback(event);
        });
    };



    function Paddle(x, y) {
        this.x = x;
        this.y = y;
        this.width = 25;
        this.height = 100;
        this.speed = 3;
        this.score = 0;
    };

//combined in game.update()

   /* Paddle.prototype.move = function (x, y) {
        this.x += x;
        this.y += y;
        if (this.y < 50) {
            this.y = 50;
        } else if (this.y > (canvas.height - 50)) {
            this.y = canvas.height - 50;
        }
    };


    Player.prototype.move = function () {
        for (key in keyDown) {
            console.log(key);
            if (key == "40") {
                this.paddle.move(0, 3);
            } else if (key == "38") {
                this.paddle.move(0, -3);
            }
        }
    }

    Computer.prototype.move = function () {
        for (key in keyDown) {
            if (key == "40") {
                this.paddle.move(0, 3);
            } else if (key == "38") {
                this.paddle.move(0, -3);
            }
        }
    }
*/
    
    //constructors
    
    function Game(){
        this.player1 = new Player();
        this.computer = new Computer();
        this.net = new Net();
        this.ball = new Ball();
        this.keys = new KeyListener();
    }


    function Player() {
        this.paddle = new Paddle(0, 50);
    };

    function Computer() {
        this.paddle = new Paddle(canvas.width - 50, 50);
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


    //animation

    /*var startTime = -1;
    var animationLength = 500;
    var animate = window.requestAnimationFrame ||
        function (step) {
            window.setTimeout(step, 1000 / 60)
        };

    function step() {

        game.update();
        setTimeout(step, 1000 / 60);
    }
    */

    window.onload = function () {
        game.player1.paddle.render();
        game.computer.paddle.render();
        game.net.render();
        game.ball.render();
        step();

    }
