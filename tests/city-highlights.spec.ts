import { test, expect } from '@playwright/test';

test.describe('City Highlights Component', () => {
  test('should display city highlights on the homepage', async ({ page }) => {
    await page.goto('/');
    
    // Check if the highlights section is present
    await expect(page.getByRole('heading', { name: 'Odkryj Radzyń Podlaski' })).toBeVisible();
    
    // Check if all three highlights are displayed
    await expect(page.getByRole('heading', { name: 'Pałac Potockich' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Kościół Świętej Trójcy' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Park Miejski' })).toBeVisible();
    
    // Check if descriptions are present
    await expect(page.getByText('Barokowy pałac z XVIII wieku')).toBeVisible();
    await expect(page.getByText('Zabytkowy kościół z bogato zdobionym')).toBeVisible();
    await expect(page.getByText('Miejsce rekreacji z malowniczymi')).toBeVisible();
    
    // Check if images or placeholders are displayed
    const highlightCards = await page.locator('.bg-white.rounded-lg').count();
    expect(highlightCards).toBe(3);
    
    // Each card should have an image or placeholder
    const cardImages = await page.locator('.bg-white.rounded-lg img, .bg-white.rounded-lg svg').count();
    expect(cardImages).toBeGreaterThanOrEqual(3);
  });
});