// referenced from https://gist.github.com/richmarr/1122217/578a2767ec126b9b9526b6ac6df7d9935ee190d8
// dynamically export all scripts
const fs = require('fs');
fs.readdirSync('scripts').forEach(function (file) {
  // file is in ts format i.e script1.ts
  if (file.indexOf('.ts') > -1 && file != 'index.ts') {
    const fileNameWithoutExt = file.replace('.ts', '');
    const jsFileName = file.replace('.ts', '.js');
    exports[fileNameWithoutExt] = require('./' + jsFileName);
  }
});
