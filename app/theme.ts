import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";
import './globals.css'

const themeColors = [
  { name: "Midnight Navy", color: "#121c2b" },    // Sunday
  { name: "Ledger", color: "#171923" },           // Monday
  { name: "Dark charcoal", color: "#1c1c1c" },    // Tuesday
  { name: "Charcoal Denim", color: "#2b3545" },   // Wednesday
  { name: "Event Horizon", color: "#191521" },    // Thursday
  { name: "Twilight Blue", color: "#1a2639" },    // Friday
  { name: "Deep Space", color: "#0f1724" },       // Saturday
];

const getDailyThemeColor = () => {
  const date = new Date();
  const dayOfWeek = date.getDay(); // 0 for Sunday, 1 for Monday, etc.
  return themeColors[dayOfWeek].color;
};

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      bg: mode(getDailyThemeColor(), "#050505")(props),
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

const forceDarkMode = () => {
  localStorage.setItem("chakra-ui-color-mode", "dark");
};

// Call the function when the theme is imported
if (typeof window !== 'undefined') {
  forceDarkMode();
}

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