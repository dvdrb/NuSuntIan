import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

// Inserts a canonical URL for the current route and sets base OG/Twitter URLs.
export default function Seo() {
  const location = useLocation();

  const canonical = useMemo(() => {
    const { origin, pathname } = window.location;
    // Strip common tracking query params from canonical
    return origin + pathname;
  }, [location.pathname]);

  return (
    <Helmet>
      <link rel="canonical" href={canonical} />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:url" content={canonical} />
    </Helmet>
  );
}

