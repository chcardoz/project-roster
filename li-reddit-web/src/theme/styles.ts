/*
Glovbal style overrides
*/
import { mode } from "@chakra-ui/theme-tools";

const styles = {
  global: (props) => ({
    // styles for the `body`
    body: {
      bg: mode("white", "black")(props), //setting light and dark mode global styles
      color: mode("raisin", "linen")(props),
    },
  }),
};

export default styles;
