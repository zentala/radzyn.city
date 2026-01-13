import { test, expect } from '@playwright/test';

test.describe('County history timeline', () => {
  test('should render a connected timeline with year column and items', async ({ page }) => {
    await page.goto('/county');
    await page.waitForLoadState('networkidle');

    // Section should exist
    await expect(page.getByRole('heading', { name: 'Historia (oś czasu)' })).toBeVisible();

    // Timeline root (stable hook)
    const timeline = page.getByTestId('county-history-timeline');
    await expect(timeline).toBeVisible();

    // Continuous rail should exist (single element / pseudo-element provides the line)
    await expect(timeline.getByTestId('history-timeline-rail')).toBeVisible();

    // Items should render
    const items = timeline.getByTestId('history-timeline-item');
    await expect(items).toHaveCount(6);

    // Dots: one per item
    await expect(timeline.getByTestId('history-timeline-dot')).toHaveCount(6);

    // Years should be present (year column)
    const years = timeline.getByTestId('history-timeline-year');
    await expect(years).toHaveCount(6);
    await expect(timeline).toContainText('1468');
    await expect(timeline).toContainText('2023');
  });
});

