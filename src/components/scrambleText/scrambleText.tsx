// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import { createElement, type ReactHTML } from 'react';

import { useScramble } from 'use-scramble';

interface ScrambleTextProps<Tag extends keyof ReactHTML> {
  text: string;
  tag?: Tag;
  duration?: number;
}

export default function ScrambleText<Tag extends keyof ReactHTML>({
  tag,
  text,
  duration = 0.6,
  ...props
}: ScrambleTextProps<Tag>) {
  const { ref } = useScramble({
    text: text,
    speed: duration,
    tick: 1,
    step: 1,
    scramble: 4,
    seed: 10,
  });

  return createElement(tag ?? 'span', {
    ...props,
    ref: ref,
  });
}
