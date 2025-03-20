import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle(/Radzyń/);
    
    // Check for key elements - use more resilient selectors
    await expect(page.locator('nav')).toBeVisible(); // Navigation
    await expect(page.locator('main')).toBeVisible(); // Main content
    
    // The homepage should have some core content sections
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
  
  test('should have working navigation on mobile', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 390, height: 844 });
    
    await page.goto('/');
    
    // Check if mobile menu toggle exists
    await page.waitForSelector('button[aria-label="Otwórz menu"]');
    const mobileMenuButton = page.locator('button[aria-label="Otwórz menu"]');
    await expect(mobileMenuButton).toBeVisible();
    
    // Open mobile menu
    await mobileMenuButton.click();
    
    // Wait for the mobile menu to be visible
    await page.waitForSelector('#mobile-menu');
    
    // Navigation links should be visible now
    // Specifically target the mobile menu links
    await expect(page.locator('#mobile-menu a[aria-label="Home"]')).toBeVisible();
    await expect(page.locator('#mobile-menu a[aria-label="City"]')).toBeVisible();
    await expect(page.locator('#mobile-menu a[aria-label="County"]')).toBeVisible();
    await expect(page.locator('#mobile-menu a[aria-label="Events"]')).toBeVisible();
    await expect(page.locator('#mobile-menu a[aria-label="Contact"]')).toBeVisible();
  });
});