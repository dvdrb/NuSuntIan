// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import { useEffect, useRef, useState } from "react";

import styles from "./background.module.scss";

import Beastmode from "assets/video/BEASTMODE.webm";
import Home from "assets/video/shop-bg.webm";
import Slayer from "assets/video/SLAYER.webm";
import Voodoo from "assets/video/VOODOO.webm";
import chronicles from "assets/video/chronicles.webm";
// Use public asset path so preload in index.html matches
const Poster = "/ian-bg.webp" as const;
import { clsx } from "helpers/utils/HTMLUtils";

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
  const [shouldShowVideo, setShouldShowVideo] = useState<boolean>(false);

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

      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
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
    // Defer loading video until after first paint/idle and avoid on slow networks
    const conn: any = (navigator as any).connection || {};
    const slow = ["slow-2g", "2g"].includes(conn.effectiveType);
    const reduceData = (navigator as any).connection?.saveData === true;

    if (!slow && !reduceData) {
      const idle = (window as any).requestIdleCallback || ((cb: any) => setTimeout(cb, 1200));
      idle(() => setShouldShowVideo(true));
    }
  }, []);

  useEffect(() => {
    if (swipe) {
      const getVideoUrl = () => {
        switch (swipe.activeIndex) {
          case 2:
            return Voodoo;
          case 3:
            return Slayer;
          case 1:
            return Beastmode;
          case 0:
            return chronicles;
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
      {/* Lightweight poster for fast LCP */}
      <img
        src={Poster}
        alt="Background"
        loading="eager"
        decoding="async"
        fetchpriority="high"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: isTransitioning ? 0 : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
      />
      {shouldShowVideo && (
        <video
          muted
          autoPlay
          loop
          playsInline
          preload="none"
          poster={Poster}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: isTransitioning ? 0 : 1,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          <source src={currentVideo} type="video/webm" />
        </video>
      )}
    </div>
  );
}
