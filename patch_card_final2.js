const fs = require('fs');
const filePath = 'src/App.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const s1 = "                                return (";
const startStr = "{participantsInThisRound.map(({player, pts, compPts, normalCredit, totalPoints, didNotVote, hasDebt, attendanceCount, earlyCount, lateCount, earliestPaymentTS}: any, i) => {";

// find the target block
const blockStart = content.indexOf(s1, content.indexOf(startStr));
if (blockStart === -1) {
    console.error("Could not find start");
    process.exit(1);
}

const blockEnd = content.indexOf("                                );", blockStart + 10);
if (blockEnd === -1) {
    console.error("Could not find end");
    process.exit(1);
}

const before = content.substring(0, blockStart);
const after = content.substring(blockEnd);

const replacement = \`                                return (
                                <div key={player.id} className={" " + theme.bg + " border " + theme.border + " rounded-[28px] p-[22px] relative transition-all flex flex-col " + theme.glow + " mx-auto"} style={{ width: '330px', height: '430px' }}>
                                   {/* Rank Badge */}
                                   <div className={"absolute top-[22px] left-[22px] w-[58px] h-[58px] rounded-[16px] flex items-center justify-center font-black text-3xl shadow-sm z-10 bg-gradient-to-br " + theme.rankColor + " text-white"}>
                                      {!isTop3 && <div className="absolute inset-0 bg-white/20 rounded-[16px]"></div>}
                                      <span className="relative z-10">{i + 1}</span>
                                   </div>

                                   {/* Background Watermark Avatar (silhouette) */}
                                   <div className="absolute top-[35px] left-1/2 -translate-x-1/2 pointer-events-none opacity-[0.03]">
                                      <User size={180} />
                                   </div>

                                   {/* Top 3 Icon */}
                                   {theme.icon && (
                                     <div className="absolute top-10 right-10 z-10 bg-white/60 backdrop-blur-md p-2.5 rounded-[18px] border border-white shadow-inner">
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
                                      <div className="w-[100%] h-[90px] bg-[#F8FAFC] rounded-[22px] border border-slate-100 flex items-stretch p-1 mb-4 shadow-sm z-10 mx-auto">
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
                                         <div className={"w-[75px] mr-1 rounded-[18px] flex flex-col items-center justify-center text-white shadow-sm " + (isTop3 ? 'bg-gradient-to-b ' + theme.rankColor : 'bg-gradient-to-b from-indigo-500 to-indigo-600')}>
                                            <span className="text-[10px] font-black opacity-90 uppercase mt-0.5 mb-1 flex items-center gap-1 text-center leading-tight"><Trophy size={10} /> المجموع</span>
                                            <span className="text-[24px] font-black leading-none">{totalPoints}</span>
                                         </div>
                                      </div>

                                      {/* Badges Area */}
                                      <div className="w-full h-[90px] flex flex-wrap items-start justify-center gap-2 content-start overflow-hidden z-10 px-0 mt-2">
                                         {hasDebt && (
                                            <div className="px-[12px] h-[36px] rounded-[18px] text-[11px] font-black flex items-center gap-1 border bg-rose-50 border-rose-100 text-rose-600 truncate max-w-full">
                                               <Info size={12} className="shrink-0" />
                                               <span className="truncate">لم يسدد اشتراك</span>
                                            </div>
                                         )}
                                         {didNotVote && (
                                            <div className="px-[12px] h-[36px] rounded-[18px] text-[11px] font-black flex items-center gap-1 border bg-orange-50 border-orange-100 text-orange-600 truncate max-w-full">
                                               <MicOff size={12} className="shrink-0" />
                                               <span className="truncate">لم يصوّت للآخرين</span>
                                            </div>
                                         )}
                                         {showTieBreakReasons && attendanceCount > 0 && (
                                            <div className="px-[12px] h-[36px] rounded-[18px] text-[11px] font-black flex items-center gap-1 border bg-emerald-50 border-emerald-100 text-emerald-600 truncate max-w-full">
                                               <CheckCircle size={12} className="shrink-0" />
                                               <span className="truncate">حضور {attendanceCount} مرة</span>
                                            </div>
                                         )}
                                         {showTieBreakReasons && lateCount > 0 && (
                                            <div className="px-[12px] h-[36px] rounded-[18px] text-[11px] font-black flex items-center gap-1 border bg-slate-100 border-slate-200 text-slate-600 truncate max-w-full">
                                               <Clock size={12} className="shrink-0" />
                                               <span className="truncate">تأخر {lateCount} مرات</span>
                                            </div>
                                         )}
                                         {showTieBreakReasons && earlyCount > 0 && (
                                            <div className="px-[12px] h-[36px] rounded-[18px] text-[11px] font-black flex items-center gap-1 border bg-sky-50 border-sky-100 text-sky-600 truncate max-w-full">
                                               <FastForward size={12} className="shrink-0" />
                                               <span className="truncate">مبكر {earlyCount} مرة</span>
                                            </div>
                                         )}
                                      </div>
                                   </div>
                                </div>\`;

content = before + replacement + after;
fs.writeFileSync(filePath, content);
console.log("Patched successfully!");
