import { ChakraProvider, Flex } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { AppProps } from "next/app";
import { Navbar } from "../components/navigation/Navbar";
import theme from "../theme/index";
import { createUrqlClient } from "../utils/createUrqlClient";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Flex direction="column" align="center" justify="center">
        <Navbar />
        <Component {...pageProps} />
      </Flex>
    </ChakraProvider>
  );
}

export default withUrqlClient(createUrqlClient)(MyApp);
