import Link from 'next/link';
import type { Media, Project } from './projects';
import { profile } from './projects';

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>;
}

export function Footer() {
  return <footer className="footer"><div className="shell footer-inner">
    <Link href="/" className="wordmark">Suman Das<span>.</span></Link>
    <span>Independent full-stack developer &amp; AI product engineer</span>
    <div className="socials"><a href={profile.github}>GitHub <Arrow diagonal /></a><a href={profile.linkedin}>LinkedIn <Arrow diagonal /></a></div>
  </div></footer>;
}

export function ProjectImage({ media, eager = false }: { media: Media; eager?: boolean }) {
  // These audited screenshots are pre-encoded at two widths for the static build.
  /* eslint-disable @next/next/no-img-element */
  return <img
    src={`/media/${media.file}-640.webp`}
    srcSet={`/media/${media.file}-640.webp 640w, /media/${media.file}-1440.webp 1440w`}
    sizes="(max-width: 700px) calc(100vw - 42px), (max-width: 1020px) 82vw, 840px"
    width={media.width}
    height={media.height}
    alt={media.alt}
    loading={eager ? 'eager' : 'lazy'}
    fetchPriority={eager ? 'high' : 'auto'}
    decoding="async"
  />;
  /* eslint-enable @next/next/no-img-element */
}

export function Architecture({ project }: { project: Project }) {
  return <ol className="architecture" aria-label={`${project.name} architecture`}>
    {project.architecture.map((layer, index) => <li key={layer}><span aria-hidden="true">0{index + 1}</span>{layer}</li>)}
  </ol>;
}

export function ProjectArt({ project }: { project: Project }) {
  return <div className={`project-art ${project.color}`}>
    {project.media.length
      ? <ProjectImage media={project.media[0]} />
      : <div className="diagram-art"><span className="eyebrow">Clinic workflow diagram</span><Architecture project={project} /></div>}
  </div>;
}
