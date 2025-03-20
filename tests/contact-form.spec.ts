import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('should validate form fields', async ({ page }) => {
    // Go to contact page
    await page.goto('/contact');
    
    // Try to submit empty form
    await page.getByRole('button', { name: /wyślij wiadomość/i }).click();
    
    // Check if validation errors are displayed
    await expect(page.getByText('Imię i nazwisko jest wymagane')).toBeVisible();
    await expect(page.getByText('Adres e-mail jest wymagany')).toBeVisible();
    await expect(page.getByText('Temat jest wymagany')).toBeVisible();
    await expect(page.getByText('Treść wiadomości jest wymagana')).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    await page.goto('/contact');
    
    // Fill with invalid email
    await page.getByLabel(/Imię i nazwisko/i).fill('Test User');
    await page.getByLabel(/Adres e-mail/i).fill('invalid-email');
    await page.getByLabel(/Temat/i).fill('Test Subject');
    await page.getByLabel(/Wiadomość/i).fill('This is a test message content');
    
    // Try to submit form
    await page.getByRole('button', { name: /wyślij wiadomość/i }).click();
    
    // Check if email validation error is displayed
    await expect(page.getByText('Niepoprawny format adresu e-mail')).toBeVisible();
  });

  test('should submit form successfully', async ({ page }) => {
    await page.goto('/contact');
    
    // Fill form with valid data
    await page.getByLabel(/Imię i nazwisko/i).fill('Test User');
    await page.getByLabel(/Adres e-mail/i).fill('test@example.com');
    await page.getByLabel(/Temat/i).fill('Test Subject');
    await page.getByLabel(/Wiadomość/i).fill('This is a test message content with sufficient length.');
    
    // Submit the form
    await page.getByRole('button', { name: /wyślij wiadomość/i }).click();
    
    // Check for success message
    await expect(page.getByText('Dziękujemy za Twoją wiadomość!')).toBeVisible();
    await expect(page.getByText('Twoja wiadomość została wysłana')).toBeVisible();
  });
});