// @ts-check
const { test, devices } = require('@playwright/test');

// Quick mobile test on different devices
test.describe('Mobile Device Tests', () => {

  test('iPhone 14 Pro', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone 14 Pro']
    });
    const page = await context.newPage();
    await page.goto('https://example.com');
    console.log('✓ iPhone 14 Pro - Title:', await page.title());
    await page.screenshot({ path: 'screenshots/iphone-14-pro.png', fullPage: true });
    await context.close();
  });

  test('iPhone SE (small screen)', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone SE']
    });
    const page = await context.newPage();
    await page.goto('https://example.com');
    console.log('✓ iPhone SE - Title:', await page.title());
    await page.screenshot({ path: 'screenshots/iphone-se.png', fullPage: true });
    await context.close();
  });

  test('Samsung Galaxy S9+', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['Galaxy S9+']
    });
    const page = await context.newPage();
    await page.goto('https://example.com');
    console.log('✓ Galaxy S9+ - Title:', await page.title());
    await page.screenshot({ path: 'screenshots/galaxy-s9.png', fullPage: true });
    await context.close();
  });

  test('iPad Pro (tablet)', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPad Pro']
    });
    const page = await context.newPage();
    await page.goto('https://example.com');
    console.log('✓ iPad Pro - Title:', await page.title());
    await page.screenshot({ path: 'screenshots/ipad-pro.png', fullPage: true });
    await context.close();
  });
});

// Test custom viewport sizes
test.describe('Custom Mobile Viewports', () => {

  const viewports = [
    { name: 'Small (320px)', width: 320, height: 568 },
    { name: 'Medium (375px)', width: 375, height: 667 },
    { name: 'Large (414px)', width: 414, height: 896 },
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
      await page.goto('https://example.com');
      console.log(`✓ ${viewport.name} - Viewport: ${viewport.width}x${viewport.height}`);

      const filename = viewport.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
      await page.screenshot({ path: `screenshots/${filename}.png`, fullPage: true });

      await context.close();
    });
  }
});
