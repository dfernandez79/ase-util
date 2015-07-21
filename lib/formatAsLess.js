var _ = require('lodash');

module.exports = function (input) {
  return input.reduce(lessVarExpression, '');
};

function lessVarExpression(prev, entry) {
  if (entry.type === 'color' && entry.color.hex) {
    return prev + ((prev.length > 0)?'\n':'') + '@' + _.kebabCase(entry.name) + ': #' + entry.color.hex + ';';
  } else if (entry.type === 'group') {
    prev += ((prev.length > 0)?'\n\n':'') + '// ' + entry.name;
    return entry.entries.reduce(lessVarExpression, prev);
  }
  return prev;
}
