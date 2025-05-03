// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import styles from '../header.module.scss';

import { formatCurrency } from 'helpers/utils/HTMLUtils';
import languageValues from 'locales/language';
import { useCartStore } from 'store/cartStore';

const language = languageValues.components.header;

export const Total = () => {
  const items = useCartStore((state) => state.cart);
  const sum = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className={styles.total}>
      {language.subtotal(formatCurrency.format(sum + 20))}
    </div>
  );
};
