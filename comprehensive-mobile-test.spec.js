// @ts-check
const { test, devices } = require('@playwright/test');

const RECIPSNAP_URL = 'https://recipsnap.com';

test.describe('Comprehensive Mobile Screen Size Testing', () => {

  // Test all common mobile screen sizes
  const screenSizes = [
    // Extra Small Phones
    { name: '280px - Smallest', width: 280, height: 653, category: 'XS Phone' },
    { name: '320px - iPhone SE', width: 320, height: 568, category: 'Small Phone' },

    // Small Phones
    { name: '360px - Common Android', width: 360, height: 640, category: 'Small Phone' },
    { name: '375px - iPhone 8/X/11/12/13', width: 375, height: 667, category: 'Small Phone' },

    // Medium Phones
    { name: '390px - iPhone 12 Pro', width: 390, height: 844, category: 'Medium Phone' },
    { name: '393px - iPhone 14 Pro', width: 393, height: 852, category: 'Medium Phone' },
    { name: '412px - Pixel 6', width: 412, height: 915, category: 'Medium Phone' },
    { name: '414px - iPhone Plus models', width: 414, height: 896, category: 'Medium Phone' },

    // Large Phones
    { name: '428px - iPhone 14 Pro Max', width: 428, height: 926, category: 'Large Phone' },
    { name: '430px - iPhone 14 Pro Max', width: 430, height: 932, category: 'Large Phone' },

    // Foldables
    { name: '540px - Surface Duo', width: 540, height: 720, category: 'Foldable' },

    // Small Tablets
    { name: '600px - Small Tablet', width: 600, height: 960, category: 'Tablet' },
    { name: '768px - iPad Portrait', width: 768, height: 1024, category: 'Tablet' },
    { name: '800px - Tablet', width: 800, height: 1280, category: 'Tablet' },
  ];

  for (const screen of screenSizes) {
    test(`${screen.name} - Navigation Analysis`, async ({ browser }) => {
      const context = await browser.newContext({
        viewport: { width: screen.width, height: screen.height },
        deviceScaleFactor: 2,
        isMobile: screen.width < 768,
        hasTouch: true,
      });

      const page = await context.newPage();
      await page.goto(RECIPSNAP_URL);
      await page.waitForLoadState('networkidle');

      console.log(`\n${'='.repeat(60)}`);
      console.log(`${screen.category.toUpperCase()}: ${screen.name}`);
      console.log(`${'='.repeat(60)}`);

      // Analyze navigation
      const navAnalysis = await page.evaluate(() => {
        const header = document.querySelector('header') || document.querySelector('nav');
        if (!header) return null;

        const allButtons = Array.from(header.querySelectorAll('button, a'));
        const visibleButtons = allButtons.filter(btn => {
          const rect = btn.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        });

        const totalWidth = allButtons.reduce((sum, btn) => sum + btn.offsetWidth, 0);
        const headerRect = header.getBoundingClientRect();

        return {
          headerWidth: header.offsetWidth,
          totalButtonWidth: totalWidth,
          utilization: ((totalWidth / header.offsetWidth) * 100).toFixed(1),
          overflow: header.scrollWidth > header.clientWidth,
          visibleButtons: visibleButtons.length,
          totalButtons: allButtons.length,
          hiddenButtons: allButtons.length - visibleButtons.length,
          headerHeight: header.offsetHeight,
          scrollWidth: header.scrollWidth,
          spacing: header.offsetWidth - totalWidth,
        };
      });

      if (navAnalysis) {
        console.log(`Header Width: ${navAnalysis.headerWidth}px`);
        console.log(`Total Button Width: ${navAnalysis.totalButtonWidth}px`);
        console.log(`Utilization: ${navAnalysis.utilization}%`);
        console.log(`Available Space: ${navAnalysis.spacing}px`);
        console.log(`Visible Buttons: ${navAnalysis.visibleButtons}/${navAnalysis.totalButtons}`);

        if (navAnalysis.overflow) {
          console.log(`⚠️  OVERFLOW DETECTED!`);
          console.log(`Scroll Width: ${navAnalysis.scrollWidth}px (${navAnalysis.scrollWidth - navAnalysis.headerWidth}px overflow)`);
        }

        // Determine status
        const util = parseFloat(navAnalysis.utilization);
        let status = '✅ Good';
        if (util > 100) status = '🔴 CRITICAL - Overflow';
        else if (util > 90) status = '🟠 Poor';
        else if (util > 80) status = '🟡 Cramped';
        else if (util > 70) status = '⚠️  Tight';

        console.log(`Status: ${status}`);
      }

      // Take screenshots
      const filename = screen.name.toLowerCase().replace(/[^a-z0-9]/g, '-');

      // Appbar only
      await page.screenshot({
        path: `screenshots/nav-${filename}.png`,
        clip: { x: 0, y: 0, width: screen.width, height: 80 }
      });

      // Full page
      await page.screenshot({
        path: `screenshots/page-${filename}.png`,
        fullPage: true
      });

      await context.close();
    });
  }
});

// Test orientation changes
test.describe('Orientation Testing', () => {

  const devices_to_test = [
    { name: 'iPhone 14 Pro', device: devices['iPhone 14 Pro'] },
    { name: 'iPhone 14 Pro Max', device: devices['iPhone 14 Pro Max'] },
    { name: 'Pixel 5', device: devices['Pixel 5'] },
  ];

  for (const testDevice of devices_to_test) {
    test(`${testDevice.name} - Portrait vs Landscape`, async ({ browser }) => {
      // Portrait
      const portraitContext = await browser.newContext(testDevice.device);
      const portraitPage = await portraitContext.newPage();
      await portraitPage.goto(RECIPSNAP_URL);
      await portraitPage.waitForLoadState('networkidle');

      const portraitViewport = portraitPage.viewportSize();
      console.log(`\n${testDevice.name} Portrait: ${portraitViewport.width}x${portraitViewport.height}`);

      await portraitPage.screenshot({
        path: `screenshots/orientation-${testDevice.name.toLowerCase().replace(/\s+/g, '-')}-portrait.png`,
        clip: { x: 0, y: 0, width: portraitViewport.width, height: 80 }
      });
      await portraitContext.close();

      // Landscape
      const device = testDevice.device;
      const landscapeContext = await browser.newContext({
        ...device,
        viewport: {
          width: device.viewport.height,
          height: device.viewport.width,
        }
      });
      const landscapePage = await landscapeContext.newPage();
      await landscapePage.goto(RECIPSNAP_URL);
      await landscapePage.waitForLoadState('networkidle');

      const landscapeViewport = landscapePage.viewportSize();
      console.log(`${testDevice.name} Landscape: ${landscapeViewport.width}x${landscapeViewport.height}`);

      await landscapePage.screenshot({
        path: `screenshots/orientation-${testDevice.name.toLowerCase().replace(/\s+/g, '-')}-landscape.png`,
        clip: { x: 0, y: 0, width: landscapeViewport.width, height: 80 }
      });
      await landscapeContext.close();
    });
  }
});
