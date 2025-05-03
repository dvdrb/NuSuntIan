// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import { useLayoutEffect, useRef, useState } from 'react';

import { ScreenSize } from 'enum/screensizes.enum';

export type IScreenSize = 'xs' | 'sm' | 'md' | 'lg' | 'lgg' | 'xl';

type hookValue = { size: IScreenSize; rankedSize: ScreenSize };

function getWidth(): hookValue {
  if (window.innerWidth <= 575.98) {
    return { size: 'xs', rankedSize: ScreenSize.xs };
  } else if (window.innerWidth <= 767.98) {
    return { size: 'sm', rankedSize: ScreenSize.sm };
  } else if (window.innerWidth <= 991.98) {
    return { size: 'md', rankedSize: ScreenSize.md };
  } else if (window.innerWidth <= 1199.98) {
    return { size: 'lg', rankedSize: ScreenSize.lg };
  } else if (window.innerWidth <= 1250.98) {
    return { size: 'lgg', rankedSize: ScreenSize.lg };
  } else {
    return { size: 'xl', rankedSize: ScreenSize.xl };
  }
}

export default function useScreenSize(): hookValue {
  const [value, setValue] = useState<hookValue>(getWidth());
  const valueRef = useRef(value);
  valueRef.current = value;

  const f = () => {
    const actual = getWidth();
    if (valueRef.current !== actual) {
      setValue(actual);
    }
  };

  useLayoutEffect(() => {
    window.addEventListener('resize', f);
    return () => {
      window.removeEventListener('resize', f);
    };
  }, []);

  return value;
}
