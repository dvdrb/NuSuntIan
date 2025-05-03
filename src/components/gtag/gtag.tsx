// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { pageView } from 'helpers/utils/gtag';

const gaTrackingId = 'G-M0QGVX1PT6';
const gtmTrackingId = null;

type GTagType = {
  useGA?: boolean;
  useGTM?: boolean;
};

export default function GTag({ useGA = false, useGTM = false }: GTagType) {
  const location = useLocation();

  useEffect(() => {
    pageView(
      location.pathname,
      useGA ? gaTrackingId : null,
      useGTM ? gtmTrackingId : null
    );
  }, [location.pathname, useGA, useGTM]);

  useEffect(() => {
    if (useGA) {
      // Google Analytics
      const scriptGA1 = document.createElement('script');
      scriptGA1.async = true;
      scriptGA1.src = `https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`;
      document.head.appendChild(scriptGA1);

      const scriptGA2 = document.createElement('script');
      scriptGA2.async = true;
      scriptGA2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaTrackingId}', {
          page_path: window.location.pathname
        });
      `;
      document.head.appendChild(scriptGA2);
    }

    if (useGTM) {
      // Google Tag Manager
      const scriptGTM = document.createElement('script');
      scriptGTM.async = true;
      scriptGTM.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l;j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmTrackingId}');
      `;
      document.head.appendChild(scriptGTM);
    }

    return () => {
      if (useGA) {
        document.head
          .querySelectorAll(`[src*="${gaTrackingId}"]`)
          .forEach((el) => el.remove());
        document.head.querySelectorAll('script').forEach((el) => {
          if (el.innerHTML.includes(gaTrackingId)) {
            el.remove();
          }
        });
      }
      if (useGTM) {
        document.head
          .querySelectorAll(`[src*="${gtmTrackingId}"]`)
          .forEach((el) => el.remove());
        document.head.querySelectorAll('script').forEach((el) => {
          if (el.innerHTML.includes(gtmTrackingId!)) {
            el.remove();
          }
        });
      }
    };
  }, [useGA, useGTM]);

  return null;
}
