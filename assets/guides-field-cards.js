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
  const nodes = Array.from(section.querySelectorAll('[data-field-copy]'));
  const originals = nodes.map(node => node.textContent);
  function render() {
    const isPortuguese = language.value === 'pt';
    section.lang = isPortuguese ? 'pt-BR' : 'en';
    section.dir = 'ltr';
    nodes.forEach((node, index) => {
      node.textContent = isPortuguese ? portuguese[Number(node.dataset.fieldCopy)] : originals[index];
    });
  }
  language.addEventListener('change', render);
  render();
}());
