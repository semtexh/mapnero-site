(function () {
  "use strict";

  // This is deliberately a separate mobile topic.  Viewing a feature's existing
  // attributes is not the same workflow as defining the schema that field staff
  // will use.  Keep the two entry paths explicit: Layer settings and Templates.
  const content = {
    en: {
      title: "Create attribute forms for a layer",
      summary: "Define the fields your team records, either in a layer or as a reusable template.",
      access: "Available with supported Layers and Templates access",
      note: "A template bound to a layer supplies that layer’s attribute fields. Review the fields before field collection; changing a schema later does not rewrite records that already exist.",
      steps: [
        ["Start from the layer", "Open Layers, choose a writable layer, then open its settings and Attribute Schema. Add the fields that belong to every feature, such as species, cover, status, notes or a date."],
        ["Or create a reusable template", "Open Library → Templates and create a form with the fields your team needs. Use a template when the same form should be reused across more than one field workflow."],
        ["Bind the template to the layer", "Return to the layer’s settings, open Template Binding and choose the template. Its fields become the layer’s feature attribute schema."],
        ["Collect and review records", "Add or edit a point, line or polygon in that layer and complete the form. Open the layer’s attribute table to search, filter and review saved records."]
      ],
      tips: [["Can a template be created from an existing layer?", "Yes. In a layer’s Template Binding section, choose Generate Template from Layer when that option is available. Check the generated fields before sharing it with a team."]]
    },
    tr: {
      title: "Bir katman için öznitelik formu oluşturun",
      summary: "Ekibinizin kaydedeceği alanları doğrudan katmanda ya da tekrar kullanılabilir bir şablonda tanımlayın.",
      access: "Desteklenen Katmanlar ve Şablonlar erişimiyle kullanılabilir",
      note: "Katmana bağlanan şablon, o katmanın öznitelik alanlarını sağlar. Sahaya çıkmadan alanları gözden geçirin; şemayı sonradan değiştirmek mevcut kayıtları yeniden yazmaz.",
      steps: [
        ["Katmandan başlayın", "Katmanlar’ı açın, yazılabilir bir katman seçin; ardından ayarlarından Öznitelik Şeması’nı açın. Tür, kaplama, durum, not veya tarih gibi her objede bulunacak alanları ekleyin."],
        ["Ya da tekrar kullanılabilir şablon oluşturun", "Kütüphane → Şablonlar yolundan ekibin ihtiyaç duyduğu alanlarla bir form oluşturun. Aynı form birden fazla saha akışında kullanılacaksa şablonu tercih edin."],
        ["Şablonu katmana bağlayın", "Katmanın ayarlarına dönün, Şablon Bağlantısı’nı açın ve şablonu seçin. Şablonun alanları katmanın feature öznitelik şeması olur."],
        ["Kayıtları toplayın ve inceleyin", "Bu katmana nokta, çizgi veya poligon ekleyin ya da düzenleyin ve formu doldurun. Kaydedilmiş kayıtları aramak, filtrelemek ve incelemek için katmanın öznitelik tablosunu açın."]
      ],
      tips: [["Mevcut katmandan şablon üretilebilir mi?", "Evet. Katmanın Şablon Bağlantısı bölümünde seçenek görünüyorsa Katmandan Şablon Oluştur’u kullanın. Ekiple paylaşmadan önce oluşan alanları kontrol edin."]]
    },
    ar: {
      title: "إنشاء نموذج سمات لطبقة",
      summary: "عرّف الحقول التي يسجلها فريقك، مباشرةً في الطبقة أو كنموذج قابل لإعادة الاستخدام.",
      access: "متاح مع صلاحية الطبقات والنماذج المدعومة",
      note: "يوفر النموذج المرتبط بطبقة حقول السمات لتلك الطبقة. راجع الحقول قبل العمل الميداني؛ تغيير المخطط لاحقًا لا يعيد كتابة السجلات الموجودة.",
      steps: [["ابدأ من الطبقة", "افتح الطبقات، واختر طبقة قابلة للكتابة، ثم افتح إعداداتها ومخطط السمات. أضف حقولًا مثل النوع أو التغطية أو الحالة أو الملاحظات أو التاريخ."], ["أو أنشئ نموذجًا قابلًا لإعادة الاستخدام", "افتح المكتبة ← النماذج وأنشئ نموذجًا بالحقول التي يحتاجها فريقك. استخدم النموذج عندما تحتاج إلى إعادة استعمال الاستمارة في أكثر من سير عمل ميداني."], ["اربط النموذج بالطبقة", "ارجع إلى إعدادات الطبقة، وافتح ربط النموذج واختر النموذج. تصبح حقوله مخطط سمات المعالم في الطبقة."], ["اجمع السجلات وراجعها", "أضف أو عدّل نقطة أو خطًا أو مضلعًا في الطبقة ثم أكمل النموذج. افتح جدول السمات للطبقة للبحث في السجلات وحفظها ومراجعتها."]],
      tips: [["هل يمكن إنشاء نموذج من طبقة موجودة؟", "نعم. من قسم ربط النموذج في الطبقة، اختر إنشاء نموذج من الطبقة عندما يظهر الخيار. راجع الحقول المنشأة قبل مشاركته مع الفريق."]]
    },
    de: {
      title: "Attributformular für eine Ebene erstellen",
      summary: "Definieren Sie die Felder Ihres Teams direkt in einer Ebene oder als wiederverwendbare Vorlage.",
      access: "Mit unterstütztem Zugriff auf Ebenen und Vorlagen verfügbar",
      note: "Eine an eine Ebene gebundene Vorlage liefert die Attributfelder dieser Ebene. Prüfen Sie die Felder vor dem Feldeinsatz; eine spätere Schemaänderung schreibt vorhandene Datensätze nicht um.",
      steps: [["Bei der Ebene beginnen", "Öffnen Sie Ebenen, wählen Sie eine beschreibbare Ebene und öffnen Sie deren Einstellungen sowie Attributschema. Fügen Sie Felder wie Art, Deckung, Status, Notizen oder Datum hinzu."], ["Oder eine wiederverwendbare Vorlage erstellen", "Öffnen Sie Bibliothek → Vorlagen und erstellen Sie ein Formular mit den benötigten Feldern. Verwenden Sie eine Vorlage, wenn dasselbe Formular in mehreren Feldabläufen genutzt werden soll."], ["Vorlage an die Ebene binden", "Kehren Sie zu den Ebeneneinstellungen zurück, öffnen Sie Vorlagenbindung und wählen Sie die Vorlage. Ihre Felder werden zum Attributschema der Ebene."], ["Datensätze erfassen und prüfen", "Fügen Sie in dieser Ebene einen Punkt, eine Linie oder ein Polygon hinzu oder bearbeiten Sie es und füllen Sie das Formular aus. Öffnen Sie die Attributtabelle der Ebene zum Suchen, Filtern und Prüfen gespeicherter Datensätze."]],
      tips: [["Kann aus einer vorhandenen Ebene eine Vorlage erstellt werden?", "Ja. Wählen Sie in der Vorlagenbindung der Ebene Vorlage aus Ebene erstellen, wenn die Option verfügbar ist. Prüfen Sie die erzeugten Felder vor der Teamfreigabe."]]
    },
    es: {
      title: "Crear un formulario de atributos para una capa",
      summary: "Defina los campos que registra su equipo, en una capa o como plantilla reutilizable.",
      access: "Disponible con acceso compatible a Capas y Plantillas",
      note: "Una plantilla vinculada a una capa proporciona los campos de atributos de esa capa. Revise los campos antes del trabajo de campo; cambiar el esquema después no reescribe los registros existentes.",
      steps: [["Empiece por la capa", "Abra Capas, elija una capa editable y abra sus ajustes y Esquema de atributos. Añada campos como especie, cobertura, estado, notas o fecha."], ["O cree una plantilla reutilizable", "Abra Biblioteca → Plantillas y cree un formulario con los campos que necesita el equipo. Use una plantilla cuando el mismo formulario deba reutilizarse en más de un flujo de campo."], ["Vincule la plantilla a la capa", "Vuelva a los ajustes de la capa, abra Vinculación de plantilla y elija la plantilla. Sus campos pasan a ser el esquema de atributos de las entidades de la capa."], ["Capture y revise los registros", "Añada o edite un punto, línea o polígono en esa capa y complete el formulario. Abra la tabla de atributos de la capa para buscar, filtrar y revisar los registros guardados."]],
      tips: [["¿Se puede crear una plantilla desde una capa existente?", "Sí. En Vinculación de plantilla de la capa, elija Generar plantilla desde capa cuando esté disponible. Revise los campos generados antes de compartirla con el equipo."]]
    },
    fr: {
      title: "Créer un formulaire d’attributs pour une couche",
      summary: "Définissez les champs saisis par votre équipe dans une couche ou sous forme de modèle réutilisable.",
      access: "Disponible avec l’accès compatible aux Calques et Modèles",
      note: "Un modèle lié à une couche fournit les champs d’attributs de cette couche. Vérifiez les champs avant le terrain ; modifier le schéma plus tard ne réécrit pas les enregistrements existants.",
      steps: [["Partir de la couche", "Ouvrez Calques, choisissez une couche modifiable, puis ouvrez ses réglages et Schéma d’attributs. Ajoutez des champs tels qu’espèce, couverture, statut, notes ou date."], ["Ou créer un modèle réutilisable", "Ouvrez Bibliothèque → Modèles et créez un formulaire avec les champs nécessaires à votre équipe. Utilisez un modèle si le même formulaire doit servir dans plusieurs flux terrain."], ["Lier le modèle à la couche", "Revenez aux réglages de la couche, ouvrez Liaison du modèle et choisissez le modèle. Ses champs deviennent le schéma d’attributs des entités de la couche."], ["Collecter et vérifier les enregistrements", "Ajoutez ou modifiez un point, une ligne ou un polygone dans cette couche puis remplissez le formulaire. Ouvrez la table d’attributs pour rechercher, filtrer et vérifier les enregistrements enregistrés."]],
      tips: [["Peut-on créer un modèle depuis une couche existante ?", "Oui. Dans Liaison du modèle de la couche, choisissez Générer un modèle depuis la couche si l’option apparaît. Vérifiez les champs produits avant de le partager à l’équipe."]]
    },
    hi: {
      title: "लेयर के लिए एट्रिब्यूट फ़ॉर्म बनाएँ",
      summary: "टीम द्वारा दर्ज किए जाने वाले फ़ील्ड सीधे लेयर में या पुन: उपयोग योग्य टेम्पलेट के रूप में तय करें।",
      access: "समर्थित Layers और Templates पहुँच के साथ उपलब्ध",
      note: "लेयर से जुड़ा टेम्पलेट उसी लेयर के एट्रिब्यूट फ़ील्ड देता है। फील्डवर्क से पहले फ़ील्ड जाँचें; बाद में स्कीमा बदलने से पुराने रिकॉर्ड दोबारा नहीं लिखे जाते।",
      steps: [["लेयर से शुरू करें", "Layers खोलें, लिखने योग्य लेयर चुनें, फिर उसके settings और Attribute Schema खोलें। species, cover, status, notes या date जैसे फ़ील्ड जोड़ें।"], ["या पुन: उपयोग योग्य टेम्पलेट बनाएँ", "Library → Templates खोलें और टीम के लिए आवश्यक फ़ील्ड वाला फ़ॉर्म बनाएँ। जब एक ही फ़ॉर्म कई field workflows में चाहिए हो तो टेम्पलेट इस्तेमाल करें।"], ["टेम्पलेट को लेयर से जोड़ें", "लेयर settings पर लौटें, Template Binding खोलें और टेम्पलेट चुनें। उसके फ़ील्ड लेयर का feature attribute schema बन जाते हैं।"], ["रिकॉर्ड दर्ज और जाँचें", "उस लेयर में point, line या polygon जोड़ें या बदलें और फ़ॉर्म भरें। रिकॉर्ड खोजने, फ़िल्टर करने और जाँचने के लिए लेयर की attribute table खोलें।"]],
      tips: [["क्या मौजूदा लेयर से टेम्पलेट बन सकता है?", "हाँ। उपलब्ध होने पर लेयर के Template Binding में Generate Template from Layer चुनें। टीम के साथ साझा करने से पहले बने फ़ील्ड जाँचें।"]]
    },
    it: {
      title: "Creare un modulo attributi per un livello",
      summary: "Definisci i campi registrati dal team direttamente nel livello o come modello riutilizzabile.",
      access: "Disponibile con accesso supportato a Livelli e Modelli",
      note: "Un modello collegato a un livello fornisce i campi attributo di quel livello. Controlla i campi prima del rilievo; modificare lo schema in seguito non riscrive i record esistenti.",
      steps: [["Parti dal livello", "Apri Livelli, scegli un livello modificabile, poi apri impostazioni e Schema attributi. Aggiungi campi come specie, copertura, stato, note o data."], ["Oppure crea un modello riutilizzabile", "Apri Libreria → Modelli e crea un modulo con i campi necessari al team. Usa un modello quando lo stesso modulo deve essere riutilizzato in più flussi sul campo."], ["Collega il modello al livello", "Torna alle impostazioni del livello, apri Collegamento modello e scegli il modello. I suoi campi diventano lo schema attributi delle entità del livello."], ["Raccogli e controlla i record", "Aggiungi o modifica un punto, linea o poligono nel livello e completa il modulo. Apri la tabella attributi del livello per cercare, filtrare e controllare i record salvati."]],
      tips: [["Si può creare un modello da un livello esistente?", "Sì. In Collegamento modello del livello, scegli Genera modello dal livello quando l’opzione è disponibile. Controlla i campi generati prima di condividerlo con il team."]]
    },
    pt: {
      title: "Criar um formulário de atributos para uma camada",
      summary: "Defina os campos registados pela equipa numa camada ou como modelo reutilizável.",
      access: "Disponível com acesso suportado a Camadas e Modelos",
      note: "Um modelo associado a uma camada fornece os campos de atributos dessa camada. Reveja os campos antes do trabalho de campo; alterar o esquema depois não reescreve registos existentes.",
      steps: [["Comece pela camada", "Abra Camadas, escolha uma camada editável e abra as definições e Esquema de atributos. Adicione campos como espécie, cobertura, estado, notas ou data."], ["Ou crie um modelo reutilizável", "Abra Biblioteca → Modelos e crie um formulário com os campos necessários à equipa. Use um modelo quando o mesmo formulário for reutilizado em mais do que um fluxo de campo."], ["Associe o modelo à camada", "Volte às definições da camada, abra Associação de modelo e escolha o modelo. Os seus campos passam a ser o esquema de atributos das feições da camada."], ["Recolha e reveja registos", "Adicione ou edite um ponto, linha ou polígono nessa camada e complete o formulário. Abra a tabela de atributos da camada para pesquisar, filtrar e rever registos guardados."]],
      tips: [["É possível criar um modelo a partir de uma camada existente?", "Sim. Em Associação de modelo da camada, escolha Gerar modelo a partir da camada quando essa opção estiver disponível. Reveja os campos gerados antes de partilhar com a equipa."]]
    },
    ru: {
      title: "Создать форму атрибутов для слоя",
      summary: "Определите поля, которые записывает ваша команда, в слое или как повторно используемый шаблон.",
      access: "Доступно при поддерживаемом доступе к слоям и шаблонам",
      note: "Шаблон, связанный со слоем, задаёт поля атрибутов этого слоя. Проверьте поля до выхода в поле: изменение схемы позже не переписывает существующие записи.",
      steps: [["Начните со слоя", "Откройте Слои, выберите доступный для записи слой, затем откройте его настройки и Схему атрибутов. Добавьте поля, например вид, покрытие, статус, заметки или дату."], ["Или создайте повторно используемый шаблон", "Откройте Библиотека → Шаблоны и создайте форму с нужными команде полями. Используйте шаблон, если одна форма нужна для нескольких полевых процессов."], ["Привяжите шаблон к слою", "Вернитесь к настройкам слоя, откройте Привязка шаблона и выберите шаблон. Его поля станут схемой атрибутов объектов слоя."], ["Собирайте и проверяйте записи", "Добавьте или измените точку, линию или полигон в этом слое и заполните форму. Откройте таблицу атрибутов слоя для поиска, фильтрации и проверки сохранённых записей."]],
      tips: [["Можно ли создать шаблон из существующего слоя?", "Да. В разделе Привязка шаблона слоя выберите Создать шаблон из слоя, если эта команда доступна. Проверьте созданные поля перед передачей команде."]]
    },
    uk: {
      title: "Створити форму атрибутів для шару",
      summary: "Визначте поля, які записує ваша команда, безпосередньо в шарі або як багаторазовий шаблон.",
      access: "Доступно з підтримуваним доступом до Шарів і Шаблонів",
      note: "Шаблон, прив’язаний до шару, надає поля атрибутів цього шару. Перевірте поля до польової роботи: пізніша зміна схеми не переписує наявні записи.",
      steps: [["Почніть із шару", "Відкрийте Шари, виберіть шар, доступний для запису, а потім відкрийте його налаштування та Схему атрибутів. Додайте поля, наприклад вид, покриття, статус, нотатки або дату."], ["Або створіть багаторазовий шаблон", "Відкрийте Бібліотека → Шаблони та створіть форму з полями, потрібними команді. Використовуйте шаблон, якщо одна форма потрібна в кількох польових процесах."], ["Прив’яжіть шаблон до шару", "Поверніться до налаштувань шару, відкрийте Прив’язка шаблону й виберіть шаблон. Його поля стануть схемою атрибутів об’єктів шару."], ["Збирайте й перевіряйте записи", "Додайте або відредагуйте точку, лінію чи полігон у цьому шарі та заповніть форму. Відкрийте таблицю атрибутів шару для пошуку, фільтрації та перевірки збережених записів."]],
      tips: [["Чи можна створити шаблон з наявного шару?", "Так. У розділі Прив’язка шаблону шару виберіть Створити шаблон із шару, коли цей пункт доступний. Перевірте створені поля перед передаванням команді."]]
    },
    ur: {
      title: "لیئر کے لیے attribute فارم بنائیں",
      summary: "وہ فیلڈز متعین کریں جو آپ کی ٹیم ریکارڈ کرتی ہے، براہِ راست لیئر میں یا دوبارہ استعمال ہونے والے ٹیمپلیٹ کے طور پر۔",
      access: "معاون Layers اور Templates رسائی کے ساتھ دستیاب",
      note: "لیئر سے منسلک ٹیمپلیٹ اسی لیئر کے attribute فیلڈز فراہم کرتا ہے۔ فیلڈ ورک سے پہلے فیلڈز چیک کریں؛ بعد میں schema بدلنے سے موجودہ ریکارڈز دوبارہ نہیں لکھے جاتے۔",
      steps: [["لیئر سے شروع کریں", "Layers کھولیں، لکھنے کے قابل لیئر منتخب کریں، پھر اس کی settings اور Attribute Schema کھولیں۔ species، cover، status، notes یا date جیسے فیلڈز شامل کریں۔"], ["یا دوبارہ استعمال ہونے والا ٹیمپلیٹ بنائیں", "Library → Templates کھولیں اور ٹیم کے مطلوبہ فیلڈز کے ساتھ فارم بنائیں۔ جب ایک ہی فارم کئی field workflows میں چاہیے ہو تو ٹیمپلیٹ استعمال کریں۔"], ["ٹیمپلیٹ کو لیئر سے جوڑیں", "لیئر settings پر واپس جائیں، Template Binding کھولیں اور ٹیمپلیٹ منتخب کریں۔ اس کے فیلڈز لیئر کا feature attribute schema بن جاتے ہیں۔"], ["ریکارڈ جمع اور جانچیں", "اس لیئر میں point، line یا polygon شامل یا تبدیل کریں اور فارم مکمل کریں۔ ریکارڈ تلاش، filter اور جائزہ لینے کے لیے لیئر کی attribute table کھولیں۔"]],
      tips: [["کیا موجودہ لیئر سے ٹیمپلیٹ بنایا جا سکتا ہے؟", "ہاں۔ لیئر کے Template Binding میں دستیاب ہونے پر Generate Template from Layer منتخب کریں۔ ٹیم کے ساتھ شیئر کرنے سے پہلے بنے ہوئے فیلڈز چیک کریں۔"]]
    }
  };

  for (const { id } of window.MAPNERO_GUIDE_LOCALES) {
    const entry = content[id];
    if (!entry) throw new Error("Missing attributes guide: " + id);
    for (const platform of ["apple", "android"]) {
      window.MAPNERO_GUIDES[id].platforms[platform].topics.push({
        id: "attribute-forms",
        ...entry,
        steps: entry.steps.map(([title, body]) => ({ title, body })),
        tips: entry.tips.map(([q, a]) => ({ q, a }))
      });
    }
  }
})();
