(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.MapNeroTemplateGenerator=factory();})(typeof window==='undefined'?globalThis:window,function(){
'use strict';
// Generated from the native offline rule generator; no network AI service.
const has=(text,words)=>words.some(w=>text.includes(w));
function field(data){return {required:false,...data};}
function sectionID(fields){return 'sec-'+fields.filter(f=>f.type==='section').length;}
const vocabulary=[["EOD", ["eod", "uxo", "bomb", "mine", "mayın", "patlayıcı", "ied", "munition", "cluster", "disposal", "imha", "explosive", "ordnance", "mermi", "havan", "artillery", "mortar", "grenade", "el bombası", "render safe", "rsp", "demolition", "yıkım"]], ["CBRN", ["cbrn", "chemical", "kimyasal", "nbc", "radiological", "biological", "radyolojik", "nükleer", "nuclear", "biyolojik", "hazmat", "toxic", "toksik", "nerve agent", "sinir gazı", "decontamination", "dekontaminasyon"]], ["Medical", ["medical", "tıbbi", "casualty", "yaralı", "first aid", "ilk yardım", "triage", "triaj", "medevac", "tahliye", "trauma", "travma", "wound", "yara", "vital", "tansiyon", "pulse", "nabız"]], ["Safety", ["safety", "güvenlik", "risk", "hazard", "tehlike", "emergency", "acil", "incident", "kaza", "near miss", "ramak kala", "ppe", "inspection", "denetim", "iş güvenliği", "occupational", "vehicle incident", "araç kazası", "araç güvenlik"]], ["Commerce", ["satış", "satan", "sat ", "mağaza", "dükkan", "shop", "store", "müşteri", "customer", "client", "sipariş", "order", "ürün", "product", "stok", "stock", "inventory", "envanter", "fatura", "invoice", "alım", "purchase", "satın", "dealer", "bayi", "fiyat", "price", "indirim", "discount", "iade", "return", "teklif", "quote", "sözleşme", "contract", "tedarik", "supplier"]], ["Navigation", ["navigation", "route", "waypoint", "güzergah", "rota", "yol", "patrol", "devriye", "salute", "salt", "contact report", "temas", "route card", "convoy", "konvoy", "checkpoint", "kontrol noktası"]], ["Survey", ["survey", "araştırma", "keşif", "reconnaissance", "recon", "nts", "technical survey", "area assessment", "land release", "victim", "mağdur"]], ["Nature", ["nature", "doğa", "forest", "orman", "ormancılık", "forestry", "tree", "ağaç", "fire", "yangın", "wildfire", "erosion", "erozyon", "landslide", "heyelan", "rockfall", "wildlife", "yaban hayatı", "fauna", "flora", "water source", "su kaynağı", "akarsu", "river", "spring", "ecology", "ekoloji"]], ["Infrastructure", ["infrastructure", "altyapı", "building", "bina", "yapı", "construction", "inşaat", "zemin", "ground", "soil investigation", "bridge", "köprü", "road", "yol", "pipeline", "boru hattı", "utility", "cable", "kablo", "damage assessment", "hasar", "earthquake", "deprem"]], ["Agriculture", ["agriculture", "tarım", "crop", "ürün", "harvest", "hasat", "farming", "çiftçi", "parcel", "parsel", "irrigation", "sulama", "canal", "kanal", "yield", "verim", "soil", "toprak", "pest", "zararlı"]], ["SAR", ["sar", "search and rescue", "arama kurtarma", "missing person", "kayıp", "sector search", "sektör", "rescue", "kurtarma", "lost person"]], ["Environment", ["environment", "çevre", "pollution", "kirlilik", "contamination", "waste", "atık", "dumping", "sample", "numune", "sampling", "environmental", "ecological", "ecosystem"]], ["Health", ["health", "sağlık", "epidemiology", "epidemiyoloji", "outbreak", "salgın", "disease", "hastalık", "wash", "sanitation", "sanitasyon", "hygiene", "temizlik", "water quality", "public health", "halk sağlığı"]], ["Heritage", ["heritage", "miras", "archaeology", "arkeoloji", "historic", "tarihi", "monument", "anıt", "cultural", "kültürel", "archaeological site", "höyük", "tumulus", "castle", "kale", "ruins", "harabe"]], ["Humanitarian", ["humanitarian", "insani", "idp", "refugee", "mülteci", "displaced", "mülteci", "camp", "kamp", "distribution", "dağıtım", "aid", "yardım", "needs assessment", "ihtiyaç", "nfi", "food security", "gıda güvenliği"]]];
const checklistWords=["checklist", "adım", "step", "prosedür", "procedure", "workflow", "kontrol listesi", "check list", "sequence", "sıra", "aşama", "süreç", "protokol", "protocol"];
const styleWords=["style", "stil", "renk", "color", "icon", "görünüm", "harita stili", "map style"];
function generate(prompt){if(typeof prompt!=='string'||!prompt.trim()||prompt.length>4000)throw Error('Describe a template using 1–4000 characters.');const lower=prompt.toLowerCase(), type=has(lower,checklistWords)?'checklist':has(lower,styleWords)?'style':'form';let domains=vocabulary.filter(([,words])=>has(lower,words)).map(([name])=>name);if(!domains.length)domains=['General'];const comprehensive=!has(lower,['quick','kısa','short','minimal','basit','simple']);const schema=type==='form'?buildFormSchema(lower,domains,comprehensive):type==='checklist'?buildChecklistSchema(lower,domains,comprehensive):buildStyleSchema(lower,domains);return {type,category:domains[0]||'General',schema};}
function buildFormSchema(lower,domains,comprehensive){const fields=[],addedIds=new Set();function add(f){if(!addedIds.has(f.id)){addedIds.add(f.id);fields.push(f);}}function section(label){fields.push(field({id:sectionID(fields),label,type:'section'}));}

        let wantsGPS = lower.includes("gps") || lower.includes("location") || lower.includes("konum") ||
                       lower.includes("coordinate") || lower.includes("koordinat") || !domains.includes("General")
        if (wantsGPS) {
            add(field({id: "location",label: "GPS Location",type: "gps",required: true}))
        }
        let wantsDate = lower.includes("date") || lower.includes("tarih") || lower.includes("time") ||
                        lower.includes("zaman") || !domains.includes("General")
        if (wantsDate) {
            add(field({id: "date",label: "Date / Time",type: "date",required: true}))
        }

        
        if (domains.includes("EOD")) {
            if (comprehensive) { section("ITEM IDENTIFICATION") }
            add(field({id: "grid_ref",label: "Grid Reference",type: "text",required: true}))
            add(field({id: "item_type",label: "Item Type",type: "dropdown",required: true,options: ["Bomb / Aircraft Bomb", "Artillery Shell", "Mortar", "Mine (AP)", "Mine (AT)",
                          "IED", "Cluster Munition", "Grenade", "Rocket", "MANPADS", "Landmine", "Unknown"]}))
            add(field({id: "quantity",label: "Quantity",type: "number",required: true,min: 1,max: 9999,defaultValue: "1"}))
            add(field({id: "condition",label: "Condition",type: "radio",options: ["Intact", "Damaged", "Partially Detonated", "Corroded", "Unknown"]}))
            add(field({id: "fuze",label: "Fuze Status",type: "radio",options: ["Intact", "Missing", "Damaged", "Armed", "Unknown"]}))
            if (comprehensive) {
                add(field({id: "orientation",label: "Orientation / Attitude",type: "dropdown",options: ["Upright", "Inverted", "On side", "Buried (partial)", "Buried (full)", "Unknown"]}))
                add(field({id: "depth",label: "Burial Depth (cm)",type: "number",min: 0,max: 500}))
                add(field({id: "neq",label: "Estimated NEQ (kg)",type: "number",min: 0,max: 99999}))
                section("HAZARD ASSESSMENT")
            }
            add(field({id: "safety_radius",label: "Safety Radius (m)",type: "number",min: 0,max: 5000}))
            if (comprehensive) {
                add(field({id: "hazard_level",label: "Hazard Level",type: "radio",options: ["Low", "Medium", "High", "Critical"]}))
                add(field({id: "secondary_haz",label: "Secondary Hazards",type: "multiline",placeholder: "Secondary devices, fuel, chemicals..."}))
                section("SITE CONDITIONS")
                add(field({id: "terrain",label: "Terrain Type",type: "dropdown",options: ["Urban", "Rural", "Desert", "Forest", "Mountain", "Agricultural"]}))
                add(field({id: "access",label: "Site Access",type: "radio",options: ["Easy", "Moderate", "Difficult", "Foot only"]}))
                add(field({id: "vegetation",label: "Vegetation",type: "radio",options: ["None", "Low grass", "Dense grass", "Shrub", "Forest"]}))
                add(field({id: "soil",label: "Soil Type",type: "dropdown",options: ["Sandy", "Clay", "Loam", "Rocky", "Waterlogged"]}))
            }
        }

        
        if (domains.includes("CBRN")) {
            if (comprehensive) { section("AGENT IDENTIFICATION") }
            add(field({id: "detection_method",label: "Detection Method",type: "dropdown",options: ["Electronic detector", "Colorimetric tube", "Paper detector", "Visual / olfactory", "Reported by casualty", "Other"]}))
            add(field({id: "agent_suspected",label: "Suspected Agent",type: "dropdown",options: ["Nerve — G-series", "Nerve — V-series", "Blister — H/HD", "Blister — L",
                          "Blood — AC/CK", "Choking — CG/CL", "Radiological", "Biological", "TIC", "Unknown"]}))
            add(field({id: "concentration",label: "Concentration",type: "radio",options: ["Trace", "Low", "Medium", "High", "IDLH"]}))
            if (comprehensive) {
                section("ENVIRONMENTAL")
                add(field({id: "wind_dir",label: "Wind Direction",type: "dropdown",options: ["N","NE","E","SE","S","SW","W","NW"]}))
                add(field({id: "wind_speed",label: "Wind Speed (km/h)",type: "number",min: 0,max: 200}))
                add(field({id: "temp",label: "Temperature (°C)",type: "number",min: -50,max: 60}))
                add(field({id: "humidity",label: "Humidity (%)",type: "number",min: 0,max: 100}))
                section("IMPACT")
            }
            add(field({id: "casualties",label: "Exposed Casualties",type: "number",min: 0,max: 9999,defaultValue: "0"}))
            add(field({id: "symptoms",label: "Observed Symptoms",type: "multiline",placeholder: "Miosis, salivation, skin burns, dyspnea..."}))
            if (comprehensive) {
                add(field({id: "hazard_zone",label: "Hazard Zone Radius (m)",type: "number",min: 0,max: 50000}))
                add(field({id: "samples_taken",label: "Samples Collected",type: "radio",options: ["Yes", "No"]}))
                add(field({id: "sample_ref",label: "Sample Reference",type: "text"}))
            }
        }

        
        if (domains.includes("Medical")) {
            if (comprehensive) { section("CASUALTY INFORMATION") }
            add(field({id: "triage",label: "Triage Category",type: "radio",required: true,options: ["T1 — Immediate", "T2 — Delayed", "T3 — Minor", "T4 — Expectant"]}))
            add(field({id: "mechanism",label: "Mechanism of Injury",type: "dropdown",options: ["GSW", "Blast / IED", "Blunt trauma", "Burns", "CBRN", "Medical (non-trauma)", "Other"]}))
            add(field({id: "injuries",label: "Injuries",type: "multiline",required: true,placeholder: "Location, type, severity..."}))
            if (comprehensive) {
                section("VITAL SIGNS")
                add(field({id: "gcs",label: "GCS (3–15)",type: "number",min: 3,max: 15}))
                add(field({id: "bp",label: "Blood Pressure",type: "text",placeholder: "e.g. 110/70"}))
                add(field({id: "pulse",label: "Pulse (bpm)",type: "number",min: 0,max: 300}))
                add(field({id: "spo2",label: "SpO2 (%)",type: "number",min: 0,max: 100}))
                add(field({id: "rr",label: "Resp. Rate (/min)",type: "number",min: 0,max: 60}))
                section("TREATMENT")
                add(field({id: "airway",label: "Airway",type: "radio",options: ["Patent", "Compromised — managed", "Obstructed"]}))
                add(field({id: "haemorrhage",label: "Haemorrhage Control",type: "radio",options: ["None required", "Pressure dressing", "Tourniquet applied", "Uncontrolled"]}))
                add(field({id: "treatments",label: "Treatments Given",type: "multiline",placeholder: "Airway adjunct, IV access, analgesics, antibiotics..."}))
                add(field({id: "allergies",label: "Known Allergies",type: "text"}))
            }
        }

        
        if (domains.includes("Safety")) {
            if (comprehensive) { section("INCIDENT DETAILS") }
            add(field({id: "incident_type",label: "Incident Type",type: "dropdown",required: true,options: ["Accident — injury", "Accident — property damage", "Near-miss", "Unsafe act", "Unsafe condition", "Security", "Other"]}))
            add(field({id: "severity",label: "Severity",type: "radio",required: true,options: ["Fatal", "Serious injury", "Minor injury", "Near-miss", "Property damage only"]}))
            add(field({id: "persons_involved",label: "Persons Involved",type: "number",min: 0,max: 999,defaultValue: "0"}))
            add(field({id: "description",label: "Incident Description",type: "multiline",required: true,placeholder: "What happened, how, sequence of events..."}))
            if (comprehensive) {
                add(field({id: "immediate_cause",label: "Immediate Cause",type: "multiline"}))
                add(field({id: "root_cause",label: "Root Cause",type: "multiline"}))
                section("ACTIONS")
                add(field({id: "immediate_action",label: "Immediate Action Taken",type: "multiline",required: true}))
                add(field({id: "corrective_action",label: "Corrective / Preventive Action",type: "multiline"}))
            }
        }

        
        if (domains.includes("Navigation")) {
            if (comprehensive) { section("PATROL / ROUTE INFO") }
            add(field({id: "task",label: "Task / Mission",type: "text",required: true}))
            add(field({id: "start_loc",label: "Start Point GPS",type: "gps"}))
            add(field({id: "end_loc",label: "End / Objective GPS",type: "gps"}))
            if (comprehensive) {
                add(field({id: "dist_km",label: "Distance (km)",type: "number",min: 0,max: 10000}))
                add(field({id: "duration_h",label: "Duration (hours)",type: "number",min: 0,max: 240}))
                add(field({id: "num_persons",label: "Personnel Count",type: "number",min: 1,max: 9999,defaultValue: "1"}))
                add(field({id: "vehicles",label: "Vehicles",type: "text",placeholder: "Type and count"}))
                section("OBSERVATIONS")
                add(field({id: "contacts",label: "Contacts / Incidents",type: "multiline"}))
                add(field({id: "threat_level",label: "Threat Level",type: "radio",options: ["Low", "Medium", "High", "Unknown"]}))
                add(field({id: "route_condition",label: "Route Condition",type: "radio",options: ["Good", "Damaged", "Blocked", "Unknown"]}))
                add(field({id: "intelligence",label: "Intelligence / Observations",type: "multiline"}))
            }
        }

        
        if (domains.includes("Survey")) {
            if (comprehensive) { section("SURVEY INFO") }
            add(field({id: "area_name",label: "Area Name / Grid",type: "text",required: true}))
            add(field({id: "area_ha",label: "Area Size (ha)",type: "number",min: 0,max: 1000000}))
            add(field({id: "terrain",label: "Terrain Type",type: "dropdown",options: ["Urban", "Rural", "Desert", "Forest", "Mountain", "Coastal", "Agricultural"]}))
            if (comprehensive) {
                add(field({id: "access",label: "Access",type: "radio",options: ["Easy", "Moderate", "Difficult", "Impassable"]}))
                add(field({id: "land_use",label: "Current Land Use",type: "dropdown",options: ["Agriculture", "Residential", "Commercial", "Forest / grazing", "Abandoned", "Military", "Other"]}))
                add(field({id: "population",label: "Estimated Population Affected",type: "number",min: 0,max: 9999999}))
                add(field({id: "hazard_type",label: "Hazard Type",type: "dropdown",options: ["Landmine — AP", "Landmine — AT", "UXO", "Cluster Munition", "IED", "Mixed", "Unknown"]}))
                add(field({id: "evidence",label: "Evidence Found",type: "multiline",placeholder: "Visual signs, casualties, metal signals..."}))
                add(field({id: "recommendation",label: "Recommended Action",type: "dropdown",options: ["Technical Survey", "Clearance", "Marking only", "No further action", "Further NTS"]}))
                add(field({id: "priority",label: "Priority",type: "radio",options: ["High", "Medium", "Low"]}))
            }
        }

        
        if (domains.includes("Commerce")) {
            if (comprehensive) { section("CUSTOMER / CLIENT") }
            add(field({id: "customer_name",label: "Customer Name",type: "text",required: true}))
            add(field({id: "customer_phone",label: "Phone",type: "text"}))
            add(field({id: "customer_email",label: "E-mail",type: "text"}))
            if (comprehensive) {
                add(field({id: "customer_address",label: "Address",type: "multiline"}))
                add(field({id: "id_number",label: "ID / Tax Number",type: "text"}))
                section("PRODUCT / SERVICE")
            }
            add(field({id: "product_name",label: "Product / Service",type: "text",required: true}))
            add(field({id: "product_code",label: "Product Code / SKU",type: "text"}))
            add(field({id: "quantity",label: "Quantity",type: "number",required: true,min: 1,max: 99999,defaultValue: "1"}))
            add(field({id: "unit_price",label: "Unit Price",type: "number",min: 0,max: 99999999}))
            if (comprehensive) {
                add(field({id: "discount",label: "Discount (%)",type: "number",min: 0,max: 100}))
                add(field({id: "total",label: "Total Amount",type: "number",min: 0,max: 99999999}))
                section("TRANSACTION")
                add(field({id: "payment_method",label: "Payment Method",type: "dropdown",options: ["Cash", "Credit Card", "Bank Transfer", "Cheque", "Other"]}))
                add(field({id: "transaction_status",label: "Status",type: "dropdown",options: ["Pending", "Completed", "Cancelled", "Refunded"]}))
                add(field({id: "delivery_date",label: "Delivery Date",type: "date"}))
                add(field({id: "warranty",label: "Warranty Period",type: "text",placeholder: "e.g. 2 years, 10.000 km"}))
            }
        }

        
        if (!domains.includes("EOD") && !domains.includes("CBRN")) {
            if (lower.includes("terrain") || lower.includes("arazi")) {
                add(field({id: "terrain",label: "Terrain Type",type: "dropdown",options: ["Urban", "Rural", "Desert", "Forest", "Mountain", "Coastal", "Agricultural"]}))
            }
        }

        
        let hasDomain = domains.length!==0
        if (!hasDomain) {
            let genericFields = buildGenericFields(lower, comprehensive)
            for (const f of genericFields) { add(f) }
        }

        
        let isFieldWork = hasDomain
        if (comprehensive && isFieldWork) { section("ATTACHMENTS & METADATA") }
        add(field({id: "photos",label: "Photos",type: "camera",placeholder: "Attach photos"}))
        add(field({id: "notes",label: "Notes",type: "multiline",placeholder: "Additional observations"}))
        if (comprehensive && isFieldWork) {
            add(field({id: "weather",label: "Weather Conditions",type: "text",placeholder: "e.g. Sunny / Cloudy / Rainy, 18°C, low wind"}))
            add(field({id: "team_members",label: "Team Members",type: "text",placeholder: "Names of personnel on site"}))
            add(field({id: "status",label: "Status",type: "radio",options: ["Open", "In Progress", "Closed", "Escalated"]}))
            add(field({id: "priority",label: "Priority",type: "radio",options: ["Low", "Medium", "High", "Urgent"]}))
        }
        add(field({id: "reported_by",label: "Reported By",type: "text",required: true,placeholder: "Your full name"}))

        
        if (fields.length < 3) {
            return {fields: [
                field({id: "date",label: "Date",type: "date",required: true}),
                field({id: "title",label: "Title",type: "text",required: true}),
                field({id: "description",label: "Description",type: "multiline"}),
                field({id: "photos",label: "Photos",type: "camera"}),
                field({id: "notes",label: "Notes",type: "multiline"}),
                field({id: "reported_by",label: "Reported By",type: "text",required: true})
            ]}
        }

        return {fields: fields}
    
}
function buildGenericFields(lower,comprehensive){const fields=[],ids=new Set();function f(id,label,type,options={}){if(!ids.has(id)){ids.add(id);fields.push(field({id,label,type,...options}));}}function sec(label){fields.push(field({id:sectionID(fields),label,type:'section'}));}

        let isApplication = has(lower, ["başvuru", "application", "kayıt", "registration", "üyelik", "membership", "enrollment"])
        let isAppointment = has(lower, ["randevu", "appointment", "rezervasyon", "booking", "rezerve"])
        let isComplaint = has(lower, ["şikayet", "complaint", "sorun", "problem", "hata", "issue", "geri bildirim", "feedback"])
        let isInspection = has(lower, ["denetim", "inspection", "kontrol", "audit", "muayene", "examination"])
        let isInventory = has(lower, ["envanter", "inventory", "stok", "stock", "depo", "warehouse", "sayım"])
        let isOrder = has(lower, ["sipariş", "order", "talep", "request", "satın alma", "purchase"])
        let isRental = has(lower, ["kiralama", "rental", "kira", "rent", "lease", "kirala"])
        let isReport = has(lower, ["rapor", "report", "tutanak", "minute", "zabıt", "log"])
        let isSurvey = has(lower, ["anket", "questionnaire", "survey", "memnuniyet", "satisfaction", "değerlendirme", "evaluation"])
        let isIncident = has(lower, ["olay", "incident", "accident", "vaka", "case", "event"])
        let isEmployee = has(lower, ["personel", "employee", "çalışan", "staff", "işe alım", "recruitment", "özgeçmiş", "cv"])
        let isStudent = has(lower, ["öğrenci", "student", "okul", "school", "öğrenci kayıt", "öğrenci bilgi"])
        let isPatient = has(lower, ["hasta", "patient", "klinik", "clinic", "doktor", "doctor", "diş", "dental", "sağlık"])
        let isEvent = has(lower, ["etkinlik", "event", "toplantı", "meeting", "konferans", "conference", "seminer"])
        let isVisitor = has(lower, ["ziyaretçi", "visitor", "misafir", "guest", "giriş", "entry", "karşılama"])

        
        let subjectVehicle = has(lower, ["araç", "vehicle", "araba", "car", "otomobil", "kamyon", "truck", "motosiklet", "motorcycle"])
        let subjectProperty = has(lower, ["mülk", "property", "bina", "building", "daire", "apartment", "ev", "house", "ofis", "office"])
        let subjectEquipment = has(lower, ["ekipman", "equipment", "cihaz", "device", "makine", "machine", "alet", "tool"])
        let subjectProduct = has(lower, ["ürün", "product", "mal", "goods", "eşya", "item", "materyal", "material"])
        let subjectAnimal = has(lower, ["hayvan", "animal", "köpek", "dog", "kedi", "cat", "veteriner", "vet"])

        
        let needsPerson = isApplication || isAppointment || isComplaint || isEmployee ||
                          isStudent || isPatient || isVisitor || isOrder || isRental
        if (needsPerson || comprehensive) {
            if (comprehensive && (isEmployee || isStudent || isPatient)) { sec("PERSONAL INFO") }
            f("full_name","Full Name","text", {required: true})
            if (isEmployee || isStudent || isApplication) {
                f("dob","Date of Birth","date", {})
                f("gender","Gender","radio", {options: ["Male", "Female", "Prefer not to say"]})
                f("national_id","ID / TC Number","text", {})
            }
            f("phone","Phone","text", {required: needsPerson})
            f("email","E-mail","text", {})
            if (comprehensive || isApplication || isEmployee) {
                f("address","Address","multiline", {})
            }
        }

        
        if (subjectVehicle) {
            if (comprehensive) { sec("VEHICLE INFO") }
            f("vehicle_make","Make / Brand","text", {required: true})
            f("vehicle_model","Model","text", {required: true})
            f("vehicle_year","Year","number", {min: 1900,max: 2100})
            f("vehicle_plate","Plate Number","text", {required: true})
            f("vehicle_color","Color","text", {})
            if (comprehensive) {
                f("vehicle_vin","Chassis / VIN","text", {})
                f("vehicle_km","Mileage (km)","number", {min: 0,max: 9999999})
                f("vehicle_fuel","Fuel Type","dropdown", {options: ["Petrol", "Diesel", "LPG", "Electric", "Hybrid"]})
                f("vehicle_condition","Condition","radio", {options: ["Excellent", "Good", "Fair", "Poor"]})
            }
        }

        
        if (subjectProperty) {
            if (comprehensive) { sec("PROPERTY INFO") }
            f("property_address","Property Address","multiline", {required: true})
            f("property_type","Property Type","dropdown", {options: ["Apartment", "House", "Office", "Shop", "Warehouse", "Land", "Other"]})
            if (comprehensive) {
                f("property_area","Area (m²)","number", {min: 0,max: 999999})
                f("property_floor","Floor","number", {min: -5,max: 200})
                f("property_owner","Owner Name","text", {})
            }
        }

        
        if (subjectEquipment) {
            if (comprehensive) { sec("EQUIPMENT INFO") }
            f("eq_name","Equipment Name","text", {required: true})
            f("eq_brand","Brand / Manufacturer","text", {})
            f("eq_serial","Serial Number","text", {})
            f("eq_location","Location","text", {})
            if (comprehensive) {
                f("eq_condition","Condition","radio", {options: ["Working", "Needs Repair", "Out of Service"]})
                f("eq_last_service","Last Service Date","date", {})
            }
        }

        
        if (subjectAnimal) {
            if (comprehensive) { sec("ANIMAL INFO") }
            f("animal_name","Animal Name","text", {})
            f("animal_species","Species / Breed","text", {required: true})
            f("animal_age","Age","text", {})
            f("animal_weight","Weight (kg)","number", {min: 0,max: 2000})
            f("animal_owner","Owner Name","text", {required: true})
            if (comprehensive) {
                f("animal_chip","Microchip Number","text", {})
                f("animal_vaccine","Vaccination Status","radio", {options: ["Up to date", "Partial", "None", "Unknown"]})
            }
        }

        
        if (isAppointment) {
            if (comprehensive) { sec("APPOINTMENT") }
            f("appt_date","Appointment Date & Time","date", {required: true})
            f("appt_type","Service / Purpose","text", {required: true})
            f("appt_duration","Duration (min)","number", {min: 5,max: 480})
            f("appt_notes","Special Requests","multiline", {})
        }

        if (isComplaint) {
            if (comprehensive) { sec("COMPLAINT DETAILS") }
            f("complaint_category","Category","dropdown", {options: ["Product", "Service", "Staff", "Billing", "Delay", "Other"]})
            f("complaint_date","Date of Incident","date", {required: true})
            f("complaint_desc","Description","multiline", {required: true,placeholder: "Describe the issue in detail..."})
            f("complaint_priority","Priority","radio", {options: ["Low", "Medium", "High", "Urgent"]})
            if (comprehensive) {
                f("complaint_resolution","Resolution Requested","multiline", {})
                f("complaint_status","Status","dropdown", {options: ["Open", "Under Review", "Resolved", "Closed"]})
            }
        }

        if (isInspection) {
            if (comprehensive) { sec("INSPECTION") }
            f("inspector","Inspector Name","text", {required: true})
            f("inspection_date","Inspection Date","date", {required: true})
            f("inspection_result","Overall Result","radio", {options: ["Pass", "Fail", "Conditional Pass"]})
            f("findings","Findings","multiline", {required: true})
            if (comprehensive) {
                f("score","Score / Rating","slider", {min: 0,max: 100})
                f("corrective_action","Corrective Actions Required","multiline", {})
                f("next_inspection","Next Inspection Date","date", {})
            }
        }

        if (isInventory) {
            if (comprehensive) { sec("ITEM") }
            f("item_name","Item Name","text", {required: true})
            f("item_code","Item Code / SKU","text", {})
            f("item_qty","Quantity","number", {required: true,min: 0,max: 9999999})
            f("item_unit","Unit","dropdown", {options: ["Piece", "kg", "Litre", "m", "m²", "Box", "Set"]})
            f("item_location","Storage Location","text", {})
            if (comprehensive) {
                f("item_condition","Condition","radio", {options: ["New", "Good", "Damaged", "Expired"]})
                f("item_min_stock","Min. Stock Level","number", {min: 0,max: 9999999})
                f("item_supplier","Supplier","text", {})
            }
        }

        if (isOrder) {
            if (comprehensive) { sec("ORDER DETAILS") }
            f("order_item","Item / Service","text", {required: true})
            f("order_qty","Quantity","number", {required: true,min: 1,max: 99999})
            f("order_urgency","Urgency","radio", {options: ["Normal", "Urgent", "Critical"]})
            f("order_delivery","Required By","date", {})
            f("order_approval","Approved By","text", {})
            if (comprehensive) {
                f("order_budget","Budget (₺)","number", {min: 0,max: 999999999})
                f("order_status","Status","dropdown", {options: ["Pending", "Approved", "Ordered", "Delivered", "Cancelled"]})
            }
        }

        if (isRental) {
            if (comprehensive) { sec("RENTAL TERMS") }
            f("rental_start","Start Date","date", {required: true})
            f("rental_end","End Date","date", {required: true})
            f("rental_price","Daily / Monthly Price","number", {min: 0,max: 9999999})
            f("rental_deposit","Deposit Amount","number", {min: 0,max: 9999999})
            if (comprehensive) {
                f("rental_conditions","Condition at Handover","multiline", {})
                f("rental_status","Status","dropdown", {options: ["Active", "Returned", "Overdue", "Cancelled"]})
            }
        }

        if (isReport) {
            if (comprehensive) { sec("REPORT") }
            f("report_title","Report Title","text", {required: true})
            f("report_summary","Summary","multiline", {required: true})
            if (comprehensive) {
                f("report_details","Detailed Findings","multiline", {})
                f("report_recommendations","Recommendations","multiline", {})
                f("report_status","Status","dropdown", {options: ["Draft", "Final", "Approved"]})
            }
        }

        if (isSurvey) {
            if (comprehensive) { sec("SURVEY") }
            f("survey_q1","Overall Satisfaction","radio", {options: ["1 — Very Poor", "2 — Poor", "3 — Average", "4 — Good", "5 — Excellent"]})
            if (comprehensive) {
                f("survey_q2","Would you recommend us?","radio", {options: ["Yes", "No", "Maybe"]})
                f("survey_q3","What did we do well?","multiline", {})
                f("survey_q4","What can we improve?","multiline", {})
            }
        }

        if (isEmployee) {
            if (comprehensive) { sec("EMPLOYMENT") }
            f("emp_department","Department","text", {required: true})
            f("emp_position","Position / Title","text", {required: true})
            f("emp_start","Start Date","date", {})
            if (comprehensive) {
                f("emp_type","Employment Type","dropdown", {options: ["Full-time", "Part-time", "Contract", "Intern"]})
                f("emp_salary","Salary (₺)","number", {min: 0,max: 9999999})
                f("emp_education","Education Level","dropdown", {options: ["Primary", "Secondary", "Bachelor's", "Master's", "PhD"]})
                f("emp_skills","Skills / Qualifications","multiline", {})
                f("emp_emergency","Emergency Contact","text", {})
            }
        }

        if (isStudent) {
            if (comprehensive) { sec("STUDENT INFO") }
            f("student_no","Student Number","text", {})
            f("student_class","Class / Grade","text", {required: true})
            f("student_school","School Name","text", {required: true})
            if (comprehensive) {
                f("student_parent","Parent / Guardian Name","text", {})
                f("student_parent_phone","Parent Phone","text", {})
                f("student_allergy","Allergies / Medical Notes","multiline", {})
            }
        }

        if (isPatient) {
            if (comprehensive) { sec("PATIENT INFO") }
            f("patient_complaint","Chief Complaint","multiline", {required: true})
            f("patient_history","Medical History","multiline", {})
            if (comprehensive) {
                f("patient_allergies","Allergies","text", {})
                f("patient_medications","Current Medications","multiline", {})
                f("patient_bp","Blood Pressure","text", {})
                f("patient_weight","Weight (kg)","number", {min: 0,max: 500})
                f("patient_diagnosis","Diagnosis","multiline", {})
                f("patient_treatment","Treatment Plan","multiline", {})
            }
        }

        if (isEvent) {
            if (comprehensive) { sec("EVENT DETAILS") }
            f("event_name","Event Name","text", {required: true})
            f("event_date","Date & Time","date", {required: true})
            f("event_location","Location / Venue","text", {})
            f("event_capacity","Expected Attendees","number", {min: 1,max: 999999})
            if (comprehensive) {
                f("event_organizer","Organizer","text", {})
                f("event_budget","Budget (₺)","number", {min: 0,max: 9999999999})
                f("event_requirements","Special Requirements","multiline", {})
            }
        }

        if (isVisitor) {
            if (comprehensive) { sec("VISITOR") }
            f("visitor_name","Visitor Name","text", {required: true})
            f("visitor_id","ID Number","text", {})
            f("visitor_company","Company / Organization","text", {})
            f("visitor_host","Host / Person to Visit","text", {required: true})
            f("visitor_purpose","Purpose of Visit","text", {required: true})
            f("visitor_in","Time In","date", {required: true})
            if (comprehensive) {
                f("visitor_out","Time Out","date", {})
                f("visitor_badge","Badge Number","text", {})
                f("visitor_vehicle_plate","Vehicle Plate","text", {})
            }
        }

        if (isIncident) {
            if (comprehensive) { sec("INCIDENT") }
            f("incident_date","Incident Date & Time","date", {required: true})
            f("incident_location","Location","text", {required: true})
            f("incident_type","Incident Type","dropdown", {options: ["Accident", "Near Miss", "Property Damage", "Theft", "Fire", "Medical", "Other"]})
            f("incident_desc","Description","multiline", {required: true})
            if (comprehensive) {
                f("incident_injured","Persons Involved / Injured","text", {})
                f("incident_damage","Damage Estimate (₺)","number", {min: 0,max: 9999999999})
                f("incident_witness","Witnesses","text", {})
                f("incident_action","Immediate Action Taken","multiline", {})
                f("incident_root_cause","Root Cause","multiline", {})
                f("incident_status","Status","dropdown", {options: ["Open", "Under Review", "Closed"]})
            }
        }

        
        if (subjectProduct && !isInventory && !isOrder) {
            f("product_name","Product Name","text", {required: true})
            f("product_code","Product Code","text", {})
            f("product_qty","Quantity","number", {min: 0,max: 9999999})
            if (comprehensive) {
                f("product_condition","Condition","radio", {options: ["New", "Used", "Refurbished"]})
                f("product_price","Price (₺)","number", {min: 0,max: 9999999999})
            }
        }

        
        if (has(lower, ["imza", "signature", "onay", "approval", "e-imza"])) {
            f("signature","Signature / Approval","checkbox", {})
        }

        return fields
    
}
function buildChecklistSchema(lower,domains,comprehensive){const steps=[];function step(title,description,options={}){steps.push({id:'s'+(steps.length+1),title,description,requiresSignoff:options.signoff??true,warningLevel:options.level??'medium'});}
        if (domains.includes("EOD")) {
            step("Establish Safety Cordon","Set cordon at minimum safety distance (300m default, 500m unknown/bore-safe). Mark with tape and signs.", {level: "critical"})
            step("Evacuate Non-Essential Personnel","All civilian and non-EOD personnel beyond cordon. Confirm headcount.", {level: "high"})
            step("Communications Checked","Radio contact with HQ confirmed. Emergency comms plan briefed to team.", {level: "high"})
            step("Remote Identification","Identify item type, calibre, fuze, and condition from maximum safe distance using binoculars.", {level: "critical"})
            step("Safe Approach Route Cleared","Approach route swept and marked. One EOD operator at a time on approach.", {level: "critical"})
            step("Close-Range Assessment","Confirm fuze condition, orientation, stability, and any secondary devices.", {level: "critical"})
            step("RSP Selected","Appropriate render safe procedure chosen per technical manual (BIP / Disrupt / Remove).", {level: "critical"})
            step("RSP Applied","RSP executed as planned. All actions documented in real time.", {level: "critical"})
            if (comprehensive) {
                step("Post-RSP Verification","Confirm item is rendered safe. No residual explosive hazard.", {level: "high"})
                step("Secondary Area Search","50m radius search for fragments, secondary devices, and additional items.", {level: "high"})
                step("Site Documentation","GPS logged, photographs taken, item details recorded on field form.", {signoff: false,level: "medium"})
                step("Debrief Team","Actions reviewed. Near-misses and lessons noted.", {signoff: false,level: "low"})
            } else {
                step("Post-RSP Search","Confirm safe, secondary search 50m radius.", {level: "high"})
            }
            step("All-Clear Declared","All-clear confirmed by EOD team leader. Cordon lifted. Incident report filed.", {level: "medium"})
        }

        if (domains.includes("Safety")) {
            step("Weather and Conditions Assessed","Current and forecast conditions checked. Go/No-Go decision made.", {signoff: false,level: "medium"})
            step("Task Area Briefed","All team members briefed on area, boundaries, and no-go zones.", {level: "medium"})
            step("Hazards Communicated","Known UXO, IED, structural, and environmental hazards identified and briefed.", {level: "high"})
            step("Emergency Plan Reviewed","Casualty evacuation, rally points, and emergency comms confirmed.", {level: "high"})
            step("Communications Checked","Radio tested. HQ/ops room contact confirmed.", {level: "high"})
            step("Medical Kit Inspected","First aid kit complete and accessible. Medic / first aider identified.", {level: "high"})
            if (comprehensive) {
                step("PPE Issued and Checked","Appropriate PPE issued, fitted correctly, and inspected.", {level: "medium"})
                step("Equipment Serviceable","All specialist equipment tested and serviceable.", {level: "medium"})
                step("Buddy System Confirmed","Team pairs assigned. No solo working in hazardous areas.", {signoff: false,level: "medium"})
            }
            step("Go / No-Go Decision","Team leader authorises field operation. All items satisfied.", {level: "medium"})
        }

        if (domains.includes("CBRN")) {
            step("CBRN Alarm Confirmed","Initial detection confirmed by second means before committing resources.", {level: "critical"})
            step("Upwind Position Established","All personnel upwind and uphill from suspected release point.", {level: "critical"})
            step("PPE Level Upgraded","Appropriate CBRN PPE donned before any approach (MOPP 4 / SCBA as required).", {level: "critical"})
            step("Exclusion Zone Marked","Hot, warm, and cold zones established and marked.", {level: "high"})
            step("Casualties Extracted","Affected personnel extracted by PPE-equipped responders only.", {level: "critical"})
            step("Emergency Decontamination","Gross decon (clothing removal + water flush) applied to all casualties.", {level: "high"})
            if (comprehensive) {
                step("Technical Decontamination","Thorough skin wash / RSDL wipes. Face, neck, and hands prioritised.", {level: "high"})
                step("Medical Evaluation","All casualties assessed post-decon. Antidotes administered if indicated.", {level: "high"})
                step("Equipment Decontaminated","All equipment and vehicles decontaminated or bagged and tagged.", {level: "medium"})
                step("Samples Collected","Environmental samples collected per SOP with chain of custody maintained.", {signoff: false,level: "medium"})
            }
            step("Incident Report Submitted","Full CBRN incident report submitted to HQ. Decon record completed.", {level: "medium"})
        }

        if (domains.includes("Medical")) {
            step("Scene Safety Confirmed","Area confirmed safe for medical personnel to approach.", {level: "critical"})
            step("Casualties Counted and Triaged","All casualties found, counted, and assigned triage category.", {level: "critical"})
            step("Life-Threatening Haemorrhage Controlled","Tourniquets or pressure dressings applied to all major bleeds.", {level: "critical"})
            step("Airway Managed","Airway opened / adjunct inserted / c-spine protected as appropriate.", {level: "critical"})
            step("Breathing Assessed","Chest injuries treated (needle decompression / chest seal if required).", {level: "high"})
            if (comprehensive) {
                step("IV Access Established","IV line placed for T1 and T2 casualties as required.", {level: "high"})
                step("Analgesics / Antibiotics Given","Morphine / ketamine and antibiotics administered per protocol.", {level: "high"})
                step("Hypothermia Prevention","Casualties covered / insulated. Warm IV fluids if available.", {signoff: false,level: "medium"})
            }
            step("MEDEVAC Requested","9-Line MEDEVAC transmitted. LZ selected and marked.", {level: "high"})
            step("Handover to Higher Medical","All casualties, treatments, and vital signs documented and handed over.", {level: "medium"})
        }

        if (domains.includes("Navigation")) {
            step("Orders Received and Understood","Mission orders confirmed. All team members briefed on task and ROE.", {level: "medium"})
            step("Route Planned","Primary and alternate routes planned. Waypoints loaded in MapNero.", {signoff: false,level: "low"})
            step("Equipment Checked","Comms, navigation, weapons, and supplies verified before departure.", {level: "medium"})
            step("Departure Point Logged","GPS start point logged and HQ notified of departure.", {signoff: false,level: "low"})
            if (comprehensive) {
                step("En Route Check-Ins","Regular check-in schedule with HQ maintained throughout movement.", {signoff: false,level: "medium"})
                step("Chokepoints Crossed Safely","All known chokepoints (bridges, narrow roads) crossed with appropriate precautions.", {level: "medium"})
            }
            step("Objective / Destination Reached","Arrival confirmed. HQ notified. GPS track saved.", {signoff: false,level: "low"})
            step("Debrief Completed","Patrol debrief conducted. Observations and incidents reported.", {level: "low"})
        }

        if (domains.includes("Survey") && !domains.includes("EOD")) {
            step("Pre-Survey Brief","Team briefed on area, objectives, hazards, and SOP.", {level: "medium"})
            step("Equipment Checked","Detectors, GPS, comms, and marking materials verified.", {level: "medium"})
            step("Survey Grid / Pattern Established","Survey lane spacing and systematic pattern confirmed.", {signoff: false,level: "low"})
            step("Area Surveyed","Systematic coverage of all assigned lanes completed.", {level: "medium"})
            if (comprehensive) {
                step("All Findings Recorded","Each hazardous item found photographed, GPS-logged, and marked.", {level: "high"})
                step("Boundary Confirmed","Surveyed area boundary closed and GPS track saved in MapNero.", {signoff: false,level: "low"})
                step("Production Targets Met","Daily production targets checked against task plan.", {signoff: false,level: "low"})
            }
            step("Daily Report Submitted","Field report completed and submitted to task manager.", {level: "low"})
        }

        
        if (steps.length===0) {
            step("Preparation","Ensure all prerequisites, equipment, and personnel are ready.", {signoff: false,level: "low"})
            step("Brief Team","Brief all team members on task, hazards, and emergency plan.", {level: "medium"})
            step("Execute Task","Carry out the primary task per SOP.", {level: "medium"})
            step("Verify Results","Confirm task objectives have been met.", {level: "medium"})
            step("Document Findings","Record all observations, actions, and results.", {signoff: false,level: "low"})
            step("Submit Report","Report submitted to supervisor / HQ.", {level: "low"})
            if (comprehensive) {
                step("Debrief Team","Lessons learned and recommendations discussed.", {signoff: false,level: "low"})
            }
        }

        return {steps: steps}
    
}
function buildStyleSchema(lower,domains){
        let rules = []
        if (domains.includes("EOD")) {
            rules = [
                {featureType: "point",matchKey: "type",matchValue: "IED",color: "#FF3B30",iconName: "exclamationmark.triangle.fill"},
                {featureType: "point",matchKey: "type",matchValue: "Mine",color: "#FF9500",iconName: "exclamationmark.circle.fill"},
                {featureType: "point",matchKey: "type",matchValue: "UXO",color: "#FFCC00",iconName: "bolt.fill"},
                {featureType: "polygon",color: "#FF3B3040",lineWidth: 2},
                {featureType: "point",color: "#FFCC00"}
            ]
        } else if (domains.includes("CBRN")) {
            rules = [
                {featureType: "polygon",matchKey: "zone",matchValue: "hot",color: "#FF3B3060",lineWidth: 3},
                {featureType: "polygon",matchKey: "zone",matchValue: "warm",color: "#FF950040",lineWidth: 2},
                {featureType: "polygon",matchKey: "zone",matchValue: "cold",color: "#30D15840",lineWidth: 1},
                {featureType: "point",color: "#FF3B30"}
            ]
        } else {
            rules = [
                {featureType: "track",color: "#00BFFF",lineWidth: 3},
                {featureType: "polygon",color: "#34C75940",lineWidth: 2},
                {featureType: "point",color: "#D4A943"}
            ]
        }
        return {styleRules: rules}
    
}
return {generate,vocabulary:vocabulary.map(([name,words])=>[name,[...words]])};
});
