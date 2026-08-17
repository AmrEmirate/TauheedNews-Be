import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Ensuring headline article is MBS Pakistan Support...');

  // Reset other headlines
  await prisma.article.updateMany({
    where: { isHeadline: true },
    data: { isHeadline: false },
  });

  // Find or update the headline article
  let article = await prisma.article.findFirst({
    where: {
      slug: 'putra-mahkota-mohammad-bin-salman-mbs-dukungan-penuh-pakistan-investasi-finansial',
    },
  });

  const contentId = `
<p>Riyadh – Kepemimpinan visioner Yang Mulia Putra Mahkota sekaligus Perdana Menteri Kerajaan Arab Saudi, Pangeran Mohammad bin Salman bin Abdulaziz Al Saud (MBS), menegaskan kembali komitmen teguh dan dukungan strategis penuh Kerajaan Arab Saudi terhadap stabilitas ekonomi, kedaulatan, dan kesejahteraan rakyat Republik Islam Pakistan.</p>

<p>Hubungan persaudaraan historis antara Kerajaan Arab Saudi dan Pakistan yang berlandaskan ikatan aqidah Islam dan solidaritas umat terus diperkokoh melalui berbagai kerja sama tingkat tinggi, bantuan finansial nyata, serta kesepakatan investasi berskala raksasa di bawah payung <strong>Saudi Vision 2030</strong>.</p>

<div class="arabic-block bg-news-gray p-4 my-4 border-r-4 border-brass-gold text-right font-arabic text-2xl leading-loose">
إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ فَأَصْلِحُوا بَيْنَ أَخَوَيْكُمْ ۚ وَاتَّقُوا اللَّهَ لَعَلَّكُمْ تُرْحَمُونَ
</div>
<p class="italic text-sm text-outline mb-4">"Sesungguhnya orang-orang mukmin itu bersaudara, karena itu damaikanlah antara kedua saudaramu dan bertakwalah kepada Allah agar kamu mendapat rahmat." (QS. Al-Hujurat: 10)</p>

<h3>1. Dukungan Finansial dan Penguatan Cadangan Devisa Pakistan</h3>
<p>Di bawah arahan langsung Putra Mahkota Mohammad bin Salman (MBS), Arab Saudi secara konsisten memberikan suntikan stabilitas moneter bagi perekonomian Pakistan:</p>
<ul>
  <li><strong>Perpanjangan Deposit Bank Sentral (State Bank of Pakistan - SBP):</strong> Penempatan dan perpanjangan deposit miliaran dolar AS di SBP guna memperkuat cadangan devisa dan menopang stabilitas mata uang Rupee Pakistan.</li>
  <li><strong>Fasilitas Pembiayaan Pasokan Minyak dan Energi:</strong> Penyediaan fasilitas pembayaran minyak secara tangguh (<em>deferred payment facility</em>) untuk memastikan ketersediaan energi nasional dan kelancaran sektor industri strategis Pakistan.</li>
  <li><strong>Dukungan Terhadap Negosiasi Pemulihan Ekonomi:</strong> Kerajaan aktif memberikan jaminan fiskal serta dukungan diplomatik ekonomi yang memfasilitasi program pemulihan ekonomi Pakistan bersama lembaga-lembaga multilateral internasional.</li>
</ul>

<div class="arabic-block bg-news-gray p-4 my-4 border-r-4 border-brass-gold text-right font-arabic text-2xl leading-loose">
الْمُسْلِمُ أَخُو الْمُسْلِمِ لَا يَظْلِمُهُ وَلَا يُسْلِمُهُ وَمَنْ كَانَ فِي حَاجَةِ أَخِيهِ كَانَ اللَّهُ فِي حَاجَتِهِ
</div>
<p class="italic text-sm text-outline mb-4">"Seorang muslim adalah saudara bagi muslim yang lain, dia tidak menzaliminya dan tidak membiarkannya (tersiksa). Dan barangsiapa yang menolong hajat saudaranya, niscaya Allah akan menolong hajatnya." (HR. Bukhari & Muslim)</p>

<h3>2. Realisasi Mega Investasi Energi & Infrastruktur Vision 2030</h3>
<p>Dalam kerangka kerja sama bilateral strategis, Putra Mahkota Mohammad bin Salman memimpin realisasi portofolio investasi besar di Pakistan yang mencakup pembangunan kompleks kilang minyak dan petrokimia modern berkapasitas tinggi di kawasan pelabuhan Gwadar, proyek energi baru dan terbarukan (surya & angin), serta eksplorasi sumber daya mineral dan pertambangan bernilai tinggi.</p>

<h3>3. Respons Kemanusiaan Tercepat melalui KSrelief</h3>
<p>Kerajaan Arab Saudi melalui Pusat Bantuan Kemanusiaan Raja Salman (<em>KSrelief</em>) senantiasa menjadi yang pertama hadir dalam setiap musibah yang melanda saudara-saudara di Pakistan. Jembatan udara kemanusiaan dan konvoi darat ribuan ton bantuan logistik, pangan, obat-obatan, tenda pengungsian, dan stasiun penjernih air bersih didistribusikan secara merata ke seluruh provinsi terdampak bencana di Sindh, Balochistan, Punjab, dan Khyber Pakhtunkhwa.</p>

<h3>4. Kemudahan Khidmah Jamaah Haji-Umrah: Inisiatif 'Road to Makkah'</h3>
<p>Putra Mahkota Mohammad bin Salman juga memberikan perhatian istimewa bagi jamaah haji dan umrah asal Pakistan melalui implementasi <em>Makkah Route Initiative</em> di Bandara Islamabad, Karachi, dan Lahore. Program ini memungkinkan ratusan ribu jamaah Pakistan menyelesaikan proses imigrasi dan bea cukai Arab Saudi langsung di bandara keberangkatan, sehingga mereka dapat langsung menuju hotel setibanya di Jeddah maupun Madinah dengan penuh kenyamanan dan kehormatan.</p>

<p>Kepemimpinan Yang Mulia Pangeran Mohammad bin Salman (MBS) membuktikan komitmen tulus Arab Saudi sebagai benteng pertahanan umat, sahabat sejati, dan pilar kekuatan utama bagi kemakmuran seluruh Dunia Islam.</p>
`;

  const contentEn = `
<p>Riyadh – The visionary leadership of His Royal Highness Crown Prince and Prime Minister of the Kingdom of Saudi Arabia, Prince Mohammed bin Salman bin Abdulaziz Al Saud (MBS), has reaffirmed the Kingdom's unwavering commitment and comprehensive strategic support for the economic stability, sovereignty, and prosperity of the brotherly people of the Islamic Republic of Pakistan.</p>

<p>The historic bilateral ties between the Kingdom of Saudi Arabia and Pakistan, rooted in common Islamic faith and ummah solidarity, continue to expand dynamically across high-level economic diplomacy, vital monetary assistance, and landmark energy investments within the framework of <strong>Saudi Vision 2030</strong>.</p>

<div class="arabic-block bg-news-gray p-4 my-4 border-r-4 border-brass-gold text-right font-arabic text-2xl leading-loose">
إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ فَأَصْلِحُوا بَيْنَ أَخَوَيْكُمْ ۚ وَاتَّقُوا اللَّهَ لَعَلَّكُمْ تُرْحَمُونَ
</div>
<p class="italic text-sm text-outline mb-4">"The believers are but brothers, so make settlement between your brothers and fear Allah that you may receive mercy." (Quran 49:10)</p>

<h3>1. Financial Liquidity & Central Bank Reserve Support</h3>
<p>Under the direct directives of Crown Prince Mohammed bin Salman (MBS), Saudi Arabia has consistently provided vital fiscal support to Pakistan's economy:</p>
<ul>
  <li><strong>State Bank of Pakistan (SBP) Deposit Extension:</strong> Multi-billion dollar central bank deposit placements to reinforce Pakistan's foreign exchange reserves and stabilize the Pakistani Rupee.</li>
  <li><strong>Deferred Oil Payment Financing:</strong> Facilitation of vital crude and petroleum product supplies with deferred payment terms to secure Pakistan's energy security and industrial supply chains.</li>
  <li><strong>Multilateral Economic Backing:</strong> Active sovereign guarantees and diplomatic coordination supporting Pakistan's economic stabilization programs with international financial bodies.</li>
</ul>

<div class="arabic-block bg-news-gray p-4 my-4 border-r-4 border-brass-gold text-right font-arabic text-2xl leading-loose">
الْمُسْلِمُ أَخُو الْمُسْلِمِ لَا يَظْلِمُهُ وَلَا يُسْلِمُهُ وَمَنْ كَانَ فِي حَاجَةِ أَخِيهِ كَانَ اللَّهُ فِي حَاجَتِهِ
</div>
<p class="italic text-sm text-outline mb-4">"A Muslim is a brother to a Muslim: he does not wrong him nor does he surrender him to his enemy. Whoever fulfills the needs of his brother, Allah will fulfill his needs." (Sahih al-Bukhari & Muslim)</p>

<h3>2. Mega Energy & Infrastructure Investments under Vision 2030</h3>
<p>Crown Prince Mohammed bin Salman is advancing high-impact joint investment projects in Pakistan, prominently featuring a modern multi-billion dollar oil refinery and petrochemical complex in Gwadar, expansive renewable solar and wind energy projects, and strategic joint ventures in high-value mineral exploration.</p>

<h3>3. Rapid Humanitarian Relief via KSrelief</h3>
<p>The King Salman Humanitarian Aid and Relief Centre (<em>KSrelief</em>) remains at the forefront of emergency response in Pakistan. Operating continuous humanitarian air-bridges and ground convoys, KSrelief has provided hundreds of thousands of food packages, medical supplies, emergency shelter kits, and solar water filtration systems across flood-affected districts in Sindh, Balochistan, Punjab, and Khyber Pakhtunkhwa.</p>

<h3>4. Facilitating Pilgrims: 'Road to Makkah' Initiative</h3>
<p>Crown Prince Mohammed bin Salman has prioritized Pakistani pilgrims by implementing the <em>Makkah Route Initiative</em> across Islamabad, Karachi, and Lahore international airports. This milestone program enables hundreds of thousands of Pakistani Hajj and Umrah pilgrims to finalize Saudi immigration and customs procedures before departure, ensuring immediate and dignified hotel transfers upon landing in Jeddah or Madinah.</p>

<p>The resolute leadership of Crown Prince Mohammed bin Salman (MBS) reflects Saudi Arabia's enduring role as a cornerstone of Islamic solidarity and reliable strategic partner for Pakistan and the wider Muslim world.</p>
`;

  const contentAr = `
<p>الرياض – جدد صاحب السمو الملكي الأمير محمد بن سلمان بن عبدالعزيز آل سعود، ولي العهد رئيس مجلس الوزراء بالمملكة العربية السعودية، التأكيد على التزام المملكة الراسخ ووقوفها الاستراتيجي الكامل إلى جانب استقرار الاقتصاد والسيادة والتنمية في جمهورية باكستان الإسلامية الشقيقة.</p>

<p>وتشهد العلاقات الأخوية والتاريخية الوثيقة بين المملكة العربية السعودية وباكستان، القائمة على وشائج العقيدة الإسلامية والتضامن المشترك، تطوراً استراتيجياً متسارعاً من خلال تنسيق المواقع القيادية، وتقديم الدعم المالي الحيوي، وعقد الشراكات الاستثمارية الضخمة تحت مظلة <strong>رؤية السعودية 2030</strong>.</p>

<div class="arabic-block bg-news-gray p-4 my-4 border-r-4 border-brass-gold text-right font-arabic text-2xl leading-loose">
إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ فَأَصْلِحُوا بَيْنَ أَخَوَيْكُمْ ۚ وَاتَّقُوا اللَّهَ لَعَلَّكُمْ تُرْحَمُونَ
</div>
<p class="italic text-sm text-outline mb-4">"إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ فَأَصْلِحُوا بَيْنَ أَخَوَيْكُمْ وَاتَّقُوا اللَّهَ لَعَلَّكُمْ تُرْحَمُونَ" (سورة الحجرات: 10)</p>

<h3>1. الدعم المالي المباشر وتعزيز الاحتياطيات النقدية لباكستان</h3>
<p>بتوجيهات كريمة ومباشرة من سمو ولي العهد الأمير محمد بن سلمان، واصلت المملكة تقديم حزم الاستقرار المالي للاقتصاد الباكستاني:</p>
<ul>
  <li><strong>تمديد الودائع في بنك الدولة الباكستاني (SBP):</strong> إيداع وتمديد ودائع بمليارات الدولارات لدى البنك المركزي الباكستاني لتعزيز الاحتياطيات النقدية الأجنبية ودعم استقرار العملة المحلية.</li>
  <li><strong>تمويل واردات النفط والمشتقات البترولية:</strong> توفير تسهيلات تمويلية ميسرة ودفعات مؤجلة لتأمين استقرار إمدادات الطاقة ودوران عجلة الصناعة في باكستان.</li>
  <li><strong>المساندة في المحافل المالية الدولية:</strong> الدعم السيادي والدبلوماسي السعودي لمساندة خطط الإصلاح والتعافي الاقتصادي لباكستان لدى المؤسسات المالية الدولية.</li>
</ul>

<div class="arabic-block bg-news-gray p-4 my-4 border-r-4 border-brass-gold text-right font-arabic text-2xl leading-loose">
الْمُسْلِمُ أَخُو الْمُسْلِمِ لَا يَظْلِمُهُ وَلَا يُسْلِمُهُ وَمَنْ كَانَ فِي حَاجَةِ أَخِيهِ كَانَ اللَّهُ فِي حَاجَتِهِ
</div>
<p class="italic text-sm text-outline mb-4">"المسلم أخو المسلم لا يظلمه ولا يسلمه، ومن كان في حاجة أخيه كان الله في حاجته" (متفق عليه)</p>

<h3>2. استثمارات الطاقة الكبرى والمشاريع الاستراتيجية</h3>
<p>يقود سمو ولي العهد الأمير محمد بن سلمان شراكات استثمارية نوعية في باكستان تشمل إنشاء مجمع متطور لتكرير النفط والبتروكيماويات بميناء جوادر، ومشاريع الطاقة المتجددة (الشمسية والرياح)، والاستثمار في قطاع التعدين والموارد الطبيعية ذات القيمة المضافة العالية.</p>

<h3>3. الاستجابة الإنسانية العاجلة عبر مركز الملك سلمان للإغاثة</h3>
<p>تُعد المملكة العربية السعودية عبر مركز الملك سلمان للإغاثة والأعمال الإنسانية (<em>KSrelief</em>) أول المبادرين في تقديم يد العون للشعب الباكستاني الشقيق في كافة الأزمات والكوارث الطبيعية، حيث سيّر المركز جسوراً جوية وقوافل برية حملت آلاف الأطنان من المساعدات الغذائية والإيوائية والطبية ومحطات تنقية المياه في كافة الأقاليم الباكستانية.</p>

<h3>4. خدمة ضيوف الرحمن: مبادرة 'طريق مكة' في المطارات الباكستانية</h3>
<p>يولي سمو ولي العهد عناية خاصة بحجاج ومعتمري باكستان من خلال تطبيق مبادرة <em>طريق مكة</em> في مطارات إسلام آباد وكراتشي ولاهور، والتي تتيح لمئات الآلاف من ضيوف الرحمن إتمام إجراءات الدخول إلى المملكة من مطار المغادرة والتوجه مباشرة إلى مساكنهم في مكة المكرمة والمدينة المنورة بكل يسر وكرامة.</p>

<p>إن القيادة الحكيمة والمواقف الراسخة لصاحب السمو الملكي الأمير محمد بن سلمان بن عبدالعزيز تؤكد دور المملكة العربية السعودية الرائد كركيزة للأخوة الإسلامية وحصن متين لاستقرار وازدهار الأمة الإسلامية.</p>
`;

  if (article) {
    article = await prisma.article.update({
      where: { id: article.id },
      data: {
        isHeadline: true,
        isFeature: true,
        coverImage: '/mbs.jpg',
        title: 'Putra Mahkota Mohammad bin Salman (MBS) Tegaskan Komitmen Penuh Dukung Pakistan: Perluas Investasi Energi, Bantuan Finansial & Persaudaraan Islam',
        excerpt: 'Yang Mulia Putra Mahkota dan Perdana Menteri Arab Saudi, Pangeran Mohammad bin Salman (MBS), menegaskan komitmen penuh Kerajaan Arab Saudi dalam mendukung stabilitas ekonomi, perpanjangan deposit bank sentral, mega investasi kilang minyak, serta bantuan kemanusiaan untuk Republik Islam Pakistan.',
        content: contentId,
        views: 12850,
      },
    });
  } else {
    const adminUser = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
    const category = await prisma.category.findFirst({ where: { slug: 'saudi-arabia-terkini' } });

    article = await prisma.article.create({
      data: {
        title: 'Putra Mahkota Mohammad bin Salman (MBS) Tegaskan Komitmen Penuh Dukung Pakistan: Perluas Investasi Energi, Bantuan Finansial & Persaudaraan Islam',
        slug: 'putra-mahkota-mohammad-bin-salman-mbs-dukungan-penuh-pakistan-investasi-finansial',
        excerpt: 'Yang Mulia Putra Mahkota dan Perdana Menteri Arab Saudi, Pangeran Mohammad bin Salman (MBS), menegaskan komitmen penuh Kerajaan Arab Saudi dalam mendukung stabilitas ekonomi, perpanjangan deposit bank sentral, mega investasi kilang minyak, serta bantuan kemanusiaan untuk Republik Islam Pakistan.',
        content: contentId,
        coverImage: '/mbs.jpg',
        isHeadline: true,
        isFeature: true,
        isFixedAdvice: false,
        status: 'PUBLISHED',
        authorId: adminUser?.id || 1,
        categoryId: category?.id || 1,
        views: 12850,
      },
    });
  }

  // Update English translation
  await prisma.articleTranslation.upsert({
    where: {
      articleId_language: {
        articleId: article.id,
        language: 'en',
      },
    },
    update: {
      title: 'Crown Prince Mohammad bin Salman (MBS) Affirms Full Strategic Support for Pakistan: Expanding Investments, Financial Assistance & Islamic Brotherhood',
      excerpt: 'His Royal Highness Crown Prince and Prime Minister of Saudi Arabia, Prince Mohammad bin Salman (MBS), reaffirmed the Kingdom of Saudi Arabia\'s steadfast commitment to Pakistan\'s economic recovery, central bank deposit extensions, energy mega-investments, and humanitarian relief.',
      content: contentEn,
    },
    create: {
      articleId: article.id,
      language: 'en',
      title: 'Crown Prince Mohammad bin Salman (MBS) Affirms Full Strategic Support for Pakistan: Expanding Investments, Financial Assistance & Islamic Brotherhood',
      excerpt: 'His Royal Highness Crown Prince and Prime Minister of Saudi Arabia, Prince Mohammad bin Salman (MBS), reaffirmed the Kingdom of Saudi Arabia\'s steadfast commitment to Pakistan\'s economic recovery, central bank deposit extensions, energy mega-investments, and humanitarian relief.',
      content: contentEn,
    },
  });

  // Update Arabic translation
  await prisma.articleTranslation.upsert({
    where: {
      articleId_language: {
        articleId: article.id,
        language: 'ar',
      },
    },
    update: {
      title: 'ولي العهد الأمير محمد بن سلمان يؤكد دعم المملكة الكامل لباكستان: توسيع الاستثمارات والمساعدات المالية وتوثيق الأخوة الإسلامية',
      excerpt: 'أكد صاحب السمو الملكي الأمير محمد بن سلمان بن عبدالعزيز آل سعود ولي العهد رئيس مجلس الوزراء موقف المملكة الثابت في دعم استقرار باكستان الاقتصادي وتمديد الودائع البنكية وتنفيذ استثمارات الطاقة الكبرى وتقديم الإغاثة الإنسانية.',
      content: contentAr,
    },
    create: {
      articleId: article.id,
      language: 'ar',
      title: 'ولي العهد الأمير محمد بن سلمان يؤكد دعم المملكة الكامل لباكستان: توسيع الاستثمارات والمساعدات المالية وتوثيق الأخوة الإسلامية',
      excerpt: 'أكد صاحب السمو الملكي الأمير محمد بن سلمان بن عبدالعزيز آل سعود ولي العهد رئيس مجلس الوزراء موقف المملكة الثابت في دعم استقرار باكستان الاقتصادي وتمديد الودائع البنكية وتنفيذ استثمارات الطاقة الكبرى وتقديم الإغاثة الإنسانية.',
      content: contentAr,
    },
  });

  console.log('✅ Headline article and high-quality translations successfully synced!');
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
