const fs = require('fs');

const content = fs.readFileSync('src/App.tsx', 'utf8');

const regex1 = /<div className="bg-slate-50\/80 backdrop-blur-sm rounded-\[3rem\] p-8 border border-white shadow-inner flex items-center gap-12">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*\{\/\* Results Section \*\/\}/;

let newContent = content.replace(regex1, `</div>\n              </div>\n\n               {/* Results Section */}`);

const cardsRegex = /<div className="grid grid-cols-3 gap-8">[\s\S]*?\{\/\* Leaderboard Section \*\/\}/;

const cardsReplacement = `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                             {participantsInThisRound.map(({player, pts, compPts, normalCredit, totalPoints, didNotVote, hasDebt, attendanceCount, earlyCount, lateCount, earliestPaymentTS}: any, i) => {
                               const isTop3 = i < 3;
                               const theme = i === 0 ? {
                                 border: 'border-amber-200',
                                 bg: 'bg-gradient-to-b from-[#FFFAF0] to-white',
                                 rankColor: 'from-[#F59E0B] to-[#D97706]',
                                 icon: <Crown className="text-amber-500 drop-shadow-sm" size={24} />,
                                 glow: 'shadow-[0_0_15px_rgba(251,191,36,0.2)]',
                                 textBadge: 'text-amber-700'
                               } : i === 1 ? {
                                 border: 'border-slate-200',
                                 bg: 'bg-gradient-to-b from-[#F8FAFC] to-white',
                                 rankColor: 'from-[#94A3B8] to-[#64748B]',
                                 icon: <Medal className="text-slate-400 drop-shadow-sm" size={24} />,
                                 glow: 'shadow-[0_0_15px_rgba(148,163,184,0.2)]',
                                 textBadge: 'text-slate-600'
                               } : i === 2 ? {
                                 border: 'border-orange-200',
                                 bg: 'bg-gradient-to-b from-[#FFF7ED] to-white',
                                 rankColor: 'from-[#F97316] to-[#C2410C]',
                                 icon: <Medal className="text-orange-500 drop-shadow-sm" size={24} />,
                                 glow: 'shadow-[0_0_15px_rgba(249,115,22,0.2)]',
                                 textBadge: 'text-orange-700'
                               } : {
                                 border: 'border-slate-100',
                                 bg: 'bg-white',
                                 rankColor: 'from-[#CBD5E1] to-[#94A3B8]',
                                 icon: null,
                                 glow: 'shadow-sm hover:shadow-md transition-shadow',
                                 textBadge: 'text-slate-600'
                               };

                               return (
                                  <div key={player.id} className={\`relative flex flex-col w-full h-auto min-h-[360px] border rounded-[24px] p-5 \${theme.bg} \${theme.border} \${theme.glow}\`}>
                                     {/* Number Badge */}
                                     <div className={\`absolute top-5 right-5 w-11 h-11 rounded-xl flex items-center justify-center font-black text-xl shadow-sm z-10 text-white bg-gradient-to-br \${theme.rankColor}\`}>
                                        <span className="relative z-10">{i + 1}</span>
                                     </div>

                                     {/* Top 3 Icon */}
                                     {theme.icon && (
                                       <div className="absolute top-5 left-5 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-xl border border-slate-100 shadow-sm">
                                         {theme.icon}
                                       </div>
                                     )}

                                     <div className="flex flex-col items-center justify-start flex-1 z-10 w-full mt-10 mb-2">
                                        {/* Name Area */}
                                        <div className="flex items-center justify-center min-h-[64px] mb-6 px-12 w-full">
                                           <h4 className="text-2xl font-black text-slate-800 text-center leading-tight line-clamp-2">
                                              {player.name}
                                           </h4>
                                        </div>

                                        {/* Stats Box */}
                                        <div className="w-full bg-slate-50/80 rounded-[1.25rem] border border-slate-100 p-1.5 mb-5 shadow-sm flex items-center justify-between gap-1 overflow-hidden">
                                           {/* الأصوات */}
                                           <div className="flex-1 flex flex-col items-center justify-center py-2">
                                              <span className="text-[10px] font-bold text-slate-400 uppercase mb-1">الأصوات</span>
                                              <span className="text-xl font-black text-slate-700">{pts}</span>
                                           </div>
                                           <div className="w-px h-8 bg-slate-200"></div>
                                           {/* نقاط المسابقة */}
                                           <div className="flex-1 flex flex-col items-center justify-center py-2">
                                              <span className="text-[10px] font-bold text-slate-400 uppercase mb-1 whitespace-nowrap">نقاط المسابقة</span>
                                              <span className="text-xl font-black text-slate-700">{compPts}</span>
                                           </div>
                                           {includeNormalCredit && <div className="w-px h-8 bg-slate-200"></div>}
                                           {/* الرصيد العادي */}
                                           {includeNormalCredit && (
                                              <div className="flex-1 flex flex-col items-center justify-center py-2">
                                                 <span className="text-[10px] font-bold text-slate-400 uppercase mb-1 whitespace-nowrap">الرصيد العادي</span>
                                                 <span className="text-xl font-black text-slate-700">{normalCredit}</span>
                                              </div>
                                           )}
                                           {/* المجموع */}
                                           <div className={\`shrink-0 w-[72px] py-1.5 rounded-xl flex flex-col items-center justify-center text-white shadow-sm ml-0.5 \${isTop3 ? 'bg-gradient-to-br ' + theme.rankColor : 'bg-slate-700'}\`}>
                                              <span className="text-[10px] font-bold opacity-90 uppercase mt-0.5 mb-1">المجموع</span>
                                              <span className="text-[22px] font-black leading-none">{totalPoints}</span>
                                           </div>
                                        </div>

                                        {/* Badges Area */}
                                        <div className="w-full flex flex-wrap items-center justify-center gap-1.5 mt-auto">
                                           {hasDebt && (
                                              <div className="px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 bg-rose-50 text-rose-600 border border-rose-100">
                                                 <Info size={12} />
                                                 <span className="whitespace-nowrap">لم يسدد الاشتراك</span>
                                              </div>
                                           )}
                                           {didNotVote && (
                                              <div className="px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 bg-amber-50 text-amber-600 border border-amber-100">
                                                 <MicOff size={12} />
                                                 <span className="whitespace-nowrap">لم يصوت للآخرين</span>
                                              </div>
                                           )}
                                           {showTieBreakReasons && attendanceCount > 0 && (
                                              <div className="px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 bg-emerald-50 text-emerald-600 border border-emerald-100">
                                                 <CheckCircle size={12} />
                                                 <span className="whitespace-nowrap">حضور {attendanceCount} مرة</span>
                                              </div>
                                           )}
                                           {showTieBreakReasons && earlyCount > 0 && (
                                              <div className="px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 bg-blue-50 text-blue-600 border border-blue-100">
                                                 <FastForward size={12} />
                                                 <span className="whitespace-nowrap">مبكر {earlyCount} مرة</span>
                                              </div>
                                           )}
                                           {showTieBreakReasons && lateCount > 0 && (
                                              <div className="px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 bg-slate-100 text-slate-600 border border-slate-200">
                                                 <Clock size={12} />
                                                 <span className="whitespace-nowrap">تأخر {lateCount} مرة</span>
                                              </div>
                                           )}
                                        </div>
                                     </div>
                                  </div>
                               );
                             })}
                           </div>
                        </div>
                      );
                    })}
                 </div>
                )}
                </>
                )}

                {/* Leaderboard Section */}`;

newContent = newContent.replace(cardsRegex, cardsReplacement);

const tableRegex = /<table className="w-full text-right border-collapse">[\s\S]*?<\/table>/;
const tableReplacement = `<table className="w-full text-right border-collapse">
                      <thead>
                        <tr className="bg-slate-50/80">
                          <th className="py-6 px-4 md:px-8 font-bold text-slate-400 uppercase text-center border-b border-slate-100 whitespace-nowrap text-sm w-24">الترتيب</th>
                          <th className="py-6 px-4 md:px-8 font-bold text-slate-400 uppercase border-b border-slate-100 whitespace-nowrap text-sm">اللاعب</th>
                          <th className="py-6 px-4 md:px-8 font-bold text-slate-400 uppercase text-center border-b border-slate-100 whitespace-nowrap text-sm w-32">الأصوات</th>
                          <th className="py-6 px-4 md:px-8 font-bold text-slate-400 uppercase text-center border-b border-slate-100 whitespace-nowrap text-sm w-32">نقاط المسابقة</th>
                          {includeNormalCredit && <th className="py-6 px-4 md:px-8 font-bold text-slate-400 uppercase text-center border-b border-slate-100 whitespace-nowrap text-sm w-32">الرصيد العادي</th>}
                          <th className="py-6 px-4 md:px-8 font-black text-indigo-600 uppercase text-center border-b border-slate-100 text-base md:text-lg whitespace-nowrap bg-indigo-50/30 w-32">المجموع</th>
                        </tr>
                      </thead>
                      <tbody>
                        {competitionData.slice(0, 10).map((p, idx) => {
                          const isTop3 = idx < 3;
                          const theme = idx === 0 ? 'bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-white border-transparent' :
                                        idx === 1 ? 'bg-gradient-to-br from-[#94A3B8] to-[#64748B] text-white border-transparent' :
                                        idx === 2 ? 'bg-gradient-to-br from-[#F97316] to-[#C2410C] text-white border-transparent' :
                                        'bg-white text-slate-500 border-slate-200';

                          return (
                            <tr key={p.id} className="transition-colors border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                              <td className="py-5 px-4 md:px-8 text-center">
                                <div className={\`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg mx-auto shadow-sm border \${theme}\`}>
                                  {idx + 1}
                                </div>
                              </td>
                              <td className="py-5 px-4 md:px-8">
                                <div className="flex flex-col gap-1.5 items-start">
                                  <span className="text-lg md:text-xl font-black text-slate-800">{p.name}</span>
                                  <div className="flex flex-wrap gap-1.5 mt-1">
                                    {p.hasSubscriptionDebt && (
                                       <span className="text-[10px] font-bold text-white bg-rose-500 px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">غير مؤهل للفوز — مديونية</span>
                                    )}
                                    {p.didNotVote && <span className="text-[10px] font-bold bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full border border-amber-100 whitespace-nowrap">لم يصوت</span>}
                                  </div>
                                </div>
                              </td>
                              <td className="py-5 px-4 md:px-8 text-center text-lg font-bold text-slate-600">{p.roundPoints}</td>
                              <td className="py-5 px-4 md:px-8 text-center text-lg font-bold text-slate-600">{p.score}</td>
                              {includeNormalCredit && <td className="py-5 px-4 md:px-8 text-center text-lg font-bold text-slate-600">{p.normalCredit}</td>}
                              <td className="py-5 px-4 md:px-8 text-center text-xl md:text-2xl font-black text-indigo-700 bg-indigo-50/30">
                                {Math.round((p.score + p.normalCredit) * 10) / 10}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>`;

newContent = newContent.replace(tableRegex, tableReplacement);

fs.writeFileSync('src/App.tsx', newContent);
console.log('Fixed export UI');
