var Creature = require('./creature/creature');
var DNA = require('./creature/DNA');

const fps = 30;

var creatures = [];
for (var i=0;i<1;i++){
  creatures.push(new Creature.createCreature(DNA.createDNA(3,3)));
}
svg = document.getElementById("creature")


setInterval(function(){
  svg.innerHTML = "";
  creatures.forEach(c =>{
    c.move();
    c.draw(svg);
  })
}, 1000/fps)


module.exports = function(){

}
