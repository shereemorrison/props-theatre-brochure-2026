import { readdir, mkdir, copyFile, unlink } from 'fs/promises';
import { existsSync, statSync, writeFileSync } from 'fs';
import { join, extname, basename } from 'path';
import sharp from 'sharp';

const PHOTOS_ROOT = '/Users/shereeemorrison/Downloads/PROGRAM PHOTOS 2026';
const PERFORMERS_DIR = './src/assets/images/performers';
const DATA_PATH = './src/data/performerData.json';

const DATES = {
  MONDAY: 'Monday, 2 November 2026',
  TUESDAY: 'Tuesday, 3 November 2026',
  WEDNESDAY: 'Wednesday, 4 November 2026',
  THURSDAY: 'Thursday, 5 November 2026',
  FRIDAY: 'Friday, 6 November 2026',
};

const TIMES = {
  FOUR_TO_FIVE: '4:00 PM to 5:00 PM',
  FIVE_TO_SIX: '5:00 PM to 6:00 PM',
  SIX_TO_SEVEN: '6:00 PM to 7:00 PM',
};

const STAGES = { ONE: 'Stage One', TWO: 'Stage Two', THREE: 'Stage Three' };

const FOLDER_MAP = {
  '1 - PROGRAM - Monday Stage 1 - 2026': { date: DATES.MONDAY, time: TIMES.FOUR_TO_FIVE, stage: STAGES.ONE },
  '1 - PROGRAM - Monday Stage 2 - 2026': { date: DATES.MONDAY, time: TIMES.FIVE_TO_SIX, stage: STAGES.TWO },
  '1 - PROGRAM - Monday Stage 3 - 2026': { date: DATES.MONDAY, time: TIMES.SIX_TO_SEVEN, stage: STAGES.THREE },
  '2- PROGRAM - Tuesday Stage 2 (4pm) - 2026': { date: DATES.TUESDAY, time: TIMES.FOUR_TO_FIVE, stage: STAGES.TWO },
  '2 - PROGRAM - Tuesday Stage 2 (5pm) - 2026': { date: DATES.TUESDAY, time: TIMES.FIVE_TO_SIX, stage: STAGES.TWO },
  '2 - PROGRAM - Tuesday Stage 3 - 2026': { date: DATES.TUESDAY, time: TIMES.SIX_TO_SEVEN, stage: STAGES.THREE },
  '3 - PROGRAM - Wednesday Stage 1 - 2026': { date: DATES.WEDNESDAY, time: TIMES.FOUR_TO_FIVE, stage: STAGES.ONE },
  '3 - PROGRAM - Wednesday Stage 2 - 2026': { date: DATES.WEDNESDAY, time: TIMES.FIVE_TO_SIX, stage: STAGES.TWO },
  '3 - PROGRAM - Wednesday Stage 3 - 2026': { date: DATES.WEDNESDAY, time: TIMES.SIX_TO_SEVEN, stage: STAGES.THREE },
  'PROGRAM TH S 1 2026': { date: DATES.THURSDAY, time: TIMES.FOUR_TO_FIVE, stage: STAGES.ONE },
  'PROGRAM TH S2 2027': { date: DATES.THURSDAY, time: TIMES.FIVE_TO_SIX, stage: STAGES.TWO },
  'PROGRAM TH S3': { date: DATES.THURSDAY, time: TIMES.SIX_TO_SEVEN, stage: STAGES.THREE },
  'PROGRAM F S2': { date: DATES.FRIDAY, time: TIMES.FIVE_TO_SIX, stage: STAGES.TWO },
};

const NAME_ALIASES = {
  'ingird campbell': 'Ingrid Campbell',
  'reyash 2': 'Reyansh Thaker',
  'reyash': 'Reyansh Thaker',
  'macelle varma': 'Marcelle Varma',
  'lotti antee': 'Lotti Anstee',
  'rachel toilf': 'Rachel Toifl',
  'fancesca volpato': 'Francesca Volpato',
  'macy camm': 'Macey Camm',
  'olive casey-saker': 'Olive Casey-Sakar',
  'olive casey saker': 'Olive Casey-Sakar',
  'scarlett beasley': 'Scarlett Besley',
  'phillipa kolhman': 'Phillipa Kohlman',
  'freddy campbell 2': 'Freddy Campbell',
  'amelia o_rielly': "Amelia O'Rielly",
  'amelia o rielly': "Amelia O'Rielly",
  'alexis o_shea': "Alexis O'Shea",
  'alexis o shea': "Alexis O'Shea",
  'ziggy 3': 'Ziggy Naidoo',
  'zara mealmaker': 'Zarah Mealmaker',
  'oren sergi-downie': 'Oren Sergi',
  'oren sergi downie': 'Oren Sergi',
  'memphis june meggs': 'Memphis Meggs',
  'isabella weigard': 'Isabella Wiegard',
  'corazon mangantuloa': 'Corazon Mangantulao',
  'kiera heath': 'Keira Heath',
  'talia roe': 'Talia Roe',
  'dakoda east': 'Dakoda East',
  'milla webb': 'Milla Webb',
  'lexi read': 'Lexi Read',
  'sienna davey 2': 'Sienna Davey',
  'temperence williamson temperance williamson': 'Temperance Williamson',
};

const PDF_AWARDS = [
  // Monday
  ['Aarav Alexander', 'First Year Pin November'],
  ['Aria Veera', 'First Year Pin November'],
  ['London Parker', 'First Year Pin November'],
  ['Tika Churchill', 'First Year Pin November'],
  ['William Sandiford', 'First Year Pin November'],
  ['Aida Burns', '1st Medal: 2 years of drama'],
  ['Ava Hawkey', '1st Medal: 2 years of drama'],
  ['Lachlan Longford', '1st Medal: 2 years of drama'],
  ['Milla Gregg', '1st Medal: 2 years of drama'],
  ['Willow Fuamatu', '1st Medal: 2 years of drama'],
  ['Cora Critch', '2nd Medal: 4 years of drama'],
  ['Ivy Burdeu', '2nd Medal: 4 years of drama'],
  ['Lydia Deepan', '2nd Medal: 4 years of drama'],
  ['Millie Jensen', '2nd Medal: 4 years of drama'],
  ['Tahlia Giffard', '2nd Medal: 4 years of drama'],
  ['Charlie Wills', '3rd Medal: 6 years of drama'],
  ['Olivia Osborne', '3rd Medal: 6 years of drama'],
  // Tuesday
  ['Audrey Smythe', 'First Year Pin November'],
  ['Clara Edgar-Patching', 'First Year Pin November'],
  ['Imogen Diss', 'First Year Pin November'],
  ['Khadija Eltoubshi', 'First Year Pin November'],
  ['Leila Cole', 'First Year Pin November'],
  ['Matilda Engi', 'First Year Pin November'],
  ['Romilly Park', 'First Year Pin November'],
  ['Samuel Mulcair', 'First Year Pin November'],
  ['Tala Kotsiopoulos', 'First Year Pin November'],
  ['Temperance Williamson', 'First Year Pin November'],
  ['Tori Hancox', 'First Year Pin November'],
  ['Amelia Beukes', '1st Medal: 2 years of drama'],
  ['Anna Francis', '1st Medal: 2 years of drama'],
  ['Charlee Russell', '1st Medal: 2 years of drama'],
  ['Eliza Hepburn', '1st Medal: 2 years of drama'],
  ['George Dewhurst', '1st Medal: 2 years of drama'],
  ['Hannah Rodd', '1st Medal: 2 years of drama'],
  ['Memphis Meggs', '1st Medal: 2 years of drama'],
  ['Mila McMillan', '1st Medal: 2 years of drama'],
  ['Mila Holmfield', '1st Medal: 2 years of drama'],
  ['Sam Miller', '1st Medal: 2 years of drama'],
  ['Sophie Breewel', '1st Medal: 2 years of drama'],
  ['Teddy Thomson', '1st Medal: 2 years of drama'],
  ['Eve Martin', '2nd Medal: 4 years of drama'],
  ['Georgina Sbaglia', '2nd Medal: 4 years of drama'],
  ['Poppy Stanaway', '2nd Medal: 4 years of drama'],
  ['Alice Stockx', '3rd Medal: 6 years of drama'],
  // Wednesday
  ['Cleo Giri', 'First Year Pin November'],
  ['Edyn Godden', 'First Year Pin November'],
  ['Elena Musembi', 'First Year Pin November'],
  ['Jaylin Climas', 'First Year Pin November'],
  ['Kayan Musembi', 'First Year Pin November'],
  ['Matthew van der Spek', 'First Year Pin November'],
  ['Nathaniel Marsden', 'First Year Pin November'],
  ['Oren Sergi', 'First Year Pin November'],
  ['Zoe Burr', 'First Year Pin November'],
  ['Alex Hicks', '1st Medal: 2 years of drama'],
  ['Amelia Greening', '1st Medal: 2 years of drama'],
  ['Ava Giffard', '1st Medal: 2 years of drama'],
  ['Ella Henshall', '1st Medal: 2 years of drama'],
  ['Harper Ridgeway', '1st Medal: 2 years of drama'],
  ['Isla Mealmaker', '1st Medal: 2 years of drama'],
  ['Josie White', '1st Medal: 2 years of drama'],
  ['Kaia Langeder', '1st Medal: 2 years of drama'],
  ['Kaylee Hitchcock', '1st Medal: 2 years of drama'],
  ['Leo Turner', '1st Medal: 2 years of drama'],
  ['Matilda Stubbins', '1st Medal: 2 years of drama'],
  ['Millie Haydock', '1st Medal: 2 years of drama'],
  ['Willow Johnson', '1st Medal: 2 years of drama'],
  ['Zarah Mealmaker', '1st Medal: 2 years of drama'],
  ['Ivy Spicer', '2nd Medal: 4 years of drama'],
  ['Lilly Foster', '2nd Medal: 4 years of drama'],
  ['Matilda Robertson', '2nd Medal: 4 years of drama'],
  ['Trinity Parker', '2nd Medal: 4 years of drama'],
  ['Alira Hill', '3rd Medal: 6 years of drama'],
  ['Elsie Rice', '3rd Medal: 6 years of drama'],
  ['Jackson Spicer', '3rd Medal: 6 years of drama'],
  ['Tamati McLarty', '3rd Medal: 6 years of drama'],
  // Thursday/Friday
  ['Abigail McKeown', 'First Year Pin November'],
  ['Allie Howden', 'First Year Pin November'],
  ['Audrey Pugh', 'First Year Pin November'],
  ['Evelyn Shay', 'First Year Pin November'],
  ['Francesca Volpato', 'First Year Pin November'],
  ['Gweny Horner-Dodson', 'First Year Pin November'],
  ['Jack Boadle', 'First Year Pin November'],
  ['Joane Soille', 'First Year Pin November'],
  ['Olive Casey-Sakar', 'First Year Pin November'],
  ['Oliver Richardson', 'First Year Pin November'],
  ['April Muscovich', '1st Medal: 2 years of drama'],
  ['Blaise Carr', '1st Medal: 2 years of drama'],
  ['Elsie Sharp', '1st Medal: 2 years of drama'],
  ['Erin Mills', '1st Medal: 2 years of drama'],
  ['Eve Sheldrick', '1st Medal: 2 years of drama'],
  ['Freddy Campbell', '1st Medal: 2 years of drama'],
  ['Ingrid Campbell', '1st Medal: 2 years of drama'],
  ['Isla Rorke', '1st Medal: 2 years of drama'],
  ['Lotti Anstee', '1st Medal: 2 years of drama'],
  ['Macey Camm', '1st Medal: 2 years of drama'],
  ['Matilda Boadle', '1st Medal: 2 years of drama'],
  ['Rachel Toifl', '1st Medal: 2 years of drama'],
  ['Reyansh Thaker', '1st Medal: 2 years of drama'],
  ['Sophie Pedrotti', '1st Medal: 2 years of drama'],
  ['Arabella McGowen', '2nd Medal: 4 years of drama'],
  ['Charlotte Bysouth', '2nd Medal: 4 years of drama'],
  ['Corazon Mangantulao', '2nd Medal: 4 years of drama'],
  ['Marcelle Varma', '2nd Medal: 4 years of drama'],
  ['Scarlett Besley', '2nd Medal: 4 years of drama'],
  ['Thomas McColl', '2nd Medal: 4 years of drama'],
];

const EXTRA_AWARD_PLACEMENTS = [
  { name: 'Tika Churchill', date: DATES.MONDAY, time: TIMES.FOUR_TO_FIVE, stage: STAGES.ONE },
  { name: 'Nathaniel Marsden', date: DATES.WEDNESDAY, time: TIMES.FOUR_TO_FIVE, stage: STAGES.ONE },
  { name: 'Trinity Parker', date: DATES.WEDNESDAY, time: TIMES.FIVE_TO_SIX, stage: STAGES.TWO },
];

function keyName(name) {
  return name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
}

function titleCaseName(name) {
  return name
    .split(/\s+/)
    .map((part) => {
      if (part.includes('-')) {
        return part.split('-').map((p) => titleCaseName(p)).join('-');
      }
      if (part.toLowerCase() === 'van' || part.toLowerCase() === 'der') return part.toLowerCase();
      if (part.startsWith("O'") || part.startsWith('O’')) {
        return `O'${part.slice(2, 3).toUpperCase()}${part.slice(3).toLowerCase()}`;
      }
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })
    .join(' ')
    .replace(/\bVan Der\b/g, 'van der');
}

function extractFromFilename(filename) {
  let base = basename(filename).replace(/\.(jpg|jpeg|png|webp)$/i, '').replace(/\s+/g, ' ').trim();
  let filenameAward = '(None)';

  const firstYear = base.match(/\s*-?\s*First Year Pin.*$/i);
  if (firstYear) {
    filenameAward = 'First Year Pin November';
    base = base.replace(/\s*-?\s*First Year Pin.*$/i, '').trim();
  }

  const medal = base.match(/\s*-?\s*(\d+(?:st|nd|rd|th))\s*Medal\s*-?\s*(\d+)\s*Years?$/i);
  if (medal) {
    const years = medal[2];
    const medalName = medal[1].toLowerCase();
    const label = medalName === '1st' ? '1st Medal' : medalName === '2nd' ? '2nd Medal' : medalName === '3rd' ? '3rd Medal' : `${medal[1]} Medal`;
    filenameAward = `${label}: ${years} years of drama`;
    base = base.replace(/\s*-?\s*\d+(?:st|nd|rd|th)\s*Medal\s*-?\s*\d+\s*Years?$/i, '').trim();
  }

  base = base.replace(/\s+\d+$/, '').replace(/_/g, ' ').replace(/\s+/g, ' ').trim();

  const aliasKey = base.toLowerCase();
  if (NAME_ALIASES[aliasKey]) {
    return { name: NAME_ALIASES[aliasKey], filenameAward };
  }

  return { name: titleCaseName(base), filenameAward };
}

const awardByKey = new Map();
const awardNames = [];
for (const [name, commitment] of PDF_AWARDS) {
  awardByKey.set(keyName(name), { name, commitment });
  awardNames.push(name);
}

function resolveAward(name, filenameAward) {
  const pdf = awardByKey.get(keyName(name));
  if (pdf) return { name: pdf.name, commitment: pdf.commitment, award: true };
  if (filenameAward && filenameAward !== '(None)') {
    return { name, commitment: filenameAward, award: true };
  }
  return { name, commitment: '(None)', award: false };
}

async function optimizeImage(inputPath, outputPath) {
  const metadata = await sharp(inputPath).metadata();
  let width = metadata.width;
  let height = metadata.height;
  const MAX_WIDTH = 1200;
  const MAX_HEIGHT = 1600;
  if (width > MAX_WIDTH || height > MAX_HEIGHT) {
    if (width / MAX_WIDTH > height / MAX_HEIGHT) {
      width = MAX_WIDTH;
      height = Math.round((metadata.height / metadata.width) * MAX_WIDTH);
    } else {
      height = MAX_HEIGHT;
      width = Math.round((metadata.width / metadata.height) * MAX_HEIGHT);
    }
  }
  await sharp(inputPath)
    .resize(width, height, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 85, effort: 6 })
    .toFile(outputPath);
}

async function main() {
  if (!existsSync(PERFORMERS_DIR)) {
    await mkdir(PERFORMERS_DIR, { recursive: true });
  }

  const existing = await readdir(PERFORMERS_DIR);
  for (const file of existing) {
    if (file.toLowerCase() === 'nophoto.png') continue;
    await unlink(join(PERFORMERS_DIR, file));
  }

  const groups = new Map();
  const copied = new Set();

  const folders = await readdir(PHOTOS_ROOT);
  for (const folder of folders) {
    const mapping = FOLDER_MAP[folder];
    if (!mapping) {
      console.warn('Unmapped folder', folder);
      continue;
    }
    const dir = join(PHOTOS_ROOT, folder);
    if (!statSync(dir).isDirectory()) continue;
    const files = (await readdir(dir)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
    const groupKey = `${mapping.date}|${mapping.time}|${mapping.stage}`;
    if (!groups.has(groupKey)) {
      groups.set(groupKey, { ...mapping, performers: [] });
    }
    const group = groups.get(groupKey);

    for (const file of files) {
      const extracted = extractFromFilename(file);
      const resolved = resolveAward(extracted.name, extracted.filenameAward);
      if (!group.performers.some((p) => p.name === resolved.name)) {
        group.performers.push({ name: resolved.name, commitment: resolved.commitment });
      }

      const photoName = `${resolved.name}.webp`;
      if (!copied.has(photoName.toLowerCase())) {
        const inputPath = join(dir, file);
        const outputPath = join(PERFORMERS_DIR, photoName);
        try {
          await optimizeImage(inputPath, outputPath);
          copied.add(photoName.toLowerCase());
          console.log('photo', photoName);
        } catch (err) {
          console.error('failed photo', file, err.message);
        }
      }
    }
  }

  for (const extra of EXTRA_AWARD_PLACEMENTS) {
    const resolved = resolveAward(extra.name, '(None)');
    const groupKey = `${extra.date}|${extra.time}|${extra.stage}`;
    if (!groups.has(groupKey)) {
      groups.set(groupKey, { date: extra.date, time: extra.time, stage: extra.stage, performers: [] });
    }
    const group = groups.get(groupKey);
    if (!group.performers.some((p) => p.name === resolved.name)) {
      group.performers.push({ name: resolved.name, commitment: resolved.commitment });
    }
  }

  const performerData = Array.from(groups.values()).map((group) => ({
    ...group,
    performers: group.performers.sort((a, b) => a.name.localeCompare(b.name)),
  }));

  // Stable order: Mon-Fri, then time, then stage
  const dateOrder = Object.values(DATES);
  const stageOrder = [STAGES.ONE, STAGES.TWO, STAGES.THREE];
  performerData.sort((a, b) => {
    const di = dateOrder.indexOf(a.date) - dateOrder.indexOf(b.date);
    if (di !== 0) return di;
    const ti = a.time.localeCompare(b.time);
    if (ti !== 0) return ti;
    return stageOrder.indexOf(a.stage) - stageOrder.indexOf(b.stage);
  });

  writeFileSync(DATA_PATH, JSON.stringify({ awardEligible: awardNames, performerData }, null, 2));
  console.log(`Wrote ${DATA_PATH} with ${performerData.length} groups, ${copied.size} photos`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
