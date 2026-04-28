const fs = require('fs');
let text = fs.readFileSync('src/App.tsx', 'utf8');
let replaced = text.replace("                                         </div>\\n                            })}\\n                        </div>\\n                       </div>\\n                     );", "                                         </div>\\n                                       );\\n                            })}\\n                        </div>\\n                       </div>\\n                     );");
fs.writeFileSync('src/App.tsx', replaced);
console.log('Fixed');
