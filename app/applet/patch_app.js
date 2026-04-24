import fs from 'fs';
const text = fs.readFileSync('src/App.tsx', 'utf8');
const searchBlockRegex = /return roundParticipants\.map\(p => {[\s\S]*?<span className="text-\[10px\] font-black text-slate-300 uppercase">نقطة<\/span>\s*<\/div>\s*<\/div>\s*\);\s*}\);/g;

const match = text.match(searchBlockRegex);
if (!match) {
  console.log('No match found for UI block');
  process.exit(1);
}

let block = match[0];
block = block.replace('<span className="text-[10px] font-black text-slate-300 uppercase">نقطة</span>', '<span className="text-[10px] font-black text-slate-300 uppercase">صوت</span>');

// Replace flex items-center justify-between with flex-col
block = block.replace('className={`flex items-center justify-between', 'className={`flex flex-col');

// Wrap the inner top part with flex row
block = block.replace('<div className="flex-1">', '<div className="flex items-center justify-between mb-2">\\n                                 <div className="flex-1">');

// Add the checkboxes after the closing of the new inner flex row
const newBottom = `                              </div>
                           </div>
                           
                           {!isExcluded && (
                               <div className="flex flex-col gap-1.5 pt-3 mt-3 border-t border-slate-100">
                                 <label className="flex items-center gap-2 cursor-pointer w-fit">
                                   <input 
                                     type="checkbox" 
                                     checked={round.nonVoterPlayerIds?.includes(p.id) || false}
                                     onChange={async (e) => {
                                       const updated = [...userSettings.competitionSettings!.rounds!];
                                       if (e.target.checked) updated[roundIdx].nonVoterPlayerIds = [...(updated[roundIdx].nonVoterPlayerIds || []), p.id];
                                       else updated[roundIdx].nonVoterPlayerIds = updated[roundIdx].nonVoterPlayerIds?.filter(id => id !== p.id);
                                       await updateDoc(doc(db, \`users/\${user.uid}\`), { 'competitionSettings.rounds': updated });
                                     }}
                                     className="w-4 h-4 accent-amber-500 rounded"
                                   />
                                   <span className="text-[11px] font-bold text-amber-700">لم يصوّت للآخرين (نقاط المسابقة للجولة = 0)</span>
                                 </label>
                                 
                                 {(roundIdx === userSettings.competitionSettings!.rounds!.length - 1) && (
                                   <label className="flex items-center gap-2 cursor-pointer w-fit">
                                     <input 
                                       type="checkbox" 
                                       checked={round.subscriptionDebtPlayerIds?.includes(p.id) || false}
                                       onChange={async (e) => {
                                         const updated = [...userSettings.competitionSettings!.rounds!];
                                         if (e.target.checked) updated[roundIdx].subscriptionDebtPlayerIds = [...(updated[roundIdx].subscriptionDebtPlayerIds || []), p.id];
                                         else updated[roundIdx].subscriptionDebtPlayerIds = updated[roundIdx].subscriptionDebtPlayerIds?.filter(id => id !== p.id);
                                         await updateDoc(doc(db, \`users/\${user.uid}\`), { 'competitionSettings.rounds': updated });
                                       }}
                                       className="w-4 h-4 accent-rose-500 rounded"
                                     />
                                     <span className="text-[11px] font-bold text-rose-700">غير مؤهل للفوز — عليه مديونية اشتراك</span>
                                   </label>
                                 )}
                               </div>
                           )}
                           </div>
                        );
                     });`;
                     
block = block.replace(/<\/div>\s*<\/div>\s*\);\s*}\);/, newBottom);

let finalFile = text.replace(match[0], block);

// Also we need to fix removePlayer
const removePlayerSearch = /const removePlayer = async \(\) => {[\s\S]*?            isDeleted: true,\n            weeklyDebt: 0,\n            monthlyDebt: 0,\n            debtHistory: updatedHistory\n          }\);\n        }/g;

const removePlayerMatch = finalFile.match(removePlayerSearch);
if (removePlayerMatch) {
   const removeReplacement = removePlayerMatch[0] + `
        
        // Competition cleanup
        if (userSettings.competitionSettings?.title) {
          const comp = userSettings.competitionSettings;
          if (comp.initialParticipantIds?.includes(modalData)) {
            const newParticipantIds = comp.initialParticipantIds.filter(id => id !== modalData);
            const newRounds = (comp.rounds || []).map(r => {
              const newPoints = { ...r.points };
              if (newPoints[modalData]) delete newPoints[modalData];
              
              const cloneSnapshot = { ...(r.normalCreditSnapshot || {}) };
              if (cloneSnapshot[modalData]) delete cloneSnapshot[modalData];
              
              const cloneWeighted = { ...(r.totalWeightedScores || {}) };
              if (cloneWeighted[modalData]) delete cloneWeighted[modalData];
              
              return {
                 ...r,
                 points: newPoints,
                 excludedPlayerIds: (r.excludedPlayerIds || []).filter(id => id !== modalData),
                 nonVoterPlayerIds: (r.nonVoterPlayerIds || []).filter(id => id !== modalData),
                 subscriptionDebtPlayerIds: (r.subscriptionDebtPlayerIds || []).filter(id => id !== modalData),
                 normalCreditSnapshot: cloneSnapshot,
                 totalWeightedScores: cloneWeighted
              };
            });
            
            await updateDoc(doc(db, \`users/\${user.uid}\`), {
              'competitionSettings.initialParticipantIds': newParticipantIds,
              'competitionSettings.rounds': newRounds
            });
          }
        }`;
        
   finalFile = finalFile.replace(removePlayerMatch[0], removeReplacement);
} else {
   console.log('No removePlayer match');
}


// Replace handleSaveCompetitionSettings to cleanup when initialParticipantIds changes
const compSettingsSearch = /      initialParticipantIds: compInitialPlayers \|\| \[\],\n      rounds: updatedRounds\.map\(r => \(\{/g;
if (finalFile.match(compSettingsSearch)) {
   finalFile = finalFile.replace(compSettingsSearch, `      initialParticipantIds: compInitialPlayers || [],
      rounds: updatedRounds.map(r => {
        const newPoints = { ...r.points };
        Object.keys(newPoints).forEach(pid => {
           if (!compInitialPlayers.includes(pid)) delete newPoints[pid];
        });
        return {
          ...r,
          points: newPoints,
          excludedPlayerIds: (r.excludedPlayerIds || []).filter(id => compInitialPlayers.includes(id)),
          nonVoterPlayerIds: (r.nonVoterPlayerIds || []).filter(id => compInitialPlayers.includes(id)),
          subscriptionDebtPlayerIds: (r.subscriptionDebtPlayerIds || []).filter(id => compInitialPlayers.includes(id)),
          status: r.status === 'cancelled' ? 'cancelled' : 
                  (r.date && new Date(r.date) < new Date() ? 
                  (Object.keys(newPoints).length > 0 ? 'completed' : 'active') : 'upcoming')
        };
      }),
      // rounds: updatedRounds.map(r => ({`);
}

fs.writeFileSync('src/App.tsx', finalFile);
console.log('Success');
