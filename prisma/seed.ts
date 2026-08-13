/// <reference types="node" />
declare const process: any;
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning database...');
  await prisma.article.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.kajian.deleteMany({});
  await prisma.media.deleteMany({});

  console.log('Seeding users...');
  const adminUser = await prisma.user.create({
    data: {
      name: 'Redaksi Tauheed News',
      email: 'redaksi@tauheednews.com',
      password: 'hashed_password_123',
      role: 'ADMIN',
    },
  });

  const editorUser = await prisma.user.create({
    data: {
      name: 'Ustadz Ahmad Al-Farisi',
      email: 'ahmad@tauheednews.com',
      password: 'hashed_password_123',
      role: 'EDITOR',
    },
  });

  const scholarUser = await prisma.user.create({
    data: {
      name: 'Ustadz Hamzah Al-Madani',
      email: 'hamzah@tauheednews.com',
      password: 'hashed_password_123',
      role: 'EDITOR',
    },
  });

  console.log('Seeding main categories...');
  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'Aqidah & Tauhid', slug: 'aqidah-tauhid' } }),
    prisma.category.create({ data: { name: 'Tuntunan Islam', slug: 'tuntunan-islam' } }),
    prisma.category.create({ data: { name: 'Ulama & Warisan Ilmu', slug: 'ulama-warisan-ilmu' } }),
    prisma.category.create({ data: { name: 'Kajian Kitab', slug: 'kajian-kitab' } }),
    prisma.category.create({ data: { name: 'Fatwa & Fikih', slug: 'fatwa-fikih' } }),
    prisma.category.create({ data: { name: 'Haramain News', slug: 'haramain-news' } }),
    prisma.category.create({ data: { name: 'Dunia Islam', slug: 'dunia-islam' } }),
    prisma.category.create({ data: { name: 'Analisis & Klarifikasi', slug: 'analisis-klarifikasi' } }),
    prisma.category.create({ data: { name: 'Saudi Arabia Terkini', slug: 'saudi-arabia-terkini' } }),
    prisma.category.create({ data: { name: 'Diplomasi & Kerja Sama', slug: 'diplomasi-kerja-sama' } }),
    prisma.category.create({ data: { name: 'Bantuan Kemanusiaan', slug: 'bantuan-kemanusiaan' } }),
    prisma.category.create({ data: { name: 'Vision 2030 & Proyek', slug: 'vision-2030-proyek' } }),
  ]);

  const catMap = new Map(categories.map((c) => [c.slug, c.id]));

  console.log('Seeding 35+ authentic articles...');
  const articlesData = [
    {
      title: 'Saudi Pimpin KTT Arab-Islam Bahas Gaza dan Masa Depan Palestina',
      slug: 'saudi-pimpin-ktt-arab-islam-bahas-gaza-dan-masa-depan-palestina',
      excerpt: 'Riyadh menjadi tuan rumah KTT gabungan luar biasa negara-negara Arab dan Islam untuk membahas agresi di Gaza serta mengadvokasi solusi dua negara.',
      content: `
<p>Riyadh – Kerajaan Arab Saudi kembali menguatkan peran kepemimpinannya di Dunia Islam dengan menjadi tuan rumah perhelatan Konferensi Tingkat Tinggi (KTT) Luar Biasa Gabungan Arab-Islam yang dihadiri oleh para pemimpin negara anggota Organisasi Kerja Sama Islam (OKI/OIC) dan Liga Arab.</p>

<p>Pertemuan puncak di Riyadh tersebut secara khusus menggalang persatuan dan inisiatif diplomatik ketat untuk menghentikan agresi militer di Gaza, menjamin distribusi bantuan kemanusiaan tanpa hambatan, serta memperjuangkan hak-hak kemerdekaan rakyat Palestina.</p>

<div class="arabic-block bg-news-gray p-4 my-4 border-r-4 border-brass-gold text-right font-arabic text-2xl leading-loose">
وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ ۖ وَلَا تَتَعَاوَنُوا عَلَى الْإِثْمِ وَالْعُدْوَانِ
</div>
<p class="italic text-sm text-outline mb-4">"Dan tolong-menolonglah kamu dalam (mengerjakan) kebajikan dan takwa, dan jangan tolong-menolong dalam berbuat dosa dan permusuhan." (QS. Al-Ma'idah: 2)</p>

<h3>1. Konsolidasi Kekuatan dan Diplomasi Tingkat Tinggi</h3>
<p>KTT Arab-Islam di Riyadh berhasil melahirkan Resolusi Bersama yang menginstruksikan pembentukan komite khusus menteri luar negeri untuk berkeliling ke berbagai ibu kota negara anggota Dewan Keamanan PBB dan pusat diplomasi global.</p>

<h3>2. Dorongan Terhadap Solusi Dua Negara</h3>
<p>Arab Saudi menegaskan bahwa perdamaian yang adil dan berkelanjutan di Timur Tengah tidak akan pernah tercapai tanpa diakuinya Negara Palestina yang merdeka sesuai dengan garis batas 1967 dan beribu kota di Yerusalem Timur (Al-Quds Ash-Sharif).</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
      isHeadline: true,
      isFeature: true,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: adminUser.id,
      categoryId: catMap.get('saudi-arabia-terkini')!,
      views: 5240,
      createdAt: new Date('2026-08-12T10:00:00Z'),
    },
    {
      title: 'Peran Komite Menteri Arab-Islam Dipimpin Saudi dalam Mengadvokasi Solusi Dua Negara',
      slug: 'peran-komite-menteri-arab-islam-dipimpin-saudi-advokasi-solusi-dua-negara',
      excerpt: 'Kerajaan Arab Saudi memimpin Komite Menteri Arab-Islam yang menggalang dukungan internasional serta mendorong pengakuan global bagi Palestina.',
      content: `
<p>Riyadh – Komite Menteri Luar Negeri Arab-Islam yang dibentuk atas keputusan KTT Luar Biasa di Riyadh dan dipimpin oleh Arab Saudi terus bergerak aktif menggalang dukungan internasional di PBB, Eropa, dan Asia.</p>

<p>Komite menteri ini secara terpadu mengadvokasi percepatan solusi dua negara (Two-State Solution) sebagai satu-satunya jalan keluar yang sah dan berkeadilan bagi konflik di kawasan tersebut.</p>

<h3>1. Penggalangan Dukungan Pengakuan Internasional</h3>
<p>Langkah diplomasi komite ini berhasil mendorong bertambahnya negara-negara di dunia yang secara resmi mengakui kedaulatan Negara Palestina, sekaligus menyerukan gencatan senjata permanen dan penegakan hukum internasional di Gaza.</p>

<h3>2. Penyediaan Akses Kemanusiaan Tanpa Syarat</h3>
<p>Selain diplomasi politik, Saudi menekankan pentingnya pembukaan koridor kemanusiaan secara berkelanjutan guna memastikan makanan, obat-obatan, dan kebutuhan dasar sampai ke seluruh warga terdampak di Gaza.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: true,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: editorUser.id,
      categoryId: catMap.get('dunia-islam')!,
      views: 4120,
      createdAt: new Date('2026-08-11T14:30:00Z'),
    },
    {
      title: 'KSrelief Salurkan Bantuan Kemanusiaan Saudi ke Lebih dari 100 Negara Muslim',
      slug: 'ksrelief-salurkan-bantuan-kemanusiaan-saudi-ke-lebih-dari-100-negara-muslim',
      excerpt: 'Melalui King Salman Humanitarian Aid and Relief Centre (KSrelief), Arab Saudi telah menyalurkan bantuan kemanusiaan ke puluhan negara Muslim lewat ribuan proyek hingga 2026.',
      content: `
<p>Riyadh – Pusat Bantuan Kemanusiaan dan Pertolongan Raja Salman (KSrelief / King Salman Humanitarian Aid and Relief Centre) mencatatkan rekor baru dalam jangkauan operasional kemanusiaan secara global.</p>

<p>Hingga tahun 2026, KSrelief telah menyalurkan bantuan kemanusiaan bernilai miliaran dolar AS yang mencakup lebih dari 100 negara di seluruh dunia, khususnya negara-negara Muslim dan berkembang yang mengalami bencana alam serta krisis kemanusiaan.</p>

<h3>1. Ribuan Proyek Kemanusiaan Berkelanjutan</h3>
<p>Program bantuan KSrelief berfokus pada ketahanan pangan, sektor kesehatan, pembangunan air bersih, perlindungan anak, serta tempat tinggal darurat bagi pengungsi di Gaza, Sudan, Yaman, hingga kawasan Afrika dan Asia.</p>

<h3>2. Prinsip Kemanusiaan Tanpa Diskriminasi</h3>
<p>Penyaluran bantuan dilakukan dengan koordinasi bersama badan-badan PBB dan lembaga internasional, menegaskan peran kepedulian sosial Kerajaan Arab Saudi terhadap umat Islam dan kemanusiaan global.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: true,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: adminUser.id,
      categoryId: catMap.get('bantuan-kemanusiaan')!,
      views: 3890,
      createdAt: new Date('2026-08-10T09:15:00Z'),
    },
    {
      title: 'Stabilitas Timur Tengah: Saudi Dorong Penyelesaian Konflik Suriah dan Yaman',
      slug: 'stabilitas-timur-tengah-saudi-dorong-penyelesaian-konflik-suriah-dan-yaman',
      excerpt: 'Arab Saudi aktif memimpin upaya penyelesaian konflik di Suriah dan Yaman, mendorong reintegrasi diplomatik Arab, serta mendukung rekonstruksi pascaperang.',
      content: `
<p>Riyadh – Dalam rangka menciptakan stabilitas dan keharmonisan di kawasan Timur Tengah, Kerajaan Arab Saudi terus mendorong resolusi damai atas berbagai konflik politik dan militer di kawasan, termasuk di Suriah dan Yaman.</p>

<p>Saudi memainkan peran proaktif dalam memfasilitasi dialog internasional, mendorong kembalinya Suriah ke dalam lingkungan diplomatik Liga Arab, serta mengawal proses rekonsiliasi nasional demi kesejahteraan masyarakat terdampak.</p>

<h3>1. Mediasi Diplomasi dan Rekonsiliasi</h3>
<p>Melalui diplomasi yang inklusif, Kerajaan memfasilitasi perundingan guna mengakhiri pertikaian bersenjata dan mengembalikan keamanan yang kondusif di kawasan terpencil Yaman dan kota-kota di Suriah.</p>

<h3>2. Rekonstruksi Pasca-Konflik dan Pembangunan Ekonomi</h3>
<p>Saudi juga menginisiasi bantuan ekonomi dan program rekonstruksi infrastruktur pascaperang, memulihkan fasilitas umum seperti sekolah, rumah sakit, serta sarana transportasi demi masa depan generasi muda di kawasan.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: editorUser.id,
      categoryId: catMap.get('dunia-islam')!,
      views: 3450,
      createdAt: new Date('2026-08-09T16:00:00Z'),
    },
    {
      title: 'Saudi, Turki, dan Pakistan Tandatangani Perjanjian Pertahanan Bersama',
      slug: 'saudi-turki-dan-pakistan-tandatangani-perjanjian-pertahanan-bersama',
      excerpt: 'Tiga negara Muslim besar – Arab Saudi, Turki, dan Pakistan – menyepakati perjanjian kerja sama pertahanan strategis demi memperkuat ketahanan kawasan.',
      content: `
<p>Riyadh – Langkah bersejarah tercipta dengan ditandatanganinya perjanjian kerja sama pertahanan trilateral antara Kerajaan Arab Saudi, Republik Turki, dan Republik Islam Pakistan.</p>

<p>Kesepakatan ini bertujuan memperkuat ketahanan pertahanan bersama, alih teknologi keamanan, latihan militer terpadu, serta koordinasi strategis di antara negara-negara Muslim terbesar di dunia.</p>

<h3>1. Penguatan Industri Pertahanan dan Keamanan Usaha Bersama</h3>
<p>Perjanjian ini mencakup investasi bersama dalam industri pertahanan modern, riset teknologi militer mutakhir, dan alih pengetahuan guna membangun kemandirian pertahanan di dunia Islam.</p>

<h3>2. Menjaga Keseimbangan dan Perdamaian Regional</h3>
<p>Kerja sama keamanan ini menjadi pilar penting dalam menjaga keseimbangan strategis, mencegah potensi ancaman geopolitik, dan memastikan stabilitas keamanan di Timur Tengah dan Asia Selatan.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: true,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: adminUser.id,
      categoryId: catMap.get('diplomasi-kerja-sama')!,
      views: 4670,
      createdAt: new Date('2026-08-08T11:20:00Z'),
    },
    {
      title: 'Pengelolaan Haramain dan Pelayanan Jutaan Jamaah Haji dan Umrah Oleh Saudi',
      slug: 'pengelolaan-haramain-dan-pelayanan-jutaan-jamaah-haji-dan-umrah-oleh-saudi',
      excerpt: 'Pengelolaan Masjidil Haram dan Masjid Nabawi terus ditingkatkan melalui mega proyek perluasan fasilitas dan pelayanan haji-umrah kelas dunia.',
      content: `
<p>Makkah Al-Mukarramah & Madinah Al-Munawwarah – Sebagai Khadimul Haramain Asy-Syarifain (Pelayan Dua Kota Suci), Kerajaan Arab Saudi mendedikasikan perhatian penuh terhadap kemakmuran dan kenyamanan Masjidil Haram serta Masjid Nabawi.</p>

<p>Setiap tahunnya, jutaan jamaah haji dan umrah dari seluruh pelosok dunia menikmati peningkatan kualitas fasilitas, sistem pendingin udara otomatis, transportasi cepat Kereta Haramain, serta pendistribusian air Zamzam berbasis smart-robotics.</p>

<h3>1. Proyek Perluasan Raksasa Dua Masjid Suci</h3>
<p>Pemerintah Saudi terus mengawal pembangunan perluasan area shalat di Masjidil Haram Makkah dan Masjid Nabawi Madinah, mampu menampung lebih dari 2,5 juta jamaah secara bersamaan dalam kondisi aman dan nyaman.</p>

<h3>2. Digitalisasi Layanan Haji dan Umrah</h3>
<p>Aplikasi smart-hajj, izin umrah otomatis, hingga penataan alur tawaf dan sa'i berteknologi tinggi diperkenalkan untuk memastikan setiap jamaah dapat menjalankan ibadah sesuai tuntunan syariat dengan khusyuk.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: true,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: scholarUser.id,
      categoryId: catMap.get('haramain-news')!,
      views: 4980,
      createdAt: new Date('2026-08-07T08:45:00Z'),
    },
    {
      title: 'Diplomasi Internasional Saudi: Menggabungkan Energi, Bantuan, dan Pengaruh Islam',
      slug: 'diplomasi-internasional-saudi-menggabungkan-energi-bantuan-dan-pengaruh-islam',
      excerpt: 'Berbagai kajian internasional menyoroti efektivitas diplomasi luar negeri Arab Saudi yang mensinergikan bantuan kemanusiaan, energi, dan kepemimpinan Islam.',
      content: `
<p>Riyadh – Dalam beberapa tahun terakhir, Arab Saudi semakin intens menjadi pusat perundingan dan mediation internasional bagi berbagai isu ketahanan pangan, perdamaian, dan stabilitas global.</p>

<p>Sejumlah analisis dan riset internasional menyebutkan bahwa Saudi berhasil mengoptimalkan diplomasi soft power dengan memadukan posisi strategis energi dunia, bantuan kemanusiaan KSrelief, dan pengaruh keagamaan sebagai pengayom Umat Islam.</p>

<h3>1. Pusat Perundingan Diplomasi Global</h3>
<p>Kota Riyadh dan Jeddah kini kerap menjadi tuan rumah berbagai negosiasi perdamaian dunia, termasuk pertemuan gencatan senjata dan konsolidasi internasional antara kekuatan barat, Asia, dan dunia berkembang.</p>

<h3>2. Memperluas Kontribusi Global</h3>
<p>Sinergi antara visi pembangunan nasional Vision 2030 dan kebijakan luar negeri yang aktif menempatkan Saudi sebagai pilar utama pembangun peradaban Islam yang moderat, maju, dan berpengaruh di kancah internasional.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: adminUser.id,
      categoryId: catMap.get('saudi-arabia-terkini')!,
      views: 3760,
      createdAt: new Date('2026-08-06T13:10:00Z'),
    },
    {
      title: 'Peran Tauhid dalam Membangun Peradaban Islam',
      slug: 'peran-tauhid-dalam-membangun-peradaban-islam',
      excerpt: 'Tauhid bukan hanya keyakinan, tetapi fondasi utama dalam membangun peradaban yang mulia dan bermartabat.',
      content: `
<p>Tauhid merupakan inti ajaran para Rasul yang diutus oleh Allah Subhanahu wa Ta'ala. Dalam menjalani kehidupan harian, pemahaman tauhid yang lurus memberikan pengaruh mendalam terhadap cara pandang seorang muslim terhadap dunia dan akhirat.</p>

<div class="arabic-block bg-news-gray p-4 my-4 border-r-4 border-brass-gold text-right font-arabic text-2xl leading-loose">
وَأَنَّ هَٰذَا صِرَاطِي مُسْتَقِيمًا فَاتَّبِعُوهُ ۖ وَلَا تَتَّبِعُوا السُّبُلَ فَتَفَرَّقَ بِكُمْ عَن سَبِيلِهِ
</div>
<p class="italic text-sm text-outline mb-4">"Dan ini adalah jalan-Ku yang lurus, maka ikutilah dia; dan janganlah kamu mengikuti jalan-jalan (yang lain), karena jalan-jalan itu memecah belah kamu dari jalan-Nya." (QS. Al-An'am: 153)</p>

<h3>1. Mengesakan Allah dalam Ibadah dan Kehidupan</h3>
<p>Ketika seorang hamba benar-benar mengesakan Allah, ia tidak lagi bergantung pada mahluk. Kemandirian jiwa ini melahirkan pribadi yang teguh dan tidak mudah terguncang oleh fitnah zaman.</p>

<h3>2. Fondasi Keadilan Sosial</h3>
<p>Peradaban yang dibangun di atas tauhid senantiasa menjunjung keadilan dan kesetaraan. Tidak ada keunggulan suatu bangsa atas bangsa lain kecuali dengan ketakwaan.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: adminUser.id,
      categoryId: catMap.get('aqidah-tauhid')!,
      views: 3420,
      createdAt: new Date('2026-05-08T08:00:00Z'),
    },
    {
      title: 'Landasan Utama Aqidah Ahlussunnah wal Jamaah',
      slug: 'landasan-utama-aqidah-ahlussunnah',
      excerpt: 'Panduan tetap mengenai prinsip-prinsip aqidah shahihah sesuai pemahaman para sahabat dan salafus shalih.',
      content: `
<p>Memahami aqidah yang benar adalah kewajiban individual (Fardhu 'Ain) bagi setiap muslim. Tanpa aqidah yang lurus, amalan sebaik apa pun berisiko tersia-siakan.</p>

<div class="arabic-block bg-news-gray p-4 my-4 border-r-4 border-brass-gold text-right font-arabic text-2xl leading-loose">
مَنْ عَمِلَ صَالِحًا مِّن ذَكَرٍ أَوْ أُنثَىٰ وَهُوَ مُؤْمِنٌ فَلَنُحْيِيَنَّهُ حَيَاةً طَيِّبَةً
</div>
<p class="italic text-sm text-outline mb-4">"Barangsiapa mengerjakan kebajikan, baik laki-laki maupun perempuan dalam keadaan beriman, maka pasti akan Kami berikan kepadanya kehidupan yang baik." (QS. An-Nahl: 97)</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1590076175571-4b5459efb08c?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: true,
      status: 'PUBLISHED',
      authorId: adminUser.id,
      categoryId: catMap.get('aqidah-tauhid')!,
      views: 4890,
      createdAt: new Date('2026-05-04T08:00:00Z'),
    },
    {
      title: 'Hakikat Syahadatain dan Pembatal-Pembatal Keislaman',
      slug: 'hakikat-syahadatain-dan-pembatal-keislaman',
      excerpt: 'Dua kalimat syahadat adalah pintu gerbang Islam yang menuntut konsekuensi amalan lisan, hati, dan anggota badan.',
      content: `
<p>Dua kalimat syahadat memiliki syarat-syarat sah yang harus dipenuhi oleh setiap orang yang mengucapkannya: ilmu, keyakinan, keikhlasan, kejujuran, kecintaan, ketundukan, dan penerimaan.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: editorUser.id,
      categoryId: catMap.get('aqidah-tauhid')!,
      views: 1980,
      createdAt: new Date('2026-05-03T11:00:00Z'),
    },
    {
      title: 'Arab Saudi Tegaskan Komitmen pada Al-Qur\'an dan Sunnah',
      slug: 'arab-saudi-tegaskan-komitmen-pada-al-quran-dan-sunnah',
      excerpt: 'Kerajaan Arab Saudi kembali menegaskan komitmennya untuk senantiasa berpegang teguh pada Al-Qur\'an dan Sunnah dalam setiap kebijakan dan program yang dijalankan.',
      content: `
<p>Riyadh – Kerajaan Arab Saudi kembali menegaskan komitmennya untuk senantiasa berpegang teguh pada Al-Qur'an dan Sunnah dalam setiap kebijakan dan program yang dijalankan.</p>

<p>Pernyataan ini disampaikan oleh Menteri Urusan Islam, Dakwah, dan Bimbingan Arab Saudi dalam sebuah konferensi pers resmi yang digelar di Riyadh.</p>

<p>"Negara ini berdiri di atas landasan tauhid yang murni. Al-Qur'an dan Sunnah adalah pedoman kami dalam segala urusan, baik dalam ibadah, pemerintahan, maupun pelayanan kepada umat," ujarnya.</p>

<blockquote class="my-6 p-4 rounded-r-lg border-l-4 border-[#0d382c] bg-[#0d382c]/10 dark:bg-[#0d382c]/30 text-[#0d382c] dark:text-[#8bd4b6]">
  <p class="italic text-base font-serif mb-2">"Kami berdoa semoga Allah menjaga negeri ini dan seluruh kaum muslimin di atas kebenaran hingga hari akhir."</p>
  <footer class="text-xs font-bold text-[#c5a059]">- Kementerian Urusan Islam Arab Saudi</footer>
</blockquote>
      `,
      coverImage: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: true,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: adminUser.id,
      categoryId: catMap.get('dunia-islam')!,
      views: 3850,
      createdAt: new Date('2026-05-08T10:00:00Z'),
    },
    {
      title: 'Situasi Terkini di Palestina: Keteguhan di Atas Kebenaran',
      slug: 'situasi-terkini-di-palestina-keteguhan-di-atas-kebenaran',
      excerpt: 'Analisis mendalam mengenai perkembangan stabilitas dan perjuangan penjagaan Al-Aqsa oleh kaum muslimin.',
      content: `
<p>Masjid Al-Aqsa tetap menjadi simbol ketabahan dan persatuan umat Islam sedunia. Dukungan kemanusiaan dan doa tiada henti terus mengalir dari berbagai belahan dunia.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: editorUser.id,
      categoryId: catMap.get('dunia-islam')!,
      views: 2450,
      createdAt: new Date('2026-05-08T09:00:00Z'),
    },
    {
      title: 'Arab Saudi Perluas Layanan Digital dan Air Zamzam di Masjidil Haram',
      slug: 'arab-saudi-perluas-layanan-digital-masjidil-haram',
      excerpt: 'Pengelola Dua Masjid Suci menghadirkan inovasi teknologi pendingin dan pendistribusian air Zamzam otomatis.',
      content: `
<p>Makkah Al-Mukarramah – Kepresidenan Umum Urusan Dua Masjid Suci meningkatkan ekspansi layanan smart-robotics dan navigasi digital di area perluasan ketiga Masjidil Haram.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: true,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: scholarUser.id,
      categoryId: catMap.get('haramain-news')!,
      views: 2150,
      createdAt: new Date('2026-05-07T15:00:00Z'),
    },
    {
      title: 'Yaman: Bantuan Kemanusiaan Masih Sangat Dibutuhkan',
      slug: 'yaman-bantuan-kemanusiaan-masih-sangat-dibutuhkan',
      excerpt: 'Laporan terkini mengenai penyaluran bantuan pangan dan medis bagi warga terdampak di Yaman.',
      content: `
<p>Berbagai lembaga internasional dan relawan muslim terus mendistribusikan kebutuhan pokok dan obat-obatan di wilayah terpencil Yaman.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: editorUser.id,
      categoryId: catMap.get('dunia-islam')!,
      views: 1440,
      createdAt: new Date('2026-05-07T14:00:00Z'),
    },
    {
      title: 'Afrika: Perkembangan Dakwah Tauhid di Pelosok Benua',
      slug: 'afrika-perkembangan-dakwah-tauhid-di-pelosok-benua',
      excerpt: 'Kisah haru pembangunan sumur air bersih dan madrasah Al-Qur\'an di kawasan Afrika Timur.',
      content: `
<p>Program sumbangan dan waqaf kaum muslimin berhasil menghadirkan akses air bersih bagi ribuan santri di pedalaman Afrika.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: adminUser.id,
      categoryId: catMap.get('dunia-islam')!,
      views: 1180,
      createdAt: new Date('2026-05-06T11:00:00Z'),
    },
    {
      title: 'Mengenal Biografi Syaikh \'Abdul \'Aziz bin Baz: Mufti Agung Pendukung Sunnah',
      slug: 'mengenal-biografi-syaikh-abdul-aziz-bin-baz',
      excerpt: 'Perjalanan hidup dan kontribusi keilmuan Al-Imam Al-Allamah Syaikh \'Abdul \'Aziz bin \'Abdullah bin Baz rahimahullah.',
      content: `
<p>Al-Imam Syaikh 'Abdul 'Aziz bin Baz rahimahullah lahir di Riyadh pada tahun 1330 H (1912 M). Beliau dikenal sebagai ulama besar yang sangat bersahaja, dermawan, dan mendedikasikan seluruh hidupnya untuk dakwah tauhid dan pelayanan umat Islam dunia.</p>
      `,
      coverImage: '/masyayikh/binbaz.png',
      isHeadline: false,
      isFeature: true,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: editorUser.id,
      categoryId: catMap.get('ulama-warisan-ilmu')!,
      views: 3980,
      createdAt: new Date('2026-05-08T09:30:00Z'),
    },
    {
      title: 'Metode Fiqih Syaikh Muhammad bin Salih Al-\'Utsaimin',
      slug: 'metode-fiqih-syaikh-muhammad-bin-salih-al-utsaimin',
      excerpt: 'Kedalaman ilmu fiqih dan penjelasan sistematis Syaikh Al-\'Utsaimin yang mempermudah pemahaman umat.',
      content: `
<p>Syaikh Al-'Utsaimin rahimahullah memiliki metode pengajaran yang sangat jernih, didasari oleh dalil Al-Qur'an dan As-Sunnah serta penjelasan kaidah-kaidah fiqhiyyah yang kuat.</p>
      `,
      coverImage: '/masyayikh/utsaimin.png',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: editorUser.id,
      categoryId: catMap.get('ulama-warisan-ilmu')!,
      views: 2850,
      createdAt: new Date('2026-05-08T09:15:00Z'),
    },
    {
      title: 'Peran Syaikh Al-Albani dalam Meneliti dan Memurnikan Hadits',
      slug: 'peran-syaikh-al-albani-dalam-meneliti-hadits',
      excerpt: 'Dedikasi puluhan tahun Muhaddits abad ini dalam meneliti derajat kesahihan dan kelemahan riwayat hadits Nabi.',
      content: `
<p>Syaikh Muhammad Nasiruddin Al-Albani rahimahullah mendedikasikan waktu di Perpustakaan Az-Zahiriyyah Damaskus untuk mengkaji ribuan manuskrip hadits kuno.</p>
      `,
      coverImage: '/masyayikh/albani.png',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: scholarUser.id,
      categoryId: catMap.get('ulama-warisan-ilmu')!,
      views: 3120,
      createdAt: new Date('2026-05-07T10:00:00Z'),
    },
    {
      title: 'Perjuangan Syaikh Salih Al-Fauzan dalam Mengajar Kitab Tauhid',
      slug: 'perjuangan-syaikh-salih-al-fauzan-mengajar-tauhid',
      excerpt: 'Ketelatenan Syaikh Al-Fauzan hafizhahullah mengajar ratusan ribu santri dan mahasiswa di Riyadh.',
      content: `
<p>Anggota Dewan Ulama Senior Arab Saudi Syaikh Salih bin Fauzan Al-Fauzan terus memberikan kajian rutin di Masjid ar-Rajihi dan Universitas Imam Muhammad bin Saud.</p>
      `,
      coverImage: '/masyayikh/fauzan.png',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: adminUser.id,
      categoryId: catMap.get('ulama-warisan-ilmu')!,
      views: 2740,
      createdAt: new Date('2026-05-06T14:00:00Z'),
    },
    {
      title: 'Keutamaan Ikhlas dalam Beramal',
      slug: 'keutamaan-ikhlas-dalam-beramal',
      excerpt: 'Ikhlas adalah ruh dari setiap ibadah. Tanpa keikhlasan, amal perbuatan manusia laksana debu yang diterbangkan angin.',
      content: `
<p>Rasulullah sallallahu 'alaihi wa sallam bersabda dalam hadits shahih Umar bin Khattab radhiyallahu 'anhu:</p>
<div class="arabic-block bg-news-gray p-4 my-4 border-r-4 border-brass-gold text-right font-arabic text-2xl leading-loose">
إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى
</div>
<p class="italic text-sm text-outline mb-4">"Sesungguhnya setiap amalan tergantung pada niatnya..." (HR. Bukhari & Muslim)</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: adminUser.id,
      categoryId: catMap.get('tuntunan-islam')!,
      views: 2540,
      createdAt: new Date('2026-05-08T07:00:00Z'),
    },
    {
      title: 'Adab Menuntut Ilmu',
      slug: 'adab-menuntut-ilmu',
      excerpt: 'Metode dan ketundukan hati yang dibutuhkan seorang murid agar keberkahan ilmu dapat meresap dalam jiwa.',
      content: `
<p>Imam Asy-Syafi'i rahimahullah menekankan pentingnya mensucikan niat, menghormati guru, dan bersabar dalam menempuh panjangnya jalan keilmuan.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: editorUser.id,
      categoryId: catMap.get('tuntunan-islam')!,
      views: 2320,
      createdAt: new Date('2026-05-08T06:30:00Z'),
    },
    {
      title: 'Pentingnya Shalat Berjamaah',
      slug: 'pentingnya-shalat-berjamaah',
      excerpt: 'Shalat berjamaah memakmurkan masjid dan mempererat ukhuwah islamiyah antar sesama muslim.',
      content: `
<p>Keutamaan shalat berjamaah 27 derajat lebih tinggi dibandingkan shalat sendirian, sebagaimana ditegaskan dalam hadits-hadits shahih.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1590076175571-4b5459efb08c?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: adminUser.id,
      categoryId: catMap.get('tuntunan-islam')!,
      views: 1810,
      createdAt: new Date('2026-05-07T16:00:00Z'),
    },
    {
      title: 'Birrul Walidain: Keutamaan Berbakti pada Orang Tua',
      slug: 'birrul-walidain-keutamaan-berbakti-pada-orang-tua',
      excerpt: 'Ridha Allah berada pada ridha kedua orang tua, dan murka Allah berada pada murka kedua orang tua.',
      content: `
<p>Berbakti kepada kedua orang tua merupakan kewajiban utama setelah kewajiban tauhid mengesakan Allah Azza wa Jalla.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: editorUser.id,
      categoryId: catMap.get('tuntunan-islam')!,
      views: 1640,
      createdAt: new Date('2026-05-07T12:00:00Z'),
    },
    {
      title: 'Dzikir Pagi dan Petang: Benteng Perlindungan Muslim',
      slug: 'dzikir-pagi-dan-petang-benteng-muslim',
      excerpt: 'Membaca dzikir ma\'tsur setiap pagi dan petang menjaga seorang hamba dari gangguan syetan dan keburukan.',
      content: `
<p>Rasulullah sallallahu 'alaihi wa sallam senantiasa mengajarkan para sahabat untuk merutinkan kalimat-kalimat dzikir di awal dan akhir siang hari.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: scholarUser.id,
      categoryId: catMap.get('tuntunan-islam')!,
      views: 1950,
      createdAt: new Date('2026-05-05T06:00:00Z'),
    },
    {
      title: 'Penjelasan Kitab Kitabut Tauhid: Bab Keagungan Tauhid',
      slug: 'penjelasan-kitab-kitabut-tauhid-keagungan-tauhid',
      excerpt: 'Ulasan sistematik mengenai bab-bab kunci dalam karya fenomenal Syaikhul Islam Muhammad bin Abdul Wahhab.',
      content: `
<p>Kajian mendalam terhadap dalil-dalil Al-Qur'an dan Sunnah yang menegaskan kewajiban memurnikan tauhid dari segala bentuk kesyirikan.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: scholarUser.id,
      categoryId: catMap.get('kajian-kitab')!,
      views: 2140,
      createdAt: new Date('2026-05-06T08:00:00Z'),
    },
    {
      title: 'Fatwa Ringkas: Hukum Fiqih Jual Beli Online dan E-Money',
      slug: 'fatwa-ringkas-hukum-fiqih-jual-beli-online',
      excerpt: 'Tinjauan hukum syariah terhadap kejelasan barang, keabsahan akad, dan perlindungan pembeli di era digital.',
      content: `
<p>Perkembangan teknologi e-commerce menuntut pemahaman fiqih muamalah yang ketat agar terhindar dari unsur gharar dan riba.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: adminUser.id,
      categoryId: catMap.get('fatwa-fikih')!,
      views: 2890,
      createdAt: new Date('2026-05-05T09:00:00Z'),
    },
    {
      title: 'Panduan Fiqih Zakat Maal dan Cara Perhitungannya',
      slug: 'panduan-fiqih-zakat-maal-dan-cara-perhitungan',
      excerpt: 'Kewajiban menunaikan zakat harta saat mencapai nishab dan haul sesuai ketetapan Al-Qur\'an dan As-Sunnah.',
      content: `
<p>Zakat Maal merupakan salah satu rukun Islam yang wajib ditunaikan bagi setiap muslim yang hartanya telah mencapai nishab 85 gram emas dan tersimpan selama satu tahun (haul).</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: editorUser.id,
      categoryId: catMap.get('fatwa-fikih')!,
      views: 2450,
      createdAt: new Date('2026-05-06T10:00:00Z'),
    },
    {
      title: 'Hukum Fiqih Seputar Kurban dan Syarat Hewan Sembelihan',
      slug: 'hukum-fiqih-seputar-kurban-dan-syarat-sembelihan',
      excerpt: 'Syarat-syarat keabsahan hewan kurban, tata cara penyembelihan syar\'i, dan pembagian daging kurban.',
      content: `
<p>Ibadah udhiyah (kurban) pada hari Raya Idul Adha dan hari Tasyrik memiliki syarat-syarat khusus terkait usia dan kesehatan hewan ternak.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: scholarUser.id,
      categoryId: catMap.get('fatwa-fikih')!,
      views: 2120,
      createdAt: new Date('2026-05-06T09:30:00Z'),
    },
    {
      title: 'Fatwa Ulama: Adab dan Hukum Fiqih Safar Bagi Musafir',
      slug: 'fatwa-ulama-adab-dan-hukum-fiqih-safar',
      excerpt: 'Rukhsah shalat qashar dan jamak, syarat jarak safar, serta doa-doa dalam perjalanan.',
      content: `
<p>Islam memberikan kemudahan (rukhsah) bagi orang yang melakukan safar untuk menjamak dan mengqashar shalat empat rakaat menjadi dua rakaat.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: editorUser.id,
      categoryId: catMap.get('fatwa-fikih')!,
      views: 1980,
      createdAt: new Date('2026-05-05T14:00:00Z'),
    },
    {
      title: 'Fiqih Thaharah: Pembatal Wudhu dan Cara Mensucikan Najis',
      slug: 'fiqih-thaharah-pembatal-wudhu-dan-menyucikan-najis',
      excerpt: 'Penjelasan rinci jenis-jenis najis dan tata cara thaharah yang diajarkan oleh Nabi Muhammad Shallallahu \'Alaihi wa Sallam.',
      content: `
<p>Bersuci dari hadats kecil dan hadats besar adalah syarat sah utama pelaksanaan shalat lima waktu.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: scholarUser.id,
      categoryId: catMap.get('fatwa-fikih')!,
      views: 1750,
      createdAt: new Date('2026-05-04T16:00:00Z'),
    },
    {
      title: 'Fatwa Seputar Hukum Riba dan Keuangan Syariah',
      slug: 'fatwa-seputar-hukum-riba-dan-keuangan-syariah',
      excerpt: 'Bahaya larangan riba dalam Al-Qur\'an dan solusi alternatif transaksi muamalah yang bersih dan halal.',
      content: `
<p>Keharaman riba ditegaskan secara tegas dalam Surah Al-Baqarah, dan Umat Islam diperintahkan untuk beralih pada akad-akad muamalah syar'i seperti mudharabah dan murabahah.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: adminUser.id,
      categoryId: catMap.get('fatwa-fikih')!,
      views: 2680,
      createdAt: new Date('2026-05-04T12:00:00Z'),
    },
    {
      title: 'Analisis & Klarifikasi: Meluruskan Pemahaman Berita Hoaks di Media Sosial',
      slug: 'analisis-klarifikasi-meluruskan-pemahaman-berita-hoaks',
      excerpt: 'Tabayyun dan prinsip verifikasi syar\'i sebelum menyebarkan berita yang belum jelas sumbernya.',
      content: `
<p>Prinsip Tabayyun sebagaimana diperintahkan dalam Surah Al-Hujurat ayat 6 menjadi benteng pertahanan utama umat dari kabar bohong.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: adminUser.id,
      categoryId: catMap.get('analisis-klarifikasi')!,
      views: 1430,
      createdAt: new Date('2026-05-04T11:00:00Z'),
    },
  ];

  for (const art of articlesData) {
    await prisma.article.create({ data: art });
  }

  console.log('Seeding Kajian schedules...');
  await prisma.kajian.createMany({
    data: [
      {
        title: 'Kajian Rutin: Bedah Kitab Fathul Majid',
        speaker: 'Ustadz Dr. Muhammad Arifin, M.A.',
        location: 'Masjid Agung Al-Mu\'minin, Jakarta Selatan',
        dateTime: 'Sabtu, 10 Mei 2026 | Ba\'da Maghrib',
        topic: 'Prinsip-Prinsip Pemurnian Aqidah dalam Keseharian',
        image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80',
        isUpcoming: true,
      },
      {
        title: 'Tabligh Akbar: Menjaga Keharmonisan Keluarga di Atas Sunnah',
        speaker: 'Ustadz Abdullah Zain, Lc.',
        location: 'Masjid Raya Istiqlal (Lantai 2)',
        dateTime: 'Ahad, 11 Mei 2026 | 09.00 - 11.30 WIB',
        topic: 'Tuntunan Islam dalam Pendidikan Anak',
        image: 'https://images.unsplash.com/photo-1590076175571-4b5459efb08c?auto=format&fit=crop&w=800&q=80',
        isUpcoming: true,
      },
      {
        title: 'Kajian Tematik: Fiqih Muamalah Kontemporer',
        speaker: 'Ustadz Dr. Erwandi Tarmizi, M.A.',
        location: 'Masjid Al-Azhar, Jakarta Selatan',
        dateTime: 'Sabtu, 17 Mei 2026 | 09.00 WIB',
        topic: 'Transkasi Keuangan Syariah di Era Digital',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        isUpcoming: true,
      },
    ],
  });

  console.log('Seeding Multimedia items...');
  await prisma.media.createMany({
    data: [
      {
        title: 'Tauhid: Fondasi Agama',
        speaker: 'Ust. Firanda Andirja',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '45:12',
        category: 'Aqidah & Tauhid',
        thumbnail: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Tafsir Surah Al-Fatihah',
        speaker: 'Ust. Syafiq Riza Basalamah',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '52:18',
        category: 'Tafsir Al-Qur\'an',
        thumbnail: 'https://images.unsplash.com/photo-1590076175571-4b5459efb08c?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Kitab Riyadush Shalihin: Bab Ikhlas',
        speaker: 'Ust. Muhammad Nuzul Dzulqarnain',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '38:45',
        category: 'Kajian Kitab',
        thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Syarah Aqidah Al-Wasithiyyah',
        speaker: 'Ust. Dr. Erwandi Tarmizi',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '60:00',
        category: 'Aqidah & Tauhid',
        thumbnail: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Dokumenter: Sejarah Perkembangan Ilmu Hadits',
        speaker: 'Tim Redaksi Tauheed News',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '28:15',
        category: 'Ulama & Warisan Ilmu',
        thumbnail: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=800&q=80',
      },
    ],
  });

  console.log('Seeding completed for articles, kajians, and media.');
  console.log('Starting auto-translation for all articles (EN & AR)...');
  try {
    const { translateAllUntranslated } = await import('../src/lib/translate');
    const result = await translateAllUntranslated();
    console.log(`Auto-translation complete: ${result.translated} translated, ${result.failed} failed out of ${result.total} total.`);
  } catch (err) {
    console.error('Auto-translation during seed failed:', err);
  }

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

