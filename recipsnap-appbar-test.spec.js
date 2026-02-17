// @ts-check
const { test, devices } = require('@playwright/test');

const RECIPSNAP_URL = 'https://recipsnap.com';

test.describe('RecipSnap AppBar Tests', () => {

  test('iPhone 14 Pro Max - Full Page', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone 14 Pro Max']
    });
    const page = await context.newPage();
    await page.goto(RECIPSNAP_URL);
    await page.waitForLoadState('networkidle');

    const viewport = page.viewportSize();
    console.log('iPhone 14 Pro Max Viewport:', viewport);

    // Full page screenshot
    await page.screenshot({
      path: 'screenshots/recipsnap-iphone-14-pro-max-full.png',
      fullPage: true
    });

    // Just the top appbar area
    await page.screenshot({
      path: 'screenshots/recipsnap-iphone-14-pro-max-appbar.png',
      clip: { x: 0, y: 0, width: viewport.width, height: 200 }
    });

    // Get appbar info
    const appbarInfo = await page.evaluate(() => {
      const header = document.querySelector('header') || document.querySelector('nav');
      if (header) {
        const buttons = header.querySelectorAll('button, a');
        return {
          headerWidth: header.offsetWidth,
          headerHeight: header.offsetHeight,
          buttonCount: buttons.length,
          buttons: Array.from(buttons).map(btn => ({
            text: btn.textContent?.trim(),
            width: btn.offsetWidth,
            height: btn.offsetHeight,
            visible: btn.offsetWidth > 0 && btn.offsetHeight > 0
          }))
        };
      }
      return null;
    });

    console.log('AppBar Info:', JSON.stringify(appbarInfo, null, 2));

    await context.close();
  });

  test('iPhone 14 Pro Max - Appbar Element Details', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone 14 Pro Max']
    });
    const page = await context.newPage();
    await page.goto(RECIPSNAP_URL);
    await page.waitForLoadState('networkidle');

    // Take snapshot to see structure
    const snapshot = await page.accessibility.snapshot();
    console.log('Accessibility Snapshot:', JSON.stringify(snapshot, null, 2));

    await context.close();
  });

  // Compare with iPhone 14 Pro (non-Max)
  test('iPhone 14 Pro - AppBar for comparison', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone 14 Pro']
    });
    const page = await context.newPage();
    await page.goto(RECIPSNAP_URL);
    await page.waitForLoadState('networkidle');

    const viewport = page.viewportSize();
    console.log('iPhone 14 Pro Viewport:', viewport);

    await page.screenshot({
      path: 'screenshots/recipsnap-iphone-14-pro-appbar.png',
      clip: { x: 0, y: 0, width: viewport.width, height: 200 }
    });

    await context.close();
  });
});
