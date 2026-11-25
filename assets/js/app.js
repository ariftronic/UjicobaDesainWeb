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
    alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    searchx: '<path d="m13.5 8.5-5 5"/><path d="m8.5 8.5 5 5"/><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    nav: '<polygon points="3 11 22 2 13 21 11 13 3 11"/>',
    download: '<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',
    copy: '<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    phone: '<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    utensils: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
    wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
    star: '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',
    refresh: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    tag: '<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>'
  };
  /* Ikon merek Simple Icons (CC0), diisi warna, bukan garis */
  const B = {
    youtube: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
    x: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z',
    tiktok: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
    instagram: 'M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077',
    facebook: 'M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z',
    threads: 'M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z'
  };
  const brandIcon = n => `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${B[n]}"/></svg>`;
  const icon = (n, s = 20) => `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;
  const STATUS = { READY: 'READY', HABIS: 'HABIS', BELUM: 'BELUM TERKONFIRMASI' };
  const hhmm = s => s.replace(':', '.');
  const hours = p => hhmm(p.open) + ' - ' + hhmm(p.close);

  /* ---------- kerangka bersama ---------- */
  const navItems = [['index.html', 'Beranda', 'home', 'house'], ['jelajah.html', 'Jelajah', 'jelajah', 'compass'], ['peta.html', 'Peta', 'peta', 'map']];
  const current = page === 'detail' ? 'jelajah' : page;
  const logo = (dark) => `<span class="sr-logo${dark ? ' dark' : ''}" aria-hidden="true">SR</span>`;
  const wordmark = '<span class="sr-wordmark"><span class="a">Solo</span><span class="b">Rasa</span></span>';

  const failed = !D || !SR || params.get('gagal') === '1'; // ?gagal=1 mensimulasikan data gagal dimuat (untuk uji tugas T7)
  // di Jelajah panel filternya ada di halaman ini: buka langsung agar filter yang aktif tidak hilang
  const filterLink = page === 'jelajah' && !failed ? 'href="#filter" data-bs-toggle="offcanvas" role="button" aria-controls="filter"' : 'href="jelajah.html#filter"';

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
            <input class="form-control" id="hdr-q" name="q" type="search" placeholder="Cari makanan atau area" style="width:264px">
          </form>
          <a class="btn btn-sr ms-auto ms-md-0" ${filterLink}>${icon('filter', 18)}<span>Filter</span></a>
        </div>
      </header>`);
    document.body.insertAdjacentHTML('beforeend', `
      <footer class="sr-footer mt-5">
        <div class="container-xl py-5">
          <div class="row g-4">
            <div class="col-md-6">
              <div class="d-flex align-items-center gap-2 mb-2">${logo(true)}<span class="sr-display fs-4 text-white">SoloRasa</span></div>
              <p class="mb-0">Jelajahi rasa, temukan cerita di setiap sudut Solo.</p>
            </div>
            <nav class="col-6 col-md-3" aria-label="Navigasi footer"><h2 class="h6 text-white">Navigasi</h2>
              <ul class="list-unstyled mb-0"><li><a href="jelajah.html">Jelajah kuliner</a></li><li><a href="peta.html">Peta</a></li><li><a ${filterLink}>Filter</a></li></ul></nav>
            <div class="col-6 col-md-3"><h2 class="h6 text-white">Bantuan</h2>
              <p class="small mb-0">Data masih contoh. Konfirmasi menu dan harga langsung ke penjual sebelum memesan.</p></div>
          </div>
          <hr class="border-light opacity-25">
          <div class="d-md-flex justify-content-between gap-4">
            <p class="small mb-2">© 2026 <b>SoloRasa</b></p>
            <p class="small mb-2">Karya <b>Kelompok 1</b> · Pendidikan Teknik Informatika dan Komputer<br class="d-none d-lg-inline"> FKIP, Universitas Sebelas Maret</p>
          </div>
          <details class="credit"><summary>Kredit foto dan peta</summary><p class="mb-0">${esc(D ? D.credits : '')}</p></details>
          ${D ? `<ul class="sr-social list-unstyled d-flex flex-wrap justify-content-center gap-2 mt-4 mb-0" aria-label="Media sosial">${D.social.map(x => `<li><a href="${x.url}" target="_blank" rel="noopener" aria-label="${x.name}" title="${x.name}">${brandIcon(x.id)}</a></li>`).join('')}</ul>` : ''}
        </div>
      </footer>
      <nav class="sr-bottom-nav d-flex d-md-none" aria-label="Navigasi bawah">
        ${navItems.map(([h, l, k, ic]) => `<a href="${h}"${k === current ? ' aria-current="page"' : ''}>${icon(ic, 22)}<span>${l}</span></a>`).join('')}
      </nav>`);
  }

  /* ---------- komponen ---------- */
  const openTag = open => `<span class="status ${open ? 'status-buka' : 'status-tutup'}">${open ? 'Buka' : 'Tutup'}</span>`;
  function card(p) {
    return `<div class="col"><article class="sr-card position-relative">
      <div class="position-relative"><img class="photo" src="${p.img}" alt="${esc(p.imgAlt)}" loading="lazy" width="640" height="400"><span class="tag">${esc(p.label)}</span>${p.illus ? '<span class="illus">Foto ilustrasi</span>' : ''}</div>
      <div class="body">
        <h3><a class="stretched-link text-reset text-decoration-none" href="detail.html?id=${p.id}">${esc(p.name)}</a></h3>
        <div class="small text-muted-sr">${esc(p.dish)}</div>
        <div class="small text-muted-sr d-flex align-items-center gap-1"><span class="rating">${icon('star', 15)} ${p.rating}</span> dari ${p.ratingCount} ulasan Google</div>
        <div class="small text-muted-sr d-flex align-items-center gap-1">${icon('wallet', 15)} ${esc(p.priceText)} / orang</div>
        <div class="small text-muted-sr d-flex align-items-center gap-1">${icon('pin', 15)} ${esc(p.area)}, Surakarta</div>
        <div class="small text-muted-sr d-flex align-items-center gap-1">${icon('clock', 15)} ${hours(p)} ${openTag(SR.isOpenAt(p.open, p.close, SR.nowWib()))}</div>
        <div class="cta"><span class="btn btn-sr-outline w-100">${icon('utensils', 18)} Lihat menu dan harga</span></div>
      </div></article></div>`;
  }
  const grid = list => `<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">${list.map(card).join('')}</div>`;
  function errorState(title, body) {
    return `<section class="state" aria-live="polite"><div class="ring">${icon('alert', 32)}</div><h1 class="h2">${esc(title)}</h1>
      <p class="text-muted-sr">${esc(body)}</p><div class="d-grid gap-2 col-sm-8 mx-auto">
      <button class="btn btn-sr" type="button" onclick="location.reload()">${icon('refresh', 18)} Coba lagi</button><a class="btn btn-sr-outline" href="index.html">${icon('house', 18)} Kembali ke beranda</a></div></section>`;
  }

  /* ---------- halaman ---------- */
  function home(main) {
    const now = SR.nowWib(), openNow = D.places.filter(p => SR.isOpenAt(p.open, p.close, now));
    // kartu cepat; yang tanpa tempat tidak ditampilkan. Foto diutamakan yang belum dipakai kartu lain
    const used = new Set();
    const picks = [['kategori=Legend', 'Kuliner Legend', 'Rasa legendaris khas Solo', D.places.filter(p => SR.matchesCategory(p, 'Legend'))],
      ['kategori=Murah', 'Murah Meriah', 'Mulai di bawah Rp 20.000', D.places.filter(p => SR.matchesCategory(p, 'Murah'))],
      ['buka=1', 'Buka Sekarang', openNow.length + ' tempat sedang buka', openNow]]
      .filter(([, , , ps]) => ps.length).map(([href, t, d, ps]) => { const p = ps.find(x => !used.has(x.img)) || ps[0]; used.add(p.img); return [href, t, d, p.img]; });
    main.innerHTML = `
      <section class="sr-hero">
        <img class="hero-bg" src="assets/img/hero-pasar-gede.webp" alt="" width="1280" height="720" fetchpriority="high">
        <svg class="hero-batik" aria-hidden="true" focusable="false">
          <defs><pattern id="batik-parang" patternUnits="userSpaceOnUse" width="220" height="220"><image href="assets/img/batik-parang.webp" width="220" height="220"/></pattern></defs>
          <path fill="url(#batik-parang)" d="M0 0 L406 0 C406 31.2 474 31.2 474 62.5 C474 93.8 406 93.8 406 125.0 C406 156.2 474 156.2 474 187.5 C474 218.8 406 218.8 406 250.0 C406 281.2 474 281.2 474 312.5 C474 343.8 406 343.8 406 375.0 C406 406.2 474 406.2 474 437.5 C474 468.8 406 468.8 406 500.0 L0 500 Z"><animate attributeName="d" dur="5s" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1" values="M0 0 L406 0 C406 31.2 474 31.2 474 62.5 C474 93.8 406 93.8 406 125.0 C406 156.2 474 156.2 474 187.5 C474 218.8 406 218.8 406 250.0 C406 281.2 474 281.2 474 312.5 C474 343.8 406 343.8 406 375.0 C406 406.2 474 406.2 474 437.5 C474 468.8 406 468.8 406 500.0 L0 500 Z;M0 0 L474 0 C474 31.2 406 31.2 406 62.5 C406 93.8 474 93.8 474 125.0 C474 156.2 406 156.2 406 187.5 C406 218.8 474 218.8 474 250.0 C474 281.2 406 281.2 406 312.5 C406 343.8 474 343.8 474 375.0 C474 406.2 406 406.2 406 437.5 C406 468.8 474 468.8 474 500.0 L0 500 Z;M0 0 L406 0 C406 31.2 474 31.2 474 62.5 C474 93.8 406 93.8 406 125.0 C406 156.2 474 156.2 474 187.5 C474 218.8 406 218.8 406 250.0 C406 281.2 474 281.2 474 312.5 C474 343.8 406 343.8 406 375.0 C406 406.2 474 406.2 474 437.5 C474 468.8 406 468.8 406 500.0 L0 500 Z"/></path>
        </svg>
        <div class="container-xl position-relative py-5"><div class="row"><div class="col-lg-6 py-lg-5">
          <h1>Jelajahi Kuliner Solo Tanpa Ribet</h1>
          <p class="fs-5">Cari makanan, harga, porsi, stok, dan informasi penting dalam satu tempat.</p>
          <form class="d-flex flex-column flex-sm-row gap-2 mt-3" role="search" action="jelajah.html">
            <label class="visually-hidden" for="home-q">Cari makanan, tempat, atau area</label>
            <input class="form-control" id="home-q" name="q" type="search" placeholder="Cari makanan, tempat, atau area">
            <button class="btn btn-sr px-4 text-nowrap" type="submit">${icon('search', 18)} Cari kuliner</button>
          </form>
        </div>
        </div></div></div></section>
      <section class="container-xl py-5" aria-labelledby="h-kat"><h2 id="h-kat" class="mb-1">Mau makan apa?</h2>
        <p class="text-muted-sr mb-3">Pilih makanan khas Solo yang kamu cari.</p>
        <ul class="cats list-unstyled">${D.places.filter((p, i) => D.places.findIndex(x => x.dish === p.dish) === i).map(p => `<li><a href="jelajah.html?q=${encodeURIComponent(p.dish)}"><img src="${p.img}" alt="" loading="lazy" width="128" height="128"><span>${esc(p.dish)}</span></a></li>`).join('')}</ul>
        <ul class="picks list-unstyled" aria-label="Pilihan cepat">${picks.map(([href, t, d, img]) => `<li><a href="jelajah.html?${href}"><img src="${img}" alt="" loading="lazy" width="104" height="104"><b>${t}</b><span class="small text-muted-sr">${d}</span></a></li>`).join('')}</ul></section>
      <section class="py-5" aria-labelledby="h-pil"><div class="container-xl">
        <div class="d-flex flex-wrap justify-content-between align-items-end gap-2 mb-4">
          <div><h2 id="h-pil" class="mb-1">Pilihan Kuliner Solo</h2><p class="text-muted-sr mb-0">Legend, murah, dan favorit wisatawan.</p></div>
          <div class="d-flex align-items-center gap-2"><a class="btn btn-sr-outline" href="jelajah.html">Lihat semua kuliner ${icon('arrow', 18)}</a>
            <button class="sr-arrow prev" type="button" data-scroll="-1" aria-label="Geser ke kuliner sebelumnya">${icon('arrow', 20)}</button>
            <button class="sr-arrow" type="button" data-scroll="1" aria-label="Geser ke kuliner berikutnya">${icon('arrow', 20)}</button></div></div>
        <div class="sr-carousel">${grid(D.places)}</div></div></section>
      <section class="container-xl py-5" aria-labelledby="h-about"><div class="row g-4 align-items-center">
        <div class="col-lg-5"><h2 id="h-about" class="mb-2">Tentang SoloRasa</h2>
          <p class="text-muted-sr mb-0">SoloRasa adalah katalog kuliner Kota Solo untuk wisatawan dan warga yang ingin makan enak tanpa bingung. Semua info penting dikumpulkan di satu tempat, jadi kamu bisa memilih sebelum berangkat.</p></div>
        <div class="col-lg-7"><ul class="list-unstyled row row-cols-1 row-cols-sm-3 g-3 mb-0">
          ${[['utensils', 'Menu & penjelasan', 'Daftar menu tiap tempat lengkap dengan cerita dan isi hidangannya.'],
             ['wallet', 'Harga & stok', 'Kisaran harga per orang dan status menu: READY, HABIS, atau belum terkonfirmasi.'],
             ['map', 'Lokasi & rute', 'Alamat, jam buka, petunjuk arah, dan rute kuliner.']]
            .map(([ic, t, d]) => `<li class="col"><div class="panel h-100"><span class="about-ic">${icon(ic, 22)}</span><h3 class="h6 fw-bold mt-3 mb-1" style="font-family:var(--sr-body)">${t}</h3><p class="small text-muted-sr mb-0">${d}</p></div></li>`).join('')}
        </ul></div></div></section>
      <section class="container-xl py-5" aria-labelledby="h-peta"><h2 id="h-peta" class="mb-1">Temukan lokasi tempat makan</h2>
        <p class="text-muted-sr">Lihat rekomendasi tempat dan petunjuk arah dari lokasimu.</p>
        <iframe class="map-img mb-3" src="https://maps.google.com/maps?q=Surakarta&z=14&output=embed" title="Peta Kota Solo" loading="lazy" referrerpolicy="no-referrer-when-downgrade" style="aspect-ratio:16/9"></iframe>
        <a class="btn btn-sr" href="peta.html">${icon('map', 18)} Buka peta kuliner</a></section>`;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) main.querySelectorAll('.hero-batik animate').forEach(a => a.remove()); // SMIL tidak ikut aturan CSS
    const row = main.querySelector('.sr-carousel > .row');
    main.querySelectorAll('[data-scroll]').forEach(b => b.addEventListener('click', () =>
      row.scrollBy({ left: +b.dataset.scroll * row.clientWidth * .8, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })));
    // aria-disabled, bukan disabled: fokus keyboard tidak hilang saat mencapai ujung
    const sync = () => main.querySelectorAll('[data-scroll]').forEach(b =>
      b.setAttribute('aria-disabled', b.dataset.scroll < 0 ? row.scrollLeft < 2 : row.scrollLeft + row.clientWidth > row.scrollWidth - 2));
    row.addEventListener('scroll', sync); addEventListener('resize', sync); sync();
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
      ['Legend', () => ({ ...f, category: 'Legend' }), f.category === 'Legend'], ['Murah', () => ({ ...f, category: 'Murah' }), f.category === 'Murah'],
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
          <button class="btn btn-sr-outline text-nowrap" type="button" data-bs-toggle="offcanvas" data-bs-target="#filter" aria-controls="filter" aria-label="Filter kuliner">${icon('filter', 18)}<span class="d-none d-sm-inline">Filter kuliner</span></button>
        </form>
        <div class="d-flex flex-wrap gap-2 mb-3" aria-label="Pilihan cepat">${quick.map(([l, , on], i) => `<button type="button" class="chip${on ? ' active' : ''}" data-quick="${i}" aria-pressed="${on}">${l}</button>`).join('')}</div>
        ${filtered ? `<div class="d-flex flex-wrap gap-2 mb-3" aria-label="Filter aktif">${chips.map(c => `<button type="button" class="chip active" data-remove="${c.key}" aria-label="Hapus filter ${esc(c.label)}">${esc(c.label)} ${icon('x', 16)}</button>`).join('')}</div>` : ''}
        <h2 class="h3 mb-1">Temukan menu pilihanmu</h2>
        <p class="small-note" aria-live="polite">${list.length} kuliner ditemukan · contoh data; konfirmasi harga dan ketersediaan ke penjual.</p>
        ${list.length ? grid(list) : `<section class="state panel"><div class="ring">${icon('searchx', 32)}</div><h2>Belum ada hasil yang cocok</h2>
          <p class="text-muted-sr">Coba kurangi filter atau ubah kata kunci pencarian.</p>
          <div class="d-grid gap-2 col-sm-8 mx-auto"><button class="btn btn-sr" type="button" data-bs-toggle="offcanvas" data-bs-target="#filter">${icon('filter', 18)} Ubah filter</button>
          <a class="btn btn-sr-outline" href="jelajah.html">${icon('x', 18)} Hapus filter dan lihat semua</a></div></section>`}
      </div>
      <div class="offcanvas offcanvas-end" tabindex="-1" id="filter" aria-labelledby="filter-title">
        <div class="offcanvas-header"><h2 class="offcanvas-title h3" id="filter-title">Filter Kuliner</h2><button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Tutup"></button></div>
        <form class="offcanvas-body d-flex flex-column gap-4" id="filter-form" novalidate>
          <fieldset><legend class="h6 fw-bold">Kategori</legend><div class="d-flex flex-wrap gap-2">
            ${cats.map((c, i) => `<input class="btn-check" type="radio" name="kategori" id="kat${i}" value="${esc(c)}"${c === f.category ? ' checked' : ''}><label class="chip" for="kat${i}">${esc(c)}</label>`).join('')}</div>
            <div class="small-note mt-2">Murah: harga mulai di bawah Rp 20.000 per orang.</div></fieldset>
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
          <div class="d-flex gap-2 mt-auto"><a class="btn btn-sr-outline flex-fill" href="jelajah.html">${icon('refresh', 18)} Reset filter</a><button class="btn btn-sr flex-fill" type="submit" id="apply">${icon('check', 18)} Terapkan filter</button></div>
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

  const menuList = menu => `<ul class="list-unstyled d-grid gap-2 mt-3">${menu.map(m => `<li class="panel py-3${m.img ? ' has-img' : ''}">${m.img ? `<img class="menu-img" src="${m.img}" alt="" loading="lazy" width="88" height="88">` : ''}<div class="menu-row"><b>${esc(m.name)}</b><span class="price">${esc(m.price || 'Tanya penjual')}</span></div><div class="small text-muted-sr"><span class="status status-${m.status} me-1">${STATUS[m.status]}</span> ${esc(m.desc)}</div>
      ${m.info ? `<details class="menu-info"><summary>Penjelasan menu</summary><p>${esc(m.info)}</p></details>` : ''}</li>`).join('')}</ul>`;
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
            <p class="mb-1 text-muted-sr">${esc(p.dish)} · ${esc(p.label)} · <span class="rating">${icon('star', 14)} ${p.rating}</span> (<a href="${SR.reviewUrl(p)}" target="_blank" rel="noopener">${p.ratingCount} ulasan Google</a>)</p>
            <p class="small text-muted-sr">Jam buka ${hours(p)} ${openTag(open)}</p>
            <div class="d-flex flex-wrap gap-2 d-lg-none"><a class="btn btn-sr flex-fill" href="${SR.dirUrl(p)}" target="_blank" rel="noopener">${icon('nav', 18)} Petunjuk arah</a>
              ${p.phone ? `<a class="btn btn-sr-outline flex-fill" href="tel:${p.phone.replace(/\D/g, '')}">${icon('phone', 18)} Telepon</a>` : ''}</div>
            <img class="w-100 rounded-4 my-3" style="aspect-ratio:16/9;object-fit:cover;object-position:center 25%;height:auto;max-height:45vh" src="${p.hero || p.img}" alt="${esc(p.heroAlt || p.imgAlt)}" width="1280" height="720">
            ${p.illus ? '<p class="small-note">Foto ilustrasi, bukan foto dari tempat ini.</p>' : ''}
            <h2 class="mt-4">Menu dan harga</h2>
            <p class="text-muted-sr mb-1">${esc(p.desc)}</p>
            <p class="small-note mb-0">Status READY/HABIS hanya contoh (9 Nov 2026), bukan stok sebenarnya. Porsi saji (contoh): ${esc(p.porsi)}</p>
            ${p.menu[0].group ? [...new Set(p.menu.map(m => m.group))].map((g, i) => { const ms = p.menu.filter(m => m.group === g);
              return `<details class="menu-group"${i ? '' : ' open'}><summary>${esc(g)} (${ms.length} menu)</summary>${menuList(ms)}</details>`; }).join('') : menuList(p.menu)}
            <p class="small-note mt-3">Harga menu tanpa sumber ditulis “Tanya penjual”. Harga per orang ${esc(p.priceText)} dari ${esc(p.source)}.</p>
            ${D.places.some(x => x !== p && x.category === p.category) ? `<a class="btn btn-sr-outline w-100 my-3" href="jelajah.html?kategori=${encodeURIComponent(p.category)}">${icon('search', 18)} Cari kuliner serupa</a>` : ''}
            <section class="panel mb-3"><h2 class="h4 h-ic">${icon('tag', 22)} Promo</h2><p class="mb-0 text-muted-sr">Belum ada promo terkonfirmasi. Hubungi penjual untuk info promo terbaru.</p></section>
            <section class="panel mb-3"><h2 class="h4 h-ic">${icon('alert', 22)} Informasi alergen</h2><p class="mb-0 text-muted-sr">Informasi alergen belum terkonfirmasi. Data kosong bukan berarti bebas alergen; tanyakan ke penjual sebelum memesan.</p></section>
            <section class="panel" style="border-left:4px solid var(--sr-primary)"><h2 class="h4 h-ic">${icon('star', 22)} Poin, aturan, dan ulasan</h2><p class="mb-1">Rating ${p.rating} dari ${p.ratingCount} ulasan Google Maps (dicek ${esc(D.checkedAt)}).</p><a class="btn btn-sr-outline mt-2" href="${SR.reviewUrl(p)}" target="_blank" rel="noopener">${icon('star', 18)} Baca ulasan di Google Maps</a></section>
          </div>
          <aside class="col-lg-4"><div class="panel position-sticky" style="top:88px">
            <h2 class="h4 h-ic">${icon('info', 22)} Informasi tempat</h2>
            <dl class="mb-3"><dt class="h-ic">${icon('pin', 16)} Alamat</dt><dd class="text-muted-sr">${esc(p.address)}</dd><dt class="h-ic">${icon('clock', 16)} Jam buka</dt><dd class="text-muted-sr">Setiap hari, ${hours(p)}</dd>
              ${p.phone ? `<dt class="h-ic">${icon('phone', 16)} Telepon</dt><dd class="text-muted-sr"><a href="tel:${p.phone.replace(/\D/g, '')}">${esc(p.phone)}</a> <span class="small">(dari Google Maps)</span></dd>` : ''}</dl>
            <div class="d-grid gap-2"><a class="btn btn-sr" href="${SR.dirUrl(p)}" target="_blank" rel="noopener">${icon('nav', 18)} Petunjuk arah</a>
              <a class="btn btn-sr-outline" href="${SR.searchUrl(p)}" target="_blank" rel="noopener">${icon('pin', 18)} Lihat di Google Maps</a></div>
            <iframe class="map-img mt-3" src="${SR.embedUrl(p)}" title="Peta lokasi ${esc(p.name)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <p class="small-note mt-2 mb-0">Peta dan rute dari Google Maps.</p></div></aside>
        </div></div>`;
  }

  function peta(main) {
    const state = { area: '', openNow: false, pos: null };
    const areas = ['Semua', ...new Set(D.places.map(p => p.area))];
    main.innerHTML = `
      <div class="container-xl pt-4">
        <nav aria-label="breadcrumb"><ol class="breadcrumb small"><li class="breadcrumb-item"><a href="index.html">Beranda</a></li><li class="breadcrumb-item active" aria-current="page">Peta</li></ol></nav>
        <h1>Peta Kuliner Solo</h1>
        <div class="row g-4 mt-1">
          <div class="col-lg-7">
            <div class="panel mb-3"><h2 class="h5 h-ic">${icon('nav', 20)} Rute dari lokasimu</h2><p class="small text-muted-sr mb-0">Tombol “Petunjuk arah” membuka Google Maps dan menghitung rute dari lokasimu sekarang. Tekan “Lihat di peta” untuk menampilkan tempat di peta.</p></div>
            <div class="d-flex flex-wrap gap-2 mb-3 align-items-end">
              <div><label class="form-label small fw-bold" for="p-area">Area</label><input class="form-control" id="p-area" type="search" list="area-list" placeholder="Semua, atau ketik sendiri" autocomplete="off">
                <datalist id="area-list">${areas.map(a => `<option value="${esc(a)}">`).join('')}</datalist></div>
              <div class="form-check form-switch d-flex align-items-center gap-2 ps-0" style="min-height:48px"><input class="form-check-input m-0" type="checkbox" role="switch" id="p-open"><label class="form-check-label" for="p-open">Buka sekarang</label></div>
              <button class="btn btn-sr-outline" type="button" id="p-near" aria-pressed="false" style="min-height:48px">${icon('pin', 18)} Kuliner terdekat</button>
            </div>
            <p class="small-note" id="near-status" role="status"></p>
            <iframe class="map-img" id="p-map" title="Peta Google Maps" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <div class="map-img d-none" id="near-map" role="region" aria-label="Peta kuliner terdekat"></div>
          </div>
          <div class="col-lg-5">
            <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2"><h2 class="h3 mb-0">Rekomendasi</h2>
              <div class="d-flex gap-2"><button class="btn btn-sr-outline btn-sm" type="button" id="dl">${icon('download', 16)} Unduh CSV</button><button class="btn btn-sr-outline btn-sm" type="button" id="cp">${icon('copy', 16)} Salin ke Sheets</button></div></div>
            <p class="small-note" id="p-status" aria-live="polite"></p>
            <ol class="list-unstyled d-grid gap-3" id="p-list"></ol>
          </div></div>
        <section class="mt-5" aria-labelledby="h-rute"><h2 id="h-rute" class="mb-1">Rute Kuliner di Solo</h2>
          <p class="text-muted-sr">Dua rute sesuai jam buka. Waktu perjalanan adalah perkiraan; cek ulang di Google Maps sebelum berangkat.</p>
          <form class="panel mb-4" id="own-route"><h3 class="h5 mb-3 h-ic">${icon('map', 20)} Buat rute sendiri</h3>
            <datalist id="place-list">${D.places.map(p => `<option value="${esc(p.name)}">`).join('')}</datalist>
            <div class="row g-3 align-items-end">
              <div class="col-md"><label class="form-label small fw-bold" for="r-from">Mulai dari</label>
                <input class="form-control" id="r-from" list="place-list" placeholder="Kosongkan = lokasimu sekarang" autocomplete="off"></div>
              <div class="col-md"><label class="form-label small fw-bold" for="r-to">Sampai di</label>
                <input class="form-control" id="r-to" list="place-list" placeholder="Pilih tempat atau ketik alamat" autocomplete="off" required pattern=".*[^ ].*" title="Isi tujuan"></div>
              <div class="col-md-auto"><button class="btn btn-sr w-100" type="submit">${icon('nav', 18)} Lihat rute</button></div>
            </div>
            <p class="small-note mt-2 mb-0">Pilih nama tempat dari daftar, atau ketik alamat lain seperti stasiun atau hotel. Peta rute tampil di bawah.</p>
            <p class="small mt-3 mb-0" id="r-status" role="status"></p><div id="r-map"></div></form>
          <div class="row g-4">${D.routes.map(r => { const plan = SR.planRoute(r, D.places), end = plan[plan.length - 1].leave; return `
            <div class="col-lg-6"><article class="panel h-100 d-flex flex-column">
              <h3 class="h4 mb-1">${esc(r.name)}</h3>
              <p class="small text-muted-sr">${SR.fmtMin(plan[0].arrive)} - ${SR.fmtMin(end)} · ±${Math.round((end - plan[0].arrive) / 6) / 10} jam · ${plan.length} tempat</p>
              <ol class="list-unstyled d-grid gap-2 mb-3">${plan.map(st => `${st.travel ? `<li class="small text-muted-sr ps-5">${icon('nav', 14)} ±${st.travel} menit perjalanan</li>` : ''}
                <li class="d-flex gap-3 align-items-start"><span class="sr-logo flex-shrink-0" aria-hidden="true">${st.n}</span>
                  <div><b>${SR.fmtMin(st.arrive)} - ${SR.fmtMin(st.leave)}</b> · <a href="detail.html?id=${st.p.id}">${esc(st.p.name)}</a>
                    <div class="small text-muted-sr">${esc(st.p.dish)} · ${esc(st.p.area)} · buka ${hours(st.p)}${st.openOk ? '' : ' · <b class="text-danger">tutup saat jam ini</b>'}</div></div></li>`).join('')}</ol>
              <div class="d-flex flex-wrap gap-2 mt-auto"><a class="btn btn-sr btn-sm" href="${SR.routeUrl(plan)}" target="_blank" rel="noopener">${icon('nav', 16)} Buka rute di Google Maps</a>
                <button class="btn btn-sr-outline btn-sm" type="button" data-route-csv="${r.id}">${icon('download', 16)} Unduh CSV (Excel)</button></div>
            </article></div>`; }).join('')}</div></section></div>`;
    const locate = (ok, fail) => navigator.geolocation
      ? navigator.geolocation.getCurrentPosition(g => ok([g.coords.latitude, g.coords.longitude]), fail, { timeout: 10000, enableHighAccuracy: true }) : fail();
    const showRoute = (from, to, msg) => {
      $('#r-status').textContent = msg;
      $('#r-map').innerHTML = `<iframe class="map-img mt-2" style="aspect-ratio:16/9" src="${SR.routeEmbedUrl(from, to, D.places)}" title="Peta rute ke ${esc(to)}" referrerpolicy="no-referrer-when-downgrade"></iframe>
        <a class="btn btn-sr-outline mt-3" href="${SR.customRouteUrl(from, to, D.places)}" target="_blank" rel="noopener">${icon('nav', 18)} Buka di Google Maps</a>`;
      $('#r-map').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
    };
    let routeRun = 0; // abaikan jawaban lokasi yang terlambat bila rute lain sudah diminta
    $('#own-route').addEventListener('submit', e => { e.preventDefault();
      const from = $('#r-from').value.trim(), to = $('#r-to').value.trim(), run = ++routeRun;
      if (from) return showRoute(from, to, `Rute dari ${from} ke ${to}`);
      const noLoc = () => run === routeRun && showRoute('', to, 'Lokasimu tidak bisa dibaca, jadi hanya tujuan yang tampil. Isi “Mulai dari” untuk melihat rutenya.');
      $('#r-status').textContent = 'Mencari lokasimu… izinkan akses lokasi di browser.';
      locate(pos => run === routeRun && showRoute(pos.join(','), to, `Rute dari lokasimu ke ${to}`), noLoc);
    });
    const current = () => {
      const list = SR.recommend(D.places, SR.nowWib()).filter(p => SR.matchesQuery(p, state.area) && (!state.openNow || p.isOpen));
      return state.pos ? SR.nearest(list, state.pos) : list;
    };
    // peta Leaflet hanya untuk mode terdekat: embed Google tanpa API key tidak bisa menampilkan banyak pin
    let lmap, pins, pinOf = {};
    const showNear = list => {
      if (!lmap) {
        lmap = L.map('near-map');
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(lmap);
        pins = L.layerGroup().addTo(lmap);
      }
      pins.clearLayers(); pinOf = {};
      L.circleMarker(state.pos, { radius: 9, color: '#fff', weight: 3, fillColor: '#1A73E8', fillOpacity: 1 }).bindTooltip('Lokasimu', { permanent: true, direction: 'top', offset: [0, -8] }).addTo(pins);
      list.forEach(p => { pinOf[p.id] = L.marker(p.pos, { alt: p.name, title: p.name }).addTo(pins)
        .bindPopup(`<b>${esc(p.name)}</b><br>${esc(p.dish)} · ${SR.fmtKm(p.km)}<br><a href="detail.html?id=${p.id}">Lihat menu dan harga</a>`); });
      lmap.invalidateSize();
      lmap.fitBounds([state.pos, ...list.slice(0, 3).map(p => p.pos)], { padding: [45, 45], maxZoom: 16, animate: false });
      if (list[0]) pinOf[list[0].id].openPopup();
    };
    const showMap = p => { const m = $('#p-map'), u = SR.embedUrl(p); if (m.src !== u) m.src = u; m.title = 'Peta lokasi ' + p.name; };
    const render = () => {
      const list = current();
      $('#p-status').textContent = list.length ? list.length + (state.pos ? ' tempat · urut: terdekat dari lokasimu (garis lurus)' : ' tempat · urut: sedang buka, lalu termurah') : 'Tidak ada tempat yang cocok. Ubah area atau matikan "Buka sekarang".';
      $('#p-list').innerHTML = list.map(p => `<li class="panel d-flex gap-3">
        <img src="${p.img}" alt="" width="96" height="96" style="width:96px;height:96px;object-fit:cover;border-radius:12px" loading="lazy">
        <div class="flex-fill" style="min-width:0"><div class="d-flex justify-content-between gap-2"><h3 class="h5 mb-1">${esc(p.name)}</h3><span class="rating small">${icon('star', 14)} ${p.rating}</span></div>
          <div class="small text-muted-sr">${esc(p.address)}</div>
          <div class="small">${openTag(p.isOpen)} <span class="text-muted-sr">${hours(p)} · ${esc(p.priceText)} · ${p.ratingCount} ulasan Google${p.km == null ? '' : ` · <b>${SR.fmtKm(p.km)}</b>`}</span></div>
          <div class="d-flex flex-wrap gap-2 mt-2"><a class="btn btn-sr btn-sm" href="${SR.dirUrl(p)}" target="_blank" rel="noopener">${icon('nav', 16)} Petunjuk arah</a><button class="btn btn-sr-outline btn-sm" type="button" data-map="${p.id}">${icon('map', 16)} Lihat di peta</button><a class="btn btn-sr-outline btn-sm" href="detail.html?id=${p.id}">${icon('utensils', 16)} Lihat menu dan harga</a></div></div></li>`).join('');
      const near = state.pos && window.L; // Leaflet gagal dimuat: tetap pakai peta Google
      $('#p-map').classList.toggle('d-none', !!near); $('#near-map').classList.toggle('d-none', !near);
      if (near) showNear(list); else if (list[0]) showMap(list[0]);
    };
    $('#p-list').addEventListener('click', e => { const b = e.target.closest('[data-map]'); if (!b) return;
      const pin = pinOf[b.dataset.map], near = state.pos && pin;
      if (near) { lmap.setView(pin.getLatLng(), 16, { animate: false }); pin.openPopup(); } else showMap(D.places.find(p => p.id === b.dataset.map));
      const m = $(near ? '#near-map' : '#p-map'), r = m.getBoundingClientRect(); // HP: peta ada di atas daftar, gulir ke sana agar perubahan terlihat
      if (r.bottom < 0 || r.top > innerHeight) m.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' }); });
    let typing; // tunggu jeda mengetik agar daftar dan peta tidak dimuat ulang tiap huruf
    $('#p-area').addEventListener('input', e => { clearTimeout(typing); typing = setTimeout(() => {
      const v = e.target.value.trim(); state.area = v.toLowerCase() === 'semua' ? '' : v; render(); }, 250); });
    const nearMode = (pos, msg) => { state.pos = pos; $('#p-near').setAttribute('aria-pressed', !!pos); $('#p-near').classList.toggle('btn-sr', !!pos); $('#p-near').classList.toggle('btn-sr-outline', !pos);
      $('#near-status').textContent = msg; render(); };
    $('#p-near').addEventListener('click', () => {
      if (state.pos) return nearMode(null, '');
      $('#near-status').textContent = 'Mencari lokasimu… izinkan akses lokasi di browser.';
      locate(pos => nearMode(pos, 'Menampilkan kuliner terdekat dari lokasimu. Tekan “Kuliner terdekat” lagi untuk kembali.'),
        () => { $('#near-status').textContent = 'Lokasimu tidak bisa dibaca. Izinkan akses lokasi di browser, lalu coba lagi.'; });
    });
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
  // animasi masuk header hanya sekali per kunjungan; pindah menu memakai transisi halaman (style.css)
  try { if (!sessionStorage.getItem('sr-masuk')) { document.documentElement.classList.add('sr-first'); sessionStorage.setItem('sr-masuk', '1'); } } catch (e) { /* mode privat: lewati animasi */ }
  shell();
  const main = document.getElementById('main');
  if (failed) { main.innerHTML = errorState('Informasi belum dapat dimuat', 'Koneksi terputus atau data belum tersedia. Periksa internetmu lalu coba lagi.'); return; }
  // animasi muncul: elemen baru (termasuk hasil filter) diamati, lalu masuk berurutan saat terlihat
  const io = new IntersectionObserver(es => es.filter(e => e.isIntersecting).forEach((e, i) => {
    e.target.style.animationDelay = i * 60 + 'ms'; e.target.classList.add('in'); io.unobserve(e.target);
  }), { rootMargin: '0px 0px -40px 0px' });
  const watch = () => main.querySelectorAll('.sr-card:not(.reveal), .cats a:not(.reveal), .picks a:not(.reveal), #p-list > li:not(.reveal)').forEach(el => { el.classList.add('reveal'); io.observe(el); });
  new MutationObserver(watch).observe(main, { childList: true, subtree: true });
  ({ home, jelajah, detail, peta })[page](main);
})();
