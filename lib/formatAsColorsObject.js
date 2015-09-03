'use strict';

var _ = require('lodash');

function colors(prev, entry, entryNameFormat) {
  if (entry.type === 'color' && entry.color.hex) {
    prev[entryNameFormat(entry.name)] = '#' + entry.color.hex;
    return prev;
  } else if (entry.type === 'group') {
    return entry.entries.reduce(function (p, e) { return colors(p, e, entryNameFormat); }, prev);
  }
  return prev;
}

module.exports = function (input, entryNameFormat) {
  entryNameFormat = entryNameFormat || _.kebabCase;
  return input.reduce(function (prev, entry) {
    return colors(prev, entry, entryNameFormat);
  }, {});
};
