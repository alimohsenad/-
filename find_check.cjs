const fs = require('fs');

let c = fs.readFileSync('src/App.tsx', 'utf8');

const targetStart = "                                <div key={player.id} className={\`\${theme.bg} border-2 \${theme.border} rounded-[3.5rem] p-10 relative overflow-hidden transition-all \${theme.glow}\`}>";
const targetEnd = "                                );"; 

console.log("Start exists? ", c.includes(targetStart));
console.log("End exists? ", c.includes(targetEnd));

let startIndex = c.indexOf(targetStart);
let endIndex = c.indexOf(targetEnd, startIndex);
console.log("start index: ", startIndex);
console.log("end index: ", endIndex);
