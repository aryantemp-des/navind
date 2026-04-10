// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react';

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { url?: string };
      }
    }
  }
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { url?: string };
    }
  }
}
