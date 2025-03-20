import { test, expect } from '@playwright/test';

test.describe('City Highlights Component', () => {
  test('should display city highlights on the homepage', async ({ page }) => {
    await page.goto('/');
    
    // Check if the highlights section is present - using id instead of role
    await expect(page.locator('#odkryj-radzyn')).toBeVisible({ timeout: 30000 });
    
    // Check if all three highlights are displayed - MUI uses different heading structure
    // Using contains to handle potential whitespace or style differences
    await expect(page.getByText('Pałac Potockich', { exact: false })).toBeVisible({ timeout: 30000 });
    await expect(page.getByText('Kościół Świętej Trójcy', { exact: false })).toBeVisible({ timeout: 30000 });
    await expect(page.getByText('Park Miejski', { exact: false })).toBeVisible({ timeout: 30000 });
    
    // Check if descriptions are present - using contains for more tolerance
    await expect(page.getByText('Barokowy pałac z XVIII wieku', { exact: false })).toBeVisible();
    await expect(page.getByText('Zabytkowy kościół z bogato zdobionym', { exact: false })).toBeVisible();
    await expect(page.getByText('Miejsce rekreacji z malowniczymi', { exact: false })).toBeVisible();
    
    // Check if cards are displayed - MUI uses class names for highlighting cards
    // Use the class selector together with the custom class we maintained
    const highlightCards = await page.locator('.city-highlight-card').count();
    expect(highlightCards).toBe(3);
    
    // Verify the component is visible
    await expect(page.locator('.city-highlights-section')).toBeVisible();
  });
});