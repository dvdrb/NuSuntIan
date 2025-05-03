// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import type React from 'react';
import { Fragment, useEffect, useState } from 'react';

import styles from './sizeSelector.module.scss';

import { motion } from 'framer-motion';
import { clsx } from 'helpers/utils/HTMLUtils';

interface SizeSelectorProps {
  options: string[];
  callback?: (size: string) => void;
  resetValue?: boolean;
}

export default function SizeSelector({
  options,
  callback,
  resetValue,
}: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSize(event.target.value);
    callback && callback(event.target.value);
  };

  useEffect(() => {
    setSelectedSize(null);
  }, [resetValue]);

  return (
    <Fragment>
      {options.map((option) => (
        <motion.label
          key={option}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: 'spring',
            duration: 1.5,
            bounce: 0.6,
          }}
          className={clsx([
            styles.root,
            selectedSize === option ? styles.selected : '',
          ])}
        >
          <input
            type={'radio'}
            name={'size'}
            value={option}
            checked={selectedSize === option}
            onChange={handleSizeChange}
            style={{ all: 'unset' }}
          />
          {option}
        </motion.label>
      ))}
    </Fragment>
  );
}
