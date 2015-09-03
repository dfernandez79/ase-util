'use strict';

var formatAsColorsObject = require('../lib').formatAsColorsObject;
var read = require('../lib').read;
var assert = require('assert');
var fs = require('fs');
var path = require('path');

describe('formatAsColorsObject', function () {

  function file(fileName) {
    return fs.readFileSync(path.resolve(__dirname, 'files/', fileName));
  }

  it('formats a read result as an object', function () {
    var result = formatAsColorsObject(read(file('one-color.ase')));
    assert.deepEqual(result, {red: '#FF0000'});
  });

  it('ignores group names', function () {
    var result = formatAsColorsObject(read(file('one-group.ase')));
    assert.deepEqual(result, {red: '#FF0000'});
  });

  it('ignores unknown entries', function () {
    var result = formatAsColorsObject([{something: true}]);
    assert.deepEqual(result, {});
  });

  it('ignores CMYK colors', function () {
    var result = formatAsColorsObject(read(file('cmyk-color.ase')));
    assert.deepEqual(result, {});
  });

  it('ignores LAB colors', function () {
    var result = formatAsColorsObject(read(file('lab-color.ase')));
    assert.deepEqual(result, {});
  });

  it('can use another format function', function () {
    var result = formatAsColorsObject(read(file('one-color.ase')), function (s) { return s.toUpperCase(); });
    assert.deepEqual(result, {RED: '#FF0000'});
  });

});
