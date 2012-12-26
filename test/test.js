var lib = require('../lib/yamljs-front-matter');
var fs = require('fs');
var path = require('path');


var expectedContent = fs.readFileSync(path.join(__dirname, 'test.md'));
var parsed = lib.parse(expectedContent);
var actualContent = lib.encode(parsed, 3);
console.log(actualContent)

console.log(expectedContent === actualContent);
