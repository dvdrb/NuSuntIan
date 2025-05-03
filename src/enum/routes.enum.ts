// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

enum Routes {
  HOME = '/',
  MUSIC = '/music',
  SHOP = '/shop',
  ENDED = '/ended',
  SHOP_DETAILS = '/shop/product/:id?',
  ORDER = '/shop/order/:id?',
  ABOUT = '/about',
  TERMS = '/terms-conds',
  PRIVACY = '/privacy-policy',
  POLITICA = '/politica-retur',
  DATABASE = '/database',
  NOTFOUND = '*',
  ERROR = '/error',
}

export default Routes;
