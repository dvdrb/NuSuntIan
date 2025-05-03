// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import type React from 'react';
import { Fragment, useEffect } from 'react';

export type Props = {
  lang?: string;
  defaultTitle?: string;
  titleTemplate?: string;
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

export default function Meta({
  lang = 'en',
  defaultTitle = 'IAN HQ',
  titleTemplate = '%s - IAN HQ',
  title,
  description,
  children,
}: Props) {
  useEffect(() => {
    const previousTitle = document.title;

    if (title) {
      document.title = titleTemplate.replace('%s', title);
    } else {
      document.title = defaultTitle;
    }

    if (lang) {
      document.documentElement.lang = lang;
    }

    if (description) {
      let descriptionMetaTag = document.querySelector(
        'meta[name="description"]'
      );
      if (!descriptionMetaTag) {
        descriptionMetaTag = document.createElement('meta');
        descriptionMetaTag.setAttribute('name', 'description');
        document.head.appendChild(descriptionMetaTag);
      }
      descriptionMetaTag.setAttribute('content', description);
    }

    return () => {
      document.title = previousTitle;
      if (description) {
        const descriptionMetaTag = document.querySelector(
          'meta[name="description"]'
        );
        if (descriptionMetaTag) {
          descriptionMetaTag.setAttribute('content', '');
        }
      }
    };
  }, [lang, defaultTitle, titleTemplate, title, description]);

  return <Fragment>{children}</Fragment>;
}
