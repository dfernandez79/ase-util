var assert = require('assert');
var colorToHex = require('../lib').colorToHex;

describe('colorToHex', function () {
  it('transforms RGB colors', function () {
    var testColors = [
      {"type":"color","name":"7F361F",
      "color":{"model":"RGB","r":0.49803921580314636,"g":0.21176470816135406,"b":0.12156862765550613,"type":"normal"}},
      {"type":"color","name":"6502FC",
      "color":{"model":"RGB","r":0.3960784375667572,"g":0.007843137718737125,"b":0.9882352948188782,"type":"normal"}}];

    testColors.forEach(function (item) {
      assert.equal(colorToHex(item).color.hex, item.name);
    });
  });

  it('transforms Gray colors', function () {
    var testColors = [{"type":"color",
      "name":"A5A5A5","color":{"model":"Gray","gray":0.6488494873046875,"type":"normal"}}];

    testColors.forEach(function (item) {
      assert.equal(colorToHex(item).color.hex, item.name);
    });
  });

  it('ignores CMYK colors', function () {
    var color = {"type":"color","name":"Cyan","color":{"model":"CMYK","c":1,"m":0,"y":0,"k":0,"type":"normal"}};
    var result = colorToHex(color);
    assert(!result.color.hex);
    assert.equal(color, result);
  });

  it('ignores LAB colors', function () {
    var color = {"type":"color","name":"Test","color":{"model":"LAB","lightness":1,"a":-128,"b":-128,"type":"spot"}};
    var result = colorToHex(color);
    assert(!result.color.hex);
    assert.equal(color, result);
  });

  it('applies to the entries in a group', function () {
    var group = {"type":"group","name":"A Group",
      "entries":[{"type":"color","name":"Red","color":{"model":"RGB","r":1,"g":0,"b":0,"type":"normal"}}]};
    var result = colorToHex(group);
    assert.equal(result.entries[0].color.hex, 'FF0000');
  });

});
