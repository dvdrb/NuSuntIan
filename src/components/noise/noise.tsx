// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import styles from './noise.module.scss';

import { clsx } from 'helpers/utils/HTMLUtils';

type NType = {
  zIndex?: number;
  position?: 'absolute' | 'fixed';
};

export default function Noise(props: NType) {
  return (
    <div
      className={clsx([
        styles['noise-root'],
        props.position ? styles[`${props.position}`] : '',
      ])}
      style={{ zIndex: props.zIndex }}
    />
  );
}
