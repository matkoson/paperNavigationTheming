import * as React from "react";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { PaperTheme } from "./src/types";
import merge from "deepmerge";
import Header from "./src/components/Header";
import Details from "./src/Screens/CardDetailsScreen";

import CardScreen from "./src/Screens/CardListScreen";
import { Routes } from "./routes";
import { PreferencesContext } from "./src/context/PreferencesContext";

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

const Stack = createStackNavigator();

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const [customTheme, setCustomTheme] = React.useState<PaperTheme | null>(null);
  const [isThemeCustom, setIsThemeCustom] = React.useState<boolean>(false);
  let theme =
    customTheme || (isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme);

  const setTheme = React.useCallback(
    (customTheme?: PaperTheme) => {
      if (customTheme) {
        setCustomTheme(customTheme);
        setIsThemeCustom(true);
        setIsDarkTheme(customTheme.dark);
      } else {
        setCustomTheme(null);
        setIsThemeCustom(false);
        setIsDarkTheme(!isDarkTheme);
      }
    },
    [isDarkTheme],
  );

  const preferences = React.useMemo(
    () => ({
      setTheme,
      isThemeCustom,
      setIsThemeCustom,
    }),
    [setTheme, isThemeCustom],
  );

  return (
    <SafeAreaProvider>
      <PreferencesContext.Provider value={preferences}>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme}>
            <Stack.Navigator
              initialRouteName={"second"}
              headerMode="screen"
              screenOptions={{
                header: ({ scene, previous, navigation, ...rest }) => (
                  <Header
                    scene={scene}
                    previous={previous}
                    navigation={navigation}
                    {...rest}
                  />
                ),
              }}
            >
              <Stack.Screen name={Routes.list} component={CardScreen} />
              <Stack.Screen name={Routes.details} component={Details} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </PreferencesContext.Provider>
    </SafeAreaProvider>
  );
}
