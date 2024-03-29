import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';

// import inject from '@stylexjs/dev-runtime';

// new inject({
//   classNamePrefix: 'x',
//   dev: true,
//   test: false,
//   styleResolution: 'property-specificity',
//   useRemForFontSize: true,
// });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
