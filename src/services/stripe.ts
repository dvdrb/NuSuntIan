// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import api from './api';

import { useMutation, useQuery } from '@tanstack/react-query';
import type { ExtraQueryParams } from 'helpers/utils/reactQuery';
import { Mutations, Queries } from 'libraries/queries';
import type { ClothesType } from 'store/data';

const createCartMutation = `
  mutation cartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
        totalQuantity
        lines(first: 10) {
          edges {
            node {
              id
              quantity
            } 
          }
        }
      }
    }
  }
`;

export const useShopifyCreateOrder = () => {
  const mutationFn = async ({
    items,
  }: {
    items: Omit<ClothesType, 'className'>[];
  }) => {
    const lines = items.map((item) => ({
      merchandiseId: `gid://shopify/ProductVariant/${item.id}`, // make sure this exists on each item
      quantity: item.quantity ?? 1,
    }));

    const response = await fetch(import.meta.env.VITE_SHOPIFY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': import.meta.env
          .VITE_SHOPIFY_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query: createCartMutation,
        variables: { lines },
      }),
    });

    const result = await response.json();

    if (!response.ok || result.errors) {
      throw new Error(
        result.errors?.[0]?.message || 'Shopify cart creation failed'
      );
    }

    return result.data.cartCreate.cart;
  };

  return useMutation({
    mutationKey: [Mutations.PostCreateOrder],
    mutationFn,
    retry: 1,
    retryDelay: 2000,
    gcTime: Infinity,
  });
};

export const useStripeOrder = (
  sessionId?: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extra?: ExtraQueryParams<any>
) => {
  const url = `${import.meta.env.VITE_STRIPE_API}/order?session_id=${sessionId}`;

  const queryFn = async () => {
    const req = await api.get(url);

    return req.data;
  };

  return useQuery({
    queryKey: [Queries.GetOrder],
    staleTime: 1000 * 60, // 1 minuto
    refetchOnWindowFocus: false,
    retry: 0,
    ...(extra ?? {}),
    queryFn,
  });
};

export const useStripeRefund = () => {
  const url = `${import.meta.env.VITE_STRIPE_API}/refund-payment`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mutationFn = (data: { sessionId: string }) => {
    return api.post(url, JSON.stringify({ session_id: data.sessionId }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  return useMutation({
    mutationKey: [Mutations.PostRefundPayment],
    mutationFn,
    retry: 0,
    retryDelay: 1000 * 2, // 2 seconds
    gcTime: Infinity,
  });
};
