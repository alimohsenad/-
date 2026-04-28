const fs = require('fs');
let c = fs.readFileSync('src/App.tsx', 'utf8');
c = c.replace("\\\\n", "\\n"); // Replaces literal "\n" string with a new line
fs.writeFileSync('src/App.tsx', c);
console.log("Done");
