// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import { Colors } from 'enum/shop.enum';

export type ClothesType = {
  id: string;
  name: {
    title: string;
    type: string;
  };
  className?: string;
  size: string;
  color: {
    color: string;
    label: Colors | string;
  };
  availableSizes?: string[];
  quantity: number;
  image: string;
  images: string[];
  price: number;
  description: string[];
  variants?: ClothesType[];
};

export const clothes: ClothesType[] = [];
