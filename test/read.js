var read = require('../lib').read;
var assert = require('assert');
var fs = require('fs');
var path = require('path');

describe('read', function () {

  function file(fileName) {
    return fs.readFileSync(path.resolve(__dirname, 'files/', fileName));
  }

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
    var result = read(file('one-color.ase'));
    assert(result.length === 1);
    assert(result[0].type === 'color');
    assert(result[0].name === 'Red');
    assert(result[0].color.model === 'RGB');
    assert(result[0].color.r === 1);
    assert(result[0].color.g === 0);
    assert(result[0].color.b === 0);
  });

  it('reads a file with multiple colors', function () {
    var result = read(file('three-colors.ase'));
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
    var result = read(file('one-group.ase'));
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
    var result = read(file('cmyk-color.ase'));
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
    var result = read(file('lab-color.ase'));
    assert(result.length === 1);
    assert(result[0].type === 'color');
    assert(result[0].name === 'Test');
    assert(result[0].color.model === 'LAB');
    assert(result[0].color.lightness === 1);
    assert(result[0].color.a === -128);
    assert(result[0].color.b === -128);
  });

  it('supports Gray colors', function () {
    var result = read(file('gray-color.ase'));
    assert(result.length === 1);
    assert(result[0].type === 'color');
    assert(result[0].name === 'Gray');
    assert(result[0].color.model === 'Gray');
    assert(result[0].color.gray === 0.5);
  });

  it('reads the color type flag', function () {
    var result = read(file('one-color.ase'));
    assert(result.length === 1);
    assert(result[0].color.type === 'normal');

    result = read(file('spot-color.ase'));
    assert(result.length === 1);
    assert(result[0].color.type === 'spot');

    result = read(file('global-color.ase'));
    assert(result.length === 1);
    assert(result[0].color.type === 'global');
  });

  it('adds the hex value for RGB and Gray colors', function () {
    var result = read(file('hex-test.ase'));
    result.forEach(function (item) {
      if (item.color.model === 'RGB' || item.color.model === 'Gray') {
        assert.equal(item.color.hex, item.name);
      } else {
        assert(!item.color.hex);
      }
    });
  });

});
