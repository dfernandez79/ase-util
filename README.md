ase-format
==========

Reads and writes the Adobe Swatch Exchange (ASE) file format.

Usage
-----

### read(buffer)

```
var ase = require("ase-format");
var fs = require("fs");
var result = ase.read(fs.readFileSync("myfile.ase"));
```
