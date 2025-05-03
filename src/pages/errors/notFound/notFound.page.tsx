// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

import styles from './notFound.module.scss';

import { Layout, Meta, Noise } from 'components';

import Logo from 'assets/icons/logo-vector.svg';
import Routes from 'enum/routes.enum';
import { AnimatePresence, motion } from 'framer-motion';
import languageValues from 'locales/language';

const language = languageValues.pages.error.notFound;

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Meta title={'Not Found'} />
      <Noise position={'fixed'} />
      <Layout renderContainer>
        <AnimatePresence>
          <motion.div
            transition={{ duration: 0.6 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className={styles.container}>
              <figure onClick={() => navigate(Routes.HOME)} role='presentation'>
                <LazyLoadImage src={Logo} alt={'Logo'} />
              </figure>
              <h6>{language.noAccess}</h6>
              <span>{language.description}</span>
              <div className={styles['countdown-content']}>
                <span>{language.title.back}</span>
                <p>{language.title.emphasys}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', duration: 1.5, bounce: 0.6 }}
                onClick={() => navigate(Routes.HOME)}
              >
                {languageValues.components.buttons.goHome}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </Layout>
    </Fragment>
  );
}
