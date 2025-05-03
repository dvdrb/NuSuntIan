// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

/* eslint-disable */
declare global {
  interface Window {
    gtag: (
      option: string,
      gaTrackingId: string,
      options: Record<string, unknown>
    ) => void;
    dataLayer: Record<string, unknown>[];
  }
}

export const pageView = (
  url: string,
  gaTrackingId?: string | null,
  gtmTrackingId?: string | null
) => {
  if (gaTrackingId && window?.gtag) {
    window.gtag('config', gaTrackingId, {
      page_path: url,
    });
  } else if (gaTrackingId) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Google Analytics is not configured.');
    }
  }

  if (gtmTrackingId && window?.dataLayer) {
    window.dataLayer.push({
      event: 'pageview',
      page_path: url,
    });
  } else if (gtmTrackingId) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Google Tag Manager is not configured.');
    }
  }
};
