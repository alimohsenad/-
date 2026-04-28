const fs = require('fs');
let c = fs.readFileSync('src/App.tsx', 'utf8');

c = c.replace(`                                         </div>
                                                 )}
                                                 {showTieBreakReasons && attendanceCount > 0 && (
                                                    <div className="px-[12px] h-[36px] rounded-[18px] text-[11px] font-black flex items-center gap-1 border bg-emerald-50 border-emerald-100 text-emerald-600 truncate max-w-full">
                                                       <CheckCircle size={12} className="shrink-0" />
                                                       <span className="truncate">حضور {attendanceCount} مر٩</span>
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
                                                       <span className="truncate">مبكر earlyCount} مر٩</span>
                                                    </div>
                                                 )}
                                              </div>
                                           </div>
                                        </div>`, '                                         </div>');

fs.writeFileSync('src/App.tsx', c);
console.log("Done");
