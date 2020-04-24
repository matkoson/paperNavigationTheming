import React from "react";
import { PaperTheme } from "../types";
type PreferencesContextType = {
  setTheme: (customTheme?: PaperTheme) => void;
  setIsThemeCustom: (isThemeCustom: boolean) => void;
  isThemeCustom: boolean;
};

export const PreferencesContext = React.createContext<PreferencesContextType>({
  setTheme: () => {},
  setIsThemeCustom: () => {},
  isThemeCustom: false,
});
