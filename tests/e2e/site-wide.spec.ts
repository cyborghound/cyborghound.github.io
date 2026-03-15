import { test, expect } from '@playwright/test';

test.describe('Site-Wide E2E Tests', () => {

  test('Homepage loads and has the correct title', async ({ page }) => {
    await page.goto('/');
    
    // Check that the main title exists
    await expect(page.locator('.site-title')).toBeVisible();
    await expect(page).toHaveTitle(/Michael van Splunter/);

    // Verify recent posts show up
    const postCount = await page.locator('#post-list .card').count();
    expect(postCount).toBeGreaterThan(0);
  });

  test('Navigation links work correctly', async ({ page }) => {
    await page.goto('/');

    // Click Archives and verify navigation
    await page.getByRole('link', { name: 'Archives' }).click();
    await expect(page).toHaveURL(/.*\/archives\//);
    await expect(page.locator('h1')).toContainText('Archives');

    // Click About and verify navigation
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL(/.*\/about\//);

    // Click Home to return
    await page.getByRole('link', { name: 'Home' }).first().click();
    await expect(page).toHaveURL('http://127.0.0.1:4000/');
  });

  test('404 Page renders for non-existent routes', async ({ page }) => {
    const response = await page.goto('/this-page-definitely-does-not-exist-12345/');
    
    // Check for 404 status code (Jekyll serve returns 404 for missing pages)
    expect(response?.status()).toBe(404);

    // Verify the 404 heading exists
    await expect(page.locator('h1.dynamic-title')).toContainText('404');
  });

  test('Search functionality opens the modal', async ({ page }) => {
    await page.goto('/');
    
    // Click the search icon
    await page.locator('#search-trigger').click();
    
    // Verify the modal appears and the input gets focus
    const searchInput = page.locator('#search-input');
    await expect(searchInput).toBeVisible();
  });

});
