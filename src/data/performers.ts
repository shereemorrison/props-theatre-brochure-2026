import performerSource from './performerData.json';

export interface Performer {
  id: string;
  name: string;
  commitment: string;
  award: boolean;
  awards?: string[];
  photoUrl?: string;
  performances: PerformerPerformance[];
}

export interface PerformerPerformance {
  date: string;
  dayId: string;
  time: string;
  stage: string;
  stageId: string;
}

const DATES = {
  MONDAY: 'Monday, 30 November 2026',
  TUESDAY: 'Tuesday, 1 December 2026',
  WEDNESDAY: 'Wednesday, 2 December 2026',
  THURSDAY: 'Thursday, 3 December 2026',
  FRIDAY: 'Friday, 3 December 2026',
} as const;

const TIMES = {
  FOUR_TO_FIVE: '4:00 PM to 5:00 PM',
  FIVE_TO_SIX: '5:00 PM to 6:00 PM',
  SIX_TO_SEVEN: '6:00 PM to 7:00 PM',
} as const;

const STAGES = {
  ONE: 'Stage One',
  TWO: 'Stage Two',
  THREE: 'Stage Three',
} as const;

const AWARD_ELIGIBLE_PERFORMERS = new Set(performerSource.awardEligible);

const VALID_AWARD_COMMITMENTS = new Set([
  '2 years of drama',
  '4 years of drama',
  '5 years of drama',
  '6 years of drama',
  '7 years of drama',
  '8 years of drama',
  '9 years of drama',
  '10 years of drama',
  '1st Medal: 2 years of drama',
  '2nd Medal: 4 years of drama',
  '3rd Medal: 6 years of drama',
  'First Year Pin November',
  'First Year Pin Nov',
  'First Year Pin June',
]);

function normalizeCommitment(commitment: string): string {
  if (/^\d+\s+years?$/.test(commitment.trim())) {
    return commitment.trim() + ' of drama';
  }
  if (commitment.includes('First Year Pin Nov') && !commitment.includes('November')) {
    return commitment.replace('Nov', 'November');
  }
  return commitment;
}

function isInAwardList(name: string): boolean {
  const normalizedName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const firstName = name.split(/[\s\/]/)[0].toLowerCase();
  const lastName = name.split(/[\s\/]/).pop()?.toLowerCase() || '';

  return Array.from(AWARD_ELIGIBLE_PERFORMERS).some(awardName => {
    const awardNormalized = awardName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const awardFirstName = awardName.split(/[\s\/]/)[0].toLowerCase();
    const awardLastName = awardName.split(/[\s\/]/).pop()?.toLowerCase() || '';

    if (normalizedName === awardNormalized) return true;
    if (firstName === awardFirstName && lastName === awardLastName) return true;
    return false;
  });
}

function isValidAwardCommitment(commitment: string): boolean {
  const normalizedCommitment = normalizeCommitment(commitment);
  return VALID_AWARD_COMMITMENTS.has(normalizedCommitment);
}

function normalizeName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '-');
}

function mapDateToDayId(date: string): string {
  const dateMap: Record<string, string> = {
    [DATES.MONDAY]: 'monday-30th',
    [DATES.TUESDAY]: 'tuesday-1st',
    [DATES.WEDNESDAY]: 'wednesday-2nd',
    [DATES.THURSDAY]: 'thursday-friday',
    [DATES.FRIDAY]: 'thursday-friday',
  };
  return dateMap[date] || date.toLowerCase().replace(/[^a-z0-9]/g, '-');
}

function generateStageId(dayId: string, stage: string, date: string, time: string): string {
  const stageNumber = stage.replace('Stage ', '').toLowerCase();
  const dayPart = dayId.split('-')[0];

  if (date === DATES.TUESDAY && stage === STAGES.TWO) {
    if (time === TIMES.FOUR_TO_FIVE) return 'stage-two-tuesday-4pm';
    if (time === TIMES.FIVE_TO_SIX) return 'stage-two-tuesday-5pm';
  }

  if (date === DATES.FRIDAY && stage === STAGES.TWO) {
    return 'stage-two-friday';
  }

  return `stage-${stageNumber}-${dayPart}`;
}

function isFirstYearPin(commitment: string): boolean {
  return commitment.toLowerCase().includes('first year pin');
}

function createPerformer(
  name: string,
  commitment: string,
  date: string,
  time: string,
  stage: string,
  awards?: string[]
): Performer {
  const dayId = mapDateToDayId(date);
  const award = isInAwardList(name);

  let finalCommitment = '(None)';
  if (award && isValidAwardCommitment(commitment)) {
    finalCommitment = commitment;
  } else if (isFirstYearPin(commitment)) {
    finalCommitment = commitment;
  } else if (commitment.includes('Medal')) {
    finalCommitment = commitment;
  }

  return {
    id: normalizeName(name),
    name,
    commitment: finalCommitment,
    award,
    awards,
    performances: [
      {
        date,
        dayId,
        time,
        stage,
        stageId: generateStageId(dayId, stage, date, time)
      }
    ]
  };
}

interface PerformerEntry {
  name: string;
  commitment: string;
  awards?: string[];
}

interface PerformanceGroup {
  date: string;
  time: string;
  stage: string;
  performers: PerformerEntry[];
}

const performerData = performerSource.performerData as PerformanceGroup[];

const performersMap = new Map<string, Performer>();

performerData.forEach(group => {
  group.performers.forEach(entry => {
    const existingPerformer = performersMap.get(entry.name);

    if (existingPerformer) {
      const dayId = mapDateToDayId(group.date);
      existingPerformer.performances.push({
        date: group.date,
        dayId,
        time: group.time,
        stage: group.stage,
        stageId: generateStageId(dayId, group.stage, group.date, group.time)
      });
    } else {
      const performer = createPerformer(
        entry.name,
        entry.commitment,
        group.date,
        group.time,
        group.stage,
        entry.awards
      );
      performersMap.set(entry.name, performer);
    }
  });
});

export const performers: Performer[] = Array.from(performersMap.values());

export function getPerformersByDay(dayId: string): Performer[] {
  return performers.filter(performer =>
    performer.performances.some(perf => perf.dayId === dayId)
  );
}

export function getPerformersByStage(stageId: string): Performer[] {
  return performers.filter(performer =>
    performer.performances.some(perf => perf.stageId === stageId)
  );
}

export function getPerformersByStageAndDay(stageId: string, dayId: string): Performer[] {
  return performers.filter(performer =>
    performer.performances.some(perf => perf.stageId === stageId && perf.dayId === dayId)
  );
}

export function getPerformerById(id: string): Performer | undefined {
  return performers.find(p => p.id === id);
}

export function getPerformerByName(name: string): Performer | undefined {
  return performers.find(p => p.name === name);
}
