let state = { q: '', page: 1, pageSize: 10, sortField: 'name', sortDir: 'asc' };

const rowsEl = document.getElementById('rows');
const pageInfoEl = document.getElementById('pageInfo');
const resultCountEl = document.getElementById('resultCount');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

async function load() {
  const params = new URLSearchParams({
    q: state.q,
    page: state.page,
    pageSize: state.pageSize,
    sort: `${state.sortField}:${state.sortDir}`,
  });
  const res = await fetch(`/api/candidates?${params.toString()}`);
  const body = await res.json();
  render(body);
}

function render(body) {
  rowsEl.innerHTML = '';
  for (const c of body.data) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${c.name}</td>
      <td>${c.email}</td>
      <td><span class="badge badge-${c.status}">${c.status}</span></td>
      <td>${c.createdAt.split('-').reverse().join('-')}</td> <!-- //Fix Bug 1: Format date to DD-MM-YYYY -->
    `;
    rowsEl.appendChild(tr);
  }

  pageInfoEl.textContent = `Page ${body.page} of ${body.totalPages}`; //Fix Bug 11: Display current page instead of pageSize

  resultCountEl.textContent = `${body.total} results`; //Fix Bug 6: Display total matches instead of screen rows

  prevBtn.disabled = state.page <= 1; //Fix Bug 10 related: Ensure prevBtn is disabled on page 1
  nextBtn.disabled = !body.hasNext;

  // sort arrow indicators
  document.querySelectorAll('.arrow').forEach((el) => { el.textContent = ''; });
  const arrowEl = document.querySelector(`.arrow[data-arrow="${state.sortField}"]`);
  if (arrowEl) {
    arrowEl.textContent = state.sortDir === 'asc' ? '▲' : '▼'; //Fix Bug 12: Correct sort arrow direction
  }
}

document.getElementById('searchBtn').addEventListener('click', () => {
  state.q = document.getElementById('q').value;
  state.page = 1; //Fix Bug 3: Reset pagination to page 1 on new search
  load();
});

document.getElementById('q').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') document.getElementById('searchBtn').click();
});

document.querySelectorAll('th[data-field]').forEach((th) => {
  th.addEventListener('click', () => {
    const field = th.dataset.field;
    if (state.sortField === field) {
      state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      state.sortField = field;
      state.sortDir = 'asc';
    }
    state.page = 1;
    load();
  });
});

prevBtn.addEventListener('click', () => {
  if (state.page > 1) { state.page -= 1; load(); }
});
nextBtn.addEventListener('click', () => {
  state.page += 1;
  load();
});

// --- Tooling: reset button (not part of the app under test) ---
function showToast(msg) {
  let toast = document.getElementById('toolingToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toolingToast';
    toast.className = 'tooling-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('show'), 1500);
}

document.getElementById('resetBtn').addEventListener('click', async () => {
  await fetch('/api/reset', { method: 'POST' });
  load();
  showToast('Data reset');
});

load();