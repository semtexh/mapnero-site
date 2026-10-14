# Native template generation capture — 14 October 2026

Actual MapNero Promo Capture Stable, iOS 18.6, exported with Device Hub Screenshot.

- `template-ai-create.png`: untouched blank AI prompt.
- `template-ai-survey-preview.png`: selected built-in Field Survey Form and Generate Template; actual preview reports 20 items.
- Preview canceled. Library readback remained No Templates. No template saved, login performed, or external AI service used.
- Native source `TemplateAIGenerator.swift` describes an offline rule-based generator. This capture does not establish full equivalence between the installed build and current source.
- Native generation is connected: full prompt → form/checklist/style schema, JSON download, and generated form → existing editable practice builder. Outputs stay local. The captured 20-item image stays fixed; the current generated result appears separately.
- 1,435 Swift outputs were captured; 1,434 nonempty prompt results agree with the web generator. The empty prompt is deliberately rejected by the website input guard. Matching compares the schemas, ignoring random section UUIDs only. Empty or >4,000-character descriptions are rejected. Existing draft is preserved when a generated form exceeds the 50-field practice editor limit; full generated schema remains downloadable.
- `scripts/export-template-generator.py` uses a pinned native source hash and bounded Swift syntax translation; `scripts/verify-template-generator.py` compiles and executes actual Swift with native pure stored model fields. Only source-independent section identifiers are normalized.
- The native generator returns a General domain when no keywords match. Consequently its generic smart-builder branch is currently unreachable because General is a nonempty domain list. This behavior is preserved for parity; no native bug was silently fixed or generic custom-field understanding claimed.
- Generated checklist/style schemas are reviewed/downloaded; this unit does not add checklist execution, live style application or physical-device acceptance.
- Community Trails currently returns RPC HTTP 401 / permission denied while signed out. Authenticated acceptance needs an authorized test session; no production permissions changed.

Source SHA-256: f79e9ed6d2d992ebf5849d1879bd56830d41cce64716f36507a67cd506f5e3fd
