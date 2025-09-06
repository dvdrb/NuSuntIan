// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import { Fragment, useMemo } from 'react';
import Seo from 'components/seo/seo';

import { motion } from 'framer-motion';

interface InnerType {
  children: React.ReactNode;
}

export default function Inner({ children }: InnerType) {
  const reduceOrMobile = useMemo(() => {
    try {
      const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isSmall = window.matchMedia('(max-width: 768px)').matches;
      return prefersReduce || isSmall;
    } catch {
      return false;
    }
  }, []);

  if (reduceOrMobile) {
    return (
      <Fragment>
        <Seo />
        {children}
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Seo />
      <motion.div
        className={'page-slide-in'}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className={'page-slide-out'}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div>{children}</motion.div>
    </Fragment>
  );
}
