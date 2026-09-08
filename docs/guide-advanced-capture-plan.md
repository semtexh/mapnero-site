# Gelişmiş kullanım kılavuzu kapsamı

Tarih: 2026-09-08. Serhan'ın doğrudan isteği: rota oluşturma, 3D çizim/görünüm,
track raporu ve bu araçların ayrıntıları da gerçek, her dile özel ekranlarla
anlatılacak. Karar: mevcut kılavuz işine dahil; yeni uygulama özelliği geliştirme
talebi olarak yorumlanmadı. Kapsamın tamamı henüz bitmedi; doğrulanan ilerleme
aşağıdaki güncel durum bölümünde ayrılıyor.

## Güncel durum

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

Her desteklenen platform için erişim yolu ve abonelik sınırı doğrulanmış
adımlar; 12 dilde uygulamanın kendi dilinde çekilmiş görüntüler; iPhone,
iPad/Mac, Android ve web sınırlarının açık tutulması; görsel inceleme ve
kılavuzdaki dil/görüntü eşleşme testleri. Bu dosya bir çekim planıdır, bütün
akışların çalıştığına veya ekranların tamamlandığına dair kanıt değildir.
