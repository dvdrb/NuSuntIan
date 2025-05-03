// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import { lazy } from 'react';

import type { UndefinedInitialDataOptions } from '@tanstack/react-query';

export type ExtraQueryParams<T> = Omit<
  Partial<UndefinedInitialDataOptions<T>>,
  'queryFn'
>;

export const ReactQueryDevtoolsProduction = lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then(
    (d) => ({
      default: d.ReactQueryDevtools,
    })
  )
);
