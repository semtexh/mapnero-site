(function () {
  "use strict";

  // Both public store listings identify external GNSS as Pro/Team Beta.
  // Keep the older Android-only asset available for cached guide pages.
  const copy = {
    en: ["External GNSS: Pro/Team (Beta)", "External GNSS support is in Beta and requires Pro or Team. Compatibility depends on the receiver, device and connection method. Test your receiver before fieldwork."],
    tr: ["Harici GNSS: Pro/Team (Beta)", "Harici GNSS desteği Beta aşamasındadır ve Pro veya Team gerektirir. Uyumluluk alıcıya, cihaza ve bağlantı yöntemine bağlıdır. Saha çalışmasından önce alıcınızı test edin."],
    ar: ["GNSS خارجي: Pro/Team (تجريبي)", "دعم GNSS الخارجي تجريبي ويتطلب Pro أو Team. يعتمد التوافق على المستقبل والجهاز وطريقة الاتصال. اختبر المستقبل قبل العمل الميداني."],
    de: ["Externes GNSS: Pro/Team (Beta)", "Die Unterstützung externer GNSS-Empfänger ist in der Beta-Phase und erfordert Pro oder Team. Die Kompatibilität hängt vom Empfänger, Gerät und der Verbindungsmethode ab. Testen Sie Ihren Empfänger vor dem Feldeinsatz."],
    es: ["GNSS externo: Pro/Team (beta)", "La compatibilidad con GNSS externo está en beta y requiere Pro o Team. Depende del receptor, el dispositivo y el método de conexión. Pruebe el receptor antes del trabajo de campo."],
    fr: ["GNSS externe : Pro/Team (bêta)", "La prise en charge du GNSS externe est en bêta et nécessite Pro ou Team. La compatibilité dépend du récepteur, de l’appareil et du mode de connexion. Testez le récepteur avant le travail sur le terrain."],
    hi: ["बाहरी GNSS: Pro/Team (बीटा)", "बाहरी GNSS का समर्थन बीटा में है और इसके लिए Pro या Team चाहिए। संगतता रिसीवर, डिवाइस और कनेक्शन के तरीके पर निर्भर करती है। फील्डवर्क से पहले अपने रिसीवर का परीक्षण करें।"],
    it: ["GNSS esterno: Pro/Team (beta)", "Il supporto GNSS esterno è in beta e richiede Pro o Team. La compatibilità dipende dal ricevitore, dal dispositivo e dal metodo di connessione. Prova il ricevitore prima del lavoro sul campo."],
    pt: ["GNSS externo: Pro/Team (beta)", "O suporte a GNSS externo está em beta e requer Pro ou Team. A compatibilidade depende do recetor, do dispositivo e do método de ligação. Teste o recetor antes do trabalho de campo."],
    ru: ["Внешний GNSS: Pro/Team (бета)", "Поддержка внешнего GNSS находится в бета-версии и требует Pro или Team. Совместимость зависит от приёмника, устройства и способа подключения. Проверьте приёмник до полевых работ."],
    uk: ["Зовнішній GNSS: Pro/Team (бета)", "Підтримка зовнішнього GNSS перебуває в бета-версії та потребує Pro або Team. Сумісність залежить від приймача, пристрою та способу підключення. Перевірте приймач перед польовими роботами."],
    ur: ["بیرونی GNSS: Pro/Team (بیٹا)", "بیرونی GNSS کی سپورٹ بیٹا میں ہے اور اس کے لیے Pro یا Team درکار ہے۔ مطابقت ریسیور، ڈیوائس اور کنکشن کے طریقے پر منحصر ہے۔ فیلڈ ورک سے پہلے اپنے ریسیور کو آزمائیں۔"]
  };

  for (const { id } of window.MAPNERO_GUIDE_LOCALES) {
    const entry = copy[id];
    if (!entry) throw new Error("Missing GNSS access copy: " + id);
    for (const platform of ["apple", "android"]) {
      const topic = window.MAPNERO_GUIDES[id]?.platforms[platform].topics.find(item => item.id === "team-gnss");
      if (!topic) throw new Error("Missing GNSS topic: " + id + ":" + platform);
      topic.access = entry[0];
      topic.note = [entry[1], topic.note].filter(Boolean).join(" ");
    }
  }
})();
