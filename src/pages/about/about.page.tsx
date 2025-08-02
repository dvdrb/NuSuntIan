// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

import styles from "./about.module.scss";

import { Container, Footer, Header, Inner } from "components";

import Logo from "assets/icons/logo-vector-red.svg";
import Routes from "enum/routes.enum";
import { clsx } from "helpers/utils/HTMLUtils";
import languageValues from "locales/language";
import { Helmet } from "react-helmet-async";

const language = languageValues.pages.presentation;

export default function Presentation() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>About IAN — Romanian Urban Artist & Visionary</title>
        <meta
          name="description"
          content="Learn about IAN’s journey as a pioneering Romanian urban artist with over 350K monthly listeners. Discover his vision, inspirations, and creative process."
        />
        <meta
          property="og:title"
          content="About IAN — Romanian Urban Artist & Visionary"
        />
        <meta
          property="og:description"
          content="Discover the story behind IAN — his influences, achievements, and creative evolution."
        />
        <meta
          property="og:image"
          content="https://www.nusuntian.com/ian-bg.webp"
        />
        <meta property="og:url" content="https://www.nusuntian.com/about" />
      </Helmet>

      <Inner>
        <Header showFooter />
        <div className={styles.root}>
          <div className={clsx([styles.bg, styles.ian])} />
          <Container className={styles.content}>
            <div className={styles.header}>
              <span>{language.ian.function}</span>
              <h1>{language.ian.title}</h1>
              <p>{language.ian.text}</p>
            </div>
            <div className={styles.middle}>
              <figure onClick={() => navigate(Routes.HOME)}>
                <LazyLoadImage src={Logo} alt={"Logo"} />
              </figure>
            </div>
            <footer className={styles.footer}>{language.ian.footer()}</footer>
          </Container>
        </div>
        <Footer />
      </Inner>
    </Fragment>
  );
}
