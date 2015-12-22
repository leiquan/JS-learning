function Circle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.isSelected = false;
}

// �������д�����Բ.
var circles = [];

var canvas;
var context;

window.onload = function() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  canvas.onmousedown = canvasClick;
  canvas.onmouseup = stopDragging;//����ɿ���ֹͣ�϶�
  canvas.onmouseout = stopDragging;
  canvas.onmousemove = dragCircle;
};

function addRandomCircle() {
  // �������������Ͱ뾶.
  var radius = randomFromTo(10, 60);
  var x = randomFromTo(0, canvas.width);
  var y = randomFromTo(0, canvas.height);

  // �������ɫ.
  var colors = ["green", "blue", "red", "yellow", "magenta", "orange", "brown", "purple", "pink"];
  var color = colors[randomFromTo(0, 8)];

  // ����Բ.
  var circle = new Circle(x, y, radius, color);

  // ���浽����.
  circles.push(circle);

  // �ػ�canvas.
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

var previousSelectedCircle;//��¼ǰһ��ѡ�е�Բ

function canvasClick(e) {
  //��ȡ�����canvas�е����λ��.
  var clickX = e.pageX - canvas.offsetLeft;
  var clickY = e.pageY - canvas.offsetTop;

  // �жϵ�����ĸ�Բ.
  for(var i=circles.length-1; i>=0; i--) {
    var circle = circles[i];

    var distanceFromCenter = Math.sqrt(Math.pow(circle.x - clickX, 2) + Math.pow(circle.y - clickY, 2))
    if (distanceFromCenter <= circle.radius) {
      if (previousSelectedCircle != null) previousSelectedCircle.isSelected = false;
      previousSelectedCircle = circle;//��¼ѡ�е�Բ

      circle.isSelected = true;

      // ���Ա��϶�
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
   // ����µ�λ��.
      var x = e.pageX - canvas.offsetLeft;
      var y = e.pageY - canvas.offsetTop;
  if (isDragging == true) {//�����϶�״̬
    if (previousSelectedCircle != null) {//��ѡ�е�Բ
     

      // Move the circle to that position.
      previousSelectedCircle.x = x;
      previousSelectedCircle.y = y;

      // ����canvas.
      drawCircles();
    }
  }else{
     // �ж�������ĸ�Բ��.
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
