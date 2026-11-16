# Suman Das · Full-stack developer & AI product engineer

**I build the first version of your product and the systems that keep it running.**

I work with founders and agencies to turn a product brief into a working application. I design the user workflow, build the interface and backend, and handle testing and deployment. Bring me in for a SaaS MVP, an internal tool, or an AI feature that needs to fit into an existing product.

[**Explore the live portfolio**](https://sumandas-dev.web.app/) · [**Discuss a project on Fiverr**](https://www.fiverr.com/s/VrDVm6l) · [**Email me**](mailto:suman@breathy.in)

## What I can build for you

- **SaaS MVPs.** Launch the core workflow with accounts, permissions, dashboards, and the data model it needs.
- **Internal tools and APIs.** Replace a spreadsheet or manual handoff with a workflow your team can review, track, and use every day.
- **AI features.** Add document search with citations, structured feedback, or on-device retrieval where it makes the product more useful.
- **Improvements to existing products.** Fix a fragile integration, simplify a confusing workflow, or help your team ship the next release.

## Selected work

| Product | What I built |
| --- | --- |
| [**MEMORY**](https://sumandas-dev.web.app/work/memory/) | An Android app that turns photo and voice captures into searchable memories, with on-device processing and retrieval. |
| [**AgencyOS**](https://sumandas-dev.web.app/work/agency-os/) | A creative review workspace that ties client sign-off to the exact version of an asset and flags new versions for reapproval. |
| [**RenderFix Studio**](https://sumandas-dev.web.app/work/renderfix/) | A desktop media workspace with local frame export, image cutouts, and video cleanup. |
| [**Spendwise AI**](https://sumandas-dev.web.app/work/spendwise/) | A finance workspace prototype that connects transaction records, budgets, recurring expenses, and cash-flow reporting. |
| [**Breathy**](https://sumandas-dev.web.app/work/breathy/) | A clinic workflow that connects appointment scheduling, front-desk check-in, and the live queue. |

Each case study shows the product decisions, the implementation, and what was verified.

## Start a project

Share **who it’s for, what’s already built, and what you want to ship first**. I’ll help you define a first release that focuses on the workflow users need most.

[**Start a project**](https://sumandas-dev.web.app/#contact) · [**Message me on Fiverr**](https://www.fiverr.com/s/VrDVm6l)

<details>
<summary>Repository setup and deployment</summary>

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

</details>
