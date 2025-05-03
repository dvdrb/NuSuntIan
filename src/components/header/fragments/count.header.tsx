// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import styles from '../header.module.scss';

import { motion } from 'framer-motion';
import type { ClothesType } from 'store/data';

type CountType = {
  count: ClothesType[];
};

export default function Count({ count }: CountType) {
  const calculateTotalQuantity = (clothes: ClothesType[]): number => {
    return clothes.reduce((sum, item) => {
      if (item.quantity !== undefined && typeof item.quantity === 'number') {
        return sum + item.quantity;
      } else {
        console.error('Invalid or missing quantity value:', item.quantity);
        return sum;
      }
    }, 0);
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{
        type: 'spring',
        duration: 0.7,
        bounce: 0.4,
      }}
      className={styles.count}
    >
      <span>
        {count.length
          ? calculateTotalQuantity(count) > 9
            ? '9+'
            : calculateTotalQuantity(count)
          : ''}
      </span>
    </motion.div>
  );
}
