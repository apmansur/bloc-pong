    var canvas = document.getElementById("pong-table");
    var context = canvas.getContext('2d');
          context.beginPath();
          context.rect(0, 50, 25, 100);
          context.fillStyle = 'black';
          context.fill();
          context.lineWidth = 1;
          context.strokeStyle = 'black';
          context.stroke();
                  
          context.beginPath();
          context.rect(950, 50 , 25, 100);
          context.fillStyle = 'black';
          context.fill();
          context.lineWidth = 1;
          context.strokeStyle = 'black';
          context.stroke();
          
          context.beginPath();
          context.moveTo(500,10);
          context.lineTo(500,450);
          context.strokeStyle = "black";
          context.stroke();
                  
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