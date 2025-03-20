# Playwright Tests for Radzyń City Portal

This directory contains automated UI tests using Playwright for the Radzyń City Portal.

## Test Structure

- `navigation.spec.ts` - Tests main navigation functionality
- `homepage.spec.ts` - Tests homepage content and features
- `contact-form.spec.ts` - Tests contact form validation and submission
- `city-highlights.spec.ts` - Tests city highlights component
- `events.spec.ts` - Tests events page and event cards

## Running Tests

### Install Browsers
Before running tests for the first time, install the required browsers:

```bash
npx playwright install
```

### Running All Tests
To run all tests in headless mode:

```bash
pnpm test
```

### Running Tests with UI
To run tests with the Playwright UI:

```bash
pnpm test:ui
```

### Debugging Tests
To debug tests step by step:

```bash
pnpm test:debug
```

### Viewing Test Reports
After tests have run, view the HTML report:

```bash
pnpm test:report
```

## Configuring Tests

The Playwright configuration is in `playwright.config.ts` in the project root directory. It includes:

- Browser configurations (Chromium, Firefox, WebKit)
- Mobile device configurations
- Test reporters
- Web server settings

## CI/CD Integration

For CI/CD integration, you can use GitHub Actions or other CI platforms to run the tests automatically on pull requests and deployments.

Example GitHub Actions workflow:

```yaml
name: Playwright Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Run Playwright tests
        run: npm run test
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```