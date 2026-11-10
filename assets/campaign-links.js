/* Keep a known public campaign on the path to the app stores. No storage or telemetry. */
(function () {
  'use strict';
  const campaigns = Object.freeze({
    youtube_profile: 'youtube',
    instagram_profile: 'instagram',
    pinterest_profile: 'pinterest',
    x_profile: 'x',
    linkedin_profile: 'linkedin',
    facebook_profile: 'facebook',
    reddit_profile: 'reddit',
    yt_practice_20261105: 'youtube',
    practice_hook_a: 'youtube',
    practice_hook_b: 'youtube',
    practice_hook_c: 'youtube',
    pt_geopdf_x: 'x'
  });
  const routes = new Set(["/", "/buffer-map.html", "/geofence-alerts-es.html", "/geofence-alerts-pt-br.html", "/geofence-alerts.html", "/geopdf-maps-es.html", "/geopdf-maps-fr.html", "/geopdf-maps-id.html", "/geopdf-maps-pt-br.html", "/geopdf-maps.html", "/geotiff-maps-es.html", "/geotiff-maps-id.html", "/geotiff-maps-pt-br.html", "/geotiff-maps.html", "/guides.html", "/route-builder.html", "/route-builder-id.html", "/route-builder-es.html", "/route-builder-pt-br.html", "/save-field-point-id.html", "/index.html", "/measure-map-distance.html", "/offline-gps-tracks-es.html", "/offline-gps-tracks-id.html", "/offline-gps-tracks-pt-br.html", "/offline-gps-tracks.html", "/qgis-mobile-fieldwork-id.html", "/qgis-mobile-fieldwork-pt-br.html", "/qgis-mobile-fieldwork.html", "/save-field-point-es.html", "/save-field-point-pt-br.html", "/save-field-point.html"]);
  function rewriteHref(href, pageUrl) {
    let page, target;
    try { page = new URL(pageUrl); target = new URL(href, page); }
    catch (_) { return href; }
    const campaign = page.searchParams.get('mn_campaign');
    if (!Object.prototype.hasOwnProperty.call(campaigns, campaign) ||
        page.origin !== 'https://www.mapnero.com' ||
        !routes.has(page.pathname) || !['https:', 'http:'].includes(target.protocol)) return href;
    if (target.origin === 'https://apps.apple.com' &&
        /^\/app\/(?:apple-store\/)?id6758651027$/.test(target.pathname)) {
      target.searchParams.set('ct', campaign);
      return target.href;
    }
    if (target.origin === 'https://play.google.com' &&
        target.pathname === '/store/apps/details' &&
        target.searchParams.get('id') === 'com.thenerolabs.mapnero') {
      target.searchParams.set('utm_source', campaigns[campaign]);
      target.searchParams.set('utm_campaign', campaign);
      return target.href;
    }
    if (href.startsWith('#')) return href;
    if (target.origin === page.origin && routes.has(target.pathname)) {
      target.searchParams.set('mn_campaign', campaign);
      return target.href;
    }
    return href;
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { rewriteHref, campaigns };
  if (typeof document === 'undefined') return;
  function update(link) {
    if (!link || link.hasAttribute('download')) return;
    const old = link.getAttribute('href');
    if (!old) return;
    const next = rewriteHref(old, window.location.href);
    if (next !== old) link.setAttribute('href', next);
  }
  document.querySelectorAll('a[href]').forEach(update);
  // Also handle guide links created after the initial page render.
  ['click', 'auxclick', 'contextmenu'].forEach(function (eventName) {
    document.addEventListener(eventName, function (event) {
      if (event.target && event.target.closest) update(event.target.closest('a[href]'));
    }, true);
  });
}());
