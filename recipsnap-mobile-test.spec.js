// @ts-check
const { test, devices, expect } = require('@playwright/test');

const RECIPSNAP_URL = 'https://recipsnap.com';

// Test RecipSnap on different mobile devices
test.describe('RecipSnap Mobile Device Tests', () => {

  test('iPhone 14 Pro', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone 14 Pro']
    });
    const page = await context.newPage();
    await page.goto(RECIPSNAP_URL);
    await page.waitForLoadState('networkidle');

    console.log('✓ iPhone 14 Pro - Title:', await page.title());
    console.log('  Viewport:', page.viewportSize());

    await page.screenshot({
      path: 'screenshots/recipsnap-iphone-14-pro.png',
      fullPage: true
    });
    await context.close();
  });

  test('iPhone SE (smallest iPhone)', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone SE']
    });
    const page = await context.newPage();
    await page.goto(RECIPSNAP_URL);
    await page.waitForLoadState('networkidle');

    console.log('✓ iPhone SE - Title:', await page.title());
    console.log('  Viewport:', page.viewportSize());

    await page.screenshot({
      path: 'screenshots/recipsnap-iphone-se.png',
      fullPage: true
    });
    await context.close();
  });

  test('Samsung Galaxy S9+', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['Galaxy S9+']
    });
    const page = await context.newPage();
    await page.goto(RECIPSNAP_URL);
    await page.waitForLoadState('networkidle');

    console.log('✓ Galaxy S9+ - Title:', await page.title());
    console.log('  Viewport:', page.viewportSize());

    await page.screenshot({
      path: 'screenshots/recipsnap-galaxy-s9.png',
      fullPage: true
    });
    await context.close();
  });

  test('Pixel 5', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['Pixel 5']
    });
    const page = await context.newPage();
    await page.goto(RECIPSNAP_URL);
    await page.waitForLoadState('networkidle');

    console.log('✓ Pixel 5 - Title:', await page.title());
    console.log('  Viewport:', page.viewportSize());

    await page.screenshot({
      path: 'screenshots/recipsnap-pixel-5.png',
      fullPage: true
    });
    await context.close();
  });

  test('iPad Pro (tablet)', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPad Pro']
    });
    const page = await context.newPage();
    await page.goto(RECIPSNAP_URL);
    await page.waitForLoadState('networkidle');

    console.log('✓ iPad Pro - Title:', await page.title());
    console.log('  Viewport:', page.viewportSize());

    await page.screenshot({
      path: 'screenshots/recipsnap-ipad-pro.png',
      fullPage: true
    });
    await context.close();
  });

  test('iPad Mini', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPad Mini']
    });
    const page = await context.newPage();
    await page.goto(RECIPSNAP_URL);
    await page.waitForLoadState('networkidle');

    console.log('✓ iPad Mini - Title:', await page.title());
    console.log('  Viewport:', page.viewportSize());

    await page.screenshot({
      path: 'screenshots/recipsnap-ipad-mini.png',
      fullPage: true
    });
    await context.close();
  });
});

// Test custom viewport sizes to catch edge cases
test.describe('RecipSnap Custom Mobile Viewports', () => {

  const viewports = [
    { name: 'Extra Small (320px)', width: 320, height: 568 },
    { name: 'Small (360px)', width: 360, height: 640 },
    { name: 'Medium (375px)', width: 375, height: 667 },
    { name: 'Large (414px)', width: 414, height: 896 },
    { name: 'XL (428px)', width: 428, height: 926 },
  ];

  for (const viewport of viewports) {
    test(`Custom viewport - ${viewport.name}`, async ({ browser }) => {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
      });

      const page = await context.newPage();
      await page.goto(RECIPSNAP_URL);
      await page.waitForLoadState('networkidle');

      console.log(`✓ ${viewport.name} - Viewport: ${viewport.width}x${viewport.height}`);

      const filename = viewport.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
      await page.screenshot({
        path: `screenshots/recipsnap-${filename}.png`,
        fullPage: true
      });

      await context.close();
    });
  }
});

// Test both orientations
test.describe('RecipSnap Orientation Tests', () => {

  test('iPhone 14 Pro - Portrait', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone 14 Pro']
    });
    const page = await context.newPage();
    await page.goto(RECIPSNAP_URL);
    await page.waitForLoadState('networkidle');

    console.log('✓ iPhone 14 Pro Portrait');
    await page.screenshot({
      path: 'screenshots/recipsnap-portrait.png',
      fullPage: true
    });
    await context.close();
  });

  test('iPhone 14 Pro - Landscape', async ({ browser }) => {
    const device = devices['iPhone 14 Pro'];
    const context = await browser.newContext({
      ...device,
      viewport: {
        width: device.viewport.height,
        height: device.viewport.width,
      }
    });
    const page = await context.newPage();
    await page.goto(RECIPSNAP_URL);
    await page.waitForLoadState('networkidle');

    console.log('✓ iPhone 14 Pro Landscape');
    await page.screenshot({
      path: 'screenshots/recipsnap-landscape.png',
      fullPage: true
    });
    await context.close();
  });
});
