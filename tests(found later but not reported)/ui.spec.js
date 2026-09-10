const { test, expect } = require('@playwright/test');

test.describe('Candidate UI - Unsubmitted Bugs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3013');
  });

  //bug 11: wrong-ui-copy-or-label
  test('displays the current page number instead of the pageSize', async ({ page }) => {
    await page.click('#nextBtn'); 
    const pageInfo = await page.locator('#pageInfo').textContent();
    expect(pageInfo).toContain('Page 2');
  });

  //bug 12: wrong-ui-copy-or-label
  test('displays the correct descending sort arrow (▼)', async ({ page }) => {
    await page.click('th[data-field="name"]');
    const arrowText = await page.locator('.arrow[data-arrow="name"]').textContent();
    expect(arrowText.trim()).toBe('▼');
  });
});