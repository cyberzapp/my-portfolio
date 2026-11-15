import Link from 'next/link';
import Contact from './contact';
import { Arrow, ProjectArt, ProjectImage } from './components';
import { profile, projects } from './projects';

const services = [
  ['Full-stack applications', 'Replace manual handoffs and disconnected tools with an application that connects the interface, business rules and data.'],
  ['SaaS MVP development', 'Take one product workflow from discovery to a usable release. Define the scope, account model and core experience before building.'],
  ['AI product integration', 'Add AI where it helps users get work done, with human review, fallbacks and clear boundaries around data.'],
  ['Backend and API development', 'Give products reliable contracts for authentication, data access, state changes and integrations.'],
  ['Existing application improvements', 'Improve a slow or confusing workflow without destabilizing the parts your users already rely on.'],
  ['Deployment and support', 'Prepare environments, verify the production build and document how to operate the release.'],
];

const capabilities = [
  ['Frontend', 'React · Next.js · TypeScript · Tailwind CSS'],
  ['Backend & data', 'Node.js · Express · Supabase · PostgreSQL'],
  ['AI & desktop', 'Gemini integration · Python · Electron · MLX'],
  ['Deployment & mobile', 'Firebase Hosting · Google Cloud build configuration · React Native / Expo'],
];

const process = [
  ['Discovery', 'Agree on the users, the business problem and the decision the first release needs to support.'],
  ['Planning', 'Define scope, data flows, integration risks and what counts as done.'],
  ['Design', 'Walk through the core screens and their empty, loading and error states.'],
  ['Development', 'Build in usable slices so you can review working software early.'],
  ['Testing', 'Exercise the critical paths, edge cases and target devices.'],
  ['Deployment', 'Verify the production build and hand over a repeatable release process.'],
  ['Support', 'Triage issues and prioritize improvements using feedback from real use.'],
];

export default function Home() {
  const featured = projects[0];
  return <main id="main">
    <section className="hero">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Independent full-stack developer</p>
          <h1>Complex workflows.<br className="wide-break" /> <em>Clear software.</em></h1>
          <p className="hero-intro">I build SaaS products, internal tools and AI features for founders and agencies, from the data model through deployment.</p>
          <div className="hero-actions"><a className="button button-accent" href="#work">View selected work <Arrow /></a><a className="button button-outline" href="#contact">Start a project <Arrow diagonal /></a></div>
        </div>
        <Link className="hero-visual" href={`/work/${featured.slug}/`}>
          <span className="visual-top"><span><i /> Featured build</span><Arrow diagonal /></span>
          <div className="visual-screen"><ProjectImage media={featured.media[0]} eager /></div>
          <span className="visual-bottom"><strong>{featured.name}</strong><span>Paste data → Review → Chart</span></span>
        </Link>
      </div>
    </section>

    <section id="work" className="section shell">
      <header className="section-header"><div><p className="eyebrow">Portfolio</p><h2>Selected work</h2></div><p>Product decisions, system design and working interfaces from four projects.</p></header>
      <div className="project-grid">{projects.map(project => <article key={project.slug} className="work-card">
        <div className="work-cover"><ProjectArt project={project} /><Link href={`/work/${project.slug}/`} className="work-cover-link" aria-label={`Read the ${project.name} case study`} /></div>
        <div className="work-copy">
          <p className="eyebrow">{project.category}</p>
          <h3><Link href={`/work/${project.slug}/`}>{project.name}</Link></h3>
          <p>{project.description}</p>
          <div className="work-links"><Link href={`/work/${project.slug}/`}>Case study <Arrow /></Link>{project.link && <a href={project.link.url}>{project.link.label} <Arrow diagonal /></a>}</div>
        </div>
      </article>)}</div>
    </section>

    <section id="services" className="section dark"><div className="shell">
      <header className="section-header"><div><p className="eyebrow">Services</p><h2>What I can build</h2></div><p>Bring me a product idea, an integration that needs to work, or an application that needs to improve.</p></header>
      <div className="service-grid">{services.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
      <div className="capability-grid"><h3>Technical capabilities</h3><dl>{capabilities.map(([group, tools]) => <div key={group}><dt>{group}</dt><dd>{tools}</dd></div>)}</dl></div>
    </div></section>

    <section className="section shell">
      <header className="section-header"><div><p className="eyebrow">Process</p><h2>How I work</h2></div><p>See working software early, understand the engineering trade-offs and know what happens at handover.</p></header>
      <ol className="process-list">{process.map(([stage, text], index) => <li key={stage}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><h3>{stage}</h3><p>{text}</p></li>)}</ol>
    </section>

    <section id="about" className="about"><div className="shell about-inner">
      <div><p className="eyebrow">About</p><h2>I’m Suman Das.</h2></div>
      <div><p>I’m an independent full-stack developer and product builder. I work across the interface, API and data model, and I care about the details that make the whole workflow usable.</p><p>I can join a team for a focused build or carry an initial release from discovery through deployment. I’m interested in the problem the software needs to solve and the people who will use it.</p></div>
    </div></section>

    <section id="contact" className="section dark contact"><div className="shell contact-grid">
      <div><p className="eyebrow">Project enquiries</p><h2>Tell me what<br /> you’re building.</h2><p>Share the goal, the people it’s for and where you are today.</p><a className="email-link" href={`mailto:${profile.email}`}>{profile.email} <Arrow diagonal /></a></div>
      <Contact />
    </div></section>
  </main>;
}
