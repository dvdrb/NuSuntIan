// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

import styles from './shop.module.scss';

import { Header, Inner, Layout, Meta, Noise } from 'components';

import MobileVideo from 'assets/video/shop-bg-mobile.webm';
import DesktopVideo from 'assets/video/shop-bg.webm';
import { ScreenSize } from 'enum/screensizes.enum';
import { AnimatePresence, motion } from 'framer-motion';
import useScreenSize from 'hooks/useScreenSize';
import useStorageState from 'hooks/useStorageState';
import languageValues from 'locales/language';
import Modal from 'pages/music/fragments/modal.music';

interface ShopProps {
  children: React.ReactNode;
}

export default function Shop({ children }: ShopProps) {
  const [showVideo, setShowVideo] = useState<boolean>(true);

  const location = useLocation();

  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnded = () => {
    setShowVideo(false);
    setStorage('false');
  };

  const [storage, setStorage] = useStorageState<string>(
    window.localStorage,
    'showVideoAgain'
  );

  const { size: value, rankedSize: ranked } = useScreenSize();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isMobile = useMemo(() => ranked <= ScreenSize.sm, [value]);

  const regex = /\/shop\/product\//;

  const isShopPage = (pathname: string): boolean => {
    const regex = /^\/shop$/;
    return regex.test(pathname);
  };

  const isShopPageWithAdditionals = (pathname: string): boolean => {
    const regex = /^\/shop(?:\/.*)?$/;

    return regex.test(pathname);
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    const body = document.querySelector('body');
    if (showVideo && (storage === 'false' || storage === 'true')) {
      body?.classList.add('no-overflow');
    } else {
      body?.classList.remove('no-overflow');
    }
  }, [showVideo, storage]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, [showVideo, storage]);

  useEffect(() => {
    if (!isShopPage(location.pathname)) {
      setShowVideo(false);
      setStorage('false');
    }
  }, [location.pathname, setStorage]);

  return (
    <Fragment>
      <Meta title={'Shop'} />
      <Inner>
        <AnimatePresence>
          {isShopPage(location.pathname) &&
            (showVideo || storage === 'true') && (
              <Fragment>
                <Header showFooter={false} />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={styles.video}
                >
                  <video
                    ref={videoRef}
                    width={'100%'}
                    height={'100%'}
                    playsInline
                    onEnded={handleEnded}
                    autoPlay
                    muted
                  >
                    <track kind={'captions'} srcLang={'en'} label={'English'} />
                    <source
                      src={isMobile ? MobileVideo : DesktopVideo}
                      type={'video/webm'}
                    />
                    Your browser does not support the video tag.
                  </video>
                  <button
                    onClick={() => {
                      setShowVideo(false);
                      setStorage('false');
                    }}
                  >
                    {languageValues.components.buttons.skip}
                  </button>
                </motion.div>
              </Fragment>
            )}
        </AnimatePresence>
        <AnimatePresence>
          {isShopPageWithAdditionals(location.pathname) &&
            storage === 'false' && (
              <Fragment>
                <Noise position={'fixed'} zIndex={-1} />
                <Layout
                  showHeader={true}
                  showFooter={true}
                  renderContainer={!regex.test(location.pathname)}
                  showHeaderFooter
                >
                  <AnimatePresence>{children}</AnimatePresence>
                </Layout>
              </Fragment>
            )}
        </AnimatePresence>
      </Inner>
      <Modal />
    </Fragment>
  );
}
