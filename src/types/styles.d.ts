// Copyright (c) Jonathan Ferraz.
// Licensed under the MIT license.

declare module '*.css' {
  const content: { [className: string]: string };
  // eslint-disable-next-line import/no-unused-modules
  export default content;
}

declare module '*.scss' {
  const content: { [className: string]: string };
  // eslint-disable-next-line import/no-unused-modules
  export default content;
}

declare module '*.sass' {
  const content: { [className: string]: string };
  // eslint-disable-next-line import/no-unused-modules
  export default content;
}

declare module '*.svg' {
  import type * as React from 'react';

  // eslint-disable-next-line import/no-unused-modules
  export const ReactComponent: React.FunctionComponent<
    React.ComponentProps<'svg'> & { title?: string }
  >;
  // eslint-disable-next-line import/no-unused-modules
  export default ReactComponent;
}
