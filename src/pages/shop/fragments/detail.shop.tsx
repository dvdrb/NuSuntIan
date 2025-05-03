// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./fragments.module.scss";
import { Navigation } from "swiper/modules";

import {
  Col,
  Container,
  Meta,
  Row,
  ScrambleText,
  SizeSelector,
} from "components";

import "swiper/css";

import Arrow from "assets/icons/arrow.svg";
import Limited from "assets/icons/limited-product.svg?react";
import { ScreenSize } from "enum/screensizes.enum";
import { type Colors } from "enum/shop.enum";
import { AnimatePresence, motion } from "framer-motion";
import {
  clsx,
  formatCurrency,
  isNullOrUndefined,
} from "helpers/utils/HTMLUtils";
import useScreenSize from "hooks/useScreenSize";
import languageValues from "locales/language";
import { useCartStore } from "store/cartStore";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetchProductsFromShopify } from "./available.shop";

const language = languageValues.pages.shop.productView;

type Breakpoints = {
  [key: number]: {
    slidesPerView: number;
  };
};

export const DetailProduct = () => {
  const [size, setSize] = useState<string>("");
  const [resetSize, setResetSize] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [swiper, setSwiper] = useState<{
    activeIndex: number;
    slides: unknown[] | undefined;
    currentBreakpoint: string;
  }>();
  const [color, setColor] = useState<{
    color: string;
    label: Colors | string;
  }>({
    color: "",
    label: "",
  });

  const navigate = useNavigate();
  const params = useParams();

  const [items, addToCart, toggleMenu] = useCartStore((state) => [
    state.availableItems,
    state.addToCart,
    state.toggleMenu,
  ]);

  const picRefs = useRef<Array<HTMLDivElement | null>>([null, null, null]);

  const { size: value, rankedSize: ranked } = useScreenSize();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isMobile = useMemo(() => ranked <= ScreenSize.sm, [value]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data only if items is empty
    if (items.length === 0) {
      const fetchData = async () => {
        await fetchProductsFromShopify();
        setLoading(false);
      };

      fetchData();
    } else {
      setLoading(false); // Set loading to false if items are already available
    }
  }, [items]); // Runs when items change, triggering fetch only when empty

  const specifiItem = useMemo(() => {
    // Check if data is loaded and find the specific item
    if (loading || !items?.length || !params.id) return null;
    return items.find((item) => String(item.id) === String(params.id));
  }, [items, params.id, loading]);

  const alsoLikeItems = useMemo(() => {
    return items
      .filter((item) => item.id !== params.id)
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  }, [items, params.id]);

  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const breakpoints: Breakpoints = useMemo(
    () => ({
      100: { slidesPerView: 1 },
      400: { slidesPerView: 1 },
      560: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1100: { slidesPerView: 3 },
      1360: { slidesPerView: 4 },
    }),
    []
  );

  const handleClick = useCallback(() => {
    const newItem = {
      ...specifiItem!,
      id: crypto.randomUUID(),
      size: size,
      color: color,
      quantity: 1,
    };

    addToCart(newItem);
    setResetSize(true);
    setTimeout(() => {
      toggleMenu();
      setResetSize(false);
      setColor({ label: "", color: "" });
      setSize("");
    }, 150);
  }, [specifiItem, size, color, addToCart, toggleMenu]);

  const handleMouseMove = useCallback((index: number, e: MouseEvent) => {
    const pic = picRefs.current[index];
    if (!pic) return;

    const bounds = pic.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    const img = pic.querySelector("img");
    if (!img) return;

    img.style.transition = "transform 0.2s ease";
    img.style.transformOrigin = `${x}px ${y}px`;
    img.style.transform = "scale(2)";
  }, []);

  const handleMouseLeave = useCallback((index: number) => {
    const pic = picRefs.current[index];
    if (!pic) return;

    const img = pic.querySelector("img");
    if (!img) return;

    img.style.transition = "transform 0.2s ease";
    img.style.transformOrigin = "center center";
    img.style.transform = "scale(1)";
  }, []);

  const getSlidesPerView = () => {
    const breakpoint = swiper?.currentBreakpoint;
    return (
      (breakpoint && breakpoints[parseInt(breakpoint)]?.slidesPerView) || 1
    );
  };

  const isLastVisibleSlide = () => {
    const slidesPerView = getSlidesPerView();
    return swiper?.activeIndex !== undefined &&
      swiper?.slides?.length !== undefined
      ? swiper.activeIndex >= swiper.slides.length - slidesPerView
      : false;
  };

  useEffect(() => {
    if (!isMobile) {
      const currentRefs = picRefs.current;
      currentRefs.forEach((pic, index) => {
        if (!pic) return;

        const mouseMoveListener = (e: MouseEvent) => handleMouseMove(index, e);
        const mouseLeaveListener = () => handleMouseLeave(index);

        pic.addEventListener("mousemove", mouseMoveListener);
        pic.addEventListener("mouseleave", mouseLeaveListener);

        return () => {
          pic.removeEventListener("mousemove", mouseMoveListener);
          pic.removeEventListener("mouseleave", mouseLeaveListener);
        };
      });
    }
  }, [isMobile, handleMouseMove, handleMouseLeave]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    const body = document.querySelector("body");
    if (!isNullOrUndefined(selectedId)) {
      body?.classList.add("no-overflow");
    } else {
      body?.classList.remove("no-overflow");
    }
  }, [selectedId]);

  return (
    <Fragment>
      <Meta title={"Product detail"} />
      <div className={styles.detail}>
        <motion.div
          transition={{ duration: 0.4 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Container className={styles.container}>
            <Row className={styles["container-internal"]}>
              <Row className={styles.content}>
                <Col className={styles.left}>
                  <Row>
                    <Col alignment={"center"}>
                      <Limited />
                    </Col>
                    <Col alignment={"center"}>
                      <h1>
                        “
                        <ScrambleText
                          tag={"b"}
                          text={specifiItem?.name.title as string}
                        />
                        ”
                        <br />
                        <ScrambleText text={specifiItem?.name.type as string} />
                      </h1>
                    </Col>
                    <Col alignment={"center"}>
                      <p>
                        {specifiItem?.description[0]} <br />
                        {specifiItem?.description[1]}
                      </p>
                    </Col>
                    <Col alignment={"center"}>
                      <span className={styles.span}>
                        {formatCurrency.format(Number(specifiItem?.price))}
                      </span>
                    </Col>
                    <Col className={styles.sizes} alignment={"center"}>
                      <span>SIZE</span>
                      <div>
                        <SizeSelector
                          options={
                            specifiItem?.availableSizes?.map((item) => item) ??
                            []
                          }
                          callback={(e) => setSize(e)}
                          resetValue={resetSize}
                        />
                      </div>
                    </Col>
                    <Col className={styles.button} alignment={"center"}>
                      <motion.button
                        whileHover={!size ? {} : { scale: 1.05 }}
                        whileTap={!size ? {} : { scale: 0.95 }}
                        transition={{
                          type: "spring",
                          duration: 1.5,
                          bounce: 0.6,
                        }}
                        disabled={!size}
                        onClick={handleClick}
                      >
                        {languageValues.components.buttons.addCard}
                      </motion.button>
                    </Col>
                  </Row>
                </Col>
                <Col className={styles.right}>
                  <motion.div
                    layoutId={"pic1"}
                    ref={(el) => (picRefs.current[0] = el)}
                    className={clsx([styles.pic1])}
                    onClick={() => setSelectedId("pic1")}
                  >
                    <LazyLoadImage src={specifiItem?.images[0]} alt={"one"} />
                  </motion.div>
                  <motion.div
                    layoutId={"pic2"}
                    ref={(el) => (picRefs.current[1] = el)}
                    className={clsx([styles.pic2])}
                    onClick={() => setSelectedId("pic2")}
                  >
                    <LazyLoadImage src={specifiItem?.images[1]} alt={"two"} />
                  </motion.div>
                  <motion.div
                    layoutId={"pic3"}
                    ref={(el) => (picRefs.current[2] = el)}
                    className={clsx([styles.pic3])}
                    onClick={() => setSelectedId("pic3")}
                  >
                    <LazyLoadImage src={specifiItem?.images[2]} alt={"three"} />
                  </motion.div>
                </Col>
              </Row>
            </Row>
            <AnimatePresence>
              {selectedId && (
                <motion.div
                  className={styles.modal}
                  onClick={() => setSelectedId(null)}
                >
                  <motion.div layoutId={selectedId}>
                    <LazyLoadImage
                      src={
                        selectedId === "pic1"
                          ? specifiItem?.images[0]
                          : selectedId === "pic2"
                            ? specifiItem?.images[1]
                            : specifiItem?.images[2]
                      }
                      alt={"zoom-image"}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {selectedId && (
                <motion.div
                  className={styles.overlay}
                  onClick={() => setSelectedId(null)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              )}
            </AnimatePresence>
          </Container>

          <Row tag={"footer"}>
            <Container className={styles.contfooter}>
              <div className={styles.header}>
                <span>{language.footer.title}</span>
                <h1>{language.footer.description}</h1>
              </div>
              <div>
                <Swiper
                  spaceBetween={40}
                  centeredSlides={false}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Navigation]}
                  navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }}
                  breakpoints={breakpoints}
                  className={styles.clothes}
                  onSlideChange={(swiperCore) => {
                    setSwiper({
                      activeIndex: swiperCore.activeIndex,
                      slides: swiperCore.slides,
                      currentBreakpoint: swiperCore.currentBreakpoint,
                    });
                  }}
                  onInit={(swiperCore) => {
                    setSwiper({
                      activeIndex: swiperCore.activeIndex,
                      slides: swiperCore.slides,
                      currentBreakpoint: swiperCore.currentBreakpoint,
                    });
                  }}
                >
                  {alsoLikeItems.map((item) => (
                    <SwiperSlide
                      key={item.id}
                      className={styles["shirt-container"]}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          type: "spring",
                          damping: 25,
                          stiffness: 120,
                        }}
                        role={"button"}
                        tabIndex={0}
                        className={styles["shirt-item"]}
                        onClick={() => {
                          window.scroll({
                            behavior: "smooth",
                            top: 0,
                            left: 0,
                          });
                          navigate(`/shop/product/${item.id}`);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            window.scroll({
                              behavior: "smooth",
                              top: 0,
                              left: 0,
                            });
                            navigate(`/shop/product/${item.id}`);
                          }
                        }}
                      >
                        <LazyLoadImage
                          src={item.image}
                          className={item.className ?? ""}
                          alt={item.name.title}
                        />
                        <div>
                          <h6>{`“${item.name.title}” ${item.name.type}`}</h6>
                          <p>{item.description[1]}</p>
                          <p>{formatCurrency.format(item.price)}</p>
                        </div>
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Fragment>
                  <div
                    ref={prevRef}
                    className={clsx([
                      styles["btn-arrow"],
                      styles["button-prev"],
                      swiper && swiper?.activeIndex === 0
                        ? styles.disabled
                        : "",
                    ])}
                    aria-disabled={swiper?.activeIndex === 0}
                  >
                    <LazyLoadImage src={Arrow} alt={"Left arrow"} />
                  </div>
                  <div
                    ref={nextRef}
                    className={clsx([
                      styles["btn-arrow"],
                      styles["button-next"],
                      swiper && swiper && isLastVisibleSlide()
                        ? styles.disabled
                        : "",
                    ])}
                    aria-disabled={
                      swiper?.activeIndex === (swiper?.slides?.length ?? 1) - 1
                    }
                  >
                    <LazyLoadImage src={Arrow} alt={"Right arrow"} />
                  </div>
                </Fragment>
              </div>
            </Container>
          </Row>
        </motion.div>
      </div>
    </Fragment>
  );
};
