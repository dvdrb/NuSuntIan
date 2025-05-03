// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import { useEffect, useMemo, useRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useLocation, useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

import styles from './header.module.scss';

import Arrow from '../../assets/icons/arrow-red.svg?react';
import LogoRed from '../../assets/icons/logo-vector-red.svg';
import Logo from '../../assets/icons/logo-vector.svg';
import Routes from '../../enum/routes.enum';
import languageValues from '../../locales/language';
import { useCartStore } from '../../store/cartStore';
import Count from './fragments/count.header';
import Footer from './fragments/footer.header';
import Menu from './fragments/menu.header';
import Overlay from './fragments/overlay.header';

import { ScreenSize } from 'enum/screensizes.enum';
import { AnimatePresence, motion } from 'framer-motion';
import useScreenSize from 'hooks/useScreenSize';

const language = languageValues.components.header;

type HeaderType = {
  showFooter?: boolean;
};

export default function Header({ showFooter }: HeaderType) {
  const headerRef = useRef<HTMLHeadElement>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const [items, openMenu, setOpenMenu] = useCartStore((state) => [
    state.cart,
    state.openMenu,
    state.toggleMenu,
  ]);

  const isHome = window.location.pathname === Routes.HOME;
  const isShopOrProductPage = /^\/shop(\/product\/)?/.test(location.pathname);
  const isProductPage = /^\/shop\/product\/.+/.test(location.pathname);
  const isAbout = /^\/about\/?/.test(location.pathname);
  const { size: value, rankedSize: ranked } = useScreenSize();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isMobile = useMemo(() => ranked <= ScreenSize.sm, [value]);

  const handleScroll = () => {
    requestAnimationFrame(() => {
      const position = window.scrollY;
      const blurAmount = Math.min(20, position / 10);

      if (headerRef.current) {
        headerRef.current.style.backdropFilter = `blur(${blurAmount}px)`;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (headerRef.current.style as any).WebkitBackdropFilter =
          `blur(${blurAmount}px)`;
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const body = document.querySelector('body');
    if (openMenu) {
      body?.classList.add('no-overflow');
    } else {
      body?.classList.remove('no-overflow');
    }
  }, [openMenu]);

  return (
    <Fragment>
      <header ref={headerRef} className={styles.root}>
        <nav>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', duration: 1.5, bounce: 0.6 }}
            onClick={() =>
              isHome
                ? navigate(Routes.MUSIC)
                : isShopOrProductPage
                  ? navigate(Routes.SHOP)
                  : navigate(Routes.HOME)
            }
          >
            {isHome ? (
              language.buttons.music
            ) : !isMobile && isShopOrProductPage ? (
              <Fragment>
                {isProductPage ? <Arrow /> : <Fragment />}

                {language.buttons.home}
              </Fragment>
            ) : (
              language.buttons.home
            )}
          </motion.button>
          <button className={styles.figure}>
            <figure onClick={() => navigate(Routes.HOME)}>
              <LazyLoadImage
                src={isShopOrProductPage || isAbout ? LogoRed : Logo}
                alt={'Logo'}
              />
            </figure>
          </button>
          {isShopOrProductPage ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', duration: 1.5, bounce: 0.6 }}
              onClick={() => setOpenMenu()}
            >
              {language.buttons.cart}
              <AnimatePresence>
                {items.length && <Count count={items} />}
              </AnimatePresence>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', duration: 1.5, bounce: 0.6 }}
              onClick={() => navigate(Routes.SHOP)}
            >
              {language.buttons.shop}
            </motion.button>
          )}
        </nav>
      </header>
      {showFooter && <Footer />}
      <AnimatePresence>
        {openMenu && <Menu onClose={() => setOpenMenu()} />}
      </AnimatePresence>
      <AnimatePresence>
        {openMenu && <Overlay onClose={() => setOpenMenu()} />}
      </AnimatePresence>
    </Fragment>
  );
}
