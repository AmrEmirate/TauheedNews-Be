import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Fetching users and categories from DB...');
  const users = await prisma.user.findMany();
  const adminUser = users.find((u) => u.role === 'ADMIN') || users[0];
  const editorUser = users.find((u) => u.email.includes('ilmiyah')) || users[1] || adminUser;
  const scholarUser = users.find((u) => u.email.includes('fatwa')) || users[2] || adminUser;

  const categories = await prisma.category.findMany();
  const catMap = new Map(categories.map((c) => [c.slug, c.id]));

  if (!catMap.has('saudi-arabia-terkini') || !catMap.has('haramain-news')) {
    console.error('Required categories not found!');
    return;
  }

  const newArticles = [
    // ==========================================
    // 1. GOVERNMENT AND POLITICS (Saudipedia) -> Saudi Arabia News
    // ==========================================
    {
      title: 'Program Pembangunan dan Rekonstruksi Saudi untuk Yaman (SDRPY)',
      slug: 'program-pembangunan-dan-rekonstruksi-saudi-untuk-yaman-sdrpy',
      excerpt: 'Program inisiatif Kerajaan Arab Saudi di bawah dekrit Raja Salman bin Abdulaziz Al Saud yang telah merealisasikan lebih dari 300 proyek pembangunan di 14 provinsi Yaman.',
      content: `
<p>Riyadh – Program Pembangunan dan Rekonstruksi Saudi untuk Yaman (<em>Saudi Development and Reconstruction Program for Yemen / SDRPY</em>) merupakan inisiatif strategis yang didirikan berdasarkan Dekrit Kerajaan oleh Khadimul Haramain Raja Salman bin Abdulaziz Al Saud pada tahun 2018.</p>

<p>Program ini bertujuan untuk memberikan bantuan ekonomi dan pembangunan komprehensif di seluruh sektor strategis bagi Republik Yaman, memulihkan infrastruktur publik, meningkatkan standar layanan esensial bagi masyarakat Yaman, serta membuka lapangan kerja produktif melalui sinergi dengan pemerintah Yaman, otoritas lokal kegubernuran, dan organisasi masyarakat sipil.</p>

<div class="arabic-block bg-news-gray p-4 my-4 border-r-4 border-brass-gold text-right font-arabic text-2xl leading-loose">
مَثَلُ الْمُؤْمِنِينَ فِي تَوَادِّهِمْ وَتَرَاحُمِهِمْ وَتَعَاطُفِهِمْ مَثَلُ الْجَسَدِ إِذَا اشْتَكَى مِنْهُ عُضْوٌ تَدَاعَى لَهُ سَائِرُ الْجَسَدِ بِالسَّهَرِ وَالْحُمَّى
</div>
<p class="italic text-sm text-outline mb-4">"Perumpamaan kaum mukmin dalam hal saling mencintai, menyayangi, dan berlemah-lembut adalah seperti satu tubuh; apabila satu anggota tubuh merasa sakit, maka seluruh anggota tubuh yang lain ikut merasakan demam dan tidak bisa tidur." (HR. Bukhari & Muslim)</p>

<h3>1. Delapan Sektor Utama Pembangunan SDRPY</h3>
<p>Sejak pertama kali diluncurkan, SDRPY telah berhasil melaksanakan lebih dari 300 proyek dan inisiatif pembangunan terpadu yang mencakup 14 provinsi di Yaman. Program ini difokuskan pada 8 pilar vital:</p>
<ul>
  <li><strong>Pendidikan:</strong> Membangun puluhan sekolah model, pusat pelatihan guru, dan mendistribusikan jutaan buku teks kurikulum serta sarana transportasi sekolah.</li>
  <li><strong>Kesehatan:</strong> Pembangunan Rumah Sakit Spesialis Al-Ghaydah, modernisasi Rumah Sakit Umum Aden, penyediaan ambulans canggih, dan pemenuhan alat medis spesialis.</li>
  <li><strong>Air Bersih & Sanitasi:</strong> Pengeboran sumur air bersih tenaga surya, pembangunan jaringan pipa distribusi, dan stasiun desalinasi untuk ratusan ribu warga.</li>
  <li><strong>Energi & Kelistrikan:</strong> Pasokan bahan bakar minyak (BBM) pembangkit listrik untuk memastikan operasional rumah sakit dan fasilitas umum berjalan stabil tanpa pemadaman.</li>
  <li><strong>Transportasi & Konektivitas:</strong> Rekonstruksi Bandara Internasional Aden, Bandara Al-Ghaydah, serta perbaikan jalur jalan penghubung antar-kegubernuran.</li>
  <li><strong>Pertanian & Perikanan:</strong> Bantuan perahu mesin modern, bibit tanaman unggul, dan rumah pendingin ikan (cold storage) bagi para nelayan dan petani Yaman.</li>
  <li><strong>Penguatan Kapasitas Pemerintahan:</strong> Digitalisasi sistem kelembagaan dan pelatihan teknis bagi aparatur sipil lokal.</li>
  <li><strong>Program Pemberdayaan Sosial Ekonomi:</strong> Pelatihan kewirausahaan bagi perempuan dan pemuda guna menumbuhkan kemandirian ekonomi pascakonflik.</li>
</ul>

<h3>2. Prinsip Kemanusiaan dan Keberlanjutan</h3>
<p>Duta Besar Arab Saudi untuk Yaman sekaligus Pengawas Umum SDRPY, Mohammed bin Saeed Al-Jaber, menegaskan bahwa Kerajaan memandang Yaman sebagai saudara serumpun dan tetangga dekat. Bantuan yang diberikan bukan bersifat darurat semata, melainkan dirancang untuk membangun kemandirian jangka panjang yang berkelanjutan.</p>
      `,
      coverImage: 'https://saudipedia.com/var/site/storage/images/4/0/2/6/3286204-1-eng-GB/1d78d573b002-165330.jpg',
      isHeadline: false,
      isFeature: true,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: adminUser.id,
      categoryId: catMap.get('saudi-arabia-terkini')!,
      views: 3820,
      createdAt: new Date('2026-08-16T09:00:00Z'),
    },
    {
      title: 'KTT Teluk–Amerika Serikat di Riyadh: Penguatan Kemitraan Strategis dan Stabilitas Kawasan',
      slug: 'ktt-teluk-amerika-serikat-riyadh-penguatan-kemitraan-strategis',
      excerpt: 'KTT Tingkat Tinggi di Riyadh yang dipimpin bersama oleh Putra Mahkota Pangeran Mohammed bin Salman dan Presiden AS menegaskan komitmen stabilitas regional dan kerjasama ekonomi.',
      content: `
<p>Riyadh – Konferensi Tingkat Tinggi (KTT) Teluk–Amerika Serikat (<em>Gulf–U.S. Summit</em>) diselenggarakan di ibu kota Riyadh atas undangan resmi dari Khadimul Haramain Raja Salman bin Abdulaziz Al Saud. Forum diplomatik prestisius ini dipimpin bersama oleh Yang Mulia Putra Mahkota sekaligus Perdana Menteri Arab Saudi, Pangeran Mohammed bin Salman bin Abdulaziz Al Saud, dan Presiden Amerika Serikat.</p>

<h3>1. Pidato Pembukaan Putra Mahkota Mohammed bin Salman</h3>
<p>Dalam pidato pembukaannya, Putra Mahkota menegaskan bahwa pertemuan ini merupakan wujud kesinambungan hubungan historis yang mendalam dan kemitraan strategis yang kokoh antara negara-negara anggota Dewan Kerjasama Teluk (GCC) dan Amerika Serikat.</p>
<p>Beliau menyampaikan bahwa aliansi strategis ini telah berkembang selama berdekade menjadi teladan kerjasama internasional, yang didasarkan pada prinsip saling menghormati, perlindungan keamanan maritim, kebebasan navigasi perdagangan internasional, dan stabilitas pasar energi dunia.</p>

<h3>2. Fokus Utama Pembahasan KTT</h3>
<p>KTT Riyadh menghasilkan konsensus komprehensif pada sejumlah agenda krusial:</p>
<ul>
  <li><strong>Keamanan Kawasan:</strong> Komitmen bersama untuk mencegah proliferasi senjata perusak massal dan menentang segala bentuk ancaman terhadap kedaulatan negara-negara kawasan Teluk.</li>
  <li><strong>Inovasi Teknologi & AI:</strong> Perluasan kemitraan dalam transfer teknologi tinggi, kecerdasan buatan, komputasi awan ramah lingkungan, dan semikonduktor.</li>
  <li><strong>Transisi Energi Bersih:</strong> Kolaborasi dalam teknologi penangkapan karbon (CCUS), hidrogen hijau, dan efisiensi energi terbarukan sejalan dengan inisiatif Saudi Green Initiative.</li>
  <li><strong>Penyelesaian Konflik Damai:</strong> Penegasan urgensi penghentian eskalasi militer di Timur Tengah dan penyelesaian damai yang adil demi masa depan generasi mendatang.</li>
</ul>
      `,
      coverImage: 'https://saudipedia.com/var/site/storage/images/5/7/9/4/34975-1-eng-GB/a541db6244ca-198315.jpg',
      isHeadline: false,
      isFeature: true,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: editorUser.id,
      categoryId: catMap.get('saudi-arabia-terkini')!,
      views: 4150,
      createdAt: new Date('2026-08-15T14:30:00Z'),
    },
    {
      title: 'Hubungan Diplomatik Saudi–Amerika Serikat: Kemitraan Strategis Sembilan Dekade Sejak 1931',
      slug: 'hubungan-diplomatik-saudi-amerika-serikat-kemitraan-strategis',
      excerpt: 'Menengok rekam jejak diplomasi Kerajaan Arab Saudi dan Amerika Serikat yang berakar sejak 1931 berlandaskan kepentingan bersama dan diversifikasi hubungan internasional.',
      content: `
<p>Riyadh – Hubungan bilateral antara Kerajaan Arab Saudi dan Amerika Serikat mencatatkan sejarah panjang diplomasi modern yang bermula pada tahun 1931, ketika eksplorasi dan produksi minyak komersial pertama kali dirintis di tanah Semenanjung Arab.</p>

<p>Kerjasama diplomatik ini dibangun selaras dengan prinsip politik luar negeri Arab Saudi yang independen, mengedepankan kepentingan nasional, memelihara stabilitas global, dan memperluas jalinan kemitraan yang saling menguntungkan.</p>

<h3>1. Tonggak Sejarah Pertemuan USS Quincy 1945</h3>
<p>Salah satu momen paling bersejarah dalam diplomasi dunia abad ke-20 terjadi pada 14 Februari 1945, saat Pendiri Kerajaan Arab Saudi Modern, Raja Abdulaziz Al Saud rahimahullah, bertemu dengan Presiden AS Franklin D. Roosevelt di atas kapal penjelajah USS Quincy di Terusan Suez.</p>
<p>Pertemuan monumental tersebut meletakkan landasan kemitraan abadi yang mencakup keamanan kawasan, perdagangan internasional, dan stabilitas geopolitik global.</p>

<h3>2. Pilar Kemitraan Abad ke-21</h3>
<p>Memasuki era transformasi Vision 2030, hubungan kedua negara kian meluas ke berbagai bidang mutakhir:</p>
<ul>
  <li>Investasi strategis bersama di bidang antariksa, kedokteran genetika, dan kecerdasan buatan.</li>
  <li>Pertukaran ribuan mahasiswa beasiswa Saudi yang menuntut ilmu di universitas riset terbaik Amerika Serikat melalui Program Beasiswa Raja Salman.</li>
  <li>Kerjasama keamanan internasional dalam memerangi pendanaan terorisme dan menjaga stabilitas rute perdagangan maritim Laut Merah dan Teluk Arab.</li>
</ul>
      `,
      coverImage: 'https://saudipedia.com/var/site/storage/images/0/9/6/1/61690-1-eng-GB/83234ff186a8-198057.jpg',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: adminUser.id,
      categoryId: catMap.get('saudi-arabia-terkini')!,
      views: 3290,
      createdAt: new Date('2026-08-14T11:00:00Z'),
    },
    {
      title: 'Standarisasi Ujian Masuk Perguruan Tinggi di Arab Saudi: Sistem Seleksi Terpadu Qiyas',
      slug: 'standarisasi-ujian-masuk-perguruan-tinggi-arab-saudi-qiyas',
      excerpt: 'Pusat Penilaian Nasional (Qiyas) menyelenggarakan evaluasi akademik standar untuk mengukur potensi dan bakat skolastik calon mahasiswa secara objektif dan transparan.',
      content: `
<p>Riyadh – Sistem seleksi penerimaan mahasiswa baru di perguruan tinggi Kerajaan Arab Saudi mengadopsi standar penilaian modern terstandarisasi yang dikelola oleh Pusat Penilaian Nasional (<em>National Center for Assessment / Qiyas</em>), sebuah lembaga di bawah naungan Komisi Evaluasi Pendidikan dan Pelatihan (ETEC).</p>

<p>Sistem ini dirancang untuk memberikan kesempatan yang adil, transparan, dan objektif bagi seluruh lulusan sekolah menengah atas dalam memilih jurusan dan universitas yang sesuai dengan minat dan potensi intelektual mereka.</p>

<h3>1. Empat Instrumen Ujian Utama Qiyas</h3>
<p>Pusat Penilaian Nasional menyelenggarakan empat jenis tes terstandarisasi:</p>
<ul>
  <li><strong>GAT (General Aptitude Test / Tes Bakat Skolastik):</strong> Mengukur kemampuan nalar analitis, penalaran kuantitatif (matematika), dan pemahaman verbal bahasa.</li>
  <li><strong>SAAT (Scholastic Achievement Admission Test / Tes Prestasi Akademik):</strong> Menguji penguasaan materi inti kurikulum sains (Biologi, Kimia, Fisika, Matematika) dan ilmu sosial keagamaan.</li>
  <li><strong>STEP (Standardized Test of English Proficiency):</strong> Mengukur kemahiran bahasa Inggris berstandar CEFR internasional bagi program studi kedokteran dan teknik.</li>
  <li><strong>Post-Graduate General Aptitude Test:</strong> Evaluasi kemampuan analitis tingkat lanjut bagi calon mahasiswa magister dan doktoral.</li>
</ul>

<h3>2. Digitalisasi dan Aksesibilitas Nasional</h3>
<p>Seluruh proses pendaftaran, simulasi latihan, hingga pengumuman skor terintegrasi dalam platform digital terpadu yang dapat diakses dari seluruh penjuru Kerajaan, didukung oleh ratusan pusat tes komputerisasi (CBT) yang memenuhi standar keamanan integritas ujian internasional.</p>
      `,
      coverImage: 'https://saudipedia.com/var/site/storage/images/8/9/2/0/210298-1-eng-GB/3047eca9495d-184240.jpg',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: scholarUser.id,
      categoryId: catMap.get('saudi-arabia-terkini')!,
      views: 2980,
      createdAt: new Date('2026-08-13T16:00:00Z'),
    },
    {
      title: 'Pengembangan Pendidikan Bahasa Mandarin di Sekolah dan Universitas Arab Saudi',
      slug: 'pendidikan-bahasa-mandarin-sekolah-dan-universitas-arab-saudi',
      excerpt: 'Langkah strategis Arab Saudi mengintegrasikan bahasa Mandarin ke dalam kurikulum pendidikan nasional guna memperluas daya saing global generasi muda.',
      content: `
<p>Riyadh – Integrasi pembelajaran bahasa Mandarin ke dalam kurikulum sekolah dan universitas di Kerajaan Arab Saudi merupakan salah satu proyek pendidikan visioner yang diluncurkan atas arahan Yang Mulia Putra Mahkota dan Perdana Menteri, Pangeran Mohammed bin Salman bin Abdulaziz Al Saud, menyusul kunjungan kenegaraan resmi ke Tiongkok pada Februari 2019.</p>

<h3>1. Visi Strategis dan Peluang Global</h3>
<p>Keputusan strategis ini bertujuan untuk memperkuat jembatan kebudayaan dan ekonomi antara bangsa Arab dan Tiongkok, membuka peluang karir global bagi pemuda Saudi, serta memfasilitasi transfer ilmu pengetahuan di bidang teknologi, manufaktur maju, dan riset sains terapan.</p>

<h3>2. Tahapan Implementasi Kurikulum</h3>
<p>Kementerian Pendidikan Arab Saudi telah merancang tahapan implementasi yang terukur:</p>
<ul>
  <li>Pemberangkatan ratusan guru dan dosen Saudi untuk menempuh program sertifikasi pengajaran bahasa Mandarin di universitas terkemuka Beijing dan Shanghai.</li>
  <li>Pembentukan Departemen Bahasa dan Sastra Tiongkok di King Saud University, King Abdulaziz University, dan Princess Nourah University.</li>
  <li>Penyusunan modul pembelajaran interaktif yang disesuaikan dengan nilai-nilai budaya dan kearifan lokal Arab Saudi.</li>
</ul>
<p>Langkah ini menempatkan Arab Saudi sebagai pionir di kawasan Timur Tengah dalam diversifikasi kompetensi bahasa asing bagi generasi masa depan.</p>
      `,
      coverImage: 'https://saudipedia.com/var/site/storage/images/6/0/7/1/231706-1-eng-GB/b776549340d4-184289.jpg',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: editorUser.id,
      categoryId: catMap.get('saudi-arabia-terkini')!,
      views: 3100,
      createdAt: new Date('2026-08-12T13:00:00Z'),
    },
    {
      title: 'Regulasi Kota Medis dan Rumah Sakit Spesialis Kementerian Kesehatan Arab Saudi',
      slug: 'regulasi-kota-medis-dan-rumah-sakit-spesialis-kemenkes-saudi',
      excerpt: 'Kerangka hukum yang disahkan Dewan Menteri Arab Saudi untuk tata kelola kota medis dan rumah sakit rujukan spesialis berstandar internasional.',
      content: `
<p>Riyadh – Regulasi Kota Medis dan Rumah Sakit Spesialis yang bernaung di bawah Kementerian Kesehatan Kerajaan Arab Saudi disahkan melalui keputusan Dewan Menteri pada 24 Maret 2014, terdiri dari 12 pasal komprehensif yang mengatur tata kelola sistemik layanan kesehatan rujukan tersier.</p>

<h3>1. Tujuan dan Ruang Lingkup Regulasi</h3>
<p>Regulasi ini dirancang untuk memberikan fleksibilitas manajerial dan operasional bagi institusi medis terkemuka di Saudi, seperti King Fahad Medical City di Riyadh, King Abdullah Medical City di Makkah, King Fahd Specialist Hospital di Dammam, dan King Faisal Specialist Hospital & Research Centre.</p>

<h3>2. Standar Akreditasi dan Keunggulan Klinis</h3>
<p>Poin-poin fundamental dalam regulasi ini meliputi:</p>
<ul>
  <li>Pemberian otonomi tata kelola kepada dewan direksi untuk merumuskan kebijakan medis berbasis bukti (<em>evidence-based medicine</em>).</li>
  <li>Penyediaan anggaran riset biomedis, transplantasi organ, onkologi modern, dan bedah robotik presisi tinggi.</li>
  <li>Kewajiban pemenuhan akreditasi mutu internasional (JCI dan CBAHI) guna menjamin keselamatan pasien dan kepuasan pelayanan.</li>
  <li>Pemberian layanan medis komprehensif secara cuma-cuma bagi warga negara dan jamaah haji-umrah yang membutuhkan tindakan darurat.</li>
</ul>
      `,
      coverImage: 'https://saudipedia.com/var/site/storage/images/4/9/0/0/270094-1-eng-GB/1bf61dd82815-177470.jpg',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: adminUser.id,
      categoryId: catMap.get('saudi-arabia-terkini')!,
      views: 2870,
      createdAt: new Date('2026-08-11T10:00:00Z'),
    },

    // ==========================================
    // 2. HAJJ AND UMRAH (Saudipedia) -> Haramain News (Berita Haramain)
    // ==========================================
    {
      title: 'Mengenal Miqat Dhu al-Hulayfah (Abar Ali): Titik Awal Ihram Jamaah dari Madinah Menuju Makkah',
      slug: 'mengenal-miqat-dhu-al-hulayfah-abar-ali-ihram-madinah',
      excerpt: 'Miqat tempat Rasulullah SAW memulai ihram saat Haji Wada\'. Terletak 433 km dari Makkah dan 14 km dari Masjid Nabawi dengan kompleks masjid megah berkapasitas 5.000 jamaah.',
      content: `
<p>Madinah Al-Munawwarah – <strong>Miqat Dhu al-Hulayfah</strong>, yang populer dikenal masyarakat dengan sebutan <em>'Abar Ali'</em>, merupakan salah satu dari mawaqit makani utama yang ditetapkan secara syar'i bagi siapa pun yang hendak memasuki Makkah Al-Mukarramah untuk menunaikan ibadah haji atau umrah.</p>

<p>Miqat ini dikhususkan bagi penduduk Madinah Al-Munawwarah serta seluruh jamaah peziarah yang menempuh rute perjalanan melewati kota Nabi Shallallahu 'Alaihi wa Sallam.</p>

<div class="arabic-block bg-news-gray p-4 my-4 border-r-4 border-brass-gold text-right font-arabic text-2xl leading-loose">
وَأَتِمُّوا الْحَجَّ وَالْعُمْرَةَ لِلَّهِ
</div>
<p class="italic text-sm text-outline mb-4">"Dan sempurnakanlah ibadah haji dan 'umrah karena Allah." (QS. Al-Baqarah: 196)</p>

<h3>1. Sejarah Penamaan dan Keutamaan Tempat</h3>
<ul>
  <li><strong>Dhu al-Hulayfah:</strong> Dinamai demikian karena pada masa lampau kawasan tersebut banyak ditumbuhi pohon <em>al-Hulaf</em> (Elaeagnus).</li>
  <li><strong>Masjid Asy-Syajarah (Masjid Pohon):</strong> Dinamakan demikian karena Rasulullah Shallallahu 'Alaihi wa Sallam berteduh di bawah sebatang pohon di tempat ini ketika berniat ihram saat Umrah Hudaibiyah, Umrah Qadha', dan Haji Wada'.</li>
  <li><strong>'Abar Ali:</strong> Merujuk pada peristiwa saat Amirul Mukminin Ali bin Abi Thalib radhiyallahu 'anhu singgah dan memerintahkan penggalian sumur air bersih untuk melayani para musafir dan jamaah haji.</li>
</ul>

<h3>2. Letak Geografis dan Arsitektur Megah</h3>
<p>Masjid Miqat Dhu al-Hulayfah berdiri megah di sisi barat Lembah Al-Aqiq yang penuh berkah (<em>Wadi Al-Aqiq Al-Mubarak</em>) pada ketinggian 640 meter di atas permukaan laut. Jaraknya sekitar 14 kilometer di barat daya Masjid Nabawi dan sekitar 433 kilometer di utara Masjidil Haram Makkah.</p>

<p>Pemerintah Kerajaan Arab Saudi telah merenovasi total kompleks miqat ini menjadi mahakarya arsitektur Islam seluas lebih dari 178.000 meter persegi, dilengkapi taman kurma asri, menara setinggi 64 meter, kapasitas shalat 5.000 jamaah, 512 unit kamar mandi, serta 566 titik tempat wudhu modern yang mampu melayani puluhan ribu jamaah setiap harinya.</p>
      `,
      coverImage: 'https://saudipedia.com/var/site/storage/images/0/5/4/3/493450-1-eng-GB/d92833768c97-128509.jpg',
      isHeadline: false,
      isFeature: true,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: scholarUser.id,
      categoryId: catMap.get('haramain-news')!,
      views: 5210,
      createdAt: new Date('2026-08-16T12:00:00Z'),
    },
    {
      title: 'Mengenal Miqat Dhat \'Irq: Titik Awal Ihram Jalur Bersejarah Taif dan Arah Timur Laut',
      slug: 'mengenal-miqat-dhat-irq-titik-ihram-jalur-taif',
      excerpt: 'Salah satu mawaqit syar\'i yang ditetapkan bagi penduduk Iraq dan kawasan timur laut, terletak 90 km timur laut Makkah di jalur bersejarah Taif.',
      content: `
<p>Taif – <strong>Miqat Dhat 'Irq</strong> merupakan salah satu lokasi miqat makani yang ditetapkan bagi kaum muslimin yang hendak memasuki Makkah Al-Mukarramah untuk melaksanakan manasik haji maupun umrah. Miqat ini diperuntukkan bagi penduduk Iraq, wilayah utara dan timur laut Jazirah Arab, serta siapa saja yang melalui jalurnya.</p>

<h3>1. Ketetapan Sunnah dan Dalil Syar'i</h3>
<p>Penetapan Dhat 'Irq memiliki landasan kuat dalam hadits Nabi Shallallahu 'Alaihi wa Sallam dan ijtihad Amirul Mukminin Umar bin Khattab radhiyallahu 'anhu saat wilayah Iraq dan Persia ditaklukkan oleh kaum muslimin. Ketika penduduk Kufah dan Bashrah mengadu bahwa rute Qarnul Manazil terlalu jauh dari jalur perjalanan mereka, Umar radhiyallahu 'anhu menetapkan Dhat 'Irq yang posisinya sejajar (<em>muhadzah</em>).</p>

<p>Nama *Dhat 'Irq* diambil dari sebuah bukit kecil (*'irq*) yang membentang di wilayah tersebut.</p>

<h3>2. Rekonstruksi Fasilitas Modern oleh Kerajaan Saudi</h3>
<p>Terletak di rute ziarah bersejarah di Kegubernuran Taif, sekitar 90 kilometer di timur laut Masjidil Haram Makkah, situs Miqat Dhat 'Irq telah dibangun kembali secara komprehensif oleh Kementerian Urusan Islam, Dakwah, dan Bimbingan Arab Saudi.</p>
<p>Fasilitas ini mencakup bangunan masjid utama bertingkat dua, area wudhu higienis, sistem pendingin udara terpusat, area parkir bus kapasitas besar, posko kesehatan darurat, dan pusat distribusi panduan manasik haji multibahasa.</p>
      `,
      coverImage: 'https://saudipedia.com/var/site/storage/images/0/5/4/0/490450-1-eng-GB/b77cdebbbcca-128511.jpg',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: scholarUser.id,
      categoryId: catMap.get('haramain-news')!,
      views: 3940,
      createdAt: new Date('2026-08-15T10:00:00Z'),
    },
    {
      title: 'Mengenal Miqat Wadi Muharram: Jalur Miqat Utama Dataran Tinggi Al-Hada Menuju Baitullah',
      slug: 'mengenal-miqat-wadi-muharram-jalur-utama-peziarah',
      excerpt: 'Miqat yang terletak di kawasan sejuk Al-Hada Taif, berfungsi sebagai miqat atas bagi jamaah yang melintasi jalur pegunungan menuju Baitullah.',
      content: `
<p>Taif – <strong>Miqat Wadi Muharram</strong> merupakan salah satu miqat yang ditetapkan bagi mereka yang bermaksud menuju Makkah Al-Mukarramah guna melaksanakan ibadah haji atau umrah. Berlokasi strategis di kawasan Pusat Al-Hada, barat laut Kegubernuran Taif, sekitar 15 kilometer dari pusat kota Taif.</p>

<h3>1. Kedudukan Syar'i sebagai Miqat Atas Qarnul Manazil</h3>
<p>Secara geografis dan syar'i, Wadi Muharram berfungsi sebagai miqat bagian atas (<em>al-miqat al-a'la</em>) bagi jalur pegunungan yang sejajar dengan Wadi Qarn al-Manazil (As-Sail Al-Kabir) di lembah bagian bawah.</p>
<p>Miqat ini terutama melayani para peziarah yang datang dari kota Taif, kawasan dataran tinggi Asir, wilayah selatan Kerajaan, serta wisatawan peziarah yang melintasi jalur pegunungan indah Al-Hada Road (Kara Mountain Highway).</p>

<h3>2. Fasilitas Pelayanan Terpadu</h3>
<p>Kompleks Masjid Miqat Wadi Muharram didesain dengan arsitektur khas pegunungan bernuansa batu alam dan ornamen Islam kontemporer. Fasilitas pendukung meliputi ruang shalat yang lapang, ratusan bilik mandi air hangat, fasilitas wudhu ramah difabel, toko pakaian ihram dan perlengkapan safar, serta layanan transportasi shuttle terpadu menuju Makkah.</p>
      `,
      coverImage: 'https://saudipedia.com/var/site/storage/images/9/9/1/9/489199-1-eng-GB/c3ef01ec3e97-128515.jpg',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: editorUser.id,
      categoryId: catMap.get('haramain-news')!,
      views: 3670,
      createdAt: new Date('2026-08-14T07:30:00Z'),
    },
    {
      title: 'Mengenal Miqat Yalamlam (As-Sa\'diyah): Pintu Masuk Ihram Bagi Jamaah Pesisir Selatan dan Yaman',
      slug: 'mengenal-miqat-yalamlam-pintu-ihram-selatan-saudi',
      excerpt: 'Terletak di Kegubernuran Al-Lith sekitar 85 km barat daya Makkah, Miqat Yalamlam melayani jamaah haji dan umrah dari arah Yaman dan jalur pesisir selatan Laut Merah.',
      content: `
<p>Al-Lith – <strong>Miqat Yalamlam</strong> (atau dikenal juga sebagai <em>As-Sa'diyah</em>) adalah salah satu dari lima miqat makani yang ditetapkan langsung melalui sabda Rasulullah Shallallahu 'Alaihi wa Sallam bagi kaum muslimin yang berniat ihram haji atau umrah.</p>

<div class="arabic-block bg-news-gray p-4 my-4 border-r-4 border-brass-gold text-right font-arabic text-2xl leading-loose">
هُنَّ لَهُنَّ وَلِمَنْ أَتَى عَلَيْهِنَّ مِنْ غَيْرِهِنَّ مِمَّنْ أَرَادَ الْحَجَّ وَالْعُمْرَةَ
</div>
<p class="italic text-sm text-outline mb-4">"Tempat-tempat miqat itu adalah bagi penduduk masing-masing kota tersebut dan bagi orang-orang yang melewatinya yang bukan dari penduduknya, yang berniat menunaikan haji dan 'umrah." (HR. Bukhari & Muslim)</p>

<h3>1. Posisi Geografis di Jalur Pantai Barat</h3>
<p>Miqat Yalamlam berada di Kegubernuran Al-Lith, Provinsi Makkah, sekitar 85 kilometer di sebelah barat daya Makkah Al-Mukarramah di sepanjang jalan raya pesisir pantai Laut Merah. Miqat ini melayani jamaah yang datang dari Yaman, provinsi selatan Arab Saudi (Jazan, Najran, Asir pesisir), serta jamaah penerbangan dan pelayaran laut dari Asia Selatan dan Afrika yang melintasi garis sejajar Yalamlam.</p>

<h3>2. Infrastruktur Pelayanan Modern</h3>
<p>Kompleks Miqat Yalamlam telah dilengkapi dengan Masjid Jami' As-Sa'diyah seluas lebih dari 10.000 meter persegi, pasokan air bersih melimpah dari stasiun desalinasi terdekat, stasiun pengisian kendaraan listrik, fasilitas sanitasi terpadu, dan pos layanan bimbingan ibadah Kementerian Haji dan Umrah.</p>
      `,
      coverImage: 'https://saudipedia.com/var/site/storage/images/7/2/4/2/492427-1-eng-GB/c57b5838ec0a-128517.jpg',
      isHeadline: false,
      isFeature: false,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: scholarUser.id,
      categoryId: catMap.get('haramain-news')!,
      views: 4020,
      createdAt: new Date('2026-08-13T08:00:00Z'),
    },
    {
      title: 'Sistem Manajemen Kerumunan (Crowd Management) Canggih Arab Saudi pada Musim Haji dan Umrah',
      slug: 'sistem-manajemen-kerumunan-canggih-saudi-musim-haji-umrah',
      excerpt: 'Model percontohan global pengelolaan jutaan manusia melalui integrasi kecerdasan buatan (AI), pusat komando terpadu 911, dan pembagian jalur dinamis di Masjidil Haram & Masya\'ir Muqaddasah.',
      content: `
<p>Makkah Al-Mukarramah – Sistem Manajemen Kerumunan (<em>Crowd Management</em>) selama musim Haji dan Umrah merupakan rangkaian ekosistem teknologi cerdas, rekayasa spasial, dan koordinasi operasional tingkat tinggi yang dikembangkan oleh Kerajaan Arab Saudi untuk mengelola jutaan manusia sebelum, selama, dan setelah pelaksanaan rukun ibadah.</p>

<p>Keahlian puluhan tahun dalam menangani konsentrasi massa terbesar di dunia ini telah menjadikan Arab Saudi sebagai rujukan global dalam studi sains manajemen kerumunan internasional.</p>

<h3>1. Integrasi Antar-Lembaga Negara</h3>
<p>Manajemen kerumunan dijalankan secara sinergis oleh berbagai pilar utama Kerajaan:</p>
<ul>
  <li><strong>Pasukan Khusus Keamanan Haji dan Umrah (Kemendagri):</strong> Mengatur arus pergerakan jamaah, mencegah penumpukan di pintu-pintu masuk, dan menjaga koridor darurat.</li>
  <li><strong>Otoritas Umum Urusan Dua Masjid Suci:</strong> Mengoperasikan sensor densitas lantai mataf, eskalator cerdas, dan pembagian zona shalat berbasis warna.</li>
  <li><strong>Pusat Operasi Keamanan Terpadu (911):</strong> Memonitor ribuan kamera pengawas resolusi tinggi yang dilengkapi algoritma AI penghitung kepadatan massa secara *real-time*.</li>
  <li><strong>Kementerian Kesehatan:</strong> Menyiagakan posko medis bergerak, helikopter ambulans, dan rumah sakit lapangan di titik-titik krusial Mina, Arafah, dan Muzdalifah.</li>
</ul>

<h3>2. Rekayasa Alur Jamaah di Jamarat dan Al-Mashaer</h3>
<p>Salah satu bukti keberhasilan rekayasa kerumunan adalah Jembatan Jamarat multi-lantai (5 level) yang mampu menampung hingga 300.000 jamaah per jam untuk melempar jumrah tanpa desak-desakan, didukung oleh jalur satu arah yang ketat dan jadwal lempar jumrah digital (*tafwij*) yang disesuaikan dengan negara asal jamaah.</p>
      `,
      coverImage: 'https://saudipedia.com/var/site/storage/images/3/6/2/8/698263-1-eng-GB/dda0367d552b-95590.jpg',
      isHeadline: false,
      isFeature: true,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: adminUser.id,
      categoryId: catMap.get('haramain-news')!,
      views: 4890,
      createdAt: new Date('2026-08-12T15:00:00Z'),
    },
    {
      title: 'Konferensi & Pameran Layanan Haji dan Umrah: Inovasi Khidmah Paripurna Tamu Allah',
      slug: 'konferensi-pameran-layanan-haji-dan-umrah-inovasi-pelayanan',
      excerpt: 'Forum internasional tahunan inisiasi Kementerian Haji dan Umrah serta Pilgrim Experience Program (Vision 2030) untuk meningkatkan mutu pelayanan dan kenyamanan para tamu Allah.',
      content: `
<p>Jeddah – <strong>Konferensi dan Pameran Layanan Haji dan Umrah</strong> (<em>Hajj and Umrah Services Conference and Exhibition</em>) merupakan perhelatan akbar tahunan yang diselenggarakan oleh Kementerian Haji dan Umrah Arab Saudi berkolaborasi dengan Program Pengalaman Jamaah Haji (<em>Pilgrim Experience Program</em>), salah satu program realisasi Saudi Vision 2030.</p>

<p>Ajang internasional ini mempertemukan para menteri agama, duta besar, penyedia jasa akomodasi, katering, transportasi penerbangan, perbankan, dan pengembang teknologi dari lebih dari 80 negara di dunia.</p>

<h3>1. Menuju Transformasi Digital dan Inovasi Pelayanan</h3>
<p>Sejak pertama kali diluncurkan di "Jeddah Superdome" dengan tajuk <em>"Transitioning Towards Innovation"</em>, konferensi ini menjadi ajang peluncuran berbagai inisiatif terobosan:</p>
<ul>
  <li><strong>Ekosistem Aplikasi Nusuk:</strong> Platform digital resmi terintegrasi yang memudahkan pengurusan visa umrah mandiri, izin raudhah, dan paket manasik interaktif.</li>
  <li><strong>Standarisasi Kualitas Akomodasi:</strong> Sertifikasi hotel bintang lima di sekitar Masjidil Haram dan Nabawi, serta tenda ber-AC tahan api dengan konsep modular modern di Mina.</li>
  <li><strong>Pemberdayaan Katering Higienis:</strong> Penyediaan menu makanan bernutrisi tinggi dengan cita rasa khas masing-masing negara asal jamaah, termasuk menu nusantara.</li>
  <li><strong>Inisiatif Koper Cerdas & Bagasi Terpadu:</strong> Layanan pengantaran bagasi jamaah langsung dari bandara ke kamar hotel tanpa antre di terminal kedatangan.</li>
</ul>

<h3>2. Komitmen Khadimul Haramain Melayani Umat</h3>
<p>Menteri Haji dan Umrah menegaskan bahwa konferensi ini mencerminkan komitmen tulus kepemimpinan Kerajaan Arab Saudi dalam memberikan pelayanan terbaik, memuliakan para tamu Allah, dan mewujudkan perjalanan ibadah yang aman, khusyuk, dan membekas di hati setiap muslim.</p>
      `,
      coverImage: 'https://saudipedia.com/var/site/storage/images/4/6/6/1/1131664-1-eng-GB/de4f6fbf9c85-103508.jpg',
      isHeadline: false,
      isFeature: true,
      isFixedAdvice: false,
      status: 'PUBLISHED',
      authorId: editorUser.id,
      categoryId: catMap.get('haramain-news')!,
      views: 4560,
      createdAt: new Date('2026-08-11T16:30:00Z'),
    },
  ];

  console.log(`Adding ${newArticles.length} new articles to database...`);
  let addedCount = 0;
  let skippedCount = 0;

  for (const artData of newArticles) {
    const existing = await prisma.article.findUnique({
      where: { slug: artData.slug },
    });

    if (existing) {
      console.log(`Article already exists, skipping: "${artData.title}" (${artData.slug})`);
      skippedCount++;
    } else {
      const created = await prisma.article.create({
        data: artData,
      });
      console.log(`Created article [ID:${created.id}]: "${created.title}"`);
      addedCount++;
    }
  }

  console.log(`Articles import summary: ${addedCount} added, ${skippedCount} skipped.`);

  console.log('Generating auto-translations (EN & AR) for untranslated articles...');
  try {
    const { translateAllUntranslated } = await import('../src/lib/translate');
    const result = await translateAllUntranslated();
    console.log(`Translation results: ${result.translated} translated, ${result.failed} failed out of ${result.total} total.`);
  } catch (err) {
    console.error('Translation error:', err);
  }

  const finalCount = await prisma.article.count();
  console.log(`Total articles in DB now: ${finalCount}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
