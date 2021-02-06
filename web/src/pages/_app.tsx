import { ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withUrqlClient } from "next-urql";
import { AppProps } from "next/app";
import { Head } from "next/document";
import { useEffect } from "react";
import theme from "../theme/index";
import { createUrqlClient } from "../utils/createUrqlClient";
import "./date-picker.css";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Roster management</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default withUrqlClient(createUrqlClient)(MyApp);
