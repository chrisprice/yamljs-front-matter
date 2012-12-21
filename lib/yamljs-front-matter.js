var yaml = require('yamljs');

var frontMatterRegex = /---\s*\n([\s\S]*)?\n?^---\s*$\n?([\s\S]*)/m;

exports.parse = function(contents, encoding) {
  contents = contents.toString(encoding);
  var regexResult = contents.match(frontMatterRegex);
  if (!regexResult) {
    return null;
  }
  var metadata = yaml.parse(regexResult[1]);
  metadata.__content = regexResult[2];
  return metadata;
};

exports.encode = function(metadata, content) {
  content = content || metadata.__content;
  throw "BOB";
};

var content = require('fs').readFileSync('../PropertyFinderCrossPlatform/website/index.html');
var metadata = exports.parse(content);
console.log(metadata);