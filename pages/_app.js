import * as React from "react";
import { QueryProvider } from "../context/QueryProvider";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <QueryProvider>{getLayout(<Component {...pageProps} />)}</QueryProvider>
    </>
  );
}

export default MyApp;
