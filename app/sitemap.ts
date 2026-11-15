import type { MetadataRoute } from 'next';
import { projects } from './projects';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  if (!url) return [];
  return ['/', ...projects.map(({slug}) => `/work/${slug}/`)].map(path => ({
    url: new URL(path, url).toString(),
  }));
}
