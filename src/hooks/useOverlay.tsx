// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import type { RefObject } from 'react';
import { useCallback } from 'react';

export interface iRequiredOverlayProps {
  overlayKey?: string;
  onClose: (overlayKey: string, evt?: MouseEvent) => void;
  maskExit?: boolean;
  escExit?: boolean;
}

export interface OverlayContainerFn {
  open: <C extends React.ElementType>(
    component: C,
    componentProps: React.ComponentProps<C> & iRequiredOverlayProps
  ) => string;
  close: (mk?: string) => void;
}

let ref: RefObject<OverlayContainerFn>;

export default function useOverlay(r?: RefObject<OverlayContainerFn>) {
  if (r) {
    ref = r;
  }

  const open = useCallback<OverlayContainerFn['open']>((...args) => {
    return ref.current?.open(...args) ?? '';
  }, []);

  const close = useCallback<OverlayContainerFn['close']>((...args) => {
    return ref.current?.close(...args);
  }, []);

  return { open, close };
}
