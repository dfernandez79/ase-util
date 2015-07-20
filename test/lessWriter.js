var lessWriter = require('../lib').lessWriter;
var read = require('../lib').read;
var assert = require('assert');
var fs = require('fs');
var path = require('path');

describe('lessWriter', function () {

  it('takes a read result as input and outputs a LESS code with variable declarations', function () {
    var input = read(fs.readFileSync(path.resolve(__dirname, 'one-color.ase')));
    var result = lessWriter(input);
    assert.equal(result, '@red: #FF0000;');
  });

});
