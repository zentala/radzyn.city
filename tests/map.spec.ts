import { test, expect } from '@playwright/test';

test.describe('Map page', () => {
  test('should render the shared GeoMap and support deep-link selection', async ({ page }) => {
    await page.goto('/map');
    await page.waitForLoadState('networkidle');

    // GeoMap wrapper should exist (stable E2E hook).
    await expect(page.getByTestId('geo-map')).toBeVisible();

    // Leaflet should mount a container inside.
    await expect(page.locator('.leaflet-container')).toBeVisible();

    // Deep link: selected POI should show in details panel.
    await page.goto('/map?poi=palac-potockich');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Pałac Potockich')).toBeVisible();
  });
});

