import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/update/030b5bc2-c3ed-4ab0-84f6-afb6ef7c9ef4');
  await page.getByPlaceholder('2024').click();
});