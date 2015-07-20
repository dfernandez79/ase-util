function componentToHex(value) {
  var hex = ((value * 255) | 0).toString(16).toUpperCase();
  return (hex.length === 1) ? '0' + hex : hex;
}

function rgbToHex(color) {
  return componentToHex(color.r) + componentToHex(color.g) + componentToHex(color.b);
}

function grayToHex(color) {
  return componentToHex(color.gray) + componentToHex(color.gray) + componentToHex(color.gray);
}

function colorToHex(colorEntry) {
  if (colorEntry.type === 'color' && colorEntry.color.model === 'RGB') {
    colorEntry.color.hex = rgbToHex(colorEntry.color);
  } else if (colorEntry.type === 'color' && colorEntry.color.model === 'Gray') {
    colorEntry.color.hex = grayToHex(colorEntry.color);
  } else if (colorEntry.type === 'group') {
    colorEntry.entries.forEach(colorToHex);
  }
  return colorEntry;
};

module.exports = colorToHex;
