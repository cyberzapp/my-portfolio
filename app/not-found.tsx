import Link from 'next/link';
import { Arrow } from './components';

export default function NotFound() {
  return <main id="main" className="section shell not-found">
    <p className="eyebrow">404</p><h1>That page is missing.</h1>
    <p>Browse the portfolio to find a project or get in touch.</p>
    <Link className="button button-dark" href="/#work">View selected work <Arrow /></Link>
  </main>;
}
