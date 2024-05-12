import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/read/030b5bc2-c3ed-4ab0-84f6-afb6ef7c9ef4');
  await page.getByPlaceholder('Enter Review').click();
  await page.getByPlaceholder('Enter Review').fill('test');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('link', { name: 'Back' }).click();
});