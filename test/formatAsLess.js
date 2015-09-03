'use strict';

var formatAsLess = require('../lib').formatAsLess;
var read = require('../lib').read;
var assert = require('assert');
var fs = require('fs');
var path = require('path');

describe('formatAsLess', function () {

  function file(fileName) {
    return fs.readFileSync(path.resolve(__dirname, 'files/', fileName));
  }

  it('formats a read result as LESS code', function () {
    var result = formatAsLess(read(file('one-color.ase')));
    assert.equal(result, '@red: #FF0000;');
  });

  it('formats group names as comments', function () {
    var result = formatAsLess(read(file('one-group.ase')));
    assert.equal(result, '// A Group\n@red: #FF0000;');
  });

  it('ignores unknown entries', function () {
    var result = formatAsLess([{something: true}]);
    assert.equal(result, '');
  });

  it('ignores CMYK colors', function () {
    var result = formatAsLess(read(file('cmyk-color.ase')));
    assert.deepEqual(result, '');
  });

  it('ignores LAB colors', function () {
    var result = formatAsLess(read(file('lab-color.ase')));
    assert.deepEqual(result, '');
  });

});
