'use strict';

var spawn = require('child_process').spawn;

function writeScript(aseDump, outputPath, listName, out) {
  function writeColors(entry) {
    if (entry.type === 'color' && entry.color.model === 'RGB') {
      out.write('list.setColorForKey($.NSColor.colorWithDeviceRedGreenBlueAlpha(' +
        entry.color.r + ',' + entry.color.g + ',' + entry.color.b + ",1), '" + entry.name + "');\n");
    } else if (entry.type === 'group') {
      entry.entries.forEach(writeColors);
    }
  }

  out.write("ObjC.import('Cocoa');\n");
  out.write("var list = $.NSColorList.alloc.initWithName('" + listName + "');\n");
  aseDump.forEach(writeColors);
  out.write("list.writeToFile('" + outputPath + "')\n");
  out.end();
}

module.exports = function (aseDump, outputPath, listName, callback) {
  var childProcess = spawn('osascript', ['-l', 'JavaScript', '-']);

  var once = function () {
    callback.apply(null, arguments);
    once = function () {};
  };

  var errBuff = new Buffer([]);
  childProcess.stderr.on('data', function (buff) {
    errBuff = Buffer.concat([errBuff, buff]);
  });

  childProcess.on('error', once);
  childProcess.on('exit', function (code, signal) {
    if (code !== 0 || signal) {
      once({code: code, signal: signal, message: errBuff.toString()});
    } else {
      once();
    }
  });

  writeScript(aseDump, outputPath, listName, childProcess.stdin);
};
