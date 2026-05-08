  const renderFlameHome = () => {
    const settings = userSettings.flameSettings || {
      isEnabled: true, mainCount: 5, candidateCount: 5, winThreshold: 20, prizeText: 'درع الشعلة', showCandidates: true, showChanges: true,
      levels: [
        { id: '1', name: 'بداية الاشتعال', min: 1, max: 3, color: '#a855f7', icon: 'small' },
        { id: '2', name: 'اشتعال متقدم', min: 4, max: 7, color: '#3b82f6', icon: 'medium' },
        { id: '3', name: 'شعلة قوية', min: 8, max: 12, color: '#ef4444', icon: 'large' },
        { id: '4', name: 'القمة', min: 13, max: 20, color: '#eab308', icon: 'crown' }
      ]
    };

    if (!settings.isEnabled) {
      return (
        <div className="text-center py-20">
           <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Flame size={40} className="text-slate-300" />
           </div>
           <h3 className="text-xl font-black text-slate-800 mb-2">الشعلة معطلة</h3>
           <p className="text-slate-500 mb-6">قم بتفعيل ميزة الشعلة التحفيزية لاحتساب الحضور المبكر المتوالي للاعبين.</p>
           <button onClick={() => setModal('flameSettings')} className="bg-orange-500 text-white px-6 py-2.5 rounded-xl font-bold shadow-sm">تفعيل وإعداد الشعلة</button>
        </div>
      );
    }

    const mainList = flameData.slice(0, settings.mainCount);
    const candidateList = flameData.slice(settings.mainCount, settings.mainCount + settings.candidateCount);

    const getPlayerLevel = (streak: number) => {
        if (streak >= settings.winThreshold) return { ...settings.levels[settings.levels.length - 1], isWinner: true, name: 'فائز بالشعلة', color: '#f59e0b', icon: 'fire' };
        for (let i = settings.levels.length - 1; i >= 0; i--) {
           if (streak >= settings.levels[i].min) return settings.levels[i];
        }
        return settings.levels[0] || { color: '#a855f7', icon: 'small', name: 'بداية الاشتعال' };
    };

    return (
      <div className="space-y-8" dir="rtl">
         {/* Flame Header */}
         <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-5 rounded-3xl shadow-sm border border-orange-100">
             <div className="flex items-center gap-4 text-orange-600">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
                   <Flame size={28} />
                </div>
                <div>
                   <h2 className="text-2xl font-black">شعلة الحضور المبكر</h2>
                   <p className="text-sm font-medium text-orange-700/70">أصحاب أطول سلسلة حضور مبكر متوالي</p>
                </div>
             </div>
             <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                <button onClick={() => {}} className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 whitespace-nowrap transition-colors">
                  <Download size={18} />
                  تصدير صورة
                </button>
                <button onClick={() => setModal('flameSettings')} className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 whitespace-nowrap transition-colors">
                  <Settings size={18} />
                  الإعدادات
                </button>
             </div>
         </div>

         {/* Main Flame Board */}
         <div id="flame-board-export" className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8">
            <h3 className="text-xl font-black text-slate-800 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-l from-orange-600 to-amber-500">🔥 أبطال الشعلة</h3>
            
            {mainList.length === 0 ? (
               <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-slate-500 font-bold">لا توجد سلاسل حضور مبكر متوالية حتى الآن.</p>
               </div>
            ) : (
               <div className={`grid gap-4 ${
                  mainList.length <= 3 ? 'grid-cols-1 sm:grid-cols-3 md:max-w-4xl mx-auto' : 
                  mainList.length <= 5 ? 'grid-cols-1 sm:grid-cols-3 lg:grid-cols-5' :
                  mainList.length <= 10 ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5' : 
                  'grid-cols-2 sm:grid-cols-4 lg:grid-cols-6'
               }`}>
                  {mainList.map((p, idx) => {
                     const lvl = getPlayerLevel(p.currentStreak);
                     return (
                        <div key={p.id} className="relative bg-gradient-to-b from-slate-50 to-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-3 overflow-hidden group hover:-translate-y-1 transition-transform">
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
                        </div>
                     );
                  })}
               </div>
            )}
            
            {/* Candidates Section */}
            {settings.showCandidates && (
              <div className="mt-12 pt-8 border-t border-slate-100">
                 <h4 className="font-bold text-slate-700 mb-6 flex items-center gap-2">
                   <Target size={18} className="text-indigo-500" />
                   الأقرب لدخول الشعلة
                 </h4>
                 
                 {candidateList.length === 0 ? (
                    <div className="text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-sm font-medium text-slate-400">
                       لا يوجد مرشحون حاليًا.
                    </div>
                 ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
                       {candidateList.map((p, idx) => {
                          const diff = mainList.length > 0 ? mainList[mainList.length - 1].currentStreak - p.currentStreak + 1 : 1;
                          return (
                            <div key={p.id} className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center justify-between">
                               <div className="flex items-center gap-3 w-full">
                                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center text-xs shrink-0">
                                    {(mainList.length) + idx + 1}
                                  </div>
                                  <div className="min-w-0">
                                    <h5 className="font-bold text-slate-800 text-sm truncate">{p.name}</h5>
                                    <div className="text-xs font-bold text-slate-500 mt-0.5">
                                      {p.currentStreak} مرات · <span className="text-indigo-500">ينقصه {diff}</span>
                                    </div>
                                  </div>
                               </div>
                            </div>
                          );
                       })}
                    </div>
                 )}
              </div>
            )}
         </div>

         {/* Changes & Logs */}
         {settings.showChanges && (
           <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
              <h4 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
                 <Activity size={18} className="text-blue-500" />
                 آخر تغيّرات الشعلة
              </h4>
              <div className="text-center py-8 text-slate-400 font-medium bg-slate-50 rounded-xl border border-dashed border-slate-200 text-sm">
                 لا توجد تغيّرات حديثة في الشعلة.
              </div>
           </div>
         )}
      </div>
    );
  };

  const flameData = useMemo(() => {
    const settings = userSettings.flameSettings || {
      isEnabled: true, mainCount: 5, candidateCount: 5, winThreshold: 20, prizeText: 'درع الشعلة', showCandidates: true, showChanges: true,
      levels: [
        { id: '1', name: 'بداية الاشتعال', min: 1, max: 3, color: '#a855f7', icon: 'small' },
        { id: '2', name: 'اشتعال متقدم', min: 4, max: 7, color: '#3b82f6', icon: 'medium' },
        { id: '3', name: 'شعلة قوية', min: 8, max: 12, color: '#ef4444', icon: 'large' },
        { id: '4', name: 'القمة', min: 13, max: 20, color: '#eab308', icon: 'crown' }
      ]
    };

    if (!settings.isEnabled) return [];

    const validSessions = sessions
      .filter((s:any) => s.attendees && s.attendees.some((a:any) => isAttendeePresent(a)))
      .sort((a:any,b:any) => {
        const da = a.date ? new Date(a.date).getTime() : new Date(a.createdAt || 0).getTime();
        const db = b.date ? new Date(b.date).getTime() : new Date(b.createdAt || 0).getTime();
        return db - da; // Descending (newest first)
      });

    const parsedData = players.map(player => {
        let currentStreak = 0;
        let totalEarlyCount = 0;
        let totalAttendanceCount = 0;
        let totalLateCount = 0;
        let checkInMinutesArr: number[] = [];
        let earliestPaymentTS = Infinity;
        let prevMutualSessions: any[] = [];
        let earlySessions: string[] = [];
        let winAchieved = false;

        if (player.monthlySubscriptions) {
            Object.values(player.monthlySubscriptions).forEach((sub: any) => {
                if (sub.isPaid && sub.paymentDate) {
                   const ts = new Date(sub.paymentDate).getTime();
                   if (ts < earliestPaymentTS) earliestPaymentTS = ts;
                }
            });
        }
        
        let streakActive = true;
        
        validSessions.forEach(session => {
            const attendee = session.attendees?.find((a:any) => a.playerId === player.id || (!a.playerId && a.name === player.name));
            const sessionDateStr = session.date || new Date(session.createdAt || 0).toISOString();
            
            if (attendee && isAttendeePresent(attendee)) {
                totalAttendanceCount++;
                if (attendee.checkInTime) {
                    const [h,m] = attendee.checkInTime.split(':').map(Number);
                    checkInMinutesArr.push(h*60 + m);
                    prevMutualSessions.push({ date: sessionDateStr, time: attendee.checkInTime, ms: h*60*60*1000 + m*60*1000 });
                }

                if (isAttendeeEarly(attendee)) {
                    totalEarlyCount++;
                    earlySessions.push(sessionDateStr);
                    if (streakActive) {
                       currentStreak++;
                       if (currentStreak >= settings.winThreshold) winAchieved = true;
                    }
                } else if (isAttendeeLate(attendee)) {
                    totalLateCount++;
                    if (streakActive) streakActive = false;
                } else {
                    if (streakActive) streakActive = false; 
                }
            } else {
                if (streakActive) streakActive = false;
            }
        });
        
        const avgCheckIn = checkInMinutesArr.length > 0 ? checkInMinutesArr.reduce((a,b)=>a+b, 0) / checkInMinutesArr.length : Infinity;
        
        return {
            ...player,
            currentStreak,
            totalEarlyCount,
            totalAttendanceCount,
            totalLateCount,
            earliestPaymentTS: earliestPaymentTS === Infinity ? 9999999999999 : earliestPaymentTS,
            avgCheckIn,
            prevMutualSessions,
            earlySessions,
            winAchieved
        };
    }).filter(p => p.currentStreak > 0 || p.totalEarlyCount > 0);

    return parsedData.sort((a,b) => {
      if (b.currentStreak !== a.currentStreak) return b.currentStreak - a.currentStreak;
      if (b.totalEarlyCount !== a.totalEarlyCount) return b.totalEarlyCount - a.totalEarlyCount;
      if (b.totalAttendanceCount !== a.totalAttendanceCount) return b.totalAttendanceCount - a.totalAttendanceCount;
      if (a.totalLateCount !== b.totalLateCount) return a.totalLateCount - b.totalLateCount;
      
      const aMutual = a.prevMutualSessions;
      const bMutual = b.prevMutualSessions;
      if (aMutual && bMutual && aMutual.length > 0 && bMutual.length > 0) {
         const bDates = new Set(bMutual.map((m:any) => m.date));
         const mutualDates = aMutual.filter((m:any) => bDates.has(m.date)).sort((x:any, y:any) => new Date(y.date).getTime() - new Date(x.date).getTime());
         if (mutualDates.length > 0) {
            const lastMutualDate = mutualDates[0].date;
            const aSession = aMutual.find((m:any) => m.date === lastMutualDate);
            const bSession = bMutual.find((m:any) => m.date === lastMutualDate);
            if (aSession && bSession && aSession.ms !== bSession.ms) {
               return aSession.ms - bSession.ms;
            }
         }
      }

      if (a.earliestPaymentTS !== b.earliestPaymentTS) return a.earliestPaymentTS - b.earliestPaymentTS;
      
      const nameA = a.name || a.player?.name || '';
      const nameB = b.name || b.player?.name || '';
      return nameA.localeCompare(nameB, 'ar');
    });

  }, [players, sessions, userSettings.flameSettings]);

  const renderFlameHome = () => {
     // ... flame ui
  };
