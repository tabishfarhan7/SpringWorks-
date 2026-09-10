const request = require('supertest');
const API_URL = 'http://localhost:3013';

describe('Candidate API - Unsubmitted Bugs', () => {
  //bug 7: case-sensitivity-mismatch
  it('should return matches regardless of search query casing', async () => {
    const res = await request(API_URL).get('/api/candidates?q=aarav');
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.data[0].name.toLowerCase()).toContain('aarav');
  });

  //bug 8: wrong-arithmetic
  it('should round totalPages up (Math.ceil) instead of standard rounding', async () => {
    const res = await request(API_URL).get('/api/candidates?pageSize=13');
    // 30 items total. 30 / 13 = 2.3. Ceiling should be 3.
    expect(res.body.totalPages).toBe(3);
  });

  //bug 9: off-by-one-boundary 
  it('should return exactly pageSize rows on a full page', async () => {
    const res = await request(API_URL).get('/api/candidates?pageSize=10');
    expect(res.body.data.length).toBe(10);
  });

  //bug 10: missing-boundary-check 
  it('should prevent page numbers from corrupting the array when 0 or negative', async () => {
    const res = await request(API_URL).get('/api/candidates?page=0');
    expect(res.body.data[0].id).toBe(1);
  });
});