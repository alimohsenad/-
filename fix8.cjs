const fs = require('fs');
let nl = String.fromCharCode(10);
let lines = fs.readFileSync('src/App.tsx', 'utf8').split(nl);
let targetLine = 5798; // 0-indexed, so it's line 5799
lines.splice(targetLine, 0, "                                        );");
fs.writeFileSync('src/App.tsx', lines.join(nl));
console.log('Fixed');
