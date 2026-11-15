/* Translate the quick-guide cards independently of device-specific guide data. */
(function () {
  'use strict';
  const section = document.querySelector('.field-guide-entry');
  const language = document.getElementById('language-select');
  if (!section || !language) return;
  const portuguese = [
  "Guias rápidos de campo",
  "Escolha um assunto e um idioma. Os vídeos têm narração em inglês; as legendas disponíveis aparecem em cada player.",
  "Baixe o MapNero",
  "Baixe o aplicativo e siga o guia para o seu dispositivo.",
  "Abra um mapa GeoPDF",
  "Importe seu mapa e confira a posição antes de ir a campo. ",
  "Compare um GeoPDF com um PDF comum",
  "Abra um mapa GeoTIFF",
  "Confira os formatos aceitos pelo seu dispositivo e teste o mapa offline.",
  "Leve dados do QGIS para o celular",
  "Teste uma camada no celular antes de transferir seus dados de campo.",
  "Grave trajetos GPS offline",
  "Teste uma gravação curta antes de sair da área de cobertura e exporte o trajeto em GPX.",
  "Salve um ponto e adicione uma nota",
  "Assista ao passo a passo de 32 segundos no iPhone, com legendas.",
  "Configure alertas de geocerca",
  "Escolha um raio e receba um alerta ao entrar ou sair.",
  "Planeje uma rota com pontos",
  "Adicione pontos, confira a distância e salve a rota desenhada. Assista ao guia de 24 segundos no iPhone.",
  "Meça distâncias no mapa",
  "Veja a distância durante a medição em um exemplo de 15 segundos no iPhone."
];
  const indonesian = [
  "Panduan lapangan singkat",
  "Pilih topik dan bahasa. Video menggunakan narasi bahasa Inggris; takarir yang tersedia tercantum di setiap pemutar. Panduan perangkat di bawah mengikuti pilihan bahasa di atas.",
  "Unduh MapNero",
  "Unduh aplikasinya, lalu ikuti panduan untuk perangkat Anda.",
  "Buka peta GeoPDF",
  "Impor peta dan periksa posisinya sebelum ke lapangan. ",
  "Bandingkan GeoPDF dengan PDF biasa",
  "Buka peta GeoTIFF",
  "Periksa format yang didukung perangkat Anda dan uji peta tanpa koneksi.",
  "Bawa data QGIS ke ponsel",
  "Uji satu layer contoh di ponsel sebelum memindahkan data lapangan.",
  "Rekam jejak GPS tanpa koneksi",
  "Uji rekaman singkat sebelum keluar dari jangkauan jaringan, lalu ekspor sebagai GPX.",
  "Simpan titik dan tambahkan catatan",
  "Tonton panduan iPhone 32 detik dengan takarir.",
  "Atur peringatan geofence",
  "Pilih radius dan terima peringatan saat masuk atau keluar.",
  "Rencanakan rute dengan titik",
  "Tempatkan titik, periksa jarak, lalu simpan rute yang digambar. Tonton panduan iPhone 24 detik.",
  "Ukur jarak pada peta",
  "Lihat jarak selama pengukuran dalam contoh iPhone 15 detik."
];
  const nodes = Array.from(section.querySelectorAll('[data-field-copy]'));
  const originals = nodes.map(node => node.textContent);
  function render(selectedLanguage) {
    const copy = { pt: portuguese, id: indonesian }[selectedLanguage];
    section.lang = { pt: 'pt-BR', id: 'id' }[selectedLanguage] || 'en';
    section.dir = 'ltr';
    nodes.forEach((node, index) => {
      node.textContent = copy ? copy[Number(node.dataset.fieldCopy)] : originals[index];
    });
    const comparison = section.querySelector('[data-field-copy="6"]');
    if (comparison) {
      comparison.setAttribute('href', ({
        pt: 'geopdf-maps-pt-br.html',
        id: 'geopdf-maps-id.html'
      }[selectedLanguage] || 'geopdf-maps.html') + '#check-your-pdf');
    }
  }
  language.addEventListener('change', function () { render(language.value); });
  // The device-guide catalog currently falls back to English for Indonesian.
  // Keep these independent quick cards in the language requested by their link.
  const requestedLanguage = new URLSearchParams(window.location.search).get('lang');
  render(requestedLanguage === 'id' ? 'id' : language.value);
}());
