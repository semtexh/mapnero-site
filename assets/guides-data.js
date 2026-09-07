window.MAPNERO_GUIDE_LOCALES = [
  { id: "en", label: "English", dir: "ltr" },
  { id: "tr", label: "Türkçe", dir: "ltr" },
  { id: "ar", label: "العربية", dir: "rtl" },
  { id: "de", label: "Deutsch", dir: "ltr" },
  { id: "es", label: "Español", dir: "ltr" },
  { id: "fr", label: "Français", dir: "ltr" },
  { id: "hi", label: "हिन्दी", dir: "ltr" },
  { id: "it", label: "Italiano", dir: "ltr" },
  { id: "pt", label: "Português", dir: "ltr" },
  { id: "ru", label: "Русский", dir: "ltr" },
  { id: "uk", label: "Українська", dir: "ltr" },
  { id: "ur", label: "اردو", dir: "rtl" }
];

window.MAPNERO_GUIDES = {
  en: {
    ui: {
      pageTitle: "MapNero User Guides",
      home: "Home",
      language: "Language",
      eyebrow: "FIELD GUIDE",
      title: "How can we help?",
      intro: "Choose your device, then choose what you want to do. Each guide uses short, practical steps.",
      search: "Search guides",
      reset: "Reset progress",
      choosePlatform: "Choose your platform",
      topicsEyebrow: "TASKS",
      topics: "Choose a task",
      taskCount: "{count} tasks",
      noResults: "No guide found",
      noResultsHint: "Try a simpler word such as PDF, track, layer or offline.",
      important: "Before you start",
      steps: "Follow these steps",
      help: "If something does not work",
      previous: "Previous",
      next: "Next guide",
      progress: "{done} of {total} steps complete",
      completed: "completed",
      notCompleted: "not completed",
      copyLink: "Copy guide link",
      print: "Print guide",
      linkCopied: "Guide link copied",
      resetDone: "Guide progress reset",
      resetConfirm: "Reset all completed steps?",
      support: "Support",
      privacy: "Privacy",
      terms: "Terms"
    },
    platforms: {
      apple: {
        label: "iPhone · iPad · Mac",
        description: "Native Apple app",
        icon: "A",
        topics: [
          {
            id: "quick-start",
            title: "Start with Simple Map",
            summary: "Set up MapNero for a clear everyday workflow with four large map controls.",
            access: "Free",
            steps: [
              { title: "Choose Simple Map", body: "On first launch, select Simple Map. Later, you can change it in Settings without deleting maps or records." },
              { title: "Allow location access", body: "Open the map and approve location access when asked. Go outdoors and wait briefly for the first accurate fix." },
              { title: "Learn the four controls", body: "Use Locate, Add Pin, Record and More. More contains measurement, basemap and offline map tools." }
            ],
            tips: [
              { q: "Can I return to the professional tools?", a: "Yes. Change the mode in Settings. Your saved data and custom tool layout remain available." }
            ]
          },
          {
            id: "import-map",
            title: "Import a PDF or map file",
            summary: "Load a GeoPDF, PDF, GeoTIFF, KMZ or image and open it in the map viewer.",
            access: "Free · some formats require Core or Pro",
            note: "A multi-page PDF requires Pro. Georeferencing a photo as a map requires Core or higher.",
            steps: [
              { title: "Open Import", body: "From the map or Library, open Import Map." },
              { title: "Choose the source", body: "Pick a PDF/GeoPDF, GeoTIFF, image, KMZ, web link or QR code." },
              { title: "Check the map position", body: "Open the imported map and tap Locate. If an older imported PDF is misaligned, delete that copy and import it again so the current georeference parser runs." },
              { title: "Use Open in MapNero", body: "You can also select a supported file in the Files app and share or open it with MapNero." }
            ],
            tips: [
              { q: "The map is blank", a: "Confirm the file finished importing and that your view is inside its geographic bounds." },
              { q: "My position is outside the map", a: "The PDF may not be georeferenced or may use invalid control points. Test the same location on the Base Map." }
            ]
          },
          {
            id: "location-track",
            title: "Find your location and record a track",
            summary: "Keep the map centred on your position and save your movement as a track.",
            access: "Free limits · unlimited with Core+",
            steps: [
              { title: "Centre the map", body: "Tap Locate. Tap it again to change the follow state if you want the map to remain centred while moving." },
              { title: "Start recording", body: "Tap Record, confirm the recording state, then begin moving." },
              { title: "Watch the live line", body: "The recording line updates on the Base Map and imported PDF maps while recording." },
              { title: "Stop and save", body: "Tap Record again, review the track and save it. Manage saved tracks from the Library or their layer." }
            ],
            tips: [
              { q: "Locate does not move the map", a: "Check iPhone Settings → Privacy & Security → Location Services → MapNero, then return outdoors for a fresh fix." },
              { q: "The track is not visible", a: "Open Layers and confirm the track layer is visible and not filtered." }
            ]
          },
          {
            id: "pins-layers",
            title: "Add pins and manage layers",
            summary: "Save a place, add field details and control what appears on the map.",
            access: "Free · advanced layer tools may require Core+",
            note: "MapNero will not save a pin into a hidden, locked, trashed or WMS/WMTS layer. Choose a visible writable layer first.",
            steps: [
              { title: "Choose a visible layer", body: "Open Layers and select a normal writable layer. Turn its visibility on." },
              { title: "Add the pin", body: "Tap Add Pin or long-press the map, then choose the pin type." },
              { title: "Describe the record", body: "Add a name, notes, attributes or media, then save." },
              { title: "Edit later", body: "Tap the feature on the map and open Edit from its detail card." }
            ],
            tips: [
              { q: "Why can’t I add a pin?", a: "The active layer may be hidden, locked, read-only, trashed or a web-service layer. Select or create a normal visible layer." }
            ]
          },
          {
            id: "offline-maps",
            title: "Download a map for offline use",
            summary: "Prepare a map region before leaving mobile or Wi-Fi coverage.",
            access: "1 region Free · unlimited Core+",
            steps: [
              { title: "Open Offline Maps", body: "From More or the Library, open the offline download screen." },
              { title: "Frame the work area", body: "Move and zoom the map until the required field area is inside the selection." },
              { title: "Choose detail and download", body: "Select the zoom range, check the estimated size and start the download while online." },
              { title: "Test before leaving", body: "Turn on Airplane Mode, reopen the region and confirm the required zoom levels are visible." }
            ],
            tips: [
              { q: "The offline map is blank", a: "Confirm the download completed, your location is inside its bounds and the selected zoom range includes your current zoom." }
            ]
          },
          {
            id: "collections-atlas",
            title: "Use map collections and Atlas",
            summary: "Browse adjoining GeoPDF sheets as one atlas and keep collection records visible across sheets.",
            access: "Collections Core+ · Atlas creation Pro",
            note: "Atlas creation needs an active downloaded raster MBTiles source. It does not create an atlas from an online-only or vector basemap.",
            steps: [
              { title: "Group adjoining maps", body: "In the Library, move georeferenced sheets into the same collection and place preferred detailed maps above fallback maps." },
              { title: "Browse across sheet edges", body: "Open a collection map and pan the centre crosshair into a neighbouring sheet. The active sheet changes while the camera scale is preserved." },
              { title: "Choose GPS auto-switch only if needed", body: "Manual centre browsing is on by default. GPS-based Auto-switch is separate and off by default in Map Collections settings." },
              { title: "Create an Atlas", body: "With an offline raster MBTiles basemap active, open Create PDF Map, enable Atlas collection, choose scale and overlap, then create up to 64 sheets." }
            ],
            tips: [
              { q: "The collection does not switch maps", a: "Each sheet must be downloaded, georeferenced and in the same collection. Overlapping sheets need a unique order." },
              { q: "Pins or tracks disappear after switching", a: "Use the collection layer for records that should be shared across every sheet." }
            ]
          },
          {
            id: "measure-cogo-buffer",
            title: "Measure, draw a bearing and create a buffer",
            summary: "Measure distance or area, construct a line by grid bearing, and create persistent buffer polygons.",
            access: "Measure Free · Buffer Pro",
            note: "The current COGO bearing is measured from UTM grid north. It is not a magnetic or true-north bearing.",
            steps: [
              { title: "Measure on the map", body: "Open More → Measure, place points and read the live line length or area." },
              { title: "Create by bearing and distance", body: "Open More → COGO, enter a base point or use the current GPS fix, then enter a 0–360° grid bearing and a distance up to 100 km." },
              { title: "Create a buffer", body: "Open a point, line, track, polygon or circle, tap Buffer, enter metres, choose fill colour and opacity, then create." },
              { title: "Edit the result", body: "Open the buffer in Derived Buffers to change distance, fill colour or opacity. Changing distance rebuilds it from the original feature." }
            ],
            tips: [
              { q: "A buffer cannot be created", a: "Confirm the source geometry is valid and below the 500 km extent and 10 km buffer safety limits." }
            ]
          },
          {
            id: "team-gnss",
            title: "Connect a team or external GNSS",
            summary: "Sign in for organization sharing, or pair a supported receiver for higher-accuracy positioning.",
            access: "Team sharing · GNSS free during beta",
            steps: [
              { title: "Sign in", body: "Open Settings → Account, enter your email and complete the six-digit one-time code." },
              { title: "Join your organization", body: "Accept an invitation or enter the organization code provided by its administrator." },
              { title: "Share a layer", body: "Open a layer and enable Share with organization. Internet access is required for synchronization." },
              { title: "Pair external GNSS", body: "Open Settings → External GNSS, enable Bluetooth, choose your receiver and wait for a valid position and accuracy reading." }
            ],
            tips: [
              { q: "The receiver does not appear", a: "Put it in pairing mode, confirm Bluetooth permission and disconnect it from any other device first." }
            ]
          },
          {
            id: "eod-safety",
            title: "Use EOD and mine-action records safely",
            summary: "Capture field records while keeping unverified calculation outputs out of operational decisions.",
            access: "Mode and tier dependent",
            note: "RESS, Chemical and Nuclear calculator outputs are unverified planning/training drafts. Do not use them as safe distances, casualty predictions or operational authority.",
            steps: [
              { title: "Choose the correct mode", body: "Open Settings and select the EOD or mine-action mode needed for the task." },
              { title: "Capture the field record", body: "Use Spot Report, Certificate or Land Release forms and complete the required source and location fields." },
              { title: "Review before export", body: "Check coordinates, units, attachments and organization fields before creating PDF or IMSMA XML output." },
              { title: "Use an approved authority", body: "For safety distances or consequence analysis, follow your organization’s approved standard, qualified EOD/ESO review and authorized tools." }
            ]
          }
        ]
      },
      android: {
        label: "Android",
        description: "Google Play app",
        icon: "D",
        topics: [
          {
            id: "quick-start",
            title: "Start with Simple Map",
            summary: "Set up MapNero for a clear everyday workflow with four large map controls.",
            access: "Free",
            steps: [
              { title: "Choose Simple Map", body: "On first launch, select Simple Map. You can change it later in Settings without deleting saved data." },
              { title: "Allow location access", body: "Approve precise location. MapNero asks separately before using background location for screen-off track recording." },
              { title: "Learn the four controls", body: "Use Locate, Add Pin, Record and More. More contains measurement, basemap and offline tools." }
            ],
            tips: [
              { q: "Can I return to the professional tools?", a: "Yes. Change the mode in Settings. Your maps and records remain available." }
            ]
          },
          {
            id: "import-map",
            title: "Import a PDF or GIS file",
            summary: "Open PDF maps and common GIS formats from MapNero or Android’s Open with menu.",
            access: "Import availability depends on format and tier",
            steps: [
              { title: "Open Add Map or Import", body: "Choose Import PDF Map, KMZ, photo, link or QR from Add Map, or use Import for vector data." },
              { title: "Choose the file", body: "Supported vector imports include GeoJSON, KML/KMZ, GPX and zipped Shapefile. Limited MBTiles and GeoTIFF handling is also available." },
              { title: "Review the import summary", body: "Check the parse-and-confirm screen. It lists features that will be imported and any skipped items with reasons." },
              { title: "Use Open with MapNero", body: "From Downloads or Files, select a supported file, tap Open with and choose MapNero." }
            ],
            tips: [
              { q: "A Shapefile feature was skipped", a: "Open the import summary. Projected files, unsupported geometry or missing companion files are reported there." },
              { q: "An old PDF remains misaligned", a: "Delete that imported copy and import the original PDF again so the corrected georeference parser runs." }
            ]
          },
          {
            id: "location-track",
            title: "Find your location and record in the background",
            summary: "Follow your position and keep an accurate track while the screen is off.",
            access: "Free limits · unlimited with Core+",
            note: "Android requires a visible foreground-service notification while a track records in the background. MapNero does not record secretly.",
            steps: [
              { title: "Centre and follow", body: "Tap Locate to centre the map. Change the follow state if you want the map to remain centred while moving." },
              { title: "Accept the disclosure", body: "When starting background recording, read the explanation and allow background location in Android Settings." },
              { title: "Start recording", body: "Tap Record. Confirm the persistent recording notification, then lock the screen or use another app if needed." },
              { title: "Stop and save", body: "Return to MapNero or use the notification action, stop the recording and save the track." }
            ],
            tips: [
              { q: "The track stops when the screen turns off", a: "Set Android location permission for MapNero to Allow all the time and remove restrictive battery optimization for the recording session." },
              { q: "Locate does not centre while recording", a: "Tap Locate to change follow state and confirm the PDF map is not locked to its boundary." }
            ]
          },
          {
            id: "pins-layers",
            title: "Add pins and manage layers",
            summary: "Save field locations, use clear symbols and control layer visibility and order.",
            access: "Free · advanced tools may require Core+",
            note: "A hidden, locked, trashed or WMS/WMTS layer cannot receive new pins or editable features.",
            steps: [
              { title: "Select a writable layer", body: "Open Layers, select a normal layer and make sure its visibility is on." },
              { title: "Add a pin", body: "Tap Add Pin or long-press the map. Choose a category-specific symbol when useful." },
              { title: "Add field details", body: "Enter a title, attributes, notes and attachments, then save." },
              { title: "Edit or export", body: "Tap the feature to open its detail card. Use Edit, or export the layer as GPX, KML, CSV, GeoJSON or Shapefile when allowed." }
            ],
            tips: [
              { q: "The pin button shows a layer warning", a: "Open Layers and choose a visible normal layer. Web-service layers are display-only." }
            ]
          },
          {
            id: "offline-maps",
            title: "Download and test an offline map",
            summary: "Save a region before field work and confirm it works without a network.",
            access: "Free limit · unlimited Core+",
            steps: [
              { title: "Open Offline Maps", body: "Use More or the offline control from the map screen." },
              { title: "Select the area", body: "Frame the field area and choose the zoom levels needed for your work." },
              { title: "Download while online", body: "Check estimated size, start the download and wait for completion." },
              { title: "Test in Airplane Mode", body: "Disable the network, reopen the region and zoom through the levels you need." }
            ],
            tips: [
              { q: "The offline map is empty at some zooms", a: "Those zoom levels may not have been selected or completed. Reconnect and download the region again." }
            ]
          },
          {
            id: "collections-atlas",
            title: "Use map collections and Atlas",
            summary: "Pan across adjoining PDF sheets as one atlas while keeping collection features available.",
            access: "Collections Core+ · Atlas creation Pro",
            note: "Atlas creation requires an active downloaded raster MBTiles source and supports up to 64 north-up GeoPDF sheets.",
            steps: [
              { title: "Create a collection", body: "In My Maps, place adjoining georeferenced maps in one collection and order detailed sheets above fallback sheets." },
              { title: "Browse with the crosshair", body: "Open a member sheet and pan the centre crosshair onto a neighbouring sheet. It becomes active without resetting your working scale." },
              { title: "Keep records shared", body: "Store pins, tracks and drawings in the collection layer when they must remain visible and editable on every member sheet." },
              { title: "Create an Atlas", body: "Activate an offline raster MBTiles map, open Create PDF Map, choose Atlas, scale and overlap, then create the sheet set." }
            ],
            tips: [
              { q: "A sheet disappears after switching back", a: "Confirm every PDF remains on the device and has valid bounds. Give overlapping sheets a unique collection order." }
            ]
          },
          {
            id: "measure-cogo-buffer",
            title: "Measure, construct and buffer",
            summary: "Read live distance, construct by UTM grid bearing, and save editable buffer polygons.",
            access: "Measure Free · Buffer Pro",
            note: "COGO currently uses UTM grid north. Do not enter a magnetic bearing as if it were a grid bearing.",
            steps: [
              { title: "Measure distance or area", body: "Open Measure, place points and read the live length label on the rubber-band line." },
              { title: "Create a bearing line", body: "Open COGO, use the GPS fix or enter DD/UTM/MGRS, then enter a grid bearing and distance up to 100 km." },
              { title: "Buffer one or many features", body: "Open a feature, or select several with Lasso, then choose Buffer, distance, colour and opacity." },
              { title: "Edit Derived Buffers", body: "Open a saved buffer to change distance, fill colour or opacity. Distance changes regenerate the geometry from its source." }
            ],
            tips: [
              { q: "A complex SHP buffer fails", a: "Confirm the feature is within the 500 km geometry and 10 km buffer safety limits and that the source layer is writable." }
            ]
          },
          {
            id: "team-gnss",
            title: "Connect a team or external GNSS",
            summary: "Share organization layers or use a Bluetooth receiver for improved positioning.",
            access: "Team sharing · GNSS free",
            steps: [
              { title: "Sign in", body: "Open Settings → Account, enter your email and complete the six-digit one-time code." },
              { title: "Join the organization", body: "Accept an invitation or enter the organization join code." },
              { title: "Share the layer", body: "Open the layer and enable Share with organization. Synchronization needs internet access." },
              { title: "Connect GNSS", body: "Open External GNSS, allow Bluetooth access, choose the receiver and verify fix type, accuracy and satellite status." }
            ],
            tips: [
              { q: "Can one GLO 2 feed two phones?", a: "That depends on the receiver’s connection support. Pair each device according to the receiver manual and confirm MapNero shows the external fix before recording." }
            ]
          },
          {
            id: "eod-safety",
            title: "Use EOD and mine-action records safely",
            summary: "Capture structured field data without treating unverified calculators as operational authority.",
            access: "Mode and tier dependent",
            note: "RESS, Chemical and Nuclear calculator outputs are unverified planning/training drafts. Never use them as operational safe distances or casualty predictions.",
            steps: [
              { title: "Choose the correct mode", body: "Select EOD or mine-action mode in Settings." },
              { title: "Capture the record", body: "Complete the Spot Report, Certificate or Land Release fields, including source and location context." },
              { title: "Review the export", body: "Check coordinates, units, attachments and organization fields before producing PDF or IMSMA output." },
              { title: "Follow approved authority", body: "Use your organization’s approved standards, qualified EOD/ESO review and authorized tools for operational decisions." }
            ]
          }
        ]
      },
      web: {
        label: "Web GIS",
        description: "Organization workspace",
        icon: "W",
        topics: [
          {
            id: "sign-in",
            title: "Sign in and open your workspace",
            summary: "Use your organization account to reach the dashboard and GIS workspace.",
            access: "Organization access",
            steps: [
              { title: "Open app.mapnero.com", body: "Choose Login and enter the email connected to your organization." },
              { title: "Enter the one-time code", body: "Use the six-digit code sent to your email. Never share it with another person." },
              { title: "Open GIS · Layers", body: "Use the left navigation to open the MapLibre GIS workspace and organization layers." }
            ],
            tips: [
              { q: "I cannot see the organization", a: "Confirm the same email was invited and ask an organization administrator to check your membership." }
            ]
          },
          {
            id: "layers-features",
            title: "View layers and inspect features",
            summary: "Control map visibility, select features and review their attributes.",
            access: "Organization access",
            steps: [
              { title: "Choose a basemap", body: "Select Standard, OSM, Satellite, Hybrid, Topo or Dark for the current task." },
              { title: "Turn layers on", body: "Use the layer panel to enable the organization layers you need." },
              { title: "Inspect a feature", body: "Click a point, line or polygon to open its information card and attributes." },
              { title: "Use the attribute table", body: "Open the table to search, filter and inspect the layer’s records." }
            ],
            tips: [
              { q: "The map says No layers yet", a: "A mobile user must open a layer and enable Share with organization, then allow synchronization to finish." }
            ]
          },
          {
            id: "import-export",
            title: "Import or export GIS data",
            summary: "Review files before writing them, and export organization data in common formats.",
            access: "Write role required for import",
            steps: [
              { title: "Start an import", body: "In GIS, choose Import and select GeoJSON, KML, GPX or a zipped Shapefile." },
              { title: "Review the parse summary", body: "Check detected geometry, coordinate handling and any skipped features. Nothing is written until you confirm." },
              { title: "Choose the destination", body: "Select or create the correct writable organization layer and confirm the import." },
              { title: "Export when needed", body: "Choose the current layer or feature set and export GeoJSON, KML, GPX or CSV." }
            ],
            tips: [
              { q: "A projected Shapefile is rejected", a: "Open the import explanation and convert the dataset to a supported geographic CRS before retrying." }
            ]
          },
          {
            id: "edit-online",
            title: "Create and edit features online",
            summary: "Draw point, line or polygon features and edit attributes with conflict protection.",
            access: "Online · write role",
            note: "Web editing requires an internet connection. The offline workspace is read-only.",
            steps: [
              { title: "Select a writable layer", body: "Choose a normal organization layer. WMS/WMTS and read-only layers cannot receive features." },
              { title: "Enter edit mode", body: "Open the edit toolbar and choose point, line or polygon." },
              { title: "Draw and describe", body: "Place the geometry, complete its attributes and review the shape." },
              { title: "Save or resolve a conflict", body: "Save online. If another user changed the record, review the conflict instead of silently overwriting their work." }
            ],
            tips: [
              { q: "Edit tools are disabled", a: "Confirm you are online, your organization is active and your role has write access." }
            ]
          },
          {
            id: "offline-snapshot",
            title: "Prepare encrypted offline viewing",
            summary: "Create a protected read-only snapshot for viewing organization GIS data without a connection.",
            access: "Organization access",
            note: "The web offline workspace is encrypted and read-only. It does not download mobile basemap regions, edit data or synchronize while offline.",
            steps: [
              { title: "Open Offline Access", body: "While signed in and online, open the GIS offline access panel." },
              { title: "Create a strong passphrase", body: "Enter at least 15 characters. The passphrase is never stored, so keep it in a secure password manager." },
              { title: "Save the current snapshot", body: "Wait until the encrypted envelope and offline shell are ready." },
              { title: "Test read-only access", body: "Disconnect the network, open the offline workspace and unlock it with the passphrase." }
            ],
            tips: [
              { q: "I forgot the passphrase", a: "The snapshot cannot be decrypted. Reconnect, create a new offline snapshot and choose a new passphrase." },
              { q: "The offline data is old", a: "It is a point-in-time snapshot. Reconnect and refresh it before field use." }
            ]
          },
          {
            id: "reports",
            title: "Review reports and land-release records",
            summary: "Use dashboards, Spot Reports, Certificates and Land Release views for organization oversight.",
            access: "Role dependent",
            note: "Land-release classification is safety-relevant. Follow your organization’s approval workflow and qualified review.",
            steps: [
              { title: "Open the right section", body: "Use Dashboard, Rollup, Spot Reports, Land Release or Certificates from the left navigation." },
              { title: "Filter the records", body: "Narrow by the available status, date, area or organization fields." },
              { title: "Open the record", body: "Review its source, location, status, attachments and audit context." },
              { title: "Edit only when authorized", body: "Use the edit action only when your role and organization procedure allow the change." }
            ]
          },
          {
            id: "team-live",
            title: "View a live team session",
            summary: "Open an active field session with its code and monitor shared team information.",
            access: "Team",
            steps: [
              { title: "Get the session code", body: "Ask the field-team owner for the active session code through an approved channel." },
              { title: "Open Team Live", body: "Choose Team from the web navigation and enter the code." },
              { title: "Check freshness", body: "Confirm the session is active and review the last-update time before relying on a position." },
              { title: "End access when finished", body: "Close the session view and follow the team’s process for ending or rotating the session code." }
            ]
          },
          {
            id: "web-limits",
            title: "Know what belongs on mobile",
            summary: "Use Web GIS for organization viewing, editing and reporting, and mobile apps for field tracking and downloaded basemaps.",
            access: "All web users",
            steps: [
              { title: "Record tracks on mobile", body: "Web GIS does not record GPS tracks or pair with external GNSS receivers." },
              { title: "Download basemap regions on mobile", body: "Web offline is an encrypted GIS snapshot, not the mobile offline-map downloader." },
              { title: "Share field layers to the organization", body: "Capture on iPhone, iPad or Android, then enable Share with organization so the layer appears on web." },
              { title: "Use web for oversight", body: "Inspect layers, edit permitted GIS features, export data and review organization reports from a larger screen." }
            ]
          }
        ]
      }
    }
  }
};

window.registerMapNeroGuideLocale = function registerMapNeroGuideLocale(localeId, payload) {
  const english = window.MAPNERO_GUIDES.en;
  const platformIds = ["apple", "android", "web"];

  function fail(message) {
    throw new Error(`[MapNero guides:${localeId}] ${message}`);
  }

  if (!payload?.ui || !payload?.platforms) fail("locale payload is incomplete");

  const localized = {
    ui: { ...english.ui, ...payload.ui },
    platforms: {}
  };

  platformIds.forEach((platformId) => {
    const sourcePlatform = english.platforms[platformId];
    const translatedPlatform = payload.platforms[platformId];
    if (!translatedPlatform) fail(`missing ${platformId} platform`);

    const translatedTopics = translatedPlatform.topics || {};
    localized.platforms[platformId] = {
      label: translatedPlatform.label,
      description: translatedPlatform.description,
      icon: sourcePlatform.icon,
      topics: sourcePlatform.topics.map((sourceTopic) => {
        const translatedTopic = translatedTopics[sourceTopic.id];
        if (!translatedTopic) fail(`missing ${platformId}/${sourceTopic.id}`);
        if (translatedTopic.steps?.length !== sourceTopic.steps.length) {
          fail(`wrong step count for ${platformId}/${sourceTopic.id}`);
        }
        if ((translatedTopic.tips || []).length !== (sourceTopic.tips || []).length) {
          fail(`wrong tip count for ${platformId}/${sourceTopic.id}`);
        }
        if (sourceTopic.note && !Object.hasOwn(translatedTopic, "note")) {
          fail(`missing note for ${platformId}/${sourceTopic.id}`);
        }

        return {
          id: sourceTopic.id,
          title: translatedTopic.title,
          summary: translatedTopic.summary,
          access: translatedTopic.access,
          ...(Object.hasOwn(translatedTopic, "note") ? { note: translatedTopic.note } : {}),
          steps: translatedTopic.steps.map(([title, body]) => ({ title, body })),
          ...(sourceTopic.tips?.length ? {
            tips: translatedTopic.tips.map(([q, a]) => ({ q, a }))
          } : {})
        };
      })
    };
  });

  window.MAPNERO_GUIDES[localeId] = localized;
};

window.registerMapNeroCompactGuideLocale = function registerMapNeroCompactGuideLocale(localeId, payload) {
  const english = window.MAPNERO_GUIDES.en;
  const mobileShared = payload.mobile || {};
  const accessKeys = {
    "quick-start": "free", "import-map": "mixed", "location-track": "mixed",
    "pins-layers": "mixed", "offline-maps": "mixed", "collections-atlas": "atlas",
    "measure-cogo-buffer": "buffer", "team-gnss": "team", "eod-safety": "safety",
    "sign-in": "organization", "layers-features": "organization", "import-export": "write",
    "edit-online": "write", "offline-snapshot": "organization", reports: "role",
    "team-live": "team", "web-limits": "all"
  };

  const platforms = {};
  ["apple", "android", "web"].forEach((platformId) => {
    const source = english.platforms[platformId];
    const translatedPlatform = payload.platforms[platformId];
    if (!translatedPlatform) throw new Error(`[MapNero guides:${localeId}] missing ${platformId}`);
    const entries = platformId === "web" ? payload.web : { ...mobileShared, ...(payload[platformId] || {}) };
    const topics = source.topics.map((sourceTopic) => {
      const entry = entries[sourceTopic.id];
      if (!entry || !entry.title || !entry.summary || !entry.steps?.length) {
        throw new Error(`[MapNero guides:${localeId}] missing ${platformId}/${sourceTopic.id}`);
      }
      return {
        id: sourceTopic.id,
        title: entry.title,
        summary: entry.summary,
        access: payload.access[accessKeys[sourceTopic.id]],
        ...(entry.note ? { note: entry.note } : {}),
        steps: entry.steps.map(([title, body]) => ({ title, body })),
        ...(entry.tips?.length ? { tips: entry.tips.map(([q, a]) => ({ q, a })) } : {})
      };
    });
    platforms[platformId] = {
      label: translatedPlatform.label,
      description: translatedPlatform.description,
      icon: source.icon,
      topics
    };
  });

  window.MAPNERO_GUIDES[localeId] = { ui: payload.ui, platforms };
};
