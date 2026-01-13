import { test, expect } from '@playwright/test';

test.describe('Events Page', () => {
  test('should display events page with event cards', async ({ page }) => {
    await page.goto('/events');
    
    // Check the page title to match the format in layout.tsx
    await expect(page).toHaveTitle(/Wydarzenia - Radzyń Podlaski/, { timeout: 10000 });
    
    // Check for at least one event card (MUI Card)
    const eventCards = page.locator('.MuiCard-root');
    await expect(eventCards.first()).toBeVisible();
    
    // Event cards should have the key elements
    await expect(page.locator('.MuiCard-root h3').first()).toBeVisible(); // Title
    
    // Check for date & location elements with icons
    await expect(page.locator('svg[data-testid="CalendarTodayIcon"]').first()).toBeVisible();
    await expect(page.locator('svg[data-testid="LocationOnIcon"]').first()).toBeVisible();
  });
  
  test('should render calendar action button in event card', async ({ page }) => {
    await page.goto('/events');
    
    // Find the calendar button in the first event card
    const calendarButton = page.getByTestId('calendar-button').first();
    await expect(calendarButton).toBeVisible({ timeout: 30000 });
  });
  
  test('should have working event filters if they exist', async ({ page }) => {
    await page.goto('/events');
    
    // Look for any filter chips or buttons
    const categoryFilters = page.locator('.MuiChip-root[data-filter], button[data-filter]');
    
    if (await categoryFilters.count() > 0) {
      // Click on the first category filter
      await categoryFilters.first().click();
      
      // There should still be at least one event visible after filtering
      const eventCards = page.locator('.MuiCard-root');
      await expect(eventCards.first()).toBeVisible();
    } else {
      console.log('No event filters found, skipping filter test');
    }
  });

  test('should navigate to event details page', async ({ page }) => {
    await page.goto('/events');

    const details = page.getByTestId('event-details-link').first();
    const href = await details.getAttribute('href');
    expect(href).toBeTruthy();
    await page.goto(href!);

    await expect(page).toHaveURL(/\/events\/[^/]+$/, { timeout: 15000 });
    await expect(page.getByRole('heading', { level: 2 })).toBeVisible();
  });
});