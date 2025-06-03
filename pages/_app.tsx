// _app.tsx

import '../styles/globals.css';

interface Props {
  Component: React.ComponentType;
  pageProps: any;
}

function MyApp({ Component, pageProps }: Props) {
  return <Component {...pageProps} />;
}

export default MyApp;