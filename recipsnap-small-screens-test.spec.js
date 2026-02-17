// @ts-check
const { test, devices } = require('@playwright/test');

const RECIPSNAP_URL = 'https://recipsnap.com';

test.describe('RecipSnap Small Screen AppBar Tests', () => {

  const testDevices = [
    { name: 'iPhone SE', device: devices['iPhone SE'] },
    { name: 'Galaxy S9+', device: devices['Galaxy S9+'] },
    { name: 'Custom 320px', device: {
      viewport: { width: 320, height: 568 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    }},
    { name: 'Custom 360px', device: {
      viewport: { width: 360, height: 640 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    }},
    { name: 'iPhone 14 Pro', device: devices['iPhone 14 Pro'] },
    { name: 'iPhone 14 Pro Max', device: devices['iPhone 14 Pro Max'] },
  ];

  for (const testDevice of testDevices) {
    test(`${testDevice.name} - AppBar Analysis`, async ({ browser }) => {
      const context = await browser.newContext(testDevice.device);
      const page = await context.newPage();
      await page.goto(RECIPSNAP_URL);
      await page.waitForLoadState('networkidle');

      const viewport = page.viewportSize();
      console.log(`\n=== ${testDevice.name} ===`);
      console.log('Viewport:', `${viewport.width}x${viewport.height}`);

      // Get detailed appbar metrics
      const appbarMetrics = await page.evaluate(() => {
        const header = document.querySelector('header') || document.querySelector('nav');
        if (!header) return null;

        const buttons = Array.from(header.querySelectorAll('button, a'));
        const totalButtonWidth = buttons.reduce((sum, btn) => sum + btn.offsetWidth, 0);

        return {
          headerWidth: header.offsetWidth,
          headerHeight: header.offsetHeight,
          buttonCount: buttons.length,
          totalButtonWidth: totalButtonWidth,
          utilization: ((totalButtonWidth / header.offsetWidth) * 100).toFixed(1) + '%',
          buttons: buttons.map((btn, index) => ({
            index: index,
            text: btn.textContent?.trim().substring(0, 20),
            width: btn.offsetWidth,
            height: btn.offsetHeight,
            overflow: btn.scrollWidth > btn.offsetWidth
          })),
          computedStyle: {
            padding: window.getComputedStyle(header).padding,
            gap: window.getComputedStyle(header).gap,
          }
        };
      });

      console.log('AppBar Metrics:', JSON.stringify(appbarMetrics, null, 2));
      console.log('Button Width Utilization:', appbarMetrics?.utilization);

      // Check for overflow
      const hasOverflow = await page.evaluate(() => {
        const header = document.querySelector('header') || document.querySelector('nav');
        return header ? header.scrollWidth > header.clientWidth : false;
      });

      if (hasOverflow) {
        console.log('⚠️  WARNING: AppBar has horizontal overflow!');
      }

      // Screenshot just the appbar
      const filename = testDevice.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
      await page.screenshot({
        path: `screenshots/appbar-${filename}.png`,
        clip: { x: 0, y: 0, width: viewport.width, height: 100 }
      });

      // Full page for reference
      await page.screenshot({
        path: `screenshots/full-${filename}.png`,
        fullPage: true
      });

      await context.close();
    });
  }
});
