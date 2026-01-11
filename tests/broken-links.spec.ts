import { test, expect } from '@playwright/test';

/**
 * Broken Links Test Suite
 * Checks all internal links on main pages to ensure they don't return 404
 */

const PAGES_TO_TEST = [
  '/',
  '/city',
  '/county',
  '/map',
  '/places',
  '/events',
  '/contact',
  '/news',
];

test.describe('Broken Links Detection', () => {
  for (const pagePath of PAGES_TO_TEST) {
    test(`should have no broken internal links on ${pagePath}`, async ({ page }) => {
      // Navigate to the page
      await page.goto(`http://localhost:3800${pagePath}`);

      // Wait for page to load
      await page.waitForLoadState('networkidle');

      // Get all internal links (starting with /)
      const links = await page.locator('a[href^="/"]').all();

      const brokenLinks: { href: string; status: number }[] = [];

      // Test each link
      for (const link of links) {
        const href = await link.getAttribute('href');

        // Skip anchor links and invalid hrefs
        if (!href || href === '/' || href.startsWith('#') || href === pagePath) {
          continue;
        }

        try {
          // Try to navigate to the link
          const response = await page.goto(`http://localhost:3800${href}`, {
            waitUntil: 'domcontentloaded',
            timeout: 5000,
          });

          // Check if response is 404 or error
          if (response && response.status() >= 400) {
            brokenLinks.push({
              href,
              status: response.status(),
            });
          }

          // Navigate back to original page
          await page.goto(`http://localhost:3800${pagePath}`);
        } catch (error) {
          // If navigation fails, consider it broken
          brokenLinks.push({
            href,
            status: 0, // 0 indicates navigation error
          });

          // Try to recover
          await page.goto(`http://localhost:3800${pagePath}`).catch(() => {});
        }
      }

      // Assert no broken links
      if (brokenLinks.length > 0) {
        console.log(`\\nBroken links found on ${pagePath}:`);
        brokenLinks.forEach(({ href, status }) => {
          console.log(`  - ${href} (${status === 0 ? 'Navigation Error' : `HTTP ${status}`})`);
        });
      }

      expect(brokenLinks).toEqual([]);
    });
  }

  test('should have no external broken links on homepage', async ({ page }) => {
    await page.goto('http://localhost:3800/');
    await page.waitForLoadState('networkidle');

    // Get all external links
    const externalLinks = await page
      .locator('a[href^="http"]:not([href^="http://localhost"])')
      .all();

    const brokenLinks: { href: string; error: string }[] = [];

    for (const link of externalLinks) {
      const href = await link.getAttribute('href');
      if (!href) continue;

      try {
        // Try HEAD request first (faster)
        const response = await fetch(href, {
          method: 'HEAD',
          signal: AbortSignal.timeout(5000),
        });

        if (response.status >= 400) {
          brokenLinks.push({
            href,
            error: `HTTP ${response.status}`,
          });
        }
      } catch (error) {
        brokenLinks.push({
          href,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    if (brokenLinks.length > 0) {
      console.log('\\nBroken external links found:');
      brokenLinks.forEach(({ href, error }) => {
        console.log(`  - ${href} (${error})`);
      });
    }

    // Warning instead of failure for external links (they may be temporarily down)
    if (brokenLinks.length > 0) {
      console.warn(`Warning: ${brokenLinks.length} external links may be broken`);
    }
  });
});
