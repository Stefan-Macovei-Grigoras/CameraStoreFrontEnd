import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/create');
  await page.getByPlaceholder('Enter Name').click();
  await page.getByPlaceholder('Enter Name').fill('Test');
  await page.getByPlaceholder('Enter Price').click();
  await page.getByPlaceholder('Enter Price').fill('1');
  await page.getByPlaceholder('Enter Description').click();
  await page.getByPlaceholder('Enter Description').fill('Test');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('link', { name: 'Add +' }).click();
  await page.getByPlaceholder('Enter Name').click();
  await page.getByPlaceholder('Enter Name').click();
  await page.getByRole('link', { name: 'Back' }).click();
  await page.getByRole('link', { name: 'Info' }).first().click();
  await page.getByRole('link', { name: 'Edit' }).click();
  await page.getByRole('button', { name: 'Update' }).click();
  await page.getByRole('link', { name: 'Statistics' }).click();
  await page.locator('body').press('F5');
  await page.locator('body').press('F5');
  await page.goto('http://localhost:5173/');
});