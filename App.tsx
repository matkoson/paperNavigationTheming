import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";

import Header from "./src/components/Header";
import Details from "./src/Screens/CardDetailsScreen";

import CardScreen from "./src/Screens/CardListScreen";
import { Routes } from "./routes";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
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
    </SafeAreaProvider>
  );
}
