// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useLocation, useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

import styles from '../header.module.scss';

import Bg from 'assets/icons/bg-button.svg?react';
import Close from 'assets/icons/close-2.svg';
// eslint-disable-next-line import/no-duplicates
import LogoComponent from 'assets/icons/logo-vector.svg?react';
import Logo from 'assets/icons/logo-with-gradient.svg';
// eslint-disable-next-line import/no-duplicates
import Routes from 'enum/routes.enum';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { clsx } from 'helpers/utils/HTMLUtils';

export default function Footer() {
  const [opened, setOpened] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  const navAnim = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
  };

  const itemAnim = {
    hidden: { y: 300, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  };

  const isShopPage = /^\/shop(\/.*)?$/.test(location.pathname);

  const links =
    location.pathname === Routes.MUSIC
      ? [
          {
            label: 'Home',
            to: Routes.HOME,
          },
          {
            label: 'Merch',
            to: Routes.SHOP,
          },
          {
            label: 'About',
            to: Routes.ABOUT,
          },
        ]
      : isShopPage
        ? [
            {
              label: 'Home',
              to: Routes.HOME,
            },
            {
              label: 'Music',
              to: Routes.MUSIC,
            },
            {
              label: 'About',
              to: Routes.ABOUT,
            },
          ]
        : location.pathname === Routes.HOME
          ? [
              {
                label: 'Music',
                to: Routes.MUSIC,
              },
              {
                label: 'Merch',
                to: Routes.SHOP,
              },
              {
                label: 'About',
                to: Routes.ABOUT,
              },
            ]
          : [
              {
                label: 'Home',
                to: Routes.HOME,
              },
              {
                label: 'Music',
                to: Routes.MUSIC,
              },
              {
                label: 'Merch',
                to: Routes.SHOP,
              },
              {
                label: 'About',
                to: Routes.ABOUT,
              },
            ];

  useEffect(() => {
    const body = document.querySelector('body');
    if (opened) {
      body?.classList.add('no-overflow');
    } else {
      body?.classList.remove('no-overflow');
    }
  }, [opened]);

  return (
    <Fragment>
      <AnimatePresence>
        {opened && (
          <motion.div
            className={styles.menu}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: 'spring',
              duration: 0.7,
            }}
          >
            <header>
              <motion.figure
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
              >
                <LazyLoadImage src={Logo} alt={'logo'} />
              </motion.figure>
            </header>
            <MotionConfig
              transition={{
                type: 'spring',
                duration: 1,
                bounce: 0.2,
              }}
            >
              <motion.nav
                variants={navAnim}
                initial={'hidden'}
                animate={'visible'}
              >
                {links.map((item, index: number) => (
                  <motion.button
                    key={`${item.label}-${index}`}
                    className={styles['nav-button']}
                    variants={itemAnim}
                    exit={{ y: 300, opacity: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      navigate(item.to);
                    }}
                  >
                    <span>
                      <LogoComponent /> <span>{item.label}</span>
                    </span>
                  </motion.button>
                ))}
              </motion.nav>
            </MotionConfig>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={styles['content-button']}>
        <motion.div
          className={clsx([styles['bg-button'], opened && styles.opened])}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', duration: 1.5, bounce: 0.6 }}
        >
          <Bg />
          <button
            onClick={() => {
              setOpened((e) => !e);
            }}
          >
            <AnimatePresence>
              {opened && (
                <motion.figure
                  initial={{ position: 'absolute' }}
                  animate={{ position: 'absolute' }}
                  exit={{ position: 'absolute' }}
                >
                  <motion.img
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{
                      type: 'spring',
                      duration: 0.7,
                    }}
                    src={Close}
                    alt={'close'}
                  />
                </motion.figure>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {!opened && (
                <motion.figure
                  initial={{ position: 'absolute' }}
                  animate={{ position: 'absolute' }}
                  exit={{ position: 'absolute' }}
                >
                  <motion.img
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{
                      type: 'spring',
                      duration: 0.7,
                    }}
                    src={Logo}
                    alt={'Logo'}
                  />
                </motion.figure>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      </div>
    </Fragment>
  );
}
