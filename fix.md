# Fixes Required for Tests

## 1. Server Issue
Most of the test failures are due to timeouts connecting to the local development server. The main error is:
```
TimeoutError: page.goto: Timeout 10000ms exceeded.
```

### Fix:
- Ensure the development server is running when tests are executed
- Add a project setup script that starts the server before tests run
- Increase the navigation timeout in the Playwright config (currently 10000ms)
  ```typescript
  navigationTimeout: 30000, // Increase from 10000ms to 30000ms
  ```

## 2. Navigation Component Issue
There are two elements with navigation role causing selector conflicts:

```
Error: strict mode violation: getByRole('navigation') resolved to 2 elements:
    1) <nav class="fixed top-0 left-0 right-0 z-30 transition-all duration-300 bg-primary/90 text-white">...</nav>
    2) <div id="mobile-menu" role="navigation" class="md:hidden overflow-hidden...">...</div>
```

### Fix:
- Remove the `role="navigation"` from the mobile menu div or use a different role
- Update the Navigation.tsx component:
  ```tsx
  <div 
    id="mobile-menu"
    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
      isMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
    }`}
    // Remove or change this role attribute
    // role="navigation"
  >
  ```

## 3. Navigation Links Issue
Navigation links aren't working correctly in tests:

```
Expected substring: "city"
Received string: "http://localhost:3000/"
```

### Fix:
- Verify that the city page route exists and is accessible
- Check the implementation of navigation links in both desktop and mobile views
- Ensure the tests are correctly waiting for navigation to complete

## 4. Contact Form Submission Issue
The form submission success message isn't showing up:

```
Timed out 10000ms waiting for expect(locator).toBeVisible()
Locator: locator('text=Dziękujemy za Twoją wiadomość')
```

### Fix:
- Verify the form submission handler is working correctly
- Check that success messages are displayed correctly after form submission
- Increase the timeout for form submission tests or make the form submission process more reliable

## 5. Test Setup Improvements
Some general test improvements:

- Add a pre-test script to ensure the development server is running
- Consider reducing the number of browser configurations during development to speed up tests
- Add better error handling and reporting in tests
- Implement more specific selectors in tests to avoid ambiguity