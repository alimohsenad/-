const fs = require('fs');
let c = fs.readFileSync('src/App.tsx', 'utf8');
c = c.replace("import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';", "import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';\\nimport type { User } from 'firebase/auth';");
fs.writeFileSync('src/App.tsx', c);
console.log("Done");
