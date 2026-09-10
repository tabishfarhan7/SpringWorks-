# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\ui.spec.js >> Candidate UI Phase 1 Bugs >> total results count displays total matches, not just screen rows
- Location: tests\ui.spec.js:28:3

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "30 results"
Received string:    "9 results"
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - heading "Candidate Search" [level=1] [ref=e4]
      - generic [ref=e5]:
        - link "📋 Spec" [ref=e6] [cursor=pointer]:
          - /url: /spec
        - link "📥 API collection" [ref=e7] [cursor=pointer]:
          - /url: /openapi.json
        - button "↺ Reset data" [ref=e8] [cursor=pointer]
    - generic [ref=e9]:
      - generic [ref=e10]:
        - textbox "Search by name or email..." [ref=e11]
        - button "Search" [active] [ref=e12] [cursor=pointer]
        - generic [ref=e13]: 9 results
      - table [ref=e14]:
        - rowgroup [ref=e15]:
          - row [ref=e16]:
            - columnheader "Name ▼" [ref=e17] [cursor=pointer]
            - columnheader "Email" [ref=e18] [cursor=pointer]
            - columnheader "Status" [ref=e19] [cursor=pointer]
            - columnheader "Created On" [ref=e20] [cursor=pointer]
        - rowgroup [ref=e21]:
          - row [ref=e22]:
            - cell "Vivaan Verma" [ref=e23]
            - cell "vivaan.verma1@example.com" [ref=e24]
            - cell "VERIFIED" [ref=e25]
            - cell "2026-02-02" [ref=e26]
          - row [ref=e27]:
            - cell "Vikram Reddy" [ref=e28]
            - cell "vikram.reddy15@example.com" [ref=e29]
            - cell "IN_PROGRESS" [ref=e30]
            - cell "2026-04-16" [ref=e31]
          - row [ref=e32]:
            - cell "Tarun Iyer" [ref=e33]
            - cell "tarun.iyer22@example.com" [ref=e34]
            - cell "DISCREPANCY" [ref=e35]
            - cell "2026-11-23" [ref=e36]
          - row [ref=e37]:
            - cell "Swati Menon" [ref=e38]
            - cell "swati.menon27@example.com" [ref=e39]
            - cell "DISCREPANCY" [ref=e40]
            - cell "2026-04-28" [ref=e41]
          - row [ref=e42]:
            - cell "Sneha Rao" [ref=e43]
            - cell "sneha.rao16@example.com" [ref=e44]
            - cell "VERIFIED" [ref=e45]
            - cell "2026-05-17" [ref=e46]
          - row [ref=e47]:
            - cell "Sara Kapoor" [ref=e48]
            - cell "sara.kapoor8@example.com" [ref=e49]
            - cell "AWAITING_INPUT" [ref=e50]
            - cell "2026-09-09" [ref=e51]
          - row [ref=e52]:
            - cell "Sameer Gupta" [ref=e53]
            - cell "sameer.gupta24@example.com" [ref=e54]
            - cell "CLOSED" [ref=e55]
            - cell "2026-01-25" [ref=e56]
          - row [ref=e57]:
            - cell "Rohan Sharma" [ref=e58]
            - cell "rohan.sharma10@example.com" [ref=e59]
            - cell "IN_PROGRESS" [ref=e60]
            - cell "2026-11-11" [ref=e61]
          - row [ref=e62]:
            - cell "Ritu Nair" [ref=e63]
            - cell "ritu.nair23@example.com" [ref=e64]
            - cell "AWAITING_INPUT" [ref=e65]
            - cell "2026-12-24" [ref=e66]
      - generic [ref=e67]:
        - button "« Prev" [ref=e68] [cursor=pointer]
        - generic [ref=e69]: Page 10 of 3
        - button "Next »" [ref=e70] [cursor=pointer]
  - button "🐛 Report a bug" [ref=e72] [cursor=pointer]
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | test.describe('Candidate UI Phase 1 Bugs', () => {
  4  |   
  5  |   test.beforeEach(async ({ page }) => {
  6  |     await page.goto('http://localhost:3013');
  7  |   });
  8  | 
  9  |   //bug 1: wrong-format-display
  10 |   test('displays dates in DD-MM-YYYY format', async ({ page }) => {
  11 |     const dateCell = await page.locator('tbody tr:first-child td:nth-child(4)').textContent();
  12 |     //by regex ->DD-MM-YYYY
  13 |     expect(dateCell).toMatch(/^\d{2}-\d{2}-\d{4}$/); 
  14 |   });
  15 | 
  16 |   //bug 3: pagination-bug
  17 |   test('executing a new search resets pagination to page 1', async ({ page }) => {
  18 |     await page.click('#nextBtn');
  19 |     
  20 |     await page.fill('#q', 'a');
  21 |     await page.click('#searchBtn');
  22 |     
  23 |     const prevBtnDisabled = await page.locator('#prevBtn').isDisabled();
  24 |     expect(prevBtnDisabled).toBe(true);
  25 |   });
  26 | 
  27 |   //bug 6: stale-or-mismatched-aggregate
  28 |   test('total results count displays total matches, not just screen rows', async ({ page }) => {
  29 |     //empty search returns all 30 seeded candidates
  30 |     await page.fill('#q', '');
  31 |     await page.click('#searchBtn');
  32 |     
  33 |     const countText = await page.locator('#resultCount').textContent();
  34 |     //it say "30 results" based on seed data, not "10 results"
> 35 |     expect(countText).toContain('30 results'); 
     |                       ^ Error: expect(received).toContain(expected) // indexOf
  36 |   });
  37 | });
```