const request = require('supertest');
const API_URL = 'http://localhost:3013'; 
describe('Candidate API Phase 1 Bugs', () => {
  it('should clamp pageSize to a maximum of 50', async () => {
    const res = await request(API_URL).get('/api/candidates?pageSize=100');
    expect(res.body.pageSize).toBeLessThanOrEqual(50);
    expect(res.body.data.length).toBeLessThanOrEqual(50);
  });

  //bug 4:type-coercion
  it('should fall back to default pageSize (10) if passed a non-numeric string', async () => {
    const res = await request(API_URL).get('/api/candidates?pageSize=abc');
    expect(typeof res.body.pageSize).toBe('number');
    expect(Number.isNaN(res.body.pageSize)).toBe(false);
    expect(res.body.pageSize).toBe(10);
  });

  //bug 5: wrong-sort-order
  it('should return results in descending order when sort=name:desc is requested', async () => {
    const res = await request(API_URL).get('/api/candidates?sort=name:desc');
    const names = res.body.data.map(c => c.name);
    // Create a manually sorted descending array to compare against
    const sortedDescending = [...names].sort((a, b) => b.localeCompare(a));
    expect(names).toEqual(sortedDescending);
  });
});