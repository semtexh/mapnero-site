# Check the active layer

An 18-second English guide for review. Uses the existing MapNero icon, unchanged iPhone Layers and Add Pin screenshot crops, and local OmniVoice American male narration. The voice is slowed to 0.85 for readability.

The Layers image shows linked layers. It illustrates checking visibility and editing availability; it does not demonstrate changing the active destination, resolving a template warning, or saving a new point. No new device test or app fix is claimed. Instructions come from the Apple pins/layers guide in assets/guides-data.js. Controls differ across platforms and versions.

Run generate_voice.py OUTPUT_DIRECTORY against the installed local service. It preserves the voice event receipt and resumes that event if rerun. Then run render.py OUTPUT_DIRECTORY --site WEBSITE_CHECKOUT --captures EXISTING_DEMO_CAPTURE_DIRECTORY --ffmpeg WORKING_FFMPEG_PATH. Use --frames-only to review the composition before encoding. Pillow and NumPy are required. No new packages are installed by these scripts.

The renderer fully decodes the MP4 and writes source/output hashes and timing evidence. The output folder also contains an extracted encoded frame and audio-level check. These checks establish a rendered file, not publication, exact speech transcription, or device acceptance. Media and local API receipts stay outside Git.

Prepared for review only. No new social upload or public post in this unit. Separate authorization is required for the next YouTube upload/terms step.
