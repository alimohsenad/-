const fs = require('fs');
let c = fs.readFileSync('src/App.tsx', 'utf8');
const search = '<div key={player.id} className={\`\${theme.bg} border-2 \${theme.border} rounded-[3.5rem] p-10 relative overflow-hidden transition-all \${theme.glow}\`}>';

console.log('Index is ', c.indexOf(search));
