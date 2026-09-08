(function () {
  "use strict";
  // Apple-specific flows checked against FeatureDetailCard, TrackDetailView,
  // Track3dview and TrackReportBuilder. No substitute-language screenshots.
  const content = {
    en: {
      threeD: ["Inspect a track in 3D", "Compare elevation, speed and route shape without changing the saved track.", "Requires a track with at least two points", "This is a schematic viewer, not a 3D drawing editor or a to-scale terrain model. Missing elevation or speed data cannot be reconstructed from the picture.", [
        ["Open the track card", "In Layers, open the layer containing your track and select the track. Tap 3D in its action row."],
        ["Choose a display", "Use Elevation, Speed or Route Only. Speed mode represents recorded speed, not terrain height; Route Only removes the vertical profile."],
        ["Inspect and return", "The top-right rotation button stops or restarts automatic rotation. Drag to change the camera angle; use Back to return without editing the track."]
      ], ["Why is the profile flat?", "Check that the source contains meaningful altitude values. A zero profile does not prove that the terrain is flat. Route Builder’s 3D preview is a separate flow that looks up terrain elevations and may need network access and permission to share coordinates."]],
      report: ["Read and share a track report", "Review statistics and graphs, then prepare a PDF when your plan includes detailed reports.", "Detailed report and PDF: Core or higher", "Use a recorded track for travel analysis. A manually drawn route does not contain reliable journey times or speeds. Check data and units before sharing.", [
        ["Open Analysis or Report", "Select the track in its layer. Scroll the action row to More, then choose Analysis or Report. Report opens the detailed section; scroll up for the summary and graphs."],
        ["Compare the graphs", "Review distance, duration, average speed and maximum elevation. Switch between Combined, Speed and Elevation; missing or constant input data limits what these graphs can tell you."],
        ["Review the detailed figures", "With Core or higher, inspect moving/paused time, pace, speed, elevation gain/loss and point count. These are calculated from the available track data, not independent measurements."],
        ["Prepare and share the PDF", "Use Share PDF in the report section. Wait for preparation, then choose a destination in the system share sheet. At least two track points are needed. Review locations and other details before sending."]
      ], ["Are place names and weather historical?", "Place names and weather may be requested online when the report is built. Weather is not a record of conditions at the time of your trip. Without those services, names can fall back to coordinates and weather can be absent."]]
    },
    tr: {
      threeD: ["İzi 3D görünümde inceleyin", "Kayıtlı izi değiştirmeden yükseklik, hız ve rota şeklini karşılaştırın.", "En az iki noktalı iz gerekir", "Bu şematik bir görüntüleyicidir; 3D çizim editörü veya ölçekli arazi modeli değildir. Eksik yükseklik ve hız verisi görüntüden elde edilemez.", [
        ["İz kartını açın", "Katmanlar’da izin bulunduğu katmanı açıp izi seçin. İşlem satırındaki 3D’ye dokunun."],
        ["Görünümü seçin", "Yükseklik, Hız veya Yalnızca Rota’yı kullanın. Hız modu arazi yüksekliğini değil kayıtlı hızı temsil eder; Yalnızca Rota düşey profili kaldırır."],
        ["İnceleyip geri dönün", "Sağ üstteki döndürme düğmesi otomatik dönüşü durdurur veya başlatır. Kamera açısını sürükleyerek değiştirin; Geri ile izi değiştirmeden dönün."]
      ], ["Profil neden düz?", "Kaynakta anlamlı yükseklik değerleri olup olmadığını kontrol edin. Sıfır profil, arazinin düz olduğunu kanıtlamaz. Rota Oluşturucu’nun 3D önizlemesi ayrı bir akıştır; arazi yüksekliği sorgular, internet ve koordinat paylaşım izni gerektirebilir."]],
      report: ["Track raporunu inceleyin ve paylaşın", "İstatistik ve grafikleri inceleyin; paketiniz destekliyorsa ayrıntılı PDF hazırlayın.", "Ayrıntılı rapor ve PDF: Core ve üzeri", "Yolculuk analizi için kaydedilmiş iz kullanın. Elle çizilmiş rotada güvenilir yolculuk süresi ve hız bulunmaz. Paylaşmadan önce veriyi ve birimleri kontrol edin.", [
        ["Analiz veya Rapor’u açın", "Katmanından izi seçin. İşlem satırını Daha Fazla’ya kadar kaydırıp Analiz veya Rapor’u açın. Rapor ayrıntılı bölüme götürür; özet ve grafikler için yukarı kaydırın."],
        ["Grafikleri karşılaştırın", "Mesafe, süre, ortalama hız ve en yüksek irtifayı inceleyin. Birleşik, Hız ve Yükseklik arasında geçin; eksik veya sabit veri grafiklerden çıkarılabilecek sonuçları sınırlar."],
        ["Ayrıntıları kontrol edin", "Core ve üzeri paketle hareket/duraklama süresi, tempo, hız, yükseklik kazanımı/kaybı ve nokta sayısını inceleyin. Bunlar mevcut iz verisinden hesaplanır; bağımsız ölçüm değildir."],
        ["PDF hazırlayıp paylaşın", "Rapor bölümündeki PDF Paylaş’ı kullanın. Hazırlık bitince sistem paylaşım ekranından hedef seçin. En az iki iz noktası gerekir. Göndermeden önce konumları ve diğer ayrıntıları gözden geçirin."]
      ], ["Yer adları ve hava durumu geçmişe mi ait?", "Rapor hazırlanırken yer adları ve hava durumu çevrimiçi sorgulanabilir. Hava durumu yolculuk anının kaydı değildir. Servisler olmadan adlar yerine koordinatlar gösterilebilir ve hava durumu bulunmayabilir."]]
    },
    de: {
      threeD: ["Einen Track in 3D betrachten", "Höhe, Geschwindigkeit und Verlauf vergleichen, ohne den Track zu ändern.", "Track mit mindestens zwei Punkten erforderlich", "Dies ist eine schematische Ansicht, kein 3D-Zeicheneditor oder maßstabsgetreues Geländemodell. Fehlende Höhen- oder Geschwindigkeitsdaten lassen sich daraus nicht ableiten.", [
        ["Track-Karte öffnen", "Unter Ebenen die Ebene und dann den Track auswählen. In der Aktionsleiste auf 3D tippen."],
        ["Darstellung wählen", "Höhe, Geschwindigkeit oder Nur Route wählen. Geschwindigkeit stellt die aufgezeichnete Geschwindigkeit dar, nicht die Geländehöhe. Nur Route entfernt das vertikale Profil."],
        ["Ansicht prüfen", "Mit der Schaltfläche oben rechts die automatische Drehung stoppen oder starten. Durch Ziehen den Kamerawinkel ändern; mit Zurück ohne Änderung am Track zurückkehren."]
      ], ["Warum ist das Profil flach?", "Prüfen Sie, ob sinnvolle Höhenwerte vorhanden sind. Ein Nullprofil beweist kein flaches Gelände. Die 3D-Vorschau im Routenplaner fragt dagegen Geländehöhen ab und kann Internetzugang sowie Zustimmung zur Koordinatenweitergabe benötigen."]],
      report: ["Track-Bericht prüfen und teilen", "Statistiken und Diagramme prüfen und bei passendem Tarif ein PDF erstellen.", "Detaillierter Bericht und PDF: ab Core", "Für Reiseanalysen einen aufgezeichneten Track verwenden. Gezeichnete Routen enthalten keine verlässlichen Reisezeiten oder Geschwindigkeiten. Daten und Einheiten vor dem Teilen prüfen.", [
        ["Analyse oder Bericht öffnen", "Den Track in seiner Ebene auswählen. In der Aktionsleiste zu Mehr scrollen und Analyse oder Bericht wählen. Bericht öffnet den Detailbereich; Zusammenfassung und Diagramme stehen darüber."],
        ["Diagramme vergleichen", "Strecke, Dauer, Durchschnittsgeschwindigkeit und maximale Höhe prüfen. Zwischen kombiniertem Diagramm, Geschwindigkeit und Höhe wechseln. Fehlende oder konstante Daten begrenzen die Aussagekraft."],
        ["Details prüfen", "Ab Core Bewegungs- und Pausenzeit, Tempo, Geschwindigkeit, Auf-/Abstieg und Punktzahl prüfen. Die Werte werden aus Track-Daten berechnet, nicht unabhängig gemessen."],
        ["PDF teilen", "Im Bericht PDF teilen wählen. Nach der Erstellung ein Ziel im System-Teilen-Menü auswählen. Mindestens zwei Punkte sind nötig. Vor dem Senden Orte und weitere Angaben prüfen."]
      ], ["Sind Wetter und Ortsnamen historische Daten?", "Ortsnamen und Wetter können bei der Berichtserstellung online abgefragt werden. Das Wetter dokumentiert nicht die Bedingungen zum Reisezeitpunkt. Ohne Dienste können Koordinaten statt Namen erscheinen und Wetterangaben fehlen."]]
    },
    es: {
      threeD: ["Examinar un recorrido en 3D", "Compara elevación, velocidad y forma sin modificar el recorrido guardado.", "Se necesitan al menos dos puntos", "Es una vista esquemática, no un editor de dibujo 3D ni un modelo del terreno a escala. La imagen no recupera datos de elevación o velocidad ausentes.", [
        ["Abrir la ficha", "En Capas, abre la capa del recorrido y selecciónalo. Pulsa 3D en la fila de acciones."],
        ["Elegir la vista", "Usa Elevación, Velocidad o Solo ruta. Velocidad representa la velocidad registrada, no la altura del terreno; Solo ruta elimina el perfil vertical."],
        ["Examinar y volver", "El botón superior derecho detiene o inicia la rotación automática. Arrastra para cambiar el ángulo; pulsa Atrás para volver sin editar el recorrido."]
      ], ["¿Por qué el perfil es plano?", "Comprueba que existen altitudes válidas. Un perfil cero no demuestra que el terreno sea llano. La vista 3D del creador de rutas consulta elevaciones del terreno y puede requerir conexión y permiso para compartir coordenadas."]],
      report: ["Consultar y compartir un informe", "Revisa estadísticas y gráficos y prepara un PDF si tu plan incluye informes detallados.", "Informe detallado y PDF: Core o superior", "Analiza viajes con recorridos registrados. Una ruta dibujada no contiene tiempos ni velocidades de viaje fiables. Revisa datos y unidades antes de compartir.", [
        ["Abrir Análisis o Informe", "Selecciona el recorrido en su capa. Desplaza la fila de acciones hasta Más y elige Análisis o Informe. Informe abre los detalles; desplázate arriba para ver el resumen y los gráficos."],
        ["Comparar gráficos", "Revisa distancia, duración, velocidad media y elevación máxima. Alterna entre Combinado, Velocidad y Elevación. Los datos ausentes o constantes limitan la interpretación."],
        ["Revisar detalles", "Con Core o superior, revisa tiempos en movimiento y pausa, ritmo, velocidades, ascenso/descenso y número de puntos. Se calculan con los datos disponibles; no son mediciones independientes."],
        ["Compartir el PDF", "Pulsa Compartir PDF en el informe. Espera a que se prepare y elige un destino en la hoja del sistema. Se necesitan dos puntos como mínimo. Revisa las ubicaciones antes de enviarlo."]
      ], ["¿El tiempo meteorológico es histórico?", "Los nombres de lugares y el tiempo pueden consultarse en línea al crear el informe. El tiempo no registra las condiciones durante el viaje. Sin esos servicios pueden aparecer coordenadas y faltar la meteorología."]]
    },
    fr: {
      threeD: ["Examiner une trace en 3D", "Comparez altitude, vitesse et forme sans modifier la trace enregistrée.", "Une trace d’au moins deux points est nécessaire", "Il s’agit d’une vue schématique, pas d’un éditeur 3D ni d’un modèle de terrain à l’échelle. Elle ne reconstitue pas les altitudes ou vitesses absentes.", [
        ["Ouvrir la fiche", "Dans Couches, ouvrez la couche contenant la trace et sélectionnez-la. Touchez 3D dans la barre d’actions."],
        ["Choisir un mode", "Utilisez Altitude, Vitesse ou Itinéraire seul. Vitesse représente la vitesse enregistrée, pas la hauteur du terrain. Itinéraire seul supprime le profil vertical."],
        ["Examiner et revenir", "Le bouton en haut à droite arrête ou relance la rotation automatique. Faites glisser pour changer l’angle ; Retour revient sans modifier la trace."]
      ], ["Pourquoi le profil est-il plat ?", "Vérifiez que les altitudes sont pertinentes. Un profil nul ne prouve pas que le terrain est plat. L’aperçu 3D du créateur d’itinéraires interroge les altitudes du terrain et peut nécessiter Internet et l’autorisation de transmettre les coordonnées."]],
      report: ["Consulter et partager un rapport", "Examinez statistiques et graphiques, puis créez un PDF si votre offre inclut les rapports détaillés.", "Rapport détaillé et PDF : Core ou supérieur", "Analysez un déplacement avec une trace enregistrée. Un itinéraire dessiné n’a pas de durées ou vitesses de déplacement fiables. Vérifiez données et unités avant de partager.", [
        ["Ouvrir Analyse ou Rapport", "Sélectionnez la trace dans sa couche. Faites défiler les actions jusqu’à Plus, puis choisissez Analyse ou Rapport. Rapport ouvre les détails ; le résumé et les graphiques sont au-dessus."],
        ["Comparer les graphiques", "Vérifiez distance, durée, vitesse moyenne et altitude maximale. Alternez entre Combiné, Vitesse et Altitude. Des données absentes ou constantes limitent l’interprétation."],
        ["Lire les détails", "Avec Core ou supérieur, examinez mouvement/pauses, allure, vitesses, dénivelés et nombre de points. Ces valeurs sont calculées à partir de la trace, pas mesurées indépendamment."],
        ["Partager le PDF", "Choisissez Partager le PDF dans le rapport. Attendez la préparation, puis choisissez une destination dans la feuille système. Deux points au minimum sont nécessaires. Vérifiez les lieux avant l’envoi."]
      ], ["La météo est-elle historique ?", "Les noms de lieux et la météo peuvent être demandés en ligne à la création du rapport. La météo ne décrit pas nécessairement le moment du déplacement. Sans ces services, les coordonnées peuvent remplacer les noms et la météo peut manquer."]]
    },
    it: {
      threeD: ["Esaminare una traccia in 3D", "Confronta quota, velocità e forma senza modificare la traccia salvata.", "Servono almeno due punti", "È una vista schematica, non un editor 3D o un modello del terreno in scala. Non ricostruisce quote o velocità mancanti.", [
        ["Aprire la scheda", "In Livelli, apri il livello della traccia e selezionala. Tocca 3D nella barra delle azioni."],
        ["Scegliere la vista", "Usa Quota, Velocità o Solo percorso. Velocità rappresenta la velocità registrata, non l’altezza del terreno. Solo percorso elimina il profilo verticale."],
        ["Esaminare e tornare", "Il pulsante in alto a destra arresta o avvia la rotazione automatica. Trascina per cambiare angolazione; Indietro torna senza modificare la traccia."]
      ], ["Perché il profilo è piatto?", "Controlla che ci siano quote significative. Un profilo a zero non dimostra un terreno pianeggiante. L’anteprima 3D del creatore di percorsi richiede quote del terreno e può richiedere rete e consenso all’invio delle coordinate."]],
      report: ["Leggere e condividere un rapporto", "Controlla statistiche e grafici e prepara un PDF se il piano include rapporti dettagliati.", "Rapporto dettagliato e PDF: da Core", "Usa una traccia registrata per analizzare un viaggio. Un percorso disegnato non contiene tempi o velocità di viaggio affidabili. Verifica dati e unità prima di condividere.", [
        ["Aprire Analisi o Rapporto", "Seleziona la traccia nel suo livello. Scorri le azioni fino ad Altro, poi scegli Analisi o Rapporto. Rapporto apre i dettagli; riepilogo e grafici sono più in alto."],
        ["Confrontare i grafici", "Controlla distanza, durata, velocità media e quota massima. Alterna Combinato, Velocità e Quota. Dati mancanti o costanti limitano le conclusioni."],
        ["Leggere i dettagli", "Da Core, esamina tempi di movimento/pausa, passo, velocità, salita/discesa e numero di punti. Sono calcoli sui dati della traccia, non misurazioni indipendenti."],
        ["Condividere il PDF", "Usa Condividi PDF nel rapporto. Attendi la preparazione e scegli una destinazione nel pannello di sistema. Servono almeno due punti. Controlla le posizioni prima di inviare."]
      ], ["Il meteo è storico?", "Nomi dei luoghi e meteo possono essere richiesti online quando si crea il rapporto. Il meteo non registra le condizioni durante il viaggio. Senza servizi, possono apparire coordinate al posto dei nomi e mancare i dati meteo."]]
    },
    pt: {
      threeD: ["Examinar um trajeto em 3D", "Compare elevação, velocidade e forma sem alterar o trajeto salvo.", "São necessários pelo menos dois pontos", "É uma vista esquemática, não um editor 3D nem um modelo do terreno em escala. Não recupera elevações ou velocidades ausentes.", [
        ["Abrir a ficha", "Em Camadas, abra a camada do trajeto e selecione-o. Toque em 3D na linha de ações."],
        ["Escolher a vista", "Use Elevação, Velocidade ou Somente rota. Velocidade representa a velocidade registrada, não a altura do terreno; Somente rota remove o perfil vertical."],
        ["Examinar e voltar", "O botão superior direito interrompe ou inicia a rotação automática. Arraste para mudar o ângulo; Voltar retorna sem editar o trajeto."]
      ], ["Por que o perfil está plano?", "Verifique se existem altitudes significativas. Um perfil zero não prova que o terreno é plano. A prévia 3D do criador de rotas consulta elevações e pode precisar de internet e autorização para enviar coordenadas."]],
      report: ["Consultar e compartilhar um relatório", "Confira estatísticas e gráficos e prepare um PDF se seu plano incluir relatórios detalhados.", "Relatório detalhado e PDF: Core ou superior", "Use um trajeto registrado para analisar uma viagem. Uma rota desenhada não contém tempos ou velocidades de viagem confiáveis. Confira dados e unidades antes de compartilhar.", [
        ["Abrir Análise ou Relatório", "Selecione o trajeto em sua camada. Role as ações até Mais e escolha Análise ou Relatório. Relatório abre os detalhes; role para cima para ver resumo e gráficos."],
        ["Comparar gráficos", "Confira distância, duração, velocidade média e elevação máxima. Alterne entre Combinado, Velocidade e Elevação. Dados ausentes ou constantes limitam as conclusões."],
        ["Revisar detalhes", "Com Core ou superior, examine movimento/pausas, ritmo, velocidades, subida/descida e quantidade de pontos. São cálculos dos dados disponíveis, não medições independentes."],
        ["Compartilhar PDF", "Use Compartilhar PDF no relatório. Aguarde o preparo e escolha o destino na folha de compartilhamento do sistema. São necessários dois pontos. Confira as localizações antes de enviar."]
      ], ["O clima é histórico?", "Nomes de lugares e clima podem ser consultados online ao gerar o relatório. O clima não registra as condições no momento da viagem. Sem esses serviços, coordenadas podem substituir nomes e o clima pode estar ausente."]]
    },
    ru: {
      threeD: ["Просмотр трека в 3D", "Сравните высоту, скорость и форму, не изменяя сохранённый трек.", "Нужен трек минимум с двумя точками", "Это схематическое представление, а не 3D-редактор или масштабная модель рельефа. Оно не восстанавливает отсутствующие высоты и скорости.", [
        ["Откройте карточку", "В разделе слоёв откройте слой трека и выберите трек. Нажмите 3D в строке действий."],
        ["Выберите режим", "Доступны высота, скорость и только маршрут. Скорость показывает записанную скорость, а не высоту рельефа; режим маршрута убирает вертикальный профиль."],
        ["Осмотрите и вернитесь", "Кнопка справа вверху останавливает или запускает вращение. Перетаскивание меняет ракурс; Назад возвращает без изменения трека."]
      ], ["Почему профиль плоский?", "Проверьте наличие достоверных высот. Нулевой профиль не доказывает, что местность плоская. 3D-предпросмотр построителя маршрутов отдельно запрашивает высоты рельефа и может требовать сеть и согласие на передачу координат."]],
      report: ["Просмотр и отправка отчёта о треке", "Проверьте статистику и графики, затем создайте PDF, если тариф включает подробные отчёты.", "Подробный отчёт и PDF: Core и выше", "Для анализа поездки используйте записанный трек. Нарисованный маршрут не содержит надёжного времени и скорости поездки. Перед отправкой проверьте данные и единицы.", [
        ["Откройте анализ или отчёт", "Выберите трек в слое. Прокрутите строку действий до Ещё и выберите Анализ или Отчёт. Отчёт открывает подробности; сводка и графики находятся выше."],
        ["Сравните графики", "Проверьте расстояние, длительность, среднюю скорость и максимальную высоту. Переключайте совмещённый график, скорость и высоту. Отсутствующие или постоянные данные ограничивают выводы."],
        ["Проверьте подробности", "С Core и выше доступны время движения/пауз, темп, скорости, набор/сброс высоты и число точек. Это расчёты по треку, а не независимые измерения."],
        ["Отправьте PDF", "Нажмите Поделиться PDF в отчёте. Дождитесь подготовки и выберите получателя в системном меню. Требуются минимум две точки. Перед отправкой проверьте местоположения."]
      ], ["Погода относится ко времени поездки?", "Названия мест и погода могут запрашиваться онлайн при создании отчёта. Погода не является записью условий во время поездки. Без сервисов вместо названий возможны координаты, а погода может отсутствовать."]]
    },
    uk: {
      threeD: ["Перегляд треку в 3D", "Порівняйте висоту, швидкість і форму без зміни збереженого треку.", "Потрібен трек щонайменше з двома точками", "Це схематичний перегляд, а не 3D-редактор чи масштабна модель рельєфу. Він не відновлює відсутні висоти або швидкості.", [
        ["Відкрийте картку", "У розділі шарів відкрийте шар треку й виберіть трек. Натисніть 3D у рядку дій."],
        ["Виберіть режим", "Доступні висота, швидкість і лише маршрут. Швидкість показує записану швидкість, а не висоту рельєфу; режим маршруту прибирає вертикальний профіль."],
        ["Огляньте та поверніться", "Кнопка вгорі праворуч зупиняє або запускає обертання. Перетягування змінює ракурс; Назад повертає без редагування треку."]
      ], ["Чому профіль плаский?", "Перевірте наявність змістовних висот. Нульовий профіль не доводить, що місцевість пласка. 3D-перегляд побудовника маршрутів окремо запитує висоти рельєфу й може потребувати мережі та згоди на передачу координат."]],
      report: ["Перегляд і поширення звіту треку", "Перевірте статистику й графіки, а потім створіть PDF, якщо тариф містить докладні звіти.", "Докладний звіт і PDF: Core та вище", "Для аналізу подорожі використовуйте записаний трек. Намальований маршрут не містить надійного часу чи швидкості подорожі. Перевірте дані й одиниці перед поширенням.", [
        ["Відкрийте аналіз або звіт", "Виберіть трек у його шарі. Прокрутіть дії до Ще та виберіть Аналіз або Звіт. Звіт відкриває подробиці; підсумок і графіки розташовані вище."],
        ["Порівняйте графіки", "Перевірте відстань, тривалість, середню швидкість і максимальну висоту. Перемикайте поєднаний графік, швидкість і висоту. Відсутні або сталі дані обмежують висновки."],
        ["Перевірте подробиці", "З Core та вище перегляньте рух/паузи, темп, швидкості, набір/втрату висоти й кількість точок. Це обчислення за треком, а не незалежні вимірювання."],
        ["Поширте PDF", "Натисніть Поділитися PDF у звіті. Дочекайтеся підготовки та виберіть призначення в системному меню. Потрібні щонайменше дві точки. Перевірте місця перед надсиланням."]
      ], ["Чи є погода історичною?", "Назви місць і погода можуть запитуватися онлайн під час створення звіту. Погода не є записом умов під час подорожі. Без сервісів можуть відображатися координати замість назв, а погода — бути відсутньою."]]
    },
    ar: {
      threeD: ["فحص المسار بعرض ثلاثي الأبعاد", "قارن الارتفاع والسرعة وشكل المسار دون تغيير التسجيل المحفوظ.", "يلزم مسار من نقطتين على الأقل", "هذا عرض تخطيطي، وليس محرر رسم ثلاثي الأبعاد أو نموذج تضاريس بمقياس حقيقي. لا يستعيد بيانات الارتفاع أو السرعة المفقودة.", [
        ["افتح بطاقة المسار", "من الطبقات، افتح الطبقة التي تحتوي على المسار وحدده. اضغط 3D في صف الإجراءات."],
        ["اختر العرض", "اختر الارتفاع أو السرعة أو المسار فقط. يعرض وضع السرعة السرعة المسجلة وليس ارتفاع الأرض؛ ويزيل وضع المسار فقط الملف الرأسي."],
        ["افحص ثم ارجع", "يوقف زر التدوير أعلى الشاشة الدوران التلقائي أو يشغله. اسحب لتغيير زاوية الكاميرا، ثم ارجع دون تعديل المسار."]
      ], ["لماذا يبدو الملف مسطحاً؟", "تحقق من وجود قيم ارتفاع مفيدة. الملف الصفري لا يثبت أن الأرض مسطحة. معاينة 3D في منشئ المسارات مسار عمل منفصل يستعلم عن ارتفاع التضاريس، وقد يحتاج إلى الإنترنت وإذن إرسال الإحداثيات."]],
      report: ["قراءة تقرير المسار ومشاركته", "راجع الإحصاءات والرسوم، ثم أنشئ PDF إذا كانت باقتك تشمل التقارير المفصلة.", "التقرير المفصل وPDF: باقة Core فأعلى", "استخدم مساراً مسجلاً لتحليل الرحلة. المسار المرسوم يدوياً لا يحتوي على أوقات وسرعات رحلة موثوقة. راجع البيانات والوحدات قبل المشاركة.", [
        ["افتح التحليل أو التقرير", "حدد المسار داخل طبقته. مرر صف الإجراءات إلى المزيد، ثم اختر التحليل أو التقرير. يفتح التقرير التفاصيل؛ مرر للأعلى لرؤية الملخص والرسوم."],
        ["قارن الرسوم", "راجع المسافة والمدة ومتوسط السرعة وأقصى ارتفاع. بدّل بين العرض المشترك والسرعة والارتفاع. البيانات المفقودة أو الثابتة تحد من الاستنتاجات."],
        ["راجع التفاصيل", "مع Core فأعلى، افحص وقت الحركة والتوقف والوتيرة والسرعات والصعود والهبوط وعدد النقاط. هذه حسابات من بيانات المسار وليست قياسات مستقلة."],
        ["شارك PDF", "استخدم مشاركة PDF في قسم التقرير. انتظر الإعداد ثم اختر الوجهة في نافذة مشاركة النظام. يلزم نقطتان على الأقل. راجع المواقع قبل الإرسال."]
      ], ["هل الطقس من وقت الرحلة؟", "قد تُطلب أسماء الأماكن والطقس عبر الإنترنت عند إعداد التقرير. الطقس ليس سجلاً لظروف وقت الرحلة. دون هذه الخدمات قد تظهر الإحداثيات بدلاً من الأسماء وتغيب بيانات الطقس."]]
    },
    hi: {
      threeD: ["ट्रैक को 3D में देखें", "सहेजे गए ट्रैक को बदले बिना ऊँचाई, गति और आकार की तुलना करें।", "कम से कम दो बिंदुओं वाला ट्रैक चाहिए", "यह योजनात्मक दृश्य है, 3D ड्रॉइंग संपादक या सही पैमाने का भूभाग मॉडल नहीं। इससे अनुपलब्ध ऊँचाई या गति वापस नहीं मिलती।", [
        ["ट्रैक कार्ड खोलें", "लेयर में ट्रैक वाली लेयर खोलकर ट्रैक चुनें। कार्रवाई की पंक्ति में 3D दबाएँ।"],
        ["दृश्य चुनें", "ऊँचाई, गति या केवल मार्ग चुनें। गति मोड दर्ज गति दिखाता है, भूभाग की ऊँचाई नहीं; केवल मार्ग लंबवत प्रोफ़ाइल हटाता है।"],
        ["देखें और वापस जाएँ", "ऊपर दाईं ओर का घुमाव बटन स्वचालित घुमाव रोकता या चलाता है। कैमरे का कोण बदलने के लिए खींचें; वापस जाने से ट्रैक नहीं बदलता।"]
      ], ["प्रोफ़ाइल सपाट क्यों है?", "जाँचें कि स्रोत में उपयोगी ऊँचाई है। शून्य प्रोफ़ाइल सपाट भूभाग का प्रमाण नहीं। मार्ग बनाने वाले साधन का 3D पूर्वावलोकन अलग प्रक्रिया है; वह भूभाग की ऊँचाई माँगता है और इंटरनेट तथा निर्देशांक भेजने की अनुमति चाह सकता है।"]],
      report: ["ट्रैक रिपोर्ट पढ़ें और साझा करें", "आँकड़े और ग्राफ़ देखें, फिर योजना में विस्तृत रिपोर्ट शामिल होने पर PDF बनाएँ।", "विस्तृत रिपोर्ट और PDF: Core या ऊपर", "यात्रा के विश्लेषण के लिए रिकॉर्ड किया हुआ ट्रैक लें। हाथ से बनाए मार्ग में भरोसेमंद यात्रा समय या गति नहीं होती। साझा करने से पहले डेटा और इकाइयाँ जाँचें।", [
        ["विश्लेषण या रिपोर्ट खोलें", "लेयर में ट्रैक चुनें। कार्रवाई की पंक्ति को अधिक तक खिसकाएँ और विश्लेषण या रिपोर्ट चुनें। रिपोर्ट विवरण खोलती है; सारांश और ग्राफ़ ऊपर हैं।"],
        ["ग्राफ़ की तुलना करें", "दूरी, अवधि, औसत गति और अधिकतम ऊँचाई देखें। संयुक्त, गति और ऊँचाई के बीच बदलें। अनुपलब्ध या स्थिर डेटा निष्कर्षों को सीमित करता है।"],
        ["विवरण जाँचें", "Core या ऊपर में चलने/रुकने का समय, पेस, गति, चढ़ाई/उतराई और बिंदु संख्या देखें। ये ट्रैक डेटा से गणनाएँ हैं, स्वतंत्र माप नहीं।"],
        ["PDF साझा करें", "रिपोर्ट में PDF साझा करें दबाएँ। तैयारी के बाद सिस्टम की शेयर शीट में गंतव्य चुनें। कम से कम दो बिंदु चाहिए। भेजने से पहले स्थान जाँचें।"]
      ], ["क्या मौसम यात्रा के समय का है?", "रिपोर्ट बनाते समय स्थानों के नाम और मौसम ऑनलाइन माँगे जा सकते हैं। मौसम यात्रा के समय की स्थितियों का रिकॉर्ड नहीं है। सेवाएँ उपलब्ध न हों तो नामों की जगह निर्देशांक और मौसम के बिना रिपोर्ट मिल सकती है।"]]
    },
    ur: {
      threeD: ["ٹریک کو 3D میں دیکھیں", "محفوظ ٹریک بدلے بغیر بلندی، رفتار اور شکل کا موازنہ کریں۔", "کم از کم دو نقاط والا ٹریک درکار ہے", "یہ خاکہ نما منظر ہے، 3D ڈرائنگ ایڈیٹر یا درست پیمانے کا زمینی ماڈل نہیں۔ یہ غیر موجود بلندی یا رفتار واپس نہیں لاتا۔", [
        ["ٹریک کارڈ کھولیں", "لیئرز میں متعلقہ لیئر کھول کر ٹریک منتخب کریں۔ کارروائیوں کی قطار میں 3D دبائیں۔"],
        ["منظر منتخب کریں", "بلندی، رفتار یا صرف راستہ منتخب کریں۔ رفتار موڈ ریکارڈ شدہ رفتار دکھاتا ہے، زمین کی بلندی نہیں؛ صرف راستہ عمودی پروفائل ہٹاتا ہے۔"],
        ["دیکھیں اور واپس جائیں", "اوپر گھماؤ کا بٹن خودکار گردش روکتا یا شروع کرتا ہے۔ کیمرے کا زاویہ بدلنے کے لیے گھسیٹیں؛ واپس جانے سے ٹریک تبدیل نہیں ہوتا۔"]
      ], ["پروفائل ہموار کیوں ہے؟", "دیکھیں کہ اصل ڈیٹا میں بامعنی بلندی موجود ہے۔ صفر پروفائل زمین کے ہموار ہونے کا ثبوت نہیں۔ راستہ بنانے والے آلے کا 3D پیش منظر الگ طریقہ ہے جو زمینی بلندی مانگتا ہے؛ اسے انٹرنیٹ اور مختصات بھیجنے کی اجازت درکار ہو سکتی ہے۔"]],
      report: ["ٹریک رپورٹ پڑھیں اور شیئر کریں", "اعداد اور گراف دیکھیں، پھر پیکیج میں تفصیلی رپورٹ شامل ہو تو PDF بنائیں۔", "تفصیلی رپورٹ اور PDF: Core یا اس سے اوپر", "سفر کا تجزیہ ریکارڈ شدہ ٹریک سے کریں۔ ہاتھ سے بنائے راستے میں قابلِ اعتماد سفری وقت یا رفتار نہیں ہوتی۔ شیئر کرنے سے پہلے ڈیٹا اور اکائیاں جانچیں۔", [
        ["تجزیہ یا رپورٹ کھولیں", "لیئر میں ٹریک منتخب کریں۔ کارروائیوں کی قطار مزید تک سرکائیں اور تجزیہ یا رپورٹ منتخب کریں۔ رپورٹ تفصیلات کھولتی ہے؛ خلاصہ اور گراف اوپر ہیں۔"],
        ["گراف کا موازنہ کریں", "فاصلہ، دورانیہ، اوسط رفتار اور زیادہ سے زیادہ بلندی دیکھیں۔ مشترکہ، رفتار اور بلندی کے درمیان بدلیں۔ غیر موجود یا یکساں ڈیٹا نتائج محدود کرتا ہے۔"],
        ["تفصیلات جانچیں", "Core یا اوپر میں حرکت/وقفے کا وقت، رفتار، پیس، چڑھائی/اترائی اور نقاط کی تعداد دیکھیں۔ یہ ٹریک سے حساب ہیں، الگ پیمائش نہیں۔"],
        ["PDF شیئر کریں", "رپورٹ میں PDF شیئر کریں دبائیں۔ تیاری مکمل ہونے پر سسٹم شیئر شیٹ میں منزل منتخب کریں۔ کم از کم دو نقاط درکار ہیں۔ بھیجنے سے پہلے مقامات جانچیں۔"]
      ], ["کیا موسم سفر کے وقت کا ہے؟", "رپورٹ بناتے وقت مقامات کے نام اور موسم آن لائن لیے جا سکتے ہیں۔ موسم سفر کے وقت کے حالات کا ریکارڈ نہیں۔ سروس دستیاب نہ ہو تو ناموں کی جگہ مختصات آ سکتے ہیں اور موسم غائب ہو سکتا ہے۔"]]
    }
  };
  const reportConsentTips = {
    en: ["Can I decline location sharing?", "Yes. After any first-visit help, the report asks before external location queries unless you already agreed. Cancel keeps the report local: coordinates replace place names and weather is omitted. You can still prepare the PDF and review it before sharing."],
    tr: ["Konum paylaşımını reddedebilir miyim?", "Evet. İlk kullanım yardımı varsa kapattıktan sonra, daha önce onay vermediyseniz dış konum sorguları için izin sorulur. İptal seçimi raporu yerel tutar: yer adları yerine koordinatlar gösterilir, hava durumu eklenmez. PDF’yi yine hazırlayıp paylaşmadan önce inceleyebilirsiniz."],
    de: ["Kann ich die Standortweitergabe ablehnen?", "Ja. Nach einer eventuellen Einführung fragt der Bericht vor externen Standortabfragen nach Ihrer Zustimmung, sofern diese nicht bereits vorliegt. Abbrechen hält den Bericht lokal: Koordinaten ersetzen Ortsnamen, Wetter entfällt. Das PDF kann trotzdem erstellt und vor dem Teilen geprüft werden."],
    es: ["¿Puedo rechazar compartir la ubicación?", "Sí. Tras la ayuda inicial, si aparece, el informe pide permiso antes de consultar ubicaciones externas, salvo que ya lo haya concedido. Cancelar mantiene el informe local: muestra coordenadas en vez de nombres y omite el tiempo. Puede crear el PDF y revisarlo antes de compartirlo."],
    fr: ["Puis-je refuser le partage de position ?", "Oui. Après l’aide de première visite, si elle apparaît, le rapport demande votre accord avant les requêtes de localisation externes, sauf accord déjà donné. Annuler conserve un rapport local : coordonnées au lieu des noms de lieux, sans météo. Vous pouvez toujours créer et vérifier le PDF avant de le partager."],
    it: ["Posso rifiutare la condivisione della posizione?", "Sì. Dopo l’eventuale guida iniziale, il rapporto chiede il consenso prima delle richieste esterne sulla posizione, se non è già stato concesso. Annulla mantiene il rapporto locale: coordinate al posto dei nomi e nessun dato meteo. Puoi comunque creare e controllare il PDF prima di condividerlo."],
    pt: ["Posso recusar a partilha da localização?", "Sim. Após a ajuda inicial, caso apareça, o relatório pede autorização antes de consultas externas de localização, se ainda não a tiver dado. Cancelar mantém o relatório local: coordenadas em vez de nomes e sem meteorologia. Pode criar o PDF e revê-lo antes de partilhar."],
    ru: ["Можно отказаться от передачи координат?", "Да. После вводной справки, если она появится, отчёт запросит разрешение на внешние запросы местоположения, если согласие ещё не дано. Отмена оставляет отчёт локальным: вместо названий — координаты, без погоды. PDF всё равно можно создать и проверить перед отправкой."],
    uk: ["Чи можна відмовитися від передавання координат?", "Так. Після початкової довідки, якщо вона з’явиться, звіт запитає дозвіл на зовнішні запити місцеположення, якщо згоди ще немає. Скасування залишає звіт локальним: координати замість назв, без погоди. PDF можна створити й перевірити перед надсиланням."],
    ar: ["هل يمكنني رفض مشاركة الموقع؟", "نعم. بعد إغلاق إرشادات الزيارة الأولى إن ظهرت، يطلب التقرير الإذن قبل استعلامات الموقع الخارجية ما لم توافق سابقاً. يحافظ الإلغاء على التقرير محلياً: تظهر الإحداثيات بدلاً من أسماء الأماكن ولا تُضاف بيانات الطقس. يمكنك إنشاء PDF ومراجعته قبل مشاركته."],
    hi: ["क्या मैं स्थान साझा करने से मना कर सकता हूँ?", "हाँ। पहली बार की सहायता दिखे तो उसे बंद करने के बाद, पहले सहमति न दी हो तो बाहरी स्थान अनुरोधों के लिए अनुमति माँगी जाती है। रद्द करने पर रिपोर्ट स्थानीय रहती है: स्थानों के नाम की जगह निर्देशांक आते हैं और मौसम नहीं जुड़ता। आप फिर भी PDF बनाकर साझा करने से पहले जाँच सकते हैं।"],
    ur: ["کیا میں مقام شیئر کرنے سے انکار کر سکتا ہوں؟", "جی ہاں۔ پہلی بار کی رہنمائی ظاہر ہو تو اسے بند کرنے کے بعد، پہلے رضامندی نہ دی ہو تو بیرونی مقام کی درخواستوں کے لیے اجازت مانگی جاتی ہے۔ منسوخ کرنے سے رپورٹ مقامی رہتی ہے: جگہوں کے نام کے بجائے مختصات آتے ہیں اور موسم شامل نہیں ہوتا۔ PDF پھر بھی بنا کر شیئر کرنے سے پہلے دیکھ سکتے ہیں۔"]
  };
  for (const {id} of window.MAPNERO_GUIDE_LOCALES) {
    if (!content[id]) throw new Error("Missing track-tools locale: " + id);
    for (const [key, topicId] of [["threeD", "track-3d"], ["report", "track-report"]]) {
      const [title, summary, access, note, steps, tip] = content[id][key];
      window.MAPNERO_GUIDES[id].platforms.apple.topics.push({
        id: topicId, title, summary, access, note,
        steps: steps.map(([title, body]) => ({title, body})),
        tips: [{q: tip[0], a: tip[1]}, ...(key === "report"
          ? [{q: reportConsentTips[id][0], a: reportConsentTips[id][1]}] : [])]
      });
    }
  }
})();
