// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toVal = (mix: any): string | undefined => {
  if (typeof mix === 'string' || typeof mix === 'number') {
    return mix.toString();
  } else if (Array.isArray(mix)) {
    return mix
      .filter((value) => !!value)
      .map(toVal)
      .filter((value) => !!value)
      .join(' ');
  } else if (mix) {
    return Object.entries(mix)
      .filter(([_, value]) => value)
      .map(([key]) => key)
      .join(' ');
  }
  return undefined;
};

export const clsx = (
  ...classNames: (string | object | null | undefined | boolean)[]
): string => {
  const filteredClasses = classNames.filter(
    (value) => value !== null && value !== undefined && value !== false
  );

  const combinedClasses = filteredClasses
    .filter(
      (value) =>
        typeof value === 'string' || typeof value === 'object' || value === null
    )
    .map(toVal)
    .filter((value) => !!value)
    .join(' ');

  return combinedClasses || '';
};

export const getValueByCSSVariable = (
  v?: number | string,
  key = '--spacing'
) => {
  if (typeof v === 'number') {
    const p = parseInt(
      window.getComputedStyle(document.documentElement).getPropertyValue(key) ??
        '8'
    );
    return `${v * p}px`;
  }

  return v;
};

export const capitalize = (text: string) => {
  if (typeof text !== 'string') {
    throw new Error('Error: capitalize(text) expects a string argument.');
  }

  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const isNullOrUndefined = <T>(
  value: T | null | undefined,
  returnData?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): boolean | any => {
  if (returnData) {
    if (value === null || value === undefined) {
      return true;
    } else {
      return value;
    }
  } else {
    return value === null || value === undefined;
  }
};

export const formatCurrency = new Intl.NumberFormat('ro-RO', {
  style: 'currency',
  currency: 'RON',
});
