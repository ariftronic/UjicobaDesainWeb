/* Data katalog SoloRasa.
   Alamat, jam, harga per orang, dan rating dicek di Google Maps dan artikel kuliner pada 22 Nov 2026.
   Status menu (READY / HABIS / BELUM) adalah CONTOH: di produksi diisi penjual (mis. Firestore atau Google Sheets). */
window.SOLORASA_DATA = {
  checkedAt: '22 Nov 2026',
  places: [
    {
      id: 'selat-mbak-lies', name: 'Warung Selat Mbak Lies', category: 'Makanan Berat', label: 'Legendaris', dish: 'Selat Solo',
      desc: 'Selat Solo legendaris: bistik jawa dan selat galantine berkuah manis.',
      address: 'Jl. Yudhistira No. 9, Serengan, Surakarta', area: 'Serengan',
      open: '08:00', close: '18:00', priceMin: 25000, priceMax: 50000, priceText: 'Rp 25.000–50.000',
      rating: '4,4', ratingCount: '8.488', phone: '(0271) 653332',
      img: 'assets/img/selat.webp', imgAlt: 'Sepiring selat Solo berisi daging, sayur, dan kuah cokelat',
      hero: 'assets/img/selat-warung.webp', heroAlt: 'Bagian dalam Warung Selat Mbak Lies dengan hiasan gantung',
      source: 'Google Maps; detik.com', porsi: 'Semua menu 1 porsi.',
      menu: [
        { name: 'Selat Solo (bistik jawa)', price: '± Rp 25.000', desc: 'Daging sapi, telur, sayur, kuah manis · 1 porsi', status: 'READY' },
        { name: 'Selat galantine', price: null, desc: 'Galantine daging dengan kuah selat · 1 porsi', status: 'HABIS' },
        { name: 'Sup matahari', price: null, desc: 'Sup ayam dan sayur dalam telur dadar · 1 porsi', status: 'READY' },
        { name: 'Gado-gado', price: null, desc: 'Sayur rebus dengan saus kacang · 1 porsi', status: 'BELUM' }
      ]
    },
    {
      id: 'nasi-liwet-wongso-lemu', name: 'Nasi Liwet Wongso Lemu', category: 'Makanan Berat', label: 'Favorit', dish: 'Nasi liwet',
      desc: 'Nasi liwet gurih dengan suwiran ayam, labu siam, telur, dan areh.',
      address: 'Jl. Teuku Umar, Keprabon, Banjarsari, Surakarta', area: 'Keprabon',
      open: '16:00', close: '01:00', priceMin: 17000, priceMax: 38000, priceText: 'Rp 17.000–38.000',
      rating: '3,9', ratingCount: '5.251', phone: null,
      img: 'assets/img/nasi-liwet.webp', imgAlt: 'Nasi liwet dengan suwiran ayam dan areh di atas daun pisang',
      source: 'Google Maps (lokasi, rating, jam buka); mojok.co (harga, jam tutup)', porsi: '1 porsi.',
      menu: [ { name: 'Nasi liwet suwir ayam', price: null, desc: 'Nasi gurih, suwir ayam, labu siam, telur, areh · 1 porsi', status: 'READY' } ]
    },
    {
      id: 'serabi-notosuman', name: 'Serabi Notosuman', category: 'Jajanan', label: 'Murah', dish: 'Jajanan',
      desc: 'Serabi santan legendaris sejak 1923, rasa original dan cokelat.',
      address: 'Jl. Moh. Yamin No. 28, Jayengan, Serengan, Surakarta', area: 'Serengan',
      open: '05:00', close: '17:00', priceMin: 25000, priceMax: 50000, priceText: 'Rp 25.000–50.000',
      rating: '4,5', ratingCount: '2.209', phone: null,
      img: 'assets/img/serabi.webp', imgAlt: 'Tumpukan serabi Notosuman dengan pinggiran renyah',
      source: 'Google Maps (Ny. Lidia)', porsi: 'Dijual per biji atau per kotak.',
      menu: [
        { name: 'Serabi original', price: null, desc: 'Serabi santan, dijual per biji atau per kotak', status: 'READY' },
        { name: 'Serabi cokelat', price: null, desc: 'Serabi santan dengan taburan cokelat', status: 'HABIS' }
      ]
    },
    {
      id: 'timlo-sastro', name: 'Timlo Sastro', category: 'Makanan Berat', label: 'Legendaris', dish: 'Makanan Berat',
      desc: 'Timlo kuah bening dengan sosis solo dan hati; kini di Jl. Abdul Muis No. 32A.',
      address: 'Jl. Abdul Muis No. 32A, Kepatihan Kulon, Jebres, Surakarta', area: 'Jebres',
      open: '08:00', close: '15:00', priceMin: 25000, priceMax: 50000, priceText: 'Rp 25.000–50.000',
      rating: '4,5', ratingCount: '3.298', phone: null,
      img: 'assets/img/timlo.webp', imgAlt: 'Semangkuk timlo Sastro dengan sosis solo dan telur',
      source: 'Google Maps (Timlo Sastro 1)', porsi: '1 porsi.',
      menu: [ { name: 'Timlo komplit', price: null, desc: 'Kuah bening, sosis solo, telur pindang, hati ampela · 1 porsi', status: 'BELUM' } ]
    },
    {
      id: 'sate-tambak-segaran', name: 'Sate Kambing Tambak Segaran', category: 'Makanan Berat', label: 'Favorit', dish: 'Sate',
      desc: 'Pelopor sate buntel di Solo; juga sedia gulai dan tengkleng kambing.',
      address: 'Jl. Sutan Syahrir No. 149, Setabelan, Banjarsari, Surakarta', area: 'Banjarsari',
      open: '12:00', close: '21:00', priceMin: 25000, priceMax: 125000, priceText: 'Rp 25.000–125.000',
      rating: '4,1', ratingCount: '46', phone: null,
      img: 'assets/img/sate.webp', imgAlt: 'Sate buntel kambing disajikan dengan irisan bawang dan kubis',
      source: 'Google Maps; hipwee.com', porsi: 'Semua menu 1 porsi.',
      menu: [
        { name: 'Sate buntel', price: null, desc: 'Daging kambing cincang dibalut lemak, dibakar · 1 porsi', status: 'READY' },
        { name: 'Gulai kambing', price: null, desc: 'Kuah santan berempah · 1 porsi', status: 'READY' },
        { name: 'Tengkleng', price: null, desc: 'Tulang dan iga kambing berkuah rempah · 1 porsi', status: 'HABIS' }
      ]
    },
    {
      id: 'wedangan-pak-no', name: 'Wedangan Pak No', category: 'Kopi & Kafe', label: 'Murah', dish: 'Kopi & Kafe',
      desc: 'Wedangan legendaris: wedang, kopi, dan aneka gorengan, buka sore sampai malam.',
      address: 'Jl. Jaya Wijaya, Surakarta (Wedangan Pak No 1)', area: 'Jl. Jaya Wijaya',
      open: '16:00', close: '24:00', priceMin: 1000, priceMax: 25000, priceText: 'di bawah Rp 25.000',
      rating: '4,4', ratingCount: '2.907', phone: null,
      img: 'assets/img/wedangan.webp', imgAlt: 'Aneka lauk dan gorengan di gerobak wedangan Solo',
      source: 'Google Maps', porsi: '1 gelas / 1 porsi.',
      menu: [
        { name: 'Aneka wedang', price: null, desc: 'Wedang jahe, teh, kopi, dan minuman hangat lain · 1 gelas', status: 'READY' },
        { name: 'Aneka gorengan', price: null, desc: 'Tempe, bakwan, dan gorengan lain · per biji', status: 'BELUM' }
      ]
    }
  ],
  /* Rute kuliner ½ hari. travel = menit perjalanan dari tempat sebelumnya (motor/mobil), stay = menit di tempat.
     PERKIRAAN, belum dicek: cek tiap ruas di Google Maps lalu perbarui angkanya. */
  routes: [
    { id: 'pagi', name: 'Pagi–siang: sarapan khas Solo', start: '08:00', stops: [
      { id: 'serabi-notosuman', travel: 0, stay: 30 },
      { id: 'timlo-sastro', travel: 15, stay: 45 },
      { id: 'selat-mbak-lies', travel: 15, stay: 60 } ] },
    { id: 'malam', name: 'Sore–malam: makan malam dan wedangan', start: '16:30', stops: [
      { id: 'sate-tambak-segaran', travel: 0, stay: 60 },
      { id: 'nasi-liwet-wongso-lemu', travel: 10, stay: 45 },
      { id: 'wedangan-pak-no', travel: 15, stay: 60 } ] }
  ],
  categories: ['Legendaris', 'Makanan Berat', 'Jajanan', 'Kopi & Kafe', 'Street Food', 'Murah'],
  credits: 'Foto: Wikimedia Commons — Aqilla Rahmi (CC BY 4.0), Gunawan Kartapranata, Meursault2004, Nasudi (CC BY-SA), Midori (CC BY 3.0). Peta: Google Maps.'
};
