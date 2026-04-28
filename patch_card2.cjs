const fs = require('fs');
const filePath = 'src/App.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const targetIndex = content.indexOf(`                                return (
                                <div key={player.id} className={\`\${theme.bg} border-2 \${theme.border}`);

if (targetIndex === -1) {
    const backupTarget = content.indexOf('                                return (\\n                                <div key={player.id}');
    if (backupTarget === -1) {
        // try finding just "return (" immediately followed by "<div key={player.id}"
        const lines = content.split('\\n');
        let found = -1;
        for (let i=0; i<lines.length-1; i++) {
            if (lines[i].includes('return (') && lines[i+1].includes('<div key={player.id}')) {
                found = content.indexOf(lines[i]);
                break;
            }
        }
        if (found === -1) {
            console.log("Still can't find it");
            process.exit(1);
        }
        console.log("Found it using lines approach!");
    }
}
