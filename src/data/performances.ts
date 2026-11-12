export interface Stage {
  id: string;
  stageNumber: string; // "Stage One", "Stage Two", "Stage Three"
  title: string;
  writtenBy: string;
  summary: string;
  cast: Array<{ name: string; role: string }>;
  awards: Array<{ icon: string; name: string; recipient: string }>;
  images?: string[]; // Array of image paths
}

export interface Day {
  id: string;
  day: string; // "Monday 24th", "Tuesday 25th", etc.
  year: number;
  stages: Stage[];
}

// Play templates - define once, reuse across days
interface PlayTemplate {
  title: string;
  writtenBy: string;
  summary: string;
  defaultCast: Array<{ name: string; role: string }>;
}

const plays: Record<string, PlayTemplate> = {
  'learners-permit': {
    title: 'LEARNERS PERMIT',
    writtenBy: 'Alise Amarant',
    summary: 'Welcome to Manual Auto Body Shop, where a new kid is learning the ropes with a helpful team beside them. While we need a permit to drive, we don\'t need a permit to learn and be a part of the team.',
    defaultCast: []
  },
  'food-fight': {
    title: 'FOOD FIGHT',
    writtenBy: 'Alise Amarant',
    summary: 'Running a food truck can be a joy and a stress when the competition moves in. Carl has been there from the beginning and has a few stories up his sleeve of the ups and downs with his Hot Dog of a business.',
    defaultCast: []
  },
  'a-cut-above': {
    title: 'A CUT ABOVE THE REST',
    writtenBy: 'Alise Amarant',
    summary: 'June is the manager of her own salon, and her employees count on her — as well as the customers, the regulars and the walk-ins. We get all types in the salon, so have a seat and meet a few with us.',
    defaultCast: []
  },
  'tortellini-in-love': {
    title: 'TORTELLINI IN LOVE',
    writtenBy: 'Alise Amarant',
    summary: 'Impeccable service, French accents and three chefs who take pride in this family restaurant. Crème Brûlée has it all under control. No nonsense allowed.',
    defaultCast: []
  }
};

// Helper function to create a stage from a play template
function createStage(
  id: string,
  stageNumber: string,
  playKey: string,
  castOverride?: Array<{ name: string; role: string }>
): Stage {
  const play = plays[playKey];
  if (!play) {
    throw new Error(`Play template "${playKey}" not found`);
  }
  
  return {
    id,
    stageNumber,
    title: play.title,
    writtenBy: play.writtenBy,
    summary: play.summary,
    cast: castOverride || play.defaultCast,
    awards: []
  };
}

export const days: Day[] = [
  {
    id: 'monday-30th',
    day: 'Monday 30th',
    year: 2026,
    stages: [
      createStage('stage-one-monday', 'Stage One', 'learners-permit'),
      createStage('stage-two-monday', 'Stage Two', 'food-fight'),
      createStage('stage-three-monday', 'Stage Three', 'tortellini-in-love')
    ]
  },
  {
    id: 'tuesday-1st',
    day: 'Tuesday 1st',
    year: 2026,
    stages: [
      createStage('stage-two-tuesday-4pm', 'Stage Two · 4pm', 'food-fight'),
      createStage('stage-two-tuesday-5pm', 'Stage Two · 5pm', 'a-cut-above'),
      createStage('stage-three-tuesday', 'Stage Three', 'tortellini-in-love')
    ]
  },
  {
    id: 'wednesday-2nd',
    day: 'Wednesday 2nd',
    year: 2026,
    stages: [
      createStage('stage-one-wednesday', 'Stage One', 'learners-permit'),
      createStage('stage-two-wednesday', 'Stage Two', 'a-cut-above'),
      createStage('stage-three-wednesday', 'Stage Three', 'tortellini-in-love')
    ]
  },
  {
    id: 'thursday-friday',
    day: 'Thursday 3rd & Friday 4th',
    year: 2026,
    stages: [
      createStage('stage-one-thursday', 'Stage One · Thursday', 'learners-permit'),
      createStage('stage-two-thursday', 'Stage Two · Thursday', 'food-fight'),
      createStage('stage-two-friday', 'Stage Two · Friday', 'a-cut-above'),
      createStage('stage-three-thursday', 'Stage Three · Thursday', 'tortellini-in-love'),
    ]
  },
];
