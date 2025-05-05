// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import {
  Fragment,
  memo,
  useCallback,
  useLayoutEffect,
  useState,
  useEffect,
} from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

import styles from "./fragments.module.scss";

import { Meta, Row, ScrambleText } from "components";

import { ClothesType } from "enum/shop.enum";
import { motion } from "framer-motion";
import {
  clsx,
  formatCurrency,
  isNullOrUndefined,
} from "helpers/utils/HTMLUtils";
import language from "locales/language";
import { ShopifyProduct } from "helpers/utils/api/shopifyService"; // Import your fetch function
import { clothes } from "store/data";

// Function to fetch products from Shopify Storefront API
export const fetchProductsFromShopify = async (): Promise<ShopifyProduct[]> => {
  const response = await fetch(
    "https://ianheadquarters.myshopify.com/api/2025-04/graphql.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": "272ad7957566fc7e85fac151033d4505", // Replace with your access token
      },
      body: JSON.stringify({
        query: `
         query getProducts {
          products(first: 10) {
            edges {
              node {
                id
                title
                images(first: 4) {
                  edges {
                    node {
                      src
                    }
                  }
                }
                variants(first: 1) {
                  edges {
                    node {
                      id
                      title
                      priceV2 {
                        amount
                        currencyCode
                      }
                      availableForSale
                    }
                  }
                }
                  description
                  category {
          name
        }
              }
            }
          }
        }
  
  
      `,
      }),
    }
  );

  const data = await response.json();
  const newProducts = data.data.products.edges.map((edge: any) => ({
    id: edge.node.id.split("/").pop(),
    name: { title: edge.node.title, type: edge.node.category.name },
    description: [edge.node.description, ""],
    image: edge.node.images.edges[0]?.node.src || "",
    price: parseFloat(edge.node.variants.edges[0].node.priceV2.amount),
    color: { color: "default", label: "Default" },
    quantity: 1,
    availableSizes: ["S", "M", "L", "XL", "2XL"],
    images: edge.node.images.edges.slice(1).map((img: any) => img.node.src),
  }));

  // Filter out duplicates by checking if the ID already exists in `clothes`

  // Add only unique ones to the store
  clothes.length = 0; // ✅ Clear the array
  clothes.push(...newProducts); // ✅ Push only current fetch

  return data.data.products.edges.map((edge: any) => ({
    id: edge.node.id.split("/").pop(),
    name: { title: edge.node.title, type: edge.node.category.name }, // Adjust this as needed
    description: [edge.node.description, ""], // Sample description, you can modify this as needed
    image: edge.node.images.edges[0]?.node.src || "",

    price: parseFloat(edge.node.variants.edges[0].node.priceV2.amount),
    color: { color: "default", label: "Default" }, // Adjust based on your data model
    quantity: 1,
    availableSizes: ["S", "M", "L", "XL", "2XL"], // You can adjust this as needed
    images: edge.node.images.edges.slice(1).map((img: any) => img.node.src), // ✅ Other 3 images
  }));
};

export const AvailableProducts = () => {
  const [sortType, setSortType] = useState<ClothesType | undefined>(undefined);
  const [products, setProducts] = useState<ShopifyProduct[]>([]); // State for products
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProducts = await fetchProductsFromShopify(); // Fetch products from Shopify
        setProducts(fetchedProducts || []); // Ensure it's an array
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []); // This effect runs once on component mount

  const sortedItems = useCallback(
    (type: ClothesType) => {
      return !isNullOrUndefined(sortType)
        ? products.filter((item) => item.name.type === type)
        : products;
    },
    [products, sortType]
  );

  const handleSortTypeChange = useCallback((type: ClothesType | undefined) => {
    setSortType(type);
  }, []);

  const itemAnim = {
    hidden: { y: 300, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  };

  useLayoutEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }, []);

  return (
    <Fragment>
      <Meta title={"Product detail"} />
      <motion.div
        transition={{ duration: 0.6 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className={styles["available-products"]}>
          <header className={styles.header}>
            <div>
              <motion.button
                className={clsx(
                  styles["nav-button"],
                  sortType === ClothesType.SHIRT && styles.active
                )}
                variants={itemAnim}
                exit={{ y: 300, opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  handleSortTypeChange(ClothesType.SHIRT);
                }}
              >
                <span>{ClothesType.SHIRT}</span>
              </motion.button>
              <motion.button
                className={clsx(
                  styles["nav-button"],
                  sortType === ClothesType.HOODIE && styles.active
                )}
                variants={itemAnim}
                exit={{ y: 300, opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  handleSortTypeChange(ClothesType.HOODIE);
                }}
              >
                <span>{ClothesType.HOODIE}</span>
              </motion.button>
              <motion.button
                className={clsx(
                  styles["nav-button"],
                  sortType === ClothesType.SHORTS && styles.active
                )}
                variants={itemAnim}
                exit={{ y: 300, opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  handleSortTypeChange(ClothesType.SHORTS);
                }}
              >
                <span>{ClothesType.SHORTS}</span>
              </motion.button>
              <motion.button
                className={clsx(
                  styles["nav-button"],
                  sortType === undefined && styles.active
                )}
                variants={itemAnim}
                exit={{ y: 300, opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSortType(undefined);
                }}
              >
                <span>{language.components.buttons.all}</span>
              </motion.button>
            </div>
            <h1>{language.pages.shop.ends()}</h1>
          </header>
          <Row className={styles["clothes-content"]}>
            {/* Ensure products is defined before rendering */}
            {products && sortedItems(sortType!).length > 0 ? (
              sortedItems(sortType!).map((clothes) => (
                <ClothesItem
                  key={clothes.id}
                  clothes={clothes}
                  navigate={navigate}
                />
              ))
            ) : (
              <p>No products found</p> // Display a fallback message
            )}
          </Row>
        </div>
      </motion.div>
    </Fragment>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ClothesItem = memo(({ clothes, navigate }: any) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{
      type: "spring",
      damping: 25,
      stiffness: 120,
    }}
    className={clsx([
      styles["shirt-item"],
      clothes.name.type === ClothesType.HOODIE ? styles.hoodie : "",
    ])}
    onClick={() => navigate(`/shop/product/${clothes.id}`)}
  >
    <LazyLoadImage
      src={clothes.image}
      className={clothes.className ?? ""}
      alt={clothes.name.title}
    />
    <div className={styles.description}>
      <ScrambleText
        tag={"h6"}
        text={`“${clothes.name.title}” ${clothes.name.type}`}
      />
      <p>{clothes.description[1]}</p>
      <p>{formatCurrency.format(clothes.price)}</p>
    </div>
  </motion.div>
));

ClothesItem.displayName = "ClothesItem";
