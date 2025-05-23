// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import { Fragment, useLayoutEffect, useMemo, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import styles from "./music.module.scss";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";

import { Background, Inner, Layout, Meta, ScrambleText } from "components";

// import Modal from './fragments/modal.music.tsx';

import AppleLogo from "assets/icons/apple.svg?react";
import Arrow from "assets/icons/arrow.svg";
import SpotifyLogo from "assets/icons/spotify.svg?react";
import YoutubeLogo from "assets/icons/youtube.svg?react";
import Image1 from "assets/images/Image-1.webp";
import Image2 from "assets/images/Image-2.webp";
import Image3 from "assets/images/Image-3.webp";
import Image4 from "assets/images/Image-4.webp";

import { ScreenSize } from "enum/screensizes.enum";
import { motion } from "framer-motion";
import { clsx } from "helpers/utils/HTMLUtils";
import useScreenSize from "hooks/useScreenSize";
import languageValues from "locales/language.tsx";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

const language = languageValues.pages.music;

export default function Music() {
  const [swiper, setSwiper] = useState<{
    activeIndex: number;
    slides: unknown[] | undefined;
  }>();

  const { size: value, rankedSize: ranked } = useScreenSize();

  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isMobileDevice = useMemo(() => ranked <= ScreenSize.lgg, [value]);

  const getDateText = (index: number | undefined) => {
    switch (index) {
      case 0:
        return "22 May. 2025";
      case 1:
        return "24 Mar. 2024";
      case 2:
        return "13 Feb. 2022";
      case 3:
        return "4 Jul. 2019";
      default:
        return "22 May. 2025";
    }
  };

  const renderScrambleTexts = (texts: string[]) => {
    return texts.map((text) => (
      <ScrambleText tag={"p"} duration={0.6} key={text} text={text} />
    ));
  };

  const renderText = (index: number | undefined) => {
    return index === 2 ? (
      <Fragment>
        <div>
          {renderScrambleTexts([
            "Urgente",
            "Taticu lor",
            "Salbatic",
            "Sange",
            "Tiki Taka",
            "Vvs",
            "Clapa",
            "Dat dreacu",
            "Lumea asta",
            "Nu ma duc la job",
            "Taticu lor 2",
            "Oare (ft. Oscar)",
            "Skurcircuit",
          ])}
        </div>
        <div>
          {renderScrambleTexts([
            "Dat afara",
            "Zdrente",
            "Piramida (ft. Aerozen)",
            "Waka Waka",
            "1 Aprilie",
          ])}
        </div>
      </Fragment>
    ) : index === 3 ? (
      <div>
        {renderScrambleTexts([
          "Scuze mama",
          "Hell-O",
          "Frigider",
          "Placebo",
          "Palmat",
          "Pozne",
          "Timeout",
          "Slayer",
          "Teancuri",
          "Zambesc",
          "Evantai",
          "Biznis",
          "60 De Zile II",
        ])}
      </div>
    ) : index === 1 ? (
      <div>
        {renderScrambleTexts([
          "Peste",
          "Blestem (ft. Floris)",
          "McSundae",
          "Okay",
          "Mink",
          "N.C.S.M",
          "4",
          "SELGROS (ft. Aerozen)",
          "Supernanny",
          "Oh My (ft. Bvcovia)",
          "Lunetist (ft. Oscar)",
        ])}
      </div>
    ) : index === 0 ? (
      <div>
        {renderScrambleTexts([
          "Momentu",
          "Banii vin",
          "Miley",
          "Cat e ceasu",
          "Serghei Mizil/Wizrd",
          "Heavy Metal",
          "HBA RMX",
        ])}
      </div>
    ) : (
      <Fragment />
    );
  };

  useLayoutEffect(() => {
    window.scroll({ behavior: "smooth", top: 0, left: 0 });
  }, []);

  type Playlist = {
    appleMusic?: string;
    appleMusicWeb?: string;
    spotify?: string;
    spotifyWeb?: string;
    youtube?: string;
  };

  const openPlaylist = ({
    isAppleMusic = false,
    isYoutube = false,
    isSpotify = false,
  }: {
    isAppleMusic?: boolean;
    isYoutube?: boolean;
    isSpotify?: boolean;
  }) => {
    const playlists: Playlist[] = [
      {
        appleMusic:
          "music://music.apple.com/us/album/voodoo-chronicles-vol-i/1814853744",
        appleMusicWeb:
          "https://music.apple.com/us/album/voodoo-chronicles-vol-i/1814853744",
        spotify:
          "spotify://album/36IxAFv88GZe1xhF3H0GnS?si=QsNXvyWsTjiEK0w31NGW6g",
        spotifyWeb:
          "https://open.spotify.com/album/36IxAFv88GZe1xhF3H0GnS?si=QsNXvyWsTjiEK0w31NGW6g",
        youtube:
          "https://www.youtube.com/watch?v=pxLqb8vhJSA&list=PLmlOshpuGAzw5WuVPxYTVRae6r01ROlM-",
      },
      {
        appleMusic:
          "music://music.apple.com/br/album/beast-mode/1736982730?l=en-GB",
        appleMusicWeb:
          "https://music.apple.com/br/album/beast-mode/1736982730?l=en-GB",
        spotify:
          "spotify://album/5GvT3AIUkQrWS3sLq4Lwdg?si=AQAS17yaSSelXw1TpJt6jQ",
        spotifyWeb:
          "https://open.spotify.com/album/5GvT3AIUkQrWS3sLq4Lwdg?si=AQAS17yaSSelXw1TpJt6jQ",
        youtube:
          "https://www.youtube.com/watch?v=ou0DSYzDTbs&list=PLmlOshpuGAzzyyG2tkcNlQOp9aJilRxi-",
      },
      {
        appleMusic:
          "music://music.apple.com/br/album/voodoo/1603420607?l=en-GB",
        appleMusicWeb:
          "https://music.apple.com/br/album/voodoo/1603420607?l=en-GB",
        spotify:
          "spotify://album/2RYBhGpncCqy05vs85P8NV?si=uqo4yS78Q6uVBncAFehYSw",
        spotifyWeb:
          "https://open.spotify.com/album/2RYBhGpncCqy05vs85P8NV?nd=1&dlsi=8073824da79348d7",
        youtube:
          "https://www.youtube.com/watch?v=VPWERpWTXi0&list=PLmlOshpuGAzxKUIrH3usTbuvT2YVp1mv0",
      },
      {
        appleMusic:
          "music://music.apple.com/br/album/slayer/1563782864?l=en-GB",
        appleMusicWeb:
          "https://music.apple.com/br/album/slayer/1563782864?l=en-GB",
        spotify:
          "spotify://album/4A9R8TRrRsslTgzsvMW4Ui?si=agCl4vBIQRSaGHvfS66iJw",
        spotifyWeb:
          "https://open.spotify.com/album/4A9R8TRrRsslTgzsvMW4Ui?nd=1&dlsi=ca130cc75c8e4f3b",
        youtube:
          "https://www.youtube.com/watch?v=ou0DSYzDTbs&list=PLmlOshpuGAzzyyG2tkcNlQOp9aJilRxi-",
      },
    ];

    const currentIndex = swiper?.activeIndex ?? 0;
    const currentPlaylist = playlists[currentIndex] || {};

    const playlistUrlApp = isAppleMusic
      ? currentPlaylist.appleMusic
      : isSpotify
        ? currentPlaylist.spotify
        : isYoutube
          ? currentPlaylist.youtube
          : "";

    const playlistUrlWeb = isAppleMusic
      ? currentPlaylist.appleMusicWeb
      : isSpotify
        ? currentPlaylist.spotifyWeb
        : isYoutube
          ? currentPlaylist.youtube
          : "";

    const newWindow = window.open(playlistUrlApp, "_blank");
    if (newWindow) {
      newWindow.onload = function () {
        newWindow.close();
      };
      newWindow.onerror = function () {
        window.location.href = playlistUrlWeb;
      };
    } else {
      window.location.href = playlistUrlWeb;
    }
  };

  return (
    <Fragment>
      <Meta title={"Music"} />
      <Inner>
        <Background swipe={swiper} />
        <Layout showHeader showHeaderFooter showFooter>
          <motion.div
            initial={"hidden"}
            whileInView={"visible"}
            transition={{ duration: 0.6 }}
            variants={{
              visible: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
            className={styles.root}
          >
            {!isMobileDevice ? (
              <Fragment>
                <div className={styles.hero} /*style={{ opacity: op1 }} */>
                  <h6>{language.album}</h6>
                  <ScrambleText
                    tag={"h1"}
                    key={
                      swiper?.activeIndex === 2
                        ? "VOODOO"
                        : swiper?.activeIndex === 3
                          ? "SLAYER"
                          : swiper?.activeIndex === 1
                            ? "BEAST MODE"
                            : swiper?.activeIndex === 0
                              ? "VOODOO CHRONICLES, VOL. 1"
                              : "VOODOO"
                    }
                    duration={0.4}
                    text={
                      swiper?.activeIndex === 2
                        ? "VOODOO"
                        : swiper?.activeIndex === 3
                          ? "SLAYER"
                          : swiper?.activeIndex === 1
                            ? "BEAST MODE"
                            : swiper?.activeIndex === 0
                              ? "VOODOO CHRONICLES, VOL. 1"
                              : "VOODOO"
                    }
                  />
                </div>
                <div className={styles.container}>
                  <article className={styles["album-info"]}>
                    <header>
                      <ScrambleText
                        duration={0.6}
                        key={getDateText(swiper?.activeIndex)}
                        text={getDateText(swiper?.activeIndex)}
                      />
                      <h1>{language.written}</h1>
                    </header>
                    <div>{renderText(swiper?.activeIndex)}</div>
                  </article>
                  <div className={styles["container-slider"]}>
                    <Swiper
                      effect={"coverflow"}
                      grabCursor={true}
                      centeredSlides={true}
                      slidesPerView={isMobileDevice ? 1 : "auto"}
                      spaceBetween={isMobileDevice ? 0 : -250}
                      modules={[EffectCoverflow, Navigation, Pagination]}
                      coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: false,
                      }}
                      pagination={{
                        el: paginationRef.current,
                        clickable: true,
                        bulletActiveClass: styles.active,
                        bulletClass: styles.bullets,
                      }}
                      navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                      }}
                      onSlideChange={(swiperCore) => {
                        setSwiper({
                          activeIndex: swiperCore.activeIndex,
                          slides: swiperCore.slides,
                        });
                      }}
                      onInit={(swiperCore) => {
                        setSwiper({
                          activeIndex: swiperCore.activeIndex,
                          slides: swiperCore.slides,
                        });
                      }}
                      className={styles.slider}
                    >
                      <SwiperSlide>
                        <img src={Image4} alt="first" />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img src={Image3} alt="second" />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img src={Image1} alt="third" />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img src={Image2} alt="forth" />
                      </SwiperSlide>
                    </Swiper>
                  </div>
                </div>
                <footer>
                  {!isMobileDevice ? (
                    <div className={styles["bullets-wrapper"]}>
                      <div
                        ref={paginationRef}
                        className={styles["bullets-inside"]}
                      >
                        <div className={styles["bullets-pagination"]}></div>
                      </div>
                      <div className={styles.arrows}>
                        <div
                          ref={prevRef}
                          className={clsx([
                            styles["button-arrow"],
                            styles["prev"],
                            swiper && swiper?.activeIndex === 0
                              ? styles.disabled
                              : "",
                          ])}
                        >
                          <LazyLoadImage src={Arrow} alt={"Left arrow"} />
                        </div>
                        <div
                          ref={nextRef}
                          className={clsx([
                            styles["button-arrow"],
                            styles["next"],
                            swiper && swiper?.activeIndex === 3
                              ? styles.disabled
                              : "",
                          ])}
                        >
                          <LazyLoadImage src={Arrow} alt={"Right arrow"} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Fragment />
                  )}
                  <div className={styles["musics"]}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        duration: 1.5,
                        bounce: 0.6,
                      }}
                      className={clsx(styles["footer-text"], styles.apple)}
                      onClick={() => openPlaylist({ isAppleMusic: true })}
                    >
                      <AppleLogo />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        duration: 1.5,
                        bounce: 0.6,
                      }}
                      className={clsx(styles["footer-text"], styles.spotify)}
                      onClick={() => openPlaylist({ isSpotify: true })}
                    >
                      <SpotifyLogo />
                    </motion.button>
                    {swiper && swiper?.activeIndex <= 3 ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          type: "spring",
                          duration: 1.5,
                          bounce: 0.6,
                        }}
                        className={clsx(styles["footer-text"], styles.youtube)}
                        onClick={() => openPlaylist({ isYoutube: true })}
                      >
                        <YoutubeLogo />
                      </motion.button>
                    ) : (
                      <Fragment />
                    )}
                  </div>
                </footer>
              </Fragment>
            ) : (
              <Fragment>
                <div className={styles.container}>
                  <div className={styles["container-mob"]}>
                    <div className={styles["hero-mobile"]}>
                      <div className={styles.hero}>
                        <h6>{language.album}</h6>
                        <ScrambleText
                          tag={"h1"}
                          key={
                            swiper?.activeIndex === 2
                              ? "VOODOO"
                              : swiper?.activeIndex === 3
                                ? "SLAYER"
                                : swiper?.activeIndex === 1
                                  ? "BEAST MODE"
                                  : swiper?.activeIndex === 0
                                    ? "VOODOO CHRONICLES, VOL. 1"
                                    : "VOODOO"
                          }
                          duration={0.4}
                          text={
                            swiper?.activeIndex === 2
                              ? "VOODOO"
                              : swiper?.activeIndex === 3
                                ? "SLAYER"
                                : swiper?.activeIndex === 1
                                  ? "BEAST MODE"
                                  : swiper?.activeIndex === 0
                                    ? "VOODOO CHRONICLES, VOL. 1"
                                    : "VOODOO"
                          }
                        />
                      </div>
                      <div className={styles.slider}>
                        <Swiper
                          effect={"coverflow"}
                          grabCursor={true}
                          centeredSlides={true}
                          slidesPerView={"auto"}
                          spaceBetween={0}
                          coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: false,
                          }}
                          modules={[EffectCoverflow, Navigation, Pagination]}
                          pagination={{
                            el: paginationRef.current,
                            clickable: true,
                            bulletActiveClass: styles.active,
                            bulletClass: styles.bullets,
                          }}
                          speed={700}
                          navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                          }}
                          onSlideChange={(swiperCore) => {
                            setSwiper({
                              activeIndex: swiperCore.activeIndex,
                              slides: swiperCore.slides,
                            });
                          }}
                          onInit={(swiperCore) => {
                            setSwiper({
                              activeIndex: swiperCore.activeIndex,
                              slides: swiperCore.slides,
                            });
                          }}
                        >
                          <SwiperSlide>
                            <img src={Image4} alt={"first"} />
                          </SwiperSlide>
                          <SwiperSlide>
                            <img src={Image3} alt={"second"} />
                          </SwiperSlide>
                          <SwiperSlide>
                            <img src={Image1} alt={"third"} />
                          </SwiperSlide>
                          <SwiperSlide>
                            <img src={Image2} alt={"forth"} />
                          </SwiperSlide>
                        </Swiper>
                        {isMobileDevice ? (
                          <div className={styles["bullets-wrapper"]}>
                            <div
                              ref={paginationRef}
                              className={styles["bullets-inside"]}
                            >
                              <div
                                className={styles["bullets-pagination"]}
                              ></div>
                            </div>
                            <div className={styles.arrows}>
                              <div
                                ref={prevRef}
                                className={clsx([
                                  styles["button-arrow"],
                                  styles["prev"],
                                  swiper && swiper?.activeIndex === 0
                                    ? styles.disabled
                                    : "",
                                ])}
                              >
                                <LazyLoadImage src={Arrow} alt={"Left arrow"} />
                              </div>
                              <div
                                ref={nextRef}
                                className={clsx([
                                  styles["button-arrow"],
                                  styles["next"],
                                  swiper && swiper?.activeIndex === 3
                                    ? styles.disabled
                                    : "",
                                ])}
                              >
                                <LazyLoadImage
                                  src={Arrow}
                                  alt={"Right arrow"}
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <Fragment />
                        )}
                      </div>
                      <footer>
                        <div className={styles.title}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{
                              type: "spring",
                              duration: 1.5,
                              bounce: 0.6,
                            }}
                            className={clsx(
                              styles["footer-text"],
                              styles.apple
                            )}
                            onClick={() => openPlaylist({ isAppleMusic: true })}
                          >
                            <AppleLogo />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{
                              type: "spring",
                              duration: 1.5,
                              bounce: 0.6,
                            }}
                            className={clsx(
                              styles["footer-text"],
                              styles.spotify
                            )}
                            onClick={() => openPlaylist({ isSpotify: true })}
                          >
                            <SpotifyLogo />
                          </motion.button>
                          {swiper && swiper?.activeIndex <= 1 ? (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              transition={{
                                type: "spring",
                                duration: 1.5,
                                bounce: 0.6,
                              }}
                              className={clsx(
                                styles["footer-text"],
                                styles.youtube
                              )}
                              onClick={() => openPlaylist({ isYoutube: true })}
                            >
                              <YoutubeLogo />
                            </motion.button>
                          ) : (
                            <Fragment />
                          )}
                        </div>
                        <div className={styles.infos}>
                          <ScrambleText
                            duration={0.4}
                            key={getDateText(swiper?.activeIndex)}
                            text={getDateText(swiper?.activeIndex)}
                          />
                          <h1>{language.written}</h1>
                          <span>{language.swipeDown}</span>
                        </div>
                      </footer>
                    </div>
                    <div className={styles["footer-mobile"]}>
                      <motion.div
                        className={styles["footer-parallax-title"]}
                        // style={{ y: y3, x: 0, opacity: op3 }}
                      >
                        <h6>{language.album}</h6>
                        <h1>{language.songs}</h1>
                      </motion.div>
                      <motion.div
                        className={styles["footer-parallax"]}
                        // style={{ y: y3, x: 0, opacity: op3 }}
                      >
                        <div>{renderText(swiper?.activeIndex)}</div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </Fragment>
            )}
          </motion.div>
        </Layout>
        {/* <Modal /> */}
      </Inner>
    </Fragment>
  );
}
