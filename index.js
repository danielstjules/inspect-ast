var util = require('util');
var allowedKeys = require('./allowedKeys');

function compact(curr) {
  if (curr instanceof Array) {
    return curr.map(compact);
  } else if (!curr || !curr.type) {
    return curr;
  }

  var nodeName = curr.type;
  if (curr.kind) {
    nodeName = curr.kind + nodeName;
  }

  var Node = new Function(
    'return function ' + nodeName + '() { }'
  )();

  if (!allowedKeys[curr.type]) {
    return;
  }

  var node = new Node();
  allowedKeys[curr.type].forEach((k) => {
    if (k in curr) node[k] = compact(curr[k]);
  });

  return node;
}

module.exports = function(ast, opts) {
  opts = opts || {};
  if (!opts.depth) opts.depth = null;
  return util.inspect(compact(ast), opts);
}
