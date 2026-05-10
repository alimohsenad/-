const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf8');

let curly = 0;
let lines = content.split('\n');
let overall_curly = 0;
for(let r=0; r<lines.length; r++) {
  let line = lines[r];
  for(let i=0; i<line.length; i++) {
    if (line[i] === '{') overall_curly++;
    if (line[i] === '}') {
      overall_curly--;
      if (overall_curly < 0) {
        console.log('Extra } found at line', r + 1);
        overall_curly = 0; // reset to keep going
      }
    }
  }
}
