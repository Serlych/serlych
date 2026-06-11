type AnalyticsEventName = "page_view" | "resume_download_click";

type AnalyticsPayload = {
  name: AnalyticsEventName;
  path?: string;
  metadata?: Record<string, string | number | boolean | null>;
};

export function trackAnalyticsEvent({ name, path, metadata }: AnalyticsPayload) {
  if (typeof window === "undefined") {
    return;
  }

  if (navigator.doNotTrack === "1") {
    return;
  }

  const payload = JSON.stringify({
    name,
    path: path ?? `${window.location.pathname}${window.location.search}`,
    referrer: document.referrer || undefined,
    metadata,
  });

  const blob = new Blob([payload], { type: "application/json" });

  if (navigator.sendBeacon?.("/api/analytics", blob)) {
    return;
  }

  void fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  });
}
