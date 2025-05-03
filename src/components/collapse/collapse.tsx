// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';

interface CollapseProps {
  children: React.ReactNode;
  opened: boolean;
}

export default function Collapse({ children, opened: open }: CollapseProps) {
  const animate = {
    transition: { type: 'spring', duration: 0.7 },
    height: open ? '20px' : '0px',
    opacity: open ? 1 : 0.5,
  };

  return (
    <AnimatePresence>
      {open && (
        <LazyMotion features={domAnimation} strict>
          <div aria-expanded={open}>
            <m.div
              style={{ overflow: 'hidden' }}
              initial={{ height: 0, opacity: 1 }}
              animate={animate}
              exit={{ height: 0, opacity: 1 }}
            >
              {children}
            </m.div>
          </div>
        </LazyMotion>
      )}
    </AnimatePresence>
  );
}
