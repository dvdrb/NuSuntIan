// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

import { Fragment } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';

import Countdown from 'components/countdown/countdown';

function Ended(): JSX.Element {
  return (
    <Fragment>
      <Countdown time={false} ended />
    </Fragment>
  );
}

export default Ended;
