function Circle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.isSelected = false;
}

// 保存所有创建的圆.
var circles = [];

var canvas;
var context;

window.onload = function() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  canvas.onmousedown = canvasClick;
  canvas.onmouseup = stopDragging;//鼠标松开，停止拖动
  canvas.onmouseout = stopDragging;
  canvas.onmousemove = dragCircle;
};

function addRandomCircle() {
  // 产生随机的坐标和半径.
  var radius = randomFromTo(10, 60);
  var x = randomFromTo(0, canvas.width);
  var y = randomFromTo(0, canvas.height);

  // 随机的颜色.
  var colors = ["green", "blue", "red", "yellow", "magenta", "orange", "brown", "purple", "pink"];
  var color = colors[randomFromTo(0, 8)];

  // 创建圆.
  var circle = new Circle(x, y, radius, color);

  // 保存到数组.
  circles.push(circle);

  // 重绘canvas.
  drawCircles();
}

function clearCanvas() {
  circles = [];
  // Update the display.
  drawCircles();
}

function drawCircles() {
  // Clear the canvas.
  context.clearRect(0, 0, canvas.width, canvas.height);

  for(var i=0; i<circles.length; i++) {
    var circle = circles[i];
    context.globalAlpha = 0.85;
    context.beginPath();
    context.arc(circle.x, circle.y, circle.radius, 0, Math.PI*2);
    context.fillStyle = circle.color;
    context.strokeStyle = "black";

    if (circle.isSelected) {
      context.lineWidth = 5;
    }
    else {
      context.lineWidth = 1;
    }
    context.fill();
    context.stroke(); 
  }
}

var previousSelectedCircle;//记录前一个选中的圆

function canvasClick(e) {
  //获取鼠标在canvas中点击的位置.
  var clickX = e.pageX - canvas.offsetLeft;
  var clickY = e.pageY - canvas.offsetTop;

  // 判断点击了哪个圆.
  for(var i=circles.length-1; i>=0; i--) {
    var circle = circles[i];

    var distanceFromCenter = Math.sqrt(Math.pow(circle.x - clickX, 2) + Math.pow(circle.y - clickY, 2))
    if (distanceFromCenter <= circle.radius) {
      if (previousSelectedCircle != null) previousSelectedCircle.isSelected = false;
      previousSelectedCircle = circle;//记录选中的圆

      circle.isSelected = true;

      // 可以被拖动
      isDragging = true;
      drawCircles();
      return;
    }
  }
}



var isDragging = false;

function stopDragging() {
  isDragging = false;
}

function dragCircle(e) {
   // 鼠标新的位置.
      var x = e.pageX - canvas.offsetLeft;
      var y = e.pageY - canvas.offsetTop;
  if (isDragging == true) {//处于拖动状态
    if (previousSelectedCircle != null) {//被选中的圆
     

      // Move the circle to that position.
      previousSelectedCircle.x = x;
      previousSelectedCircle.y = y;

      // 更新canvas.
      drawCircles();
    }
  }else{
     // 判断鼠标在哪个圆内.
     for(var i=circles.length-1; i>=0; i--) {
       var circle = circles[i];
       var distanceFromCenter = Math.sqrt(Math.pow(circle.x - x, 2) + Math.pow(circle.y - y, 2))
      if (distanceFromCenter <= circle.radius) {
         circle.isSelected = true;
         drawCircles();
         return;
      }else{
         circle.isSelected=false;
       }
       drawCircles();

     }
   }
}


function randomFromTo(from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}
