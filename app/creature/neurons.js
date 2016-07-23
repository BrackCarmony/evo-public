var neurons = [];
  neurons.push({
    inputs:0,
    name:"T",
    getVal: function(){
      this.val+=1;
    }
  })
// x
  neurons.push({
    inputs:0,
    name:"X",
    getVal: function(){
      this.val = this.x - this.creature.com.x;
    }
  })
// y
  neurons.push({
    inputs:0,
    name:"Y",
    getVal: function(){
      this.val = this.y - this.creature.com.y;
    }
  })
// const
neurons.push({
  inputs:0,
  name:"C",
  getVal: function(){
    this.val = this.val;
  }
})

// sin
neurons.push({
  inputs:1,
  name:"Sn",
  getVal: function(){
    this.val = Math.sin(this.inputs[0].val  / Math.PI);
  }
})

// cos
neurons.push({
  inputs:1,
  name:"Cs",
  getVal: function(){
    this.val = Math.cos(this.inputs[0].val  / Math.PI);
  }
})

// add
neurons.push({
  inputs:2,
  name:"A+",
  getVal: function(){
    this.val = this.inputs[0].val+this.inputs[1].val;
  }
})

// multiply
neurons.push({
  inputs:2,
  name:"M*",
  getVal: function(){
    this.val = this.inputs[0].val*this.inputs[1].val;
  }
})

// mod
neurons.push({
  inputs:2,
  name:"M%",
  getVal: function(){
    this.val = this.inputs[0].val % this.inputs[1].val;
  }
})

// divide
neurons.push({
  inputs:2,
  name:"D/",
  getVal: function(){
    this.val = this.inputs[0].val/this.inputs[1].val || 100;
  }
})

module.exports = {
  // getRandomNueron:function(this, n1, n2){
  //   var l=0;
  //   if (n1 != this){
  //     l++
  //
  //   }else{
  //     n1=n2;
  //   }if(n2!=this || n2 !=n1){
  //     l++
  //   }
  //   do {
  //     var x = Math.floor(neurons.length*Math.random());
  //   }while(neurons[x].inputs>l)
  //   return new neurons[x].constructor(this, n1, n2);
  // },
  list:neurons,
  getByType:function(type){
    for (var i=0;i<neurons.length;i++){
      if (type == neurons[i].name){
        return neurons[i];
      }
    }
  }
}
