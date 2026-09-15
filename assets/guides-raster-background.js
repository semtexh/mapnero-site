(function () {
  "use strict";
  // Source-aligned instructions. Missing device captures stay hidden; do not
  // reuse an import-screen image as evidence for this separate workflow.
  const copy = {
    en: ["GeoTIFF / PDF background", "Choose geographic context or a clean canvas without changing the saved map.",
      "Open the georeferenced map", "In Map Library, open a GeoTIFF, GeoPDF or manually referenced map. An image without a geographic reference needs georeferencing first.",
      "Choose the background", "Open More (…). Under Map Background, choose Basemap to see the surrounding area or Blank Canvas to hide it.",
      "Adjust visibility", "With Basemap selected, move the background visibility/opacity slider. A lower value makes the background less prominent. This does not edit the original file or your feature styles.",
      "Find the map again", "Use Fit Map / fit to screen to return to the map’s extent. Locate centres on your current GPS position, which may be far outside this map.",
      "A basemap helps you compare alignment; it is not proof of surveying accuracy. Online backgrounds may need internet. Keep the map downloaded and use Blank Canvas when geographic context is unnecessary."],
    tr: ["GeoTIFF / PDF arka planı", "Kaydedilmiş haritayı değiştirmeden coğrafi altlık veya boş kanvas seçin.",
      "Referanslı haritayı açın", "Harita Kütüphanesi’nden GeoTIFF, GeoPDF ya da elle referanslandırılmış haritayı açın. Coğrafi referansı olmayan görüntü önce referanslandırılmalıdır.",
      "Arka planı seçin", "Diğer (…) menüsünü açın. Harita Arka Planı altında çevreyi görmek için Altlık Harita, gizlemek için Boş Kanvas seçin.",
      "Görünürlüğü ayarlayın", "Altlık Harita seçiliyken arka plan görünürlük/opaklık sürgüsünü kaydırın. Düşük değer altlığı daha silik yapar. Orijinal dosya ve objelerin stilleri değişmez.",
      "Haritayı yeniden bulun", "Haritanın kapsamına dönmek için Haritayı Sığdır / ekrana sığdır düğmesini kullanın. Konumumu Bul, bu haritadan çok uzakta olabilecek GPS konumunuza gider.",
      "Altlık hizalamayı karşılaştırmaya yardımcı olur; ölçme doğruluğunun kanıtı değildir. Çevrimiçi altlık internet gerektirebilir. Haritayı indirilmiş tutun; çevre bilgisi gerekmediğinde Boş Kanvas kullanın."],
    de: ["GeoTIFF-/PDF-Hintergrund", "Geografischen Kontext oder eine leere Zeichenfläche wählen, ohne die gespeicherte Karte zu ändern.",
      "Georeferenzierte Karte öffnen", "Öffnen Sie in der Kartenbibliothek eine GeoTIFF-, GeoPDF- oder manuell georeferenzierte Karte. Ein Bild ohne Ortsbezug muss zuerst georeferenziert werden.",
      "Hintergrund wählen", "Öffnen Sie Mehr (…). Wählen Sie unter Kartenhintergrund die Basiskarte für die Umgebung oder Leere Zeichenfläche, um sie auszublenden.",
      "Sichtbarkeit einstellen", "Bei gewählter Basiskarte bewegen Sie den Regler für Hintergrundsichtbarkeit/Deckkraft. Ein niedrigerer Wert macht den Hintergrund unauffälliger. Originaldatei und Objektstile bleiben unverändert.",
      "Karte wiederfinden", "Mit Karte einpassen kehren Sie zur Kartenausdehnung zurück. Standort zentriert dagegen Ihre aktuelle GPS-Position, die weit außerhalb der Karte liegen kann.",
      "Die Basiskarte hilft beim Vergleich der Ausrichtung, belegt aber keine Vermessungsgenauigkeit. Online-Hintergründe benötigen möglicherweise Internet. Halten Sie die Karte heruntergeladen und nutzen Sie bei Bedarf die leere Zeichenfläche."],
    es: ["Fondo de GeoTIFF / PDF", "Elija contexto geográfico o un lienzo vacío sin cambiar el mapa guardado.",
      "Abra el mapa georreferenciado", "En la Biblioteca de mapas, abra un GeoTIFF, GeoPDF o mapa referenciado manualmente. Una imagen sin referencia geográfica debe georreferenciarse primero.",
      "Elija el fondo", "Abra Más (…). En Fondo del mapa, elija Mapa base para ver el entorno o Lienzo vacío para ocultarlo.",
      "Ajuste la visibilidad", "Con Mapa base seleccionado, mueva el control de visibilidad/opacidad del fondo. Un valor menor hace el fondo menos destacado. No modifica el archivo original ni los estilos de las entidades.",
      "Vuelva a encontrar el mapa", "Use Ajustar mapa / ajustar a pantalla para volver a la extensión del mapa. Localizar centra la posición GPS actual, que puede estar muy lejos del mapa.",
      "El mapa base permite comparar la alineación; no demuestra precisión topográfica. Los fondos en línea pueden necesitar internet. Mantenga el mapa descargado y use Lienzo vacío si no necesita el entorno."],
    fr: ["Arrière-plan GeoTIFF / PDF", "Choisissez un contexte géographique ou un canevas vide sans modifier la carte enregistrée.",
      "Ouvrir la carte géoréférencée", "Dans la bibliothèque, ouvrez un GeoTIFF, GeoPDF ou une carte référencée manuellement. Une image sans référence géographique doit d’abord être géoréférencée.",
      "Choisir l’arrière-plan", "Ouvrez Plus (…). Dans Arrière-plan de la carte, choisissez Fond de carte pour afficher les environs ou Canevas vide pour les masquer.",
      "Régler la visibilité", "Avec Fond de carte sélectionné, déplacez le curseur de visibilité/opacité de l’arrière-plan. Une valeur faible rend le fond plus discret. Le fichier original et les styles des entités ne changent pas.",
      "Retrouver la carte", "Utilisez Ajuster la carte / à l’écran pour revenir à son étendue. Localiser centre votre position GPS actuelle, qui peut être très éloignée de la carte.",
      "Le fond permet de comparer l’alignement, sans prouver une précision d’arpentage. Un fond en ligne peut nécessiter internet. Gardez la carte téléchargée et choisissez Canevas vide si les environs ne sont pas nécessaires."],
    it: ["Sfondo GeoTIFF / PDF", "Scegli il contesto geografico o una tela vuota senza modificare la mappa salvata.",
      "Apri la mappa georeferenziata", "Nella Libreria mappe apri un GeoTIFF, GeoPDF o una mappa referenziata manualmente. Un’immagine priva di riferimento geografico va prima georeferenziata.",
      "Scegli lo sfondo", "Apri Altro (…). In Sfondo mappa scegli Mappa di base per vedere i dintorni o Tela vuota per nasconderli.",
      "Regola la visibilità", "Con Mappa di base selezionata, sposta il cursore di visibilità/opacità dello sfondo. Un valore inferiore rende lo sfondo meno evidente. Il file originale e gli stili degli elementi non cambiano.",
      "Ritrova la mappa", "Usa Adatta mappa / allo schermo per tornare all’estensione della mappa. Localizza centra invece la posizione GPS attuale, che può essere molto lontana.",
      "La mappa di base aiuta a confrontare l’allineamento, ma non dimostra precisione topografica. Gli sfondi online possono richiedere internet. Mantieni la mappa scaricata e usa Tela vuota quando i dintorni non servono."],
    pt: ["Fundo de GeoTIFF / PDF", "Escolha contexto geográfico ou uma tela vazia sem alterar o mapa guardado.",
      "Abra o mapa georreferenciado", "Na Biblioteca de mapas, abra um GeoTIFF, GeoPDF ou mapa referenciado manualmente. Uma imagem sem referência geográfica precisa primeiro de georreferenciação.",
      "Escolha o fundo", "Abra Mais (…). Em Fundo do mapa, escolha Mapa base para ver os arredores ou Tela vazia para os ocultar.",
      "Ajuste a visibilidade", "Com Mapa base selecionado, mova o controlo de visibilidade/opacidade do fundo. Um valor menor torna o fundo mais discreto. O ficheiro original e os estilos das feições não mudam.",
      "Volte a encontrar o mapa", "Use Ajustar mapa / ao ecrã para voltar à extensão do mapa. Localizar centra a posição GPS atual, que pode estar muito longe deste mapa.",
      "O mapa base ajuda a comparar o alinhamento; não comprova precisão topográfica. Os fundos online podem precisar de internet. Mantenha o mapa descarregado e use Tela vazia quando não precisar dos arredores."],
    ru: ["Фон GeoTIFF / PDF", "Выберите географическую подложку или пустой холст, не изменяя сохранённую карту.",
      "Откройте привязанную карту", "В библиотеке откройте GeoTIFF, GeoPDF или карту с ручной привязкой. Изображение без географической привязки сначала нужно привязать.",
      "Выберите фон", "Откройте Ещё (…). В разделе Фон карты выберите Базовая карта для отображения окрестностей или Пустой холст, чтобы скрыть их.",
      "Настройте видимость", "При выбранной базовой карте перемещайте ползунок видимости/непрозрачности фона. Меньшее значение делает фон менее заметным. Исходный файл и стили объектов не меняются.",
      "Вернитесь к карте", "Используйте Вписать карту / в экран, чтобы вернуться к её охвату. Местоположение центрирует текущую GPS-позицию, которая может быть далеко за пределами карты.",
      "Подложка помогает сравнить совмещение, но не доказывает геодезическую точность. Онлайн-фон может требовать интернета. Держите карту загруженной и выбирайте пустой холст, если окрестности не нужны."],
    uk: ["Фон GeoTIFF / PDF", "Виберіть географічну підкладку або порожнє полотно без зміни збереженої карти.",
      "Відкрийте прив’язану карту", "У бібліотеці відкрийте GeoTIFF, GeoPDF або карту з ручною прив’язкою. Зображення без географічної прив’язки спочатку потрібно прив’язати.",
      "Виберіть фон", "Відкрийте Ще (…). У розділі Фон карти виберіть Базова карта для показу околиць або Порожнє полотно, щоб приховати їх.",
      "Налаштуйте видимість", "Коли вибрано базову карту, пересувайте повзунок видимості/непрозорості фону. Менше значення робить фон менш помітним. Оригінальний файл і стилі об’єктів не змінюються.",
      "Поверніться до карти", "Скористайтеся Вписати карту / в екран, щоб повернутися до її охоплення. Місцеположення центрує поточну GPS-позицію, яка може бути далеко поза картою.",
      "Підкладка допомагає порівняти суміщення, але не доводить геодезичну точність. Онлайн-фон може потребувати інтернету. Зберігайте карту завантаженою та використовуйте порожнє полотно, якщо околиці не потрібні."],
    ar: ["خلفية GeoTIFF / PDF", "اختر سياقًا جغرافيًا أو لوحة فارغة دون تغيير الخريطة المحفوظة.",
      "افتح الخريطة ذات الإسناد الجغرافي", "من مكتبة الخرائط افتح GeoTIFF أو GeoPDF أو خريطة أُسنِدت يدويًا. تحتاج الصورة بلا إسناد جغرافي إلى إسنادها أولًا.",
      "اختر الخلفية", "افتح المزيد (…). في خلفية الخريطة اختر الخريطة الأساسية لإظهار المنطقة المحيطة أو لوحة فارغة لإخفائها.",
      "اضبط الظهور", "عند اختيار الخريطة الأساسية حرّك شريط ظهور/عتامة الخلفية. تجعل القيمة الأقل الخلفية أقل بروزًا. لا يتغير الملف الأصلي أو أنماط المعالم.",
      "اعثر على الخريطة مجددًا", "استخدم ملاءمة الخريطة للشاشة للعودة إلى نطاق الخريطة. أما تحديد الموقع فيوسّط موضع GPS الحالي، وقد يكون بعيدًا جدًا عن هذه الخريطة.",
      "تساعد الخريطة الأساسية على مقارنة المحاذاة، لكنها ليست دليلًا على دقة المسح. قد تحتاج الخلفيات المتصلة إلى الإنترنت. احتفظ بالخريطة منزّلة واستخدم لوحة فارغة عندما لا تحتاج إلى السياق المحيط."],
    hi: ["GeoTIFF / PDF पृष्ठभूमि", "सहेजे गए मानचित्र को बदले बिना भौगोलिक संदर्भ या खाली कैनवास चुनें।",
      "जियोरेफ़रेंस किया गया मानचित्र खोलें", "Map Library में GeoTIFF, GeoPDF या मैन्युअल रूप से संदर्भित मानचित्र खोलें। बिना भौगोलिक संदर्भ वाली छवि को पहले जियोरेफ़रेंस करना होगा।",
      "पृष्ठभूमि चुनें", "More (…) खोलें। Map Background में आसपास का क्षेत्र देखने के लिए Basemap या उसे छिपाने के लिए Blank Canvas चुनें।",
      "दृश्यता समायोजित करें", "Basemap चुना होने पर पृष्ठभूमि की दृश्यता/अपारदर्शिता का स्लाइडर चलाएँ। कम मान से पृष्ठभूमि हल्की दिखती है। मूल फ़ाइल और फ़ीचर शैलियाँ नहीं बदलतीं।",
      "मानचित्र फिर खोजें", "मानचित्र के पूरे क्षेत्र पर लौटने के लिए Fit Map / स्क्रीन में फ़िट करें का उपयोग करें। Locate आपकी वर्तमान GPS स्थिति पर जाता है, जो इस मानचित्र से बहुत दूर हो सकती है।",
      "बेसमैप से संरेखण की तुलना की जा सकती है; यह सर्वेक्षण सटीकता का प्रमाण नहीं है। ऑनलाइन पृष्ठभूमि के लिए इंटरनेट लग सकता है। मानचित्र डाउनलोड करके रखें और आसपास का संदर्भ आवश्यक न हो तो Blank Canvas चुनें।"],
    ur: ["GeoTIFF / PDF پس منظر", "محفوظ نقشہ بدلے بغیر جغرافیائی پس منظر یا خالی کینوس منتخب کریں۔",
      "جغرافیائی حوالہ والا نقشہ کھولیں", "Map Library سے GeoTIFF، GeoPDF یا دستی طور پر حوالہ دیا گیا نقشہ کھولیں۔ جغرافیائی حوالے کے بغیر تصویر کو پہلے جیو ریفرنس کرنا ہوگا۔",
      "پس منظر منتخب کریں", "More (…) کھولیں۔ Map Background میں اردگرد کا علاقہ دیکھنے کے لیے Basemap یا اسے چھپانے کے لیے Blank Canvas منتخب کریں۔",
      "نمایاں پن بدلیں", "Basemap منتخب ہونے پر پس منظر کی visibility/opacity سلائیڈر حرکت دیں۔ کم قدر پس منظر کو ہلکا کرتی ہے۔ اصل فائل اور فیچر کے انداز نہیں بدلتے۔",
      "نقشہ دوبارہ تلاش کریں", "نقشے کی حدود پر واپس جانے کے لیے Fit Map / اسکرین میں فٹ کریں استعمال کریں۔ Locate آپ کی موجودہ GPS جگہ پر جاتا ہے، جو اس نقشے سے بہت دور ہو سکتی ہے۔",
      "بیس میپ سیدھ کا موازنہ کرنے میں مدد دیتا ہے، مگر سروے کی درستگی کا ثبوت نہیں۔ آن لائن پس منظر کو انٹرنیٹ درکار ہو سکتا ہے۔ نقشہ ڈاؤن لوڈ رکھیں اور اردگرد کا سیاق ضروری نہ ہو تو Blank Canvas استعمال کریں۔"]
  };
  for (const { id } of window.MAPNERO_GUIDE_LOCALES) {
    const c = copy[id];
    if (!c || c.length !== 11) throw new Error("Missing raster guide translation: " + id);
    for (const platform of ["apple", "android"]) {
      window.MAPNERO_GUIDES[id].platforms[platform].topics.push({
        id: "raster-background", title: c[0], summary: c[1], note: c[10], access: "GeoTIFF · GeoPDF",
        steps: [2, 4, 6, 8].map(i => ({ title: c[i], body: c[i + 1] })), tips: []
      });
    }
  }
})();
