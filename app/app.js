var Creature = require('./creature/creature');
var DNA = require('./creature/DNA');

const svgns = "http://www.w3.org/2000/svg";
const fps = 30;

var currentCreature;
var creatures = [];
var testLength = 3000;
var running;
for (var i=0;i<100;i++){
  var creature = {
    dna:DNA.createDNA(8,20)
  }
  creature.creature = new Creature.createCreature(creature.dna);
  creatures.push(creature);
}

function runSimulation(creature){

  var newCreature = {dna:DNA.modifyDNA(creature.dna)}
  newCreature.creature = new Creature.createCreature(newCreature.dna);
  determinFitness(newCreature);

  if (running){
    clearInterval(running);
  }
  console.log(creature);
  currentCreature = creature;
  creature.creature = new Creature.createCreature(creature.dna)
  running = setInterval(function(){
    creature.creature.move();
    svg.innerHTML = ""
    creature.creature.draw(svg);
  }, 1000/fps);
}

function drawCard(creature){
  var card = document.createElementNS(svgns, "svg");

  card.setAttribute("height", "50px")
  card.setAttribute("width", "100px")

  card.addEventListener("click", runSimulation.bind(null, creature));

  creature.creature.draw(card, card, 100, 200);

  document.getElementById("cards").appendChild(card);
}

svg = document.getElementById("creature")
function determinFitness(c){
  for (var i=0;i<testLength;i++){
      c.creature.move();
    if (i==100){
        drawCard(c);
    }
  }
}

creatures.forEach(determinFitness);


creatures.forEach(c => {
  c.fitness = Math.abs(c.creature.com.x)
  console.log(c.fitness);
});

creatures.sort(function(a,b){
  return b.fitness - a.fitness;
})

console.log(creatures[0]);

runSimulation(creatures[0]);







module.exports = function(){

}
