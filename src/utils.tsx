import { PaperTheme, CustomThemeColors } from "./types";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";

const defaultLightTheme: PaperTheme = {
  dark: false,
  roundness: 4,
  colors: {
    primary: "rgb(0, 122, 255)",
    accent: "#03dac4",
    background: "rgb(242, 242, 242)",
    surface: "#ffffff",
    error: "#B00020",
    text: "rgb(28, 28, 30)",
    onBackground: "#000000",
    onSurface: "#000000",
    disabled: "rgba(0, 0, 0, 0.26)",
    placeholder: "rgba(0, 0, 0, 0.54)",
    backdrop: "rgba(0, 0, 0, 0.5)",
    notification: "#f50057",
    card: "rgb(255, 255, 255)",
    border: "rgb(224, 224, 224)",
  },
  fonts: {
    regular: {
      fontFamily: "System",
      fontWeight: "400",
    },
    medium: {
      fontFamily: "System",
      fontWeight: "500",
    },
    light: {
      fontFamily: "System",
      fontWeight: "300",
    },
    thin: {
      fontFamily: "System",
      fontWeight: "100",
    },
  },
  animation: {
    scale: 1,
  },
};
const defaultDarkTheme: PaperTheme = {
  dark: true,
  roundness: 4,
  colors: {
    primary: "rgb(10, 132, 255)", //primary
    accent: "#03dac6", //secondary
    background: "rgb(1, 1, 1)", //background.default
    surface: "#121212", //background.surface
    error: "#CF6679", //error.main
    text: "rgb(229, 229, 231)", //text.primary
    onBackground: "#FFFFFF", //white - same for light
    onSurface: "#FFFFFF", //white - same for light
    disabled: "rgba(255, 255, 255, 0.38)", //text.disabled
    placeholder: "rgba(255, 255, 255, 0.54)", //text.hint
    backdrop: "rgba(0, 0, 0, 0.5)", // some gray- same for light
    notification: "#ff80ab",
    card: "rgb(18, 18, 18)",
    border: "rgb(39, 39, 41)",
  },

  fonts: {
    regular: {
      fontFamily: "System",
      fontWeight: "400",
    },
    medium: {
      fontFamily: "System",
      fontWeight: "500",
    },
    light: {
      fontFamily: "System",
      fontWeight: "300",
    },
    thin: {
      fontFamily: "System",
      fontWeight: "100",
    },
  },
  animation: {
    scale: 1,
  },
  mode: "adaptive",
};

export const generateLightTheme = (
  customLightThemeColors: CustomThemeColors,
): PaperTheme => {
  let newLightTheme: PaperTheme = { ...defaultLightTheme };
  newLightTheme.colors = Object.assign(
    {},
    defaultLightTheme.colors,
    customLightThemeColors,
  );

  newLightTheme = {
    ...newLightTheme,
    ...NavigationDefaultTheme,
    colors: {
      ...newLightTheme.colors,
      ...NavigationDefaultTheme.colors,
    },
  };

  return newLightTheme;
};

export const generateDarkTheme = (
  customDarkThemeColors: CustomThemeColors,
): PaperTheme => {
  let newDarkTheme = { ...defaultDarkTheme };
  newDarkTheme.colors = Object.assign(
    {},
    defaultDarkTheme.colors,
    customDarkThemeColors,
  );
  newDarkTheme = {
    ...newDarkTheme,
    ...NavigationDarkTheme,
    colors: {
      ...newDarkTheme.colors,
      ...NavigationDarkTheme.colors,
    },
  };

  return newDarkTheme;
};
