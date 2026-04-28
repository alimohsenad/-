// We will use replace()
const fs = require('fs');

let c = fs.readFileSync('src/App.tsx', 'utf8');

c = c.replace(
  'rounded-[3.5rem] p-10 relative overflow-hidden',
  'rounded-[28px] p-[22px] relative flex flex-col mx-auto'
);

c = c.replace(
  'return (\\n                                <div key={player.id} className={\`\${theme.bg} border-2 \${theme.border} rounded-[28px] p-[22px] relative flex flex-col mx-auto transition-all \${theme.glow}\`}>',
  'return (\\n                                <div key={player.id} className={\`\${theme.bg} border \${theme.border} rounded-[28px] p-[22px] relative transition-all flex flex-col \${theme.glow} mx-auto\`} style={{ width: \\'330px\\', height: \\'430px\\' }}>'
);

fs.writeFileSync('src/App.tsx', c);
