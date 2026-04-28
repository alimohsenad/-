const fs = require('fs');

let c = fs.readFileSync('src/App.tsx', 'utf8');

const startIndex = c.indexOf("                                                                       return (", c.indexOf("participantsInThisRound.map("));
const endIndex = c.indexOf("                                                                    </div>", startIndex) + 84; 

// Just simple slice from the return statement
// Wait let's just make it replace the string exactly between return ( and the first </div> that closes it.
