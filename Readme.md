```markdown
# Candidate Search API — QA Challenge Submission

This repository contains my complete submission for Phase 2 of the SV QA Challenge. 

In this phase, I developed an automated testing suite to catch 12 distinct bugs (spanning both the UI and API layers) that I identified during Phase 1. Additionally, **I have applied the optional bonus fixes** to the source code, meaning all tests currently pass with a 100% success rate.

## 🛠 Tools & Technologies Used
* **Test Runner:** Jest
* **API Testing:** Supertest
* **UI/E2E Testing:** Playwright
* **AI Assistance:** Gemini (used for test generation and debugging fixes)

## 🐛 Bug Taxonomy & Fixes

Below are the 12 bugs caught by the test suite and subsequently fixed in `server.js` and `app.js`:

### API Bugs (`tests/api.test.js`)
1. **missing-boundary-check:** API accepted `pageSize` > 50. Fixed by clamping the max value to 50.
2. **type-coercion:** API failed when `pageSize` was a string. Fixed by adding a `Number.isNaN()` fallback to 10.
3. **wrong-sort-order:** Descending sort returned ascending data. Fixed by correcting the `-1`/`1` return logic in the sort function.
4. **case-sensitivity-mismatch:** Search failed on mixed casing. Fixed by applying `.toLowerCase()` to both query and data.
5. **wrong-arithmetic:** `totalPages` used `Math.round` instead of `Math.ceil`, hiding the last page. Fixed by using `Math.ceil()`.
6. **off-by-one-boundary:** Array slice dropped the last item of every page. Fixed by removing the erroneous `- 1` from the slice end index.
7. **missing-boundary-check:** Passing `page=0` or negatives caused array wrapping. Fixed by clamping minimum page to `1`.

### UI Bugs (`tests/ui.spec.js`)
8. **wrong-format-display:** `createdAt` date displayed as YYYY-MM-DD. Fixed by reversing the string to DD-MM-YYYY.
9. **pagination-bug:** New searches from later pages didn't reset the view to Page 1. Fixed by explicitly setting `state.page = 1` on search.
10. **stale-or-mismatched-aggregate:** The "Results" counter showed the page row count instead of the global total. Fixed by binding to `body.total`.
11. **wrong-ui-copy-or-label:** The pagination text read "Page {pageSize} of X". Fixed by binding to `body.page`.
12. **wrong-ui-copy-or-label:** Sort arrows pointed the wrong direction. Fixed by correcting the ternary operator logic (`▲` for ascending, `▼` for descending).

## Setup & Installation

To run this project locally, ensure you have Node.js installed, then run the following commands:

```bash
# Install all dependencies (Express, Jest, Supertest, Playwright)
npm install

# Install the Playwright browser binaries required for UI testing
npx playwright install

```

## Running the Application

The API and UI must be running locally for the test suites to execute. Open a terminal and run:

```bash
npm start

```

*The app will be available at `http://localhost:3013`.*

## Running the Tests

Open a separate terminal window while the server is running to execute the tests. Because the bonus code fixes have been applied to this repository, **all tests will currently PASS.**

**Run the API Test Suite:**

```bash
npm run test:api

```

**Run the UI Test Suite:**

```bash
npm run test:ui

```

```
