var util = require('util');

// Whitelisted node keys to be kept
var whitelisted = ['id', 'params', 'declaration', 'body',
  'argument', 'left', 'operator', 'right', 'name'];

function compact(curr) {
  if (curr instanceof Array) {
    return curr.map(compact);
  } else if (!curr.type) {
    return curr;
  }

  var Node = new Function(
    'return function ' + curr.type + '() { }'
  )();

  var node = new Node();
  whitelisted.forEach((k) => {
    if (k in curr) node[k] = compact(curr[k]);
  });

  return node;
}

module.exports = function(ast, opts) {
  opts = opts || {};
  if (!opts.depth) opts.depth = null;
  return util.inspect(compact(ast), opts);
}
