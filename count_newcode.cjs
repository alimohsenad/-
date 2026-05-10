const fs = require('fs');
const content = fs.readFileSync('replace_flame_modal.cjs', 'utf8');

// extract newCode from replace_flame_modal
const match = /const newCode = `([\s\S]*?)`;/.exec(content);
if (match) {
  const code = match[1];
  let curly = 0;
  let paren = 0;
  for(let i=0; i<code.length; i++) {
    if (code[i] === '{') curly++;
    if (code[i] === '}') {
        curly--;
        if (curly < 0) {
            console.log('extra } at index', i, code.substring(Math.max(0, i-50), i+50));
            curly = 0; // reset
        }
    }
    if (code[i] === '(') paren++;
    if (code[i] === ')') paren--;
  }
  console.log('newCode curly diff:', curly, 'paren diff:', paren);
}
