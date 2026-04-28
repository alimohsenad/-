const fs = require('fs');
let text = fs.readFileSync('src/App.tsx', 'utf8');
let nl = String.fromCharCode(10);
let lines = text.split(nl);
lines.splice(5798, 23);
fs.writeFileSync('src/App.tsx', lines.join(nl));
console.log('Fixed using chr(10)');
