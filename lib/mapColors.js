function _mapColors(arr, fn, result) {
  arr.forEach(function (item) {
    if (item.type === 'color') {
      result.push(fn(item));
    } else if (item.type === 'group') {
      _mapColors(item.entries, fn, result);
    }
  });
  return result;
}

module.exports = function (arr, fn) {
  return _mapColors(arr, fn, []);
};
