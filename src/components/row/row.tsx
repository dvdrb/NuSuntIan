// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import type { HTMLAttributes, ReactHTML } from 'react';
import { createElement, useMemo } from 'react';

import styles from './row.module.scss';

import { clsx, getValueByCSSVariable } from 'helpers/utils/HTMLUtils';

type spacingAccept = number | string;
export interface RowProps<Tag extends keyof ReactHTML>
  extends HTMLAttributes<Tag> {
  tag?: Tag;
  centralized?: boolean;
  verticalMargin?: spacingAccept | [spacingAccept, spacingAccept | never];
}

export default function Row<Tag extends keyof ReactHTML>({
  tag,
  children,
  className,
  centralized,
  style = {},
  verticalMargin = 0,
  ...props
}: RowProps<Tag>) {
  const calculatedMargin = useMemo(() => {
    const getV = (v: number) => getValueByCSSVariable(v, '--spacing');

    if (typeof verticalMargin === 'string') {
      const spl = verticalMargin.split(' ') ?? [];
      return {
        marginTop: spl[0] ?? undefined,
        marginBottom: spl[1] ?? spl[0] ?? undefined,
      };
    }

    if (typeof verticalMargin === 'number') {
      return {
        marginTop: getV(verticalMargin),
        marginBottom: getV(verticalMargin),
      };
    }

    if (Array.isArray(verticalMargin)) {
      const getMargin = (v: number | string) =>
        typeof v === 'string' ? v : getV(v);
      return {
        marginTop: getMargin(verticalMargin[0]),
        marginBottom: getMargin(verticalMargin[1] ?? verticalMargin[0]),
      };
    }

    return {};
  }, [verticalMargin]);

  return createElement(
    tag ?? 'div',
    {
      ...props,
      style: { ...calculatedMargin, ...style },
      className: clsx(
        className!,
        styles.row,
        centralized ? styles.centralized : ''
      ),
    },
    children
  );
}
