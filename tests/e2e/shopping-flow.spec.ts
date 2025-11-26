import { test, expect } from '@playwright/test';

test.describe('E-commerce Shopping Flow', () => {
  test('should complete full shopping flow: search → results → product detail → add to cart → verify cart', async ({ page }) => {
    // Step 1: Navigate to home page
    await test.step('Navigate to home page', async () => {
      await page.goto('/');
      await expect(page.locator('h1')).toContainText('The latest tech for teams building the future');
    });

    // Step 2: Search for a product
    await test.step('Search for "laptop"', async () => {
      const searchInput = page.locator('input[name="q"]').first();
      await searchInput.fill('laptop');
      await searchInput.press('Enter');

      // Wait for navigation to search results page
      await page.waitForURL('**/search?q=laptop');
    });

    // Step 3: Verify search results are displayed
    await test.step('Verify search results', async () => {
      await expect(page.locator('h1')).toContainText('Search results for "laptop"');

      // Verify at least one product is shown
      const products = page.locator('a[href^="/product/"]');
      await expect(products).toHaveCount(await products.count());
      expect(await products.count()).toBeGreaterThan(0);

      // Verify MacBook Pro is in the results
      await expect(page.locator('text=MacBook Pro')).toBeVisible();
    });

    // Step 4: Click on a product to view details
    await test.step('Navigate to product detail page', async () => {
      await page.locator('text=MacBook Pro 16"').first().click();

      // Wait for navigation to product page
      await page.waitForURL('**/product/**');
    });

    // Step 5: Verify product detail page
    await test.step('Verify product details', async () => {
      await expect(page.locator('h1')).toContainText('MacBook Pro 16"');
      await expect(page.locator('text=$2,499')).toBeVisible();

      // Verify Add to Cart button is present
      const addToCartButton = page.locator('button:has-text("Add to Cart")');
      await expect(addToCartButton).toBeVisible();
    });

    // Step 6: Add product to cart
    await test.step('Add product to cart', async () => {
      const addToCartButton = page.locator('button:has-text("Add to Cart")');
      await addToCartButton.click();

      // Wait for the button to change to "Added to Cart"
      await expect(page.locator('button:has-text("Added to Cart")')).toBeVisible();
    });

    // Step 7: Navigate to cart page
    await test.step('Navigate to cart page', async () => {
      // Click on the shopping cart icon in the header
      const cartLink = page.locator('a[href="/cart"]').first();
      await cartLink.click();

      // Wait for navigation to cart page
      await page.waitForURL('**/cart');
    });

    // Step 8: Verify cart contents
    await test.step('Verify cart contents', async () => {
      await expect(page.locator('h1')).toContainText('Shopping Cart');

      // Verify the MacBook Pro is in the cart
      await expect(page.locator('text=MacBook Pro 16"')).toBeVisible();

      // Verify the price is displayed
      await expect(page.locator('text=$2,499').first()).toBeVisible();

      // Verify quantity is 1
      await expect(page.locator('text=1').first()).toBeVisible();

      // Verify Order Summary section exists
      await expect(page.locator('text=Order Summary')).toBeVisible();
      await expect(page.locator('text=Subtotal')).toBeVisible();
      await expect(page.getByText('Total', { exact: true })).toBeVisible();

      // Verify Proceed to Checkout button exists
      await expect(page.locator('button:has-text("Proceed to Checkout")')).toBeVisible();
    });
  });

  test('should allow searching from home page quick links', async ({ page }) => {
    await test.step('Navigate to home page', async () => {
      await page.goto('/');
    });

    await test.step('Click on Laptops quick link', async () => {
      await page.locator('a[href="/search?q=laptop"] button').click();
      await page.waitForURL('**/search?q=laptop');
    });

    await test.step('Verify laptop search results', async () => {
      await expect(page.locator('text=MacBook').first()).toBeVisible();
    });
  });

  test('should update cart quantity', async ({ page }) => {
    // Add a product to cart first
    await page.goto('/product/1');
    await page.locator('button:has-text("Add to Cart")').click();
    await expect(page.locator('button:has-text("Added to Cart")')).toBeVisible();

    // Navigate to cart
    await page.goto('/cart');

    await test.step('Increase quantity', async () => {
      const increaseButton = page.locator('button:has(svg.lucide-plus)').first();
      await increaseButton.click();

      // Wait a bit for localStorage to update
      await page.waitForTimeout(500);

      // Verify quantity increased
      await expect(page.locator('text=2').first()).toBeVisible();
    });

    await test.step('Decrease quantity', async () => {
      const decreaseButton = page.locator('button:has(svg.lucide-minus)').first();
      await decreaseButton.click();

      // Wait a bit for localStorage to update
      await page.waitForTimeout(500);

      // Verify quantity decreased back to 1
      await expect(page.locator('text=1').first()).toBeVisible();
    });
  });

  test('should remove item from cart', async ({ page }) => {
    // Add a product to cart first
    await page.goto('/product/1');
    await page.locator('button:has-text("Add to Cart")').click();
    await expect(page.locator('button:has-text("Added to Cart")')).toBeVisible();

    // Navigate to cart
    await page.goto('/cart');

    await test.step('Remove item from cart', async () => {
      await expect(page.locator('text=MacBook Pro 16"')).toBeVisible();

      const removeButton = page.locator('button:has-text("Remove")').first();
      await removeButton.click();

      // Wait a bit for localStorage to update and page to re-render
      await page.waitForTimeout(500);

      // Verify cart is empty
      await expect(page.locator('text=Your cart is empty')).toBeVisible();
    });
  });
});
