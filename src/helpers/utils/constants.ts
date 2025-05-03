// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

export const MOTION_VARIANTS = {
  initial: ({ direction }: { direction: 'forward' | 'backward' }) => ({
    x: direction === 'backward' ? '-100%' : '100%',
    transition: {
      type: 'spring',
      duration: 1,
      delay: 0,
    },
  }),
  in: {
    x: 0,
    transition: {
      type: 'spring',
      duration: 1,
      delay: 0,
    },
  },
  out: ({ direction }: { direction: 'forward' | 'backward' }) => ({
    x: direction === 'backward' ? '100%' : '-100%',
    transition: {
      type: 'spring',
      duration: 1,
      delay: 0,
    },
  }),
};
