import { useRouter } from "next/router";
import { useEffect } from "react";

import { trackAnalyticsEvent } from "~/utils/analytics";

export default function AnalyticsTracker() {
  const router = useRouter();

  useEffect(() => {
    trackAnalyticsEvent({ name: "page_view", path: router.asPath });

    function handleRouteChange(path: string) {
      trackAnalyticsEvent({ name: "page_view", path });
    }

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.asPath, router.events]);

  return null;
}
