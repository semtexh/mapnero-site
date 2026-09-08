(function () {
  "use strict";
  // Shared point-placement wording is source-verified for both platforms.
  // Android entry, save label and elevation fallback are deliberately separate.
  const android = {
    en: [
      "Select a visible, unlocked, writable feature layer. Open Route from the map toolbar or More menu, depending on your toolbar layout.",
      "With at least two points, tap the green Save button (it may still say Save in another app language). The route is saved to the target layer. X closes the builder and discards an unsaved draft.",
      "The panel’s 3D button opens a terrain-elevation preview, not a drawing editor. Online elevation lookup may ask permission to send coordinates to an external service. Missing data or declined permission can produce zero heights: a flat preview is not proof of flat terrain. You can still draw and save the route without that lookup."
    ],
    tr: [
      "Görünür, kilitsiz ve yazılabilir bir özellik katmanı seçin. Araç çubuğu düzeninize göre haritadaki Rota düğmesini veya Daha Fazla menüsündeki Rota seçeneğini açın.",
      "En az iki nokta varken yeşil Save düğmesine dokunun (uygulama başka dilde olsa da Save yazabilir). Rota hedef katmana kaydolur. X paneli kapatır ve kaydedilmemiş taslağı siler.",
      "Paneldeki 3D düğmesi arazi yüksekliği önizlemesi açar; çizim editörü değildir. Çevrimiçi yükseklik sorgusu koordinatları dış servise göndermek için izin isteyebilir. Veri eksikse veya izin reddedilirse sıfır yükseklikler görünebilir; düz önizleme arazinin düz olduğunu kanıtlamaz. Bu sorgu olmadan da rotayı çizip kaydedebilirsiniz."
    ],
    de: [
      "Eine sichtbare, entsperrte und beschreibbare Objektebene wählen. Je nach Werkzeugleistenlayout Route direkt auf der Karte oder im Menü Mehr öffnen.",
      "Ab zwei Punkten die grüne Schaltfläche Save antippen. Sie kann auch bei anderer App-Sprache Save heißen. Die Route wird in der Zielebene gespeichert. X schließt den Planer und verwirft den ungespeicherten Entwurf.",
      "3D im Routenpanel öffnet eine Geländehöhen-Vorschau, keinen Zeicheneditor. Die Online-Abfrage kann die Zustimmung zum Senden von Koordinaten an einen externen Dienst verlangen. Fehlende Daten oder abgelehnte Zustimmung können Nullhöhen ergeben: Eine flache Vorschau beweist kein flaches Gelände. Zeichnen und Speichern sind auch ohne diese Abfrage möglich."
    ],
    es: [
      "Selecciona una capa de elementos visible, desbloqueada y editable. Abre Ruta desde la barra del mapa o el menú Más, según la configuración de la barra.",
      "Con al menos dos puntos, pulsa el botón verde Save (puede seguir apareciendo en inglés). La ruta se guarda en la capa de destino. X cierra el panel y descarta el borrador sin guardar.",
      "El botón 3D del panel abre una vista previa de elevación del terreno, no un editor de dibujo. La consulta en línea puede pedir permiso para enviar coordenadas a un servicio externo. Los datos ausentes o el permiso rechazado pueden producir alturas cero: una vista plana no demuestra que el terreno sea llano. Puedes dibujar y guardar sin esa consulta."
    ],
    fr: [
      "Sélectionnez une couche d’objets visible, déverrouillée et modifiable. Selon votre barre d’outils, ouvrez Itinéraire sur la carte ou dans le menu Plus.",
      "Avec au moins deux points, touchez le bouton vert Save (il peut rester en anglais). L’itinéraire est enregistré dans la couche cible. X ferme le panneau et abandonne le brouillon non enregistré.",
      "Le bouton 3D du panneau ouvre un aperçu des altitudes du terrain, pas un éditeur de dessin. La recherche en ligne peut demander l’autorisation d’envoyer des coordonnées à un service externe. Sans données ou autorisation, des altitudes nulles peuvent apparaître : un aperçu plat ne prouve pas que le terrain est plat. Le dessin et l’enregistrement restent possibles sans cette recherche."
    ],
    it: [
      "Seleziona un livello di elementi visibile, sbloccato e modificabile. Apri Percorso dalla barra della mappa o dal menu Altro, secondo la disposizione dei pulsanti.",
      "Con almeno due punti, tocca il pulsante verde Save (può restare in inglese). Il percorso viene salvato nel livello di destinazione. X chiude il pannello ed elimina la bozza non salvata.",
      "Il pulsante 3D del pannello apre un’anteprima delle quote del terreno, non un editor di disegno. La ricerca online può chiedere il consenso per inviare coordinate a un servizio esterno. Dati mancanti o consenso negato possono produrre quote zero: un’anteprima piatta non dimostra che il terreno sia pianeggiante. Puoi disegnare e salvare anche senza questa ricerca."
    ],
    pt: [
      "Selecione uma camada de elementos visível, desbloqueada e editável. Abra Rota na barra do mapa ou no menu Mais, conforme a disposição dos botões.",
      "Com pelo menos dois pontos, toque no botão verde Save (pode continuar em inglês). A rota é guardada na camada de destino. X fecha o painel e descarta o rascunho não guardado.",
      "O botão 3D do painel abre uma pré-visualização da elevação do terreno, não um editor de desenho. A consulta online pode pedir autorização para enviar coordenadas a um serviço externo. Dados em falta ou autorização recusada podem produzir altitudes zero: uma pré-visualização plana não prova que o terreno seja plano. Pode desenhar e guardar sem essa consulta."
    ],
    ru: [
      "Выберите видимый, разблокированный и доступный для записи слой объектов. Откройте Маршрут на панели карты или в меню Ещё — в зависимости от расположения кнопок.",
      "Добавив минимум две точки, нажмите зелёную кнопку Save (название может оставаться английским). Маршрут сохранится в целевом слое. X закрывает панель и удаляет несохранённый черновик.",
      "Кнопка 3D на панели открывает предварительный просмотр высот рельефа, а не редактор рисования. Онлайн-запрос может потребовать согласия на отправку координат внешнему сервису. При отсутствии данных или отказе в согласии высоты могут быть нулевыми: плоский вид не доказывает, что местность ровная. Рисовать и сохранять маршрут можно без этого запроса."
    ],
    uk: [
      "Виберіть видимий, розблокований і доступний для запису шар об’єктів. Відкрийте Маршрут на панелі карти або в меню Ще — залежно від розташування кнопок.",
      "Додавши щонайменше дві точки, натисніть зелену кнопку Save (назва може залишатися англійською). Маршрут збережеться в цільовому шарі. X закриває панель і видаляє незбережену чернетку.",
      "Кнопка 3D на панелі відкриває попередній перегляд висот рельєфу, а не редактор малювання. Онлайн-запит може потребувати згоди на передавання координат зовнішньому сервісу. Без даних або згоди висоти можуть бути нульовими: плоский вигляд не доводить, що місцевість рівна. Малювати й зберігати маршрут можна без цього запиту."
    ],
    ar: [
      "اختر طبقة معالم ظاهرة وغير مقفلة وقابلة للكتابة. افتح المسار من شريط أدوات الخريطة أو قائمة المزيد حسب ترتيب أزرارك.",
      "بعد إضافة نقطتين على الأقل، اضغط زر Save الأخضر (قد يبقى اسمه بالإنجليزية). يُحفظ المسار في الطبقة المستهدفة. يغلق X اللوحة ويحذف المسودة غير المحفوظة.",
      "يفتح زر 3D في اللوحة معاينة لارتفاعات التضاريس وليس محرر رسم. قد يطلب الاستعلام عبر الإنترنت إذناً لإرسال الإحداثيات إلى خدمة خارجية. قد تظهر ارتفاعات صفرية عند غياب البيانات أو رفض الإذن؛ المعاينة المسطحة لا تثبت أن الأرض مسطحة. يمكنك رسم المسار وحفظه دون هذا الاستعلام."
    ],
    hi: [
      "दिखाई देने वाली, अनलॉक और लिखने योग्य फ़ीचर लेयर चुनें। टूलबार के क्रम के अनुसार मानचित्र के Route बटन या More मेनू से रूट खोलें।",
      "कम से कम दो बिंदुओं के बाद हरा Save बटन दबाएँ (दूसरी ऐप भाषा में भी Save लिखा हो सकता है)। रूट लक्ष्य लेयर में सहेजा जाता है। X पैनल बंद करके बिना सहेजा ड्राफ़्ट मिटा देता है।",
      "पैनल का 3D बटन भूभाग की ऊँचाई का पूर्वावलोकन खोलता है, ड्रॉइंग एडिटर नहीं। ऑनलाइन ऊँचाई खोज बाहरी सेवा को निर्देशांक भेजने की अनुमति माँग सकती है। डेटा न होने या अनुमति अस्वीकार होने पर शून्य ऊँचाई दिख सकती है: सपाट पूर्वावलोकन समतल भूभाग का प्रमाण नहीं है। इस खोज के बिना भी रूट बनाकर सहेज सकते हैं।"
    ],
    ur: [
      "نظر آنے والی، غیر مقفل اور قابلِ تحریر فیچر لیئر منتخب کریں۔ بٹنوں کی ترتیب کے مطابق نقشے کے Route بٹن یا More مینو سے راستہ کھولیں۔",
      "کم از کم دو نقاط کے بعد سبز Save بٹن دبائیں (ایپ کی دوسری زبان میں بھی Save لکھا ہو سکتا ہے)۔ راستہ ہدف لیئر میں محفوظ ہوتا ہے۔ X پینل بند کر کے غیر محفوظ مسودہ مٹا دیتا ہے۔",
      "پینل کا 3D بٹن زمینی بلندیوں کا پیش منظر کھولتا ہے، ڈرائنگ ایڈیٹر نہیں۔ آن لائن بلندی کی تلاش بیرونی سروس کو مختصات بھیجنے کی اجازت مانگ سکتی ہے۔ معلومات نہ ہونے یا اجازت مسترد ہونے پر صفر بلندیاں دکھ سکتی ہیں؛ ہموار پیش منظر ہموار زمین کا ثبوت نہیں۔ اس تلاش کے بغیر بھی راستہ بنا کر محفوظ کر سکتے ہیں۔"
    ]
  };
  for (const {id} of window.MAPNERO_GUIDE_LOCALES) {
    const platforms = window.MAPNERO_GUIDES[id].platforms;
    const source = platforms.apple.topics.find(topic => topic.id === "route-builder");
    const copy = android[id];
    if (!source || !copy) throw new Error("Missing Android route guide: " + id);
    platforms.android.topics.push({
      ...source,
      steps: source.steps.map((step, index) => ({...step,
        body: index === 0 ? copy[0] : index === 3 ? copy[1] : step.body})),
      tips: [{q: source.tips[0].q, a: copy[2]}]
    });
  }
})();
