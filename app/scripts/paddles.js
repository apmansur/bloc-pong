// find the canvas
var table_canvas = document.getElementbyId("pong-table");
var context = table_canvas.getContext('2d');

//create paddle contructor
function Paddle(x,y,width,height, computer, name) {
    this.x = x || 0;
    this.y = y || 50;
    this.width = width || 50;
    this.height = height || 100;
    this.computer = computer || false // this will be a boolean indicating if the paddle is controlled
                            //by a player or not
    
   
}


//create paddle when single or multiplayer selected
var createPaddle = new Paddle(x,y,width,height) {
      context.beginPath();
      context.rect(x, y, width, height);
      context.fillStyle = "black";
      context.fill();
      context.lineWidth = 1;
      context.strokeStyle = 'black';
      context.stroke();
} 

//paddle path, vertical updown path controled by compter keys for player

//paddle paths for computer based on ball position? or random? depends on difficulty level