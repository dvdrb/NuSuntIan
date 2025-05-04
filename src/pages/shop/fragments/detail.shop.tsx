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
import { OmitClothes } from "store/cartStore";
import {
  clsx,
  formatCurrency,
  isNullOrUndefined,
} from "helpers/utils/HTMLUtils";
import useScreenSize from "hooks/useScreenSize";
import languageValues from "locales/language";
import { useCartStore } from "store/cartStore";
import { Swiper, SwiperSlide } from "swiper/react";
import { clothes } from "store/data";

const language = languageValues.pages.shop.productView;

type Breakpoints = {
  [key: number]: {
    slidesPerView: number;
  };
};
const fetchProductVariants = async (productGid: string) => {
  const response = await fetch(
    "https://ianheadquarters.myshopify.com/api/2025-04/graphql.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": "272ad7957566fc7e85fac151033d4505",
      },
      body: JSON.stringify({
        query: `query getProduct($id: ID!) {
          product(id: $id) {
            id
            title
            variants(first: 100) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }`,
        variables: {
          id: productGid,
        },
      }),
    }
  );

  const result = await response.json();

  if (!response.ok || result.errors) {
    throw new Error(
      result.errors?.[0]?.message || "Failed to fetch product variants"
    );
  }

  return result.data.product.variants.edges.map((edge: any) => edge.node);
};
import { ClothesType } from "store/data";
import { fetchProductsFromShopify } from "./available.shop";

export const enrichClothesInPlace = async () => {
  for (const product of clothes) {
    const productGid = `gid://shopify/Product/${product.id}`;

    try {
      const fetchedVariants = await fetchProductVariants(productGid);

      const formattedVariants: ClothesType[] = fetchedVariants.map((v: any) => {
        const size =
          v.selectedOptions.find((o: any) => o.name === "Size")?.value || "";
        const colorValue =
          v.selectedOptions.find((o: any) => o.name === "Color")?.value || "";

        return {
          ...product,
          id: v.id.split("/").pop()!, // Shopify variant ID (short)
          size,
          color: {
            color: "", // optionally map to HEX or similar
            label: colorValue,
          },
          variants: undefined, // avoid recursive nesting
        };
      });

      // 🔁 Mutate directly
      product.variants = formattedVariants;
    } catch (error) {
      console.error(
        `Failed to fetch variants for product ${product.id}`,
        error
      );
    }
  }
};

export const DetailProduct = () => {
  const [size, setSize] = useState<string>("");
  const [resetSize, setResetSize] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [specifiItem, setSpecifiItem] = useState<OmitClothes | null>(null);
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Wait for the product fetch to complete
        await fetchProductsFromShopify();

        // Then enrich the products
        await enrichClothesInPlace();
        items.find((item) => {
          if (item.id === params.id) {
            setSpecifiItem(item);
          }
        });
      } catch (error) {
        console.error("Error fetching and enriching products:", error);
      }
    };

    fetchData(); // Call the async function
  }, []); // Empty dependency array means this runs only once on mount

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

  console.log(specifiItem);

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
    if (!specifiItem?.variants) return;

    // Find the variant matching the selected size
    const selectedVariant = specifiItem.variants.find(
      (variant) => variant.size === size
    );

    if (!selectedVariant) {
      console.warn("Variant not found for selected size");
      return;
    }
    console.log(selectedVariant);
    console.log(specifiItem);
    // Create the item to be added to the cart using the specific variant
    const newItem = {
      ...specifiItem,
      id: selectedVariant.id, // Use the specific variant ID
      size: selectedVariant.size,
      color: color, // Optional: You can still include color if you want
      quantity: 1, // Default quantity
    };

    // Add the item to the cart
    addToCart(newItem);

    // Reset size and color selections
    setResetSize(true);
    setTimeout(() => {
      toggleMenu();
      setResetSize(false);
      setColor({ label: "", color: "" });
      setSize("");
    }, 150);
  }, [specifiItem, size, addToCart, toggleMenu]);

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
                          <h6>{`${item.name.title}” ${item.name.type}`}</h6>
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
