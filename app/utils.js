module.exports = {
  randBelow:function(i){
    return Math.floor(Math.random()*i);
  },
  randListBelow:function(m, n){
    var result = [];
    var pos = [];
    for (var i=0;i<m;i++){
      pos.push(i);
    }
    for (var i=0;i<n;i++){
      result.push(pos.splice(this.randBelow(pos.length),1)[0])
    }
    return result;
  }
}


module.exports.randListBelow(3,2);
