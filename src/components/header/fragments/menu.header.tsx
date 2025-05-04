// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import { LazyLoadImage } from "react-lazy-load-image-component";
import BounceLoader from "react-spinners/BounceLoader";
import { Bounce, toast } from "react-toastify";
import { Fragment } from "react/jsx-runtime";

import styles from "../header.module.scss";

import Col from "components/col/col";
import Row from "components/row/row";

import { Total } from "./total.shop";

import Close from "assets/icons/close.svg?react";
import { AnimatePresence, motion } from "framer-motion";
import { clsx, formatCurrency } from "helpers/utils/HTMLUtils";
import languageValues from "locales/language";
import { useShopifyCreateOrder } from "services/stripe";
import { useCartStore } from "store/cartStore";
import type { ClothesType } from "store/data";

const language = languageValues.components.header;

type MenuType = {
  onClose: () => void;
};

export default function Menu({ onClose }: MenuType) {
  const [items, removeToCart, updateItem, addToOrder, clearCart] = useCartStore(
    (state) => [
      state.cart,
      state.removeFromCart,
      state.updateCartItem,
      state.addToOrder,
      state.clearCart,
    ]
  );

  const { mutate, isPending } = useShopifyCreateOrder();

  const handleSubmit = () => {
    return mutate(
      { items: items },
      {
        onSuccess: async (cartData) => {
          // Instead of using Stripe, use the Shopify checkout URL
          const checkoutUrl = cartData.checkoutUrl;
          const returnTo = encodeURIComponent(
            "https://nu-sunt-ian.vercel.app//shop"
          ); // Change this to your desired return path
          const url = new URL(checkoutUrl);
          url.searchParams.set("return_to", returnTo);
          // Get the checkout URL from the Shopify response

          addToOrder(items as unknown as ClothesType);

          setTimeout(() => {
            clearCart();
          }, 100);

          // Redirect the user to Shopify's checkout page
          window.location.href = url.toString(); // Redirects to Shopify checkout page
        },
        onError: () => {
          toast.error("There was an error, please wait and try again later", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        },
      }
    );
  };

  return (
    <motion.div
      className={styles["cart-menu"]}
      initial={{ x: 600 }}
      animate={{ x: 0 }}
      exit={{ x: 610 }}
      transition={{
        x: { type: "spring", bounce: 0 },
        opacity: { duration: 0.1 },
      }}
    >
      <header className={styles.header}>
        <h1>{language.cart}</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: "spring",
            duration: 1.5,
            bounce: 0.6,
          }}
          onClick={onClose}
        >
          <Close />
        </motion.button>
      </header>

      <div className={styles.content}>
        <div className={styles.main}>
          <div className={clsx(styles.items, !items.length && styles.display)}>
            {items.length ? (
              <AnimatePresence>
                {items?.map((item, index: number) => (
                  <motion.div
                    key={`${item.id}-${index}`}
                    className={styles.item}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                  >
                    <div className={styles["item-picture"]}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          type: "spring",
                          duration: 1.5,
                          bounce: 0.6,
                        }}
                        onClick={() => {
                          removeToCart(item.id);
                        }}
                      >
                        <Close />
                      </motion.button>
                      <figure>
                        <LazyLoadImage src={item.image} alt={"Item"} />
                      </figure>
                    </div>
                    <div className={styles.info}>
                      <b>{`“${item.name.title}”`}&nbsp;</b>
                      <h2>{item.name.type}</h2>
                      <p>
                        {item.description[1]} - {item.size}
                      </p>
                    </div>
                    <div className={styles["price-content"]}>
                      <div className={styles.quantity}>
                        <input
                          type={"text"}
                          inputMode={"numeric"}
                          placeholder={String(item.quantity)}
                          value={item.quantity}
                          min={1}
                          max={1000}
                          maxLength={4}
                          onKeyDown={(event) =>
                            event.ctrlKey ||
                            event.altKey ||
                            (47 < event.keyCode &&
                              event.keyCode < 58 &&
                              event.shiftKey == false) ||
                            (95 < event.keyCode && event.keyCode < 106) ||
                            event.keyCode == 8 ||
                            event.keyCode == 9 ||
                            (event.keyCode > 34 && event.keyCode < 40) ||
                            event.keyCode == 46
                          }
                          onMouseMove={() => {
                            if (item.quantity === 0) {
                              removeToCart(item.id);
                            }
                          }}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            updateItem(item.id, {
                              quantity: Number(e.target.value),
                            });
                          }}
                        />
                      </div>
                      <p>{formatCurrency.format(item.price)}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  flex: "1",
                  display: "flex",
                  placeContent: "center",
                  placeItems: "center",
                }}
              >
                {language.empty}
              </div>
            )}
          </div>
          {items.length ? (
            <footer className={styles.footer}>
              <Row>
                <Col className={styles.fee}>
                  <h3>
                    <b>Delivery</b>&nbsp;fee
                  </h3>
                  <span>{formatCurrency.format(20)}</span>
                </Col>
                <Col alignment={"end"}>
                  <Total />
                </Col>
              </Row>
              <div className={styles.btns}>
                <motion.button
                  type={"button"}
                  onClick={handleSubmit}
                  disabled={isPending}
                  aria-disabled={isPending}
                  tabIndex={isPending ? -1 : 0}
                >
                  {isPending ? (
                    <BounceLoader color={"#fff"} size={16} />
                  ) : (
                    languageValues.components.buttons.checkout
                  )}
                </motion.button>
              </div>
            </footer>
          ) : (
            <Fragment />
          )}
        </div>
      </div>
    </motion.div>
  );
}
