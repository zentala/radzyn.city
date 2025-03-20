import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to all main pages', async ({ page }) => {
    // Home page
    await page.goto('/');
    await expect(page).toHaveTitle(/Radzyń/, { timeout: 30000 });
    
    // Look for the navigation element first
    await expect(page.locator('header')).toBeVisible({ timeout: 30000 });
    
    // Click on links directly by their text rather than role
    // City page - use text content rather than aria-label
    await page.getByText('O mieście', { exact: true }).click();
    await page.waitForURL('**/city', { timeout: 30000 });
    await expect(page.url()).toContain('city');
    
    // County page
    await page.getByText('Powiat', { exact: true }).click();
    await page.waitForURL('**/county', { timeout: 30000 });
    await expect(page.url()).toContain('county');
    
    // Events page
    await page.getByText('Wydarzenia', { exact: true }).click();
    await page.waitForURL('**/events', { timeout: 30000 });
    await expect(page.url()).toContain('events');
    
    // Contact page
    await page.getByText('Kontakt', { exact: true }).click();
    await page.waitForURL('**/contact', { timeout: 30000 });
    await expect(page.url()).toContain('contact');
  });
});