// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import type {
  AnimationEvent,
  FormEvent,
  KeyboardEvent,
  MouseEvent,
  UIEvent,
  WheelEvent,
} from 'react';
import { useLayoutEffect } from 'react';

export default function useEvent(
  events: {
    target?: HTMLElement;
    handler: (
      event:
        | MouseEvent
        | KeyboardEvent
        | WheelEvent
        | UIEvent
        | Event
        | AnimationEvent
        | FormEvent
    ) => void;
    event: keyof DocumentEventMap;
  }[]
) {
  useLayoutEffect(() => {
    events.forEach(({ event, handler, target }) => {
      (target ?? document.body).addEventListener(event, handler);
    });
    return () => {
      events.forEach(({ event, handler, target }) => {
        (target ?? document.body).removeEventListener(event, handler);
      });
    };
  }, [events]);
}

// useEvent([
//   {
//     target: document.body,
//     event: 'keydown',
//     handler: (e) => {
//       if (opened && 'key' in e && e.key === 'Escape') {
//         setOpened(false);
//       }
//     },
//   },
// ]);
