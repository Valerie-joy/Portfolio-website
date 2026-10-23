/**
 * Live client websites, shown in the Selected Client Projects section.
 *
 * Every description below was written from an actual visit to the live site in
 * October 2026 — nothing is inferred from the client's name. No framework,
 * performance metric or testimonial is claimed, because none of that could be
 * verified from the outside.
 *
 * `contribution` is one phrase across all projects, describing the scope as
 * stated: user interface design, frontend improvements and functionality work
 * on collaborative client builds. It deliberately does not claim backend work,
 * sole authorship of any site, or any individual feature - none of that is
 * verifiable from the outside. Narrow it per project only with specifics to
 * back it up.
 *
 * Previews are real screenshots captured by scripts/src/capture-client-sites.ts.
 * All nine currently have one. Setting a preview to null is still supported and
 * renders a typographic fallback card - use that rather than ever substituting a
 * fabricated or stand-in image.
 */

export type ClientCategory =
  | 'Real Estate'
  | 'Construction'
  | 'Healthcare'
  | 'Restoration'
  | 'Hospitality'
  | 'Media';

export interface ClientProject {
  slug: string;
  name: string;
  url: string;
  category: ClientCategory;
  description: string;
  contribution: string;
  /** Path under public/, or null when no honest capture was possible. */
  preview: string | null;
}

const CONTRIBUTION = 'UI/UX & Frontend Development';

export const clientProjects: ClientProject[] = [
  {
    slug: 'john-sells-nm',
    name: 'John Sells NM',
    url: 'https://johnsellsnm.com/',
    category: 'Real Estate',
    description:
      'Realtor site for John Sheffer of Berkshire Hathaway HomeServices in Albuquerque, covering listing search, community guides and probate sale resources.',
    contribution: CONTRIBUTION,
    preview: '/clients/john-sells-nm.webp',
  },
  {
    slug: 'chris-az-homes',
    name: 'Chris AZ Homes',
    url: 'https://chrisazhomes.com/',
    category: 'Real Estate',
    description:
      'Agent site for Chris Reeves, an East Valley Arizona realtor, pairing property search with home valuation and seller enquiry tools.',
    contribution: CONTRIBUTION,
    preview: '/clients/chris-az-homes.webp',
  },
  {
    slug: 'aubreigh-hutchison',
    name: 'Aubreigh Hutchison',
    url: 'https://aubreighhutchison.exprealty.com/',
    category: 'Real Estate',
    description:
      'eXp Realty site for a luxury and probate realtor serving Palm Beach and Greater Fort Lauderdale, built around a full IDX search across residential and commercial listings.',
    contribution: CONTRIBUTION,
    preview: '/clients/aubreigh-hutchison.webp',
  },
  {
    slug: 'ann-baker',
    name: 'Ann Baker',
    url: 'https://www.annbaker.com/',
    category: 'Real Estate',
    description:
      'Site for a Libertyville, Illinois real estate broker and coach, combining brokerage services with consulting and a downloadable resource for agents.',
    contribution: CONTRIBUTION,
    preview: '/clients/ann-baker.webp',
  },
  {
    slug: 'bomar-builders',
    name: 'Bomar Builders',
    url: 'https://www.bomarbuilders.com/',
    category: 'Construction',
    description:
      'Site for a custom building firm established in 1989, presenting full-service design coordination, high-end residences and available properties.',
    contribution: CONTRIBUTION,
    preview: '/clients/bomar-builders.webp',
  },
  {
    slug: 'astracare',
    name: 'AstraCare',
    url: 'https://www.astracare.com/',
    category: 'Healthcare',
    description:
      'In-home care provider in South Florida, focused on matching families with caregivers and offering nurse-led care planning.',
    contribution: CONTRIBUTION,
    preview: '/clients/astracare.webp',
  },
  {
    slug: 'adkins-pro',
    name: 'Adkins Pro',
    url: 'https://adkinspro.com/',
    category: 'Restoration',
    description:
      'Florida property damage restoration company covering water, fire and mold remediation, with inspection services and 24/7 emergency response.',
    contribution: CONTRIBUTION,
    preview: '/clients/adkins-pro.webp',
  },
  {
    slug: 'oberoi-group',
    name: 'Oberoi Group',
    url: 'https://www.oberoigroup.com/',
    category: 'Hospitality',
    description:
      'Corporate site for the international hotel group, covering its legacy, workplace culture, careers and multiskilling learning programmes.',
    contribution: CONTRIBUTION,
    preview: '/clients/oberoi-group.webp',
  },
  {
    slug: 'ceo-mistakes',
    name: 'CEO Mistakes',
    url: 'https://www.ceomistakes.com/',
    category: 'Media',
    description:
      'Podcast site for the CEO Mistakes show hosted by Jeffrey Pomeranz, with episode listings and links out to the major podcast platforms.',
    contribution: CONTRIBUTION,
    preview: '/clients/ceo-mistakes.webp',
  },
];

/** Filter options, in the order the categories first appear above. */
export const clientCategories: ClientCategory[] = [
  ...new Set(clientProjects.map((p) => p.category)),
];

export const totalClientProjects = clientProjects.length;
