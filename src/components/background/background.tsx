// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

import styles from './background.module.scss';

import Beastmode from 'assets/video/BEASTMODE.webm';
import Home from 'assets/video/shop-bg.webm';
import Slayer from 'assets/video/SLAYER.webm';
import Voodoo from 'assets/video/VOODOO.webm';
import { clsx } from 'helpers/utils/HTMLUtils';

type BGType = {
  isHome?: boolean;
  swipe?: {
    activeIndex: number;
    slides: unknown[] | undefined;
  };
  disableScroll?: boolean;
};

export default function Background({
  swipe,
  isHome,
  disableScroll = false,
}: BGType) {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [currentVideo, setCurrentVideo] = useState<string>(
    isHome ? Home : Voodoo
  );

  const maxScroll = useRef<number>(0);

  useEffect(() => {
    if (!disableScroll) {
      maxScroll.current =
        document.documentElement.scrollHeight - window.innerHeight;

      const handleScroll = () => {
        requestAnimationFrame(() => {
          setScrollPosition(window.scrollY);
        });
      };

      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [disableScroll]);

  const calculateBlur = () => {
    if (scrollPosition === 0) {
      return 0;
    } else {
      const maxBlur = 25;
      const blur = (scrollPosition / maxScroll.current) * maxBlur;
      return Math.min(blur, maxBlur - 10);
    }
  };

  const blurStyle = {
    backdropFilter: `blur(${calculateBlur()}px)`,
    WebkitBackdropFilter: `blur(${calculateBlur()}px)`,
  };

  useEffect(() => {
    if (swipe) {
      const getVideoUrl = () => {
        switch (swipe.activeIndex) {
          case 0:
            return Voodoo;
          case 1:
            return Slayer;
          case 2:
            return Beastmode;
          default:
            return Home;
        }
      };

      const newVideo = getVideoUrl();

      if (newVideo !== currentVideo) {
        setIsTransitioning(true);

        setTimeout(() => {
          setCurrentVideo(newVideo);
          setIsTransitioning(false);
        }, 300);
      }
    }
  }, [swipe, currentVideo]);

  return (
    <div
      tabIndex={-1}
      aria-disabled={true}
      className={clsx(styles.bg, isHome && styles.blur)}
      style={{ filter: `${blurStyle.backdropFilter}` }}
    >
      <ReactPlayer
        muted={true}
        playing={true}
        loop={true}
        playsinline={true}
        url={currentVideo}
        width={'100%'}
        height={'100%'}
        style={{
          transition: 'opacity 0.3s ease-in-out',
          opacity: isTransitioning ? 0 : 1,
        }}
      />
    </div>
  );
}
