(function () {
  "use strict";

  window.registerMapNeroGuideLocale("tr", {
    ui: {
      pageTitle: "MapNero Kullanım Kılavuzları",
      home: "Ana Sayfa",
      language: "Dil",
      eyebrow: "SAHA KILAVUZU",
      title: "Nasıl yardımcı olabiliriz?",
      intro: "Önce cihazınızı, ardından yapmak istediğiniz işi seçin. Her kılavuz kısa ve uygulanabilir adımlardan oluşur.",
      search: "Kılavuzlarda ara",
      reset: "İlerlemeyi sıfırla",
      choosePlatform: "Platformunuzu seçin",
      topicsEyebrow: "İŞLEMLER",
      topics: "Bir işlem seçin",
      taskCount: "{count} kılavuz",
      noResults: "Kılavuz bulunamadı",
      noResultsHint: "PDF, iz, katman veya çevrimdışı gibi daha kısa bir kelime deneyin.",
      important: "Başlamadan önce",
      steps: "Bu adımları izleyin",
      help: "Bir şey çalışmazsa",
      previous: "Önceki",
      next: "Sonraki kılavuz",
      progress: "{total} adımın {done} tanesi tamamlandı",
      completed: "tamamlandı",
      notCompleted: "tamamlanmadı",
      copyLink: "Kılavuz bağlantısını kopyala",
      print: "Kılavuzu yazdır",
      linkCopied: "Kılavuz bağlantısı kopyalandı",
      resetDone: "Kılavuz ilerlemesi sıfırlandı",
      resetConfirm: "Tamamlanan bütün adımlar sıfırlansın mı?",
      support: "Destek",
      privacy: "Gizlilik",
      terms: "Koşullar"
    },
    platforms: {
      apple: {
        label: "iPhone · iPad · Mac",
        description: "Yerel Apple uygulaması",
        topics: {
          "quick-start": {
            title: "Simple Map ile başlayın",
            summary: "MapNero’yu dört büyük harita düğmesiyle sade günlük kullanıma hazırlayın.",
            access: "Ücretsiz",
            steps: [
              ["Simple Map’i seçin", "İlk açılışta Simple Map’i seçin. Daha sonra harita veya kayıtlarınızı silmeden Ayarlar’dan değiştirebilirsiniz."],
              ["Konum izni verin", "Haritayı açın ve istendiğinde konum iznini onaylayın. Açık alana çıkıp ilk doğru konum için kısa süre bekleyin."],
              ["Dört düğmeyi öğrenin", "Konum, Pin Ekle, Kayıt ve Daha Fazla düğmelerini kullanın. Ölçüm, altlık harita ve çevrimdışı araçlar Daha Fazla içindedir."]
            ],
            tips: [["Profesyonel araçlara geri dönebilir miyim?", "Evet. Ayarlar’dan modu değiştirin. Kaydedilmiş verileriniz ve özel araç düzeniniz korunur."]]
          },
          "import-map": {
            title: "PDF veya harita dosyası içe aktarın",
            summary: "GeoPDF, PDF, GeoTIFF, KMZ veya görüntüyü yükleyip harita ekranında açın.",
            access: "Ücretsiz · bazı biçimler Core veya Pro gerektirir",
            note: "Çok sayfalı PDF için Pro gerekir. Bir fotoğrafı harita olarak coğrafi referanslamak Core veya üstünü gerektirir.",
            motion: {
              caption: "Bir kaynak seçin; webden harita alırken bağlantı giriş panelini açın."
            },
            steps: [
              ["İçe Aktar’ı açın", "Haritadan veya Kütüphane’den Harita İçe Aktar’ı açın."],
              ["Kaynağı seçin", "PDF/GeoPDF, GeoTIFF, görüntü, KMZ, web bağlantısı veya QR kodu seçin."],
              ["Harita konumunu kontrol edin", "İçe aktarılan haritayı açıp Konum’a dokunun. Eski bir PDF kayıksa o kopyayı silip yeniden içe aktarın."],
              ["MapNero ile Aç’ı kullanın", "Dosyalar uygulamasında desteklenen bir dosyayı seçip MapNero ile paylaşabilir veya açabilirsiniz."]
            ],
            tips: [
              ["Harita boş görünüyor", "İçe aktarmanın tamamlandığını ve görünümün haritanın coğrafi sınırları içinde olduğunu doğrulayın."],
              ["Konumum haritanın dışında", "PDF coğrafi referanslı olmayabilir veya kontrol noktaları geçersiz olabilir. Aynı konumu Altlık Harita’da deneyin."]
            ]
          },
          "location-track": {
            title: "Konumunuzu bulun ve iz kaydedin",
            summary: "Haritayı konumunuzda merkezli tutup hareketinizi iz olarak kaydedin.",
            access: "Ücretsiz sınırlar · Core+ ile sınırsız",
            steps: [
              ["Haritayı merkezleyin", "Konum’a dokunun. Hareket ederken haritanın merkezde kalması için takip durumunu değiştirmek üzere tekrar dokunun."],
              ["Kaydı başlatın", "Kayıt’a dokunun, kayıt durumunu doğrulayın ve hareket etmeye başlayın."],
              ["Canlı çizgiyi izleyin", "Kayıt çizgisi, kayıt sırasında Altlık Harita ve içe aktarılan PDF haritalarda güncellenir."],
              ["Durdurun ve kaydedin", "Kare Durdur düğmesine dokunun; kayıt bitirilir ve iz otomatik kaydedilir. Daha sonra Kütüphane’den veya katmanından inceleyebilirsiniz."]
            ],
            tips: [
              ["Konum haritayı hareket ettirmiyor", "iPhone Ayarları → Gizlilik ve Güvenlik → Konum Servisleri → MapNero yolunu kontrol edip açık alanda yeni konum bekleyin."],
              ["İz görünmüyor", "Katmanlar’ı açın; iz katmanının görünür ve filtresiz olduğunu doğrulayın."]
            ]
          },
          "pins-layers": {
            title: "Pin ekleyin ve katmanları yönetin",
            summary: "Bir konumu kaydedin, saha ayrıntıları ekleyin ve haritada görünenleri yönetin.",
            access: "Ücretsiz · gelişmiş katman araçları Core+ gerektirebilir",
            note: "MapNero; gizli, kilitli, çöp kutusundaki veya WMS/WMTS katmanına pin kaydetmez. Önce görünür ve yazılabilir bir katman seçin.",
            steps: [
              ["Görünür katman seçin", "Katmanlar’ı açıp normal ve yazılabilir bir katman seçin. Görünürlüğünü açın."],
              ["Pini ekleyin", "Pin Ekle’ye dokunun veya haritaya uzun basın, ardından pin türünü seçin."],
              ["Kaydı açıklayın", "Ad, not, öznitelik veya medya ekleyip kaydedin."],
              ["Daha sonra düzenleyin", "Haritadaki objeye dokunun ve bilgi kartından Düzenle’yi açın."]
            ],
            tips: [["Neden pin ekleyemiyorum?", "Etkin katman gizli, kilitli, salt okunur, çöpte veya web servis katmanı olabilir. Normal ve görünür bir katman seçin ya da oluşturun."]]
          },
          "offline-maps": {
            title: "Çevrimdışı harita indirin",
            summary: "Mobil bağlantı veya Wi-Fi alanından ayrılmadan önce bir harita bölgesi hazırlayın.",
            access: "1 bölge Ücretsiz · Core+ ile sınırsız",
            steps: [
              ["Çevrimdışı Haritalar’ı açın", "Daha Fazla veya Kütüphane’den çevrimdışı indirme ekranını açın."],
              ["Çalışma alanını çerçeveleyin", "Gerekli saha alanı seçimin içinde kalana kadar haritayı taşıyıp yakınlaştırın."],
              ["Ayrıntıyı seçip indirin", "Yakınlaştırma aralığını seçin, tahmini boyutu kontrol edin ve çevrimiçiyken indirmeyi başlatın."],
              ["Sahaya çıkmadan deneyin", "Uçak Modu’nu açın, bölgeyi yeniden açın ve gerekli yakınlaştırma düzeylerinin göründüğünü doğrulayın."]
            ],
            tips: [["Çevrimdışı harita boş", "İndirmenin tamamlandığını, konumunuzun sınırlar içinde olduğunu ve seçilen aralığın mevcut yakınlaştırmayı kapsadığını doğrulayın."]]
          },
          "collections-atlas": {
            title: "Harita koleksiyonları ve Atlas kullanın",
            summary: "Bitişik GeoPDF paftalarını tek atlas gibi gezin ve koleksiyon kayıtlarını paftalar arasında görünür tutun.",
            access: "Koleksiyonlar Core+ · Atlas oluşturma Pro",
            note: "Atlas oluşturmak için etkin ve indirilmiş raster MBTiles kaynağı gerekir. Yalnız çevrimiçi veya vektör altlık haritadan atlas oluşturulmaz.",
            steps: [
              ["Bitişik haritaları gruplayın", "Kütüphane’de coğrafi referanslı paftaları aynı koleksiyona taşıyın ve ayrıntılı haritaları yedek haritaların üstüne sıralayın."],
              ["Pafta sınırlarını aşarak gezinin", "Koleksiyondaki haritayı açıp merkez nişangâhını komşu paftaya taşıyın. Kamera ölçeği korunarak etkin pafta değişir."],
              ["Gerekirse GPS otomatik geçişini seçin", "Merkezle elle gezinme varsayılan olarak açıktır. GPS tabanlı Otomatik Geçiş ayrıdır ve Koleksiyon Ayarları’nda kapalı başlar."],
              ["Atlas oluşturun", "Çevrimdışı raster MBTiles etkin durumdayken PDF Harita Oluştur’u açın, Atlas koleksiyonunu etkinleştirip ölçek ve bindirmeyi seçin; en çok 64 pafta oluşturun."]
            ],
            tips: [
              ["Koleksiyon harita değiştirmiyor", "Her pafta indirilmiş, coğrafi referanslı ve aynı koleksiyonda olmalıdır. Örtüşen paftalara benzersiz sıra verin."],
              ["Geçişte pinler veya izler kayboluyor", "Her paftada ortak görünmesi gereken kayıtlar için koleksiyon katmanını kullanın."]
            ]
          },
          "measure-cogo-buffer": {
            title: "Ölçün, istikamet çizin ve tampon oluşturun",
            summary: "Mesafe veya alan ölçün, grid istikametiyle çizgi kurun ve kalıcı tampon poligonları oluşturun.",
            access: "Ölçüm Ücretsiz · Tampon Pro",
            note: "Mevcut COGO istikameti UTM grid kuzeyine göre ölçülür; manyetik veya gerçek kuzey istikameti değildir.",
            steps: [
              ["Haritada ölçün", "Daha Fazla → Ölçüm’ü açın, noktaları yerleştirip canlı çizgi uzunluğunu veya alanı okuyun."],
              ["İstikamet ve mesafeyle oluşturun", "Daha Fazla → COGO’yu açın; bir başlangıç noktası girin veya GPS konumunu kullanın, ardından 0–360° grid istikameti ve 100 km’ye kadar mesafe girin."],
              ["Tampon oluşturun", "Nokta, çizgi, iz, poligon veya daireyi açın; Tampon’a dokunup metre, dolgu rengi ve opaklığı seçin."],
              ["Sonucu düzenleyin", "Türetilmiş Tamponlar’dan tamponu açıp mesafe, dolgu rengi veya opaklığı değiştirin. Mesafe değişince özgün objeden yeniden oluşturulur."]
            ],
            tips: [["Tampon oluşturulamıyor", "Kaynak geometrinin geçerli ve 500 km yayılım ile 10 km tampon güvenlik sınırlarının altında olduğunu doğrulayın."]]
          },
          "team-gnss": {
            title: "Ekibe veya harici GNSS’e bağlanın",
            summary: "Kuruluş paylaşımı için giriş yapın veya daha hassas konum için desteklenen bir alıcı eşleştirin.",
            access: "Ekip paylaşımı · beta boyunca GNSS ücretsiz",
            steps: [
              ["Giriş yapın", "Ayarlar → Hesap’ı açın, e-postanızı girip altı haneli tek kullanımlık kodu tamamlayın."],
              ["Kuruluşunuza katılın", "Davet kabul edin veya yönetici tarafından verilen kuruluş kodunu girin."],
              ["Katmanı paylaşın", "Bir katmanı açıp Kuruluşla Paylaş’ı etkinleştirin. Eşitleme için internet gerekir."],
              ["Harici GNSS’i eşleştirin", "Ayarlar → Harici GNSS’i açın, Bluetooth’u etkinleştirin, alıcıyı seçip geçerli konum ve doğruluk değerini bekleyin."]
            ],
            tips: [["Alıcı görünmüyor", "Eşleştirme moduna alın, Bluetooth iznini doğrulayın ve önce başka cihazlarla bağlantısını kesin."]]
          },
          "eod-safety": {
            title: "EOD ve mayın faaliyeti kayıtlarını güvenle kullanın",
            summary: "Doğrulanmamış hesap sonuçlarını operasyonel kararlardan uzak tutarak saha kayıtlarını oluşturun.",
            access: "Mod ve pakete bağlı",
            note: "RESS, Kimyasal ve Nükleer hesap sonuçları doğrulanmamış planlama/eğitim taslaklarıdır. Güvenli mesafe, zayiat tahmini veya operasyonel yetki olarak kullanmayın.",
            steps: [
              ["Doğru modu seçin", "Ayarlar’dan iş için gereken EOD veya mayın faaliyeti modunu seçin."],
              ["Saha kaydını oluşturun", "Spot Report, Sertifika veya Arazi Serbest Bırakma formlarını kullanıp zorunlu kaynak ve konum alanlarını doldurun."],
              ["Dışa aktarmadan önce inceleyin", "PDF veya IMSMA XML oluşturmadan önce koordinat, birim, ek ve kuruluş alanlarını kontrol edin."],
              ["Onaylı otoriteyi kullanın", "Güvenlik mesafesi veya sonuç analizi için kuruluşunuzun onaylı standardını, yetkin EOD/ESO incelemesini ve yetkili araçları izleyin."]
            ]
          }
        }
      },
      android: {
        label: "Android",
        description: "Google Play uygulaması",
        topics: {
          "quick-start": {
            title: "Simple Map ile başlayın",
            summary: "MapNero’yu dört büyük harita düğmesiyle sade günlük kullanıma hazırlayın.",
            access: "Ücretsiz",
            steps: [
              ["Simple Map’i seçin", "İlk açılışta Simple Map’i seçin. Kaydedilen verileri silmeden daha sonra Ayarlar’dan değiştirebilirsiniz."],
              ["Konum izni verin", "Hassas konumu onaylayın. Ekran kapalıyken iz kaydı için arka plan konumu kullanılmadan önce MapNero ayrıca izin ister."],
              ["Dört düğmeyi öğrenin", "Konum, Pin Ekle, Kayıt ve Daha Fazla’yı kullanın. Ölçüm, altlık harita ve çevrimdışı araçlar Daha Fazla içindedir."]
            ],
            tips: [["Profesyonel araçlara geri dönebilir miyim?", "Evet. Ayarlar’dan modu değiştirin; harita ve kayıtlarınız korunur."]]
          },
          "import-map": {
            title: "PDF veya GIS dosyası içe aktarın",
            summary: "PDF haritaları ve yaygın GIS biçimlerini MapNero’dan veya Android’in Birlikte Aç menüsünden açın.",
            access: "İçe aktarma, biçim ve pakete bağlıdır",
            steps: [
              ["Harita Ekle veya İçe Aktar’ı açın", "Harita Ekle’den PDF Harita, KMZ, fotoğraf, bağlantı veya QR seçin; vektör verisi için İçe Aktar’ı kullanın."],
              ["Dosyayı seçin", "Vektör içe aktarma GeoJSON, KML/KMZ, GPX ve ZIP Shapefile destekler. Sınırlı MBTiles ve GeoTIFF desteği de vardır."],
              ["İçe aktarma özetini inceleyin", "Ayrıştır ve onayla ekranını kontrol edin. Aktarılacak objeleri ve atlananları gerekçeleriyle gösterir."],
              ["MapNero ile Aç’ı kullanın", "İndirilenler veya Dosyalar’dan desteklenen dosyayı seçin, Birlikte Aç’a dokunup MapNero’yu seçin."]
            ],
            tips: [
              ["Bir Shapefile objesi atlandı", "İçe aktarma özetini açın. Projeksiyonlu dosya, desteklenmeyen geometri veya eksik eşlikçi dosya burada bildirilir."],
              ["Eski PDF hâlâ kayık", "O içe aktarılmış kopyayı silip özgün PDF’yi yeniden içe aktarın; düzeltilmiş coğrafi referans ayrıştırıcısı çalışsın."]
            ]
          },
          "location-track": {
            title: "Konumunuzu bulun ve arka planda iz kaydedin",
            summary: "Konumunuzu takip edin ve ekran kapalıyken de doğru bir iz kaydedin.",
            access: "Ücretsiz sınırlar · Core+ ile sınırsız",
            note: "Android, arka planda iz kaydederken görünür bir ön plan servis bildirimi ister. MapNero gizli kayıt yapmaz.",
            steps: [
              ["Merkezleyip takip edin", "Haritayı merkezlemek için Konum’a dokunun. Hareket ederken merkezde kalması için takip durumunu değiştirin."],
              ["Açıklamayı onaylayın", "Arka plan kaydını başlatırken açıklamayı okuyun ve Android Ayarları’ndan arka plan konumuna izin verin."],
              ["Kaydı başlatın", "Kayıt’a dokunun. Kalıcı kayıt bildirimini doğrulayıp gerekirse ekranı kilitleyin veya başka uygulama kullanın."],
              ["Durdurun ve kaydedin", "MapNero’ya dönün veya bildirim eylemini kullanın; kaydı durdurup izi kaydedin."]
            ],
            tips: [
              ["Ekran kapanınca iz duruyor", "MapNero konum iznini Her zaman izin ver olarak ayarlayın ve kayıt sırasında kısıtlayıcı pil optimizasyonunu kaldırın."],
              ["Kayıt sırasında Konum merkezlemiyor", "Takip durumunu değiştirmek için Konum’a dokunun ve PDF haritanın sınırına kilitli olmadığını doğrulayın."]
            ]
          },
          "pins-layers": {
            title: "Pin ekleyin ve katmanları yönetin",
            summary: "Saha konumlarını kaydedin, anlaşılır semboller kullanın ve katman görünürlüğü ile sırasını yönetin.",
            access: "Ücretsiz · gelişmiş araçlar Core+ gerektirebilir",
            note: "Gizli, kilitli, çöp kutusundaki veya WMS/WMTS katmanı yeni pin ya da düzenlenebilir obje kabul etmez.",
            steps: [
              ["Yazılabilir katman seçin", "Katmanlar’ı açıp normal bir katman seçin ve görünürlüğünün açık olduğunu doğrulayın."],
              ["Pin ekleyin", "Pin Ekle’ye dokunun veya haritaya uzun basın. Uygunsa kategoriye özel sembol seçin."],
              ["Saha ayrıntıları ekleyin", "Başlık, öznitelik, not ve ekleri girip kaydedin."],
              ["Düzenleyin veya dışa aktarın", "Bilgi kartını açmak için objeye dokunun. Düzenle’yi kullanın veya izin varsa katmanı GPX, KML, CSV, GeoJSON ya da Shapefile olarak dışa aktarın."]
            ],
            tips: [["Pin düğmesi katman uyarısı gösteriyor", "Katmanlar’ı açıp görünür, normal bir katman seçin. Web servis katmanları yalnız görüntülenir."]]
          },
          "offline-maps": {
            title: "Çevrimdışı harita indirip deneyin",
            summary: "Saha çalışmasından önce bölgeyi kaydedin ve bağlantısız çalıştığını doğrulayın.",
            access: "Ücretsiz sınır · Core+ ile sınırsız",
            steps: [
              ["Çevrimdışı Haritalar’ı açın", "Daha Fazla’yı veya harita ekranındaki çevrimdışı denetimini kullanın."],
              ["Alanı seçin", "Saha alanını çerçeveleyip çalışma için gereken yakınlaştırma düzeylerini seçin."],
              ["Çevrimiçiyken indirin", "Tahmini boyutu kontrol edin, indirmeyi başlatıp tamamlanmasını bekleyin."],
              ["Uçak Modu’nda deneyin", "Ağı kapatın, bölgeyi yeniden açın ve gereken düzeylerde yakınlaştırın."]
            ],
            tips: [["Bazı yakınlaştırmalarda harita boş", "Bu düzeyler seçilmemiş veya tamamlanmamış olabilir. Yeniden bağlanıp bölgeyi tekrar indirin."]]
          },
          "collections-atlas": {
            title: "Harita koleksiyonları ve Atlas kullanın",
            summary: "Bitişik PDF paftalarında tek atlas gibi gezinin ve koleksiyon objelerini ortak tutun.",
            access: "Koleksiyonlar Core+ · Atlas oluşturma Pro",
            note: "Atlas oluşturmak için etkin, indirilmiş raster MBTiles kaynağı gerekir ve 64 adede kadar kuzey-yukarı GeoPDF paftası desteklenir.",
            steps: [
              ["Koleksiyon oluşturun", "Haritalarım’da bitişik coğrafi referanslı haritaları aynı koleksiyona alın ve ayrıntılı paftaları yedeklerin üzerine sıralayın."],
              ["Nişangâhla gezinin", "Üye paftayı açıp merkez nişangâhını komşu paftaya taşıyın. Çalışma ölçeği sıfırlanmadan etkin olur."],
              ["Kayıtları ortak tutun", "Her üye paftada görünmesi ve düzenlenmesi gereken pin, iz ve çizimleri koleksiyon katmanında saklayın."],
              ["Atlas oluşturun", "Çevrimdışı raster MBTiles haritasını etkinleştirin; PDF Harita Oluştur’dan Atlas, ölçek ve bindirmeyi seçip pafta setini oluşturun."]
            ],
            tips: [["Geri dönünce bir pafta kayboluyor", "Her PDF’nin cihazda durduğunu ve sınırlarının geçerli olduğunu doğrulayın. Örtüşen paftalara benzersiz koleksiyon sırası verin."]]
          },
          "measure-cogo-buffer": {
            title: "Ölçün, kurun ve tamponlayın",
            summary: "Canlı mesafeyi okuyun, UTM grid istikametiyle çizgi kurun ve düzenlenebilir tampon poligonları kaydedin.",
            access: "Ölçüm Ücretsiz · Tampon Pro",
            note: "COGO şu anda UTM grid kuzeyini kullanır. Manyetik istikameti grid istikameti gibi girmeyin.",
            steps: [
              ["Mesafe veya alan ölçün", "Ölçüm’ü açın, noktaları yerleştirin ve lastik çizgideki canlı uzunluk etiketini okuyun."],
              ["İstikamet çizgisi oluşturun", "COGO’yu açın, GPS konumunu kullanın veya DD/UTM/MGRS girin; ardından grid istikameti ve 100 km’ye kadar mesafe girin."],
              ["Bir veya çok objeyi tamponlayın", "Bir obje açın veya Kement ile birkaçını seçin; sonra Tampon, mesafe, renk ve opaklığı seçin."],
              ["Türetilmiş Tamponları düzenleyin", "Kaydedilmiş tamponu açıp mesafe, dolgu rengi veya opaklığı değiştirin. Mesafe değişiklikleri geometriyi kaynağından yeniden üretir."]
            ],
            tips: [["Karmaşık SHP tamponu başarısız", "Objenin 500 km geometri ve 10 km tampon güvenlik sınırları içinde ve kaynak katmanın yazılabilir olduğunu doğrulayın."]]
          },
          "team-gnss": {
            title: "Ekibe veya harici GNSS’e bağlanın",
            summary: "Kuruluş katmanlarını paylaşın veya daha iyi konum için Bluetooth alıcısı kullanın.",
            access: "Ekip paylaşımı · GNSS ücretsiz",
            steps: [
              ["Giriş yapın", "Ayarlar → Hesap’ı açın, e-postanızı girip altı haneli tek kullanımlık kodu tamamlayın."],
              ["Kuruluşa katılın", "Davet kabul edin veya kuruluş katılım kodunu girin."],
              ["Katmanı paylaşın", "Katmanı açıp Kuruluşla Paylaş’ı etkinleştirin. Eşitleme için internet gerekir."],
              ["GNSS bağlayın", "Harici GNSS’i açın, Bluetooth’a izin verin, alıcıyı seçip konum türü, doğruluk ve uydu durumunu doğrulayın."]
            ],
            tips: [["Bir GLO 2 iki telefonu besleyebilir mi?", "Bu, alıcının bağlantı desteğine bağlıdır. Her cihazı alıcı kılavuzuna göre eşleştirin ve kayıt öncesi MapNero’nun harici konumu gösterdiğini doğrulayın."]]
          },
          "eod-safety": {
            title: "EOD ve mayın faaliyeti kayıtlarını güvenle kullanın",
            summary: "Doğrulanmamış hesaplayıcıları operasyonel otorite saymadan yapılandırılmış saha verisi toplayın.",
            access: "Mod ve pakete bağlı",
            note: "RESS, Kimyasal ve Nükleer hesap sonuçları doğrulanmamış planlama/eğitim taslaklarıdır. Operasyonel güvenli mesafe veya zayiat tahmini olarak asla kullanmayın.",
            steps: [
              ["Doğru modu seçin", "Ayarlar’dan EOD veya mayın faaliyeti modunu seçin."],
              ["Kaydı oluşturun", "Kaynak ve konum bağlamı dahil Spot Report, Sertifika veya Arazi Serbest Bırakma alanlarını doldurun."],
              ["Dışa aktarmayı inceleyin", "PDF veya IMSMA çıktısı oluşturmadan önce koordinat, birim, ek ve kuruluş alanlarını kontrol edin."],
              ["Onaylı otoriteyi izleyin", "Operasyonel kararlar için kuruluşunuzun onaylı standartlarını, yetkin EOD/ESO incelemesini ve yetkili araçları kullanın."]
            ]
          }
        }
      },
      web: {
        label: "Web GIS",
        description: "Kuruluş çalışma alanı",
        topics: {
          "sign-in": {
            title: "Giriş yapıp çalışma alanını açın",
            summary: "Gösterge paneli ve GIS çalışma alanına kuruluş hesabınızla ulaşın.",
            access: "Kuruluş erişimi",
            steps: [
              ["app.mapnero.com’u açın", "Giriş’i seçip kuruluşunuza bağlı e-posta adresini girin."],
              ["Tek kullanımlık kodu girin", "E-postanıza gelen altı haneli kodu kullanın. Kodu başka biriyle paylaşmayın."],
              ["GIS · Katmanlar’ı açın", "Sol menüden MapLibre GIS çalışma alanını ve kuruluş katmanlarını açın."]
            ],
            tips: [["Kuruluşu göremiyorum", "Aynı e-posta adresinin davet edildiğini doğrulayın ve kuruluş yöneticisinden üyeliğinizi kontrol etmesini isteyin."]]
          },
          "layers-features": {
            title: "Katmanları görüntüleyip objeleri inceleyin",
            summary: "Harita görünürlüğünü yönetin, objeleri seçin ve özniteliklerini inceleyin.",
            access: "Kuruluş erişimi",
            steps: [
              ["Altlık harita seçin", "Göreve uygun Standart, OSM, Uydu, Hibrit, Topografik veya Koyu görünümü seçin."],
              ["Katmanları açın", "Gereken kuruluş katmanlarını katman panelinden etkinleştirin."],
              ["Objeyi inceleyin", "Bilgi kartı ve özniteliklerini açmak için nokta, çizgi veya poligona tıklayın."],
              ["Öznitelik tablosunu kullanın", "Katman kayıtlarını aramak, filtrelemek ve incelemek için tabloyu açın."]
            ],
            tips: [["Harita Henüz katman yok diyor", "Mobil kullanıcı bir katmanı açıp Kuruluşla Paylaş’ı etkinleştirmeli ve eşitlemenin bitmesini beklemelidir."]]
          },
          "import-export": {
            title: "GIS verisi içe veya dışa aktarın",
            summary: "Dosyaları yazmadan önce inceleyin ve kuruluş verilerini yaygın biçimlerde dışa aktarın.",
            access: "İçe aktarma için yazma rolü gerekir",
            steps: [
              ["İçe aktarmayı başlatın", "GIS’te İçe Aktar’ı seçip GeoJSON, KML, GPX veya ZIP Shapefile belirleyin."],
              ["Ayrıştırma özetini inceleyin", "Algılanan geometriyi, koordinat işlemesini ve atlanan objeleri kontrol edin. Onaylamadan hiçbir şey yazılmaz."],
              ["Hedefi seçin", "Doğru, yazılabilir kuruluş katmanını seçin veya oluşturup içe aktarmayı onaylayın."],
              ["Gerektiğinde dışa aktarın", "Geçerli katmanı veya obje kümesini seçip GeoJSON, KML, GPX ya da CSV olarak dışa aktarın."]
            ],
            tips: [["Projeksiyonlu Shapefile reddedildi", "İçe aktarma açıklamasını açın ve yeniden denemeden önce veriyi desteklenen coğrafi koordinat sistemine dönüştürün."]]
          },
          "edit-online": {
            title: "Çevrimiçiyken obje oluşturup düzenleyin",
            summary: "Nokta, çizgi veya poligon çizin ve çakışma korumasıyla öznitelikleri düzenleyin.",
            access: "Çevrimiçi · yazma rolü",
            note: "Web düzenleme için internet gerekir. Çevrimdışı çalışma alanı salt okunurdur.",
            steps: [
              ["Yazılabilir katman seçin", "Normal bir kuruluş katmanı seçin. WMS/WMTS ve salt okunur katmanlar obje kabul etmez."],
              ["Düzenleme moduna girin", "Düzenleme araç çubuğunu açıp nokta, çizgi veya poligon seçin."],
              ["Çizip açıklayın", "Geometriyi yerleştirin, özniteliklerini doldurun ve şekli inceleyin."],
              ["Kaydedin veya çakışmayı çözün", "Çevrimiçi kaydedin. Başka kullanıcı kaydı değiştirdiyse üzerine sessizce yazmak yerine çakışmayı inceleyin."]
            ],
            tips: [["Düzenleme araçları kapalı", "Çevrimiçi olduğunuzu, kuruluşun etkin ve rolünüzün yazma yetkili olduğunu doğrulayın."]]
          },
          "offline-snapshot": {
            title: "Şifreli çevrimdışı görünüm hazırlayın",
            summary: "Kuruluş GIS verisini bağlantısız görüntülemek için korumalı, salt okunur anlık kopya oluşturun.",
            access: "Kuruluş erişimi",
            note: "Web çevrimdışı çalışma alanı şifreli ve salt okunurdur. Mobil altlık bölgelerini indirmez, veri düzenlemez veya çevrimdışıyken eşitlemez.",
            steps: [
              ["Çevrimdışı Erişim’i açın", "Giriş yapmış ve çevrimiçiyken GIS çevrimdışı erişim panelini açın."],
              ["Güçlü parola cümlesi oluşturun", "En az 15 karakter girin. Parola cümlesi saklanmaz; güvenli parola yöneticisinde tutun."],
              ["Mevcut anlık kopyayı kaydedin", "Şifreli zarf ve çevrimdışı kabuk hazır olana kadar bekleyin."],
              ["Salt okunur erişimi deneyin", "Ağı kesin, çevrimdışı çalışma alanını açıp parola cümlesiyle kilidi çözün."]
            ],
            tips: [
              ["Parola cümlesini unuttum", "Anlık kopya çözülemez. Yeniden bağlanıp yeni çevrimdışı kopya ve parola cümlesi oluşturun."],
              ["Çevrimdışı veri eski", "Bu belirli bir zamandaki kopyadır. Saha öncesi yeniden bağlanıp yenileyin."]
            ]
          },
          reports: {
            title: "Raporları ve arazi serbest bırakma kayıtlarını inceleyin",
            summary: "Kuruluş gözetimi için panoları, Spot Report, Sertifika ve Arazi Serbest Bırakma görünümlerini kullanın.",
            access: "Role bağlı",
            note: "Arazi serbest bırakma sınıflandırması güvenlikle ilgilidir. Kuruluşunuzun onay akışını ve yetkin incelemeyi izleyin.",
            steps: [
              ["Doğru bölümü açın", "Sol menüden Gösterge Paneli, Rollup, Spot Reports, Land Release veya Certificates’ı kullanın."],
              ["Kayıtları filtreleyin", "Mevcut durum, tarih, alan veya kuruluş alanlarına göre daraltın."],
              ["Kaydı açın", "Kaynağı, konumu, durumu, ekleri ve denetim bağlamını inceleyin."],
              ["Yalnız yetkiniz varsa düzenleyin", "Düzenlemeyi sadece rolünüz ve kuruluş prosedürü izin veriyorsa kullanın."]
            ]
          },
          "team-live": {
            title: "Canlı ekip oturumunu görüntüleyin",
            summary: "Etkin saha oturumunu koduyla açıp paylaşılan ekip bilgisini izleyin.",
            access: "Ekip",
            steps: [
              ["Oturum kodunu alın", "Etkin oturum kodunu saha ekibi sahibinden onaylı bir kanal üzerinden isteyin."],
              ["Team Live’ı açın", "Web menüsünden Ekip’i seçip kodu girin."],
              ["Güncelliği kontrol edin", "Bir konuma güvenmeden önce oturumun etkin ve son güncelleme zamanının yeni olduğunu doğrulayın."],
              ["Bitince erişimi kapatın", "Oturum görünümünü kapatın ve kodu sonlandırma ya da yenileme için ekip sürecini izleyin."]
            ]
          },
          "web-limits": {
            title: "Hangi işin mobilde olduğunu bilin",
            summary: "Görüntüleme, düzenleme ve raporlama için Web GIS’i; saha izi ve indirilmiş altlıklar için mobil uygulamaları kullanın.",
            access: "Tüm web kullanıcıları",
            steps: [
              ["İzleri mobilde kaydedin", "Web GIS GPS izi kaydetmez ve harici GNSS alıcısıyla eşleşmez."],
              ["Altlık bölgelerini mobilde indirin", "Web çevrimdışı, şifreli GIS anlık kopyasıdır; mobil çevrimdışı harita indiricisi değildir."],
              ["Saha katmanlarını kuruluşa paylaşın", "iPhone, iPad veya Android’de veri toplayıp katmanın web’de görünmesi için Kuruluşla Paylaş’ı etkinleştirin."],
              ["Web’i gözetim için kullanın", "Büyük ekranda katmanları inceleyin, izin verilen GIS objelerini düzenleyin, veri dışa aktarın ve kuruluş raporlarını gözden geçirin."]
            ]
          }
        }
      }
    }
  });
})();
