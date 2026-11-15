import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';

const base = process.env.TEST_ORIGIN || 'http://127.0.0.1:4175';
const screenshots = process.env.SCREENSHOT_DIR || 'test-artifacts';
const chrome = process.env.CHROME_BIN || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const require = createRequire(import.meta.url);
const axePath = require.resolve('axe-core/axe.min.js');
const audits = [];
const slugs = ['data-visualizer','renderfix','snappost-ai','breathy'];

await mkdir(screenshots,{recursive:true});
const browser = await chromium.launch({executablePath:chrome,headless:true});
try {
  for (const [width,height] of [[1440,900],[1280,800],[820,1024],[390,844],[320,700]]) {
    const page = await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
    await page.context().grantPermissions(['clipboard-read','clipboard-write'],{origin:base});
    const errors = [];
    page.on('pageerror',error => errors.push(error.message));
    page.on('console',message => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('response',response => {
      if (response.status() >= 400 && response.url().startsWith(base)) errors.push(`${response.status()} ${response.url()}`);
    });
    await page.goto(base,{waitUntil:'networkidle'});
    await page.evaluate(() => document.fonts.ready);
    const pageFits = () => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth);
    assert(await pageFits(),`home overflows at ${width}px`);
    assert.equal(await page.locator('h1').count(),1);
    assert.equal(await page.locator('.work-card').count(),4);
    for (const section of ['work','services','about','contact']) assert.equal(await page.locator('#'+section).count(),1);
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement.textContent),'Skip to content');

    if (width === 1440 || width === 390) {
      await page.addScriptTag({path:axePath});
      const result = await page.evaluate(() => window.axe.run({
        runOnly: {type:'tag', values:['wcag2a','wcag2aa','wcag21a','wcag21aa']},
      }));
      audits.push(...result.violations.map(item=>`${width}px ${item.id}: ${item.nodes.map(node=>node.target.join(' ')).join(', ')}`));
      await page.evaluate(() => document.activeElement.blur());
      await page.screenshot({path:join(screenshots,`portfolio-${width}.jpg`),type:'jpeg',quality:88});
      if (width === 1440) await page.screenshot({path:join(screenshots,'portfolio-full.jpg'),type:'jpeg',quality:84,fullPage:true});
    }

    if (width <= 700) {
      const menu = page.getByRole('button',{name:'Menu',exact:true});
      await menu.click();
      assert.equal(await page.locator('#main-nav').isVisible(),true);
      await page.getByRole('navigation',{name:'Main'}).getByRole('link',{name:'Contact'}).focus();
      await page.keyboard.press('Escape');
      assert.equal(await menu.getAttribute('aria-expanded'),'false');
      await menu.click();
      await page.getByRole('navigation',{name:'Main'}).getByRole('link',{name:'Services'}).click();
      await page.waitForURL('**/#services');
      assert.equal(await page.locator('#main-nav').isVisible(),false);
    } else if (width === 1440) {
      for (const [label,anchor] of [['Work','work'],['Services','services'],['About','about'],['Contact','contact']]) {
        await page.getByRole('navigation',{name:'Main'}).getByRole('link',{name:label,exact:true}).click();
        await page.waitForURL(`**/#${anchor}`);
      }
    }
    await page.getByRole('link',{name:'View selected work',exact:true}).click();
    await page.waitForURL('**/#work');
    await page.getByRole('link',{name:'Start a project',exact:true}).click();
    await page.waitForURL('**/#contact');

    const email = page.getByLabel('Email',{exact:true});
    const detail = page.getByLabel('What are you building?');
    await page.getByLabel('Name',{exact:true}).fill('Test Client');
    await email.fill('invalid-email');
    await detail.fill('A portal for order tracking.');
    await page.getByRole('button',{name:'Prepare email'}).click();
    assert.equal(await email.evaluate(element=>element.validity.typeMismatch),true);
    assert.equal(await page.getByRole('link',{name:'Open in email app'}).count(),0);
    await email.fill('client@example.invalid');
    await page.getByRole('button',{name:'Prepare email'}).click();
    const draft = page.getByRole('link',{name:'Open in email app'});
    assert.match(await draft.getAttribute('href'),/^mailto:suman@breathy\.in\?subject=/);
    assert.match(await page.getByLabel('Email draft').inputValue(),/A portal for order tracking/);
    await page.getByRole('button',{name:'Copy draft'}).click();
    await page.getByRole('status').filter({hasText:'Draft copied.'}).waitFor();
    assert.match(await page.evaluate(() => navigator.clipboard.readText()), /A portal for order tracking/);
    await detail.fill('A new project.');
    assert.equal(await draft.count(),0);

    for (const slug of slugs) {
      await page.locator(`.work-cover-link[href="/work/${slug}/"]`).click();
      assert(await pageFits(),`${slug} overflows at ${width}px`);
      await page.getByRole('heading',{name:'Architecture',exact:true}).waitFor();
      await page.reload({waitUntil:'networkidle'});
      await page.getByRole('heading',{name:'Architecture',exact:true}).waitFor();
      if (width === 1440 || width === 390) {
        if (width === 1440 || slug === 'data-visualizer') {
          await page.screenshot({path:join(screenshots,`case-${slug}-${width}.jpg`),type:'jpeg',quality:88});
        }
        await page.addScriptTag({path:axePath});
        const result = await page.evaluate(() => window.axe.run({runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}}));
        audits.push(...result.violations.map(item=>`${slug} ${width}px ${item.id}: ${item.nodes.map(node=>node.target.join(' ')).join(', ')}`));
      }
      await page.getByRole('link',{name:'Selected work'}).click();
      await page.waitForURL('**/#work');
    }
    assert.deepEqual(errors,[],`browser errors at ${width}px`);
    console.log(`Passed ${width}×${height}: navigation, CTAs, enquiry validation, case study routes, refresh, overflow and console.`);
    if (width === 1440) {
      const missing = await page.goto(`${base}/missing-page/`);
      assert.equal(missing.status(),404);
      await page.getByRole('heading',{name:'That page is missing.'}).waitFor();
    }
    await page.close();
  }
  assert.deepEqual(audits,[],'axe WCAG A/AA findings');
  console.log('Axe WCAG A/AA checks passed for homepage and all four case studies at desktop and mobile.');
} finally {
  await browser.close();
}
