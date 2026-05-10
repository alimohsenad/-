const fs = require('fs');
let s = fs.readFileSync('src/App.tsx', 'utf8');

// Fix 1: getFlamePlayerLevel logic
s = s.replace(
/const getPlayerLevel = \(streak: number\) => \{[\s\S]*?\};\n/,
`const getPlayerLevel = (streak: number) => {
        if (!settings.levels || settings.levels.length === 0) return { name: 'غير مصنف', color: '#94a3b8', bgColor: '#f1f5f9', textColor: '#64748b', iconColor: '#94a3b8', icon: 'small' };
        if (streak >= settings.winThreshold) return { ...settings.levels[settings.levels.length - 1], isWinner: true, name: 'فائز بالشعلة', color: '#f59e0b', icon: 'fire' };
        for (let i = settings.levels.length - 1; i >= 0; i--) {
           if (streak >= settings.levels[i].min) return settings.levels[i];
        }
        return { name: 'غير مصنف', color: '#94a3b8', bgColor: '#f1f5f9', textColor: '#64748b', iconColor: '#94a3b8', icon: 'small' };
    };\n`
);

// Fix 2: NaN issue inside ties
const tieOld = "compareText = `أخي ${p.name}، أنت متساوٍ مع ${prev.name} في سلسلة الحضور المبكر، لكن تم تقديمه عليك لأن وقت حضوره كان أبكر في بعض التمارين. على سبيل المثال: في تمرين ${formattedDate} حضر قبلك بـ ${Math.round(Math.abs(aSession.ms - bSession.ms) / 60000)} دقيقة.`;";
const tieNew = "const diff = Math.round(Math.abs(aSession.ms - bSession.ms) / 60000);\n                          if (isNaN(diff)) {\n                             compareText = `أخي ${p.name}، أنت متساوٍ تمامًا مع ${prev.name} في كل سجلات النظام المتاحة، لذا تم كسر التعادل وتقديمه عليك وفق الترتيب الأبجدي للاسم.`;\n                          } else {\n                             compareText = `أخي ${p.name}، أنت متساوٍ مع ${prev.name} في سلسلة الحضور المبكر، لكن تم تقديمه عليك لأن وقت حضوره كان أبكر في بعض التمارين. على سبيل المثال: في تمرين ${formattedDate} حضر قبلك بـ ${diff} دقيقة.`;\n                          }";
s = s.replace(tieOld, tieNew);

// Fix 3: Player Name Truncation
s = s.replace(/<h4 className=\{\`font-bold \$\{(.*?)\} truncate px-2\`\} style=\{!textColor\.startsWith\('text-'\) \? \{ color: textColor \} : \{\}\} title=\{p\.name\}>\{p\.name\}<\/h4>/g,
  "<h4 className={`font-bold ${$1} px-1 leading-tight mb-1`} style={!textColor.startsWith('text-') ? { color: textColor, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.85rem', minHeight: '2.5rem' } : { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.85rem', minHeight: '2.5rem' }} title={p.name}>{p.name}</h4>");

fs.writeFileSync('src/App.tsx', s);
console.log('done!');
