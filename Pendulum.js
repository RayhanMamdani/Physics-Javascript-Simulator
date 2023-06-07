/**
 * I would like to honour the original people of this land, to say thank you for taking such good care of our mother the earth, so that we could all have a place to call home today. Thank you to the Huron Peoples also known as the Wendat Nation, the Haudenosaunee also known as the Five Nation Confederacy, the Three Fire Confederacy of the Anishnaabe, which includes The Mississauga of the New Credit. These are the original peoples of this land and we as settlers and newcomers have a responsibility to honour these people by acknowledging them and taking good care of this land and each other
 */
let c = document.querySelector('#myCanvas');
let ctx = c.getContext("2d")
const cWidth = c.width;
const cHeight = c.height;
const pi = Math.PI;

let lineHeight = 100; //if statement checking if they inputed something in form for line value. else use default value
let ballRadius = 20;
let ballX = cWidth / 2;
let ballY = lineHeight + ballRadius;
let ballColour = '#000069';
let length = lineHeight + ballRadius;
let initAngle = pi / 4 //45 degrees
let initVelocity = pi / 720; //**ANGLE!!! radians/sec */
let g = 9.81; //gravity
let d = pi / 600; //dampening
let time = 0.1;
let newBallX;
let newBallY;


function draw() {
  let gravity = ballRadius * g / 15;
    //calculate acceleration in the direction of velocity using g*sin(theta)
    let acceleration = (-gravity) * Math.sin(initAngle);
    //calculate angular acceleration through acceleration of the ball / length
    let angAcceleration = acceleration / length;

    //slow down bc dampening (scaled using initVelocity)
    initVelocity -= (d / 300) * initVelocity;

    //change velocity (vf = vi + a*t)
    initVelocity += angAcceleration * time;

    //change angle w/ new velocity
    initAngle += initVelocity * time;

    newBallX = cWidth / 2 + length * Math.sin(initAngle);
    newBallY = length * Math.cos(initAngle);


    //draw the rod of the pendulum using components
    ctx.clearRect(0, 0, cWidth, cHeight);
    ctx.beginPath();
    ctx.moveTo(cWidth / 2, 0);
    ctx.lineTo(newBallX, newBallY);
    ctx.stroke();

    //draw the ball of the pendulum
    ctx.beginPath();
    ctx.arc(newBallX, newBallY, ballRadius, 0, 2 * pi);
    ctx.fillStyle = ballColour;
    ctx.fill();

    //keep updating
  requestAnimationFrame(draw);
}

//update position using setInterval for time step
let graphTime = 0;
function updateChart(){
  graph.data.labels.push(Math.round(graphTime));
  chartConfig.data.datasets[0].data.push({x: graphTime, y:newBallY})
  graphTime+=0.1;  
  graph.update()
}

//data for the charf (from ChartJS)
let chartData = {datasets: [ {label: 'Y Position - Time Graph', data: [{x: 0, y: 130}]}]}
const chartConfig = {
  type: 'line',
  data: chartData,
  options: {
    animations: {
        tension: {
          duration: 0,
          easing: 'linear',
          from: 0,
          to: 0,
          loop: true
        }
      },
    scales: {
        y: {
            min: lineHeight/2,
            max: ballY + 10,
            title: {
              display: true,
              text: 'Y Position (px)'
            }
        },
        x: {
        beginAtZero: true,
          title: {
            display: true,
            text: 'Time (s)',
          },
          ticks: {
            stepSize: 1
          },
      },
    },

}
};

let graph = new Chart(document.querySelector("#ourCanvas").getContext("2d"), chartConfig)

setInterval(function() {updateChart();}, 100); 


//start simulation using user inputs
function updateValues() {
  
    if(!document.querySelector('#mass').value)
        ballRadius = 20;
    else
        ballRadius = document.querySelector('#mass').value;


    if(!document.querySelector('#grav').value)
        g = 9.81;
    else
        g = document.querySelector('#grav').value;

    if(!document.querySelector('#damp').value)
        d = 0.3;
    else
        d = document.querySelector('#damp').value;      
    
        ballX = cWidth / 2;
        ballY = lineHeight + ballRadius;
        initAngle = pi / 4;
        initVelocity = pi / 720;
      
        // Clear the previous chart data
        graph.data.labels = [];
        chartConfig.data.datasets[0].data = [{ x: 0, y: 130 }];
        graphTime = 0;
      
    draw();
}



