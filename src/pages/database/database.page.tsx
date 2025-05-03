// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import { useEffect, useLayoutEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

import styles from './database.module.scss';

import { Col, Container, Header, Inner, Meta, Noise, Row } from 'components';

import { zodResolver } from '@hookform/resolvers/zod';
import Logo from 'assets/icons/logo-vector.svg';
import dayjs from 'dayjs';
import format from 'dayjs/plugin/customParseFormat';
import Routes from 'enum/routes.enum';
import { AnimatePresence, motion } from 'framer-motion';
import { clsx } from 'helpers/utils/HTMLUtils';
import languageValues from 'locales/language';
import type { AdministratorSchemaType } from 'schema/administrator';
import { AdministratorSchema } from 'schema/administrator';
// import { todosRef } from 'services/firebase';

dayjs.extend(format);

const language = languageValues.pages.database;

export default function Database() {
  const [show, setShow] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const [todos, setTodos] = useState<any>([]);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdministratorSchemaType>({
    resolver: zodResolver(AdministratorSchema),
  });

  const handleAccess = (data: { name: string; password: string }) => {
    if (data.name === 'admin' && data.password === 'hqadmin00!ian') {
      setShow(true);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // todosRef.on('value', (snapshot: any) => {
    //   const items = snapshot.val();
    //   const newState = [];
    //   for (const item in items) {
    //     newState.push({
    //       id: item,
    //       email: items[item].email,
    //       isDev: items[item].isDev,
    //       date: items[item].date,
    //     });
    //   }
    //   setTodos(newState);
    // });
  }, []);

  useLayoutEffect(() => {
    window.scroll({ behavior: 'smooth', top: 0, left: 0 });
  }, []);

  return (
    <Fragment>
      <Meta title={'Database'} />
      <Inner>
        <Noise position={'fixed'} zIndex={-1} />
        <div className={styles.root}>
          <motion.div
            initial={'hidden'}
            whileInView={'visible'}
            transition={{ duration: 0.6 }}
            variants={{
              visible: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
          >
            <Container>
              <AnimatePresence>
                {!show && (
                  <motion.div
                    transition={{ duration: 0.4 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={styles.content}
                  >
                    <div className={styles.hero}>
                      <figure onClick={() => navigate(Routes.HOME)}>
                        <LazyLoadImage src={Logo} alt={'Logo'} />
                      </figure>
                      {language.title}
                    </div>
                    <form
                      className={styles.form}
                      onSubmit={handleSubmit(handleAccess as never)}
                    >
                      <input
                        type={'text'}
                        placeholder={language.form.inputs.login}
                        // eslint-disable-next-line no-extra-boolean-cast
                        className={!!errors.name ? styles.error : ''}
                        {...register('name')}
                      />
                      {!!errors.name && <span>{errors.name.message}</span>}
                      <input
                        type={'password'}
                        placeholder={language.form.inputs.password}
                        // eslint-disable-next-line no-extra-boolean-cast
                        className={!!errors.password ? styles.error : ''}
                        {...register('password')}
                      />
                      {!!errors.password && (
                        <span>{errors.password.message}</span>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          type: 'spring',
                          duration: 1.5,
                          bounce: 0.6,
                        }}
                        type={'submit'}
                      >
                        {language.form.button}
                      </motion.button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {show && (
                  <motion.div
                    transition={{ duration: 0.4 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={styles.content}
                  >
                    <Header />
                    <Container>
                      <Row>
                        <Col>
                          <h1>
                            <b>IAN HQ</b> DATABASE
                          </h1>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div
                            className={clsx(
                              styles['product-table'],
                              styles.flextable
                            )}
                          >
                            {/* <div className={styles.tbody}>
                              <div className={clsx(styles.thead, styles.trow)}>
                                <div className={styles.tcell}>EMAILS</div>
                                <div className={styles.tcell}>DATE</div>
                                <div className={styles.tcell}>
                                  TOTAL{' '}
                                  {
                                    todos.filter(
                                      (todo: {
                                        email: string;
                                        date: string;
                                        isDev: boolean;
                                      }) => !todo.isDev
                                    ).length
                                  }
                                </div>
                              </div>
                              {todos
                                .filter(
                                  (todo: {
                                    email: string;
                                    date: string;
                                    isDev: boolean;
                                  }) => !todo.isDev
                                )
                                .map(
                                  (todo: { email: string; date: string }) => (
                                    <div
                                      className={styles.trow}
                                      key={crypto.randomUUID()}
                                    >
                                      <div className={styles.tcell}>
                                        {todo.email}
                                      </div>
                                      <div className={styles.tcell}>
                                        SUBSCRIBED ON{' '}
                                        {dayjs(todo.date).format('DD/MM/YYYY')}
                                      </div>
                                      <div className={styles.tcell}> </div>
                                    </div>
                                  )
                                )}
                            </div> */}
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  </motion.div>
                )}
              </AnimatePresence>
            </Container>
          </motion.div>
        </div>
      </Inner>
    </Fragment>
  );
}
