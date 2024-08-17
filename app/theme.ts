import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";
import './globals.css'

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      bg: mode("#050505", "#202023")(props), 
      color: "#ffffff", 
    },
  }),
};

const components = {
  Link: {
    baseStyle: (props: StyleFunctionProps) => ({
      color: mode("#3d7aed", "#ff63c3")(props),
      textUnderlineOffset: 3,
    }),
  },
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles,
  components,
  fonts: {
    body: '"SF Pro Text", "SF Pro Icons", "AOS Icons", "Helvetica Neue", "Helvetica", "Arial", "sans-serif", "system-ui"',
    heading: '"Georgia", "serif"',
  },
  colors: {
    gray: {
      50: "#f7fafc",
      900: "#171923",
    },
  },
});

export default theme;