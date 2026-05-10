const fs = require('fs');
let s = fs.readFileSync('src/App.tsx', 'utf8');

// Fix 1: add flameParticipantDetails to modal type
const oldModalState = `const [modal, setModal] = useState<'none' | 'reset' | 'clearList' | 'save' | 'resolvePending' | 'deleteAttendee' | 'debtDetails' | 'editPlayer' | 'deletePlayer' | 'confirmFinalDeletePlayer' | 'reactivatePlayer' | 'addPlayer' | 'editSession' | 'deleteSession' | 'duplicateSession' | 'allWeeklyDebts' | 'allMonthlyDebts' | 'addTeamDebt' | 'payTeamDebt' | 'addPlayerDebt' | 'addBudgetTransaction' | 'editTeamDebt' | 'financialSettings' | 'projectionDetails' | 'impactDetails' | 'leagueData' | 'confirmDeleteSubs' | 'systemRules' | 'deferSubscriptionReview' | 'payMonthlySubscription' | 'exportSettings' | 'exportPlayerTransactions' | 'createCompetition' | 'editCompetition' | 'compSettings' | 'roundManagement' | 'roundEntry' | 'resultsView' | 'exportResultsRound' | 'confirmSkipMonth' | 'confirmCompetitionAction' | 'confirmUnmarkPayment' | 'archiveList' | 'archivedCompDetails' | 'editArchivedComp' | 'excellenceBoard' | 'approveWinners' | 'editCheckInTime' | 'attendanceTimeConfig' | 'rosterClassificationConfig' | 'importAttendeesImage' | 'editBudgetTransaction' | 'compParticipantsList' | 'flameSettings'>('none');`;
const newModalState = `const [modal, setModal] = useState<'none' | 'reset' | 'clearList' | 'save' | 'resolvePending' | 'deleteAttendee' | 'debtDetails' | 'editPlayer' | 'deletePlayer' | 'confirmFinalDeletePlayer' | 'reactivatePlayer' | 'addPlayer' | 'editSession' | 'deleteSession' | 'duplicateSession' | 'allWeeklyDebts' | 'allMonthlyDebts' | 'addTeamDebt' | 'payTeamDebt' | 'addPlayerDebt' | 'addBudgetTransaction' | 'editTeamDebt' | 'financialSettings' | 'projectionDetails' | 'impactDetails' | 'leagueData' | 'confirmDeleteSubs' | 'systemRules' | 'deferSubscriptionReview' | 'payMonthlySubscription' | 'exportSettings' | 'exportPlayerTransactions' | 'createCompetition' | 'editCompetition' | 'compSettings' | 'roundManagement' | 'roundEntry' | 'resultsView' | 'exportResultsRound' | 'confirmSkipMonth' | 'confirmCompetitionAction' | 'confirmUnmarkPayment' | 'archiveList' | 'archivedCompDetails' | 'editArchivedComp' | 'excellenceBoard' | 'approveWinners' | 'editCheckInTime' | 'attendanceTimeConfig' | 'rosterClassificationConfig' | 'importAttendeesImage' | 'editBudgetTransaction' | 'compParticipantsList' | 'flameSettings' | 'flameParticipantDetails'>('none');`;
s = s.replace(oldModalState, newModalState);

// Fix 2: player property on tie breaker
const oldTie1 = `const nameA = a.name || a.player?.name || '';`;
const newTie1 = `const nameA = a.name || (a as any).player?.name || '';`;
s = s.replace(oldTie1, newTie1);

const oldTie2 = `const nameB = b.name || b.player?.name || '';`;
const newTie2 = `const nameB = b.name || (b as any).player?.name || '';`;
s = s.replace(oldTie2, newTie2);

// Fix 3: FlameLevel isWinner property
const oldType = `textColor?: string;
  iconColor?: string;
}`;
const newType = `textColor?: string;
  iconColor?: string;
  isWinner?: boolean;
}`;
s = s.replace(oldType, newType); // Hopefully this replaces the FlameLevel type, if not we will just cast to any

fs.writeFileSync('src/App.tsx', s);
console.log('done!');
