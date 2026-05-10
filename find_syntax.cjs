const fs = require('fs');
const { execSync } = require('child_process');

const content = fs.readFileSync('src/App.tsx', 'utf8').split('\n');

for (let i = 8000; i < content.length; i += 500) {
    const testContent = content.slice(0, i).join('\n') + '\n}';
    fs.writeFileSync('src/App_test.tsx', testContent);
    try {
        execSync('npx esbuild src/App_test.tsx', { stdio: 'ignore' });
        // console.log(`Valid at ${i}`);
    } catch (e) {
        console.log(`Syntax error at roughly line ${i}!`);
        break;
    }
}
fs.unlinkSync('src/App_test.tsx');
