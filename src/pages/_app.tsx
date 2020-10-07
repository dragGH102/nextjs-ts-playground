import '../../styles/global.scss';
import React from 'react';

export default function App({ Component, pageProps }): JSX.Element {
  return <Component {...pageProps} />;
}
