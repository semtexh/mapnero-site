# Save a field point

A 32-second portrait guide: choose a writable layer, add and name a point, add a field note, reopen its details, then use Show. Prepared for review, with no upload or publication in this task.

## Sources and boundaries

- Existing real iPhone demo screenshots: `offline_map.png` and `point_detail.png` from the owner's 2026-10-10 mobile capture folder.
- The Layers screen and icon come from the website's existing assets.
- The screenshots are cropped and reframed. No replacement app interface, new save/reopen recording, or fresh physical-device persistence test is presented.
- Instructions were checked against the current pins/layers guide, `PinCardView` save action, and `FeatureDetailCard` notes, Done and Show actions in the app source. The note is added after opening the saved point, not in the initial pin creation form.
- Demo data only. No team tracking, navigation accuracy, subscription entitlement or release-readiness claim.
- Local OmniVoice generated an American male English voice without reference audio or voice cloning. This is synthetic narration. The quiet ambient sound is synthesized by the renderer.

## Reproduce

Run `generate_voice.py OUTPUT_DIRECTORY` against the existing local OmniVoice service, then `render.py OUTPUT_DIRECTORY --site WEBSITE_CHECKOUT --capture-dir CAPTURE_DIRECTORY --ffmpeg FFMPEG_PATH`. The renderer needs Pillow, NumPy and an H.264/AAC-capable FFmpeg. Voice generation saves its event receipt and resumes that event rather than submitting a second job.

The cuts are timed for the saved 21.32-second narration take, slowed to 0.72 for readability. A different voice take requires a fresh timing review. `--frames-only` makes the storyboard without encoding.

## Verification

The output directory holds the cover, seven scene images, storyboard, original narration, MP4, encode/decode logs and verification receipts. The renderer fully decodes the finished MP4 and records its hash and the source hashes. Encoded-frame inspection and audio-level measurements are recorded separately during delivery. These checks do not establish a fresh app save or device acceptance.

Media outputs and local service receipts remain outside Git. Only these authoring sources are committed. Do not infer publication from a completed render.
