const fs = require('fs');
let c = fs.readFileSync('src/App.tsx', 'utf8');
c = c.replace("from 'firebase/auth';\\\\nimport type", "from 'firebase/auth';\\nimport type");
fs.writeFileSync('src/App.tsx', c);
console.log("Done");
