ASE Util
========

Utility library to handle Adobe Swatch Exchange (ASE) files.

API
---

```js
var ase = require("ase-util");
```

### ase.read(buffer)

```js
var fs = require("fs");
var result = ase.read(fs.readFileSync("myfile.ase"));
```

Reads a buffer with the ASE binary format; outputs an array with color or color group objects:

#### Color

There are four kinds of colors: RGB, CMYK, Lab, and Gray.

Color components are stored using float values, for instance in RGB component values goes from 0 to 1 (instead of 0 to 255; for some reason values are stored in that way in the ASE format).

Each color value has a `type` field with the Spot/Process (Normal)/Process Global distinction made by Illustrator
and InDesign (see  https://helpx.adobe.com/illustrator/using/color.html).

RGB color example:
```js
{
  type: 'color',
  name: 'Color Name',
  color: {model: 'RGB', r: 1, g: 0, b: 0, type: 'normal'}
}
```

CMYK color example:
```js
{
  type: 'color',
  name: 'Color Name',
  color: {model: 'CMYK', c: 1, m: 0, y: 0, k: 0, type: 'spot'}
}
```

LAB color example:
```js
{
  type: 'color',
  name: 'Color Name',
  color: {model: 'LAB', lightness: 1, a: 0, b: 0, type: 'normal'}
}
```

Gray color example:
```js
{
  type: 'color',
  name: 'Color Name',
  color: {model: 'Gray', gray: 0.5, type: 'normal'}
}
```

#### Group

Groups are named lists of colors:

```js
{
  type: 'group',
  name: 'Group Name',
  entries: [] // Array of Colors
}
```
