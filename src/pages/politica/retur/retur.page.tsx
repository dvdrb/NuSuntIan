// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import { Fragment, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../politica.module.scss";

import { Container, Inner, Noise } from "components";
import { Helmet } from "react-helmet-async";

import Logo from "assets/icons/logo-vector.svg?react";
import { motion } from "framer-motion";
import languageValues from "locales/language";

const language = languageValues.pages.politica.retur;

export default function PoliticaReturn() {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    window.scroll({ top: 0, left: 0 });
  }, []);

  // Title handled via Helmet

  return (
    <Fragment>
      <Helmet>
        <title>Politica Retur</title>
      </Helmet>
      <Inner>
        <Noise position={"fixed"} />
        <Container className={styles.root}>
          <header>
            <Logo />
            <h1>{language.title}</h1>
          </header>
          <div>
            {language.text()}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", duration: 1.5, bounce: 0.6 }}
              onClick={() => navigate(-1)}
            >
              {languageValues.components.buttons.goBack}
            </motion.button>
          </div>
        </Container>
      </Inner>
    </Fragment>
  );
}
