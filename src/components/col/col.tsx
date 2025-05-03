// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import type { HTMLAttributes, ReactHTML } from 'react';
import { createElement, useMemo } from 'react';

import styles from './col.module.scss';

import { clsx, getValueByCSSVariable } from 'helpers/utils/HTMLUtils';

type size = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface ColProps<Tag extends keyof ReactHTML>
  extends HTMLAttributes<Tag> {
  tag?: Tag;
  xs?: size;
  sm?: size;
  md?: size;
  lg?: size;
  xl?: size;
  fullfill?: boolean;
  gap?: number | string;
  padding?: number | string;
  alignment?: 'start' | 'center' | 'end';
  verticalAlignment?: 'start' | 'center' | 'end' | 'stretch';
}

export default function Col<Tag extends keyof ReactHTML>({
  tag,
  gap,
  style,
  className = '',
  children,
  padding,
  alignment,
  verticalAlignment,
  xs,
  sm,
  md,
  lg,
  xl,
  fullfill,
  ...props
}: ColProps<Tag>) {
  const calculatedGap = useMemo(
    () => getValueByCSSVariable(gap, '--spacing'),
    [gap]
  );

  const calculatedPadding = useMemo(
    () => getValueByCSSVariable(padding, '--spacing'),
    [padding]
  );

  return createElement(
    tag ?? 'div',
    {
      ...props,
      className: clsx(
        className,
        styles.col,
        alignment ? styles[alignment] : '',
        verticalAlignment ? styles[`v-${verticalAlignment}`] : '',
        xs && styles[`col-xs-${xs}`],
        sm && styles[`col-sm-${sm}`],
        md && styles[`col-md-${md}`],
        lg && styles[`col-lg-${lg}`],
        xl && styles[`col-xl-${xl}`],
        fullfill ? styles.fullfill : ''
      ),
      style: {
        gap: calculatedGap,
        padding: calculatedPadding,
        ...(style ?? {}),
      },
    },
    children
  );
}
