import React from "react";
type PreferencesContextType = {
  toggleTheme: () => void;
  isThemeDark: boolean;
};

export const PreferencesContext = React.createContext<PreferencesContextType>({
  toggleTheme: () => {},
  isThemeDark: false,
});
