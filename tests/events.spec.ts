import { test, expect } from '@playwright/test';

test.describe('Events Page', () => {
  test('should display events page with event cards', async ({ page }) => {
    await page.goto('/events');
    
    // Check the page title
    await expect(page).toHaveTitle(/Wydarzenia/);
    
    // Check for at least one event card (MUI Card)
    const eventCards = page.locator('.MuiCard-root');
    await expect(eventCards.first()).toBeVisible();
    
    // Event cards should have the key elements
    await expect(page.locator('.MuiCard-root h3').first()).toBeVisible(); // Title
    
    // Check for date & location elements with icons
    await expect(page.locator('svg[data-testid="CalendarTodayIcon"]').first()).toBeVisible();
    await expect(page.locator('svg[data-testid="LocationOnIcon"]').first()).toBeVisible();
  });
  
  test('should open calendar dropdown in event card', async ({ page }) => {
    await page.goto('/events');
    
    // Find the calendar button in the first event card
    const calendarButton = page.getByTestId('calendar-button').first();
    await expect(calendarButton).toBeVisible();
    
    // Click the button to open dropdown
    await calendarButton.click();
    
    // The menu dropdown should be visible with calendar options
    await expect(page.getByText('Google Calendar')).toBeVisible();
    await expect(page.getByText('Pobierz plik .ics')).toBeVisible();
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
});