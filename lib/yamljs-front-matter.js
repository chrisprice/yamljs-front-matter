var yaml = require('yamljs');
var os = require('os');

var frontMatterRegex = /---\s*\n([\s\S]*)?\n?^---\s*$\n?([\s\S]*)/m;

/**
 * Parse a YAML front header and content from the supplied string/buffer.
 *
 * @param	mixed	 contents	The contents as a string or buffer
 * @param	string encoding Treat the buffer as having this encoding
 *
 * @return string	The front header as a JavaScript object with the content
 * stored under the key __content.
 */
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

/**
 * Add a YAML front header to the supplied content.
 *
 * @param	mixed	 metadata	The metadata
 * @param	integer inline The level where you switch to inline YAML (defaults to 3)
 * @param	integer content The body content (defaults to metadata.__content)
 *
 * @return string	The YAML front mattered content
 */
exports.encode = function(metadata, inline, content) {
  if (typeof inline != 'number') {
    content = inline;
    inline = 3;
  }
  content = content || metadata.__content;
  delete metadata.__content;
  return '---' + os.EOL + yaml.stringify(metadata, inline) + '---' + os.EOL + content;
};