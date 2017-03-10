var acorn   = require('acorn');
var inspect = require('./');
var assert  = require('assert');

describe('inspect-ast', function() {
  it('compacts the examples AST', function() {
    var src = `export function sum(a, b) {
      return a + b;
    }`;

    var ast = acorn.parse(src, {
      ecmaVersion: 6,
      sourceType: 'module'
    });

    // Inspect includes trailing whitespace
    var res = inspect(ast).split('\n').map((line) => {
      return line.trimRight();
    }).join('\n');

    assert.equal(`Program {
  body:
   [ ExportNamedDeclaration {
       declaration:
        FunctionDeclaration {
          id: Identifier { name: 'sum' },
          params: [ Identifier { name: 'a' }, Identifier { name: 'b' } ],
          body:
           BlockStatement {
             body:
              [ ReturnStatement {
                  argument:
                   BinaryExpression {
                     left: Identifier { name: 'a' },
                     operator: '+',
                     right: Identifier { name: 'b' } } } ] } },
       specifiers: [],
       source: null } ] }`
    , res);
  });
});
