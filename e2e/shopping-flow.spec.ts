import { test, expect } from '@playwright/test';

test.describe('E-commerce Shopping Flow', () => {
  test('search → results → product detail → add to cart → verify cart', async ({ page }) => {
    // Step 1: Navigate to home page
    await page.goto('/');
    
    // Verify we're on the home page by checking for the search form
    await expect(page.locator('input[name="q"]')).toBeVisible();

    // Step 2: Perform a search
    const searchQuery = 'iPhone';
    const searchInput = page.locator('input[name="q"]').first();
    await searchInput.fill(searchQuery);
    await searchInput.press('Enter');

    // Wait for navigation to search results page
    await page.waitForURL(/\/search/);
    await expect(page).toHaveURL(new RegExp(`/search.*q=${encodeURIComponent(searchQuery)}`));

    // Step 3: Verify search results are displayed
    await expect(page.locator('h1')).toContainText('Search results');
    
    // Verify at least one product is shown
    const productLinks = page.locator('a[href^="/product/"]');
    await expect(productLinks.first()).toBeVisible();
    
    // Get the first product's name and price for verification
    const firstProduct = productLinks.first();
    const firstProductName = await firstProduct.locator('h3').first().textContent();
    const firstProductPrice = await firstProduct.locator('.text-xl.font-bold').first().textContent();
    
    expect(firstProductName).toBeTruthy();
    expect(firstProductPrice).toBeTruthy();

    // Step 4: Click on the first product to view details
    await firstProduct.click();
    
    // Wait for navigation to product detail page
    await page.waitForURL(/\/product\/\d+/);
    
    // Step 5: Verify product detail page
    await expect(page.locator('h1')).toContainText(firstProductName!.trim());
    
    // Verify price is displayed on detail page
    const productPriceOnDetail = page.locator('text=/\\$[\\d,]+/').first();
    await expect(productPriceOnDetail).toBeVisible();
    
    // Step 6: Add product to cart
    // Find the button by its unique full-width class which is specific to the add to cart button
    const addToCartButton = page.locator('button.w-full.h-14').filter({ hasText: /add to cart/i }).first();
    await expect(addToCartButton).toBeVisible();
    
    // Click the button
    await addToCartButton.click();
    
    // Wait a moment for React state to update and localStorage to be set
    await page.waitForTimeout(500);
    
    // Step 7: Navigate to cart page
    // Find the cart link - it could be in the header
    const cartLink = page.locator('a[href="/cart"]').first();
    await expect(cartLink).toBeVisible();
    await cartLink.click();
    
    // Wait for navigation to cart page
    await page.waitForURL('/cart');
    
    // Step 8: Verify cart contains the product
    await expect(page.locator('h1')).toContainText(/shopping cart/i);
    
    // Find the cart item first
    const cartItem = page.locator('[class*="bg-card"]').filter({ hasText: firstProductName!.trim() }).first();
    await expect(cartItem).toBeVisible();
    
    // Verify the product name is in the cart item
    await expect(cartItem.getByText(firstProductName!.trim(), { exact: false })).toBeVisible();
    
    // Verify the product price is displayed in the cart item (scoped to avoid multiple matches)
    await expect(cartItem.getByText(firstProductPrice!.trim(), { exact: false }).first()).toBeVisible();
    
    // Verify quantity input shows 1
    const quantityValue = cartItem.locator('text=/^1$/').first();
    await expect(quantityValue).toBeVisible();
    
    // Verify subtotal and total are calculated in the order summary
    const orderSummary = page.locator('[class*="bg-card"]').filter({ hasText: 'Order Summary' }).first();
    await expect(orderSummary).toBeVisible();
    await expect(orderSummary.getByText('Subtotal', { exact: true })).toBeVisible();
    await expect(orderSummary.getByText('Total', { exact: true })).toBeVisible();
    
    // Verify the cart is not empty
    await expect(page.getByText('Your cart is empty')).not.toBeVisible();
  });
});

