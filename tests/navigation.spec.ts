import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to all main pages', async ({ page }) => {
    // Home page
    await page.goto('/');
    await expect(page).toHaveTitle(/Radzyń/);
    
    // City page
    await page.getByRole('link', { name: /city/i }).click();
    await expect(page).toHaveURL(/.*city/);
    
    // County page
    await page.getByRole('link', { name: /county/i }).click();
    await expect(page).toHaveURL(/.*county/);
    
    // Events page
    await page.getByRole('link', { name: /events/i }).click();
    await expect(page).toHaveURL(/.*events/);
    
    // Contact page
    await page.getByRole('link', { name: /contact/i }).click();
    await expect(page).toHaveURL(/.*contact/);
  });
});