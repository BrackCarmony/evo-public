var NeuronHub = require('./neurons');
var neuronList = NeuronHub.list; //Todo make neuronLis
var utils = require('../utils');

function createDNA(nodes, muscles){
  var dna = {};
  dna.nodes = createNodes(nodes);
  dna.muscles = createMuscles(nodes, muscles);
  return dna;
}

function createNodes(nodesNum){

  var nodes =[];
  for (var i=0;i<nodesNum;i++){
    do{
      var type= utils.randBelow(neuronList.length);
    }while(neuronList[type].inputs>i)
    var val = 0;
    if (neuronList[type].name == "C"){
      val = Math.random()*100-50;
    }
    var inputs = utils.randListBelow(i, neuronList[type].inputs);
    nodes.push({
      r:9,
      num:i,
      x: Math.random()*20-10,
      y: Math.random()*10 + 9.1,//Don't start with nodes below ground;
      type: neuronList[type].name,
      inputs:inputs,
      val:val,
      bounce:Math.random()*1.2 + .01
    })
  }
  return nodes;
}

function createMuscles(nodesNum, musclesNum){
  var mem = {};
  var muscles = [];
  do{
    var nodes = utils.randListBelow(nodesNum,2);
    if (!mem[nodes[0]+" "+nodes[1]] && !mem[nodes[1]+" "+nodes[0]]){
      mem[nodes[0]+" "+nodes[1]] = true;
      muscles.push({
        length:Math.random()*50+10,
        strength:Math.random()*1.5+.1,
        nodes:nodes
      })
    }
  }while(musclesNum>muscles.length)
  // console.log(muscles);
  return muscles;
}

function modifyDNA(dna){
  var newDna = JSON.parse(JSON.stringify(dna));
  newDna.nodes[0].val = "Test";
  console.log(newDna, dna);


}

module.exports = {
  createDNA: createDNA,
  modifyDNA: modifyDNA
}


// console.log(createDNA(4,6));
// console.log(createDNA(5,9));
// console.log(createDNA(5,9));
// console.log(createDNA(5,9));
