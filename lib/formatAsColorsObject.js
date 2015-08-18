var _ = require('lodash');

module.exports = function (input) {
  return input.reduce(colors, {});
};

function colors(prev, entry) {
  if (entry.type === 'color' && entry.color.hex) {
    prev[_.kebabCase(entry.name)] =  '#' + entry.color.hex;
    return prev;
  } else if (entry.type === 'group') {
    return entry.entries.reduce(colors, prev);
  }
  return prev;
}
