import type { Metadata } from 'next';
import '@fontsource-variable/dm-sans/wght.css';
import '@fontsource/instrument-serif/latin-400.css';
import '@fontsource/instrument-serif/latin-400-italic.css';
import './globals.css';
import Navigation from './navigation';
import { Footer } from './components';

const title = 'Suman Das — Full-stack developer & AI product engineer';
const description = 'Independent developer building full-stack web applications, SaaS products and AI workflows for startup teams and agencies.';
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
const siteUrl = configuredUrl ? new URL(configuredUrl) : undefined;

export const metadata: Metadata = {
  title: { default: title, template: '%s | Suman Das' },
  description,
  metadataBase: siteUrl,
  ...(siteUrl ? { alternates: { canonical: '/' } } : {}),
  openGraph: { title, description, type: 'website', siteName: 'Suman Das', ...(siteUrl ? { images: ['/media/social.webp'] } : {}) },
  twitter: { card: 'summary_large_image', title, description, ...(siteUrl ? { images: ['/media/social.webp'] } : {}) },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>
    <a className="skip-link" href="#main">Skip to content</a>
    <Navigation />
    {children}
    <Footer />
  </body></html>;
}
