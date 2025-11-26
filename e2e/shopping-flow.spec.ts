import { test, expect } from '@playwright/test'

test.describe('E-commerce Shopping Flow', () => {
  test('should complete search → results → product detail → add to cart → verify cart', async ({ page }) => {
    // Step 1: Navigate to homepage
    await page.goto('/')
    await expect(page).toHaveTitle(/v0 App/)
    await expect(page.locator('h1')).toContainText('The latest tech for teams building the future')

    // Step 2: Search for a product
    const searchInput = page.locator('input[name="q"]')
    await searchInput.fill('iPhone')
    await searchInput.press('Enter')

    // Step 3: Verify search results page
    await expect(page).toHaveURL(/\/search\?q=iPhone/)
    await expect(page.locator('h1')).toContainText('Search results for "iphone"')

    // Verify at least one product is shown
    const productCards = page.locator('a[href^="/product/"]')
    await expect(productCards.first()).toBeVisible()

    // Step 4: Click on the first product (should be iPhone 15 Pro Max)
    const firstProduct = productCards.first()
    await firstProduct.click()

    // Step 5: Verify product detail page
    await expect(page).toHaveURL(/\/product\/\d+/)
    await expect(page.locator('h1')).toContainText('iPhone')

    // Get product details before adding to cart
    const productName = await page.locator('h1').textContent()
    const productPrice = await page.locator('p.text-4xl.font-bold').first().textContent()

    // Step 6: Add product to cart
    const addToCartButton = page.locator('button:has-text("Add to Cart")')
    await expect(addToCartButton).toBeVisible()
    await addToCartButton.click()

    // Verify button changes to "Added to Cart"
    await expect(page.locator('button:has-text("Added to Cart")')).toBeVisible()

    // Wait a moment for localStorage to be updated
    await page.waitForTimeout(500)

    // Step 7: Navigate to cart
    const cartLink = page.locator('a[href="/cart"]')
    await cartLink.click()

    // Step 8: Verify cart page and product
    await expect(page).toHaveURL('/cart')
    await expect(page.locator('h1')).toContainText('Shopping Cart')

    // Verify the product is in the cart
    const cartItems = page.locator('.bg-card.border.border-border.rounded-lg.p-4')
    await expect(cartItems).toHaveCount(1)

    // Verify product details in cart
    const cartProductName = await cartItems.locator('h3.font-semibold').textContent()
    expect(cartProductName).toContain(productName?.trim().split(' ')[0]) // Check if first word matches (e.g., "iPhone")

    // Verify quantity is 1
    const quantity = await cartItems.locator('span.px-3.text-sm.font-medium').textContent()
    expect(quantity).toBe('1')

    // Verify order summary is displayed
    await expect(page.locator('h2:has-text("Order Summary")')).toBeVisible()
    await expect(page.getByText('Subtotal')).toBeVisible()
    await expect(page.getByText('Total', { exact: true })).toBeVisible()

    // Verify checkout button is visible
    await expect(page.locator('button:has-text("Proceed to Checkout")')).toBeVisible()
  })

  test('should allow adding multiple products to cart', async ({ page }) => {
    await page.goto('/')

    // Search for laptops
    await page.locator('input[name="q"]').fill('MacBook')
    await page.locator('input[name="q"]').press('Enter')

    // Add first MacBook
    await page.locator('a[href^="/product/"]').first().click()
    await page.locator('button:has-text("Add to Cart")').click()
    await page.waitForTimeout(500)

    // Go back to search
    await page.locator('a:has-text("Back to products")').click()

    // Add second MacBook
    const products = page.locator('a[href^="/product/"]')
    await products.nth(1).click()
    await page.locator('button:has-text("Add to Cart")').click()
    await page.waitForTimeout(500)

    // Go to cart
    await page.locator('a[href="/cart"]').click()

    // Verify 2 products in cart
    const cartItems = page.locator('.bg-card.border.border-border.rounded-lg.p-4')
    await expect(cartItems).toHaveCount(2)
  })

  test('should update quantity in cart', async ({ page }) => {
    await page.goto('/')

    // Search and add a product
    await page.locator('input[name="q"]').fill('iPhone')
    await page.locator('input[name="q"]').press('Enter')
    await page.locator('a[href^="/product/"]').first().click()
    await page.locator('button:has-text("Add to Cart")').click()
    await page.waitForTimeout(500)

    // Go to cart
    await page.locator('a[href="/cart"]').click()

    // Get initial quantity
    const quantityDisplay = page.locator('span.px-3.text-sm.font-medium').first()
    await expect(quantityDisplay).toHaveText('1')

    // Increase quantity
    const plusButton = page.locator('button').filter({ has: page.locator('svg.lucide-plus') }).first()
    await plusButton.click()
    await expect(quantityDisplay).toHaveText('2')

    // Decrease quantity
    const minusButton = page.locator('button').filter({ has: page.locator('svg.lucide-minus') }).first()
    await minusButton.click()
    await expect(quantityDisplay).toHaveText('1')
  })

  test('should remove item from cart', async ({ page }) => {
    await page.goto('/')

    // Search and add a product
    await page.locator('input[name="q"]').fill('iPhone')
    await page.locator('input[name="q"]').press('Enter')
    await page.locator('a[href^="/product/"]').first().click()
    await page.locator('button:has-text("Add to Cart")').click()
    await page.waitForTimeout(500)

    // Go to cart
    await page.locator('a[href="/cart"]').click()

    // Verify product is in cart
    await expect(page.locator('.bg-card.border.border-border.rounded-lg.p-4')).toHaveCount(1)

    // Remove item
    const removeButton = page.locator('button:has-text("Remove")')
    await removeButton.click()

    // Verify cart is empty
    await expect(page.locator('text=Your cart is empty')).toBeVisible()
    await expect(page.locator('button:has-text("Continue Shopping")')).toBeVisible()
  })
})
