const fs = require('fs');
let s = fs.readFileSync('src/App.tsx', 'utf8');

const oldCard = `<div key={p.id} className="relative bg-gradient-to-b from-slate-50 to-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-3 overflow-hidden group hover:-translate-y-1 transition-transform">
                           <div className="absolute top-0 right-0 w-8 h-8 bg-slate-800 text-white rounded-bl-2xl font-black flex items-center justify-center text-sm z-10 shadow-sm">
                             {idx + 1}
                           </div>
                           
                           {lvl.isWinner && (
                              <div className="absolute top-2 left-2 animate-bounce">
                                <Trophy size={18} className="text-amber-500" />
                              </div>
                           )}
                           
                           <div className="relative mt-2">
                             <div className="absolute -inset-2 rounded-full opacity-20 blur-md animate-pulse" style={{ backgroundColor: lvl.color }}></div>
                             <div className="w-16 h-16 rounded-full bg-white shadow-sm border-2 flex items-center justify-center relative z-10" style={{ borderColor: lvl.color }}>
                               {lvl.icon === 'small' && <Flame size={24} style={{ color: lvl.color }} opacity={0.6} />}
                               {lvl.icon === 'medium' && <Flame size={32} style={{ color: lvl.color }} opacity={0.8} />}
                               {lvl.icon === 'large' && <Flame size={40} style={{ color: lvl.color }} />}
                               {lvl.icon === 'crown' && <Crown size={36} style={{ color: lvl.color }} />}
                               {lvl.icon === 'fire' && <Trophy size={36} style={{ color: lvl.color }} />}
                             </div>
                           </div>
                           
                           <div className="text-center w-full">
                              <h4 className="font-bold text-slate-800 truncate px-2" title={p.name}>{p.name}</h4>
                              <div className="flex items-center justify-center gap-1 mt-1">
                                <span className="font-black text-xl" style={{ color: lvl.color }}>{p.currentStreak}</span>
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">مرات</span>
                              </div>
                              <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{lvl.name}</p>
                              
                              {lvl.isWinner && settings.prizeText && (
                                <div className="mt-2 text-[10px] bg-amber-100 text-amber-700 py-1 px-2 rounded-lg font-bold truncate">
                                  🏆 {settings.prizeText}
                                </div>
                              )}
                           </div>
                        </div>`;

const newCard = `<div key={p.id} className="relative rounded-3xl p-3 sm:p-4 border shadow-sm flex flex-col items-center justify-center gap-2 overflow-visible group hover:-translate-y-1 transition-all" style={{ backgroundColor: lvl.bgColor || lvl.color || '#ffffff', borderColor: 'rgba(0,0,0,0.05)' }}>
                           <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full shadow-sm flex items-center justify-center text-xs font-black ring-2 ring-white/50 z-20" style={{ backgroundColor: lvl.iconColor || lvl.color || '#3b82f6', color: '#fff' }}>
                             {idx + 1}
                           </div>
                           
                           {lvl.isWinner && (
                              <div className="absolute top-2 left-2 animate-bounce z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
                                <Trophy size={16} className="text-amber-500" />
                              </div>
                           )}
                           
                           <div className="relative mt-2 mb-2 w-full flex justify-center">
                             <div className="absolute -inset-2 rounded-full opacity-20 blur-md animate-pulse" style={{ backgroundColor: lvl.iconColor || lvl.color || '#e2e8f0' }}></div>
                             <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white shadow-sm border-2 flex items-center justify-center relative z-10 mx-auto cursor-pointer hover:scale-105 active:scale-95 transition-transform" onClick={() => { setFlameSelectedPlayer(p); setModal('flameParticipantDetails'); }} style={{ borderColor: lvl.iconColor || lvl.color || '#e2e8f0' }}>
                               {lvl.icon === 'small' && <Flame size={22} style={{ color: lvl.iconColor || lvl.color }} opacity={0.6} />}
                               {lvl.icon === 'medium' && <Flame size={28} style={{ color: lvl.iconColor || lvl.color }} opacity={0.8} />}
                               {lvl.icon === 'large' && <Flame size={36} style={{ color: lvl.iconColor || lvl.color }} />}
                               {lvl.icon === 'crown' && <Crown size={32} style={{ color: lvl.iconColor || lvl.color }} />}
                               {lvl.icon === 'fire' && <Trophy size={32} style={{ color: lvl.iconColor || lvl.color }} />}
                             </div>
                           </div>
                           
                           <div className="text-center w-full mt-1">
                              <h4 className="font-bold px-1 leading-tight mb-1 break-words" style={{ color: lvl.textColor || '#1e293b', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.9rem', minHeight: '2.5rem' }} title={p.name}>{p.name}</h4>
                              <div className="flex items-center justify-center gap-1 mt-1 mb-1 relative z-10 cursor-pointer w-max mx-auto px-4 rounded-xl hover:bg-black/5" onClick={() => { setFlameSelectedPlayer(p); setModal('flameParticipantDetails'); }}>
                                <span className="font-black text-2xl" style={{ color: lvl.textColor || '#1e293b' }}>{p.currentStreak}</span>
                              </div>
                              <div className="text-[10px] font-bold uppercase tracking-wider opacity-80" style={{ color: lvl.textColor || '#64748b' }}>مرات متتالية</div>
                              
                              <p className="text-[10px] sm:text-[11px] font-black mt-2 uppercase tracking-widest px-2 py-1 bg-black/10 rounded-lg mx-auto inline-block truncate max-w-[95%]" style={{ color: lvl.textColor || '#475569' }}>{lvl.name}</p>
                              
                              {lvl.isWinner && settings.prizeText && (
                                <div className="mt-2 text-[10px] bg-amber-100 text-amber-800 py-1.5 px-2 rounded-lg font-bold truncate">
                                  🏆 {settings.prizeText}
                                </div>
                              )}
                           </div>
                        </div>`;

s = s.replace(oldCard, newCard);

// The truncate in App.tsx was already replaced by fix_all.cjs maybe? If oldCard didn't match, let's just make sure.

const oldCandidate = `<div className="text-xs font-bold text-slate-500 mt-0.5">
                                      {p.currentStreak} مرات · <span className="text-indigo-500">ينقصه {diff}</span>
                                    </div>`;

const newCandidate = `<div className="text-[11px] font-bold text-slate-500 mt-1">
                                      سلسلته الحالية: {p.currentStreak}
                                    </div>
                                    <div className="text-[11px] font-bold text-amber-600 mt-1 bg-amber-50 inline-block px-2 py-0.5 rounded border border-amber-100">
                                       يفصله حضور مبكر {diff === 1 ? 'واحد' : diff} عن دخول الشعلة
                                    </div>`;

s = s.replace(oldCandidate, newCandidate);

const oldCandidateName = `<h5 className="font-bold text-slate-800 text-sm truncate">{p.name}</h5>`;
const newCandidateName = `<h5 className="font-bold text-slate-800 text-sm leading-tight">{p.name}</h5>`;
s = s.replace(oldCandidateName, newCandidateName);

fs.writeFileSync('src/App.tsx', s);
console.log('done updating App.tsx flame cards!');
