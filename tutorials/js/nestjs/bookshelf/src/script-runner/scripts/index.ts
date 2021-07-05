// referenced from https://gist.github.com/richmarr/1122217/578a2767ec126b9b9526b6ac6df7d9935ee190d8

const fs = require('fs');
// dynamically export all scripts
fs.readdirSync('src/script-runner/scripts').forEach(function (file) {
  // file is in ts format i.e script1.ts
  if (file.indexOf('.ts') > -1 && file != 'index.ts') {
    const fileNameWithoutExt = file.replace('.ts', '');
    const jsFileName = file.replace('.ts', '.js');
    // exports[file.replace('.js', '')] = require('./' + file);
    exports[fileNameWithoutExt] = require('./' + jsFileName);
  }
});

// export * from './script1';

// or load each file if we know filenames - this works
// module.exports = {
//   script1: require('./script1'),
// };
