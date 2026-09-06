/**
 * Career timeline, transcribed from "Resume- Valerie Updated.pdf".
 *
 * The resume is the source of truth. Periods are reproduced exactly as the
 * resume states them — where it gives a single year, only that year is shown,
 * and no months, descriptions or achievements are inferred.
 *
 * To edit later: change the entries below. Nothing else needs touching.
 */

export interface CareerRole {
  company: string;
  role: string;
  /** Verbatim from the resume: either a single year or a "start - end" range. */
  period: string;
  /** Marks an engagement that ran alongside the later years of the timeline. */
  longRunning?: boolean;
}

export interface CareerEra {
  id: string;
  /** Heading for the era marker on the timeline rail. */
  years: string;
  /** What the work in this era consisted of, drawn from the roles themselves. */
  focus: string;
  roles: CareerRole[];
}

export const careerTimeline: CareerEra[] = [
  {
    id: 'foundation',
    years: '2019 - 2025',
    focus:
      'Where it started. A single long-running engagement covering graphic design and social media management, which continued alongside the client work that followed.',
    roles: [
      {
        company: 'Northpoint Citi Church',
        role: 'Graphic Designer / Social Media Manager',
        period: '2019 - 2025',
        longRunning: true,
      },
    ],
  },
  {
    id: '2022-2023',
    years: '2022 - 2023',
    focus:
      'Expansion beyond static design into video and reel editing, across four concurrent client engagements.',
    roles: [
      {
        company: 'New Generations Academy',
        role: 'Graphic Designer / Video Editor',
        period: '2022 - 2023',
      },
      {
        company: 'Bluenotes Brandon',
        role: 'Graphic Designer / Reel Editor',
        period: '2022 - 2023',
      },
      {
        company: '100 Fold Media Agency',
        role: 'Graphic Designer / Social Media Manager',
        period: '2022 - 2023',
      },
      {
        company: 'Cashflow Bros',
        role: 'Graphic Designer / Reel Editor',
        period: '2022 - 2023',
      },
    ],
  },
  {
    id: '2024',
    years: '2024',
    focus:
      'A broader client roster across social media management, graphic design and reel editing.',
    roles: [
      {
        company: 'PestPeak',
        role: 'Graphic Designer / Social Media Manager',
        period: '2024',
      },
      {
        company: "Bugsy's Pest Solutions",
        role: 'Graphic Designer / Social Media Manager',
        period: '2024',
      },
      {
        company: 'Mendocino Treehouse',
        role: 'Graphic Designer / Reel Editor',
        period: '2024',
      },
      {
        company: 'OH! Waffles & Crepes',
        role: 'Graphic Designer / Social Media Manager',
        period: '2024',
      },
      {
        company: 'UpNorth Coffee',
        role: 'Graphic Designer / Social Media Manager',
        period: '2024',
      },
    ],
  },
  {
    id: '2025',
    years: '2025',
    focus:
      'Wider digital responsibilities — email assistance and WordPress editing alongside brand-specific creative work.',
    roles: [
      {
        company: 'Ling Skincare Newyork',
        role: 'Graphic Designer / Reel Editor',
        period: '2025',
      },
      {
        company: 'Marky Booth',
        role: 'Graphic Designer / Email Assistant',
        period: '2025',
      },
      {
        company: 'KK Migration Consultants',
        role: 'Graphic Designer / Social Media Manager',
        period: '2025',
      },
      {
        company: 'Limelight Online Clothing Store',
        role: 'Graphic Designer / Wordpress Editor',
        period: '2025',
      },
    ],
  },
  {
    id: '2026',
    years: '2026',
    focus:
      'AI-assisted graphic design and AI video editing, with a concentration of e-commerce creative and content-creator work.',
    roles: [
      { company: 'Modenaire', role: 'AI Graphic Designer', period: '2026' },
      {
        company: 'House Sensations Art (Ecommerce)',
        role: 'Graphic Designer',
        period: '2026',
      },
      { company: 'Vital Vault', role: 'Graphic Designer', period: '2026' },
      {
        company: 'Liel Mazor (Content Creator)',
        role: 'Graphic Designer',
        period: '2026',
      },
      {
        company: 'jamesfar_ (Content Creator)',
        role: 'Graphic Designer / AI Video Editor',
        period: '2026',
      },
      {
        company: 'Top Notch Plumbing',
        role: 'Social Media Graphics / Blogs',
        period: '2026',
      },
      {
        company: 'Authur Eleanor (Ecommerce)',
        role: 'Graphic Designer',
        period: '2026',
      },
      {
        company: 'Nuvra By Nature (Ecommerce)',
        role: 'Graphic Designer',
        period: '2026',
      },
      {
        company: 'I-On Skincare Product (Ecommerce)',
        role: 'Graphic Designer',
        period: '2026',
      },
    ],
  },
];

/** Total engagements on the timeline. */
export const totalEngagements = careerTimeline.reduce(
  (sum, era) => sum + era.roles.length,
  0,
);
