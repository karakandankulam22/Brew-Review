/* ================= Brew Review — Kara & Joel's Coffee Journal ================= */

const CATS = [
  { key: 'ambiance',      label: 'Ambiance' },
  { key: 'selection',     label: 'Coffee Selection' },
  { key: 'creativity',    label: 'Creativity' },
  { key: 'coffeeArt',     label: 'Coffee Art' },
  { key: 'coffeeQuality', label: 'Coffee Quality' },
  { key: 'service',       label: 'Service' },
];
const FOOD = { key: 'food', label: 'Food (bonus)' };

const FACTS = [
  "Coffee is the world's second most traded commodity after crude oil.",
  "Espresso has less caffeine per serving than a mug of drip coffee — it's just far more concentrated.",
  "The word “coffee” comes from the Arabic “qahwa,” by way of the Turkish “kahve.”",
  "Matcha is shade-grown for weeks before harvest, boosting its chlorophyll and that vivid green.",
  "A single coffee tree produces only about 1–2 pounds of roasted coffee per year.",
  "Finland drinks more coffee per person than any other country in the world.",
  "The 'crema' on a good espresso is emulsified oils and CO₂ — a sign of fresh beans.",
  "Beethoven counted out exactly 60 beans per cup of coffee. Every time.",
  "Coffee 'beans' are actually the seeds of a fruit called a coffee cherry.",
  "Matcha and coffee both contain caffeine, but matcha's L-theanine gives a calmer, steadier lift.",
  "Cold brew isn't the same as iced coffee — it's steeped cold for 12+ hours, never heated.",
  "The flat white was born in Australia/New Zealand in the 1980s.",
  "Decaf still has a little caffeine — usually 2–5 mg per cup.",
  "Light roasts actually contain slightly more caffeine than dark roasts by volume.",
  "The first webcam ever was invented to watch a coffee pot at Cambridge in 1991.",
  "SF's own Blue Bottle started at a farmers' market stand in 2002.",
  "The optimal water temperature for brewing is 195–205°F — just below boiling.",
  "A 'latte' in Italy just means milk — order one and you may get a glass of milk!",
];

const PERSON_COLORS = { kara: '#b06b3a', joel: '#7a8b4f', both: '#4a7d3f' };

/* ---- Build wishlist/suggestion cafés from Joel's map (joel-cafes.js) ---- */
function mapsSearch(name) {
  return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(name + ' San Francisco');
}
function joelWishlist() {
  const list = (window.JOEL_CAFES || []);
  return list.map((c, i) => ({
    id: c.id, name: c.name,
    // The best-rated spots (4.8★+ on Google, well reviewed) become "Suggested"
    status: (c.googleRating >= 4.8 && c.reviews >= 100) ? 'suggested' : 'wishlist',
    address: 'San Francisco, CA', url: '', mapsUrl: mapsSearch(c.name),
    lat: c.lat, lng: c.lng, approx: !!c.approx,
    photos: [], hasFood: false, addedAt: 100 + i,
    comments: c.note || '',
    googleRating: c.googleRating, reviews: c.reviews, price: c.price,
    ratings: { kara: {}, joel: {} },
  }));
}

/* ---------------- Seed data ---------------- */
function seedData() {
  return {
    cafes: [
      {
        id: 'kissaten', name: 'Kissaten Hi-Fi', status: 'visited',
        address: '189 6th Ave, Inner Richmond, SF', url: 'https://www.instagram.com/kissaten.hifi/', lat: 37.7840, lng: -122.4642,
        photos: [
          'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=900&q=80',
          'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80',
          'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80'
        ], hasFood: false, addedAt: 1,
        comments: 'Part of our “Coffee Extravaganza” outing (featuring Uncle Joel). All the drinks were very good but we couldn’t fully judge coffee quality — everything was very dense with other flavors.',
        ratings: {
          kara: { ambiance: 8.5, selection: 9.5, creativity: 8, coffeeArt: 4, coffeeQuality: 7, service: 7 },
          joel: { ambiance: 9, selection: 9.5, creativity: 8.5, coffeeArt: 5, coffeeQuality: 6, service: 8 },
        },
      },
      {
        id: 'hologram', name: 'Hologram', status: 'visited',
        address: '2512 Clement St, Outer Richmond, SF', url: 'https://www.hologramsf.com', lat: 37.7821, lng: -122.4856,
        photos: [
          'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&q=80',
          'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=500&q=80',
          'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500&q=80'
        ], hasFood: true, addedAt: 2,
        comments: 'The food absolutely stole the show here.',
        ratings: {
          kara: { ambiance: 8, selection: 6, creativity: 6.5, coffeeArt: 6.5, coffeeQuality: 5, food: 10 },
          joel: { ambiance: 8, selection: 7, creativity: 7, coffeeArt: 6.5, coffeeQuality: 7, food: 9.5 },
        },
      },
      {
        id: 'hardware', name: 'Hardware Coffee Co.', status: 'visited',
        address: '32 West Portal Ave, SF', url: 'https://hardwarecoffee.co', lat: 37.7404, lng: -122.4663,
        photos: [
          'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=900&q=80',
          'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80',
          'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80'
        ], hasFood: true, addedAt: 3,
        comments: 'Gorgeous space — but the coffee itself really let us down.',
        ratings: {
          kara: { ambiance: 10, selection: 4, creativity: 4, coffeeArt: 8.5, coffeeQuality: 2, food: 4 },
          joel: { ambiance: 9.5, selection: 4, creativity: 3, coffeeArt: 7, coffeeQuality: 2, food: 5 },
        },
      },
    ].concat(joelWishlist()),
    availability: { kara: {}, joel: {} },
    theme: 'light',
  };
}

/* ---------------- State ---------------- */
const LS_KEY = 'brewReview.v3';
let state = load();
let currentWho = 'kara';
let editingId = null;

function load() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return seedData();
}
function save() { localStorage.setItem(LS_KEY, JSON.stringify(state)); }

/* ---------------- Rating math ---------------- */
function catAvg(cafe, key) {
  const a = cafe.ratings?.kara?.[key];
  const b = cafe.ratings?.joel?.[key];
  const vals = [a, b].filter(v => typeof v === 'number' && !isNaN(v));
  if (!vals.length) return null;
  return vals.reduce((s, v) => s + v, 0) / vals.length;
}
function finalScore(cafe) {
  const keys = CATS.map(c => c.key);
  if (cafe.hasFood) keys.push('food');
  const avgs = keys.map(k => catAvg(cafe, k)).filter(v => v !== null);
  if (!avgs.length) return null;
  return avgs.reduce((s, v) => s + v, 0) / avgs.length;
}
function fmt(n) { return n === null || n === undefined ? '–' : (Math.round(n * 10) / 10).toFixed(1).replace(/\.0$/, ''); }

function starHTML(score10) {
  if (score10 === null) return '';
  const s5 = score10 / 2;
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (s5 >= i) html += '★';
    else if (s5 >= i - 0.5) html += '⯨';
    else html += '<span class="empty">★</span>';
  }
  return html;
}
function starHTML5(r) {           // r already on a 0–5 scale (Google rating)
  if (r === null || r === undefined) return '';
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (r >= i) html += '★';
    else if (r >= i - 0.5) html += '⯨';
    else html += '<span class="empty">★</span>';
  }
  return html;
}

/* ---------------- Fun fact ---------------- */
function setFunFact() {
  const dayIndex = Math.floor(Date.now() / 86400000);
  document.getElementById('funfact').textContent = FACTS[dayIndex % FACTS.length];
}

/* ---------------- Rendering ---------------- */
function render() {
  renderStats();
  renderRated();
  renderWishlist();
  renderSuggestions();
  save();
}

function renderStats() {
  const visited = state.cafes.filter(c => c.status === 'visited');
  const scores = visited.map(finalScore).filter(v => v !== null);
  const avg = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : null;
  let best = null;
  visited.forEach(c => { const s = finalScore(c); if (s !== null && (!best || s > best.s)) best = { name: c.name, s }; });
  const wish = state.cafes.filter(c => c.status === 'wishlist').length;
  document.getElementById('stats').innerHTML = `
    <div class="stat"><div class="num">${visited.length}</div><div class="lbl">Cafés rated</div></div>
    <div class="stat"><div class="num">${fmt(avg)}</div><div class="lbl">Average score</div></div>
    <div class="stat"><div class="num">${best ? fmt(best.s) : '–'}</div><div class="lbl">Top: ${best ? best.name : '—'}</div></div>
    <div class="stat"><div class="num">${wish}</div><div class="lbl">On the wishlist</div></div>`;
}

function cafeCard(cafe) {
  const isVisited = cafe.status === 'visited';
  const cover = (cafe.photos && cafe.photos[0])
    ? `<div class="cafe-cover" style="background-image:url('${cafe.photos[0]}')">`
    : `<div class="cafe-cover"><div class="cover-ph">☕</div>`;
  let badge = '';
  if (cafe.status === 'suggested') badge = '<span class="badge suggest">Suggested</span>';
  else if (cafe.status === 'wishlist') badge = '<span class="badge wish">Want to try</span>';
  else badge = '<span class="badge">Rated</span>';

  // Score chip + stars: our /10 rating for visited, Google's /5 for the rest
  let scoreChip = '', stars = '', grating = '';
  if (isVisited) {
    const s = finalScore(cafe);
    if (s !== null) { scoreChip = `<div class="score-chip">${fmt(s)}</div>`; stars = `<div class="stars">${starHTML(s)}</div>`; }
  } else if (cafe.googleRating !== null && cafe.googleRating !== undefined) {
    scoreChip = `<div class="score-chip g">${cafe.googleRating}<small>★G</small></div>`;
    stars = `<div class="stars">${starHTML5(cafe.googleRating)}</div>`;
    grating = `<div class="grating"><b>★ ${cafe.googleRating}</b> · ${Number(cafe.reviews || 0).toLocaleString()} Google reviews${cafe.price ? ` · <span class="price">${escapeHtml(cafe.price)}</span>` : ''}</div>`;
  }

  let cats = '';
  if (isVisited) {
    const keys = CATS.map(c => c.key).concat(cafe.hasFood ? ['food'] : []);
    cats = '<div class="cat-mini">' + keys.map(k => {
      const label = (CATS.find(c => c.key === k) || FOOD).label;
      const v = catAvg(cafe, k);
      return v === null ? '' : `<span>${label}: <b>${fmt(v)}</b></span>`;
    }).join('') + '</div>';
  }

  const photos = (cafe.photos || []).slice(0, 4).map(p => `<img src="${p}" alt="" onerror="this.style.display='none'">`).join('');
  const website = cafe.url ? `<a class="btn ghost sm" href="${cafe.url}" target="_blank" rel="noopener">🔗 Website</a>` : '';
  const mapsUrl = cafe.mapsUrl || ((typeof cafe.lat === 'number') ? mapsSearch(cafe.name) : '');
  const maps = mapsUrl ? `<a class="btn ghost sm" href="${mapsUrl}" target="_blank" rel="noopener">📍 Maps</a>` : '';
  const approx = cafe.approx ? `<div class="approx-tag">📍 Approx. location — open Edit to fine-tune the pin</div>` : '';

  let actions = '';
  if (cafe.status === 'suggested') {
    actions = `${website}${maps}<button class="btn sm gold" onclick="addSuggestionToWishlist('${cafe.id}')">＋ Add to my list</button>`;
  } else if (cafe.status === 'wishlist') {
    actions = `${website}${maps}<button class="btn sm gold" onclick="openEditor('${cafe.id}', true)">☕ We went — rate it</button><button class="btn ghost sm" onclick="openEditor('${cafe.id}')">Edit</button>`;
  } else {
    actions = `${website}${maps}<button class="btn ghost sm" onclick="openEditor('${cafe.id}')">✎ Edit ratings</button>`;
  }

  return `
  <div class="cafe-card">
    ${cover}${badge}${scoreChip}</div>
    <div class="cafe-body">
      <h3>${escapeHtml(cafe.name)}</h3>
      ${stars}
      ${grating}
      <div class="cafe-meta">${escapeHtml(cafe.address || 'San Francisco')}</div>
      ${approx}
      ${photos ? `<div class="photo-strip">${photos}</div>` : ''}
      ${cats}
      ${cafe.comments ? `<div class="comments">${escapeHtml(cafe.comments)}</div>` : ''}
      <div class="cafe-actions">${actions}</div>
    </div>
  </div>`;
}

function renderRated() {
  const q = document.getElementById('searchRated').value.toLowerCase();
  const sort = document.getElementById('sortRated').value;
  let list = state.cafes.filter(c => c.status === 'visited' && c.name.toLowerCase().includes(q));
  list.sort((a, b) => {
    if (sort === 'name') return a.name.localeCompare(b.name);
    if (sort === 'recent') return (b.addedAt || 0) - (a.addedAt || 0);
    const sa = finalScore(a) ?? -1, sb = finalScore(b) ?? -1;
    return sort === 'scoreAsc' ? sa - sb : sb - sa;
  });
  const grid = document.getElementById('ratedGrid');
  grid.innerHTML = list.length ? list.map(c => cafeCard(c)).join('')
    : `<div class="empty-state"><div class="em">☕</div><p>No rated cafés yet. Add your first one!</p></div>`;
}

function renderWishlist() {
  const q = (document.getElementById('searchWish').value || '').toLowerCase();
  const sort = document.getElementById('sortWish').value;
  let list = state.cafes.filter(c => c.status === 'wishlist' && c.name.toLowerCase().includes(q));
  list.sort((a, b) => {
    if (sort === 'name') return a.name.localeCompare(b.name);
    if (sort === 'reviews') return (b.reviews || 0) - (a.reviews || 0);
    if (sort === 'rating') return (b.googleRating || 0) - (a.googleRating || 0) || (b.reviews || 0) - (a.reviews || 0);
    return (a.addedAt || 0) - (b.addedAt || 0);
  });
  const total = state.cafes.filter(c => c.status === 'wishlist').length;
  document.getElementById('wishCount').textContent = `${list.length} of ${total} spots`;
  const grid = document.getElementById('wishGrid');
  grid.innerHTML = list.length ? list.map(c => cafeCard(c)).join('')
    : `<div class="empty-state"><div class="em">📝</div><p>No matches — try a different search.</p></div>`;
}

function renderSuggestions() {
  // suggestions must be rated above 4 stars (Google rating out of 5)
  const list = state.cafes.filter(c => c.status === 'suggested' && (c.googleRating || 0) > 4)
    .sort((a, b) => (b.googleRating || 0) - (a.googleRating || 0) || (b.reviews || 0) - (a.reviews || 0));
  const grid = document.getElementById('suggestGrid');
  grid.innerHTML = list.length ? list.map(c => cafeCard(c)).join('')
    : `<div class="empty-state"><p>No suggestions right now.</p></div>`;
}

function addSuggestionToWishlist(id) {
  const c = state.cafes.find(x => x.id === id);
  if (!c) return;
  c.status = 'wishlist';
  c.addedAt = Date.now();
  toast(`${c.name} added to your list ✓`);
  render(); renderMap();
}

/* ---------------- Editor modal ---------------- */
function buildRatingRows() {
  const rows = CATS.map(c => rowHtml(c.key, c.label, false)).join('') + rowHtml('food', FOOD.label, true);
  document.getElementById('ratingRows').innerHTML = rows;
}
function rowHtml(key, label, isFood) {
  return `<tr class="${isFood ? 'food-row' : ''}" data-key="${key}">
    <td>${label}</td>
    <td><input type="number" min="0" max="10" step="0.5" data-p="kara" data-k="${key}" oninput="updateFinalPreview()"></td>
    <td><input type="number" min="0" max="10" step="0.5" data-p="joel" data-k="${key}" oninput="updateFinalPreview()"></td>
    <td class="avg-cell" data-avg="${key}">–</td>
  </tr>`;
}

function openEditor(idOrMode, forceRate) {
  buildRatingRows();
  const modal = document.getElementById('modalBack');
  const title = document.getElementById('modalTitle');
  const del = document.getElementById('deleteBtn');

  // reset
  ['f-name','f-address','f-url','f-lat','f-lng','f-photos','f-comments'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('f-hasfood').checked = false;
  document.querySelectorAll('#ratingTable input[type=number]').forEach(i => i.value = '');

  if (idOrMode === 'new-visited' || idOrMode === 'new-wishlist') {
    editingId = null;
    title.textContent = idOrMode === 'new-visited' ? 'Add a Rated Café' : 'Add a Café to Try';
    document.getElementById('f-status').value = idOrMode === 'new-visited' ? 'visited' : 'wishlist';
    del.style.visibility = 'hidden';
  } else {
    const c = state.cafes.find(x => x.id === idOrMode);
    if (!c) return;
    editingId = c.id;
    title.textContent = forceRate ? `Rate ${c.name}` : `Edit ${c.name}`;
    document.getElementById('f-name').value = c.name || '';
    document.getElementById('f-address').value = c.address || '';
    document.getElementById('f-url').value = c.url || '';
    document.getElementById('f-lat').value = c.lat ?? '';
    document.getElementById('f-lng').value = c.lng ?? '';
    document.getElementById('f-photos').value = (c.photos || []).join(', ');
    document.getElementById('f-comments').value = c.comments || '';
    document.getElementById('f-hasfood').checked = !!c.hasFood;
    document.getElementById('f-status').value = (c.status === 'visited') ? 'visited' : (forceRate ? 'visited' : 'wishlist');
    ['kara','joel'].forEach(p => {
      Object.entries(c.ratings?.[p] || {}).forEach(([k, v]) => {
        const inp = document.querySelector(`#ratingTable input[data-p="${p}"][data-k="${k}"]`);
        if (inp && typeof v === 'number') inp.value = v;
      });
    });
    del.style.visibility = 'visible';
  }
  toggleFood();
  updateFinalPreview();
  modal.classList.add('open');
}

function closeEditor() { document.getElementById('modalBack').classList.remove('open'); }

function toggleFood() {
  const on = document.getElementById('f-hasfood').checked;
  const row = document.querySelector('#ratingTable tr[data-key="food"]');
  if (row) row.classList.toggle('on', on);
  updateFinalPreview();
}

function readEditorRatings() {
  const r = { kara: {}, joel: {} };
  document.querySelectorAll('#ratingTable input[type=number]').forEach(inp => {
    const v = parseFloat(inp.value);
    if (!isNaN(v)) r[inp.dataset.p][inp.dataset.k] = Math.min(10, Math.max(0, v));
  });
  return r;
}

function updateFinalPreview() {
  const hasFood = document.getElementById('f-hasfood').checked;
  const r = readEditorRatings();
  const tmp = { ratings: r, hasFood };
  // per-category avgs
  [...CATS, FOOD].forEach(c => {
    const cell = document.querySelector(`[data-avg="${c.key}"]`);
    if (!cell) return;
    const v = catAvg(tmp, c.key);
    cell.textContent = v === null ? '–' : fmt(v);
  });
  const f = finalScore(tmp);
  document.getElementById('finalPreview').textContent = fmt(f);
  document.getElementById('finalStars').innerHTML = f === null ? '' : starHTML(f);
}

function saveCafe() {
  const name = document.getElementById('f-name').value.trim();
  if (!name) { toast('Please give the café a name'); return; }
  const status = document.getElementById('f-status').value;
  const photos = document.getElementById('f-photos').value.split(',').map(s => s.trim()).filter(Boolean);
  const data = {
    name,
    address: document.getElementById('f-address').value.trim(),
    url: document.getElementById('f-url').value.trim(),
    lat: parseFloat(document.getElementById('f-lat').value) || null,
    lng: parseFloat(document.getElementById('f-lng').value) || null,
    photos,
    comments: document.getElementById('f-comments').value.trim(),
    hasFood: document.getElementById('f-hasfood').checked,
    ratings: readEditorRatings(),
    status,
  };

  if (editingId) {
    const c = state.cafes.find(x => x.id === editingId);
    Object.assign(c, data);
    toast(`${name} updated ✓`);
  } else {
    data.id = 'c' + Date.now();
    data.addedAt = Date.now();
    state.cafes.push(data);
    toast(`${name} saved ✓`);
  }
  closeEditor();
  render();
  renderMap();
  // jump to the relevant tab
  switchView(status === 'visited' ? 'rated' : 'wishlist');
}

function deleteCurrent() {
  if (!editingId) return;
  const c = state.cafes.find(x => x.id === editingId);
  if (!confirm(`Remove “${c?.name}” from your journal?`)) return;
  state.cafes = state.cafes.filter(x => x.id !== editingId);
  closeEditor();
  render();
  renderMap();
  toast('Removed');
}

/* ---------------- Map ---------------- */
let map, markerLayer;
function initMap() {
  map = L.map('map', { scrollWheelZoom: false }).setView([37.7749, -122.4194], 12.4);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, attribution: '© OpenStreetMap contributors'
  }).addTo(map);
  markerLayer = L.layerGroup().addTo(map);
  renderMap();
}
function pin(color) {
  return L.divIcon({
    className: '', iconSize: [22, 22], iconAnchor: [11, 11],
    html: `<div style="width:20px;height:20px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${color};border:2px solid #fff;box-shadow:0 2px 5px rgba(0,0,0,.4)"></div>`
  });
}
function renderMap() {
  if (!map || !markerLayer) return;
  markerLayer.clearLayers();
  const colorFor = s => s === 'visited' ? '#7b4a2d' : s === 'suggested' ? '#7a8b4f' : '#c99a4b';
  state.cafes.forEach(c => {
    if (typeof c.lat !== 'number' || typeof c.lng !== 'number') return;
    let scoreLine = '';
    if (c.status === 'visited') {
      const s = finalScore(c);
      if (s !== null) scoreLine = `<b style="color:#c4622d;font-size:1.1rem">Our score: ${fmt(s)}/10</b><br>`;
    } else if (c.googleRating) {
      scoreLine = `<b style="color:#7a8b4f;font-size:1.05rem">★ ${c.googleRating} Google</b> <span style="color:#999;font-size:.78rem">(${Number(c.reviews || 0).toLocaleString()})</span><br>`;
    }
    const label = c.status === 'visited' ? 'Rated' : c.status === 'suggested' ? 'Suggested (4★+)' : 'Want to try';
    const mapsUrl = c.mapsUrl || mapsSearch(c.name);
    const link = c.url
      ? `<a href="${c.url}" target="_blank" rel="noopener">Visit website →</a>`
      : `<a href="${mapsUrl}" target="_blank" rel="noopener">Open in Google Maps →</a>`;
    const popup = `<div style="font-family:Georgia,serif;min-width:160px">
      <div style="font-weight:700;font-size:1.05rem">${escapeHtml(c.name)}</div>
      <div style="color:#888;font-size:.8rem;margin-bottom:4px">${label}${c.price ? ' · ' + escapeHtml(c.price) : ''}</div>
      ${scoreLine}${link}</div>`;
    L.marker([c.lat, c.lng], { icon: pin(colorFor(c.status)) }).bindPopup(popup).addTo(markerLayer);
  });
}

/* ---------------- Calendar ---------------- */
const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const SLOTS = ['7–9 AM','9–11 AM','11 AM–1 PM','1–3 PM','3–5 PM','5–7 PM','7–9 PM'];
function setWho(w) { currentWho = w; }
function slotKey(d, s) { return d + '_' + s; }

function buildCalendar() {
  const t = document.getElementById('calTable');
  let head = '<tr><th class="time-lbl">Time</th>' + DAYS.map(d => `<th>${d}</th>`).join('') + '</tr>';
  let body = '';
  SLOTS.forEach((slot, si) => {
    body += `<tr><td class="time-lbl">${slot}</td>`;
    DAYS.forEach((day, di) => {
      body += `<td data-day="${di}" data-slot="${si}" onclick="toggleSlot(${di},${si})"><div class="slot"><i></i></div></td>`;
    });
    body += '</tr>';
  });
  t.innerHTML = head + body;
  paintCalendar();
}
function toggleSlot(di, si) {
  const key = slotKey(di, si);
  const av = state.availability[currentWho];
  av[key] = !av[key];
  save();
  paintCalendar();
}
function paintCalendar() {
  document.querySelectorAll('#calTable td[data-day]').forEach(td => {
    const key = slotKey(td.dataset.day, td.dataset.slot);
    const k = state.availability.kara[key];
    const j = state.availability.joel[key];
    let bg = 'transparent';
    if (k && j) bg = PERSON_COLORS.both;
    else if (k) bg = PERSON_COLORS.kara;
    else if (j) bg = PERSON_COLORS.joel;
    td.style.background = bg;
    td.title = (k && j) ? 'Both free!' : k ? 'Kara free' : j ? 'Joel free' : '';
  });
  // both-free summary
  const both = [];
  SLOTS.forEach((slot, si) => DAYS.forEach((day, di) => {
    const key = slotKey(di, si);
    if (state.availability.kara[key] && state.availability.joel[key]) both.push(`${day} ${slot}`);
  }));
  const note = document.getElementById('bothNote');
  note.innerHTML = both.length
    ? `<b>☕ You're both free:</b> ${both.join(' · ')}. Time for a coffee run!`
    : `<span style="color:var(--muted)">No overlapping free times yet. Mark your availability above to find a match.</span>`;
}
function clearAvailability() {
  state.availability[currentWho] = {};
  save(); paintCalendar();
  toast(`Cleared ${currentWho === 'kara' ? "Kara's" : "Joel's"} slots`);
}

/* ---------------- Navigation & theme ---------------- */
function switchView(view) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + view).classList.add('active');
  document.querySelectorAll('#tabs button').forEach(b => b.classList.toggle('active', b.dataset.view === view));
  if (view === 'map' && map) setTimeout(() => map.invalidateSize(), 100);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  document.getElementById('themeToggle').textContent = state.theme === 'dark' ? '☀️' : '🌙';
}
function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  applyTheme(); save();
}

/* ---------------- Backup ---------------- */
function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'brew-review-backup.json';
  a.click();
  toast('Backup downloaded ✓');
}
function importData(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      state = JSON.parse(reader.result);
      if (!state.availability) state.availability = { kara: {}, joel: {} };
      save(); applyTheme(); render(); renderMap(); buildCalendar();
      toast('Backup loaded ✓');
    } catch (err) { toast('Could not read that file'); }
  };
  reader.readAsText(file);
}
function resetSeed() {
  if (!confirm('Reset everything back to the starter data? This erases your changes.')) return;
  state = seedData();
  save(); applyTheme(); render(); renderMap(); buildCalendar();
  toast('Reset to starter data');
}

/* ---------------- Utils ---------------- */
function escapeHtml(s) { return (s || '').replace(/[&<>"']/g, m => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m])); }
let toastTimer;
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
}

/* ---------------- Boot ---------------- */
document.getElementById('tabs').addEventListener('click', e => {
  if (e.target.dataset.view) switchView(e.target.dataset.view);
});
document.getElementById('themeToggle').addEventListener('click', toggleTheme);
document.getElementById('modalBack').addEventListener('click', e => {
  if (e.target.id === 'modalBack') closeEditor();
});

setFunFact();
applyTheme();
render();
buildCalendar();
initMap();
