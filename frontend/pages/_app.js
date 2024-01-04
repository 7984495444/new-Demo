import { useEffect } from "react";
import Script from "next/script";
// import Layout from "@/components/Layout";
import "../styles/global.scss";
import { Provider } from "react-redux";
import store, { wrapper } from "../redux/store";
// import the Head component for appending elements to the head of the page
import Head from "next/head";
import "../utils/i18nextInit";

function App({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap");
  }, []);

  const HOTJAR_ENABLED =
    process.env.NEXT_PUBLIC_DEVELOPMENT_TYPE === "production";

  return (
    <>
      {/* Add the favicon */}
      <Head>
        {/* <link rel="apple-touch-icon" sizes="57x57" href="favicons/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="favicons/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="favicons/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="favicons/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="favicons/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="favicons/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="favicons/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="favicons/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="favicons/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="favicons/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="favicons/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="favicons/favicon-16x16.png" /> */}
        <link rel="shortcut icon" href="favicons/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>
        {/* <link rel="manifest" href="favicons/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="favicons/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" /> */}
      </Head>
      <title>Succes Scolaire</title>
      {/* <Layout> */}
      <Script>
        {" "}
        {`window.markerConfig = { project: '642c2fe98b36b6e14f14804b', source: 'snippet' };`}{" "}
      </Script>
      <Script>
        {" "}
        {`!function(e,r,a){if(!e.__Marker){e.__Marker={};var t=[],n={__cs:t};["show","hide","isVisible","capture","cancelCapture","unload","reload","isExtensionInstalled","setReporter","setCustomData","on","off"].forEach(function(e){n[e]=function(){var r=Array.prototype.slice.call(arguments);r.unshift(e),t.push(r)}}),e.Marker=n;var s=r.createElement("script");s.async=1,s.src="https://edge.marker.io/latest/shim.js";var i=r.getElementsByTagName("script")[0];i.parentNode.insertBefore(s,i)}}(window,document);`}{" "}
      </Script>
      {HOTJAR_ENABLED && (
        <Script>
          {`(function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:3799106,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
        </Script>
      )}
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
      {/* </Layout> */}
    </>
  );
}
export default App;
