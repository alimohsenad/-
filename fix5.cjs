const fs = require('fs');
let lines = fs.readFileSync('src/App.tsx', 'utf8').split('\\n');
console.log(lines.length);

let start2 = lines.findIndex((l, i) => l.includes("{showTieBreakReasons && attendanceCount"));
console.log("start2", start2);

if (start2 !== -1) {
    let end = lines.findIndex((l, i) => i > start2 + 5 && l.includes("                                        </div>"));
    console.log("end", end);
    if (end > start2) {
       // start2 should belong to the first line of the leftover chunk. BUT we have to find where the duplicate </div></div></div>); starts.
       // The duplicate starts around the second occurrence of showTieBreakReasons.
       // Let's just remove the first corrupted `)}` right before it and everything down to `</div>`.
       // Wait, I will just remove the lines explicitly.
       let firstBad = start2 - 1; 
       console.log("Removing from", firstBad, "to", end);
       lines.splice(firstBad, end - firstBad); 
       fs.writeFileSync('src/App.tsx', lines.join('\\n'));
       console.log("Saved.");
    }
}
