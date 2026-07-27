/**
 * Thin wrapper around window.fbq. The inline snippet in index.html
 * defines fbq synchronously (it queues calls until fbevents.js has
 * loaded), but this guards against ad blockers stripping it entirely
 * so tracking calls never throw.
 */
export function trackEvent(name, params) {
  if (typeof window.fbq === 'function') {
    window.fbq('track', name, params)
  }
}
