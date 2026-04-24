import fs from 'node:fs';
const text = fs.readFileSync('src/App.tsx', 'utf8');

// I will just read line by line, find the index of "const currentPoints = round.points?.[p.id] || 0;" and write down exactly.

let output = '';
let inTarget = false;

// We will use replace with exact strings
const part1 = "className={`flex flex-col p-3 rounded-2xl border transition-all ${isExcluded ? 'bg-slate-50 border-slate-200 opacity-60' : 'bg-white border-slate-100 shadow-sm'}`}>\\n<div className=\"flex items-center justify-between\">";
const fix1 = "className={`flex flex-col p-3 rounded-2xl border transition-all ${isExcluded ? 'bg-slate-50 border-slate-200 opacity-60' : 'bg-white border-slate-100 shadow-sm'}`}>\n<div className=\"flex items-center justify-between\">";

let content = text;
content = content.replace(part1, fix1);

const part2 = `                                 <span className="text-[10px] font-black text-slate-300 uppercase">نقطة</span>
                              </div>
                           </div>
                        );
                     });`;
                     
const fix2 = `                                 <span className="text-[10px] font-black text-slate-300 uppercase">صوت</span>
                              </div>
                             </div>
                             
                           {!isExcluded && (
                               <div className="flex flex-col gap-1.5 pt-3 mt-3 border-t border-slate-100">
                                 <label className="flex items-center gap-2 cursor-pointer w-fit">
                                   <input 
                                     type="checkbox" 
                                     checked={didNotVote || false}
                                     onChange={async (e) => {
                                       const updated = [...userSettings.competitionSettings!.rounds!];
                                       if (e.target.checked) updated[roundIdx].nonVoterPlayerIds = [...(updated[roundIdx].nonVoterPlayerIds || []), p.id];
                                       else updated[roundIdx].nonVoterPlayerIds = updated[roundIdx].nonVoterPlayerIds?.filter(id => id !== p.id);
                                       await updateDoc(doc(db, \`users/\${user.uid}\`), { 'competitionSettings.rounds': updated });
                                     }}
                                     className="w-4 h-4 accent-amber-500 rounded"
                                   />
                                   <span className="text-[11px] font-bold text-amber-500">لم يصوّت للآخرين (نقاط المسابقة للجولة = 0)</span>
                                 </label>
                                 
                                 {isLastRound && (
                                   <label className="flex items-center gap-2 cursor-pointer w-fit">
                                     <input 
                                       type="checkbox" 
                                       checked={hasDebt || false}
                                       onChange={async (e) => {
                                         const updated = [...userSettings.competitionSettings!.rounds!];
                                         if (e.target.checked) updated[roundIdx].subscriptionDebtPlayerIds = [...(updated[roundIdx].subscriptionDebtPlayerIds || []), p.id];
                                         else updated[roundIdx].subscriptionDebtPlayerIds = updated[roundIdx].subscriptionDebtPlayerIds?.filter(id => id !== p.id);
                                         await updateDoc(doc(db, \`users/\${user.uid}\`), { 'competitionSettings.rounds': updated });
                                       }}
                                       className="w-4 h-4 accent-rose-500 rounded"
                                     />
                                     <span className="text-[11px] font-bold text-rose-500">غير مؤهل للفوز — عليه مديونية اشتراك</span>
                                   </label>
                                 )}
                               </div>
                           )}
                           </div>
                        );
                     });`;

content = content.replace(part2, fix2);

fs.writeFileSync('src/App.tsx', content);
console.log('done fixing JSX');
