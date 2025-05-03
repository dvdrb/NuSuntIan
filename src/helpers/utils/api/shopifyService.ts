// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import { clothes } from 'store/data';

type ShopifyImage = {
  node: {
    src: string;
  };
};

type ShopifyVariant = {
  node: {
    id: string;
    price: string;
    availableForSale: boolean;
  };
};

export type ShopifyProduct = {
  name: {
    title: string;
    type: string;
  };
  id: string;
  title: string;
  descriptionHtml: string;
  images: {
    edges: ShopifyImage[];
  };
  variants: {
    edges: ShopifyVariant[];
  };
  category: {
    name: string;
  };
};

export const fetchProductsFromShopify = async (): Promise<ShopifyProduct[]> => {
  const response = await fetch(
    'https://ianheadquarters.myshopify.com/api/2025-04/graphql.json',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': '272ad7957566fc7e85fac151033d4505', // Replace with your access token
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
  const mappedProducts = data.data.products.edges.map((edge: any) => ({
    id: edge.node.id.split('/').pop(),
    name: { title: edge.node.title, type: edge.node.category.name }, // Adjust this as needed
    description: [edge.node.description, ''], // Sample description, you can modify this as needed
    image: edge.node.images.edges[0]?.node.src || '',

    price: parseFloat(edge.node.variants.edges[0].node.priceV2.amount),
    color: { color: 'default', label: 'Default' }, // Adjust based on your data model
    quantity: 1, // Adjust this as needed, maybe based on stock data
    availableSizes: ['S', 'M', 'L', 'XL', '2XL'], // You can adjust this or derive it from other data
    images: edge.node.images.edges.slice(1).map((img: any) => img.node.src), // ✅ Other 3 images
  }));
  // Push the mapped products to the clothes array
  clothes.push(...mappedProducts); // This mutates the clothes array
  return data.data.products.edges.map((edge: any) => ({
    id: edge.node.id.split('/').pop(),
    name: { title: edge.node.title, type: edge.node.category.name }, // Adjust this as needed
    description: [edge.node.description, ''], // Sample description, you can modify this as needed
    image: edge.node.images.edges[0]?.node.src || '',

    price: parseFloat(edge.node.variants.edges[0].node.priceV2.amount),
    color: { color: 'default', label: 'Default' }, // Adjust based on your data model
    quantity: 1,
    availableSizes: ['S', 'M', 'L', 'XL', '2XL'], // You can adjust this as needed
    images: edge.node.images.edges.slice(1).map((img: any) => img.node.src), // ✅ Other 3 images
  }));
};
