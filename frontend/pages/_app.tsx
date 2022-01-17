import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          ></meta>
          <link rel="shortcut icon" href="/favicon.ico" />
          <title>Lego2me</title>
        </head>
        <NextNProgress color="#D01020" />
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
}

export default MyApp;
