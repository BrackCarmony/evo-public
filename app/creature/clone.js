

function clone(crt){
  var cln = Object.assign(new crt.constructor, crt.initConditions);
  cln.initConditions = Object.assign({}, crt.initConditions);
  return cln;
}

module.exports = {
  clone:clone
}
