# inspect-ast

A better way to render a compact JS abstract syntax tree for inspection.
Works with ESTree spec-compliant ASTs, though the returned output is not
compliant.

[![Build Status](https://travis-ci.org/danielstjules/inspect-ast.svg?branch=master)](https://travis-ci.org/danielstjules/inspect-ast)

## Overview

Imagine you parse the following code to build an AST using something like acorn:

``` javascript
export function sum(a, b) {
  return a + b;
}
```

If you want to inspect its full length, it's quite verbose:

``` javascript
> var util = require('util');
> console.log(util.inspect(ast, {depth: null}));

Node {
  type: 'Program',
  start: 0,
  end: 46,
  body:
   [ Node {
       type: 'ExportNamedDeclaration',
       start: 0,
       end: 45,
       declaration:
        Node {
          type: 'FunctionDeclaration',
          start: 7,
          end: 45,
          id: Node { type: 'Identifier', start: 16, end: 19, name: 'sum' },
          params:
           [ Node { type: 'Identifier', start: 20, end: 21, name: 'a' },
             Node { type: 'Identifier', start: 23, end: 24, name: 'b' } ],
          generator: false,
          expression: false,
          body:
           Node {
             type: 'BlockStatement',
             start: 26,
             end: 45,
             body:
              [ Node {
                  type: 'ReturnStatement',
                  start: 30,
                  end: 43,
                  argument:
                   Node {
                     type: 'BinaryExpression',
                     start: 37,
                     end: 42,
                     left: Node { type: 'Identifier', start: 37, end: 38, name: 'a' },
                     operator: '+',
                     right: Node { type: 'Identifier', start: 41, end: 42, name: 'b' } } } ] } },
       specifiers: [],
       source: null } ],
  sourceType: 'script' }
```

With inspect-ast, it's a little easier to read:

``` javascript
> var inspect = require('inspect-ast');
> console.log(inspect(ast));

Program {
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
                     right: Identifier { name: 'b' } } } ] } } } ] }
```
