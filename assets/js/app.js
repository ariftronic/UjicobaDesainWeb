/* SoloRasa — tampilan bersama (header, footer, navigasi) dan render tiap halaman. */
(function () {
  const D = window.SOLORASA_DATA, SR = window.SR;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const page = document.body.dataset.page;
  const params = new URLSearchParams(location.search);

  /* Ikon Lucide (MIT) */
  const P = {
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    filter: '<path d="M22 3H2l8 9.46V19l4 2v-8.54z"/>',
    pin: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    house: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    compass: '<circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"/>',
    map: '<path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/>',
    chat: '<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/>',
    alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    searchx: '<path d="m13.5 8.5-5 5"/><path d="m8.5 8.5 5 5"/><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    nav: '<polygon points="3 11 22 2 13 21 11 13 3 11"/>',
    download: '<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',
    copy: '<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    phone: '<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    landmark: '<path d="M10 18v-7"/><path d="M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M3 22h18"/><path d="M6 18v-7"/>',
    utensils: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
    cookie: '<path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/><path d="M11 17v.01"/><path d="M7 14v.01"/>',
    coffee: '<path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/>',
    store: '<path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5"/><path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05"/><path d="M2 7h20l-2-5H4z"/>',
    wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>'
  };
  const icon = (n, s = 20) => `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;
  const STATUS = { READY: 'READY', HABIS: 'HABIS', BELUM: 'BELUM TERKONFIRMASI' };
  const hhmm = s => s.replace(':', '.');
  const hours = p => hhmm(p.open) + '–' + hhmm(p.close);

  /* ---------- kerangka bersama ---------- */
  const navItems = [['index.html', 'Beranda', 'home', 'house'], ['jelajah.html', 'Jelajah', 'jelajah', 'compass'], ['peta.html', 'Peta', 'peta', 'map']];
  const current = page === 'detail' ? 'jelajah' : page;
  const logo = (dark) => `<span class="sr-logo${dark ? ' dark' : ''}" aria-hidden="true">SR</span>`;
  const wordmark = '<span class="sr-wordmark"><span class="a">Solo</span><span class="b">Rasa</span></span>';

  function shell() {
    document.body.insertAdjacentHTML('afterbegin', `
      <a class="visually-hidden-focusable btn btn-sr m-2 position-absolute" href="#main">Lewati ke konten</a>
      <header class="sr-header">
        <div class="container-xl inner d-flex align-items-center gap-3">
          <a class="sr-brand" href="index.html" aria-label="SoloRasa, ke Beranda">${logo()}${wordmark}</a>
          <nav class="sr-nav d-none d-md-flex gap-4 mx-auto" aria-label="Navigasi utama">
            ${navItems.map(([h, l, k]) => `<a href="${h}"${k === current ? ' aria-current="page"' : ''}>${l}</a>`).join('')}
          </nav>
          <form class="d-none d-lg-flex" role="search" action="jelajah.html">
            <label class="visually-hidden" for="hdr-q">Cari makanan atau area</label>
            <input class="form-control" id="hdr-q" name="q" type="search" placeholder="Cari makanan atau area" style="width:240px">
          </form>
          <a class="btn btn-sr ms-auto ms-md-0" href="jelajah.html#filter">${icon('filter', 18)}<span>Filter</span></a>
        </div>
      </header>
      <div class="container-xl sr-note">Contoh data • Porsi, stok, dan pembaruan hanya ilustrasi. Konfirmasi harga serta ketersediaan ke penjual.</div>`);
    document.body.insertAdjacentHTML('beforeend', `
      <footer class="sr-footer mt-5">
        <div class="container-xl py-5">
          <div class="row g-4">
            <div class="col-md-6">
              <div class="d-flex align-items-center gap-2 mb-2">${logo(true)}<span class="sr-display fs-4 text-white">SoloRasa</span></div>
              <p class="mb-0">Jelajahi rasa, temukan cerita di setiap sudut Solo.</p>
            </div>
            <nav class="col-6 col-md-3" aria-label="Navigasi footer"><h2 class="h6 text-white">Navigasi</h2>
              <ul class="list-unstyled mb-0"><li><a href="jelajah.html">Jelajah kuliner</a></li><li><a href="peta.html">Peta</a></li><li><a href="jelajah.html#filter">Filter</a></li></ul></nav>
            <div class="col-6 col-md-3"><h2 class="h6 text-white">Bantuan</h2>
              <p class="small mb-0">Konfirmasi menu dan harga langsung ke penjual melalui halaman detail.</p></div>
          </div>
          <hr class="border-light opacity-25">
          <p class="credit mb-1">${esc(D ? D.credits : '')}</p>
          <p class="credit mb-0">© 2026 SoloRasa · Tugas Desain Web Kelompok 1, PTIK FKIP UNS. Data dicek ${esc(D ? D.checkedAt : '')}.</p>
        </div>
      </footer>
      <nav class="sr-bottom-nav d-flex d-md-none" aria-label="Navigasi bawah">
        ${navItems.map(([h, l, k, ic]) => `<a href="${h}"${k === current ? ' aria-current="page"' : ''}>${icon(ic, 22)}<span>${l}</span></a>`).join('')}
      </nav>`);
  }

  /* ---------- komponen ---------- */
  function card(p) {
    const st = p.menu[0].status;
    return `<div class="col"><article class="sr-card position-relative">
      <div class="position-relative"><img class="photo" src="${p.img}" alt="${esc(p.imgAlt)}" loading="lazy" width="640" height="400"><span class="tag">${esc(p.label)}</span></div>
      <div class="body">
        <h3><a class="stretched-link text-reset text-decoration-none" href="detail.html?id=${p.id}">${esc(p.name)}</a></h3>
        <div class="small text-muted-sr">${esc(p.dish)} · <span class="rating">★ ${p.rating}</span> Google</div>
        <div class="price">${esc(p.priceText)} <span class="small fw-normal text-muted-sr">/ orang</span></div>
        <div class="small text-muted-sr d-flex align-items-center gap-1">${icon('pin', 15)} ${esc(p.area)}, Surakarta</div>
        <div class="small text-muted-sr d-flex align-items-center gap-1">${icon('clock', 15)} Buka ${hours(p)}</div>
        <div class="d-flex align-items-center gap-2 small"><span class="status status-${st}">${STATUS[st]}</span><span class="text-muted-sr">${esc(p.menu[0].name)}</span></div>
        <div class="cta"><span class="btn btn-sr-outline w-100">Lihat menu dan harga</span></div>
      </div></article></div>`;
  }
  const grid = list => `<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">${list.map(card).join('')}</div>`;
  function errorState(title, body) {
    return `<section class="state" aria-live="polite"><div class="ring">${icon('alert', 32)}</div><h1 class="h2">${esc(title)}</h1>
      <p class="text-muted-sr">${esc(body)}</p><div class="d-grid gap-2 col-sm-8 mx-auto">
      <button class="btn btn-sr" type="button" onclick="location.reload()">Coba lagi</button><a class="btn btn-sr-outline" href="index.html">Kembali ke beranda</a></div></section>`;
  }

  /* ---------- halaman ---------- */
  function home(main) {
    const tiles = [['Legendaris', 'landmark'], ['Makanan Berat', 'utensils'], ['Jajanan', 'cookie'], ['Kopi & Kafe', 'coffee'], ['Street Food', 'store'], ['Murah', 'wallet']]
      .filter(([t]) => D.places.some(p => SR.matchesCategory(p, t))); // jangan tampilkan kategori yang belum ada datanya (hasil kosong)
    main.innerHTML = `
      <section class="sr-hero">
        <img class="hero-bg" src="assets/img/hero-wedangan.webp" alt="" width="1280" height="1024" fetchpriority="high">
        <div class="container-xl position-relative py-5"><div class="row"><div class="col-lg-6 py-lg-5">
          <h1>Jelajahi Kuliner Solo Tanpa Ribet</h1>
          <p class="fs-5 text-muted-sr">Cari makanan, harga, porsi, stok, dan informasi penting dalam satu tempat.</p>
          <form class="d-flex flex-column flex-sm-row gap-2 mt-3" role="search" action="jelajah.html">
            <label class="visually-hidden" for="home-q">Cari makanan, tempat, atau area</label>
            <input class="form-control" id="home-q" name="q" type="search" placeholder="Cari makanan, tempat, atau area">
            <button class="btn btn-sr px-4 text-nowrap" type="submit">${icon('search', 18)} Cari kuliner</button>
          </form>
          <a class="btn btn-sr-outline mt-2" href="jelajah.html">Jelajahi menu</a>
        </div>
        </div></div></div></section>
      <section class="container-xl py-5" aria-labelledby="h-kat"><h2 id="h-kat" class="mb-3">Mau makan apa?</h2>
        <div class="row row-cols-2 row-cols-md-3 row-cols-xl-6 g-3">${tiles.map(([t, ic]) => `<div class="col"><a class="tile" href="jelajah.html?kategori=${encodeURIComponent(t)}">${icon(ic, 22)}<span>${t}</span></a></div>`).join('')}</div></section>
      <section class="py-5" style="background:var(--sr-accent)" aria-labelledby="h-pil"><div class="container-xl">
        <div class="d-flex flex-wrap justify-content-between align-items-end gap-2 mb-4">
          <div><h2 id="h-pil" class="mb-1">Pilihan Kuliner Solo</h2><p class="text-muted-sr mb-0">Legendaris, murah, dan favorit wisatawan.</p></div>
          <a class="btn btn-sr-outline" href="jelajah.html">Lihat semua kuliner ${icon('arrow', 18)}</a></div>
        ${grid(D.places)}</div></section>
      <section class="container-xl py-5" aria-labelledby="h-peta"><h2 id="h-peta" class="mb-1">Temukan lokasi tempat makan</h2>
        <p class="text-muted-sr">Lihat rekomendasi tempat dan petunjuk arah dari lokasimu.</p>
        <iframe class="map-img mb-3" src="https://maps.google.com/maps?q=Surakarta&z=14&output=embed" title="Peta Kota Solo" loading="lazy" referrerpolicy="no-referrer-when-downgrade" style="aspect-ratio:16/9"></iframe>
        <a class="btn btn-sr" href="peta.html">${icon('map', 18)} Buka peta kuliner</a></section>`;
  }

  function readFilters() {
    const num = k => params.get(k) !== null && params.get(k) !== '' ? Number(params.get(k)) : null;
    return { q: params.get('q') || '', category: params.get('kategori') || 'Semua', area: params.get('area') || 'Semua', min: num('min'), max: num('max'),
      status: params.get('status') || 'Semua', promo: params.get('promo') === '1', openNow: params.get('buka') === '1' };
  }
  function writeFilters(f) {
    const p = new URLSearchParams();
    if (f.q) p.set('q', f.q); if (f.category !== 'Semua') p.set('kategori', f.category); if (f.area !== 'Semua') p.set('area', f.area);
    if (f.min != null) p.set('min', f.min); if (f.max != null) p.set('max', f.max); if (f.status !== 'Semua') p.set('status', f.status);
    if (f.promo) p.set('promo', '1'); if (f.openNow) p.set('buka', '1');
    location.href = 'jelajah.html' + (p.toString() ? '?' + p : '');
  }

  function jelajah(main) {
    const f = readFilters();
    const list = SR.applyFilters(D.places, f, SR.nowWib());
    const chips = SR.activeChips(f);
    const filtered = chips.length > 0;
    const quick = [['Semua', () => ({ ...f, category: 'Semua', openNow: false }), f.category === 'Semua' && !f.openNow],
      ['Legendaris', () => ({ ...f, category: 'Legendaris' }), f.category === 'Legendaris'], ['Murah', () => ({ ...f, category: 'Murah' }), f.category === 'Murah'],
      ['Buka sekarang', () => ({ ...f, openNow: !f.openNow }), f.openNow]];
    const areas = ['Semua', ...new Set(D.places.map(p => p.area))];
    const cats = ['Semua', ...D.categories.filter(c => c === f.category || D.places.some(p => SR.matchesCategory(p, c)))];
    main.innerHTML = `
      <div class="container-xl pt-4">
        <nav aria-label="breadcrumb"><ol class="breadcrumb small"><li class="breadcrumb-item"><a href="index.html">Beranda</a></li><li class="breadcrumb-item active" aria-current="page">${filtered ? 'Hasil filter' : 'Jelajah'}</li></ol></nav>
        <h1>${filtered ? 'Hasil Filter' : 'Jelajah Kuliner Solo'}</h1>
        <form class="d-flex gap-2 my-3" role="search" id="q-form">
          <label class="visually-hidden" for="q">Cari makanan, tempat, atau area</label>
          <input class="form-control" id="q" type="search" value="${esc(f.q)}" placeholder="Cari makanan, tempat, atau area">
          <button class="btn btn-sr-outline text-nowrap" type="button" data-bs-toggle="offcanvas" data-bs-target="#filter" aria-controls="filter">${icon('filter', 18)} Filter kuliner</button>
        </form>
        <div class="d-flex flex-wrap gap-2 mb-3" aria-label="Pilihan cepat">${quick.map(([l, , on], i) => `<button type="button" class="chip${on ? ' active' : ''}" data-quick="${i}" aria-pressed="${on}">${l}</button>`).join('')}</div>
        ${filtered ? `<div class="d-flex flex-wrap gap-2 mb-3" aria-label="Filter aktif">${chips.map(c => `<button type="button" class="chip active" data-remove="${c.key}" aria-label="Hapus filter ${esc(c.label)}">${esc(c.label)} ${icon('x', 16)}</button>`).join('')}</div>` : ''}
        <h2 class="h3 mb-1">Temukan menu pilihanmu</h2>
        <p class="small-note" aria-live="polite">${list.length} kuliner ditemukan · contoh data; konfirmasi harga dan ketersediaan ke penjual.</p>
        ${list.length ? grid(list) : `<section class="state panel"><div class="ring">${icon('searchx', 32)}</div><h2>Belum ada hasil yang cocok</h2>
          <p class="text-muted-sr">Coba kurangi filter atau ubah kata kunci pencarian.</p>
          <div class="d-grid gap-2 col-sm-8 mx-auto"><button class="btn btn-sr" type="button" data-bs-toggle="offcanvas" data-bs-target="#filter">Ubah filter</button>
          <a class="btn btn-sr-outline" href="jelajah.html">Hapus filter dan lihat semua</a></div></section>`}
      </div>
      <div class="offcanvas offcanvas-end" tabindex="-1" id="filter" aria-labelledby="filter-title">
        <div class="offcanvas-header"><h2 class="offcanvas-title h3" id="filter-title">Filter Kuliner</h2><button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Tutup"></button></div>
        <form class="offcanvas-body d-flex flex-column gap-4" id="filter-form" novalidate>
          <fieldset><legend class="h6 fw-bold">Kategori</legend><div class="d-flex flex-wrap gap-2">
            ${cats.map((c, i) => `<input class="btn-check" type="radio" name="kategori" id="kat${i}" value="${esc(c)}"${c === f.category ? ' checked' : ''}><label class="chip" for="kat${i}">${esc(c)}</label>`).join('')}</div></fieldset>
          <div><label class="form-label fw-bold" for="area">Area</label><select class="form-select" id="area" name="area">${areas.map(a => `<option${a === f.area ? ' selected' : ''}>${esc(a)}</option>`).join('')}</select></div>
          <fieldset><legend class="h6 fw-bold">Kisaran harga per orang</legend><div class="row g-2">
            <div class="col"><label class="form-label small" for="min">Minimum (Rp)</label><input class="form-control" id="min" name="min" type="number" min="0" step="1000" inputmode="numeric" value="${f.min ?? ''}" placeholder="0"></div>
            <div class="col"><label class="form-label small" for="max">Maksimum (Rp)</label><input class="form-control" id="max" name="max" type="number" min="0" step="1000" inputmode="numeric" value="${f.max ?? ''}" placeholder="100000"></div></div>
            <div class="text-danger small mt-2" id="price-err" role="alert"></div></fieldset>
          <fieldset><legend class="h6 fw-bold">Status menu</legend><div class="d-flex flex-wrap gap-2">
            ${[['Semua', 'Semua'], ['READY', 'READY'], ['HABIS', 'HABIS'], ['BELUM', 'Belum terkonfirmasi']].map(([v, l], i) => `<input class="btn-check" type="radio" name="status" id="st${i}" value="${v}"${v === f.status ? ' checked' : ''}><label class="chip" for="st${i}">${l}</label>`).join('')}</div>
            <div class="small-note mt-2">Status menu terpisah dari jam operasional. "READY" tidak memuat menu yang belum dikonfirmasi penjual.</div></fieldset>
          <!-- switch "Sedang promo" disembunyikan sampai data promo ada (logic.js: !f.promo) -->
          <div class="form-check form-switch d-flex justify-content-between align-items-center ps-0"><label class="form-check-label" for="buka"><b>Buka sekarang</b><br><span class="small-note">Sesuai jam operasional hari ini (WIB)</span></label><input class="form-check-input ms-3" type="checkbox" role="switch" id="buka"${f.openNow ? ' checked' : ''}></div>
          <div class="d-flex gap-2 mt-auto"><a class="btn btn-sr-outline flex-fill" href="jelajah.html">Reset filter</a><button class="btn btn-sr flex-fill" type="submit" id="apply">Terapkan filter</button></div>
        </form></div>`;

    $('#q-form').addEventListener('submit', e => { e.preventDefault(); writeFilters({ ...f, q: $('#q').value.trim() }); });
    main.querySelectorAll('[data-quick]').forEach(b => b.addEventListener('click', () => writeFilters(quick[+b.dataset.quick][1]())));
    main.querySelectorAll('[data-remove]').forEach(b => b.addEventListener('click', () => {
      const k = b.dataset.remove, n = { ...f };
      if (k === 'price') { n.min = null; n.max = null; } else if (k === 'q') n.q = ''; else if (k === 'promo' || k === 'openNow') n[k] = false; else n[k] = 'Semua';
      writeFilters(n);
    }));
    const form = $('#filter-form'), err = $('#price-err'), apply = $('#apply');
    const val = id => $(id).value === '' ? null : Number($(id).value);
    const check = () => { const m = SR.validatePrice(val('#min'), val('#max')); err.textContent = m; apply.disabled = !!m; return !m; };
    form.addEventListener('input', check);
    form.addEventListener('submit', e => { e.preventDefault(); if (!check()) return;
      writeFilters({ q: f.q, category: form.kategori.value, area: $('#area').value, min: val('#min'), max: val('#max'), status: form.status.value, promo: false, openNow: $('#buka').checked }); });
    // Offcanvas dari bawah di HP, dari kanan di desktop (riset 5.2)
    const oc = $('#filter'); const place = () => { const m = matchMedia('(max-width: 767.98px)').matches; oc.classList.toggle('offcanvas-bottom', m); oc.classList.toggle('offcanvas-end', !m); };
    place(); matchMedia('(max-width: 767.98px)').addEventListener('change', place);
    if (location.hash === '#filter') bootstrap.Offcanvas.getOrCreateInstance(oc).show();
  }

  function detail(main) {
    const p = D.places.find(x => x.id === params.get('id'));
    if (!p) { main.innerHTML = errorState('Tempat tidak ditemukan', 'Tautan mungkin salah atau tempat sudah dihapus dari katalog.'); return; }
    document.title = p.name + ' · SoloRasa';
    const open = SR.isOpenAt(p.open, p.close, SR.nowWib());
    main.innerHTML = `
      <div class="container-xl pt-4">
        <nav aria-label="breadcrumb"><ol class="breadcrumb small"><li class="breadcrumb-item"><a href="index.html">Beranda</a></li><li class="breadcrumb-item"><a href="jelajah.html">Jelajah</a></li><li class="breadcrumb-item active" aria-current="page">${esc(p.name)}</li></ol></nav>
        <div class="row g-4">
          <div class="col-lg-8">
            <h1 class="mb-2">${esc(p.name)}</h1>
            <p class="mb-1 text-muted-sr">${esc(p.dish)} · ${esc(p.label)} · <span class="rating">★ ${p.rating}</span> (${p.ratingCount} ulasan Google)</p>
            <p class="small text-muted-sr">Buka ${hours(p)} · <b class="${open ? 'text-success' : ''}">${open ? 'Sedang buka' : 'Sedang tutup'}</b> · status berbeda per menu, lihat di bawah</p>
            <img class="w-100 rounded-4 my-3" style="aspect-ratio:16/9;object-fit:cover" src="${p.hero || p.img}" alt="${esc(p.heroAlt || p.imgAlt)}" width="1280" height="720">
            <h2 class="mt-4">Menu dan harga</h2>
            <ul class="list-unstyled d-grid gap-2 mt-3">${p.menu.map(m => `<li class="panel py-3"><div class="menu-row"><b>${esc(m.name)}</b><span class="price">${esc(m.price || 'Tanya penjual')}</span></div><div class="small text-muted-sr">${esc(m.desc)}</div></li>`).join('')}</ul>
            <p class="small-note">Harga menu tanpa sumber ditulis “Tanya penjual”. Harga per orang ${esc(p.priceText)} dari ${esc(p.source)}.</p>
            <div class="d-flex flex-column flex-sm-row gap-2 my-3">
              <button class="btn btn-sr flex-fill" type="button" data-bs-toggle="modal" data-bs-target="#wa">${icon('chat', 18)} Hubungi via WhatsApp</button>
              <a class="btn btn-sr-outline flex-fill" href="jelajah.html?kategori=${encodeURIComponent(p.category)}">Cari kuliner serupa</a></div>
            <section class="panel mb-3" aria-labelledby="h-stok"><h2 id="h-stok" class="h4">Stok &amp; ketersediaan</h2>
              <ul class="list-unstyled d-grid gap-3 mb-2">${p.menu.map(m => `<li class="d-flex justify-content-between align-items-center gap-2"><div><b>${esc(m.name)}</b><div class="small text-muted-sr">Contoh pembaruan 9 Nov 2026, 09.45 WIB</div></div><span class="status status-${m.status}">${STATUS[m.status]}</span></li>`).join('')}</ul>
              <p class="small-note mb-0">Porsi saji (contoh): ${esc(p.porsi)}</p></section>
            <section class="panel mb-3"><h2 class="h4">Promo</h2><p class="mb-0 text-muted-sr">Belum ada promo terkonfirmasi. Hubungi penjual untuk info promo terbaru.</p></section>
            <section class="panel mb-3"><h2 class="h4">Informasi alergen</h2><p class="mb-0 text-muted-sr">Informasi alergen belum terkonfirmasi. Data kosong bukan berarti bebas alergen; tanyakan ke penjual sebelum memesan.</p></section>
            <section class="panel" style="border-left:4px solid var(--sr-primary)"><h2 class="h4">Poin, aturan, dan ulasan</h2><p class="mb-1">Rating ${p.rating} dari ${p.ratingCount} ulasan Google Maps (dicek ${esc(D.checkedAt)}).</p><p class="small-note mb-0">Ulasan hanya ditampilkan bila sumbernya jelas.</p></section>
          </div>
          <aside class="col-lg-4"><div class="panel position-sticky" style="top:88px">
            <h2 class="h4">Informasi tempat</h2>
            <dl class="mb-3"><dt>Alamat</dt><dd class="text-muted-sr">${esc(p.address)}</dd><dt>Jam buka</dt><dd class="text-muted-sr">Setiap hari, ${hours(p)}</dd>
              ${p.phone ? `<dt>Telepon</dt><dd class="text-muted-sr">${esc(p.phone)} <span class="small">(dari Google Maps, bukan WhatsApp)</span></dd>` : ''}
              <dt>Status menu</dt><dd class="text-muted-sr">Berbeda per menu, lihat Stok &amp; ketersediaan</dd></dl>
            <iframe class="map-img mb-3" src="${SR.embedUrl(p)}" title="Peta lokasi ${esc(p.name)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <div class="d-grid gap-2"><a class="btn btn-sr" href="${SR.dirUrl(p)}" target="_blank" rel="noopener">${icon('nav', 18)} Petunjuk arah</a>
              <a class="btn btn-sr-outline" href="${SR.searchUrl(p)}" target="_blank" rel="noopener">Lihat di Google Maps</a></div>
            <p class="small-note mt-2 mb-0">Peta dan rute dari Google Maps.</p></div></aside>
        </div></div>
      <div class="modal fade" id="wa" tabindex="-1" aria-labelledby="wa-title" aria-hidden="true"><div class="modal-dialog modal-dialog-centered"><div class="modal-content" style="background:var(--sr-bg);border-radius:20px">
        <div class="modal-body text-center p-4"><div class="state m-0"><div class="ring">${icon('chat', 32)}</div></div>
          <h2 class="h3" id="wa-title">Hubungi penjual via WhatsApp</h2>
          <div class="panel text-start my-3"><b>Nomor penjual belum tersedia</b><p class="mb-0 small text-muted-sr">Nomor WhatsApp ${esc(p.name)} belum kami verifikasi. Sementara itu, cek alamat dan jam buka, atau datang langsung ke lokasi.${p.phone ? ' Telepon (Google Maps): ' + esc(p.phone) + '.' : ''}</p></div>
          <button class="btn btn-sr w-100" type="button" data-bs-dismiss="modal">Kembali ke menu dan harga</button></div></div></div></div>`;
  }

  function peta(main) {
    const state = { area: 'Semua', openNow: false };
    const areas = ['Semua', ...new Set(D.places.map(p => p.area))];
    main.innerHTML = `
      <div class="container-xl pt-4">
        <nav aria-label="breadcrumb"><ol class="breadcrumb small"><li class="breadcrumb-item"><a href="index.html">Beranda</a></li><li class="breadcrumb-item active" aria-current="page">Peta</li></ol></nav>
        <h1>Peta Kuliner Solo</h1>
        <div class="row g-4 mt-1">
          <div class="col-lg-7">
            <div class="panel mb-3"><h2 class="h5">Rute dari lokasimu</h2><p class="small text-muted-sr mb-0">Tombol “Petunjuk arah” membuka Google Maps dan menghitung rute dari lokasimu sekarang. Tekan “Lihat di peta” untuk menampilkan tempat di peta.</p></div>
            <div class="d-flex flex-wrap gap-2 mb-3 align-items-end">
              <div><label class="form-label small fw-bold" for="p-area">Area</label><select class="form-select" id="p-area">${areas.map(a => `<option>${esc(a)}</option>`).join('')}</select></div>
              <div class="form-check form-switch d-flex align-items-center gap-2 ps-0" style="min-height:48px"><input class="form-check-input m-0" type="checkbox" role="switch" id="p-open"><label class="form-check-label" for="p-open">Buka sekarang</label></div>
            </div>
            <iframe class="map-img" id="p-map" title="Peta Google Maps" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div class="col-lg-5">
            <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2"><h2 class="h3 mb-0">Rekomendasi</h2>
              <div class="d-flex gap-2"><button class="btn btn-sr-outline btn-sm" type="button" id="dl">${icon('download', 16)} Unduh CSV</button><button class="btn btn-sr-outline btn-sm" type="button" id="cp">${icon('copy', 16)} Salin ke Sheets</button></div></div>
            <p class="small-note" id="p-status" aria-live="polite"></p>
            <ol class="list-unstyled d-grid gap-3" id="p-list"></ol>
          </div></div>
        <section class="mt-5" aria-labelledby="h-rute"><h2 id="h-rute" class="mb-1">Rute Kuliner ½ Hari di Solo</h2>
          <p class="text-muted-sr">Dua rute sesuai jam buka. Waktu perjalanan adalah perkiraan; cek ulang di Google Maps sebelum berangkat.</p>
          <div class="row g-4">${D.routes.map(r => { const plan = SR.planRoute(r, D.places), end = plan[plan.length - 1].leave; return `
            <div class="col-lg-6"><article class="panel h-100 d-flex flex-column">
              <h3 class="h4 mb-1">${esc(r.name)}</h3>
              <p class="small text-muted-sr">${SR.fmtMin(plan[0].arrive)}–${SR.fmtMin(end)} · ±${Math.round((end - plan[0].arrive) / 6) / 10} jam · ${plan.length} tempat</p>
              <ol class="list-unstyled d-grid gap-2 mb-3">${plan.map(st => `${st.travel ? `<li class="small text-muted-sr ps-5">${icon('nav', 14)} ±${st.travel} menit perjalanan</li>` : ''}
                <li class="d-flex gap-3 align-items-start"><span class="sr-logo flex-shrink-0" aria-hidden="true">${st.n}</span>
                  <div><b>${SR.fmtMin(st.arrive)}–${SR.fmtMin(st.leave)}</b> · <a href="detail.html?id=${st.p.id}">${esc(st.p.name)}</a>
                    <div class="small text-muted-sr">${esc(st.p.dish)} · ${esc(st.p.area)} · buka ${hours(st.p)}${st.openOk ? '' : ' · <b class="text-danger">tutup saat jam ini</b>'}</div></div></li>`).join('')}</ol>
              <div class="d-flex flex-wrap gap-2 mt-auto"><a class="btn btn-sr btn-sm" href="${SR.routeUrl(plan)}" target="_blank" rel="noopener">${icon('nav', 16)} Buka rute di Google Maps</a>
                <button class="btn btn-sr-outline btn-sm" type="button" data-route-csv="${r.id}">${icon('download', 16)} Unduh CSV (Excel)</button></div>
            </article></div>`; }).join('')}</div></section></div>`;
    const current = () => SR.recommend(D.places, SR.nowWib()).filter(p => (state.area === 'Semua' || p.area === state.area) && (!state.openNow || p.isOpen));
    const showMap = p => { const m = $('#p-map'); m.src = SR.embedUrl(p); m.title = 'Peta lokasi ' + p.name; };
    const render = () => {
      const list = current();
      $('#p-status').textContent = list.length ? list.length + ' tempat · urut: sedang buka, menu READY terbanyak, lalu termurah' : 'Tidak ada tempat yang cocok. Ubah area atau matikan "Buka sekarang".';
      $('#p-list').innerHTML = list.map(p => `<li class="panel d-flex gap-3">
        <img src="${p.img}" alt="" width="96" height="96" style="width:96px;height:96px;object-fit:cover;border-radius:12px" loading="lazy">
        <div class="flex-fill" style="min-width:0"><div class="d-flex justify-content-between gap-2"><h3 class="h5 mb-1">${esc(p.name)}</h3><span class="rating small">★ ${p.rating}</span></div>
          <div class="small text-muted-sr">${esc(p.address)}</div>
          <div class="small"><span class="status ${p.isOpen ? 'status-READY' : 'status-BELUM'}">${p.isOpen ? 'BUKA' : 'TUTUP'}</span> <span class="text-muted-sr">${hours(p)} · ${p.ready} menu READY · ${esc(p.priceText)}</span></div>
          <div class="d-flex flex-wrap gap-2 mt-2"><a class="btn btn-sr btn-sm" href="${SR.dirUrl(p)}" target="_blank" rel="noopener">${icon('nav', 16)} Petunjuk arah</a><button class="btn btn-sr-outline btn-sm" type="button" data-map="${p.id}">${icon('map', 16)} Lihat di peta</button><a class="btn btn-sr-outline btn-sm" href="detail.html?id=${p.id}">Lihat menu dan harga</a></div></div></li>`).join('');
      if (list[0]) showMap(list[0]);
    };
    $('#p-list').addEventListener('click', e => { const b = e.target.closest('[data-map]'); if (b) showMap(D.places.find(p => p.id === b.dataset.map)); });
    $('#p-area').addEventListener('change', e => { state.area = e.target.value; render(); });
    $('#p-open').addEventListener('change', e => { state.openNow = e.target.checked; render(); });
    const download = (text, name) => {
      const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type: 'text/csv;charset=utf-8' }));
      a.download = name; document.body.append(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
    };
    $('#dl').addEventListener('click', () => download(SR.toCsv(current()), 'solorasa-rekomendasi.csv'));
    main.querySelectorAll('[data-route-csv]').forEach(b => b.addEventListener('click', () => {
      const r = D.routes.find(x => x.id === b.dataset.routeCsv); download(SR.routeCsv(r, SR.planRoute(r, D.places)), 'solorasa-rute-' + r.id + '.csv');
    }));
    $('#cp').addEventListener('click', () => navigator.clipboard.writeText(SR.toTsv(current()))
      .then(() => { $('#p-status').textContent = 'Tersalin. Tempel di sel A1 Google Sheets.'; })
      .catch(() => { $('#p-status').textContent = 'Browser menolak menyalin. Pakai Unduh CSV.'; }));
    render();
  }

  /* ---------- mulai ---------- */
  shell();
  const main = document.getElementById('main');
  // ?gagal=1 mensimulasikan data gagal dimuat (untuk uji tugas T7)
  if (!D || !SR || params.get('gagal') === '1') { main.innerHTML = errorState('Informasi belum dapat dimuat', 'Koneksi terputus atau data belum tersedia. Periksa internetmu lalu coba lagi.'); return; }
  // animasi muncul: elemen baru (termasuk hasil filter) diamati, lalu masuk berurutan saat terlihat
  const io = new IntersectionObserver(es => es.filter(e => e.isIntersecting).forEach((e, i) => {
    e.target.style.animationDelay = i * 60 + 'ms'; e.target.classList.add('in'); io.unobserve(e.target);
  }), { rootMargin: '0px 0px -40px 0px' });
  const watch = () => main.querySelectorAll('.sr-card:not(.reveal), .tile:not(.reveal), #p-list > li:not(.reveal)').forEach(el => { el.classList.add('reveal'); io.observe(el); });
  new MutationObserver(watch).observe(main, { childList: true, subtree: true });
  ({ home, jelajah, detail, peta })[page](main);
})();
