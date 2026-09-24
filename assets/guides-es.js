(function () {
  "use strict";
  const T = (title, summary, access, steps, tips = [], note) => ({ title, summary, access, steps, tips, ...(note ? { note } : {}) });

  const offline = T("Descargar y probar un mapa sin conexión", "Guarde una zona antes del trabajo de campo y compruebe que funciona sin red.", "Límite gratuito · ilimitado con Core+", [
    ["Abra Mapas sin conexión", "En el mapa base, primero desplácese y haga zoom hasta el área. Luego abra Mapas sin conexión desde los controles del mapa o Más."],
    ["Seleccione la zona", "La descarga usa el área visible del mapa base al abrir Mapas sin conexión. Si es incorrecta, cierre la pantalla, ajuste el mapa y vuelva a abrirla."],
    ["Descargue con conexión", "Revise el tamaño estimado, inicie la descarga y espere a que termine."],
    ["Pruebe en modo avión", "Desconecte la red, vuelva a abrir la zona y pruebe todos los niveles de zoom necesarios."]
  ], [["El mapa está vacío en algunos niveles", "Esos niveles quizá no se seleccionaron o no terminaron. Conéctese y descargue de nuevo la zona."]]);

  const safety = T("Usar con seguridad los registros EOD y de acción contra minas", "Capture datos estructurados sin tratar calculadoras no verificadas como autoridad operativa.", "Según modo y plan", [
    ["Elija el modo correcto", "Seleccione el modo EOD o acción contra minas en Ajustes."],
    ["Capture el registro", "Complete Spot Report, Certificate o Land Release, incluida la fuente y la ubicación."],
    ["Revise la exportación", "Compruebe coordenadas, unidades, adjuntos y organización antes de crear PDF o IMSMA."],
    ["Siga la autoridad aprobada", "Para decisiones operativas use normas aprobadas, revisión EOD/ESO cualificada y herramientas autorizadas."]
  ], [], "Los resultados de RESS y de las calculadoras química y nuclear son borradores de formación/planificación no verificados. Nunca los use como distancias seguras ni predicciones de víctimas.");

  window.registerMapNeroGuideLocale("es", {
    ui: {
      pageTitle: "Guías de usuario de MapNero", home: "Inicio", language: "Idioma", eyebrow: "GUÍA DE CAMPO", title: "¿Cómo podemos ayudar?",
      intro: "Elija su dispositivo y después la tarea. Cada guía contiene pasos cortos y prácticos.", search: "Buscar en las guías", reset: "Restablecer progreso",
      choosePlatform: "Elija su plataforma", topicsEyebrow: "TAREAS", topics: "Elija una tarea", taskCount: "{count} guías", noResults: "No se encontró ninguna guía",
      noResultsHint: "Pruebe una palabra más sencilla, como PDF, track, capa u offline.", important: "Antes de empezar", steps: "Siga estos pasos", help: "Si algo no funciona",
      previous: "Anterior", next: "Siguiente guía", progress: "{done} de {total} pasos completados", completed: "completado", notCompleted: "no completado",
      copyLink: "Copiar enlace", print: "Imprimir guía", linkCopied: "Enlace copiado", resetDone: "Progreso restablecido", resetConfirm: "¿Restablecer todos los pasos completados?",
      support: "Soporte", privacy: "Privacidad", terms: "Condiciones"
    },
    platforms: {
      apple: { label: "iPhone · iPad · Mac", description: "Aplicación nativa de Apple", topics: {
        "quick-start": T("Empezar con Simple Map", "Prepare MapNero para el uso diario con cuatro controles grandes.", "Gratis", [
          ["Elija Simple Map", "En el primer inicio elija Simple Map. Puede cambiarlo después en Ajustes sin borrar mapas ni registros."],
          ["Permita la ubicación", "Abra el mapa, conceda permiso cuando se solicite y espere al aire libre una posición precisa."],
          ["Conozca los cuatro controles", "Use Localizar, Añadir pin, Grabar y Más. En Más están medición, mapa base y mapas sin conexión."]
        ], [["¿Puedo volver a las herramientas profesionales?", "Sí. Cambie el modo en Ajustes; se conservarán sus datos y diseño de herramientas."]]),
        "import-map": T("Importar un PDF o archivo de mapa", "Cargue GeoPDF, PDF, GeoTIFF, KMZ o una imagen y ábralo en el mapa.", "Gratis · algunos formatos requieren Core o Pro", [
          ["Abra Importar", "Desde el mapa o la Biblioteca, abra Importar mapa."],
          ["Elija la fuente", "Seleccione PDF/GeoPDF, GeoTIFF, imagen, KMZ, enlace web o código QR."],
          ["Compruebe la posición", "Abra el mapa importado y pulse Localizar. Si un PDF antiguo está desplazado, elimínelo e impórtelo otra vez."],
          ["Use Abrir en MapNero", "También puede seleccionar un archivo compatible en Archivos y compartirlo o abrirlo con MapNero."]
        ], [["El mapa está vacío", "Confirme que terminó la importación y que la vista está dentro de sus límites geográficos."], ["Mi posición está fuera del mapa", "El PDF puede no estar georreferenciado o usar puntos de control no válidos. Pruebe la misma posición en el mapa base."]], "Los PDF de varias páginas requieren Pro. Georreferenciar una foto como mapa requiere Core o superior."),
        "location-track": T("Encontrar su posición y grabar un track", "Mantenga el mapa centrado y guarde su recorrido como track.", "Límites gratuitos · ilimitado con Core+", [
          ["Centre el mapa", "Pulse Localizar. Vuelva a pulsarlo para cambiar el seguimiento y mantener el mapa centrado al moverse."],
          ["Inicie la grabación", "Pulse Grabar, confirme el estado y empiece a moverse."],
          ["Observe la línea en directo", "La línea se actualiza durante la grabación en el mapa base y en los PDF importados."],
          ["Detenga y guarde", "Pulse el botón cuadrado Detener; el track se guarda automáticamente al finalizar. Revíselo después en la Biblioteca o en su capa."]
        ], [["Localizar no mueve el mapa", "Revise Ajustes del iPhone → Privacidad y seguridad → Localización → MapNero y espere al aire libre."], ["El track no aparece", "Abra Capas y confirme que su capa está visible y sin filtros."]]),
        "pins-layers": T("Añadir pines y administrar capas", "Guarde lugares, detalles de campo y controle lo visible en el mapa.", "Gratis · herramientas avanzadas pueden requerir Core+", [
          ["Elija una capa visible", "Abra Capas, seleccione una capa normal editable y active su visibilidad."],
          ["Añada el pin", "Pulse Añadir pin o mantenga pulsado el mapa y elija el tipo."],
          ["Describa el registro", "Añada nombre, notas, atributos o multimedia y guarde."],
          ["Edite después", "Pulse la entidad y abra Editar en su tarjeta de información."]
        ], [["¿Por qué no puedo añadir un pin?", "La capa activa puede estar oculta, bloqueada, en la papelera, ser de solo lectura o WMS/WMTS. Elija una capa normal visible."]], "MapNero no guarda pines en capas ocultas, bloqueadas, eliminadas ni WMS/WMTS. Elija primero una capa visible y editable."),
        "offline-maps": offline,
        "collections-atlas": T("Usar colecciones y Atlas", "Recorra hojas GeoPDF contiguas como un atlas y mantenga visibles los registros comunes.", "Colecciones Core+ · crear Atlas Pro", [
          ["Agrupe los mapas", "En la Biblioteca ponga las hojas georreferenciadas en la misma colección y las detalladas por encima de las de respaldo."],
          ["Cruce los bordes", "Abra un mapa y desplace la mira central a la hoja vecina. Cambiará la hoja activa conservando la escala."],
          ["Active cambio GPS solo si hace falta", "La navegación manual por el centro está activa. El cambio automático GPS es independiente y empieza desactivado."],
          ["Cree un Atlas", "Con un MBTiles ráster sin conexión activo, abra Crear mapa PDF, active Atlas, elija escala y solape y cree hasta 64 hojas."]
        ], [["La colección no cambia de mapa", "Todas las hojas deben estar descargadas, georreferenciadas y en la misma colección; ordene de forma única las que se solapan."], ["Desaparecen pines o tracks", "Use la capa de colección para datos que deben verse en todas las hojas."]], "Para crear Atlas se necesita una fuente MBTiles ráster descargada y activa; no funciona con un mapa base solo en línea o vectorial."),
        "measure-cogo-buffer": T("Medir, trazar un rumbo y crear un búfer", "Mida distancia o área, construya una línea por rumbo de cuadrícula y guarde polígonos de búfer.", "Medición gratis · Búfer Pro", [
          ["Mida en el mapa", "Abra Más → Medir, coloque puntos y lea la longitud o el área en directo."],
          ["Construya por rumbo y distancia", "Abra Más → COGO, elija un punto base o GPS e introduzca un rumbo de cuadrícula de 0–360° y hasta 100 km."],
          ["Cree un búfer", "Abra un punto, línea, track, polígono o círculo, pulse Búfer y elija metros, color de relleno y opacidad."],
          ["Edite el resultado", "Abra el búfer en Búferes derivados y cambie distancia, relleno u opacidad. La distancia lo reconstruye desde la entidad original."]
        ], [["No se puede crear el búfer", "Confirme una geometría válida y los límites de 500 km de extensión y 10 km de búfer."]], "El rumbo COGO actual se mide desde el norte de cuadrícula UTM, no desde el norte magnético o verdadero."),
        "team-gnss": T("Conectar un equipo o GNSS externo", "Inicie sesión para compartir con la organización o conecte un receptor para mayor precisión.", "Equipo · GNSS gratis durante la beta", [
          ["Inicie sesión", "Abra Ajustes → Cuenta, escriba su correo e introduzca el código de seis dígitos."],
          ["Únase a la organización", "Acepte una invitación o introduzca el código del administrador."],
          ["Comparta una capa", "Abra una capa, active Compartir con la organización. La sincronización necesita internet."],
          ["Conecte GNSS", "Abra Ajustes → GNSS externo, active Bluetooth, elija el receptor y espere posición y precisión válidas."]
        ], [["El receptor no aparece", "Active el modo de emparejamiento, compruebe Bluetooth y desconéctelo antes de otros dispositivos."]]),
        "eod-safety": safety
      }},
      android: { label: "Android", description: "Aplicación de Google Play", topics: {
        "quick-start": T("Empezar con Simple Map", "Prepare MapNero para el uso diario con cuatro controles grandes.", "Gratis", [
          ["Elija Simple Map", "En el primer inicio elija Simple Map; puede cambiarlo en Ajustes sin borrar datos."],
          ["Permita la ubicación", "Conceda ubicación precisa. MapNero solicita por separado la ubicación en segundo plano para grabar con pantalla apagada."],
          ["Conozca los cuatro controles", "Use Localizar, Añadir pin, Grabar y Más. En Más están medición, mapa base y herramientas sin conexión."]
        ], [["¿Puedo volver a las herramientas profesionales?", "Sí. Cambie el modo en Ajustes; sus mapas y registros se conservarán."]]),
        "import-map": T("Importar un PDF o archivo GIS", "Abra mapas PDF y formatos GIS comunes desde MapNero o Abrir con de Android.", "Según formato y plan", [
          ["Abra Añadir mapa o Importar", "En Añadir mapa elija PDF, KMZ, foto, enlace o QR; use Importar para datos vectoriales."],
          ["Elija el archivo", "Se admiten GeoJSON, KML/KMZ, GPX y Shapefile ZIP, además de compatibilidad limitada con MBTiles y GeoTIFF."],
          ["Revise el resumen", "La pantalla de confirmación muestra las entidades que se importarán y las omitidas con el motivo."],
          ["Use Abrir con MapNero", "En Descargas o Archivos seleccione un archivo compatible, pulse Abrir con y elija MapNero."]
        ], [["Se omitió una entidad Shapefile", "Revise el resumen: allí se indican proyecciones, geometrías incompatibles o archivos auxiliares ausentes."], ["Un PDF antiguo sigue desplazado", "Elimine esa copia e importe de nuevo el PDF original para usar el lector corregido."]]),
        "location-track": T("Encontrar su posición y grabar en segundo plano", "Siga su posición y mantenga un track preciso con la pantalla apagada.", "Límites gratuitos · ilimitado con Core+", [
          ["Centre y siga", "Pulse Localizar y cambie el estado de seguimiento si quiere mantener el mapa centrado."],
          ["Acepte el aviso", "Lea la explicación y permita la ubicación en segundo plano en Ajustes de Android."],
          ["Inicie la grabación", "Pulse Grabar, confirme la notificación permanente y bloquee la pantalla si lo necesita."],
          ["Detenga y guarde", "Vuelva a MapNero o use la acción de la notificación, detenga y guarde el track."]
        ], [["El track se detiene al apagar la pantalla", "Permita ubicación todo el tiempo y quite las restricciones de batería durante la sesión."], ["Localizar no centra durante la grabación", "Cambie el seguimiento con Localizar y confirme que el PDF no esté bloqueado a sus límites."]], "Android exige una notificación visible del servicio mientras graba en segundo plano. MapNero no graba en secreto."),
        "pins-layers": T("Añadir pines y administrar capas", "Guarde ubicaciones, use símbolos claros y controle visibilidad y orden.", "Gratis · herramientas avanzadas pueden requerir Core+", [
          ["Seleccione una capa editable", "Abra Capas, seleccione una capa normal y active su visibilidad."],
          ["Añada un pin", "Pulse Añadir pin o mantenga pulsado el mapa y elija un símbolo adecuado."],
          ["Añada detalles", "Introduzca título, atributos, notas y adjuntos y guarde."],
          ["Edite o exporte", "Abra la tarjeta de la entidad. Edite o exporte GPX, KML, CSV, GeoJSON o Shapefile si está permitido."]
        ], [["El botón muestra un aviso de capa", "Elija una capa normal visible. Las capas de servicio web son solo de visualización."]], "Una capa oculta, bloqueada, eliminada o WMS/WMTS no acepta nuevos pines ni entidades editables."),
        "offline-maps": offline,
        "collections-atlas": T("Usar colecciones y Atlas", "Recorra hojas PDF contiguas como un atlas y mantenga disponibles las entidades comunes.", "Colecciones Core+ · crear Atlas Pro", [
          ["Cree una colección", "En Mis mapas agrupe mapas georreferenciados contiguos y ordene los detallados por encima de los de respaldo."],
          ["Navegue con la mira", "Mueva la mira central a una hoja vecina; se activará sin reiniciar la escala."],
          ["Comparta los registros", "Guarde pines, tracks y dibujos en la capa de colección si deben aparecer en todas las hojas."],
          ["Cree un Atlas", "Active un MBTiles ráster offline, abra Crear mapa PDF, elija Atlas, escala y solape y cree las hojas."]
        ], [["Una hoja desaparece al volver", "Confirme que cada PDF sigue en el dispositivo, tiene límites válidos y un orden único si se solapa."]], "Atlas requiere un MBTiles ráster descargado y activo y admite hasta 64 hojas GeoPDF orientadas al norte."),
        "measure-cogo-buffer": T("Medir, construir y crear búfer", "Lea distancia en directo, construya por rumbo UTM y guarde búferes editables.", "Medición gratis · Búfer Pro", [
          ["Mida distancia o área", "Abra Medir, coloque puntos y lea la longitud en la línea elástica."],
          ["Cree una línea de rumbo", "Abra COGO, use GPS o introduzca DD/UTM/MGRS y después rumbo de cuadrícula y hasta 100 km."],
          ["Aplique búfer a una o varias entidades", "Abra una entidad o seleccione varias con Lazo y elija distancia, color y opacidad."],
          ["Edite Búferes derivados", "Cambie distancia, relleno u opacidad. Una nueva distancia regenera la geometría desde la fuente."]
        ], [["Falla un búfer SHP complejo", "Compruebe los límites de 500 km de geometría y 10 km de búfer, y que la capa fuente sea editable."]], "COGO usa ahora el norte de cuadrícula UTM. No introduzca un rumbo magnético como si fuera de cuadrícula."),
        "team-gnss": T("Conectar un equipo o GNSS externo", "Comparta capas de organización o use un receptor Bluetooth para mejorar la posición.", "Equipo · GNSS gratis", [
          ["Inicie sesión", "Abra Ajustes → Cuenta, escriba su correo y el código de seis dígitos."],
          ["Únase a la organización", "Acepte una invitación o introduzca el código de unión."],
          ["Comparta la capa", "Active Compartir con la organización. La sincronización necesita internet."],
          ["Conecte GNSS", "Permita Bluetooth, elija el receptor y verifique tipo de posición, precisión y satélites."]
        ], [["¿Un GLO 2 puede servir a dos teléfonos?", "Depende del receptor. Empareje cada dispositivo según su manual y confirme la posición externa antes de grabar."]]),
        "eod-safety": safety
      }},
      web: { label: "Web GIS", description: "Espacio personal y de organización", topics: {
        "sign-in": T("Iniciar sesión y abrir el espacio", "Las cuentas Pro y Team pueden usar su propio espacio GIS; la organización es opcional.", "Pro o Team · organización opcional", [
          ["Abra app.mapnero.com", "Elija Iniciar sesión e introduzca el correo de su cuenta MapNero. Use la misma cuenta que en móvil para ver sus capas."],
          ["Introduzca el código", "Use el código de seis dígitos recibido por correo. No lo comparta."],
          ["Abra GIS · Capas", "Desde la navegación izquierda abra MapLibre GIS. Sus capas son privadas por defecto; las capas de la organización aparecen cuando se comparten con usted."]
        ], [["No veo la organización", "Puede trabajar con sus propias capas. Para ver las de la organización, confirme el correo invitado y pida al administrador que revise su membresía."]]),
        "layers-features": T("Ver capas e inspeccionar entidades", "Controle la visibilidad, seleccione entidades y revise atributos.", "Pro o Team", [
          ["Elija mapa base", "Seleccione Estándar, OSM, Satélite, Híbrido, Topográfico u Oscuro."],
          ["Active capas", "En el panel active sus capas o las capas compartidas por una organización."],
          ["Inspeccione una entidad", "Haga clic en un punto, línea o polígono para abrir su tarjeta y atributos."],
          ["Use la tabla", "Abra la tabla para buscar, filtrar e inspeccionar registros."]
        ], [["El mapa dice que aún no hay capas", "Cree o importe una capa privada en web o móvil. Comparta con la organización solo si quiere dar acceso al equipo."]]),
        "import-export": T("Importar o exportar datos GIS", "Revise los archivos antes de escribirlos y exporte en formatos comunes.", "Importar requiere rol de escritura", [
          ["Inicie una importación", "En GIS elija Importar y seleccione GeoJSON, KML, GPX o Shapefile ZIP."],
          ["Revise el resumen", "Compruebe geometría, coordenadas y omisiones. No se escribe nada hasta confirmar."],
          ["Elija el destino", "Seleccione o cree la capa editable correcta y confirme."],
          ["Exporte", "Exporte la capa o selección como GeoJSON, KML, GPX o CSV."]
        ], [["Se rechaza un Shapefile proyectado", "Lea la explicación y conviértalo a un sistema geográfico compatible."]]),
        "edit-online": T("Crear y editar entidades en línea", "Dibuje puntos, líneas o polígonos y edite atributos con protección de conflictos.", "En línea · rol de escritura", [
          ["Seleccione una capa editable", "Use una capa normal. WMS/WMTS y capas de solo lectura no aceptan entidades."],
          ["Entre en edición", "Abra la barra de edición y elija punto, línea o polígono."],
          ["Dibuje y describa", "Coloque la geometría, complete atributos y revise la forma."],
          ["Guarde o resuelva conflictos", "Guarde en línea. Si otro usuario cambió el registro, revise el conflicto antes de sobrescribir."]
        ], [["Las herramientas están desactivadas", "Compruebe conexión, organización activa y permiso de escritura."]], "La edición web requiere internet. El espacio sin conexión es de solo lectura."),
        "offline-snapshot": T("Preparar visualización cifrada sin conexión", "Cree una instantánea protegida de solo lectura para ver GIS sin red.", "Acceso de organización", [
          ["Abra Acceso sin conexión", "Con sesión y conexión, abra el panel de acceso offline de GIS."],
          ["Cree una frase segura", "Introduzca al menos 15 caracteres. No se almacena; guárdela en un gestor de contraseñas."],
          ["Guarde la instantánea", "Espere a que estén listos el sobre cifrado y la interfaz offline."],
          ["Pruebe el acceso", "Desconecte la red, abra el espacio offline y desbloquéelo con la frase."]
        ], [["Olvidé la frase", "La instantánea no puede descifrarse. Reconecte y cree una nueva."], ["Los datos son antiguos", "Es una copia puntual. Reconecte y actualícela antes del campo."]], "El espacio web sin conexión está cifrado y es de solo lectura. No descarga mapas base móviles, edita ni sincroniza sin red."),
        reports: T("Revisar informes y liberación de tierras", "Use paneles, Spot Reports, Certificates y Land Release para supervisión.", "Según rol", [
          ["Abra la sección", "Use Dashboard, Rollup, Spot Reports, Land Release o Certificates."],
          ["Filtre", "Acote por estado, fecha, zona u organización disponibles."],
          ["Abra el registro", "Revise fuente, ubicación, estado, adjuntos y auditoría."],
          ["Edite solo con autorización", "Use Editar únicamente si su rol y procedimiento lo permiten."]
        ], [], "La clasificación de liberación de tierras afecta a la seguridad. Siga la aprobación y revisión cualificada de su organización."),
        "team-live": T("Ver una sesión de equipo en directo", "Abra una sesión de campo activa con su código y supervise la información compartida.", "Equipo", [
          ["Obtenga el código", "Pídalo al responsable de campo por un canal aprobado."],
          ["Abra Team Live", "Elija Equipo e introduzca el código."],
          ["Compruebe actualidad", "Confirme que esté activa y revise la última actualización antes de confiar en una posición."],
          ["Cierre al terminar", "Cierre la vista y siga el proceso del equipo para finalizar o cambiar el código."]
        ]),
        "web-limits": T("Saber qué corresponde al móvil", "Use Web GIS para ver, editar e informar; las apps móviles para tracks y mapas base descargados.", "Todos los usuarios web", [
          ["Grabe tracks en móvil", "Web GIS no graba GPS ni conecta receptores GNSS externos."],
          ["Descargue mapas base en móvil", "El offline web es una instantánea GIS cifrada, no el descargador móvil."],
          ["Continúe sus capas en web", "Las capas de la misma cuenta móvil aparecen en web. Active Compartir con la organización solo para dar acceso al equipo."],
          ["Use web para supervisar", "Inspeccione capas, edite lo permitido, exporte y revise informes en una pantalla grande."]
        ])
      }}
    }
  });
})();
