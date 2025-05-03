// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import { Fragment, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './footer.module.scss';

import Col from 'components/col/col';
import Container from 'components/container/container';
import { MotionLink } from 'components/link/link';
import Row from 'components/row/row';

import ExternalLink from 'assets/icons/external-link.svg?react';
import Arrow from 'assets/icons/left-arrow.svg?react';
import Logo from 'assets/icons/logo-vector.svg?react';
import Routes from 'enum/routes.enum';
import { motion } from 'framer-motion';
import { clsx } from 'helpers/utils/HTMLUtils';
import languageValues from 'locales/language';

const language = languageValues.components.footer;

const Footer = forwardRef<HTMLDivElement>((_, ref) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <div className={styles.gradient} />
      <div className={styles['wrapper-cards']}>
        <Container>
          <Row className={styles.cards}>
            <Col lg={4} alignment={'center'} padding={0}>
              <div
                onClick={() => navigate(Routes.ABOUT)}
                className={clsx(styles.card, styles.ian)}
              >
                <header className={styles.header}>
                  <span>ABOUT IAN</span>
                </header>
                <footer className={styles.footer}>
                  <div>
                    <p>RAPPER</p>
                    <span>SONGWRITER</span>
                  </div>
                  <button>
                    <Arrow />
                  </button>
                </footer>
              </div>
            </Col>
            <Col lg={4} alignment={'center'} padding={0}>
              <div
                onClick={() => navigate(Routes.SHOP)}
                className={clsx(styles.card, styles.gif)}
              >
                <header className={styles.header}>
                  <span>BEAST MODE</span>
                  <h1>MERCH</h1>
                </header>
                <footer className={styles.footer}>
                  <div>
                    <p>LIMITED STOCK</p>
                  </div>
                  <button>
                    <Arrow />
                  </button>
                </footer>
              </div>
            </Col>
            <Col lg={4} alignment={'center'} padding={0}>
              <div
                onClick={() => navigate(Routes.MUSIC)}
                className={clsx(styles.card, styles.albuns)}
              >
                <header className={styles.header}>
                  <span>STREAM</span>
                  <h1>ALBUMS</h1>
                </header>
                <footer className={styles.footer}>
                  <div>
                    <p>SLAYER</p>
                    <span>VOODOO</span>
                    <span>BEAST MODE</span>
                  </div>
                  <button>
                    <Arrow />
                  </button>
                </footer>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <footer ref={ref} className={styles.root}>
        <Container className={styles['container-hero']}>
          <header className={styles.header}>
            <Logo />
          </header>
          <div className={styles.body}>
            <MotionLink
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', duration: 1.5, bounce: 0.6 }}
              href={'mailto:help@ianhq.com?subject=IAN%20x%20(your%20name)'}
              className={'cursor-newtab'}
            >
              <b>{language.link.emphasys}</b>
              {language.link.normal}
              <ExternalLink />
            </MotionLink>
            <h2>{language.only}</h2>
          </div>
          <nav className={styles.navigation}>
            <Container className={styles['container-navigation']}>
              <div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', duration: 1.5, bounce: 0.6 }}
                  onClick={() => navigate(Routes.SHOP)}
                >
                  {language.store}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', duration: 1.5, bounce: 0.6 }}
                  onClick={() => navigate(Routes.MUSIC)}
                >
                  {language.music}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', duration: 1.5, bounce: 0.6 }}
                  onClick={() => navigate(Routes.ABOUT)}
                >
                  {language.about}
                </motion.button>
                <MotionLink
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', duration: 1.5, bounce: 0.6 }}
                  href={'https://anpc.ro'}
                  target={'_blank'}
                  className={'cursor-newtab'}
                >
                  {language.anpc}
                </MotionLink>
              </div>
              <div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', duration: 1.5, bounce: 0.6 }}
                  onClick={() => navigate(Routes.POLITICA)}
                >
                  {language.refund}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', duration: 1.5, bounce: 0.6 }}
                  onClick={() => navigate(Routes.PRIVACY)}
                >
                  {language.confidential}
                </motion.button>
              </div>
              <div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', duration: 1.5, bounce: 0.6 }}
                  onClick={() => navigate(Routes.TERMS)}
                >
                  {language.terms}
                </motion.button>
                <MotionLink
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', duration: 1.5, bounce: 0.6 }}
                  href={'https://anpc.ro/ce-este-sal/'}
                  target={'_blank'}
                  className={'cursor-newtab'}
                >
                  {language.anpcsal}
                </MotionLink>
              </div>
            </Container>
          </nav>
        </Container>
      </footer>
    </Fragment>
  );
});

Footer.displayName = 'Footer';

export default Footer;
