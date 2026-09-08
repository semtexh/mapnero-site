# Gelişmiş kullanım kılavuzu kapsamı

Tarih: 2026-09-08. Serhan'ın doğrudan isteği: rota oluşturma, 3D çizim/görünüm,
track raporu ve bu araçların ayrıntıları da gerçek, her dile özel ekranlarla
anlatılacak. Karar: mevcut kılavuz işine dahil; yeni uygulama özelliği geliştirme
talebi olarak yorumlanmadı. Kapsamın tamamı henüz bitmedi; doğrulanan ilerleme
aşağıdaki güncel durum bölümünde ayrılıyor.

## Güncel durum

- **Android çekimleri:** Güncel 2.1.5 (2057) Pixel 7 emülatöründen `import-map`
  ve `quick-start` 12'şer dilde çekildi ve tek tek incelendi: 24 gerçek Android
  karesi. Apple 96 ile toplam 120. Dil değişimi uygulama ayarlarından yapıldı;
  Arapça/Urdu RTL. Bunlar kaynak/mod seçim ekranlarıdır, bütün import türlerinin
  veya harita araçlarının uçtan uca testi değildir. Diğer platformlar açık.

- **Son durum (rapor):** Apple `track-report` 12 dilde çekildi, tek tek
  incelendi; toplam 96 gerçek iPhone karesi. `57f9b0e` rapor izin/panel
  sıralamasını düzeltiyor. İzin reddiyle koordinat sonuçları, iki sayfalık
  Türkçe PDF ve yerel paylaşım paneli kontrol edildi; dışarı paylaşım yapılmadı.
  Sayısal istatistiklerin bütün veri türleri için doğruluğu bu kontrole dahil değil.
  Android 2.1.5 / 2057 güncel derleme Pixel 7 emülatöre kuruldu; çekimler sürüyor.

- **Son çekim güncellemesi:** Apple `track-3d` gerçek iPhone ekranları 12 dilde
  tamamlandı ve tek tek incelendi; toplam 84 kare. `a4d763e` içeren uygulamada
  kısa, sıfır yükseklikli demo iz portrait kadraja sığıyor. Diğer izler/yatay
  görünüm için genel hata kabulü hâlâ açık. Track raporu/PDF ve diğer platform
  çekimleri tamamlanmadı. Aşağıdaki eski durum kayıtları tarihsel ilerlemedir.

- Apple `route-builder` konusu 12 dilde yerel kılavuza eklendi. Nokta ekleme,
  mesafe kontrolü, tek noktayı kaldırma, taslağı temizleme/kapama ve katmana
  kaydetme anlatılıyor. Android/web için aynı akış varsayılmadı.
- 12 dilin konu yüklemesi ve dört adımı test edildi; Türkçe/Arapça görsel
  kontrol, diğer dillerin tarayıcı başlık/adım/taşma kontrolü geçti.
- iOS çekimi sırasında iki hata bulundu ve uygulama commit'i `2aac157` ile
  düzeltildi: iki noktalı rotada başlık/düğmeler sıkışıyordu; yükseklik izni
  reddedildiğinde göstergeler dönmeye devam ediyordu. Ayrı başlık/işlem satırı
  ve istek yaşam döngüsü takibi eklendi. Dar regresyon testi ve imzasız generic
  iOS Simulator derlemesi geçti; yeni uygulamada iki nokta + izin reddi görüldü.
- Apple 3D ve track raporu metinleri 12 dilde eklendi (`d5f81a6`);
  bu iki konunun gerçek ekran görüntüleri henüz tamamlanmadı. Üçüncü
  taraf yükseklik izni verilmedi; demo rota noktaları yükseklik olmadan çizildi.

### Android rota metni — 2026-09-08

- `route-builder` Android konusu 12 dilde eklendi. Nokta yerleştirme ve
  mesafe metni iki platformun kaynakları karşılaştırılarak ortak tutuldu;
  Android araç çubuğu/More girişi, gerçek `Save` etiketi ve yükseklik
  önizlemesindeki sıfır veri uyarısı ayrı yazıldı. Web'e eklenmedi.
- Kaynak: `map_toolbar.dart` route düğmesi/More dispatcher;
  `route_builder_panel.dart` eksi/çöp/X ve iki nokta eşiği;
  `route_builder_notifier.dart` taslak yaşam döngüsü;
  `map_viewer_screen.dart` `_saveRouteToLayer` ve hedef katman kontrolü;
  `route_elevation_preview_screen.dart`, `elevation_service.dart`.
- Eksik yükseklik/izin reddi sıfır değer döndürebiliyor. Düz önizleme gerçek
  düz arazi kanıtı olarak anlatılmıyor. Bu tur uygulama davranışı değiştirilmedi.
- 10 otomatik test, sözdizimi ve diff kontrolü geçti. Yerel tarayıcıda
  12 dil × dört adım, Save metni, RTL, 621 px genişlikte yatay taşma olmaması
  doğrulandı. Türkçe adım kartları görsel olarak incelendi.
- Android rota ekranları hâlâ çekilmedi; eksik görsel alanı gizli ve Apple
  görseline fallback yok. Toplam gerçek iPhone görseli hâlâ 72.
- Device Hub ekran okuması iki farklı mevcut arayüzde zaman aşımına uğradı.
  iOS 3D kadraj düzeltmesinin cihaz kabulü bekliyor. Yeni çizim/rapor ekranları,
  Android/iPad/Mac/web çekimleri ve canlı yayın tamamlanma kapsamı dışında.

## Android 3D/rapor metinleri — 2026-09-08

- Android `track-report` (4 adım) ve `track-3d` (3 adım) 12 dilde eklendi.
  Apple talimatları taşınmadı: Android rapor ekranının görseli üstten 2D;
  Route Builder panel 3D'si statik kabartma görüntü + yükseklik profili;
  toolbar 3D ayrı Core+ kamera eğim kontrolü. Serbest 3D editör iddiası yok.
- Kaynaklar: `feature_attribute_sheet.dart`, `track_report_screen.dart`,
  `track_report_builder.dart`, `track_report_pdf_exporter.dart`,
  `track_3d_snapshot_painter.dart`, `route_elevation_preview_screen.dart`,
  `map_toolbar.dart`. Kaynak yorumları yerine çalışan çağrılar esas alındı.
- PDF/GPX ayrımı, paylaşmadan konum kontrolü, ilk PDF font yüklemesi,
  dış hizmet/izin ve yolculuk tarihine ait olmayan hava durumu açıklandı.
- Mevcut movingTime ilk/son GPS noktası aralığıdır. İç duruşlar tümüyle
  çıkarılmadığı için kullanıcıya gerçek duruş tespiti diye anlatılmadı.
  Bu bir hesap düzeltmesi değil, mevcut sınırlamanın açıklamasıdır;
  ayrı istatistik doğrulama işi Obsidian aktif hatalarına kaydedildi.
- 10 test + JS sözdizimi + diff kontrolleri geçti. Tarayıcıda 24 dil/konu
  kombinasyonu, 3/4 adım, RTL ve 621 px'te taşma olmaması doğrulandı.
  Türkçe 3D adım kartları görsel kontrol edildi. Android uygulama/PDF
  çıktısı cihazda doğrulanmadı; bu konularda screenshot yok ve alan gizli.
  Toplam gerçek iPhone ekranı 72 olarak kaldı. Canlı yayın yapılmadı.

## Rota oluşturma

- 2026-09-08: Apple rota konusu 12 dilde eklendi. Her dilde gerçek iPhone
  simülatöründen iki farklı noktalı, sıfırdan büyük mesafeli ekran çekildi ve
  görsel olarak incelendi. Taslaklar kaydedilmeden kapatıldı; bu ekranlar
  navigasyon, 3D sonuç veya kaydet/yeniden aç testi olarak gösterilmiyor.
- iPhone ekran toplamı 72 oldu. Android, iPad, Mac ve web için aynı tamamlanma
  iddiası yok. Yükseklik paylaşım izni verilmedi; eksik yükseklik `—` görünüyor.
- Harita → More → Route Builder yolu iPhone simülatöründe görüldü.
- Crosshair ile nokta ekleme, noktaları sıralama/düzenleme seçenekleri, toplam
  mesafe, katmana kaydetme, tekrar açma ve varsa platforma özgü navigasyon.
- En az iki noktalı, kişisel veri içermeyen örnek üzerinde ekranlar çekilecek.
- Manuel nokta birleştirme, yol ağına otomatik oturan rota hesaplaması gibi
  anlatılmayacak; cihazda doğrulanmayan seçenek yayınlanmayacak.
- Kaynak: `MapNeroApp/UI/Map/RouteBuilderPanelView.swift`, Flutter karşılığı
  `mapnero_flutter/lib/features/map/route_builder_panel.dart`.

## 3D çizim/görünüm ve yükseklik

- 2026-09-08: `track-3d` konusu Apple için 12 dilde eklendi. Katman → iz
  kartı → 3D erişimi, üç mod ve otomatik döndürme düğmesi Türkçe simülatörde
  görüldü. Kaynakta yükseklik ve yatay eksenler görsel amaçlı normalize
  ediliyor; metin bunu ölçekli arazi modeli veya 3D çizim editörü diye sunmuyor.
- Gerçek kayıt akışıyla yaklaşık 255 m demo iz üretildi; simüle edilmiş
  konumlar kullanıldı, yükseklik sıfır. Kayıt durduruldu. İlk 3D görünümde
  çizginin kadraj dışında kalması gözlendi; sürükleme kamerayı değiştirdi
  ancak görüntü çekim için uygun değildi. Bu kareler siteye eklenmedi.
  Tekrarlanabilir kamera/kadraj düzeltmesi ve 12 dil çekimi bekliyor.
- İki ayrı akış kontrol edilecek: çizilmiş rotanın 3D yükseklik önizlemesi ve
  kaydedilmiş izin 3D görünümü. Bunlar serbest bir 3D model editörü değildir.
- Kamera döndürme/zoom, yükseklik profili, renk ölçeği ve mevcut diğer
  kontroller ancak gerçek arayüzde doğrulanınca adımlara eklenecek.
- Kaynak: `MapNeroApp/UI/Map/3D/RouteElevationPreviewView.swift`,
  `MapNeroApp/UI/Features/Track3dview.swift`, Flutter
  `route_elevation_preview_screen.dart` ve `elevation_profile_view.dart`.
- iOS önizlemesi arazi yükseklik verisi örnekliyor; veri alınamaması/yeniden
  deneme durumu anlatılacak. Offline çalışma ve doğruluk iddiası çıkarılmayacak.
- Canlı kontrolde ilk rota noktası eklenince `Location Sharing Consent`
  açıldı: yükseklik/hava durumu/nüfus için koordinatın üçüncü taraf servise
  gönderilmesini onaylatıyor. İzin kendiliğinden verilmedi; Serhan'a yalnızca
  demo koordinatları için soruldu. İzin gereksinimi rehberde atlanmayacak.

## Track raporu

- 2026-09-08: `track-report` konusu Apple için 12 dilde eklendi. Kartın
  yatay işlem satırı → Daha Fazla → Analiz/Rapor, ayrıntılı Core+ bölümü ve
  PDF hazırlama/paylaşım yolu kaynak koddan doğrulandı; rapor/PDF uçtan uca
  simülatör testi ve ekranları henüz yapılmadı.
- `TrackReportBuilder` yer adlarını ve hava durumunu rapor hazırlanırken
  sorguluyor. Hava durumu geçmiş yolculuk koşulu olarak anlatılmıyor;
  çevrimiçi veri gelmeyince koordinat/eksik hava durumu olabileceği 12 dilde
  açıklandı. Raporun harici servis çağrıları için onay kendiliğinden verilmedi.
- İki yeni konu 24 dil/konu birleşiminde tarayıcıdan açıldı: beklenen 3/4
  adım, doğru başlık, ar/ur RTL, yatay taşma yok. Eksik ekranlar gizli; başka
  dilin görseliyle doldurulmadı. 10 otomatik test ve JS/diff kontrolleri geçti.
- Kayıtlı iz seçme → ayrıntı/rapor → grafikler → PDF paylaşma/kaydetme.
- Mesafe, süre, hız, yükseklik ve veri eksikliği olan alanlar birbirinden
  ayrılacak. Çizilmiş rotaya gerçek yürüyüş süresi/hızı yakıştırılmayacak.
- Kaynak: `MapNeroApp/UI/Features/TrackDetailView.swift` ve
  `mapnero_flutter/lib/features/map/track_report/track_report_screen.dart`.
- Kaynakta iOS ayrıntılı rapor bölümü ve PDF paylaşımı Core+, Android rapor
  ekranı Core+ kontrolü var; iOS temel track istatistikleri bu kapıdan ayrı.
  Bunlar aynı erişim sınırı kabul edilmeden cihazda ayrı teyit edilecek.
- Rapor çekimi için boş/sıfır noktalı kayıt değil, açıkça örnek olarak
  tanımlanmış geçerli demo iz kullanılacak; kişisel saha izi yayınlanmayacak.

## Tamamlanma ölçütü

### Cluster analizi — 2026-09-08

- Serhan'ın ek isteği kılavuz kapsamına alındı. Apple ve Android için
  `cluster-analysis` konusu 12 dilde eklendi; web'de eşdeğer akış varsayılmadı.
- Kaynak: Apple `LayerLibraryView.swift` sheet/menu/clusterPoints;
  Flutter `layer_library_view.dart` `_analyzeEodCluster`, `hasClusterAnalysis`;
  iki platformun `EODClusterEngine` ve sonuç ekranları. Pro+, en az 8 nokta,
  katman menüsü ve DBSCAN/görsel pin gruplaması ayrımı doğrulandı.
- Bu yalnız erişim/girdi ve yorumlama sınırları anlatımıdır. EOD tahminleri,
  risk etiketleri veya dışa aktarılan rapor bağımsız saha doğrulaması değildir.
  Hesaplar değiştirilmedi, operasyonel kullanım talimatı eklenmedi.
- 11 test, JS sözdizimi ve diff kontrolü geçti. Mevcut tarayıcı bağlantısıyla
  24 platform/dil görünümünde iki adım, RTL ve 621 px'te yatay taşma olmaması
  doğrulandı. agent-browser CLI kurulu olmadığından mevcut tarayıcı arayüzü
  kullanıldı. Türkçe kartlar görüldü; uzun sayfa ekran yakalamasında birleşim
  artefaktı oluştu, yayın görseli olarak kullanılmadı.
- Gerçek cluster uygulama görüntüleri ve cihazdaki analiz/PDF kabulü henüz
  yapılmadı; toplam gerçek iPhone kılavuz ekranı 72. Sonraki çekim: kişisel
  olmayan en az 8 demo nokta, katman menüsü ve sonuç ekranı, her dil ayrı;
  tahmin alanlarını kanıtlanmış sonuç gibi sunmadan. iPad/Mac/Android ayrı kabul.
- Çeviriler kaynak kod doğrulamasının yerine geçmez; EOD terimleri için
  uzman dil incelemesi ve cihaz ekranı eşleşmesi yayın öncesinde gerekli.

Her desteklenen platform için erişim yolu ve abonelik sınırı doğrulanmış
adımlar; 12 dilde uygulamanın kendi dilinde çekilmiş görüntüler; iPhone,
iPad/Mac, Android ve web sınırlarının açık tutulması; görsel inceleme ve
kılavuzdaki dil/görüntü eşleşme testleri. Bu dosya bir çekim planıdır, bütün
akışların çalıştığına veya ekranların tamamlandığına dair kanıt değildir.
