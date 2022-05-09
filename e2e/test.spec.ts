import test, { expect } from '@playwright/test';

test.describe('Customers', () => {
  test('should show up', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.click('data-testid=btn-customers');
    await page.click(
      "[data-testid=row-customer] mat-cell:text('Laetitia') ~ mat-cell mat-icon"
    );
    await page.fill('[data-testid=inp-lastname]', 'Latitia');
    await page.fill('[data-testid=inp-country]', 'Latitia');
    await page.fill('[data-testid=inp-birthdate]', 'Latitia');
    return;
    await page
      .locator(
        'text=Bellitissa, Laetitia IT30.05.2002edit >> mat-icon[role="img"]'
      )
      .click();
    await expect(page).toHaveURL('http://localhost:4200/customers/1');
    // Click div:has-text("Firstname *") >> nth=3
    await page.locator('div:has-text("Firstname *")').nth(3).click();
    // Click html
    await page.locator('html').click();
    // Click #formly_4_input_firstname_0
    await page.locator('#formly_4_input_firstname_0').click();
    // Press ArrowLeft
    await page.locator('#formly_4_input_firstname_0').press('ArrowLeft');
    // Press ArrowLeft
    await page.locator('#formly_4_input_firstname_0').press('ArrowLeft');
    // Press ArrowLeft
    await page.locator('#formly_4_input_firstname_0').press('ArrowLeft');
    // Press ArrowLeft
    await page.locator('#formly_4_input_firstname_0').press('ArrowLeft');
    // Press ArrowLeft
    await page.locator('#formly_4_input_firstname_0').press('ArrowLeft');
    // Fill #formly_4_input_firstname_0
    await page.locator('#formly_4_input_firstname_0').fill('Laetitia');
    // Click button:has-text("Save")
    await page.locator('button:has-text("Save")').click();
    // Click [data-testid="btn-customers"]
    await page.locator('[data-testid="btn-customers"]').click();
    await expect(page).toHaveURL('http://localhost:4200/customers');
    // Click text=Bellitissa, Laetitia
    await page.locator('text=Bellitissa, Laetitia').click();
    // Click text=Birthday
    await page.locator('text=Birthday').click();
    // Click mat-drawer-content:has-text("CustomersAdd Customer Name Country BirthdayBellitissa, Laetitia IT30.05.2002edit")
    await page
      .locator(
        'mat-drawer-content:has-text("CustomersAdd Customer Name Country BirthdayBellitissa, Laetitia IT30.05.2002edit")'
      )
      .click();

    await page.goto('http://localhost:4200');
    const btnCustomers = await page.locator('[data-testid=btn-customers]');
    await btnCustomers.click();
    const row = await page.locator('[data-testid=row-customer]');
    await row.click();
    expect(await page.locator('inp-firstname')).toHaveValue('Laetitia');
  });
});
