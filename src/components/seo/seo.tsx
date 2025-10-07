import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://www.ianix.ro"; // canonical origin aligns with redirects

// Inserts a canonical URL for the current route and sets base OG/Twitter URLs.
export default function Seo() {
  const location = useLocation();

  const canonical = useMemo(() => {
    try {
      const { pathname } = window.location;
      return SITE_URL + (pathname || "/");
    } catch {
      return SITE_URL + "/";
    }
  }, [location.pathname]);

  return (
    <Helmet>
      <link rel="canonical" href={canonical} />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:url" content={canonical} />
    </Helmet>
  );
}
