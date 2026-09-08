# Gelişmiş kullanım kılavuzu kapsamı

Tarih: 2026-09-08. Serhan'ın doğrudan isteği: rota oluşturma, 3D çizim/görünüm,
track raporu ve bu araçların ayrıntıları da gerçek, her dile özel ekranlarla
anlatılacak. Karar: mevcut kılavuz işine dahil; yeni uygulama özelliği geliştirme
talebi olarak yorumlanmadı. Aşağıdaki maddeler henüz tamamlanmış kılavuz değildir.

## Rota oluşturma

- Harita → More → Route Builder yolu iPhone simülatöründe görüldü.
- Crosshair ile nokta ekleme, noktaları sıralama/düzenleme seçenekleri, toplam
  mesafe, katmana kaydetme, tekrar açma ve varsa platforma özgü navigasyon.
- En az iki noktalı, kişisel veri içermeyen örnek üzerinde ekranlar çekilecek.
- Manuel nokta birleştirme, yol ağına otomatik oturan rota hesaplaması gibi
  anlatılmayacak; cihazda doğrulanmayan seçenek yayınlanmayacak.
- Kaynak: `MapNeroApp/UI/Map/RouteBuilderPanelView.swift`, Flutter karşılığı
  `mapnero_flutter/lib/features/map/route_builder_panel.dart`.

## 3D çizim/görünüm ve yükseklik

- İki ayrı akış kontrol edilecek: çizilmiş rotanın 3D yükseklik önizlemesi ve
  kaydedilmiş izin 3D görünümü. Bunlar serbest bir 3D model editörü değildir.
- Kamera döndürme/zoom, yükseklik profili, renk ölçeği ve mevcut diğer
  kontroller ancak gerçek arayüzde doğrulanınca adımlara eklenecek.
- Kaynak: `MapNeroApp/UI/Map/3D/RouteElevationPreviewView.swift`,
  `MapNeroApp/UI/Features/Track3dview.swift`, Flutter
  `route_elevation_preview_screen.dart` ve `elevation_profile_view.dart`.
- iOS önizlemesi arazi yükseklik verisi örnekliyor; veri alınamaması/yeniden
  deneme durumu anlatılacak. Offline çalışma ve doğruluk iddiası çıkarılmayacak.

## Track raporu

- Kayıtlı iz seçme → ayrıntı/rapor → grafikler → PDF paylaşma/kaydetme.
- Mesafe, süre, hız, yükseklik ve veri eksikliği olan alanlar birbirinden
  ayrılacak. Çizilmiş rotaya gerçek yürüyüş süresi/hızı yakıştırılmayacak.
- Kaynak: `MapNeroApp/UI/Features/TrackDetailView.swift` ve
  `mapnero_flutter/lib/features/map/track_report/track_report_screen.dart`.
- Kaynakta iOS PDF paylaşımı Core+, Android rapor ekranı Core+ kontrolü var.
  Bunlar aynı erişim sınırı kabul edilmeden cihazda ayrı teyit edilecek.
- Rapor çekimi için boş/sıfır noktalı kayıt değil, açıkça örnek olarak
  tanımlanmış geçerli demo iz kullanılacak; kişisel saha izi yayınlanmayacak.

## Tamamlanma ölçütü

Her desteklenen platform için erişim yolu ve abonelik sınırı doğrulanmış
adımlar; 12 dilde uygulamanın kendi dilinde çekilmiş görüntüler; iPhone,
iPad/Mac, Android ve web sınırlarının açık tutulması; görsel inceleme ve
kılavuzdaki dil/görüntü eşleşme testleri. Bu dosya bir çekim planıdır, bütün
akışların çalıştığına veya ekranların tamamlandığına dair kanıt değildir.
