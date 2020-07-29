var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies;

var engine;
var world;
var circles = [];
var boundaries = [];
var ground;
var logoImg;

function preload() {
  logoImg = loadImage("./assets/nike.png");
  rectImg = loadImage("./assets/nike-rect.jpg");
}

function setup() {
  createCanvas(400, 600);
  engine = Engine.create();
  world = engine.world;

  boundaries.push(new Boundary(150, 100, width * 0.6, 20, 0.4));
  boundaries.push(new Boundary(250, 250, width * 0.6, 20, -0.35));
  boundaries.push(new Boundary(150, 400, width * 0.6, 20, 0.3));
  boundaries.push(new Boundary(200, 600, 400, 10, 0));
  boundaries.push(new Boundary(0, 600, 10, 200, 0));
  boundaries.push(new Boundary(400, 600, 10, 200, 0));
}

function mouseClicked() {
  if (mouseX > 120 && mouseX < 280 && mouseY < 50) {
    circles.push(new Circle(mouseX, mouseY, 20));
  }
  console.log(mouseX, mouseY);
}

function draw() {
  background(51);

  push();
  fill(1);
  image(rectImg, 120, 0, 160, 50);
  pop();

  Engine.update(engine);
  for (var i = 0; i < circles.length; i++) {
    circles[i].show();
    if (circles[i].isOffScreen()) {
      circles[i].removeFromWorld();
      circles.splice(i, 1);
      i--;
    }
  }
  for (var i = 0; i < boundaries.length; i++) {
    boundaries[i].show();
  }
}

function Boundary(x, y, w, h, a) {
  var options = {
    friction: 0,
    restitution: 0.95,
    angle: a,
    isStatic: true,
  };
  this.body = Bodies.rectangle(x, y, w, h, options);
  this.w = w;
  this.h = h;
  World.add(world, this.body);

  this.show = function () {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    strokeWeight(1);
    noStroke();
    fill(255, 255, 0);
    rect(0, 0, this.w, this.h);
    pop();
  };
}

function Circle(x, y, r) {
  var options = {
    friction: 0,
    restitution: 0.95,
  };
  this.body = Bodies.circle(x, y, r, options);
  this.r = r;
  World.add(world, this.body);

  this.isOffScreen = function () {
    var pos = this.body.position;
    return pos.y > height + 100;
  };

  this.removeFromWorld = function () {
    World.remove(world, this.body);
  };

  this.show = function () {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(logoImg, 0, 0, this.r * 2, this.r * 2);
    pop();
  };
}
