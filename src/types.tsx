import { Theme } from "react-native-paper";

export type PaperTheme = Theme & {
  colors: {
    card: string;
    border: string;
  };
};

export type CustomThemeColors = {
  primary: string;
  accent: string;
  background: string;
  surface: string;
  error: string;
  text: string;
  disabled: string;
  onSurface?: string;
};
