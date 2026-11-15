import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const sources = [
  { name: 'data-preview', capture: 'editor.png' },
  { name: 'data-upload', capture: 'workspace.png' },
  { name: 'snap-editor', path: 'Downloads/snappost-si.web.app_dashboard_editor.png', redact: true },
  { name: 'snap-dashboard', path: 'Downloads/my_projects.png', redact: true },
  { name: 'render-cutout', path: 'Documents/GitHub/RenderFix/RenderFix/docs/media/hair-refinement.png' },
];
const [ownerDirectory, capturesDirectory] = process.argv.slice(2);
if (!ownerDirectory || !capturesDirectory) throw new Error('Provide the directories containing the audited originals and Orbity captures.');
await mkdir('public/media', { recursive: true });
for (const {name, path, capture, redact} of sources) {
  let image = sharp(capture ? join(capturesDirectory, capture) : join(ownerDirectory, path));
  if (redact) {
    const {height} = await image.metadata();
    image.composite([{input: {create: {width: 425, height: 120, channels: 3, background:'#101019'}}, top: height - 120, left: 0}]);
    image = sharp(await image.png().toBuffer());
  }
  for (const width of [640, 1440]) {
    await image.clone().resize({ width }).webp({ quality: 83 }).toFile(`public/media/${name}-${width}.webp`);
  }
}

const cover = await sharp('public/media/data-preview-1440.webp')
  .resize(700, 335, {fit:'contain', background:'#213b31'})
  .flatten({background:'#213b31'}).toBuffer();
await sharp({create:{width:1200,height:630,channels:3,background:'#0e211c'}})
  .composite([
    {input:cover,top:132,left:452},
    {input:Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="410" height="210"><text x="0" y="55" fill="#ddec80" font-family="sans-serif" font-size="22" letter-spacing="2">SELECTED WORK</text><text x="0" y="128" fill="#f8f7ee" font-family="Georgia,serif" font-size="65">Suman Das</text><text x="0" y="177" fill="#f8f7ee" font-family="sans-serif" font-size="21">Full-stack &amp; AI product engineering</text></svg>'),top:190,left:43}
  ]).webp({quality:87}).toFile('public/media/social.webp');
