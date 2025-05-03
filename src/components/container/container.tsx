// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import type { HTMLAttributes, ReactNode } from 'react';

import styles from './container.module.scss';

import { clsx } from 'helpers/utils/HTMLUtils';

interface CProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function Container(props: CProps) {
  return (
    <div className={clsx([styles.root, props.className ?? ''])}>
      {props.children}
    </div>
  );
}
