var _ = require('lodash');
var mapColors = require('./mapColors');
var colorToHex = require('./colorToHex');

module.exports = function (input) {
  return mapColors(input, function (colorEntry) {
    return '@' + _.kebabCase(colorEntry.name) + ': #' + colorToHex(colorEntry).color.hex + ';';
  }).join('\n');
};
