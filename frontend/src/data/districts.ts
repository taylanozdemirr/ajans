/**
 * İstanbul'un 39 ilçesi — ilçe bazlı yerel SEO landing sayfalarının veri kaynağı.
 *
 * Her ilçe için `intro` metni ÖZGÜNDÜR: 39 sayfanın birbirinin kopyası olmaması
 * (Google'ın "doorway / thin content" cezasından kaçınmak) için ilçenin gerçek
 * karakterine, yakasına ve semtlerine değinir. Başlık/description sayfa
 * şablonunda bu alanlardan türetilir, böylece meta veriler de benzersiz olur.
 */
export interface District {
  /** URL slug'ı, ör. "pendik-masaj" → /pendik-masaj */
  slug: string;
  /** Görünen ilçe adı, ör. "Pendik" */
  name: string;
  /** İstanbul yakası */
  yaka: 'Avrupa' | 'Anadolu';
  /** Öne çıkan semtler — sayfada ve iç linklemede kullanılır */
  mahalleler: string[];
  /** İlçeye özgü tanıtım paragrafı (benzersiz — SEO içeriğinin kalbi) */
  intro: string;
}

export const DISTRICTS: District[] = [
  {
    slug: 'adalar-masaj',
    name: 'Adalar',
    yaka: 'Anadolu',
    mahalleler: ['Büyükada', 'Heybeliada', 'Burgazada', 'Kınalıada'],
    intro:
      'Adalar’ın araç trafiğinden uzak, sakin atmosferi masaj ve rahatlama için İstanbul’un en huzurlu köşelerinden biridir. Büyükada ve Heybeliada başta olmak üzere ada genelinde profesyonel masörlerle çalışan, deniz havasının dinginliğini terapötik dokunuşla birleştiren hizmet noktalarını bir arada bulabilirsiniz.',
  },
  {
    slug: 'arnavutkoy-masaj',
    name: 'Arnavutköy',
    yaka: 'Avrupa',
    mahalleler: ['Hadımköy', 'Bolluca', 'Taşoluk', 'Haraççı'],
    intro:
      'İstanbul Havalimanı’na komşu, hızla büyüyen Arnavutköy’de yoğun iş temposunun ardından rahatlamak isteyenler için profesyonel masaj hizmetleri giderek yaygınlaşıyor. Hadımköy ve Taşoluk çevresinde deneyimli masörlerle klasik, medikal ve spor masajı seçeneklerine ulaşabilirsiniz.',
  },
  {
    slug: 'atasehir-masaj',
    name: 'Ataşehir',
    yaka: 'Anadolu',
    mahalleler: ['Barbaros', 'Küçükbakkalköy', 'Yenişehir', 'Örnek'],
    intro:
      'Anadolu Yakası’nın finans ve iş merkezi Ataşehir, plaza çalışanlarının stres attığı modern bir masaj noktası haline geldi. Barbaros ve Küçükbakkalköy hattında ofis yoğunluğuna uygun, randevulu ve profesyonel masaj hizmeti sunan masörlerle kolayca buluşabilirsiniz.',
  },
  {
    slug: 'avcilar-masaj',
    name: 'Avcılar',
    yaka: 'Avrupa',
    mahalleler: ['Ambarlı', 'Denizköşkler', 'Cihangir', 'Firuzköy'],
    intro:
      'Sahil şeridi ve üniversite nüfusuyla hareketli bir ilçe olan Avcılar’da uygun fiyatlı ve profesyonel masaj arayanlar için geniş bir seçenek yelpazesi var. Ambarlı ve Denizköşkler çevresinde klasik rahatlama masajından bölgesel çözümlere kadar deneyimli masörlere ulaşabilirsiniz.',
  },
  {
    slug: 'bagcilar-masaj',
    name: 'Bağcılar',
    yaka: 'Avrupa',
    mahalleler: ['Güneşli', 'Mahmutbey', 'Kirazlı', 'Yenimahalle'],
    intro:
      'İstanbul’un en kalabalık ilçelerinden Bağcılar, yoğun gün sonunda kas gevşetici ve rahatlatıcı masaja ihtiyaç duyanların yoğun ilgi gösterdiği bir bölge. Güneşli ve Mahmutbey metro hattı çevresinde ulaşımı kolay, profesyonel masörlerle çalışan hizmet noktaları bulunur.',
  },
  {
    slug: 'bahcelievler-masaj',
    name: 'Bahçelievler',
    yaka: 'Avrupa',
    mahalleler: ['Şirinevler', 'Yenibosna', 'Kocasinan', 'Zafer'],
    intro:
      'Şirinevler ve Yenibosna metro aktarma noktalarına yakınlığıyla Bahçelievler, İstanbul’un dört bir yanından kolay ulaşılan bir masaj merkezi konumunda. Bölgede klasik İsveç masajından spor masajına kadar farklı tekniklerde uzman masörlere randevuyla erişebilirsiniz.',
  },
  {
    slug: 'bakirkoy-masaj',
    name: 'Bakırköy',
    yaka: 'Avrupa',
    mahalleler: ['Ataköy', 'Yeşilköy', 'Florya', 'Zeytinlik'],
    intro:
      'Deniz kıyısı, marinası ve seçkin yaşam çizgisiyle Bakırköy, Avrupa Yakası’nda kaliteli masaj ve wellness hizmetinin öne çıktığı ilçelerden biri. Ataköy ve Yeşilköy hattında hijyen ve profesyonelliğe önem veren, deneyimli masörlerle çalışan noktalar bulunur.',
  },
  {
    slug: 'basaksehir-masaj',
    name: 'Başakşehir',
    yaka: 'Avrupa',
    mahalleler: ['Kayaşehir', 'Başak', 'Güvercintepe', 'Ziya Gökalp'],
    intro:
      'Planlı yapısı ve genç aile nüfusuyla Başakşehir, modern wellness ve masaj hizmetlerinin hızla geliştiği bir ilçe. Kayaşehir ve Başak mahalleleri çevresinde randevulu çalışan, klasik ve terapötik masaj sunan profesyonel masörlere ulaşabilirsiniz.',
  },
  {
    slug: 'bayrampasa-masaj',
    name: 'Bayrampaşa',
    yaka: 'Avrupa',
    mahalleler: ['Kartaltepe', 'Yıldırım', 'Vatan', 'Terazidere'],
    intro:
      'Şehir merkezine ve otogar hattına yakın konumuyla Bayrampaşa, ulaşımı pratik bir masaj bölgesi. Kartaltepe ve Yıldırım çevresinde günün yorgunluğunu atmak için klasik rahatlama ve kas gevşetici masaj sunan deneyimli masörler hizmet veriyor.',
  },
  {
    slug: 'besiktas-masaj',
    name: 'Beşiktaş',
    yaka: 'Avrupa',
    mahalleler: ['Levent', 'Etiler', 'Ortaköy', 'Bebek'],
    intro:
      'Boğaz manzarası, Levent’in iş kuleleri ve Etiler’in seçkin çizgisiyle Beşiktaş, İstanbul’da premium masaj ve spa deneyiminin kalbi. Bebek ve Ortaköy çevresinde aromaterapiden derin doku masajına kadar üst segment hizmet veren profesyonel masörlere erişebilirsiniz.',
  },
  {
    slug: 'beykoz-masaj',
    name: 'Beykoz',
    yaka: 'Anadolu',
    mahalleler: ['Kavacık', 'Paşabahçe', 'Anadolu Hisarı', 'Çubuklu'],
    intro:
      'Ormanları ve Boğaz’ın en yeşil kıyılarıyla Beykoz, doğayla iç içe rahatlama arayanlar için ideal bir masaj bölgesi. Kavacık iş merkezleri ile Paşabahçe sahili arasında, dinginliği terapötik dokunuşla birleştiren profesyonel masörlerle çalışabilirsiniz.',
  },
  {
    slug: 'beylikduzu-masaj',
    name: 'Beylikdüzü',
    yaka: 'Avrupa',
    mahalleler: ['Cumhuriyet', 'Adnan Kahveci', 'Gürpınar', 'Yakuplu'],
    intro:
      'Geniş bulvarları, sahil yaşam alanı ve modern sitelariyle Beylikdüzü, Avrupa Yakası’nın batısında hızla büyüyen bir wellness ve masaj merkezi. Cumhuriyet ve Adnan Kahveci mahalleleri çevresinde profesyonel masörlerle klasik ve spor masajı seçeneklerine ulaşabilirsiniz.',
  },
  {
    slug: 'beyoglu-masaj',
    name: 'Beyoğlu',
    yaka: 'Avrupa',
    mahalleler: ['Taksim', 'Cihangir', 'Galata', 'Şişhane'],
    intro:
      'Taksim, Galata ve Cihangir’in kültürel canlılığıyla Beyoğlu, İstanbul’un merkezinde hem yerli hem yabancı misafirlerin yoğun ilgi gösterdiği bir masaj noktası. Şehrin tam kalbinde, ulaşımı kolay ve profesyonel masörlerle çalışan hizmet noktaları bulunur.',
  },
  {
    slug: 'buyukcekmece-masaj',
    name: 'Büyükçekmece',
    yaka: 'Avrupa',
    mahalleler: ['Mimarsinan', 'Kumburgaz', 'Türkoba', 'Atatürk'],
    intro:
      'Göl ve deniz kıyısıyla yazlık bir dinlence çizgisine sahip Büyükçekmece, hafta sonu kaçamağında masajla rahatlamak isteyenlerin tercihi. Mimarsinan ve Kumburgaz sahili boyunca deneyimli masörlerle klasik ve aromaterapi masajı seçeneklerine ulaşabilirsiniz.',
  },
  {
    slug: 'catalca-masaj',
    name: 'Çatalca',
    yaka: 'Avrupa',
    mahalleler: ['Ferhatpaşa', 'Kaleiçi', 'Muratbey', 'Ovayenice'],
    intro:
      'İstanbul’un doğayla iç içe, sakin kırsal ilçesi Çatalca, şehrin gürültüsünden uzakta huzurlu bir masaj molası sunar. Kaleiçi ve çevresinde bölgeye hizmet veren profesyonel masörlerle klasik rahatlama ve kas gevşetici masaj için randevu oluşturabilirsiniz.',
  },
  {
    slug: 'cekmekoy-masaj',
    name: 'Çekmeköy',
    yaka: 'Anadolu',
    mahalleler: ['Taşdelen', 'Alemdağ', 'Mimarsinan', 'Ömerli'],
    intro:
      'Ormanlarla çevrili, sakin aile yaşamıyla öne çıkan Çekmeköy, Anadolu Yakası’nda doğal ve huzurlu bir masaj deneyimi arayanlara hitap ediyor. Taşdelen ve Alemdağ çevresinde randevulu çalışan profesyonel masörlerle terapötik masaj seçeneklerine ulaşabilirsiniz.',
  },
  {
    slug: 'esenler-masaj',
    name: 'Esenler',
    yaka: 'Avrupa',
    mahalleler: ['Menderes', 'Oruçreis', 'Havaalanı', 'Fevzi Çakmak'],
    intro:
      'Otogar ve metro hatlarının kesiştiği Esenler, İstanbul içi ulaşımın merkezinde pratik bir masaj bölgesi. Menderes ve Oruçreis çevresinde günün yorgunluğunu atmak için uygun fiyatlı, profesyonel masörlerle klasik rahatlama masajı hizmeti bulabilirsiniz.',
  },
  {
    slug: 'esenyurt-masaj',
    name: 'Esenyurt',
    yaka: 'Avrupa',
    mahalleler: ['Barbaros', 'Talatpaşa', 'Yeşilkent', 'Örnek'],
    intro:
      'Avrupa Yakası’nın en yoğun nüfuslu ilçelerinden Esenyurt, geniş konut alanlarına yayılmış, ulaşılabilir masaj hizmetleriyle dikkat çeker. Barbaros ve Yeşilkent çevresinde klasik, spor ve bölgesel masaj için deneyimli masörlerle randevu oluşturabilirsiniz.',
  },
  {
    slug: 'eyupsultan-masaj',
    name: 'Eyüpsultan',
    yaka: 'Avrupa',
    mahalleler: ['Göktürk', 'Alibeyköy', 'Kemerburgaz', 'Rami'],
    intro:
      'Tarihi dokusu ile Göktürk’ün modern yaşam çizgisini bir arada barındıran Eyüpsultan, hem geleneksel hem çağdaş masaj deneyimlerine ev sahipliği yapıyor. Göktürk ve Kemerburgaz çevresinde doğayla iç içe, profesyonel masörlerle çalışan wellness noktaları bulunur.',
  },
  {
    slug: 'fatih-masaj',
    name: 'Fatih',
    yaka: 'Avrupa',
    mahalleler: ['Aksaray', 'Çapa', 'Fındıkzade', 'Sultanahmet'],
    intro:
      'Tarihi yarımadanın kalbi Fatih, geleneksel hamam kültürünün masaj ile buluştuğu, yerli ve turist yoğunluğunun yüksek olduğu bir ilçe. Aksaray ve Fındıkzade çevresinde klasik masajdan geleneksel köpük ve kese ritüellerine kadar profesyonel hizmet veren masörlere ulaşabilirsiniz.',
  },
  {
    slug: 'gaziosmanpasa-masaj',
    name: 'Gaziosmanpaşa',
    yaka: 'Avrupa',
    mahalleler: ['Karayolları', 'Sarıgöl', 'Yenidoğan', 'Karadeniz'],
    intro:
      'Şehir merkezine yakın, yoğun ve dinamik bir ilçe olan Gaziosmanpaşa’da günlük stresi atmak için masaj talebi hayli yüksek. Karayolları ve Yenidoğan çevresinde ulaşımı kolay, profesyonel masörlerle klasik rahatlama ve kas gevşetici masaj hizmetleri sunulur.',
  },
  {
    slug: 'gungoren-masaj',
    name: 'Güngören',
    yaka: 'Avrupa',
    mahalleler: ['Merkez', 'Tozkoparan', 'Gençosman', 'Mareşal'],
    intro:
      'Küçük ama yoğun nüfuslu Güngören, tekstil ve ticaretin canlı olduğu, iş temposu yüksek bir ilçe; bu da masajla rahatlama ihtiyacını artırıyor. Merkez ve Tozkoparan çevresinde deneyimli masörlerle klasik ve bölgesel masaj için pratik çözümler bulabilirsiniz.',
  },
  {
    slug: 'kadikoy-masaj',
    name: 'Kadıköy',
    yaka: 'Anadolu',
    mahalleler: ['Moda', 'Feneryolu', 'Bostancı', 'Suadiye'],
    intro:
      'Anadolu Yakası’nın kültür ve sosyal yaşam merkezi Kadıköy, kaliteli masaj ve wellness hizmetinin en yoğun olduğu ilçelerden biri. Moda ve Suadiye hattında aromaterapiden derin doku ve spor masajına kadar geniş bir yelpazede profesyonel masörlere kolayca erişebilirsiniz.',
  },
  {
    slug: 'kagithane-masaj',
    name: 'Kağıthane',
    yaka: 'Avrupa',
    mahalleler: ['Seyrantepe', 'Çağlayan', 'Gültepe', 'Sanayi'],
    intro:
      'Levent iş merkezlerine komşu, hızla dönüşen Kağıthane, plaza çalışanlarının kısa molalarda masajla rahatladığı bir bölge. Seyrantepe ve Çağlayan çevresinde randevulu, profesyonel masörlerle klasik ve kas gevşetici masaj seçeneklerine ulaşabilirsiniz.',
  },
  {
    slug: 'kartal-masaj',
    name: 'Kartal',
    yaka: 'Anadolu',
    mahalleler: ['Soğanlık', 'Yakacık', 'Cevizli', 'Kordonboyu'],
    intro:
      'Sahil düzenlemesi ve yükselen yaşam projeleriyle Kartal, Anadolu Yakası’nın doğusunda gelişen bir masaj ve wellness merkezi. Kordonboyu sahili ve Soğanlık çevresinde profesyonel masörlerle klasik rahatlama, spor ve aromaterapi masajı için randevu oluşturabilirsiniz.',
  },
  {
    slug: 'kucukcekmece-masaj',
    name: 'Küçükçekmece',
    yaka: 'Avrupa',
    mahalleler: ['Sefaköy', 'Halkalı', 'İkitelli', 'Cennet'],
    intro:
      'Göl kıyısı ve yoğun konut alanlarıyla Küçükçekmece, Avrupa Yakası’nda ulaşılabilir masaj hizmetlerinin yaygın olduğu bir ilçe. Sefaköy ve Halkalı çevresinde deneyimli masörlerle klasik, spor ve bölgesel masaj seçeneklerine kolayca ulaşabilirsiniz.',
  },
  {
    slug: 'maltepe-masaj',
    name: 'Maltepe',
    yaka: 'Anadolu',
    mahalleler: ['Bağlarbaşı', 'Cevizli', 'Küçükyalı', 'Fındıklı'],
    intro:
      'Uzun sahil parkı ve dolgu alanıyla Maltepe, deniz kenarında rahatlama ile masajı birleştirmek isteyenlerin gözdesi. Küçükyalı ve Bağlarbaşı çevresinde profesyonel masörlerle klasik rahatlama, aromaterapi ve spor masajı için hizmet noktaları bulunur.',
  },
  {
    slug: 'pendik-masaj',
    name: 'Pendik',
    yaka: 'Anadolu',
    mahalleler: ['Kaynarca', 'Güzelyalı', 'Batı', 'Yenişehir'],
    intro:
      'Sabiha Gökçen Havalimanı’na ve marinasına yakınlığıyla Pendik, Anadolu Yakası’nın doğusunda hem yerli hem seyahat eden misafirlerin yoğun ilgi gösterdiği bir masaj bölgesi. Kaynarca ve Güzelyalı sahili çevresinde profesyonel masörlerle klasik, spor ve terapötik masaj seçeneklerine ulaşabilirsiniz.',
  },
  {
    slug: 'sancaktepe-masaj',
    name: 'Sancaktepe',
    yaka: 'Anadolu',
    mahalleler: ['Sarıgazi', 'Yenidoğan', 'Abdurrahmangazi', 'Meclis'],
    intro:
      'Hızla büyüyen genç aile nüfusuyla Sancaktepe, Anadolu Yakası’nın iç kesiminde gelişen bir masaj ve wellness bölgesi. Sarıgazi ve Yenidoğan çevresinde ulaşımı pratik, profesyonel masörlerle klasik rahatlama ve kas gevşetici masaj hizmeti bulabilirsiniz.',
  },
  {
    slug: 'sariyer-masaj',
    name: 'Sarıyer',
    yaka: 'Avrupa',
    mahalleler: ['Maslak', 'Tarabya', 'İstinye', 'Bahçeköy'],
    intro:
      'Boğaz’ın kuzeyi, Maslak’ın iş kuleleri ve Tarabya’nın sahil zarafetiyle Sarıyer, premium masaj ve spa deneyiminin öne çıktığı bir ilçe. İstinye ve Tarabya çevresinde aromaterapiden derin doku masajına kadar üst segment profesyonel masörlere erişebilirsiniz.',
  },
  {
    slug: 'silivri-masaj',
    name: 'Silivri',
    yaka: 'Avrupa',
    mahalleler: ['Selimpaşa', 'Gümüşyaka', 'Alibey', 'Piri Mehmet Paşa'],
    intro:
      'Marmara kıyısındaki sakin sahil ilçesi Silivri, hafta sonu dinlence ile masajı birleştirmek isteyenler için huzurlu bir seçenek. Selimpaşa ve merkez sahili çevresinde profesyonel masörlerle klasik rahatlama ve aromaterapi masajı için randevu oluşturabilirsiniz.',
  },
  {
    slug: 'sultanbeyli-masaj',
    name: 'Sultanbeyli',
    yaka: 'Anadolu',
    mahalleler: ['Abdurrahmangazi', 'Mehmet Akif', 'Fatih', 'Hasanpaşa'],
    intro:
      'Anadolu Yakası’nın iç kesiminde, yoğun ve genç nüfuslu Sultanbeyli’de günlük yorgunluğu atmak için masaj talebi giderek artıyor. Abdurrahmangazi ve Mehmet Akif çevresinde uygun, profesyonel masörlerle klasik ve kas gevşetici masaj hizmetlerine ulaşabilirsiniz.',
  },
  {
    slug: 'sultangazi-masaj',
    name: 'Sultangazi',
    yaka: 'Avrupa',
    mahalleler: ['Cebeci', 'Habibler', 'Gazi', '50. Yıl'],
    intro:
      'Avrupa Yakası’nın kuzeyinde kalabalık ve dinamik bir ilçe olan Sultangazi’de rahatlatıcı masaj hizmetlerine ilgi yüksek. Cebeci ve Gazi mahalleleri çevresinde ulaşımı kolay, profesyonel masörlerle klasik rahatlama ve bölgesel masaj seçenekleri sunulur.',
  },
  {
    slug: 'sile-masaj',
    name: 'Şile',
    yaka: 'Anadolu',
    mahalleler: ['Ağva', 'Çayırbaşı', 'Balibey', 'Kumbaba'],
    intro:
      'Karadeniz kıyısındaki doğal güzelliği ve serin havasıyla Şile, İstanbul’un doğa içinde masaj molası veren en dingin köşelerinden biri. Ağva ve Kumbaba çevresinde deniz havasının rahatlığını terapötik dokunuşla birleştiren profesyonel masörlerle çalışabilirsiniz.',
  },
  {
    slug: 'sisli-masaj',
    name: 'Şişli',
    yaka: 'Avrupa',
    mahalleler: ['Mecidiyeköy', 'Nişantaşı', 'Fulya', 'Bomonti'],
    intro:
      'Nişantaşı’nın seçkinliği ve Mecidiyeköy’ün iş yoğunluğuyla Şişli, İstanbul’un merkezinde premium masaj ve spa hizmetinin en güçlü olduğu ilçelerden biri. Nişantaşı ve Fulya çevresinde aromaterapiden derin doku ve spor masajına kadar profesyonel masörlere kolayca erişebilirsiniz.',
  },
  {
    slug: 'tuzla-masaj',
    name: 'Tuzla',
    yaka: 'Anadolu',
    mahalleler: ['Aydınlı', 'İçmeler', 'Postane', 'Şifa'],
    intro:
      'Tersaneleri, marinası ve İçmeler’in sahil çizgisiyle Tuzla, Anadolu Yakası’nın en doğusunda gelişen bir masaj bölgesi. Şifa ve İçmeler çevresinde profesyonel masörlerle klasik rahatlama, spor ve kas gevşetici masaj için randevu oluşturabilirsiniz.',
  },
  {
    slug: 'umraniye-masaj',
    name: 'Ümraniye',
    yaka: 'Anadolu',
    mahalleler: ['Çakmak', 'Atakent', 'Tantavi', 'Yamanevler'],
    intro:
      'Anadolu Yakası’nın en büyük ilçelerinden Ümraniye, alışveriş merkezleri ve iş kuleleriyle canlı bir masaj ve wellness bölgesi. Çakmak ve Atakent çevresinde randevulu çalışan profesyonel masörlerle klasik, spor ve aromaterapi masajı seçeneklerine ulaşabilirsiniz.',
  },
  {
    slug: 'uskudar-masaj',
    name: 'Üsküdar',
    yaka: 'Anadolu',
    mahalleler: ['Kısıklı', 'Altunizade', 'Çengelköy', 'Kuzguncuk'],
    intro:
      'Tarihi silüeti ve Boğaz kıyısıyla Üsküdar, Anadolu Yakası’nda geleneksel ile modern masaj deneyiminin buluştuğu köklü bir ilçe. Altunizade ve Çengelköy çevresinde profesyonel masörlerle klasik rahatlama, aromaterapi ve terapötik masaj hizmetlerine erişebilirsiniz.',
  },
  {
    slug: 'zeytinburnu-masaj',
    name: 'Zeytinburnu',
    yaka: 'Avrupa',
    mahalleler: ['Merkezefendi', 'Kazlıçeşme', 'Telsiz', 'Seyitnizam'],
    intro:
      'Sahil hattı ve şehir merkezine yakınlığıyla Zeytinburnu, ulaşımı pratik, canlı bir masaj bölgesi. Merkezefendi ve Kazlıçeşme çevresinde deneyimli masörlerle klasik rahatlama, spor ve kas gevşetici masaj için hizmet noktaları bulabilirsiniz.',
  },
];

/** Slug → District haritası (sayfa üretiminde hızlı erişim için). */
export const DISTRICT_BY_SLUG: Record<string, District> = Object.fromEntries(
  DISTRICTS.map((d) => [d.slug, d]),
);
