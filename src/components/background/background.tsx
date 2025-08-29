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
  const [shouldShowVideo, setShouldShowVideo] = useState<boolean>(false);
  const getVideoByIndex = (index: number | undefined) => {
    switch (index) {
      case 0:
        return chronicles;
      case 1:
        return Beastmode;
      case 2:
        return Voodoo;
      case 3:
        return Slayer;
      default:
        return isHome ? Home : chronicles;
    }
  };

  const [currentVideo, setCurrentVideo] = useState<string>(
    getVideoByIndex(swipe?.activeIndex)
  );

  const maxScroll = useRef<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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
    // Defer loading video until after first paint/idle and avoid on slow networks.
    // Keep video enabled on Music pages (isHome === false), even on small screens.
    const conn: any = (navigator as any).connection || {};
    const slow = ["slow-2g", "2g"].includes(conn.effectiveType);
    const reduceData = (navigator as any).connection?.saveData === true;
    const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;

    const allowOnThisPage = !isHome || (isHome && !isSmallScreen);

    if (!slow && !reduceData && allowOnThisPage) {
      const idle =
        (window as any).requestIdleCallback ||
        ((cb: any) => setTimeout(cb, 1200));
      idle(() => setShouldShowVideo(true));
    } else {
      setShouldShowVideo(true); // Fallback for when conditions aren't met
    }
  }, [isHome]);

  useEffect(() => {
    if (swipe) {
      const newVideo = getVideoByIndex(swipe.activeIndex);

      if (newVideo !== currentVideo) {
        setIsTransitioning(true);
        setCurrentVideo(newVideo);
        // Give React a tick to apply new src, then reload
        setTimeout(() => {
          const v = videoRef.current;
          if (v) {
            try {
              v.pause();
              v.load();
              // Autoplay may reject on some devices; ignore silently
              const p = v.play();
              if (p && typeof p.then === 'function') p.catch(() => {});
            } catch {}
          }
          setIsTransitioning(false);
        }, 50);
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
        fetchPriority="high"
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
          key={currentVideo}
          ref={videoRef}
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
          <source key={currentVideo} src={currentVideo} type="video/webm" />
        </video>
      )}
    </div>
  );
}
