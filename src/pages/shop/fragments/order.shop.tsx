// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import { Fragment, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';

import styles from './fragments.module.scss';

import { Meta } from 'components';

import Thanks from 'assets/icons/thk.svg?react';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import format from 'dayjs/plugin/customParseFormat';
import Routes from 'enum/routes.enum';
import { motion } from 'framer-motion';
import languageValues from 'locales/language';
import { useStripeOrder, useStripeRefund } from 'services/stripe';
import { useCartStore } from 'store/cartStore';

dayjs.extend(format);

const language = languageValues.pages.shop.order;

export const Order = () => {
  const [awbNumber, setAwbNumber] = useState<string>();
  const [items, clearOrder] = useCartStore((state) => [
    state.order,
    state.clearOrder,
  ]);

  const navigate = useNavigate();
  const location = useLocation();

  const sessionId = new URLSearchParams(location.search).get('session_id');

  const { data, isError } = useStripeOrder(sessionId!, {
    enabled: !!sessionId && items !== undefined,
  });

  const { mutate } = useStripeRefund();

  useEffect(() => {
    if (isError) {
      mutate(
        { sessionId: sessionId! },
        {
          onSuccess: async () => {
            toast.error(
              'An error occurred while processing the payment. You will receive a refund! Please try again, and if the issue persists, contact us.',
              {
                position: 'top-right',
                autoClose: 8000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                transition: Bounce,
              }
            );
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onError: (err: Error) => {
            if (err instanceof AxiosError) {
              if (
                err.response &&
                err.response.data &&
                err.response.data.error
              ) {
                toast.error(err.response.data.error, {
                  position: 'top-right',
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: 'dark',
                  transition: Bounce,
                });
              } else if (err.message) {
                toast.error(err.message, {
                  position: 'top-right',
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: 'dark',
                  transition: Bounce,
                });
              } else {
                toast.error('Unknown error occurred', {
                  position: 'top-right',
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: 'dark',
                  transition: Bounce,
                });
              }
            } else {
              toast.error(err.message || 'Unknown error occurred', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
                transition: Bounce,
              });
            }
          },
          onSettled: () => {
            const searchParams = new URLSearchParams(location.search);
            searchParams.delete('session_id');

            const queryString = searchParams.toString();
            const newUrl = `${location.pathname}${queryString ? `?${queryString}` : ''}`;
            history.replaceState({}, '', newUrl);
          },
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  useEffect(() => {
    if (data) {
      setAwbNumber(data.awbNumber);

      const searchParams = new URLSearchParams(location.search);
      searchParams.delete('session_id');

      const queryString = searchParams.toString();
      const newUrl = `${location.pathname}${queryString ? `?${queryString}` : ''}`;
      history.replaceState({}, '', newUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <Fragment>
      <Meta title={'Your order'} />
      <motion.div
        transition={{ duration: 0.6 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className={styles['order']}>
          <div className={styles.header}>
            <Thanks />
            <span>ORDER HAS BEEN PLACED</span>
          </div>
          <div className={styles.parent}>
            <div className={styles['div1']}>
              <div className={styles.content}>
                <div className={styles['text-content']}>
                  <p>{language.purchaseDate}</p>
                  <h1 style={!awbNumber ? { width: '50%' } : {}}>
                    {awbNumber! ? (
                      dayjs().format('DD.MM.YYYY')
                    ) : (
                      <div style={{ width: '100%' }}>
                        <SkeletonTheme
                          baseColor={'#202020'}
                          highlightColor={'#444'}
                        >
                          <Skeleton />
                        </SkeletonTheme>
                      </div>
                    )}
                  </h1>
                </div>
              </div>
            </div>
            <div className={styles['div2']}>
              <div className={styles.content}>
                <div className={styles['text-content']}>
                  <p>{language.trackingNumber} </p>
                  <h1 style={!awbNumber ? { width: '50%' } : {}}>
                    {awbNumber! ? (
                      awbNumber
                    ) : (
                      <SkeletonTheme
                        baseColor={'#202020'}
                        highlightColor={'#444'}
                      >
                        <Skeleton />
                      </SkeletonTheme>
                    )}
                  </h1>
                </div>
                <div className={styles.divider} />
                <div className={styles['text-content']}>
                  <p>{language.status}</p>
                  <h1 style={!awbNumber ? { width: '50%' } : {}}>
                    {awbNumber! ? (
                      'PROCESSING'
                    ) : (
                      <SkeletonTheme
                        baseColor={'#202020'}
                        highlightColor={'#444'}
                      >
                        <Skeleton />
                      </SkeletonTheme>
                    )}
                  </h1>
                </div>
              </div>
            </div>
            <div className={styles['div3']}>
              <div className={styles.content}>
                <div className={styles['text-content']}>
                  <p>{language.order}</p>
                  <h1>{language.receive}</h1>
                  <div className={styles.orders}>
                    {items.map((clothes, index: number) => {
                      return (
                        <div key={index} className={styles.clothes}>
                          <LazyLoadImage
                            src={clothes.image}
                            alt={`${clothes.name.title} - clothes`}
                          />
                          <span>QUANTITY {clothes.quantity}</span>
                          <h1>
                            <b>{clothes.name.title}</b>
                            {clothes.name.type} - {clothes.size}
                          </h1>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <motion.button
            whileHover={awbNumber ? { scale: 1.05 } : {}}
            whileTap={awbNumber ? { scale: 0.95 } : {}}
            transition={{
              type: 'spring',
              duration: 1.5,
              bounce: 0.6,
            }}
            onClick={() => {
              clearOrder();
              navigate(Routes.SHOP);
            }}
            disabled={!awbNumber}
          >
            {languageValues.components.buttons.goToShop}
          </motion.button>
        </div>
      </motion.div>
    </Fragment>
  );
};
