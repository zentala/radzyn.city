import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle(/Radzyń/, { timeout: 30000 });
    
    // Check for key elements - use more resilient selectors that work with MUI
    await expect(page.locator('header .MuiAppBar-root')).toBeVisible(); // Navigation
    await expect(page.locator('main')).toBeVisible(); // Main content
    
    // The homepage should have some core content sections
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    
    // Check for dashboard widgets
    await expect(page.locator('.MuiCard-root').first()).toBeVisible();
    await expect(page.getByText('Pogoda w Radzyniu Podlaskim')).toBeVisible();
    await expect(page.getByText('Na skróty')).toBeVisible();
  });
  
  test('should have working navigation on mobile', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 390, height: 844 });
    
    await page.goto('/');
    
    // Check if mobile menu toggle exists (adjusted for MUI)
    await page.waitForSelector('[data-testid="mobile-menu-button"]', { timeout: 30000 });
    const mobileMenuButton = page.locator('[data-testid="mobile-menu-button"]');
    await expect(mobileMenuButton).toBeVisible({ timeout: 30000 });
    
    // Open mobile menu
    await mobileMenuButton.click();
    
    // Wait for the mobile drawer to be visible (MUI specific selector)
    await page.waitForSelector('[role="presentation"]');
    
    // Navigation links should be visible now in the drawer
    // These selectors need to match the exact text or have proper test IDs
    await expect(page.getByText('Strona główna')).toBeVisible();
    await expect(page.getByText('O mieście')).toBeVisible();
    await expect(page.getByText('Powiat')).toBeVisible();
    await expect(page.getByText('Wydarzenia')).toBeVisible();
    await expect(page.getByText('Kontakt')).toBeVisible();
  });
});