var assert = require('assert');
var exec = require('child_process').exec;
var path = require('path');

describe('asedump', function () {

  it('shows the usage if no file is specified', function (done) {
    exec('./asedump', {cwd: path.resolve(__dirname, '../bin')}, function (err, stdout, stderr) {
      assert(err);
      assert((/Usage: asedump/gm).test(stderr.toString()));
      done();
    });
  });

  it('dumps the ASE file as JSON', function (done) {
    exec('./asedump ../test/files/one-color.ase', {cwd: path.resolve(__dirname, '../bin')},
      function (err, stdout, stderr) {
        assert(!err);
        assert.equal(
          stdout.toString(),
          '[{"type":"color","name":"Red","color":{"model":"RGB","r":1,"g":0,"b":0,"hex":"FF0000","type":"normal"}}]\n'
        );
        done();
      });
  });

  it('acceps the --pretty option', function (done) {
    exec('./asedump --pretty ../test/files/one-color.ase', {cwd: path.resolve(__dirname, '../bin')},
      function (err, stdout, stderr) {
        assert(!err);
        assert.equal(
          stdout.toString(),
          '[\n  {\n    "type": "color",\n    "name": "Red",\n    "color": {\n      "model": "RGB",\n' +
          '      "r": 1,\n      "g": 0,\n      "b": 0,\n      "hex": "FF0000",\n      "type": "normal"' +
          '\n    }\n  }\n]\n'
        );
        done();
      }
    );
  });

});
