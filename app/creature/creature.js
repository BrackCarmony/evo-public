const svgns = "http://www.w3.org/2000/svg";
const gravity = -.5;
const muscleStrength = 10;
const fps =30;
const min = .5;
const muscleSpeed = .25;

var NeuronHub = require('./neurons');
var CloneHub = require('./clone');
var DNAHub = require('./DNA');

function sig(x){
  return 1 / (1+Math.exp(-x));
}

function Node(creature, dna){

  this.r = dna.r;
  this.num = dna.num;
  this.x = dna.x;
  this.y = dna.y;
  this.vx =0;
  this.vy =0;
  this.bounce = dna.bounce;
  this.type = dna.type;
  this.val = dna.val;
  this.getVal = NeuronHub.getByType(this.type).getVal;
  this.inputs = []
  for (var i=0;i<dna.inputs.length;i++){
    this.inputs.push(creature.nodes[dna.inputs[i]]);
  }
  this.creature = creature;
}

Node.prototype.accelerate = function(str, dir){
  this.vx += str * dir.x;
  this.vy += str * dir.y;
}

Node.prototype.move = function(){
  this.vy += gravity;
  this.x += this.vx;
  this.y += this.vy;

if (this.y<this.r){
  while (this.y<=this.r){
    this.y -= this.vy/10;
    this.x -= this.vx/10;
  }
  this.vy = -this.vy * this.bounce;
}

  this.vy*=0.85;
  this.vx*=0.85;

  this.getVal();
}

Node.prototype.draw = function(svg){
  var nodeCircle = document.createElementNS(svgns, 'circle');
  nodeCircle.setAttribute("cx",this.x)
  nodeCircle.setAttribute("cy",this.y)
  nodeCircle.setAttribute("r",this.r);
  nodeCircle.setAttribute("fill", "white");
  nodeCircle.setAttribute("stroke", "grey");
  var text = document.createElementNS(svgns,"text");
  text.setAttribute("fill", "black");
  text.setAttribute("transform", "rotate(180," + this.x + ", " + (this.y-this.r/4)  + ")");
  text.setAttribute("x", this.x);
  text.setAttribute("y", this.y);
  text.setAttribute("font-size", "6px");
  text.setAttribute("text-anchor", "middle");
  text.textContent = this.type + "\n" + (this.val+"").slice(0,4);

  svg.appendChild(nodeCircle);
  svg.appendChild(text);

}

function Muscle(creature, dna){
  this.creature = creature;
  this.length = dna.length
  this.strength = dna.strength;
  this.scale=1;
  this.nodes=dna.nodes.map(i=>creature.nodes[i]);
}

Muscle.prototype.restart = function(){
  this.scale = 1;
}

Muscle.prototype.exert = function(){
  this.scale = this.scale*(1-muscleSpeed) + (sig(this.nodes[0].val) + .5)*muscleSpeed;
  this.targetLength = this.length*this.scale;
  this.force(this.nodes[0], this.nodes[1]);
}

Muscle.prototype.force = function(n1, n2){
  var dist = distance(n1,n2)
  var str = (this.targetLength - dist)/this.targetLength;
  str = str *Math.abs(str);
  str *= muscleStrength;
  str = Math.min(str, 10);
  str = Math.max(str, -10);
  var dir = vect(n1,n2);

  dir.x/=dist;
  dir.y/=dist;

  n1.accelerate(-str, dir);
  n2.accelerate(str, dir);
}

Muscle.prototype.draw = function(svg){
  var line = document.createElementNS(svgns, 'line');
  line.setAttribute("x1",this.nodes[0].x)
  line.setAttribute("y1",this.nodes[0].y)
  line.setAttribute("x2",this.nodes[1].x)
  line.setAttribute("y2",this.nodes[1].y)
  line.setAttribute("stroke-width",this.strength+.5);
  line.setAttribute("stroke", this.scale>1?"red":"blue");

  svg.appendChild(line);
}

function rgb(r, g, b){
  return "rgb("+r+","+g+","+b+")";
}

function distance(p1,p2){
  return Math.sqrt(Math.pow(p1.x-p2.x,2)+Math.pow(p1.y-p2.y,2));
}
function vect(p1, p2){
  return {x:p2.x - p1.x, y:p2.y - p1.y};
}

function norm(vec){
  sf = distance({x:0,y:0},vec);
  return {x:vec.x/sf, y:vec.y/sf};
}

function Creature(dna){
  var self = this;
  self.nodes = [];
  dna.nodes.forEach(nodeDna=>{
    self.nodes.push(new Node(self, nodeDna))
  });
  Creature.prototype.com.call(self);
  self.nodes.forEach(node => node.getVal())

  self.muscles = [];
  dna.muscles.forEach(muscleDna => {
    self.muscles.push(new Muscle(self, muscleDna))
  })

}

Creature.prototype.move = function(){
  Creature.prototype.com.apply(this);
  this.muscles.forEach(item => item.exert())
  this.nodes.forEach(item => item.move())
}

Creature.prototype.com =function(){
  var N = this.nodes.length;
  this.com = this.nodes.reduce((com, node) =>
    {return {x:com.x+node.x/N,
             y:com.y+node.y/N} }, {x:0,y:0});
}

Creature.prototype.draw = function(svg, center, h, w) {
  var canvas2 = center || canvas;
  h = h || 200;
  w = w || 300;
  if(this.com){
    var viewBox = this.com.x - w/2 + " ";
     viewBox += this.com.y - h/2 + " ";
     viewBox += w + " ";
     viewBox += h + " ";
    canvas2.setAttribute("viewBox", viewBox)
  }

  this.muscles.forEach(item=>item.draw(svg));
  this.nodes.forEach(item=>item.draw(svg));
}


var canvas = document.getElementById("canvas");
setupWorld();
function setupWorld(){
  var svg = document.getElementById("world");
  var ground = document.createElementNS(svgns, "rect");
  ground.setAttribute("x",-1000);
  ground.setAttribute("y",-99);
  ground.setAttribute("height",100);
  ground.setAttribute("width",2000);
  ground.setAttribute("fill", "green");
  svg.appendChild(ground);

  for (var i=-25;i<25;i++){
    var post = document.createElementNS(svgns, "rect");
    post.setAttribute("x",150*i);
    post.setAttribute("y",0);
    post.setAttribute("height",30);
    post.setAttribute("width",10);
    post.setAttribute("fill", "brown");
    svg.appendChild(post);
  }
}

function clearCreature(){
  document.getElementById("creature").innerHTML="";
}

module.exports = {
  createCreature:Creature
}
