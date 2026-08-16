/// <reference types="node" />
declare const process: any;
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning database...');
  await prisma.articleTranslation.deleteMany({});
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
      name: 'Dewan Redaksi Keilmuan',
      email: 'redaksi.ilmiyah@tauheednews.com',
      password: 'hashed_password_123',
      role: 'EDITOR',
    },
  });

  const scholarUser = await prisma.user.create({
    data: {
      name: 'Lembaga Fatwa & Riset Syariah',
      email: 'fatwa@tauheednews.com',
      password: 'hashed_password_123',
      role: 'EDITOR',
    },
  });

  console.log('Seeding main categories according to user specifications...');
  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'Saudi Arabia News', slug: 'saudi-arabia-terkini' } }),
    prisma.category.create({ data: { name: 'Islamic World', slug: 'dunia-islam' } }),
    prisma.category.create({ data: { name: "Al-Lajnah Ad-Da'imah Fiqh Fatwa", slug: 'fatwa-fikih' } }),
    prisma.category.create({ data: { name: 'Islamic Guidance', slug: 'tuntunan-islam' } }),
    prisma.category.create({ data: { name: 'Aqidah and Tauhid', slug: 'aqidah-tauhid' } }),
    prisma.category.create({ data: { name: 'Opinion', slug: 'opini' } }),
    prisma.category.create({ data: { name: 'Ulama & Warisan Ilmu', slug: 'ulama-warisan-ilmu' } }),
    prisma.category.create({ data: { name: 'Haramain News', slug: 'haramain-news' } }),
    prisma.category.create({ data: { name: 'Kajian Kitab', slug: 'kajian-kitab' } }),
    prisma.category.create({ data: { name: 'Diplomasi & Kerja Sama', slug: 'diplomasi-kerja-sama' } }),
    prisma.category.create({ data: { name: 'Bantuan Kemanusiaan', slug: 'bantuan-kemanusiaan' } }),
    prisma.category.create({ data: { name: 'Vision 2030 & Proyek', slug: 'vision-2030-proyek' } }),
  ]);

  const catMap = new Map(categories.map((c) => [c.slug, c.id]));

  console.log('Seeding authentic articles for all sections...');
  const articlesData = [
    // 1. Saudi Arabia News
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
      views: 5420,
      createdAt: new Date('2026-08-14T10:00:00Z'),
    },
    {
      title: 'Arab Saudi Perluas Layanan Digital dan Pembagian Air Zamzam Otomatis di Masjidil Haram',
      slug: 'arab-saudi-perluas-layanan-digital-masjidil-haram',
      excerpt: 'Pengelola Dua Masjid Suci menghadirkan inovasi teknologi pendingin ramah lingkungan dan pendistribusian air Zamzam berbasis smart-robotics.',
      content: `
<p>Makkah Al-Mukarramah – Otoritas Umum Urusan Dua Masjid Suci di bawah naungan Kerajaan Arab Saudi terus mengoptimalkan pelayanan bagi para peziarah dan jamaah umrah melalui implementasi teknologi mutakhir dan penambahan jalur transportasi internal yang ramah jamaah.</p>
<p>Inovasi ini mencakup penyediaan titik air Zamzam berpendingin otomatis, sistem navigasi bahasa digital, serta jalur evakuasi medis terpadu.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: true,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: scholarUser.id,
      categoryId: catMap.get('saudi-arabia-terkini')!,
      views: 4210,
      createdAt: new Date('2026-08-13T15:00:00Z'),
    },
    {
      title: 'KSrelief Salurkan Bantuan Kemanusiaan Saudi ke Lebih dari 100 Negara Muslim',
      slug: 'ksrelief-salurkan-bantuan-kemanusiaan-saudi-ke-lebih-dari-100-negara-muslim',
      excerpt: 'Melalui King Salman Humanitarian Aid and Relief Centre (KSrelief), Arab Saudi telah menyalurkan bantuan kemanusiaan bernilai miliaran dolar ke puluhan negara.',
      content: `
<p>Riyadh – Pusat Bantuan Kemanusiaan dan Pertolongan Raja Salman (KSrelief) mencatatkan rekor kontribusi internasional dengan menyalurkan berbagai program pangan, sanitasi, medis, dan shelter bagi jutaan pengungsi dan korban krisis di seluruh dunia.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: true,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: adminUser.id,
      categoryId: catMap.get('saudi-arabia-terkini')!,
      views: 3890,
      createdAt: new Date('2026-08-12T09:15:00Z'),
    },
    {
      title: 'Arab Saudi Tegaskan Komitmen pada Al-Qur\'an dan Sunnah dalam Setiap Kebijakan',
      slug: 'arab-saudi-tegaskan-komitmen-pada-al-quran-dan-sunnah',
      excerpt: 'Kerajaan Arab Saudi kembali menegaskan komitmennya untuk senantiasa berpegang teguh pada Al-Qur\'an dan Sunnah dalam hukum dan pelayanan umat.',
      content: `
<p>Riyadh – Menteri Urusan Islam, Dakwah, dan Bimbingan Arab Saudi menegaskan bahwa negara didirikan di atas kalimat Tauhid Laa Ilaha Illallah dan terus konsisten menjadikan Al-Qur'an dan As-Sunnah sebagai rujukan utama undang-undang dasar dan pelayanan publik.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: editorUser.id,
      categoryId: catMap.get('saudi-arabia-terkini')!,
      views: 3950,
      createdAt: new Date('2026-08-11T12:00:00Z'),
    },

    // 2. Islamic World
    {
      title: 'Peran Komite Menteri Arab-Islam Dipimpin Saudi dalam Mengadvokasi Solusi Dua Negara',
      slug: 'peran-komite-menteri-arab-islam-dipimpin-saudi-advokasi-solusi-dua-negara',
      excerpt: 'Kerajaan Arab Saudi memimpin Komite Menteri Arab-Islam yang menggalang dukungan internasional serta mendorong pengakuan global bagi Palestina.',
      content: `
<p>Riyadh – Komite Menteri Luar Negeri Arab-Islam yang dibentuk atas keputusan KTT Luar Biasa di Riyadh dan dipimpin oleh Arab Saudi terus bergerak aktif menggalang dukungan internasional di PBB, Eropa, dan Asia guna menghentikan konflik dan mewujudkan kedaulatan penuh Palestina.</p>
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
      title: 'Stabilitas Kawasan: Saudi Dorong Rekonsiliasi dan Rekonstruksi di Suriah dan Yaman',
      slug: 'stabilitas-timur-tengah-saudi-dorong-penyelesaian-konflik-suriah-dan-yaman',
      excerpt: 'Arab Saudi aktif memimpin upaya penyelesaian konflik di Suriah dan Yaman, mendorong reintegrasi diplomatik Arab, serta mendukung rekonstruksi pascaperang.',
      content: `
<p>Riyadh – Dalam rangka menciptakan stabilitas dan keharmonisan di kawasan Timur Tengah, Kerajaan Arab Saudi terus mendorong resolusi damai atas berbagai krisis kawasan melalui jalur diplomasi multilateral dan bantuan kemanusiaan komprehensif.</p>
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
      title: 'Afrika: Perkembangan Dakwah Tauhid dan Pembangunan Sarana Ibadah di Pelosok Benua',
      slug: 'afrika-perkembangan-dakwah-tauhid-di-pelosok-benua',
      excerpt: 'Kisah haru pembangunan sumur air bersih, madrasah Al-Qur\'an, dan masjid di kawasan pedalaman Afrika Timur.',
      content: `
<p>Program dakwah dan bantuan kemanusiaan kaum muslimin berhasil menghadirkan akses air bersih dan sarana pendidikan syar'i bagi ratusan ribu santri dan keluarga muslim di pedalaman Afrika.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: adminUser.id,
      categoryId: catMap.get('dunia-islam')!,
      views: 2180,
      createdAt: new Date('2026-08-06T11:00:00Z'),
    },

    // 3. Al-Lajnah Ad-Da'imah Fiqh Fatwa
    {
      title: 'Fatwa Al-Lajnah Ad-Da\'imah: Hukum Fiqih Jual Beli Modern, E-Commerce, dan Transaksi Digital',
      slug: 'fatwa-lajnah-daimah-hukum-fiqih-jual-beli-online',
      excerpt: 'Tinjauan resmi Al-Lajnah Ad-Da\'imah lil Buhuts Al-Ilmiyyah wal Ifta\' Arab Saudi tentang syarat akad sah dan perlindungan transaksi muamalah syar\'i.',
      content: `
<p>Fatwa Nomor 19821 - Al-Lajnah Ad-Da'imah lil Buhuts Al-Ilmiyyah wal Ifta' (Komite Tetap Riset Ilmiah dan Fatwa Kerajaan Arab Saudi) yang diketuai oleh Syaikh 'Abdul 'Aziz bin 'Abdullah bin Baz rahimahullah menegaskan keabsahan jual beli secara elektronik selama memenuhi rukun jual beli syar'i: kejelasan sifat komoditas, tidak adanya penipuan (gharar), dan terbebas dari unsur riba.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: true,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: scholarUser.id,
      categoryId: catMap.get('fatwa-fikih')!,
      views: 3720,
      createdAt: new Date('2026-08-10T09:00:00Z'),
    },
    {
      title: 'Fatwa Al-Lajnah Ad-Da\'imah: Panduan Syar\'i Zakat Maal, Nishab Emas, dan Waktu Penyaluran',
      slug: 'fatwa-lajnah-daimah-panduan-zakat-maal',
      excerpt: 'Penetapan hukum nishab 85 gram emas, haul satu tahun hijriyah, dan kriteria 8 asnaf penerima zakat menurut ketetapan Dewan Fatwa Senior Saudi.',
      content: `
<p>Al-Lajnah Ad-Da'imah menjelaskan secara rinci kewajiban mengeluarkan zakat sebesar 2,5% dari total tabungan dan emas yang telah mengendap selama satu tahun penuh.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: scholarUser.id,
      categoryId: catMap.get('fatwa-fikih')!,
      views: 2940,
      createdAt: new Date('2026-08-08T10:00:00Z'),
    },
    {
      title: 'Fatwa Al-Lajnah Ad-Da\'imah: Ketentuan Fiqih Safar, Shalat Jamak & Qashar Bagi Musafir',
      slug: 'fatwa-lajnah-daimah-fiqih-safar-jamak-qashar',
      excerpt: 'Batasan jarak safar syar\'i, rukhsah mengqashar shalat empat rakaat, dan adab berdoa dalam bepergian.',
      content: `
<p>Al-Lajnah Ad-Da'imah menegaskan bahwa musafir yang menempuh perjalanan dengan jarak sekitar 80 km atau lebih berhak mendapatkan rukhsah qashar dan jamak shalat sesuai sunnah Nabi Shallallahu 'Alaihi wa Sallam.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: editorUser.id,
      categoryId: catMap.get('fatwa-fikih')!,
      views: 2650,
      createdAt: new Date('2026-08-07T14:00:00Z'),
    },
    {
      title: 'Fatwa Al-Lajnah Ad-Da\'imah: Syarat Keabsahan Ibadah Qurban dan Larangan Memotong Kuku bagi Shahibul Qurban',
      slug: 'fatwa-lajnah-daimah-syarat-qurban-larangan-potong-kuku',
      excerpt: 'Penjelasan hadits Ummu Salamah radhiyallahu \'anha mengenai larangan memotong rambut dan kuku saat memasuki 10 awal Dzulhijjah.',
      content: `
<p>Dewan Fatwa Al-Lajnah Ad-Da'imah menerangkan bahwa orang yang berniat berqurban dianjurkan menahan diri dari memotong rambut dan kuku sejak terbit hilal bulan Dzulhijjah sampai hewan qurbannya disembelih.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: scholarUser.id,
      categoryId: catMap.get('fatwa-fikih')!,
      views: 3120,
      createdAt: new Date('2026-08-05T09:30:00Z'),
    },

    // 5. Islamic Guidance
    {
      title: 'Keutamaan Ikhlas dan Memurnikan Niat Semata Karena Allah',
      slug: 'keutamaan-ikhlas-dalam-beramal',
      excerpt: 'Ikhlas adalah ruh dari setiap ibadah. Tanpa keikhlasan dan ittiba\' kepada Sunnah Rasulullah, amal perbuatan laksana debu yang berterbangan.',
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
      views: 2980,
      createdAt: new Date('2026-08-08T07:00:00Z'),
    },
    {
      title: 'Birrul Walidain: Keutamaan Agung Berbakti Kepada Kedua Orang Tua',
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
      views: 2640,
      createdAt: new Date('2026-08-07T12:00:00Z'),
    },
    {
      title: 'Dzikir Pagi dan Petang: Benteng Kokoh Perlindungan Setiap Muslim',
      slug: 'dzikir-pagi-dan-petang-benteng-muslim',
      excerpt: 'Membaca dzikir ma\'tsur setiap pagi dan petang menjaga seorang hamba dari gangguan syetan, sihir, dan marabahaya.',
      content: `
<p>Rasulullah sallallahu 'alaihi wa sallam senantiasa mengajarkan para sahabat untuk merutinkan bacaan dzikir pagi dan petang sebagai tameng spiritual harian.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: scholarUser.id,
      categoryId: catMap.get('tuntunan-islam')!,
      views: 3150,
      createdAt: new Date('2026-08-05T06:00:00Z'),
    },
    {
      title: 'Adab dan Keutamaan Menuntut Ilmu Syar\'i Menurut Salafus Shalih',
      slug: 'adab-menuntut-ilmu-salafus-shalih',
      excerpt: 'Metode, ketundukan hati, dan adab penghormatan kepada guru agar keberkahan ilmu meresap dalam amal keseharian.',
      content: `
<p>Para ulama salaf mengajarkan bahwa ilmu syar'i didahului oleh adab, keikhlasan niat, dan ketekunan dalam menghadiri majelis ilmu para ulama terpercaya.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: editorUser.id,
      categoryId: catMap.get('tuntunan-islam')!,
      views: 2420,
      createdAt: new Date('2026-08-04T06:30:00Z'),
    },

    // 7. Aqidah and Tauhid
    {
      title: 'Hakikat Dua Kalimat Syahadat dan Rukun-Rukun Pemurnian Tauhid',
      slug: 'hakikat-dua-kalimat-syahadat-dan-rukun-tauhid',
      excerpt: 'Memahami konsekuensi Laa Ilaha Illallah: menafikan segala sesembahan selain Allah (An-Nafyu) dan menetapkan ibadah hanya untuk-Nya (Al-Itsbat).',
      content: `
<p>Tauhid adalah tujuan utama penciptaan jin dan manusia. Memahami rukun dan syarat syahadat merupakan pondasi mutlak yang tidak boleh diabaikan oleh setiap muslim.</p>
<div class="arabic-block bg-news-gray p-4 my-4 border-r-4 border-brass-gold text-right font-arabic text-2xl leading-loose">
وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ
</div>
<p class="italic text-sm text-outline mb-4">"Dan Aku tidak menciptakan jin dan manusia melainkan supaya mereka menyembah-Ku." (QS. Adz-Dzariyat: 56)</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: true,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: adminUser.id,
      categoryId: catMap.get('aqidah-tauhid')!,
      views: 4620,
      createdAt: new Date('2026-08-10T08:00:00Z'),
    },
    {
      title: 'Mengenal Pembagian Tauhid: Rububiyyah, Uluhiyyah, dan Asma wa Sifat',
      slug: 'mengenal-pembagian-tauhid-rububiyyah-uluhiyyah-asma-sifat',
      excerpt: 'Penjelasan tuntas berdasarkan nash-nash Al-Qur\'an dan As-Sunnah mengenai tiga cabang tauhid yang wajib diyakini.',
      content: `
<p>Para ulama Ahlussunnah menetapkan istiqra' (penelitian dalil Al-Qur'an) bahwa tauhid terbagi menjadi tiga: Tauhid Rububiyyah (keesaan perbuatan Allah), Tauhid Uluhiyyah (keesaan dalam ibadah), dan Tauhid Asma wa Sifat (keesaan dalam nama-nama dan sifat-sifat-Nya yang mulia).</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: scholarUser.id,
      categoryId: catMap.get('aqidah-tauhid')!,
      views: 3880,
      createdAt: new Date('2026-08-09T11:00:00Z'),
    },
    {
      title: 'Kajian Kitab Tauhid: Bab Takut dari Segala Bentuk Bahaya Kesyirikan',
      slug: 'kajian-kitab-tauhid-bab-takut-kesyirikan',
      excerpt: 'Syarah mendalam Syaikh Shalih Al-Fauzan tentang bahaya syirik besar dan syirik kecil yang menghapuskan pahala amal.',
      content: `
<p>Kesyirikan adalah dosa terbesar yang tidak akan diampuni bila pelakunya meninggal dunia sebelum bertaubat. Kewaspadaan atas syirik tersembunyi (riya') menjadi bagian dari ketakwaan hati.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: editorUser.id,
      categoryId: catMap.get('aqidah-tauhid')!,
      views: 3190,
      createdAt: new Date('2026-08-07T08:00:00Z'),
    },

    // 8. Opinion (Semua tentang Opini Positif & Baik tentang Saudi)
    {
      title: 'Opini: Kepemimpinan Arab Saudi dalam Menjaga Kemurnian Tauhid dan Melayani Umat Islam Sedunia',
      slug: 'opini-kepemimpinan-arab-saudi-menjaga-tauhid-pelayanan-umat',
      excerpt: 'Keberkahan keamanan, kemakmuran, dan ketenteraman yang dinikmati Kerajaan Arab Saudi berakar kuat pada penegakan aqidah Tauhid yang lurus dan khidmat ikhlas kepada Dua Kota Suci.',
      content: `
<p>Riyadh – Dalam dinamika geopolitik global dan sejarah peradaban Islam, Arab Saudi menempati kedudukan yang sangat istimewa dan tidak tergantikan. Sebagai pusat kiblat kaum muslimin di seluruh penjuru dunia, Kerajaan ini konsisten memegang teguh aqidah Salafus Shalih yang berpijak teguh pada Al-Qur'an dan Sunnah Nabi Muhammad Shallallahu 'Alaihi wa Sallam.</p>

<h3>1. Pondasi Tauhid yang Menghasilkan Stabilitas dan Keamanan</h3>
<p>Banyak pengamat dan cendekiawan dunia mengakui bahwa stabilitas luar biasa yang dirasakan jutaan warga dan jamaah haji-umrah di Saudi bukanlah kebetulan semata. Stabilitas ini merupakan buah nyata dari penerapan janji Allah Ta'ala bagi negeri yang menegakkan tauhid dan menjauhi kesyirikan.</p>

<div class="arabic-block bg-news-gray p-4 my-4 border-r-4 border-brass-gold text-right font-arabic text-2xl leading-loose">
الَّذِينَ آمَنُوا وَلَمْ يَلْبِسُوا إِيمَانَهُم بِظُلْمٍ أُولَٰئِكَ لَهُمُ الْأَمْنُ وَهُم مُّهْتَدُونَ
</div>
<p class="italic text-sm text-outline mb-4">"Orang-orang yang beriman dan tidak mencampuradukkan iman mereka dengan kezaliman (syirik), mereka itulah yang mendapat keamanan dan mereka itulah orang-orang yang mendapat petunjuk." (QS. Al-An'am: 82)</p>

<h3>2. Ketulusan Khadimul Haramain Melayani Jutaan Tamu Allah</h3>
<p>Pembangunan mega infrastruktur di Masjidil Haram Makkah dan Masjid Nabawi Madinah yang memakan biaya ratusan miliar dolar senantiasa dipersembahkan secara cuma-cuma demi kenyamanan para tamu Allah. Inilah bentuk nyata ketulusan para pemimpin Kerajaan yang pantas mendapat doa kebaikan dan apresiasi dari seluruh umat Islam dunia.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: true,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: adminUser.id,
      categoryId: catMap.get('opini')!,
      views: 5120,
      createdAt: new Date('2026-08-14T08:00:00Z'),
    },
    {
      title: 'Opini: Transformasi Vision 2030 dan Komitmen Kokoh Arab Saudi Terhadap Syariat Islam',
      slug: 'opini-transformasi-vision-2030-dan-komitmen-syariat-islam-saudi',
      excerpt: 'Modernisasi teknologi, efisiensi birokrasi, dan diversifikasi ekonomi Arab Saudi tetap berjalan selaras di bawah naungan prinsip-prinsip syariat Islam yang agung.',
      content: `
<p>Langkah progresif Arab Saudi melalui Vision 2030 membuktikan kepada dunia internasional bahwa sebuah negara Muslim dapat mencapai puncak kemajuan teknologi dan ekonomi kelas dunia tanpa mengorbankan identitas keislaman, nilai-nilai moral, dan prinsip syariatnya.</p>
<p>Digitalisasi layanan keagamaan, universitas-universitas Islam berstandar internasional di Madinah dan Riyadh, serta percetakan Mushaf Al-Qur'an Raja Fahd yang membagikan jutaan mushaf gratis ke seluruh benua menjadi bukti otentik dedikasi Kerajaan untuk peradaban Islam yang maju dan bermartabat.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: true,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: editorUser.id,
      categoryId: catMap.get('opini')!,
      views: 4580,
      createdAt: new Date('2026-08-12T11:00:00Z'),
    },
    {
      title: 'Opini: Kedermawanan KSrelief dan Diplomasi Kemanusiaan Saudi di Seluruh Penjuru Negeri Muslim',
      slug: 'opini-kedermawanan-ksrelief-dan-diplomasi-kemanusiaan-saudi',
      excerpt: 'Miliaran dolar bantuan kemanusiaan tanpa pamrih disalurkan Arab Saudi untuk meringankan penderitaan saudara-saudara seiman di Palestina, Yaman, Sudan, dan pelosok Afrika.',
      content: `
<p>Ketika banyak pihak hanya berbicara di panggung politik, Kerajaan Arab Saudi secara nyata mengirimkan ratusan pesawat kargo dan kapal bantuan yang membawa obat-obatan, makanan, dan tim medis spesialis untuk menolong korban krisis kemanusiaan di berbagai belahan bumi.</p>
<p>Melalui KSrelief, Saudi membuktikan kepedulian yang tulus terhadap ukhuwah Islamiyah dan kemanusiaan universal tanpa membedakan latar belakang sosial maupun etnis.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: scholarUser.id,
      categoryId: catMap.get('opini')!,
      views: 3840,
      createdAt: new Date('2026-08-10T14:00:00Z'),
    },
    {
      title: 'Opini: Peran Lembaga Fatwa dan Dewan Ulama Senior Saudi dalam Menjaga Stabilitas Pemikiran Umat',
      slug: 'opini-peran-dewan-ulama-senior-saudi-jaga-stabilitas-umat',
      excerpt: 'Keberadaan Hai\'ah Kibaril Ulama dan Al-Lajnah Ad-Da\'imah menjadi rujukan terpercaya yang membentengi generasi muda dari bahaya ekstremisme dan liberalisme pemikiran.',
      content: `
<p>Keberadaan para ulama terkemuka di Arab Saudi yang teguh membimbing umat dengan hikmah, kelembutan, dan dalil yang shahih telah menjaga generasi kaum muslimin dari fitnah radikalisme (khawarij) maupun pelecehan syariat (sekularisme).</p>
<p>Karya-karya ilmiah dan fatwa yang dihasilkan oleh Syaikh Bin Baz, Syaikh Al-Utsaimin, Syaikh Al-Fauzan, dan ulama lainnya menjadi warisan emas yang terus menerangi jalan kaum mukminin hingga saat ini.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1590076175571-4b5459efb08c?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: adminUser.id,
      categoryId: catMap.get('opini')!,
      views: 4190,
      createdAt: new Date('2026-08-08T15:30:00Z'),
    },

    // 9. Landasan Tauhid (Kotak Hijau Terakhir - isFixedAdvice: true)
    {
      title: 'Landasan Tauhid: Prinsip Pokok Keimanan & Fondasi Keselamatan Ahlussunnah wal Jama\'ah',
      slug: 'landasan-utama-aqidah-ahlussunnah',
      excerpt: 'Ulasan komprehensif mengenai pondasi pokok aqidah tauhid yang lurus, pemurnian ibadah dari syirik, dan pegangan teguh di atas manhaj Salafus Shalih.',
      content: `
<p>Landasan Tauhid merupakan perkara paling fundamental dalam agama Islam. Allah Subhanahu wa Ta'ala tidak menciptakan jin dan manusia, tidak menurunkan kitab-kitab suci, dan tidak mengutus para rasul melainkan untuk menegakkan satu tujuan agung: mentauhidkan Allah dalam seluruh aspek peribadatan.</p>

<div class="arabic-block bg-news-gray p-4 my-4 border-r-4 border-brass-gold text-right font-arabic text-2xl leading-loose">
وَلَقَدْ بَعَثْنَا فِي كُلِّ أُمَّةٍ رَّسُولًا أَنِ اعْبُدُوا اللَّهَ وَاجْتَنِبُوا الطَّاغُوتَ
</div>
<p class="italic text-sm text-outline mb-4">"Dan sungguhnya Kami telah mengutus rasul pada tiap-tiap umat (untuk menyerukan): Sembahlah Allah (saja), dan jauhilah Thaghut itu." (QS. An-Nahl: 36)</p>

<h3>1. Tiga Landasan Utama (Al-Ushul Ats-Tsalatsah)</h3>
<p>Setiap hamba akan ditanya di alam kubur tentang tiga hal mendasar: Mengenal Rabbnya (Allah), Mengenal Agamanya (Islam dengan dalil-dalilnya), dan Mengenal Nabinya (Muhammad Shallallahu 'Alaihi wa Sallam). Ketiganya merupakan intisari aqidah yang wajib dipelajari dan diamalkan.</p>

<h3>2. Konsekuensi Syahadat Laa Ilaha Illallah</h3>
<p>Kalimat tauhid tidak cukup diucapkan dengan lisan semata, tetapi menuntut pemahaman makna, keyakinan tanpa keraguan, keikhlasan tanpa kesyirikan, kecintaan yang mendalam, ketundukan pada hukum Allah, dan penerimaan total terhadap syariat-Nya.</p>

<h3>3. Pemurnian Ibadah dari Noda Syirik</h3>
<p>Kebaikan amalan shalat, puasa, zakat, dan haji hanya akan diterima bila dibangun di atas keikhlasan (Tauhid) dan kesesuaian dengan sunnah Nabi (Ittiba'). Inilah landasan keselamatan abadi di dunia dan akhirat.</p>
      `,
      coverImage: 'https://images.unsplash.com/photo-1590076175571-4b5459efb08c?auto=format&fit=crop&w=1200&q=80',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: true,
      status: 'PUBLISHED',
      authorId: adminUser.id,
      categoryId: catMap.get('aqidah-tauhid')!,
      views: 7890,
      createdAt: new Date('2026-08-15T08:00:00Z'),
    },
  ];

  for (const art of articlesData) {
    await prisma.article.create({ data: art });
  }

  console.log('Seeding Kajian schedules (Saudi Masyayikh & Haramain Series)...');
  await prisma.kajian.createMany({
    data: [
      {
        title: 'Daurah Ilmiyyah: Syarah Kitabut Tauhid',
        speaker: 'Syaikh Dr. Shalih bin Fauzan Al-Fauzan',
        location: 'Masjid Agung Riyadh & Live Streaming Global',
        dateTime: 'Setiap Sabtu | Ba\'da Maghrib KSA',
        topic: 'Pemurnian Aqidah & Bantahan Terhadap Syubhat Kesyirikan',
        image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80',
        isUpcoming: true,
      },
      {
        title: 'Majelis Syarah Shahih Al-Bukhari',
        speaker: 'Syaikh Prof. Dr. Abdurrazzaq bin Abdul Muhsin Al-Badr',
        location: 'Perluasan Masjid Nabawi, Madinah Al-Munawwarah',
        dateTime: 'Setiap Ahad - Kamis | Ba\'da Shubuh KSA',
        topic: 'Hadits-Hadits Iman, Adab, dan Akhlak Kenabian',
        image: 'https://images.unsplash.com/photo-1590076175571-4b5459efb08c?auto=format&fit=crop&w=800&q=80',
        isUpcoming: true,
      },
      {
        title: 'Kajian Fiqih Muamalah & Fatwa Kontemporer',
        speaker: 'Syaikh Dr. Saad bin Nashir Asy-Syatsri',
        location: 'Masjidil Haram Makkah & Siaran Resmi Haramain',
        dateTime: 'Setiap Senin & Rabu | Ba\'da Isya KSA',
        topic: 'Tinjauan Syariah Terhadap Akad & Muamalah Modern',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        isUpcoming: true,
      },
    ],
  });

  console.log('Seeding Multimedia items (ONLY Saudi Scholars / Masyayikh)...');
  await prisma.media.createMany({
    data: [
      {
        title: 'Landasan Hakiki Aqidah Ahlussunnah wal Jama\'ah',
        speaker: 'Syaikh \'Abdul \'Aziz bin \'Abdullah bin Baz',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '48:15',
        category: 'Aqidah & Tauhid',
        thumbnail: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Penjelasan Rinci Rukun Iman & Aqidah Al-Wasithiyyah',
        speaker: 'Syaikh Muhammad bin Shalih Al-\'Utsaimin',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '56:30',
        category: 'Aqidah & Tauhid',
        thumbnail: 'https://images.unsplash.com/photo-1590076175571-4b5459efb08c?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Syarah Al-Ushul Ats-Tsalatsah (Tiga Landasan Utama)',
        speaker: 'Syaikh Dr. Shalih bin Fauzan Al-Fauzan',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '42:10',
        category: 'Kajian Kitab',
        thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Kunci-Kunci Keberkahan Hidup & Kesucian Hati',
        speaker: 'Syaikh Prof. Dr. \'Abdurrazzaq bin \'Abdul Muhsin Al-Badr',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '39:45',
        category: 'Tuntunan Islam',
        thumbnail: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Kaidah-Kaidah Fiqih Muamalah Syar\'iyyah',
        speaker: 'Syaikh Dr. Saad bin Nashir Asy-Syatsri',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '45:20',
        category: 'Fatwa & Fikih',
        thumbnail: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Keagungan Syariat Islam dan Keberkahan Khidmah Haramain',
        speaker: 'Syaikh Shalih bin \'Abdul \'Aziz Alu Asy-Syaikh',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '35:10',
        category: 'Ulama & Warisan Ilmu',
        thumbnail: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=800&q=80',
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
