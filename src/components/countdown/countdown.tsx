// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import { Fragment } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';

import styles from './countdown.module.scss';

import Col from 'components/col/col';
import Noise from 'components/noise/noise';
import Row from 'components/row/row';

import Logo from 'assets/icons/logo-vector-red.svg?react';
import Video from 'assets/video/shop-bg.webm';
import Routes from 'enum/routes.enum';

export interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

interface CountdownProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  time: any;
  ended?: boolean;
}

export default function Countdown({
  time,
  ended,
}: CountdownProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Row className={styles['countdown-root']}>
        {ended ? (
          <Row>
            <Col
              tag={'header'}
              alignment={'center'}
              onClick={() => navigate(Routes.HOME)}
            >
              <Logo />
            </Col>
            <Col alignment={'center'} className={styles.body}>
              <span>SOON</span>
              <h1>SOON</h1>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col tag={'header'} alignment={'center'}>
              <Logo />
              <h1>
                <b>01</b> DROP
              </h1>
            </Col>
            <Col alignment={'center'} className={styles.body}>
              <span>
                {typeof time !== 'boolean'
                  ? `${time.days}:${time.hours}:${time.minutes}:${time.seconds}`
                  : '11 JULY 00:00'}
              </span>
              <h1>
                {typeof time !== 'boolean'
                  ? `${time.days}:${time.hours}:${time.minutes}:${time.seconds}`
                  : 'ORDER PERIOD ENDED'}
              </h1>
            </Col>
          </Row>
        )}
      </Row>
      <div className={styles.video}>
        <ReactPlayer
          muted={true}
          playing={true}
          loop={true}
          playsinline={true}
          url={Video}
          width={'100%'}
          height={'100%'}
        />
      </div>
      <Noise position={'fixed'} />
    </Fragment>
  );
}
