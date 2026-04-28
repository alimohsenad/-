const fs = require('fs');
let lines = fs.readFileSync('src/App.tsx', 'utf8').split('\\n');

let start = lines.findIndex((l, i) => i > 5790 && l.includes("                                                  )}"));
let end = lines.findIndex((l, i) => i > start && l.includes("                                        </div>"));

console.log("start", start);
console.log("end", end);

if (start !== -1 && end !== -1 && end - start < 100) {
    lines.splice(start, end - start);
    fs.writeFileSync('src/App.tsx', lines.join('\\n'));
} else {
    console.log("no match");
}
