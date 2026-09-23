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
            motion: {
              caption: "Choose a source, then open the link panel when you are importing a map from the web."
            },
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
            id: "photo-georeference",
            title: "Reference a photo manually",
            summary: "Turn an unreferenced image into a map by matching known positions on the image to real-world coordinates.",
            access: "Core or higher",
            note: "Use at least three well-spaced, non-collinear points whose real coordinates you know. Do not guess control points.",
            steps: [
              { title: "Import the image", body: "Choose Import Photo as Map, then begin the manual reference option." },
              { title: "Place known control points", body: "For each point, tap the same identifiable place on the image and on the base map. Spread points around the image rather than along one edge." },
              { title: "Check before relying on it", body: "Review the fit and open the saved map. In Library, the MAN badge confirms that the map was referenced manually." }
            ],
            tips: [
              { q: "Can I reference any historical illustration?", a: "Only when you can identify reliable real-world locations in it. A decorative or fictional map must remain unreferenced until its control points are independently verified." }
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
              { title: "Stop and save", body: "Tap the square Stop button to finish recording; the track is saved automatically. Review it later in the Library or its layer." }
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
              { title: "Open Offline Maps", body: "On Base Map, move and zoom to the field area first. Then tap Offline Maps in the map controls; if needed, open More." },
              { title: "Frame the work area", body: "The download uses the visible Base Map area when Offline Maps opens. If it is wrong, close the screen, adjust the map, then open it again." },
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
              { title: "Open Offline Maps", body: "On Base Map, move and zoom to the field area first. Then use Offline Maps in the map controls or More." },
              { title: "Select the area", body: "The download uses the visible Base Map area when Offline Maps opens. If it is wrong, close the screen, adjust the map, then open it again." },
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
              { title: "Connect GNSS", body: "Open Settings, scroll to Location & Navigation, enable Use external GNSS receiver, then choose the receiver and verify fix type, accuracy and satellite status." }
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

// Short workflow clips are intentionally opt-in per exact locale. The guide
// renderer never substitutes a different language when a clip is unavailable.
window.MAPNERO_GUIDE_MOTION = {
  en: { apple: {
    "import-map": { caption: "Choose a source, then open the link panel when you are importing a map from the web." },
    "collections-atlas": { caption: "Open a map collection, fit the active sheet, then pan across the edge. MapNero keeps the view scale and activates the neighbouring sheet under the centre crosshair." }
  } },
  tr: { apple: {
    "import-map": { caption: "Bir kaynak seçin; webden harita alırken bağlantı giriş panelini açın." },
    "collections-atlas": { caption: "Bir harita koleksiyonunu açın, aktif sayfayı ekrana sığdırın ve kenarın ötesine kaydırın. MapNero ölçeği korur ve merkez nişangâhının altındaki komşu sayfayı etkinleştirir." }
  } },
  ar: { apple: {
    "import-map": { caption: "اختر مصدرًا ثم افتح لوحة الرابط عند استيراد خريطة من الويب." },
    "collections-atlas": { caption: "افتح مجموعة خرائط، واضبط الورقة النشطة لتناسب العرض، ثم حرّك الخريطة عبر الحافة. يحافظ MapNero على المقياس ويفعّل الورقة المجاورة تحت علامة التصويب المركزية." }
  } },
  de: { apple: {
    "import-map": { caption: "Wählen Sie eine Quelle und öffnen Sie beim Import einer Karte aus dem Web das Linkfeld." },
    "collections-atlas": { caption: "Öffnen Sie eine Kartensammlung, passen Sie das aktive Blatt ein und schwenken Sie über den Rand. MapNero behält den Maßstab bei und aktiviert das Nachbarblatt unter dem Fadenkreuz." }
  } },
  es: { apple: {
    "import-map": { caption: "Elija una fuente y abra el panel de enlace al importar un mapa desde la web." },
    "collections-atlas": { caption: "Abra una colección, ajuste la hoja activa y desplace el mapa más allá del borde. MapNero mantiene la escala y activa la hoja vecina bajo la retícula central." }
  } },
  fr: { apple: {
    "import-map": { caption: "Choisissez une source, puis ouvrez le panneau de lien pour importer une carte depuis le Web." },
    "collections-atlas": { caption: "Ouvrez une collection, ajustez la feuille active à l’écran, puis franchissez son bord. MapNero conserve l’échelle et active la feuille voisine sous le réticule central." }
  } },
  hi: { apple: {
    "import-map": { caption: "स्रोत चुनें; वेब से नक्शा आयात करते समय लिंक पैनल खोलें।" },
    "collections-atlas": { caption: "मैप कलेक्शन खोलें, सक्रिय शीट को स्क्रीन में फिट करें और किनारे के पार पैन करें। MapNero स्केल बनाए रखता है और बीच के क्रॉसहेयर के नीचे वाली पड़ोसी शीट सक्रिय करता है।" }
  } },
  it: { apple: {
    "import-map": { caption: "Scegli una fonte, poi apri il pannello del link per importare una mappa dal web." },
    "collections-atlas": { caption: "Apri una raccolta, adatta il foglio attivo allo schermo e supera il bordo. MapNero mantiene la scala e attiva il foglio vicino sotto il mirino centrale." }
  } },
  pt: { apple: {
    "import-map": { caption: "Escolha uma origem e abra o painel de ligação ao importar um mapa da web." },
    "collections-atlas": { caption: "Abra uma coleção, ajuste a folha ativa ao ecrã e arraste para além do limite. O MapNero mantém a escala e ativa a folha vizinha sob a mira central." }
  } },
  ru: { apple: {
    "import-map": { caption: "Выберите источник, затем откройте панель ссылки при импорте карты из интернета." },
    "collections-atlas": { caption: "Откройте коллекцию, впишите активный лист в экран и переместите карту за его край. MapNero сохраняет масштаб и активирует соседний лист под центральным прицелом." }
  } },
  uk: { apple: {
    "import-map": { caption: "Виберіть джерело, а потім відкрийте панель посилання для імпорту карти з інтернету." },
    "collections-atlas": { caption: "Відкрийте колекцію, впишіть активний аркуш в екран і перемістіть карту за його край. MapNero зберігає масштаб та активує сусідній аркуш під центральним прицілом." }
  } },
  ur: { apple: {
    "import-map": { caption: "ماخذ منتخب کریں، پھر ویب سے نقشہ درآمد کرتے وقت لنک پینل کھولیں۔" },
    "collections-atlas": { caption: "نقشوں کا مجموعہ کھولیں، فعال صفحہ اسکرین میں فٹ کریں اور کنارے سے آگے پین کریں۔ MapNero پیمانہ برقرار رکھتا ہے اور مرکزی نشانے کے نیچے والا قریبی صفحہ فعال کرتا ہے۔" }
  } }
};

// This Apple-only workflow is supplied here so it remains complete in every
// supported guide language while the platform-specific locale files keep their
// existing shared mobile-topic structure.
const PHOTO_REFERENCE_TRANSLATIONS = {
  en: { title:"Reference a photo manually", summary:"Turn an unreferenced image into a map by matching known positions to real-world coordinates.", access:"Core or higher", note:"Use at least three well-spaced, non-collinear points whose real coordinates you know. Do not guess control points.", steps:[["Import the image","Choose Import Photo as Map, then begin manual reference."],["Place known control points","Tap the same identifiable place on the image and on the base map. Spread points around the image."],["Check before relying on it","Review the fit and open the saved map. MAN in Library confirms manual referencing."]], tips:[["Can I reference any historical illustration?","Only when reliable real-world locations can be identified. Keep decorative or fictional maps unreferenced until control points are independently verified."]] },
  tr: { title:"Bir fotoğrafı elle referanslayın", summary:"Bilinen noktaları gerçek dünya koordinatlarıyla eşleştirerek referanssız bir görseli haritaya dönüştürün.", access:"Core veya üstü", note:"Gerçek koordinatlarını bildiğiniz, iyi dağılmış ve aynı doğru üzerinde olmayan en az üç nokta kullanın. Kontrol noktalarını tahmin etmeyin.", steps:[["Görseli içe aktarın","Fotoğrafı Harita Olarak İçe Aktar seçeneğini seçip elle referanslamayı başlatın."],["Bilinen kontrol noktalarını yerleştirin","Görseldeki ve altlık haritadaki aynı tanınabilir yere dokunun. Noktaları görselin çevresine dağıtın."],["Kullanmadan önce kontrol edin","Uyumu inceleyin ve kaydedilen haritayı açın. Kütüphane’deki MAN etiketi elle referansı doğrular."]], tips:[["Her tarihî görsel referanslanabilir mi?","Yalnızca güvenilir gerçek dünya konumları belirlenebiliyorsa. Dekoratif veya kurgusal haritaları noktalar bağımsız doğrulanana kadar referanssız bırakın."]] },
  ar: { title:"إسناد صورة يدويًا", summary:"حوّل صورة غير مسندة إلى خريطة بمطابقة مواقع معروفة مع إحداثيات حقيقية.", access:"Core أو أعلى", note:"استخدم ثلاث نقاط معروفة على الأقل، متباعدة وليست على خط واحد. لا تخمّن نقاط التحكم.", steps:[["استورد الصورة","اختر استيراد صورة كخريطة ثم ابدأ الإسناد اليدوي."],["ضع نقاط التحكم المعروفة","المس الموضع نفسه الواضح في الصورة والخريطة الأساسية، ووزع النقاط حول الصورة."],["تحقق قبل الاعتماد عليها","راجع المطابقة وافتح الخريطة المحفوظة. تشير MAN في المكتبة إلى الإسناد اليدوي."]], tips:[["هل يمكن إسناد أي رسم تاريخي؟","فقط عندما يمكن تحديد مواقع حقيقية موثوقة فيه. اترك الخرائط الزخرفية أو الخيالية بلا إسناد حتى التحقق المستقل من النقاط."]] },
  de: { title:"Ein Foto manuell referenzieren", summary:"Machen Sie aus einem nicht referenzierten Bild eine Karte, indem Sie bekannte Orte echten Koordinaten zuordnen.", access:"Core oder höher", note:"Verwenden Sie mindestens drei gut verteilte, nicht kollineare Punkte mit bekannten echten Koordinaten. Raten Sie keine Kontrollpunkte.", steps:[["Bild importieren","Wählen Sie Foto als Karte importieren und starten Sie die manuelle Referenzierung."],["Bekannte Kontrollpunkte setzen","Tippen Sie dieselbe erkennbare Stelle im Bild und auf der Basiskarte an. Verteilen Sie die Punkte über das Bild."],["Vor Nutzung prüfen","Prüfen Sie die Anpassung und öffnen Sie die gespeicherte Karte. MAN in der Bibliothek bestätigt die manuelle Referenzierung."]], tips:[["Kann jede historische Illustration referenziert werden?","Nur wenn zuverlässige reale Orte identifiziert werden können. Dekorative oder fiktive Karten bleiben unreferenziert, bis die Punkte unabhängig geprüft sind."]] },
  es: { title:"Georreferenciar una foto manualmente", summary:"Convierta una imagen sin referencia en mapa haciendo coincidir lugares conocidos con coordenadas reales.", access:"Core o superior", note:"Use al menos tres puntos conocidos, bien separados y no colineales. No adivine puntos de control.", steps:[["Importe la imagen","Elija Importar foto como mapa e inicie la referencia manual."],["Coloque puntos de control conocidos","Toque el mismo lugar identificable en la imagen y en el mapa base. Distribuya los puntos por toda la imagen."],["Compruebe antes de usar","Revise el ajuste y abra el mapa guardado. MAN en Biblioteca confirma la referencia manual."]], tips:[["¿Se puede referenciar cualquier ilustración histórica?","Solo si se pueden identificar ubicaciones reales fiables. Mantenga los mapas decorativos o ficticios sin referencia hasta verificar los puntos."]] },
  fr: { title:"Référencer une photo manuellement", summary:"Transformez une image non référencée en carte en associant des lieux connus à de vraies coordonnées.", access:"Core ou supérieur", note:"Utilisez au moins trois points connus, bien répartis et non alignés. Ne devinez pas les points de contrôle.", steps:[["Importez l’image","Choisissez Importer une photo comme carte puis le référencement manuel."],["Placez des points connus","Touchez le même endroit identifiable sur l’image et la carte de base. Répartissez les points sur l’image."],["Vérifiez avant utilisation","Contrôlez l’ajustement et ouvrez la carte enregistrée. MAN dans la Bibliothèque confirme le référencement manuel."]], tips:[["Toute illustration historique peut-elle être référencée ?","Seulement si des lieux réels fiables peuvent être identifiés. Laissez les cartes décoratives ou fictives non référencées jusqu’à vérification indépendante."]] },
  hi: { title:"फ़ोटो को मैन्युअली संदर्भित करें", summary:"ज्ञात स्थानों को वास्तविक निर्देशांकों से मिलाकर बिना संदर्भ वाली छवि को नक्शे में बदलें।", access:"Core या ऊपर", note:"कम से कम तीन अच्छी तरह फैले, गैर-रेखीय बिंदु इस्तेमाल करें जिनके वास्तविक निर्देशांक ज्ञात हों। नियंत्रण बिंदुओं का अनुमान न लगाएँ।", steps:[["छवि आयात करें","फ़ोटो को नक्शे के रूप में आयात करें चुनें, फिर मैन्युअल संदर्भ शुरू करें।"],["ज्ञात नियंत्रण बिंदु रखें","छवि और बेस मैप पर उसी पहचान योग्य जगह को टैप करें। बिंदुओं को पूरी छवि में फैलाएँ।"],["उपयोग से पहले जाँचें","फिट जाँचें और सहेजा नक्शा खोलें। लाइब्रेरी में MAN मैन्युअल संदर्भ की पुष्टि करता है।"]], tips:[["क्या हर ऐतिहासिक चित्र संदर्भित हो सकता है?","केवल तभी जब विश्वसनीय वास्तविक स्थान पहचाने जा सकें। सजावटी या काल्पनिक नक्शों को स्वतंत्र सत्यापन तक बिना संदर्भ रखें।"]] },
  it: { title:"Riferire una foto manualmente", summary:"Trasforma un’immagine non riferita in una mappa associando luoghi noti a coordinate reali.", access:"Core o superiore", note:"Usa almeno tre punti noti, ben distribuiti e non allineati. Non indovinare i punti di controllo.", steps:[["Importa l’immagine","Scegli Importa foto come mappa e avvia il riferimento manuale."],["Inserisci punti noti","Tocca lo stesso luogo riconoscibile nell’immagine e nella mappa base. Distribuisci i punti sull’immagine."],["Verifica prima dell’uso","Controlla l’adattamento e apri la mappa salvata. MAN nella Libreria conferma il riferimento manuale."]], tips:[["Ogni illustrazione storica può essere riferita?","Solo se si possono identificare luoghi reali affidabili. Lascia le mappe decorative o fittizie senza riferimento finché i punti non sono verificati."]] },
  pt: { title:"Referenciar uma fotografia manualmente", summary:"Transforme uma imagem sem referência num mapa associando locais conhecidos a coordenadas reais.", access:"Core ou superior", note:"Use pelo menos três pontos conhecidos, bem distribuídos e não colineares. Não adivinhe pontos de controlo.", steps:[["Importe a imagem","Escolha Importar fotografia como mapa e inicie a referência manual."],["Coloque pontos conhecidos","Toque no mesmo local identificável na imagem e no mapa base. Distribua os pontos pela imagem."],["Verifique antes de usar","Analise o ajuste e abra o mapa guardado. MAN na Biblioteca confirma a referência manual."]], tips:[["Qualquer ilustração histórica pode ser referenciada?","Apenas se locais reais fiáveis puderem ser identificados. Mantenha mapas decorativos ou fictícios sem referência até verificar os pontos."]] },
  ru: { title:"Привязать фото вручную", summary:"Превратите непривязанное изображение в карту, сопоставив известные места с реальными координатами.", access:"Core или выше", note:"Используйте не менее трёх известных, хорошо разнесённых и неколлинеарных точек. Не угадывайте контрольные точки.", steps:[["Импортируйте изображение","Выберите импорт фото как карты и начните ручную привязку."],["Поставьте известные точки","Коснитесь одного узнаваемого места на изображении и базовой карте. Распределите точки по изображению."],["Проверьте перед использованием","Проверьте соответствие и откройте сохранённую карту. MAN в Библиотеке подтверждает ручную привязку."]], tips:[["Можно привязать любую историческую иллюстрацию?","Только если в ней можно определить надёжные реальные места. Оставьте декоративные или вымышленные карты без привязки до независимой проверки точек."]] },
  uk: { title:"Прив’язати фото вручну", summary:"Перетворіть неприв’язане зображення на карту, зіставивши відомі місця з реальними координатами.", access:"Core або вище", note:"Використовуйте щонайменше три відомі, добре рознесені й неколінеарні точки. Не вгадуйте контрольні точки.", steps:[["Імпортуйте зображення","Оберіть імпорт фото як карти та почніть ручну прив’язку."],["Поставте відомі точки","Торкніться того самого впізнаваного місця на зображенні та базовій карті. Розподіліть точки по зображенню."],["Перевірте перед використанням","Перевірте відповідність і відкрийте збережену карту. MAN у Бібліотеці підтверджує ручну прив’язку."]], tips:[["Чи можна прив’язати будь-яку історичну ілюстрацію?","Лише якщо можна визначити надійні реальні місця. Залишайте декоративні або вигадані карти без прив’язки до незалежної перевірки точок."]] },
  ur: { title:"تصویر کو دستی حوالہ دیں", summary:"معلوم مقامات کو حقیقی کوآرڈینیٹس سے ملا کر غیر حوالہ شدہ تصویر کو نقشہ بنائیں۔", access:"Core یا زیادہ", note:"کم از کم تین معلوم، اچھی طرح پھیلے اور غیر خطی نقاط استعمال کریں۔ کنٹرول پوائنٹس کا اندازہ نہ لگائیں۔", steps:[["تصویر درآمد کریں","تصویر کو نقشہ کے طور پر درآمد کریں منتخب کر کے دستی حوالہ شروع کریں۔"],["معلوم کنٹرول پوائنٹس رکھیں","تصویر اور بیس میپ پر ایک ہی قابل شناخت جگہ کو چھوئیں۔ نقاط کو پوری تصویر میں پھیلائیں۔"],["استعمال سے پہلے جانچیں","مطابقت کا جائزہ لیں اور محفوظ نقشہ کھولیں۔ لائبریری میں MAN دستی حوالہ کی تصدیق کرتا ہے۔"]], tips:[["کیا ہر تاریخی تصویر کو حوالہ دیا جا سکتا ہے؟","صرف تب جب قابل اعتماد حقیقی مقامات شناخت ہو سکیں۔ آرائشی یا خیالی نقشوں کو آزاد تصدیق تک غیر حوالہ شدہ رکھیں۔"]] }
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
        const translatedTopic = translatedTopics[sourceTopic.id] || (sourceTopic.id === "photo-georeference" ? PHOTO_REFERENCE_TRANSLATIONS[localeId] : null);
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
          ...(translatedTopic.motion?.caption ? { motion: translatedTopic.motion } : {}),
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
      const entry = entries[sourceTopic.id] || (sourceTopic.id === "photo-georeference" ? PHOTO_REFERENCE_TRANSLATIONS[localeId] : null);
      if (!entry || !entry.title || !entry.summary || !entry.steps?.length) {
        throw new Error(`[MapNero guides:${localeId}] missing ${platformId}/${sourceTopic.id}`);
      }
      return {
        id: sourceTopic.id,
        title: entry.title,
        summary: entry.summary,
        access: sourceTopic.id === "photo-georeference" ? entry.access : payload.access[accessKeys[sourceTopic.id]],
        ...(entry.note ? { note: entry.note } : {}),
        ...(entry.motion?.caption ? { motion: entry.motion } : {}),
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
