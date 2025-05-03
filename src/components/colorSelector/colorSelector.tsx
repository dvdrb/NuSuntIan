// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import type { ChangeEvent } from 'react';
import { Fragment, useEffect, useState } from 'react';

import styles from './colorSelector.module.scss';

import type { Colors } from 'enum/shop.enum';
import { motion } from 'framer-motion';
import { clsx } from 'helpers/utils/HTMLUtils';

interface SizeSelectorProps {
  options: {
    color: string;
    label: Colors;
  }[];
  callback?: (opt: { color: string; label: Colors }) => void;
  resetValue?: boolean;
}

export default function ColorSelector({
  options,
  callback,
  resetValue,
}: SizeSelectorProps) {
  const [selectedColor, setSelectedColor] = useState<{
    label: Colors;
    color: string;
  } | null>();

  const handleSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedColor({
      color: event.target.value,
      label: event.target.name as Colors,
    });
    callback &&
      callback({
        color: event.target.value,
        label: event.target.name as Colors,
      });
  };

  useEffect(() => {
    setSelectedColor(null);
  }, [resetValue]);

  return (
    <Fragment>
      {options.map((option) => (
        <motion.label
          key={crypto.randomUUID()!}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: 'spring',
          }}
          className={clsx([
            styles.root,
            selectedColor?.color === option?.color ? styles.selected : '',
          ])}
        >
          <input
            type={'radio'}
            name={option.label}
            value={option.color}
            checked={selectedColor?.color === option?.color}
            onChange={handleSizeChange}
            style={{ all: 'unset' }}
          />
          <div style={{ background: `${option.color}` }} />
          <span className={styles.span}>{option.label}</span>
        </motion.label>
      ))}
    </Fragment>
  );
}
