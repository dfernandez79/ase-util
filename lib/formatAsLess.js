'use strict';

var _ = require('lodash');

function lessVarExpression(prev, entry, entryNameFormat) {
  if (entry.type === 'color' && entry.color.hex) {
    return prev + ((prev.length > 0) ? '\n' : '') + '@' + entryNameFormat(entry.name) + ': #' + entry.color.hex + ';';
  } else if (entry.type === 'group') {
    prev += ((prev.length > 0) ? '\n\n' : '') + '// ' + entry.name;
    return entry.entries.reduce(function (p, e) { return lessVarExpression(p, e, entryNameFormat); }, prev);
  }
  return prev;
}

module.exports = function (input, entryNameFormat) {
  entryNameFormat = entryNameFormat || _.kebabCase;
  return input.reduce(function (prev, entry) {
    return lessVarExpression(prev, entry, entryNameFormat);
  }, '');
};
