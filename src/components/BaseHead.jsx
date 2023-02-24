import React from "react";
import Head from "next/head";
import { Global } from "@emotion/react";
import { STYLES_GLOBAL } from "styles";

function BaseHead() {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="msapplication-TileColor" content="#fdfaec" />
        <meta name="theme-color" content="#fdfaec" />
      </Head>
      <Global styles={STYLES_GLOBAL} />
    </>
  );
}

export default React.memo(BaseHead);
