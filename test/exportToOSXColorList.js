'use strict';

var exportToOSXColorList = require('../lib').exportToOSXColorList;
var read = require('../lib').read;
var assert = require('assert');
var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
var onOSXIt = process.platform === 'darwin' ? it : it.skip;

describe('exportToOSXColorList', function () {
  var testCLR = path.resolve(__dirname, 'test-out.clr');

  function file(fileName) {
    return fs.readFileSync(path.resolve(__dirname, 'files/', fileName));
  }

  function clrDump(fileName, cb) {
    var child = spawn('osascript', ['-l', 'JavaScript', '-']);
    var result = new Buffer([]);
    child.stdin.write("ObjC.import('Cocoa');\n");
    child.stdin.write("var list = $.NSColorList.alloc.initWithNameFromFile('', './test/test-out.clr');\n");
    child.stdin.write('JSON.stringify(ObjC.deepUnwrap(list.allKeys).map(function (e) {\n');
    child.stdin.write('  var color = list.colorWithKey(e);\n');
    child.stdin.write('  return {name: e, r: color.redComponent, g: color.greenComponent, b: color.blueComponent};\n');
    child.stdin.write('}))\n');
    child.stdin.end();
    child.stdout.on('data', function (buff) {
      result = Buffer.concat([result, buff]);
    });
    child.on('exit', function () {
      cb(JSON.parse(result.toString()));
    });
  }

  afterEach(function () {
    fs.unlinkSync(testCLR);
  });

  onOSXIt('saves a CLR file from ASE file', function (done) {
    exportToOSXColorList(
        read(file('one-color.ase')),
        testCLR,
        'Test',
        function (err) {
          assert(!err);
          clrDump(testCLR, function (out) {
            assert.equal(out.length, 1);
            assert.deepEqual(out[0], {name: 'Red', r: 1, g: 0, b: 0});
            done();
          });
        });
  });

  onOSXIt('ignores group names', function (done) {
    exportToOSXColorList(
        read(file('one-group.ase')),
        testCLR,
        'Test',
        function (err) {
          assert(!err);
          clrDump(testCLR, function (out) {
            assert.equal(out.length, 1);
            assert.deepEqual(out[0], {name: 'Red', r: 1, g: 0, b: 0});
            done();
          });
        });
  });

  onOSXIt('ignores unknown entries', function (done) {
    exportToOSXColorList(
        [{something: true}],
        testCLR,
        'Test',
        function (err) {
          assert(!err);
          clrDump(testCLR, function (out) {
            assert.equal(out.length, 0);
            done();
          });
        });
  });

  onOSXIt('supports CMYK colors');

  onOSXIt('can assign a name to the list');

  onOSXIt('ignores LAB colors', function (done) {
    exportToOSXColorList(
        read(file('lab-color.ase')),
        testCLR,
        'Test',
        function (err) {
          assert(!err);
          clrDump(testCLR, function (out) {
            assert.equal(out.length, 0);
            done();
          });
        });
  });

});
