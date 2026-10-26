export function trackEvent(eventName, details = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...details,
  });
  window.dispatchEvent(
    new CustomEvent("digiclave:track", {
      detail: { event: eventName, ...details },
    }),
  );
}
