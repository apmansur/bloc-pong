var canvas = document.getElementbyId("pong-table");
var context = canvas.getContext('2d');

//ball constructor
function Ball(){
          var x = canvas.width / 2;
          var y = canvas.height / 2;
          var radius = 15;
          var startAngle = 1 * Math.PI;
          var endAngle = 0.9999999 * Math.PI;
          var counterClockwise = false;
    
          context.beginPath();
          context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
          context.lineWidth = 1;
    
          // line color
          context.strokeStyle = 'black';
          context.stroke();
    
}
//ball create method
 var createBall = new Ball() {
          
 }

//ball path generation based on where in the paddle it hit
//what happens when ball does not hit paddle