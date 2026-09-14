# Homepage QA — 18 September 2026

- Next.js 16.3.4 production static build passed, including TypeScript checking.
- Browser visual review: desktop 1363 × 936, phone iframe 390 × 844 and tablet iframe 768 × 900 in Chrome.
- Corrected desktop/tablet ring positioning and the phone hero crop after screenshots.
- Reviewed hero, collection, craft chapters and brand sections. Ring imagery loads; visible videos reach ready state 4.
- Confirmed desktop and phone have no document horizontal overflow.
- Tested hero-to-collection navigation, mobile menu links, ring detail dialog, design-to-film action and next-film control.
- Confirmed craft navigation advances to the second and third chapters, and video currentTime changes with scrolling.
- Confirmed motion-off removes all page videos and leaves content and poster imagery usable.
- Dialogs use the installed Radix-based accessible primitive with focus handling and close controls.
- No application errors observed. Browser-extension telemetry errors were unrelated to the site.
- All 15 media sources are stored locally in the project. No new generations were required.

Limitations: reviewed in Chrome using desktop and iframe-sized responsive viewports, not on physical iOS/Android devices. This is a presentation homepage with design inspiration, not connected inventory, checkout or appointment submission.
