var read = require('../lib').read;
var assert = require('assert');
var fs = require('fs');
var path = require('path');

describe('read', function () {

  it('receives a Buffer', function () {
    assert.throws(
      function () {
        read('a string');
      },
      TypeError,
      'The argument is not an instance of Buffer'
    );
  });

  it('reads a file with only one color', function () {
    var buffer = fs.readFileSync(path.resolve(__dirname, 'one-color.ase'));
    var result = read(buffer);
    assert(result.length === 1);
    assert(result[0].type === 'color');
    assert(result[0].name === 'Red');
    assert(result[0].color.model === 'RGB');
    assert(result[0].color.r === 1);
    assert(result[0].color.g === 0);
    assert(result[0].color.b === 0);
  });

  it('reads a file with multiple colors', function () {
    var buffer = fs.readFileSync(path.resolve(__dirname, 'three-colors.ase'));
    var result = read(buffer);
    assert(result.length === 3);

    assert(result[0].type === 'color');
    assert(result[0].name === 'Red');
    assert(result[0].color.model === 'RGB');
    assert(result[0].color.r === 1);
    assert(result[0].color.g === 0);
    assert(result[0].color.b === 0);

    assert(result[1].type === 'color');
    assert(result[1].name === 'Green');
    assert(result[1].color.model === 'RGB');
    assert(result[1].color.r === 0);
    assert(result[1].color.g === 1);
    assert(result[1].color.b === 0);

    assert(result[2].type === 'color');
    assert(result[2].name === 'Blue');
    assert(result[2].color.model === 'RGB');
    assert(result[2].color.r === 0);
    assert(result[2].color.g === 0);
    assert(result[2].color.b === 1);
  });

  it('reads a file with a group', function () {
    var buffer = fs.readFileSync(path.resolve(__dirname, 'one-group.ase'));
    var result = read(buffer);

    assert(result.length === 1);

    assert(result[0].type === 'group');
    assert(result[0].name === 'A Group');
    assert(result[0].entries.length === 1);
    assert(result[0].entries[0].type === 'color');
    assert(result[0].entries[0].name === 'Red');
    assert(result[0].entries[0].color.model === 'RGB');
    assert(result[0].entries[0].color.r === 1);
    assert(result[0].entries[0].color.g === 0);
    assert(result[0].entries[0].color.b === 0);
  });

  it('supports CMYK colors', function () {
    var buffer = fs.readFileSync(path.resolve(__dirname, 'cmyk-color.ase'));
    var result = read(buffer);
    assert(result.length === 1);
    assert(result[0].type === 'color');
    assert(result[0].name === 'Cyan');
    assert(result[0].color.model === 'CMYK');
    assert(result[0].color.c === 1);
    assert(result[0].color.m === 0);
    assert(result[0].color.y === 0);
    assert(result[0].color.k === 0);
  });

  it('supports Lab colors', function () {
    var buffer = fs.readFileSync(path.resolve(__dirname, 'lab-color.ase'));
    var result = read(buffer);
    assert(result.length === 1);
    assert(result[0].type === 'color');
    assert(result[0].name === 'Test');
    assert(result[0].color.model === 'LAB');
    assert(result[0].color.lightness === 1);
    assert(result[0].color.a === -128);
    assert(result[0].color.b === -128);
  });

  it('supports Gray colors', function () {
    var buffer = fs.readFileSync(path.resolve(__dirname, 'gray-color.ase'));
    var result = read(buffer);
    assert(result.length === 1);
    assert(result[0].type === 'color');
    assert(result[0].name === 'Gray');
    assert(result[0].color.model === 'Gray');
    assert(result[0].color.gray === 0.5);
  });

  it('reads the color type flag', function () {
    var buffer = fs.readFileSync(path.resolve(__dirname, 'one-color.ase'));
    var result = read(buffer);
    assert(result.length === 1);
    assert(result[0].color.type === 'normal');

    buffer = fs.readFileSync(path.resolve(__dirname, 'spot-color.ase'));
    result = read(buffer);
    assert(result.length === 1);
    assert(result[0].color.type === 'spot');

    buffer = fs.readFileSync(path.resolve(__dirname, 'global-color.ase'));
    result = read(buffer);
    assert(result.length === 1);
    assert(result[0].color.type === 'global');
  });

});
