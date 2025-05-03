// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import * as React from 'react';
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from 'react-router-dom';

import type { MotionProps } from 'framer-motion';
import { motion } from 'framer-motion';
import { clsx } from 'helpers/utils/HTMLUtils';

export type LinkType = {
  href?: string;
  to?: string;
  children: React.ReactNode;
  openNewTab?: boolean;
  className?: string;
  linkProps?: Omit<RouterLinkProps, 'href'>;
} & React.ComponentPropsWithRef<'a'>;

const Link = React.forwardRef<HTMLAnchorElement, LinkType>(
  ({ children, href, to, openNewTab, className, linkProps, ...rest }, ref) => {
    const isNewTab =
      openNewTab !== undefined
        ? openNewTab
        : href && !href.startsWith('/') && !href.startsWith('#');

    if (!isNewTab && to) {
      return (
        <RouterLink
          to={to}
          ref={ref}
          className={className}
          style={{ cursor: 'pointer' }}
          {...rest}
          {...linkProps}
        >
          {children}
        </RouterLink>
      );
    }

    return (
      <a
        ref={ref}
        target={isNewTab ? '_blank' : undefined}
        rel={isNewTab ? 'noopener noreferrer' : undefined}
        href={href}
        className={clsx('cursor-newtab', className!)}
        {...rest}
      >
        {children}
      </a>
    );
  }
);

Link.displayName = 'Link';

export default Link;

type MotionLinkProps = LinkType & MotionProps;

const MotionLinkComponent = React.forwardRef<
  HTMLAnchorElement,
  MotionLinkProps
>((props, ref) => <Link {...props} ref={ref} />);

MotionLinkComponent.displayName = 'MotionLinkComponent';

const MotionLink = motion(MotionLinkComponent);

MotionLink.displayName = 'MotionLink';

export { MotionLink };
