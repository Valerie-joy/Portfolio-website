/**
 * The toolset shown in the Technical Expertise section.
 *
 * Deliberately no proficiency numbers: a self-assigned "95%" invites a question
 * no portfolio can answer. Categories communicate breadth and familiarity, which
 * is both more honest and more useful to a prospective client.
 *
 * To edit later: change the entries below. Nothing else needs touching.
 */

export interface ToolCategory {
  name: string;
  tools: string[];
}

export interface ToolGroup {
  id: string;
  title: string;
  /** 'primary' gets the heavier card treatment; 'secondary' is lighter. */
  emphasis: 'primary' | 'secondary';
  categories: ToolCategory[];
}

export const toolkit: ToolGroup[] = [
  {
    id: 'primary-expertise',
    title: 'Primary Expertise',
    emphasis: 'primary',
    // Ordered by the priority brief, strongest first - not by list order.
    categories: [
      {
        name: 'Core Graphic Design',
        tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Figma', 'Canva'],
      },
      {
        name: 'AI Image Generation',
        tools: ['Midjourney', 'DALL·E', 'Adobe Firefly', 'Stable Diffusion', 'Ideogram'],
      },
      {
        name: 'AI Video Generation + Editing',
        tools: [
          'Google Veo',
          'Kling AI',
          'Higgsfield',
          'Hailuo AI',
          'Runway',
          'Synthesia',
          'Pika',
          'Luma AI Dream Machine',
          'HeyGen',
        ],
      },
      {
        name: 'AI Video Editors',
        tools: ['CapCut', 'Adobe Premiere Pro', 'Filmora'],
      },
      {
        name: 'Social Media & Short-Form',
        tools: ['OpusClip', 'Meta Business Suite', 'GoHighLevel'],
      },
      {
        name: 'AI Design Tools',
        tools: ['Canva Magic Studio', 'Figma AI', 'Adobe Express AI', 'Looka'],
      },
    ],
  },
  {
    id: 'ai-productivity',
    title: 'AI & Productivity',
    emphasis: 'secondary',
    categories: [
      {
        name: 'AI Chatbots & Assistants',
        tools: ['ChatGPT', 'Claude', 'Google Gemini', 'Microsoft Copilot', 'Perplexity AI'],
      },
      {
        name: 'AI Writing Tools',
        tools: ['Jasper', 'Copy.ai', 'Writesonic', 'Grammarly AI', 'QuillBot'],
      },
      {
        name: 'AI Coding Assistants',
        tools: ['GitHub Copilot', 'Cursor', 'Codeium', 'Amazon Q Developer', 'Replit AI'],
      },
      {
        name: 'AI Presentation Tools',
        tools: ['Gamma', 'Tome', 'Beautiful.ai', 'Canva AI'],
      },
      {
        name: 'AI Research Tools',
        tools: ['NotebookLM'],
      },
      {
        name: 'AI Productivity Tools',
        tools: ['Notion AI', 'ClickUp AI', 'Mem AI', 'Motion'],
      },
    ],
  },
  {
    id: 'platforms-business',
    title: 'Platforms & Business Tools',
    emphasis: 'secondary',
    categories: [
      {
        name: 'Planning & Content Calendars',
        tools: [
          'Trello',
          'Asana',
          'Notion',
          'Monday.com',
          'ClickUp',
          'Airtable',
          'Google Sheets',
          'Google Calendar',
        ],
      },
      {
        name: 'AI Website Builders',
        tools: ['Framer AI', 'Wix AI', 'Hostinger AI Website Builder', 'Durable'],
      },
      {
        name: 'AI Meeting Assistants',
        tools: ['Otter.ai', 'Fireflies.ai', 'Fathom', 'Avoma'],
      },
      {
        name: 'AI Voice & Audio',
        tools: ['ElevenLabs', 'Speechify'],
      },
    ],
  },
];

export const totalCategories = toolkit.reduce((n, g) => n + g.categories.length, 0);
export const totalTools = toolkit.reduce(
  (n, g) => n + g.categories.reduce((m, c) => m + c.tools.length, 0),
  0,
);
