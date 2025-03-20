import { test, expect } from '@playwright/test';

test.describe('Weather Page', () => {
  test('should display weather page with mock data', async ({ page }) => {
    // Visit the weather page
    await page.goto('/pogoda');
    
    // Wait for the page to load (mock data will be displayed)
    await page.waitForSelector('text=Aktualna pogoda');
    
    // Check that the page title is correct
    await expect(page).toHaveTitle(/Pogoda w Radzyniu Podlaskim/);
    
    // Verify that the current weather section is displayed
    await expect(page.locator('h1')).toContainText('Radzyń Podlaski');
    
    // Check for forecast tabs
    const tabsSection = page.locator('role=tablist');
    await expect(tabsSection).toBeVisible();
    
    // Click on a forecast tab
    const tabs = page.locator('role=tab');
    await expect(tabs).toHaveCount.atleast(3);
    await tabs.nth(1).click();
    
    // Verify that the tab panel changed
    await expect(page.locator('role=tabpanel')).toBeVisible();
    
    // Ensure hourly forecast is shown
    await expect(page.getByText('Prognoza godzinowa')).toBeVisible();
    
    // Check for weather details
    await expect(page.getByText('Szczegóły')).toBeVisible();
    await expect(page.getByText('Wilgotność:')).toBeVisible();
    await expect(page.getByText('Wiatr:')).toBeVisible();
  });
  
  test('should display weather widget on homepage', async ({ page }) => {
    // Visit the homepage
    await page.goto('/');
    
    // Check that the weather widget is displayed
    await expect(page.getByText('Pogoda w Radzyniu Podlaskim')).toBeVisible();
    
    // Wait for the widget to load (mock data will be displayed)
    await page.waitForSelector('text=Prognoza na kolejne dni');
    
    // Check that forecast cards are displayed
    const forecastItems = page.locator('text=°C').all();
    expect((await forecastItems).length).toBeGreaterThan(1);
    
    // Check that the "Pełna prognoza" button links to the weather page
    const fullForecastButton = page.getByRole('link', { name: 'Pełna prognoza' });
    await expect(fullForecastButton).toBeVisible();
    await expect(fullForecastButton).toHaveAttribute('href', '/pogoda');
  });
});