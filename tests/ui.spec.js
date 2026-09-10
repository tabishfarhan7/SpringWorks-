const { test, expect } = require('@playwright/test');

test.describe('Candidate UI Phase 1 Bugs', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3013');
  });

  //bug 1: wrong-format-display
  test('displays dates in DD-MM-YYYY format', async ({ page }) => {
    const dateCell = await page.locator('tbody tr:first-child td:nth-child(4)').textContent();
    //by regex ->DD-MM-YYYY
    expect(dateCell).toMatch(/^\d{2}-\d{2}-\d{4}$/); 
  });

  //bug 3: pagination-bug
  test('executing a new search resets pagination to page 1', async ({ page }) => {
    await page.click('#nextBtn');
    
    await page.fill('#q', 'a');
    await page.click('#searchBtn');
    
    const prevBtnDisabled = await page.locator('#prevBtn').isDisabled();
    expect(prevBtnDisabled).toBe(true);
  });

  //bug 6: stale-or-mismatched-aggregate
  test('total results count displays total matches, not just screen rows', async ({ page }) => {
    //empty search returns all 30 seeded candidates
    await page.fill('#q', '');
    await page.click('#searchBtn');
    
    const countText = await page.locator('#resultCount').textContent();
    //it say "30 results" based on seed data, not "10 results"
    expect(countText).toContain('30 results'); 
  });
});