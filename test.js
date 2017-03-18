var acorn   = require('acorn');
var babylon = require('babylon');
var inspect = require('./');
var assert  = require('assert');

describe('inspect-ast', function() {
  it('works with ESTree ASTs', function() {
    var src = `export function sum(a, b) {
      return a + b;
    }`;

    var ast = acorn.parse(src, {
      ecmaVersion: 6,
      sourceType: 'module'
    });

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

  it('works with Babel ASTs', function() {
    var src = `class Example extends Array {
      constructor(...args) {
        super(...args);
      }
    }`;

    var ast = babylon.parse(src, {
      sourceType: 'module',
      plugins: ['jsx', 'flow']
    });

    var res = inspect(ast).split('\n').map((line) => {
      return line.trimRight();
    }).join('\n');

    assert.equal(`File {
  program:
   Program {
     body:
      [ ClassDeclaration {
          id: Identifier { name: 'Example' },
          superClass: Identifier { name: 'Array' },
          body:
           ClassBody {
             body:
              [ ClassMethod {
                  key: Identifier { name: 'constructor' },
                  body:
                   BlockStatement {
                     body:
                      [ ExpressionStatement {
                          expression:
                           CallExpression {
                             callee: Super {},
                             arguments: [ SpreadElement { argument: Identifier { name: 'args' } } ] } } ] } } ] } } ] } }`
      , res);
  });
});
