ASE Util
========

Utility library to handle Adobe Swatch Exchange (ASE) files.

```
npm install ase-util
```

The package provides JavaScript functions and command line tools.


Command line tools
------------------

### asedump

Dumps the colors and groups of an .ase file as JSON or LESS format.

Usage: `asedump [options] filename.ase`

Options:
  * `--pretty` Pretty print the output
  * `--format` / `-f` Output format: json, json-colors, less
    * **json**: output of `ase.read` as JSON (includes everything in the ASE file).
    * **json-colors**: a JSON that contains only color names and hex color values (groups are flattened, CMYK and LAB colors ignored).
    * **less**: like **json-colors** but the output is formatted using [LESS](http://lesscss.org/) syntax.
  * `--export` When using JSON output it adds the CommonJS `module.exports`

### ase2clr

Converts an `.ase` file to `.clr` OSX color list.

**OSX Only:** To do the conversion the tool uses OSX scripting to get a `NSColorList` instance, in other words it'll
not work on other platforms.

Usage: `ase2clr input.ase output.clr`


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

Color components in ASE files are stored using float values, for instance in RGB component values goes from 0 to 1
(instead of 0 to 255). For RGB and Gray colors, an convenient `hex` field with the HTML hex color format is included.

Each color value has a `type` field with the Spot/Process (Normal)/Process Global distinction made by Illustrator
and InDesign (see  https://helpx.adobe.com/illustrator/using/color.html).

RGB color example:
```js
{
  type: 'color',
  name: 'Color Name',
  color: {model: 'RGB', r: 1, g: 0, b: 0, hex: 'FF0000', type: 'normal'}
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
  color: {model: 'Gray', gray: 0, hex: '000000', type: 'normal'}
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

### ase.formatAsLess(input, [nameEntryFormatFunction])

Takes the output of `read` and returns a string with LESS variable declarations for the colors.

Only colors with hex values are taken into account (CMYK/LAB colors are ignored).

Color names are formatted using `nameEntryFormatFunction`, if omitted [Lodash's kebabCase](https://lodash.com/docs#kebabCase) will be used.


### ase.formatAsColorsObject(input, [nameEntryFormatFunction])

Takes the output of `read` and returns a object with color names and color hex values.

The returned object is useful for contexts where you need only the color/value pairs, i.e. reading the ASE file to
use it with [PostCSS](https://github.com/postcss/postcss).

Only colors with hex values are taken into account (CMYK/LAB colors are ignored).

Color names are formatted using `nameEntryFormatFunction`, if omitted [Lodash's kebabCase](https://lodash.com/docs#kebabCase) will be used.
