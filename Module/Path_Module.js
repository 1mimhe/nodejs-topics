const path = require('path');
// provides utilities for working with file and directory paths.

// Paths are different in OSs:
// Windows: The path would be C:\Users\<username>\Documents\document.txt.
// Linux: The path would be /home/<username>/Documents/document.txt.
// Separators are different.
console.log('mongodb' + path.sep + 'users' + path.sep + 'John');
// mongodb\users\John

console.log(path.basename("mongodb/data/users/index.html")); // index.html
console.log(path.basename("mongodb/data/users/index.html", ".html")); // index
console.log(path.dirname("/mongodb/data/users/index.html")); // /mongodb/data/users
console.log(path.extname("/mongodb/data/users/index.html")); // .html

console.log(path.join("/", "chapter2", "lesson-05", "model", "product.model.js"));
//\chapter2\lesson-05\model\product.model.js
// console.log(path.isAbsolute(path.join(path)));
console.log(path.parse(__filename));
/*
{
  root: 'M:\\',
  dir: 'M:\\Coding\\Node.js\\Node.js_Topics\\Module',
  base: 'Path_Module.js',
  ext: '.js',
  name: 'Path_Module'
}
*/