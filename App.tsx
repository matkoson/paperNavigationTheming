import * as React from "react";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";

import Header from "./src/components/Header";
import Details from "./src/Screens/CardDetailsScreen";

import CardScreen from "./src/Screens/CardListScreen";
import { Routes } from "./routes";

import merge from "deepmerge";

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={CombinedDarkTheme}>
        <NavigationContainer theme={CombinedDarkTheme}>
          <Stack.Navigator
            initialRouteName={Routes.list}
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
    </SafeAreaProvider>
  );
}
