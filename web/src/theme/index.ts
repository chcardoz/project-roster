import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { colors } from "./colors";
import styles from "./styles";

const fonts = { mono: `'Helvetica', monospace` };

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme({
  colors: colors,
  fonts,
  breakpoints,
  styles: styles,
});

export default theme;
