import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Architecture, Arrow, ProjectImage } from '../../components';
import { projects } from '../../projects';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => projects.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) return {};
  const title = project.name;
  const description = project.description;
  const canonical = `/work/${slug}/`;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const images = siteUrl ? [project.media.length ? `/media/${project.media[0].file}-1440.webp` : '/media/social.webp'] : undefined;
  return {
    title,
    description,
    ...(siteUrl ? { alternates: { canonical } } : {}),
    openGraph: { title, description, type: 'article', siteName: 'Suman Das', images },
    twitter: { card: 'summary_large_image', title, description, images },
  };
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex(item => item.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const cover = project.media[0];
  return <main id="main">
    <header className={`case-hero ${project.color}`}><div className="shell">
      <Link className="back-link" href="/#work">← Selected work</Link>
      <p className="eyebrow">{project.category}</p>
      <h1>{project.name}</h1><p className="case-description">{project.description}</p>
      <div className="case-links"><span>{project.status}</span>{project.link && <a href={project.link.url}>{project.link.label} <Arrow diagonal /></a>}</div>
    </div></header>

    <div className="shell case-content">
      {cover && <figure className="case-figure case-cover"><div className="case-frame"><ProjectImage media={cover} eager /></div><figcaption>{cover.caption}</figcaption></figure>}
      <div className="case-grid">
        <aside className="case-spec"><h2>Project details</h2><h3>Contribution &amp; scope</h3><p>{project.contribution}</p>
          <h3>Technology</h3><ul className="tags">{project.stack.map(tech => <li key={tech}>{tech}</li>)}</ul>
        </aside>
        <article className="case-narrative">
          {project.sections.slice(0,2).map(section => <section key={section.heading}><h2>{section.heading}</h2><p>{section.text}</p></section>)}
          <section><h2>Architecture</h2><Architecture project={project} /></section>
          {project.sections.slice(2).map(section => <section key={section.heading}><h2>{section.heading}</h2><p>{section.text}</p></section>)}
        </article>
      </div>
      {project.media.slice(1).map(media => <figure key={media.file} className="case-figure"><div className="case-frame secondary-frame"><ProjectImage media={media} /></div><figcaption>{media.caption}</figcaption></figure>)}
      <div className="next-project"><div><p className="eyebrow">Next case study</p><Link href={`/work/${next.slug}/`}>{next.name} <Arrow /></Link></div><Link className="button button-dark" href="/#contact">Start a project <Arrow diagonal /></Link></div>
    </div>
  </main>;
}
