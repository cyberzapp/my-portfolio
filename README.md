# Suman Das · Product engineering portfolio

A Next.js static portfolio with four evidence-based case studies, enquiry draft preparation, and locally served type and responsive project media.

## Run locally

Requirements: Node.js 22 and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Edit the project records in `app/projects.ts`, homepage copy in `app/page.tsx`, and styling in `app/globals.css`. The optimized project assets are included. Regenerating them requires the original audited source images and the isolated Orbity captures. Running and deploying the site do not require those originals.

## Verify the export

```sh
npm run lint
npm run typecheck
npm run build
npm test
npm run preview
```

In another terminal, run `npm run test:browser`. The browser test defaults to installed Google Chrome on macOS. Set `CHROME_BIN` for a different executable or `TEST_ORIGIN` for an alternate preview. Screenshots go to `test-artifacts/`, or to `SCREENSHOT_DIR` when set.

## Deploy

The production build writes `out/`. For a new Vercel project, import this source repository after granting access, use the Next.js preset, and verify directory index routing and custom 404 behavior after deployment. Other static hosts can serve `out/` directly. Configure the host to serve `404.html` with HTTP 404 for unknown routes.

Set `NEXT_PUBLIC_SITE_URL` to the finished HTTPS origin **before** the final build. This enables absolute canonical URLs, social card images and the sitemap on the target domain. This is a public build setting. No secrets are needed.

The enquiry form validates and prepares an email draft in the browser. To send, the visitor opens their email app or copies the draft. There is no submission endpoint, and the page does not claim that an enquiry was sent. Confirm the receiving inbox is monitored before launch. For direct in-page delivery, connect a verified mailbox through a server-side email provider or hosted form service, then test delivery and handling of failures. Store any resulting credentials in the hosting service's secret settings.

See [PROJECT-INVENTORY.md](PROJECT-INVENTORY.md) for evidence, demo limitations and the environment audit.
