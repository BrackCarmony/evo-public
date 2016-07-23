var NeuronHub = require('./neurons');
var neuronList = NeuronHub.list; //Todo make neuronLis
var utils = require('../utils');

function createDNA(nodes, muscles){
  var dna = {};
  dna.nodes = createNodes(nodes);
  dna.muscles = createMuscles(nodes, muscles);
  console.log(dna);
  return dna;
}

function createNode(i){
  do{
    var type= utils.randBelow(neuronList.length);
  }while(neuronList[type].inputs>i)
  var val = 0;
  if (neuronList[type].name == "C"){
    val = Math.random()*100-50;
  }
  var inputs = utils.randListBelow(i, neuronList[type].inputs);
  return {
    r:9,
    num:i,
    x: Math.random()*20-10,
    y: Math.random()*10 + 9.1,//Don't start with nodes below ground;
    type: neuronList[type].name,
    inputs:inputs,
    val:val,
    bounce:Math.random()*1.2 + .01
  }
}

function createNodes(nodesNum){

  var nodes =[];
  for (var i=0;i<nodesNum;i++){
    nodes.push(createNode(i))
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
  // newDna.nodes.forEach(simpleNodeMutation);
  // newDna.nodes = newDna.nodes.map(complexNodeMutation);

  // console.log("before delete node", JSON.stringify(dna));

  // dna = deleteNode(dna);

  // console.log("deleted Node",JSON.stringify(dna));
  // makeNode(dna);
  // deleteMuscle(dna);
  // makeMuscle(dna);
  return newDna;
}

function deleteNode(dna){
  var i = utils.randBelow(dna.nodes.length-1)+1;
  dna.muscles = dna.muscles.reduce((muscles,muscle) =>{
    if (muscle.nodes[0]!=i && muscle.nodes[1]!=i){
      if (muscle.nodes[0]>i){
        muscle.nodes[0] -=1;
      }
      if (muscle.nodes[1]>i){
        muscle.nodes[1] -=1;
      }
      muscles.push(muscle);
    }
    return muscles;
  }, [])
  dna.nodes.splice(i,1);
  dna.nodes.forEach(node=>{
    for(var j=i;j<node.inputs;j++){
      if(node.inputs[j]>=i){
        node.inputs[j]-=1;
      }
    }
  })
  return dna;
}

function complexNodeMutation(node, i){
  if (Math.random()<.1){
    return createNode(i);
  }
  return node;
}

function simpleNodeMutation(node){
  if (Math.random()>.5){
    node.val += Math.random()-.5;
  }
  if (Math.random()>.5){
    node.x += Math.random()-.5;
  }
  if (Math.random()>.5){
    node.y += Math.random()-.5;
  }
}

module.exports = {
  createDNA: createDNA,
  modifyDNA: modifyDNA
}


// console.log(createDNA(4,6));
// console.log(createDNA(5,9));
// console.log(createDNA(5,9));
// console.log(createDNA(5,9));
