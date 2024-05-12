import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Statistics' }).click();
  await page.getByPlaceholder('Enter Name').click();
  await page.getByPlaceholder('Enter Name').fill('test');
  await page.getByPlaceholder('Enter Price').click();
  await page.getByPlaceholder('Enter Price').fill('1');
  await page.getByPlaceholder('Enter Description').click();
  await page.getByPlaceholder('Enter Description').fill('test');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.locator('.btn-group > a:nth-child(2)').first().click();
  await page.locator('div:nth-child(19) > .btn').click();
});