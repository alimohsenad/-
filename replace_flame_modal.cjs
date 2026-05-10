const fs = require('fs');

let s = fs.readFileSync('src/App.tsx', 'utf8');

const oldRegex = /const flameSettingsModal = \([\s\S]*?\n  \);(?:(?!const archiveListModal = \().)*/;

const newCode = `
  const colorPalettes = {
    soft: ['#ffffff', '#f8fafc', '#f1f5f9', '#fee2e2', '#ffedd5', '#fef3c7', '#dcfce7', '#e0e7ff', '#fae8ff', '#fce7f3'],
    medium: ['#94a3b8', '#64748b', '#f87171', '#fb923c', '#fbbf24', '#4ade80', '#2dd4bf', '#38bdf8', '#818cf8', '#c084fc', '#f472b6'],
    strong: ['#0f172a', '#1e293b', '#334155', '#ef4444', '#f97316', '#f59e0b', '#16a34a', '#0d9488', '#0284c7', '#4f46e5', '#9333ea', '#db2777']
  };

  const getActiveFlameSettings = () => {
    return userSettings.flameSettings || { isEnabled: true, mainCount: 5, candidateCount: 5, winThreshold: 20, prizeText: 'درع الشعلة', showCandidates: true, showChanges: true, levels: [{id: '1', name: 'بداية', min: 1, max: 99, color: '#ef4444', bgColor: '#fee2e2', textColor: '#ef4444', iconColor: '#ef4444', icon: 'small'}] };
  };

  const updateFlameSettings = (updates: any) => {
    setUserSettings(prev => ({
      ...prev,
      flameSettings: { ...getActiveFlameSettings(), ...updates }
    }));
  };

  const updateLevel = (index: number, updates: any) => {
    const s = getActiveFlameSettings();
    if (s.levels) {
       const newLevels = [...s.levels];
       newLevels[index] = { ...newLevels[index], ...updates };
       updateFlameSettings({ levels: newLevels });
    }
  };

  const [activeColorTab, setActiveColorTab] = useState<'soft'|'medium'|'strong'>('soft');
  const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);
  
  // ensure selectedLevelId is valid
  const currentLvlIdx = getActiveFlameSettings().levels?.findIndex(l => l.id === selectedLevelId) ?? -1;
  const currentLvl = currentLvlIdx >= 0 ? getActiveFlameSettings().levels![currentLvlIdx] : getActiveFlameSettings().levels?.[0];

  const flameSettingsModal = (
    <Modal isOpen={modal === 'flameSettings'} onClose={() => setModal('none')} title="إعدادات شعلة الحضور المبكر">
      <div className="text-right" dir="rtl">
        {/* Tabs */}
        <div className="flex border-b border-slate-200 mb-4 overflow-x-auto custom-scrollbar pb-1">
           <button onClick={() => setFlameSettingsTab('basic')} className={\`whitespace-nowrap px-4 py-2 font-bold text-sm border-b-2 transition-colors \${flameSettingsTab === 'basic' ? 'border-orange-500 text-orange-600' : 'border-transparent text-slate-500 hover:text-slate-700'}\`}>الأساسية</button>
           <button onClick={() => setFlameSettingsTab('levels')} className={\`whitespace-nowrap px-4 py-2 font-bold text-sm border-b-2 transition-colors \${flameSettingsTab === 'levels' ? 'border-orange-500 text-orange-600' : 'border-transparent text-slate-500 hover:text-slate-700'}\`}>مستويات الشعلة</button>
           <button onClick={() => { setFlameSettingsTab('cards'); if (!selectedLevelId && getActiveFlameSettings().levels?.[0]) setSelectedLevelId(getActiveFlameSettings().levels![0].id); }} className={\`whitespace-nowrap px-4 py-2 font-bold text-sm border-b-2 transition-colors \${flameSettingsTab === 'cards' ? 'border-orange-500 text-orange-600' : 'border-transparent text-slate-500 hover:text-slate-700'}\`}>ألوان البطاقات</button>
           <button onClick={() => { setFlameSettingsTab('preview'); if (!selectedLevelId && getActiveFlameSettings().levels?.[0]) setSelectedLevelId(getActiveFlameSettings().levels![0].id); }} className={\`whitespace-nowrap px-4 py-2 font-bold text-sm border-b-2 transition-colors \${flameSettingsTab === 'preview' ? 'border-orange-500 text-orange-600' : 'border-transparent text-slate-500 hover:text-slate-700'}\`}>المعاينة</button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto pr-1 pb-4">
          
          {flameSettingsTab === 'basic' && (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2">
              <label className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-200 cursor-pointer">
                <div>
                  <span className="block font-bold text-orange-900 mb-1">تفعيل الشعلة</span>
                  <span className="block text-xs font-medium text-orange-700/70">تفعيل هذه الخاصية سيظهرها في واجهة رصيد اللاعبين.</span>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" checked={getActiveFlameSettings().isEnabled !== false} onChange={(e) => updateFlameSettings({ isEnabled: e.target.checked })} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" style={{ right: getActiveFlameSettings().isEnabled !== false ? '0' : 'x', left: getActiveFlameSettings().isEnabled !== false ? 'x' : '0' }} />
                  <label className={\`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer \${getActiveFlameSettings().isEnabled !== false ? 'bg-orange-500' : 'bg-slate-300'}\`}></label>
                </div>
              </label>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">أبطال الشعلة الأساسية</label>
                  <input type="number" className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg focus:border-indigo-500 p-2.5 font-bold" value={getActiveFlameSettings().mainCount || 5} onChange={(e) => updateFlameSettings({ mainCount: parseInt(e.target.value) || 0 })} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">المرشحون للسباق</label>
                  <input type="number" className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg focus:border-indigo-500 p-2.5 font-bold" value={getActiveFlameSettings().candidateCount ?? 5} onChange={(e) => updateFlameSettings({ candidateCount: parseInt(e.target.value) || 0 })} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">مرات الفوز المطلوبة</label>
                  <input type="number" className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg focus:border-indigo-500 p-2.5 font-bold" value={getActiveFlameSettings().winThreshold || 20} onChange={(e) => updateFlameSettings({ winThreshold: parseInt(e.target.value) || 0 })} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2">جائزة الشعلة</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg focus:border-indigo-500 p-2.5 font-bold" value={getActiveFlameSettings().prizeText || 'درع الشعلة'} onChange={(e) => updateFlameSettings({ prizeText: e.target.value })} />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 cursor-pointer bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <input type="checkbox" checked={getActiveFlameSettings().showCandidates !== false} onChange={(e) => updateFlameSettings({ showCandidates: e.target.checked })} /> إظهار قائمة المرشحين
                </label>
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 cursor-pointer bg-slate-50 p-3 rounded-lg border border-slate-100 mt-2">
                  <input type="checkbox" checked={getActiveFlameSettings().showChanges !== false} onChange={(e) => updateFlameSettings({ showChanges: e.target.checked })} /> إظهار آخر تغييرات الشعلة
                </label>
              </div>
            </div>
          )}

          {flameSettingsTab === 'levels' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100 mb-2">
                 <div>
                    <h4 className="font-bold text-slate-800 flex items-center gap-2"><Trophy size={18} className="text-indigo-500" /> مستويات ترتيب اللاعبين</h4>
                    <p className="text-xs text-slate-500 mt-1">تتحدد أسماء مستويات اللاعبين بناءً على هذه الإعدادات ولن تظهر إعدادات قديمة.</p>
                 </div>
                 <button onClick={() => {
                   const newLevels = [...(getActiveFlameSettings().levels || [])];
                   newLevels.push({ id: Math.random().toString(36).substring(7), name: 'مستوى جديد', min: 1, max: 99, color: '#34d399', bgColor: '#dcfce7', textColor: '#16a34a', iconColor: '#22c55e', icon: 'small' });
                   updateFlameSettings({ levels: newLevels });
                 }} className="bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-2 rounded-lg font-bold flex items-center gap-1 text-sm shadow-sm transition-colors">
                   <Plus size={16} /> مستوى جديد
                 </button>
              </div>
              
              <div className="space-y-3">
                 {(getActiveFlameSettings().levels || []).map((lvl, index) => (
                    <div key={lvl.id} className="bg-white border border-slate-200 p-4 rounded-xl flex items-center gap-4 hover:border-indigo-300 transition-colors">
                       <div className="flex-1 grid grid-cols-2 gap-4">
                          <div>
                             <label className="block text-[10px] text-slate-500 font-bold mb-1 uppercase">اسم المستوى</label>
                             <input type="text" value={lvl.name} onChange={(e) => updateLevel(index, { name: e.target.value })} className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg p-2 font-black outline-none focus:border-indigo-500 focus:bg-white transition-all shadow-sm" placeholder="الاسم" />
                          </div>
                          <div>
                             <label className="block text-[10px] text-slate-500 font-bold mb-1 uppercase">الحد الأدنى للمرات</label>
                             <input type="number" value={lvl.min} onChange={(e) => updateLevel(index, { min: parseInt(e.target.value) || 0 })} className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg p-2 font-black outline-none focus:border-indigo-500 focus:bg-white transition-all shadow-sm" placeholder="مثال: 5" />
                          </div>
                       </div>
                       <button onClick={() => {
                          const arr = getActiveFlameSettings().levels!.filter((_, i) => i !== index);
                          updateFlameSettings({ levels: arr });
                          if (selectedLevelId === lvl.id) setSelectedLevelId(arr[0]?.id || null);
                       }} className="text-red-400 hover:text-red-600 bg-red-50 hover:bg-red-100 p-3 rounded-xl transition-colors mt-4 self-center">
                         <Trash2 size={18} />
                       </button>
                    </div>
                 ))}
              </div>
            </div>
          )}

          {flameSettingsTab === 'cards' && (
            <div className="space-y-5 flex flex-col items-center animate-in fade-in slide-in-from-bottom-2">
              {!(getActiveFlameSettings().levels?.length) ? (
                 <div className="text-center p-8 bg-slate-50 rounded-xl border border-slate-200 w-full">
                    <p className="text-sm font-bold text-slate-500">الرجاء إضافة مستويات أولاً.</p>
                 </div>
              ) : (
                 <>
                   <div className="w-full">
                     <label className="block text-sm font-bold text-slate-700 mb-2">اختر المستوى لتعديل ألوانه:</label>
                     <select className="w-full bg-white border border-slate-200 p-3 rounded-xl font-bold text-slate-800 focus:border-indigo-500 outline-none shadow-sm" value={selectedLevelId || ''} onChange={e => setSelectedLevelId(e.target.value)}>
                        {getActiveFlameSettings().levels!.map(l => (
                          <option key={l.id} value={l.id}>{l.name}</option>
                        ))}
                     </select>
                   </div>
                   
                   {currentLvl && currentLvlIdx >= 0 && (
                     <div className="w-full bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                        <div className="mb-5">
                          <label className="block text-sm font-bold text-slate-700 mb-3">لون خلفية البطاقة</label>
                          <div className="flex bg-slate-100 p-1 rounded-lg mb-4">
                            <button onClick={() => setActiveColorTab('soft')} className={\`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors \${activeColorTab === 'soft' ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-500 hover:bg-slate-200'}\`}>هادئة</button>
                            <button onClick={() => setActiveColorTab('medium')} className={\`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors \${activeColorTab === 'medium' ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-500 hover:bg-slate-200'}\`}>متوسطة</button>
                            <button onClick={() => setActiveColorTab('strong')} className={\`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors \${activeColorTab === 'strong' ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-500 hover:bg-slate-200'}\`}>قوية</button>
                          </div>
                          <div className="grid grid-cols-6 gap-3 mb-4">
                             {colorPalettes[activeColorTab].map(c => (
                               <div key={c} onClick={() => {
                                  updateLevel(currentLvlIdx, { bgColor: c, color: c });
                                  // Auto set text color for readability if picking a strong background
                                  if (activeColorTab === 'strong') {
                                     updateLevel(currentLvlIdx, { textColor: '#ffffff' });
                                  } else if (activeColorTab === 'soft') {
                                     updateLevel(currentLvlIdx, { textColor: '#1e293b' });
                                  }
                               }} className={\`cursor-pointer w-10 h-10 rounded-full flex items-center justify-center border-2 transition-transform hover:scale-105 active:scale-95 mx-auto \${currentLvl.bgColor === c ? 'border-indigo-500 shadow-md scale-110' : 'border-transparent shadow-sm'}\`} style={{ backgroundColor: c }}>
                                  {currentLvl.bgColor === c && <CheckCircle size={16} className={activeColorTab === 'strong' ? 'text-white' : 'text-slate-800'} />}
                               </div>
                             ))}
                          </div>
                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-500">أو اضبط لونًا مخصصًا:</span>
                            <button onClick={() => setCustomColorPicker({ id: currentLvl.id, type: 'bg' })} className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs transition-colors flex items-center gap-1">
                               <Plus size={14} /> لون مخصص
                            </button>
                            {customColorPicker?.id === currentLvl.id && customColorPicker.type === 'bg' && (
                               <div className="absolute mt-10 z-20 bg-white p-2 rounded-lg shadow-xl border border-slate-200">
                                  <input type="color" value={currentLvl.bgColor && !currentLvl.bgColor.startsWith('bg-') ? currentLvl.bgColor : '#ffffff'} onChange={e => updateLevel(currentLvlIdx, { bgColor: e.target.value, color: e.target.value })} className="w-16 h-10 rounded cursor-pointer" />
                                  <button onClick={() => setCustomColorPicker(null)} className="w-full mt-2 bg-indigo-600 text-white text-xs py-1 rounded font-bold">تم</button>
                               </div>
                            )}
                          </div>
                        </div>

                        <div className="border-t border-slate-100 pt-5 mb-5">
                          <label className="block text-sm font-bold text-slate-700 mb-3">لون الآيقونة</label>
                          <div className="flex gap-3">
                             {['#ffffff', '#000000', '#fbbf24', '#f87171', '#3b82f6'].map(c => (
                               <div key={c} onClick={() => updateLevel(currentLvlIdx, { iconColor: c })} className={\`cursor-pointer w-10 h-10 rounded-full flex items-center justify-center border-2 transition-transform hover:scale-105 active:scale-95 \${currentLvl.iconColor === c ? 'border-indigo-500 shadow-md scale-110' : 'border-slate-200 shadow-sm'}\`} style={{ backgroundColor: c }}>
                                  {currentLvl.iconColor === c && <CheckCircle size={16} className={['#ffffff', '#fbbf24'].includes(c) ? 'text-slate-800' : 'text-white'} />}
                               </div>
                             ))}
                             <button onClick={() => setCustomColorPicker({ id: currentLvl.id, type: 'icon' })} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 hover:bg-slate-200 relative">
                                <Plus size={18} className="text-slate-500" />
                                {customColorPicker?.id === currentLvl.id && customColorPicker.type === 'icon' && (
                                   <div className="absolute top-12 left-0 z-20 bg-white p-2 rounded-lg shadow-xl border border-slate-200">
                                      <input type="color" value={currentLvl.iconColor || currentLvl.color || '#3b82f6'} onChange={e => updateLevel(currentLvlIdx, { iconColor: e.target.value })} className="w-16 h-10 rounded cursor-pointer" />
                                      <button onClick={(e) => { e.stopPropagation(); setCustomColorPicker(null); }} className="w-full mt-2 bg-indigo-600 text-white text-xs py-1 rounded font-bold">تم</button>
                                   </div>
                                )}
                             </button>
                          </div>
                        </div>

                        <div className="border-t border-slate-100 pt-5">
                          <label className="block text-sm font-bold text-slate-700 mb-3">شكل الآيقونة</label>
                          <div className="flex flex-wrap gap-3">
                            {[
                               { val: 'small', el: <Flame size={20} /> },
                               { val: 'medium', el: <Flame size={24} /> },
                               { val: 'large', el: <Flame size={28} /> },
                               { val: 'crown', el: <Crown size={24} /> },
                               { val: 'fire', el: <Trophy size={24} /> }
                            ].map(iconSetup => (
                               <div key={iconSetup.val} onClick={() => updateLevel(currentLvlIdx, { icon: iconSetup.val })} className={\`cursor-pointer w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-colors active:scale-95 \${currentLvl.icon === iconSetup.val ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'}\`}>
                                 {iconSetup.el}
                               </div>
                            ))}
                          </div>
                        </div>
                     </div>
                   )}
                 </>
              )}
            </div>
          )}

          {flameSettingsTab === 'preview' && (
            <div className="space-y-5 flex flex-col items-center animate-in fade-in slide-in-from-bottom-2">
              {!(getActiveFlameSettings().levels?.length) ? (
                 <div className="text-center p-8 bg-slate-50 rounded-xl border border-slate-200 w-full">
                    <p className="text-sm font-bold text-slate-500">الرجاء إضافة مستويات أولاً للمعاينة.</p>
                 </div>
              ) : (
                <>
                 <div className="w-full">
                   <select className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl font-bold text-slate-800 focus:border-indigo-500 outline-none shadow-sm mb-6" value={selectedLevelId || ''} onChange={e => setSelectedLevelId(e.target.value)}>
                      {getActiveFlameSettings().levels!.map(l => (
                        <option key={l.id} value={l.id}>{l.name}</option>
                      ))}
                   </select>
                 </div>

                 {currentLvl && (
                 <div className="w-full max-w-xs mx-auto">
                    <h5 className="text-center font-bold text-slate-500 mb-3 text-sm">شكل البطاقة التجريبية</h5>
                    <div className="relative group shrink-0 min-w-[150px] sm:min-w-[160px] w-full snap-center pb-2 cursor-default">
                       <div className="w-full flex flex-col items-center p-3 sm:p-4 rounded-3xl transition-all duration-300 shadow-sm border border-black/5" style={{ backgroundColor: currentLvl.bgColor || currentLvl.color || '#ffffff' }}>
                         <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full shadow-sm flex items-center justify-center text-xs font-black ring-2 ring-white/50" style={{ backgroundColor: currentLvl.iconColor || currentLvl.color || '#3b82f6', color: '#fff' }}>
                            1
                         </div>
                         <div className="relative mt-2 mb-3">
                           <div className="absolute -inset-2 rounded-full opacity-20 blur-md animate-pulse" style={{ backgroundColor: currentLvl.iconColor || currentLvl.color || '#e2e8f0' }}></div>
                           <div className="w-16 h-16 rounded-full bg-white shadow-sm border-2 flex items-center justify-center relative z-10" style={{ borderColor: currentLvl.iconColor || currentLvl.color || '#e2e8f0' }}>
                             {currentLvl.icon === 'small' && <Flame size={24} style={{ color: currentLvl.iconColor || currentLvl.color }} opacity={0.6} />}
                             {currentLvl.icon === 'medium' && <Flame size={32} style={{ color: currentLvl.iconColor || currentLvl.color }} opacity={0.8} />}
                             {currentLvl.icon === 'large' && <Flame size={40} style={{ color: currentLvl.iconColor || currentLvl.color }} />}
                             {currentLvl.icon === 'crown' && <Crown size={36} style={{ color: currentLvl.iconColor || currentLvl.color }} />}
                             {currentLvl.icon === 'fire' && <Trophy size={36} style={{ color: currentLvl.iconColor || currentLvl.color }} />}
                           </div>
                         </div>
                         <div className="text-center w-full">
                            <h4 className="font-bold px-1 leading-tight mb-1" style={{ color: currentLvl.textColor || '#1e293b', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '1rem', minHeight: '3rem' }}>اسم اللاعب هنا</h4>
                            <div className="flex items-center justify-center gap-1 mt-1 mb-1">
                              <span className="font-black text-2xl h-8 flex items-center justify-center" style={{ color: currentLvl.textColor || '#1e293b' }}>{currentLvl.min || 5}</span>
                            </div>
                            <div className="text-[10px] font-bold uppercase tracking-wider opacity-80" style={{ color: currentLvl.textColor || '#64748b' }}>مرات متتالية</div>
                            <p className="text-[11px] font-black mt-2 uppercase tracking-widest px-2 py-1 bg-black/10 rounded-lg mx-auto inline-block truncate max-w-[90%]" style={{ color: currentLvl.textColor || '#475569' }}>{currentLvl.name}</p>
                         </div>
                       </div>
                    </div>
                 </div>
                 )}
                 </>
              )}
            </div>
          )}

        </div>
      </div>
    </Modal>
  );
`;

s = s.replace(oldRegex, newCode);

fs.writeFileSync('src/App.tsx', s);
console.log('done!');
