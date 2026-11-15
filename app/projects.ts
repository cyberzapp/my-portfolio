export type Media = {
  file: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  description: string;
  status: string;
  contribution: string;
  stack: readonly string[];
  architecture: readonly string[];
  sections: readonly { heading: string; text: string }[];
  media: readonly Media[];
  link?: { label: string; url: string };
  color: string;
};

export const projects: readonly Project[] = [
  {
    slug: 'data-visualizer',
    name: 'Orbity',
    category: 'Full-stack data visualization',
    description: 'Turn spreadsheets and pasted data into interactive charts that teams can share.',
    status: 'Independent project · Local workflow verified',
    contribution: 'Built around three connected layers: a chart-building interface, an API for data workflows and a Supabase-backed account and sharing layer.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Express', 'Supabase', 'Gemini'],
    architecture: ['Browser-based chart editor', 'Express service layer', 'Supabase authentication and saved charts'],
    sections: [
      { heading: 'The problem', text: 'A spreadsheet is good for collecting figures. It takes extra work to decide what to chart, shape the data and share a useful view with someone else.' },
      { heading: 'Product strategy', text: 'Keep import, chart configuration and preview close together. Users can start with a file or pasted data, then choose a visualization based on the question they want to answer.' },
      { heading: 'The implementation', text: 'The React client supports multiple chart types, a data grid and shared chart views. The Express API separates document, Google Sheets and AI concerns. Supabase supplies authentication and database-backed features.' },
      { heading: 'Engineering trade-off', text: 'Chart composition belongs in the browser where people can iterate quickly. Credential-dependent operations run through the API. The local paste-to-chart flow was exercised with synthetic data and an isolated session fixture. AI, Google Sheets and account features require service configuration.' },
    ],
    media: [
      { file: 'data-preview', alt: 'Orbity chart preview with configuration controls', caption: 'Chart editor running locally with sample monthly totals', width: 1440, height: 900 },
      { file: 'data-upload', alt: 'Orbity data import interface', caption: 'Data import workspace running locally', width: 1440, height: 900 },
    ],
    color: 'plum',
  },
  {
    slug: 'renderfix',
    name: 'RenderFix Studio',
    category: 'Desktop software · local AI',
    description: 'A desktop media workspace for editing video, refining image cutouts and processing files on-device.',
    status: 'Desktop application · macOS',
    contribution: 'Worked across the Electron workspace and Python processing stack, including frame tooling, editing controls and optional local model workflows.',
    stack: ['Electron', 'React', 'Python', 'OpenCV', 'FFmpeg', 'MLX'],
    architecture: ['React and Electron workspaces', 'Local Python processing service', 'OpenCV, FFmpeg and optional model runtimes'],
    sections: [
      { heading: 'The problem', text: 'Small media corrections often mean moving footage through several utilities just to inspect a frame, clean a region and export a result.' },
      { heading: 'Product strategy', text: 'Bring sequence editing, frame inspection and image tools together in a desktop workspace. Keep source media on the user’s machine during processing.' },
      { heading: 'The implementation', text: 'Electron hosts the React interface. A local Python service handles processing paths including frame extraction, region cleanup and image segmentation. The project format preserves edits and the recovery flow supports autosaves.' },
      { heading: 'Engineering trade-off', text: 'Fast OpenCV previews support quick decisions. Optional model-backed actions can require larger downloads and compatible hardware. The image workflow lets users inspect a before-and-after view before accepting a change.' },
    ],
    media: [
      { file: 'render-cutout', alt: 'RenderFix documentation image demonstrating hair edge refinement', caption: 'Hair-edge refinement from the project documentation', width: 1000, height: 600 },
    ],
    link: { label: 'View public source', url: 'https://github.com/cyberzapp/RenderFix' },
    color: 'forest',
  },
  {
    slug: 'snappost-ai',
    name: 'SnapPost AI',
    category: 'Content creation workspace',
    description: 'A web studio that takes creators from a template to an editable social graphic.',
    status: 'Independent project · Live entry point',
    contribution: 'The portfolio evidence covers the project dashboard, template library and visual editor. The implementation behind the account-gated workflow is outside this case study.',
    stack: ['Firebase Hosting'],
    architecture: ['Public web entry point', 'Project and template views', 'Visual composition editor'],
    sections: [
      { heading: 'The problem', text: 'Starting every social graphic from a blank canvas adds setup time and makes visual consistency harder to keep.' },
      { heading: 'Product strategy', text: 'Give creators a starting point through templates, then move them into a workspace where they can refine the composition.' },
      { heading: 'The interface', text: 'Captured product screens show a projects dashboard, an editor and a template browser. The editor places the canvas beside contextual controls, so the preview remains visible while making changes.' },
      { heading: 'Project scope', text: 'The public transformation preview was exercised during the audit. This case study documents the visible product flow. Account-gated actions and AI model behavior were outside the audit.' },
    ],
    media: [
      { file: 'snap-editor', alt: 'SnapPost AI visual editor with composition canvas and side controls', caption: 'Deployed editor with sample composition content', width: 2940, height: 1888 },
      { file: 'snap-dashboard', alt: 'SnapPost AI project dashboard', caption: 'Project workspace from the deployed app', width: 2940, height: 1670 },
    ],
    link: { label: 'Open product preview', url: 'https://snappost-si.web.app/#showcase' },
    color: 'blue',
  },
  {
    slug: 'breathy',
    name: 'Breathy',
    category: 'Healthcare operations',
    description: 'A clinic workflow system that connects appointment scheduling, front-desk check-in and live queues.',
    status: 'Founder project · Clinic workflow',
    contribution: 'Founder and technical contributor. The case study focuses on the appointment and live-token workflow implemented across patient, reception and doctor surfaces.',
    stack: ['Next.js', 'React', 'Express', 'Supabase', 'Google Cloud build config'],
    architecture: ['Patient, front-desk and doctor interfaces', 'Express appointment and queue services', 'Supabase-backed application data'],
    sections: [
      { heading: 'The problem', text: 'A booked time and the order in which patients are seen can diverge once people arrive at a clinic. Patients, reception and doctors each need a clear view of what happens next.' },
      { heading: 'Product strategy', text: 'Treat scheduling and the live queue as connected workflows. Give each role the actions it needs through a dedicated interface.' },
      { heading: 'The implementation', text: 'The repository includes a Next.js patient client, front-desk and doctor dashboards, Express schedule and queue endpoints, and Supabase migrations. The front desk has a live queue view and the doctor dashboard has a separate queue component.' },
      { heading: 'Engineering trade-off', text: 'The schedule represents planned appointments while the live queue represents operational state. The source separates those concerns while exposing them in the role-specific interfaces. Public visuals for this case study are limited to a workflow diagram to keep patient data out of the portfolio.' },
    ],
    media: [],
    color: 'teal',
  },
];

export const profile = {
  name: 'Suman Das',
  email: 'suman@breathy.in',
  github: 'https://github.com/cyberzapp',
  linkedin: 'https://www.linkedin.com/in/sumandas28/',
};
