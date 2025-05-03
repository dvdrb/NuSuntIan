// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import { Fragment } from 'react';

import { motion } from 'framer-motion';

interface InnerType {
  children: React.ReactNode;
}

export default function Inner({ children }: InnerType) {
  return (
    <Fragment>
      {/* <motion.div
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
      {children} */}
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
      <motion.div /* {...anim(opacity)} */>{children}</motion.div>
    </Fragment>
  );
}
