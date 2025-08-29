// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import type { ReactNode } from 'react';
import { Fragment } from 'react';

import styles from './layout.module.scss';

import Footer from 'components/footer/footer';

import Container from '../container/container';
import Header from '../header/header';

type LayoutType = {
  children: ReactNode;
  showHeader?: boolean;
  showHeaderFooter?: boolean;
  showFooter?: boolean;
  renderContainer?: boolean;
};

export default function Layout({
  children,
  showHeader,
  showHeaderFooter,
  renderContainer,
  showFooter,
}: LayoutType) {
  return (
    <main className={styles.root}>
      {showHeader ? <Header showFooter={showHeaderFooter} /> : <Fragment />}
      {renderContainer ? (
        <Container className={styles.content}>{children}</Container>
      ) : (
        children
      )}
      {showFooter ? <Footer /> : <Fragment />}
    </main>
  );
}
