# Playwright Test Setup Guide

This guide will help you set up Playwright for GUI testing in this project.

## Prerequisites

- Node.js installed (v14 or newer)
- pnpm installed (recommended package manager for this project)

## Installation

1. The project already has Playwright installed as a development dependency.

2. Install browser binaries by running:

```bash
npx playwright install
```

This will download Chromium, Firefox, and WebKit browsers needed for testing.

## Project Structure

- `/tests` - Contains all Playwright test files
- `playwright.config.ts` - Configuration file for Playwright
- Existing test files:
  - `navigation.spec.ts` - Tests for site navigation
  - `homepage.spec.ts` - Tests for homepage components
  - `contact-form.spec.ts` - Tests for the contact form
  - `city-highlights.spec.ts` - Tests for city highlights component
  - `events.spec.ts` - Tests for the events page

## Running Tests

The following commands are available in package.json:

- `pnpm test` - Run all tests headlessly
- `pnpm test:ui` - Run tests with Playwright UI
- `pnpm test:debug` - Run tests in debug mode
- `pnpm test:report` - Show report after tests have run

## Writing New Tests

To create a new test file:

1. Create a new file with `.spec.ts` extension in the `/tests` directory
2. Import the necessary Playwright modules:

```typescript
import { test, expect } from '@playwright/test';
```

3. Write your tests using the following structure:

```typescript
test.describe('Feature Group Name', () => {
  test('should perform some action', async ({ page }) => {
    // Test steps here
    await page.goto('/some-path');
    await page.getByRole('button', { name: 'Click Me' }).click();
    await expect(page.locator('.result')).toHaveText('Success');
  });
});
```

## Testing Best Practices

1. Test user-facing functionality, not implementation details
2. Use role-based selectors when possible (`getByRole`, `getByLabel`, etc.)
3. Keep tests independent and atomic
4. Use `test.beforeEach()` for common setup
5. Write descriptive test names
6. For visual comparisons, use `toHaveScreenshot()` method