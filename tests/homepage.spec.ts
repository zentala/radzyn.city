import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle(/Radzyń/);
    
    // Check for key elements
    await expect(page.getByRole('banner')).toBeVisible(); // Header
    await expect(page.getByRole('navigation')).toBeVisible(); // Navigation
    await expect(page.getByRole('main')).toBeVisible(); // Main content
    
    // The homepage should have some core content sections
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
  
  test('should have working navigation on mobile', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 390, height: 844 });
    
    await page.goto('/');
    
    // Check if mobile menu toggle exists
    const mobileMenuButton = page.getByRole('button', { name: /menu/i });
    await expect(mobileMenuButton).toBeVisible();
    
    // Open mobile menu
    await mobileMenuButton.click();
    
    // Navigation links should be visible now
    await expect(page.getByRole('link', { name: /home/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /city/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /county/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /events/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /contact/i })).toBeVisible();
  });
});