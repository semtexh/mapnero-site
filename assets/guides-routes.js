(function () {
  "use strict";
  // Native Apple route workflow. Do not copy this into Android/Web without
  // checking their entry points, save flow and navigation controls separately.
  const routes = {
    en: {
      title: "Plan a route with waypoints",
      summary: "Place route points with the centre crosshair, inspect the distance and save the route to a layer.",
      access: "A visible, writable layer is required",
      note: "This connects the points you choose; it does not automatically find a road or a safe walking route. A drawn route is a plan, not a recorded trip with real travel times or speeds.",
      steps: [
        ["Open Route Builder", "Choose a visible, unlocked layer, then open More → Route Builder on the map."],
        ["Place the first point", "Pan the map until the centre crosshair is over your starting point, then tap Add Waypoint. Your GPS position does not have to be there."],
        ["Extend and check the route", "Move the crosshair and add at least one more point. Check the waypoint list and total distance. Use a row’s minus button to remove a mistaken point; the trash button clears the whole draft."],
        ["Save the route", "With at least two points, use the green Save to Layer button. The builder closes and the route is stored in the target layer. Closing with X discards an unsaved draft."]
      ],
      tips: [["What about elevation and 3D?", "Elevation lookup can ask permission to send coordinates to an external service. Declining does not prevent drawing the route. The 3D button opens a terrain-elevation preview that needs elevation data; it is not a free-form 3D drawing tool."]]
    },
    tr: {
      title: "Noktalarla rota planlayın",
      summary: "Merkez artısıyla rota noktaları yerleştirin, mesafeyi inceleyin ve rotayı katmana kaydedin.",
      access: "Görünür ve yazılabilir katman gerekir",
      note: "Seçtiğiniz noktalar birleştirilir; otomatik yol veya güvenli yürüyüş güzergâhı bulunmaz. Çizilmiş rota bir plandır; gerçek yolculuk süresi ve hızı içeren GPS kaydı değildir.",
      steps: [
        ["Rota Oluşturucu’yu açın", "Görünür, kilitsiz bir katman seçin; haritada Daha Fazla → Rota Oluşturucu’yu açın."],
        ["İlk noktayı yerleştirin", "Haritayı kaydırıp merkez artısını başlangıcınıza getirin, ardından Nokta Ekle’ye dokunun. GPS konumunuzun orada olması gerekmez."],
        ["Rotayı uzatıp kontrol edin", "Artıyı taşıyıp en az bir nokta daha ekleyin. Nokta listesini ve toplam mesafeyi kontrol edin. Hatalı noktayı satırındaki eksi düğmesiyle kaldırın; çöp kutusu bütün taslağı temizler."],
        ["Rotayı kaydedin", "En az iki nokta varken yeşil Katmana Kaydet düğmesini kullanın. Panel kapanır ve rota hedef katmana kaydolur. X ile kapatmak kaydedilmemiş taslağı siler."]
      ],
      tips: [["Yükseklik ve 3D nasıl çalışır?", "Yükseklik sorgusu koordinatları dış servise göndermek için izin isteyebilir. Reddetmek rota çizmeyi engellemez. 3D düğmesi yükseklik verisi gereken bir arazi profili önizlemesi açar; serbest 3D çizim aracı değildir."]]
    },
    de: {
      title: "Eine Route mit Wegpunkten planen",
      summary: "Wegpunkte mit dem Fadenkreuz setzen, die Entfernung prüfen und die Route in einer Ebene speichern.",
      access: "Sichtbare, beschreibbare Ebene erforderlich",
      note: "Die gewählten Punkte werden verbunden. Es wird keine Straße oder sichere Wanderroute automatisch berechnet. Eine gezeichnete Route ist ein Plan, keine Aufzeichnung mit echten Reisezeiten oder Geschwindigkeiten.",
      steps: [
        ["Routenplaner öffnen", "Eine sichtbare, entsperrte Ebene wählen und auf der Karte Mehr → Routenplaner öffnen."],
        ["Ersten Punkt setzen", "Die Karte verschieben, bis das Fadenkreuz über dem Startpunkt liegt. Dann einen Wegpunkt hinzufügen. Ihre GPS-Position muss nicht dort sein."],
        ["Route erweitern und prüfen", "Das Fadenkreuz verschieben und mindestens einen weiteren Punkt hinzufügen. Punktliste und Gesamtstrecke prüfen. Mit Minus einen falschen Punkt entfernen; der Papierkorb löscht den gesamten Entwurf."],
        ["Route speichern", "Ab zwei Punkten die grüne Schaltfläche zum Speichern in einer Ebene nutzen. Der Planer schließt sich; die Route bleibt in der Zielebene. X verwirft einen ungespeicherten Entwurf."]
      ],
      tips: [["Wie funktionieren Höhe und 3D?", "Für Höhenabfragen kann die Zustimmung zum Senden von Koordinaten an einen externen Dienst nötig sein. Eine Ablehnung verhindert das Zeichnen nicht. 3D öffnet eine Vorschau mit Geländehöhen, kein freies 3D-Zeichenwerkzeug."]]
    },
    es: {
      title: "Planificar una ruta con puntos",
      summary: "Coloca puntos con la cruceta central, revisa la distancia y guarda la ruta en una capa.",
      access: "Requiere una capa visible y editable",
      note: "Se unen los puntos elegidos; no se calcula automáticamente una carretera ni un itinerario seguro. Una ruta dibujada es un plan, no un recorrido registrado con tiempos y velocidades reales.",
      steps: [
        ["Abrir el creador de rutas", "Selecciona una capa visible y desbloqueada y abre Más → Creador de rutas en el mapa."],
        ["Colocar el primer punto", "Desplaza el mapa hasta situar la cruceta en el inicio y añade un punto. No necesitas estar allí según el GPS."],
        ["Ampliar y revisar la ruta", "Mueve la cruceta y añade al menos otro punto. Revisa la lista y la distancia total. El botón menos elimina un punto incorrecto; la papelera borra todo el borrador."],
        ["Guardar la ruta", "Con al menos dos puntos, pulsa el botón verde para guardar en una capa. El panel se cierra y la ruta queda en la capa de destino. Cerrar con X descarta el borrador sin guardar."]
      ],
      tips: [["¿Y la elevación y el 3D?", "La consulta de elevación puede pedir permiso para enviar coordenadas a un servicio externo. Rechazarlo no impide dibujar la ruta. 3D abre una vista previa con elevaciones del terreno; no es una herramienta de dibujo 3D libre."]]
    },
    fr: {
      title: "Planifier un itinéraire par points",
      summary: "Placez des points avec le réticule central, vérifiez la distance et enregistrez l’itinéraire dans une couche.",
      access: "Une couche visible et modifiable est nécessaire",
      note: "Les points choisis sont reliés ; aucun itinéraire routier ou piéton sûr n’est calculé automatiquement. Un itinéraire dessiné est un projet, pas une trace enregistrée avec des durées et vitesses réelles.",
      steps: [
        ["Ouvrir le créateur d’itinéraires", "Sélectionnez une couche visible et déverrouillée, puis ouvrez Plus → Créateur d’itinéraires sur la carte."],
        ["Placer le premier point", "Déplacez la carte pour positionner le réticule sur le départ, puis ajoutez un point. Votre position GPS peut être ailleurs."],
        ["Prolonger et vérifier", "Déplacez le réticule et ajoutez au moins un autre point. Vérifiez la liste et la distance totale. Le bouton moins supprime un point erroné ; la corbeille efface tout le brouillon."],
        ["Enregistrer l’itinéraire", "À partir de deux points, utilisez le bouton vert d’enregistrement dans une couche. Le panneau se ferme et l’itinéraire est enregistré dans la couche cible. X abandonne le brouillon non enregistré."]
      ],
      tips: [["Comment utiliser l’altitude et la 3D ?", "La recherche d’altitude peut demander l’autorisation d’envoyer les coordonnées à un service externe. Un refus n’empêche pas le dessin. 3D affiche un aperçu utilisant les altitudes du terrain, pas un outil de dessin 3D libre."]]
    },
    it: {
      title: "Pianificare un percorso con punti",
      summary: "Posiziona i punti con il mirino centrale, controlla la distanza e salva il percorso in un livello.",
      access: "Serve un livello visibile e modificabile",
      note: "Vengono collegati i punti scelti: non viene calcolata automaticamente una strada o un percorso sicuro. Un percorso disegnato è un piano, non una traccia con tempi e velocità di viaggio reali.",
      steps: [
        ["Apri il creatore di percorsi", "Scegli un livello visibile e sbloccato, quindi apri Altro → Creatore di percorsi sulla mappa."],
        ["Posiziona il primo punto", "Sposta la mappa finché il mirino è sul punto di partenza, poi aggiungi un punto. La posizione GPS può essere altrove."],
        ["Estendi e controlla", "Sposta il mirino e aggiungi almeno un altro punto. Controlla l’elenco e la distanza totale. Il pulsante meno elimina un punto errato; il cestino cancella l’intera bozza."],
        ["Salva il percorso", "Con almeno due punti, usa il pulsante verde per salvare nel livello. Il pannello si chiude e il percorso resta nel livello di destinazione. X scarta una bozza non salvata."]
      ],
      tips: [["Come funzionano quota e 3D?", "La ricerca della quota può chiedere il consenso per inviare coordinate a un servizio esterno. Il rifiuto non impedisce di disegnare. 3D apre un’anteprima con le quote del terreno, non uno strumento di disegno 3D libero."]]
    },
    pt: {
      title: "Planear uma rota com pontos",
      summary: "Coloque pontos com a mira central, confira a distância e guarde a rota numa camada.",
      access: "É necessária uma camada visível e editável",
      note: "Os pontos escolhidos são unidos; não é calculada automaticamente uma estrada ou rota segura. Uma rota desenhada é um plano, não um percurso gravado com tempos e velocidades reais.",
      steps: [
        ["Abra o criador de rotas", "Escolha uma camada visível e desbloqueada e abra Mais → Criador de rotas no mapa."],
        ["Coloque o primeiro ponto", "Mova o mapa até a mira estar sobre o início e adicione um ponto. A sua posição GPS pode estar noutro local."],
        ["Prolongue e confira", "Mova a mira e adicione pelo menos mais um ponto. Confira a lista e a distância total. O botão menos remove um ponto incorreto; o caixote do lixo elimina todo o rascunho."],
        ["Guarde a rota", "Com pelo menos dois pontos, use o botão verde para guardar na camada. O painel fecha e a rota fica na camada de destino. Fechar com X descarta o rascunho não guardado."]
      ],
      tips: [["E a elevação e o 3D?", "A consulta de elevação pode pedir autorização para enviar coordenadas a um serviço externo. Recusar não impede o desenho. 3D abre uma pré-visualização com elevações do terreno, não uma ferramenta de desenho 3D livre."]]
    },
    ru: {
      title: "Планирование маршрута по точкам",
      summary: "Ставьте точки центральным перекрестием, проверяйте расстояние и сохраняйте маршрут в слой.",
      access: "Нужен видимый редактируемый слой",
      note: "Приложение соединяет выбранные точки, а не автоматически прокладывает дорогу или безопасный путь. Нарисованный маршрут — план, а не запись поездки с реальными временем и скоростью.",
      steps: [
        ["Откройте построение маршрута", "Выберите видимый незаблокированный слой, затем на карте откройте Ещё → Построение маршрута."],
        ["Поставьте первую точку", "Сдвиньте карту так, чтобы перекрестие оказалось в начале маршрута, и добавьте точку. Находиться там по GPS не требуется."],
        ["Продолжите и проверьте", "Переместите перекрестие и добавьте ещё хотя бы одну точку. Проверьте список и общую длину. Кнопка минус удаляет ошибочную точку; корзина очищает весь черновик."],
        ["Сохраните маршрут", "При наличии двух точек нажмите зелёную кнопку сохранения в слой. Панель закроется, маршрут сохранится в целевом слое. X удаляет несохранённый черновик."]
      ],
      tips: [["Как работают высота и 3D?", "Запрос высоты может потребовать согласия на передачу координат внешнему сервису. Отказ не мешает рисованию. Кнопка 3D открывает предпросмотр высот рельефа, а не редактор произвольных 3D-моделей."]]
    },
    uk: {
      title: "Планування маршруту за точками",
      summary: "Додавайте точки центральним перехрестям, перевіряйте відстань і зберігайте маршрут у шарі.",
      access: "Потрібен видимий шар із дозволом редагування",
      note: "З’єднуються вибрані точки; дорога чи безпечний шлях автоматично не прокладаються. Намальований маршрут — це план, а не запис подорожі з реальними часом і швидкістю.",
      steps: [
        ["Відкрийте побудову маршруту", "Виберіть видимий незаблокований шар і на карті відкрийте Ще → Побудова маршруту."],
        ["Поставте першу точку", "Посуньте карту, щоб перехрестя опинилося на початку маршруту, і додайте точку. Перебувати там за GPS не потрібно."],
        ["Продовжте та перевірте", "Перемістіть перехрестя й додайте щонайменше ще одну точку. Перевірте список і загальну відстань. Мінус видаляє помилкову точку; кошик очищає всю чернетку."],
        ["Збережіть маршрут", "Маючи принаймні дві точки, натисніть зелену кнопку збереження в шар. Панель закриється, маршрут залишиться в цільовому шарі. X відкидає незбережену чернетку."]
      ],
      tips: [["Як працюють висота та 3D?", "Запит висоти може потребувати згоди на надсилання координат зовнішньому сервісу. Відмова не заважає малюванню. 3D відкриває перегляд висот рельєфу, а не редактор довільних 3D-моделей."]]
    },
    ar: {
      title: "تخطيط مسار باستخدام نقاط",
      summary: "ضع نقاط المسار بعلامة التصويب المركزية، وراجع المسافة، ثم احفظ المسار في طبقة.",
      access: "يتطلب طبقة ظاهرة وقابلة للتعديل",
      note: "تُوصَل النقاط التي تختارها؛ لا يُحسب طريق أو مسار مشي آمن تلقائيًا. المسار المرسوم خطة وليس تسجيل رحلة بأزمنة وسرعات فعلية.",
      steps: [
        ["افتح منشئ المسارات", "اختر طبقة ظاهرة وغير مقفلة، ثم افتح المزيد ← منشئ المسارات على الخريطة."],
        ["ضع النقطة الأولى", "حرّك الخريطة حتى تقع علامة التصويب عند البداية، ثم أضف نقطة مسار. ليس من الضروري أن يكون موقع GPS هناك."],
        ["أكمل المسار وراجعه", "حرّك علامة التصويب وأضف نقطة أخرى على الأقل. راجع قائمة النقاط والمسافة الكلية. زر الناقص يحذف نقطة خاطئة؛ وسلة المهملات تمسح المسودة كلها."],
        ["احفظ المسار", "بعد إضافة نقطتين على الأقل، استخدم الزر الأخضر للحفظ في طبقة. تُغلق اللوحة ويُحفظ المسار في الطبقة المستهدفة. الإغلاق بعلامة X يلغي المسودة غير المحفوظة."]
      ],
      tips: [["ماذا عن الارتفاع والعرض ثلاثي الأبعاد؟", "قد يتطلب جلب الارتفاع موافقة على إرسال الإحداثيات إلى خدمة خارجية. الرفض لا يمنع رسم المسار. يفتح زر 3D معاينة بارتفاعات التضاريس، وليس أداة رسم ثلاثي الأبعاد حرة."]]
    },
    hi: {
      title: "बिंदुओं से मार्ग की योजना बनाएं",
      summary: "केंद्र के क्रॉसहेयर से मार्ग बिंदु रखें, दूरी जांचें और मार्ग को लेयर में सहेजें।",
      access: "दिखाई देने वाली, संपादन योग्य लेयर आवश्यक है",
      note: "चुने हुए बिंदु जोड़े जाते हैं; सड़क या सुरक्षित पैदल मार्ग अपने आप नहीं बनता। खींचा गया मार्ग एक योजना है, वास्तविक यात्रा समय और गति वाली रिकॉर्डिंग नहीं।",
      steps: [
        ["मार्ग निर्माता खोलें", "दिखाई देने वाली अनलॉक लेयर चुनें, फिर मानचित्र पर अधिक → मार्ग निर्माता खोलें।"],
        ["पहला बिंदु रखें", "मानचित्र खिसकाकर क्रॉसहेयर को शुरुआत पर लाएं और मार्ग बिंदु जोड़ें। आपका GPS स्थान वहां होना जरूरी नहीं है।"],
        ["मार्ग बढ़ाएं और जांचें", "क्रॉसहेयर खिसकाकर कम से कम एक और बिंदु जोड़ें। बिंदु सूची और कुल दूरी देखें। माइनस बटन गलत बिंदु हटाता है; कूड़ेदान पूरी अधूरी योजना मिटाता है।"],
        ["मार्ग सहेजें", "कम से कम दो बिंदुओं पर हरे बटन से लेयर में सहेजें। पैनल बंद हो जाता है और मार्ग लक्ष्य लेयर में रहता है। X से बंद करने पर बिना सहेजी योजना हट जाती है।"]
      ],
      tips: [["ऊंचाई और 3D कैसे काम करते हैं?", "ऊंचाई लेने के लिए निर्देशांक बाहरी सेवा को भेजने की अनुमति मांगी जा सकती है। मना करने पर भी मार्ग खींच सकते हैं। 3D बटन भूभाग की ऊंचाई का पूर्वावलोकन खोलता है, स्वतंत्र 3D ड्रॉइंग टूल नहीं।"]]
    },
    ur: {
      title: "نقاط سے راستے کی منصوبہ بندی کریں",
      summary: "مرکزی نشانے سے راستے کے نقاط رکھیں، فاصلہ دیکھیں اور راستہ لیئر میں محفوظ کریں۔",
      access: "نظر آنے والی، قابلِ ترمیم لیئر درکار ہے",
      note: "آپ کے منتخب نقاط ملائے جاتے ہیں؛ سڑک یا محفوظ پیدل راستہ خودکار طور پر نہیں بنتا۔ بنایا ہوا راستہ ایک منصوبہ ہے، اصل سفری وقت اور رفتار والی ریکارڈنگ نہیں۔",
      steps: [
        ["راستہ بنانے کا آلہ کھولیں", "نظر آنے والی غیر مقفل لیئر منتخب کریں، پھر نقشے پر مزید ← راستہ بنانے کا آلہ کھولیں۔"],
        ["پہلا نقطہ رکھیں", "نقشہ سرکا کر مرکزی نشانہ آغاز پر لائیں اور راستے کا نقطہ شامل کریں۔ آپ کا GPS مقام وہاں ہونا ضروری نہیں۔"],
        ["راستہ بڑھائیں اور جانچیں", "نشانہ منتقل کر کے کم از کم ایک اور نقطہ شامل کریں۔ نقاط کی فہرست اور کل فاصلہ دیکھیں۔ منفی بٹن غلط نقطہ ہٹاتا ہے؛ کوڑے دان کا بٹن پورا مسودہ مٹاتا ہے۔"],
        ["راستہ محفوظ کریں", "کم از کم دو نقاط ہونے پر سبز بٹن سے لیئر میں محفوظ کریں۔ پینل بند ہو جاتا ہے اور راستہ مطلوبہ لیئر میں رہتا ہے۔ X سے بند کرنے پر غیر محفوظ مسودہ ضائع ہو جاتا ہے۔"]
      ],
      tips: [["بلندی اور 3D کیسے کام کرتے ہیں؟", "بلندی حاصل کرنے کے لیے نقاط کے مختصات بیرونی سروس کو بھیجنے کی اجازت مانگی جا سکتی ہے۔ انکار راستہ بنانے سے نہیں روکتا۔ 3D بٹن زمینی بلندیوں کا پیش منظر کھولتا ہے، آزاد 3D ڈرائنگ کا آلہ نہیں۔"]]
    }
  };

  for (const {id} of window.MAPNERO_GUIDE_LOCALES) {
    const entry = routes[id];
    if (!entry) throw new Error("Missing route guide locale: " + id);
    window.MAPNERO_GUIDES[id].platforms.apple.topics.push({
      ...entry,
      id: "route-builder",
      steps: entry.steps.map(([title, body]) => ({title, body})),
      tips: entry.tips.map(([q, a]) => ({q, a}))
    });
  }
})();
