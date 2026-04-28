const fs = require('fs');
let c = fs.readFileSync('src/App.tsx', 'utf8');

const anchorStart = "                                                 {/* المجموع */}";
const anchorEnd = "                                        </div>";

let startIndex = c.indexOf(anchorStart, c.indexOf("participantsInThisRound.map("));
let endIndex = c.indexOf(anchorEnd, startIndex) + anchorEnd.length;

const replacement = `                                                 {/* المجموع */}
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
                                                       <span className="truncate">لم يدفع اشتراك</span>
                                                    </div>
                                                 )}
                                                 {didNotVote && (
                                                    <div className="px-[12px] h-[36px] rounded-[18px] text-[11px] font-black flex items-center gap-1 border bg-orange-50 border-orange-100 text-orange-600 truncate max-w-full">
                                                       <MicOff size={12} className="shrink-0" />
                                                       <span className="truncate">لم يصوت للآخرين</span>
                                                    </div>
                                                 )}
                                                 {showTieBreakReasons && attendanceCount > 0 && (
                                                    <div className="px-[12px] h-[36px] rounded-[18px] text-[11px] font-black flex items-center gap-1 border bg-emerald-50 border-emerald-100 text-emerald-600 truncate max-w-full">
                                                       <CheckCircle size={12} className="shrink-0" />
                                                       <span className="truncate">حضور {attendanceCount} مرات</span>
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
                                                       <span className="truncate">مبكر {earlyCount} مرات</span>
                                                    </div>
                                                 )}
                                              </div>
                                           </div>
                                        </div>`;

fs.writeFileSync('src/App.tsx', c.substring(0, startIndex) + replacement + c.substring(endIndex));
console.log("Replaced!");
