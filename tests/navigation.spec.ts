import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to all main pages', async ({ page }) => {
    // Home page
    await page.goto('/');
    await expect(page).toHaveTitle(/Radzyń/);
    
    // Check for desktop navigation
    const isDesktop = await page.locator('.hidden.md\\:flex').isVisible();
    
    if (isDesktop) {
      // Use desktop navigation
      // City page
      await page.locator('a[aria-label="City"]').first().click();
      await page.waitForURL('**/city');
      await expect(page.url()).toContain('city');
      
      // County page
      await page.locator('a[aria-label="County"]').first().click();
      await page.waitForURL('**/county');
      await expect(page.url()).toContain('county');
      
      // Events page
      await page.locator('a[aria-label="Events"]').first().click();
      await page.waitForURL('**/events');
      await expect(page.url()).toContain('events');
      
      // Contact page
      await page.locator('a[aria-label="Contact"]').first().click();
      await page.waitForURL('**/contact');
      await expect(page.url()).toContain('contact');
    } else {
      // Use mobile navigation
      // First open the menu
      await page.locator('button[aria-label="Otwórz menu"]').click();
      await page.waitForSelector('#mobile-menu');
      
      // City page
      await page.locator('#mobile-menu a[aria-label="City"]').click();
      await page.waitForURL('**/city');
      await expect(page.url()).toContain('city');
      
      // Go back to home
      await page.goto('/');
      await page.locator('button[aria-label="Otwórz menu"]').click();
      await page.waitForSelector('#mobile-menu');
      
      // County page
      await page.locator('#mobile-menu a[aria-label="County"]').click();
      await page.waitForURL('**/county');
      await expect(page.url()).toContain('county');
      
      // Go back to home
      await page.goto('/');
      await page.locator('button[aria-label="Otwórz menu"]').click();
      await page.waitForSelector('#mobile-menu');
      
      // Events page
      await page.locator('#mobile-menu a[aria-label="Events"]').click();
      await page.waitForURL('**/events');
      await expect(page.url()).toContain('events');
      
      // Go back to home
      await page.goto('/');
      await page.locator('button[aria-label="Otwórz menu"]').click();
      await page.waitForSelector('#mobile-menu');
      
      // Contact page
      await page.locator('#mobile-menu a[aria-label="Contact"]').click();
      await page.waitForURL('**/contact');
      await expect(page.url()).toContain('contact');
    }
  });
});