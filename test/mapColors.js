var assert = require('assert');
var mapColors = require('../lib').mapColors;

describe('mapColors', function () {

  it('maps color entries', function () {
    var colorEntries = [
      {
        type: 'color',
        name: 'Color Name',
        color: {model: 'RGB', r: 1, g: 0, b: 0, type: 'normal'}
      },
      {
        type: 'color',
        name: 'Color Name',
        color: {model: 'CMYK', c: 1, m: 0, y: 0, k: 0, type: 'spot'}
      },
      {
        type: 'color',
        name: 'Color Name',
        color: {model: 'LAB', lightness: 1, a: 0, b: 0, type: 'normal'}
      },
      {
        type: 'color',
        name: 'Color Name',
        color: {model: 'Gray', gray: 0.5, type: 'normal'}
      }
    ];

    var result = mapColors(colorEntries, function (entry) {
        return entry.color.model;
    });

    assert.deepEqual(result, ['RGB', 'CMYK', 'LAB', 'Gray']);
  });

  it('maps color entries in groups', function () {
    var entries = [
      {
        type: 'group',
        name: 'group name',
        entries: [
          {
            type: 'color',
            name: 'Color Name',
            color: {model: 'CMYK', c: 1, m: 0, y: 0, k: 0, type: 'spot'}
          },
          {
            type: 'color',
            name: 'Color Name',
            color: {model: 'LAB', lightness: 1, a: 0, b: 0, type: 'normal'}
          }
        ]
      },
      {
        type: 'color',
        name: 'Color Name',
        color: {model: 'Gray', gray: 0.5, type: 'normal'}
      }
    ];

    var result = mapColors(entries, function (entry) {
        return entry.color.model;
    });

    assert.deepEqual(result, ['CMYK', 'LAB', 'Gray']);
  });

});
