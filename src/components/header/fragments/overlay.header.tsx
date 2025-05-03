// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import styles from '../header.module.scss';

import { motion } from 'framer-motion';

type OverlayType = {
  onClose: () => void;
};

export default function Overlay({ onClose }: OverlayType) {
  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        x: { type: 'spring', bounce: 0 },
        opacity: { duration: 0.5 },
      }}
      onClick={onClose}
    />
  );
}
