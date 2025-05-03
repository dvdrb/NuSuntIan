// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import { Fragment, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import styles from './fragments.module.scss';

import { Collapse } from 'components';
import Noise from 'components/noise/noise';

import { zodResolver } from '@hookform/resolvers/zod';
import Close from 'assets/icons/close.svg?react';
import Logo from 'assets/icons/logo-vector.svg';
import ModalImage from 'assets/images/modal-image.webp';
import { ScreenSize } from 'enum/screensizes.enum';
import { AnimatePresence, motion } from 'framer-motion';
import useScreenSize from 'hooks/useScreenSize';
import useStorageState from 'hooks/useStorageState';
import language from 'locales/language';
import type { NeverMissSchemaType } from 'schema/neverMiss';
import { NeverMissSchema } from 'schema/neverMiss';
// import { todosRef } from 'services/firebase';
// import { dbRef } from 'services/firebase';

export default function Modal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { size: value, rankedSize: ranked } = useScreenSize();

  const [show, setShow] = useStorageState<string>(
    window.localStorage,
    'neverMissADrop'
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isMobileDevice = useMemo(() => ranked <= ScreenSize.sm, [value]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<NeverMissSchemaType>({
    resolver: zodResolver(NeverMissSchema),
  });

  const submit = (_?: { email: string }) => {
    // todosRef.push({
    //   id: crypto.randomUUID(),
    //   date: new Date().toISOString(),
    //   isDev: (import.meta.env.VITE_NODE_ENV as string) === 'development',
    //   email: e.email,
    // });

    return;
  };

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, 10000);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (show === undefined || show === 'true') && (
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            type: 'spring',
            duration: 0.7,
          }}
        >
          <motion.div
            className={styles['modal-content']}
            initial={isMobileDevice ? { y: 200 } : { scale: 0, opacity: 0 }}
            animate={isMobileDevice ? { y: 0 } : { scale: 1, opacity: 1 }}
            exit={isMobileDevice ? { y: 500 } : { scale: 0, opacity: 0 }}
            transition={{
              type: 'spring',
              duration: 0.7,
              bounce: isMobileDevice ? 0.2 : 0.4,
            }}
          >
            <div className={styles['modal-left']}>
              <Noise position={'absolute'} zIndex={0} />

              <div className={styles['modal-hero-left']}>
                <figure className={styles['modal-hero-left-figure']}>
                  <LazyLoadImage src={Logo} alt={'Logo'} />
                </figure>
                <span>MUSIC & MERCH</span>
                <h1>NEVER MISS A DROP</h1>
              </div>
              <form
                onSubmit={handleSubmit((e) => submit(e))}
                className={styles['modal-hero-form']}
              >
                <div className={styles['input-content']}>
                  <input
                    type={'email'}
                    placeholder={'EMAIL ADDRESS'}
                    data-error={!!errors.email}
                    {...register('email')}
                  />
                  <Collapse opened={!!errors.email}>
                    <span>{errors?.email?.message}</span>
                  </Collapse>
                </div>
                <div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    data-disabled={!!errors.email}
                    disabled={!!errors.email}
                    transition={{
                      type: 'spring',
                      duration: 1.5,
                      bounce: 0.6,
                    }}
                    onClick={() => {
                      setTimeout(() => {
                        reset(undefined, { keepDefaultValues: true });
                        setShow('false');
                      }, 350);
                    }}
                    type={'submit'}
                  >
                    {language.components.buttons.getOnTheList}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: 'spring',
                      duration: 1.5,
                      bounce: 0.6,
                    }}
                    onClick={() => {
                      reset(undefined, { keepDefaultValues: true });
                      setShow('false');
                    }}
                    type={'button'}
                  >
                    {language.components.buttons.noThk}
                  </motion.button>
                </div>
              </form>
            </div>
            {!isMobileDevice ? (
              <div className={styles['modal-right']}>
                <figure>
                  <LazyLoadImage src={ModalImage} alt={'right'} />
                </figure>
              </div>
            ) : (
              <Fragment />
            )}
            <button className={styles.close} onClick={() => setShow('false')}>
              <Close />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
