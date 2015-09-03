'use strict';

var assert = require('assert');
var exec = require('child_process').exec;
var path = require('path');

function asedump(argsStr, callback) {
  exec('./asedump ' + argsStr, {cwd: path.resolve(__dirname, '../bin')}, callback);
}

function assertStdOut(str, done) {
  return function (err, stdout) {
    assert(!err);
    assert.equal(stdout.toString(), str);
    done();
  };
}

describe('asedump', function () {

  it('shows the usage if no file is specified', function (done) {
    asedump('', function (err, stdout, stderr) {
      assert(err);
      assert((/Usage: asedump/gm).test(stderr.toString()));
      done();
    });
  });

  it('dumps the ASE file as JSON', function (done) {
    asedump(
      '../test/files/one-color.ase',
      assertStdOut(
        '[{"type":"color","name":"Red","color":{"model":"RGB","r":1,"g":0,"b":0,"hex":"FF0000","type":"normal"}}]',
        done)
    );
  });

  it('acceps the --pretty option', function (done) {
    asedump(
      '--pretty ../test/files/one-color.ase',
      assertStdOut(
        '[\n  {\n    "type": "color",\n    "name": "Red",\n    "color": {\n      "model": "RGB",\n' +
        '      "r": 1,\n      "g": 0,\n      "b": 0,\n      "hex": "FF0000",\n      "type": "normal"' +
        '\n    }\n  }\n]', done)
    );
  });

  it('dumps the ASE file as LESS', function (done) {
    asedump(
      '--format less ../test/files/one-color.ase',
      assertStdOut('@red: #FF0000;', done)
    );
  });

  it('dumps the ASE file colors as JSON', function (done) {
    asedump(
      '--format json-colors ../test/files/one-color.ase',
      assertStdOut('{"red":"#FF0000"}', done)
    );
  });

  it('can dump JSON output using module.exports', function (done) {
    asedump(
      '--export --format json-colors ../test/files/one-color.ase',
      assertStdOut('module.exports = {"red":"#FF0000"};', done)
    );
  });

});
