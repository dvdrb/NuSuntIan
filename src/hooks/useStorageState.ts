// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';

export default function useStorageState<T>(
  storage: Storage,
  key: string,
  initialValue?: T | undefined
): [T | undefined, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initialValue as T);

  useEffect(() => {
    const v = storage.getItem(key);
    if (!initialValue && v && v !== 'undefined') {
      try {
        setValue(JSON.parse(v) as T);
      } catch (e) {
        console.error(e);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (value) {
      storage.setItem(key, JSON.stringify(value));
    }
  }, [key, storage, value]);

  return [value, setValue];
}
