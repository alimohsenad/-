const fs = require('fs');
let lines = fs.readFileSync('src/App.tsx', 'utf8').split('\\n');

let start = lines.findIndex((l, i) => i > 5790 && l.includes(")}"));
let start2 = lines.findIndex((l, i) => i > 5790 && l.includes("showTieBreakReasons && attendanceCount"));
console.log(start2);

let theLine = lines[5798];
console.log(JSON.stringify(theLine));
console.log(JSON.stringify(lines[5799]));
console.log(JSON.stringify(lines[5800]));
