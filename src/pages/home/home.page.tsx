// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import { Fragment, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './home.module.scss';

import {
  Background,
  Col,
  Container,
  Inner,
  Layout,
  Meta,
  Row,
} from 'components';

import Arrow from 'assets/icons/left-arrow.svg?react';
import Routes from 'enum/routes.enum';
import { ScreenSize } from 'enum/screensizes.enum';
import { clsx } from 'helpers/utils/HTMLUtils';
import useScreenSize from 'hooks/useScreenSize';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const navigate = useNavigate();

  const { size: value, rankedSize: ranked } = useScreenSize();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isMobileDevice = useMemo(() => ranked <= ScreenSize.lgg, [value]);

  useLayoutEffect(() => {
    window.scroll({ behavior: 'smooth', top: 0, left: 0 });
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <Fragment>
      <Meta title={'Home'} />
      <Inner>
        <div className={styles.root}>
          <Layout showHeader showHeaderFooter renderContainer={false}>
            <Background isHome disableScroll />
            {/* <Container>
              <div className={styles.head}>
                <ReactPlayer
                  muted={true}
                  playing={true}
                  loop={true}
                  playsinline={true}
                  url={
                    window.navigator.userAgent.indexOf('Mac') === -1
                      ? HeadWindows
                      : Head
                  }
                  width={'100%'}
                  height={'100%'}
                />
              </div>
            </Container> */}
            <div className={styles['wrapper-cards']}>
              <Container>
                <Row className={styles.cards}>
                  {isMobileDevice ? (
                    <Fragment>
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
                    </Fragment>
                  ) : (
                    <Fragment>
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
                    </Fragment>
                  )}

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
          </Layout>
        </div>
      </Inner>
    </Fragment>
  );
}
