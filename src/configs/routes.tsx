// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import { Outlet, createBrowserRouter } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

import { GTag } from 'components';

import Routes from 'enum/routes.enum';
import About from 'pages/about/about.page';
import Database from 'pages/database/database.page';
import Ended from 'pages/errors/ended/ended';
import NotFound from 'pages/errors/notFound/notFound.page';
import Home from 'pages/home/home.page';
import Music from 'pages/music/music.page';
import Privacy from 'pages/politica/privacy/privacy.page';
import PoliticaReturn from 'pages/politica/retur/retur.page';
import TermsAndConds from 'pages/politica/terms/terms.page';
import { AvailableProducts } from 'pages/shop/fragments/available.shop';
import { DetailProduct } from 'pages/shop/fragments/detail.shop';
import { Order } from 'pages/shop/fragments/order.shop';
import Shop from 'pages/shop/shop.page';

const routes = createBrowserRouter(
  [
    {
      path: Routes.HOME,
      element: (
        <Fragment>
          <Home />
          <GTag useGA={true} />
        </Fragment>
      ),
    },
    {
      path: Routes.ENDED,
      element: (
        <Fragment>
          <Ended />
        </Fragment>
      ),
    },
    {
      path: Routes.SHOP,
      element: (
        <Fragment>
          <Outlet />
          <GTag useGA={true} />
        </Fragment>
      ),
      children: [
        {
          index: true,
          element: (
            <Fragment>
              <Shop>
                <AvailableProducts />
              </Shop>
              <GTag useGA={true} />
            </Fragment>
          ),
        },
        {
          path: Routes.SHOP_DETAILS,
          element: (
            <Fragment>
              <Shop>
                <DetailProduct />
              </Shop>
              <GTag useGA={true} />
            </Fragment>
          ),
        },
        {
          path: Routes.ORDER,
          element: (
            <Fragment>
              <Shop>
                <Order />
              </Shop>
              <GTag useGA={true} />
            </Fragment>
          ),
        },
      ],
    },
    {
      path: Routes.POLITICA,
      element: (
        <Fragment>
          <PoliticaReturn />
          <GTag useGA={true} />
        </Fragment>
      ),
    },
    {
      path: Routes.TERMS,
      element: (
        <Fragment>
          <TermsAndConds />
          <GTag useGA={true} />
        </Fragment>
      ),
    },
    {
      path: Routes.PRIVACY,
      element: (
        <Fragment>
          <Privacy />
          <GTag useGA={true} />
        </Fragment>
      ),
    },
    {
      path: Routes.MUSIC,
      element: (
        <Fragment>
          <Music />
          <GTag useGA={true} />
        </Fragment>
      ),
    },
    {
      path: Routes.ABOUT,
      element: (
        <Fragment>
          <About />
          <GTag useGA={true} />
        </Fragment>
      ),
    },
    {
      path: Routes.DATABASE,
      element: (
        <Fragment>
          <Database />
          <GTag useGA={true} />
        </Fragment>
      ),
    },
    {
      path: '*',
      element: (
        <Fragment>
          <NotFound />
          <GTag useGA={true} />
        </Fragment>
      ),
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);

export default routes;
