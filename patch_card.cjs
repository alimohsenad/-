const fs = require('fs');
const filePath = 'src/App.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const targetIndex = content.indexOf(`                                return (
                                <div key={player.id} className={\`\${theme.bg} border-2 \${theme.border}`);

if (targetIndex === -1) {
    console.error("Could not find start of card");
    process.exit(1);
}

const endIndex = content.indexOf(`                                );
                            })}
                        </div>
                       </div>
                     );
                   })}
                </div>`, targetIndex);

if (endIndex === -1) {
    console.error("Could not find end of card block");
    process.exit(1);
}

const before = content.substring(0, targetIndex);
const after = content.substring(endIndex);

const replacementCard = `                                return (
                                <div key={player.id} className={\`\${theme.bg} border \${theme.border} rounded-[28px] p-[22px] relative transition-all flex flex-col \${theme.glow} mx-auto\`} style={{ width: '330px', height: '430px' }}>
                                   {/* Rank Badge */}
                                   <div className={\`absolute top-[22px] left-[22px] w-[58px] h-[58px] rounded-[16px] flex items-center justify-center font-black text-3xl shadow-sm z-10 bg-gradient-to-br \${theme.rankColor} text-white\`}>
                                      {!isTop3 && <div className="absolute inset-0 bg-white/20 rounded-[16px]"></div>}
                                      <span className="relative z-10">{i + 1}</span>
                                   </div>

                                   {/* Background Watermark Avatar (silhouette) */}
                                   <div className="absolute top-[35px] left-1/2 -translate-x-1/2 pointer-events-none opacity-[0.03]">
                                      <User size={180} />
                                   </div>

                                   {/* Top 3 Icon */}
                                   {theme.icon && (
                                     <div className="absolute top-10 right-10 z-10 bg-white/60 backdrop-blur-md p-2.5 rounded-2xl border border-white shadow-inner">
                                       {theme.icon}
                                     </div>
                                   )}

                                   <div className="flex flex-col items-center justify-start flex-1 z-10 w-full mt-4">
                                      {/* Name Area */}
                                      <div className="h-[92px] w-full flex items-center justify-center mb-6 mt-10">
                                         <h4 className="text-[28px] font-black text-slate-800 text-center leading-snug line-clamp-2 px-2">
                                            {player.name}
                                         </h4>
                                      </div>

                                      {/* Stats Box */}
                                      <div className="w-full h-[90px] bg-white/80 rounded-[22px] border border-slate-100 flex items-stretch p-1 mb-4 shadow-sm z-10 mx-auto">
                                         {/* الأصوات */}
                                         <div className="flex-1 flex flex-col items-center justify-center">
                                            <span className="text-[10px] font-black text-slate-400 uppercase mb-1 flex items-center gap-1"><Users size={10} /> الأصوات</span>
                                            <span className="text-xl font-black text-slate-700">{pts}</span>
                                         </div>
                                         
                                         {/* نقاط المسابقة */}
                                         <div className="flex-1 flex flex-col items-center justify-center border-r border-slate-200/60">
                                            <span className="text-[10px] font-black text-slate-400 uppercase mb-1 text-center leading-tight flex items-center gap-1"><Star size={10} /> نقاط المسابقة</span>
                                            <span className="text-xl font-black text-slate-700">{compPts}</span>
                                         </div>

                                         {/* الرصيد العادي */}
                                         {includeNormalCredit && (
                                            <div className="flex-1 flex flex-col items-center justify-center border-r border-slate-200/60">
                                               <span className="text-[10px] font-black text-slate-400 uppercase mb-1 text-center leading-tight flex items-center gap-1"><Wallet size={10} /> الرصيد العادي</span>
                                               <span className="text-xl font-black text-slate-700">{normalCredit}</span>
                                            </div>
                                         )}

                                         {/* المجموع */}
                                         <div className={\`w-[75px] mr-1 rounded-[18px] flex flex-col items-center justify-center text-white shadow-md \${isTop3 ? 'bg-gradient-to-b ' + theme.rankColor : 'bg-gradient-to-b from-indigo-500 to-indigo-600'}\`}>
                                            <span className="text-[10px] font-black opacity-90 uppercase mt-0.5 mb-1 flex items-center gap-1 text-center leading-tight"><Trophy size={10} /> المجموع</span>
                                            <span className="text-[24px] font-black leading-none">{totalPoints}</span>
                                         </div>
                                      </div>

                                      {/* Badges Area */}
                                      <div className="w-full h-[90px] flex flex-wrap items-start justify-center gap-2.5 content-start overflow-hidden z-10 px-0">
                                         {hasDebt && (
                                            <div className="px-[16px] h-[44px] rounded-[22px] text-[12px] font-black flex items-center gap-1.5 border bg-rose-50 border-rose-100 text-rose-600">
                                               <Info size={14} />
                                               لم يسدد اشتراك
                                            </div>
                                         )}
                                         {didNotVote && (
                                            <div className="px-[16px] h-[44px] rounded-[22px] text-[12px] font-black flex items-center gap-1.5 border bg-orange-50 border-orange-100 text-orange-600">
                                               <MicOff size={14} />
                                               لم يصوّت للآخرين
                                            </div>
                                         )}
                                         {showTieBreakReasons && attendanceCount > 0 && (
                                            <div className="px-[16px] h-[44px] rounded-[22px] text-[12px] font-black flex items-center gap-1.5 border bg-emerald-50 border-emerald-100 text-emerald-600">
                                               <CheckCircle size={14} />
                                               حضور {attendanceCount} مرة
                                            </div>
                                         )}
                                         {showTieBreakReasons && lateCount > 0 && (
                                            <div className="px-[16px] h-[44px] rounded-[22px] text-[12px] font-black flex items-center gap-1.5 border bg-slate-100 border-slate-200 text-slate-600">
                                               <Clock size={14} />
                                               تأخر {lateCount} مرات
                                            </div>
                                         )}
                                         {showTieBreakReasons && earlyCount > 0 && (
                                            <div className="px-[16px] h-[44px] rounded-[22px] text-[12px] font-black flex items-center gap-1.5 border bg-sky-50 border-sky-100 text-sky-600">
                                               <FastForward size={14} />
                                               مبكر {earlyCount} مرة
                                            </div>
                                         )}
                                      </div>
                                   </div>
                                </div>
`;

content = before + replacementCard + after;
console.log("Patched card structure successfully");

content = content.replace(/import \{ ([^}]+) \} from 'lucide-react';/g, (m, imports) => {
    const list = imports.split(',').map(s=>s.trim());
    const needed = ['User', 'MicOff', 'Users', 'Star', 'Wallet', 'Trophy', 'Info', 'CheckCircle', 'Clock', 'FastForward'];
    needed.forEach(n => { if (!list.includes(n)) list.push(n); });
    return `import { ${list.join(', ')} } from 'lucide-react';`;
});

fs.writeFileSync(filePath, content);
