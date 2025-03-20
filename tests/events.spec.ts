import { test, expect } from '@playwright/test';

test.describe('Events Page', () => {
  test('should display events page with event cards', async ({ page }) => {
    await page.goto('/events');
    
    // Check the page title
    await expect(page).toHaveTitle(/Wydarzenia/);
    
    // Check for at least one event card
    const eventCards = page.locator('.bg-white.rounded-lg.overflow-hidden.shadow-md');
    await expect(eventCards.first()).toBeVisible();
    
    // Event cards should have the key elements
    await expect(page.locator('.bg-white.rounded-lg h3').first()).toBeVisible(); // Title
    await expect(page.locator('svg + span').first()).toBeVisible(); // Date
  });
  
  test('should open calendar dropdown in event card', async ({ page }) => {
    await page.goto('/events');
    
    // Find the "Dodaj do kalendarza" button in the first event card
    const calendarButton = page.getByText('Dodaj do kalendarza');
    await expect(calendarButton).toBeVisible();
    
    // Click the button to open dropdown
    await calendarButton.first().click();
    
    // The dropdown should be visible with calendar options
    await expect(page.getByText('Google Calendar')).toBeVisible();
    await expect(page.getByText('Pobierz plik .ics')).toBeVisible();
  });
  
  test('should have working event filters', async ({ page }) => {
    await page.goto('/events');
    
    // If there are category filters, test them (adjust selectors based on actual implementation)
    const categoryFilters = page.locator('button[data-filter], a[data-filter]');
    
    if (await categoryFilters.count() > 0) {
      // Click on the first category filter
      await categoryFilters.first().click();
      
      // There should still be at least one event visible after filtering
      const eventCards = page.locator('.bg-white.rounded-lg.overflow-hidden.shadow-md');
      await expect(eventCards.first()).toBeVisible();
    }
  });
});