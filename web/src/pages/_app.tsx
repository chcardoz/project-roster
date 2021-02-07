import { createStyles, makeStyles, ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withUrqlClient } from "next-urql";
import { AppProps } from "next/app";
import Head from "next/head";
import React, { useEffect } from "react";
import { Navbar } from "../components/navigation/Navbar";
import theme from "../theme/index";
import { createUrqlClient } from "../utils/createUrqlClient";
import "./date-picker.css";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
    },
  })
);

function MyApp({ Component, pageProps }: AppProps) {
  const classes = useStyles();

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
        <div className={classes.root}>
          <CssBaseline />
          <Navbar />
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </>
  );
}

export default withUrqlClient(createUrqlClient)(MyApp);
