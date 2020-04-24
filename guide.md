In this guide we will look into how to apply theming for an application using `react-native-paper` and `react-navigation` at the same time.

The example application for this guide can be found [here](https://github.com/matkoson/paperNavigationTheming).

Offering different theme options, especially dark/light ones, is currently more and more a standard requirement of the modern mobile application, fortunately both `React Navigation` and `React Native Paper` support configurable theming out-of-the-box.
But how to make them work together?

To start following with this guide, clone the [repo](https://github.com/matkoson/paperNavigationTheming), and checkout the branch `startingPoint`.

In order for our themes to work, both libraries require a wrapper to be used in the entry point of our application, in this case it is `App.tsx`.

`React Navigation` exposes `NavigationContainer` which ensures that navigation works correctly, but also accepts `theme` as optional prop. Read more about setting up navigation [here](https://reactnavigation.org/docs/getting-started/).
For `React Native Paper` theme to work, we need use `PaperProvider` also at our entry point.

Fortunately, both `React Navigation` and `React Native Paper` offer very similar API when it comes to theming. We can import default themes in light and dark variants from both. We will do just that in `App.tsx`.

In both libraries both theme types are named the same -`DefaultTheme` and `DarkTheme`, so we alias them at the imports.

```
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

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
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
      </PaperProvider>
    </SafeAreaProvider>
  );
}

```

Out goal here is to combine those two themes into one, so that we could control the theme for the entire application in a single place.

To make things easier we can use [deepmerge](https://www.npmjs.com/package/deepmerge) package. With `yarn` we can install it like this
<code>yarn add deepmerge</code>

```
import merge from "deepmerge";

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);
```

Alternatively, we could merge those themes with plain JavaScript

```
  const CombinedDefaultTheme = {
    ...newLightTheme,
    ...NavigationDefaultTheme,
    colors: {
      ...newLightTheme.colors,
      ...NavigationDefaultTheme.colors,
    },
  };
  const CombinedDarkTheme = {
    ...newDarkTheme,
    ...NavigationDarkTheme,
    colors: {
      ...newDarkTheme.colors,
      ...NavigationDarkTheme.colors,
    },
  };

```

After combining the themes, we will be able to control the theming in both libraries at the same time, which will come in handy later.

Next, we need to pass combined themes into the wrappers. For this part, we use the dark one - `CombinedDarkTheme`.

```
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
```

At this point, the app will be all dark!

![simulator-ios-24-04-2020-08-472](https://user-images.githubusercontent.com/41837132/80191395-ebfec900-8615-11ea-8813-538df4def6b9.jpg)

But we don't need to limit ourselves to the themes offered by libraries in default. Both packages allow for custom themes to be applied.
You can learn about it their documentations:

- [React Navigation](https://reactnavigation.org/docs/themes/)
- [React Native Paper](https://callstack.github.io/react-native-paper/theming.html)

Now, we wouldn't want to stay forever with dark theme being on, which is why we need gain the ability to control the theme dynamically. We need to introduce some React state for this purpose.

`React Context` proves itself very useful in handling cross-cutting concerns like global theme handling, so we will use just that.

```

import { PreferencesContext } from "./src/context/PreferencesContext";

const Stack = createStackNavigator();

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

export default function App() {
  const [isThemeDark, setIsThemeDark] = React.useState(false);

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark],
  );

  return (
    <SafeAreaProvider>
      <PreferencesContext.Provider value={preferences}>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme}>
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
      </PreferencesContext.Provider>
    </SafeAreaProvider>
  );
}

}

```

Context is already created for you, all you need to do is import it, as seem above. Now, as logic for switching between themes is ready, we need some component to control it. We will use `Paper`'s `Switch` for this end. All of the work is already done, just go to `src/components/Header` and uncomment the wrapped `Switch` component. `Header.tsx` should now look like this.

```
import { PreferencesContext } from "../context/PreferencesContext";
import { useTheme } from "react-native-paper";

const Header = ({ scene, previous, navigation }: StackHeaderProps) => {
  const theme = useTheme();
  const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);

  return (
    <Appbar.Header
      theme={{
        colors: {
          primary: theme?.colors.surface,
        },
      }}
    >
      <Appbar.BackAction
        style={previous ? styles.visible : styles.hidden}
        disabled={!previous}
        onPress={navigation.goBack}
      />
      <Appbar.Content style={styles.appBarContent} title={scene.route?.name} />
      <View style={styles.themeSettingsContainer}>
        <TouchableRipple onPress={() => toggleTheme()}>
          <View style={styles.preference}>
            <Text
              style={{
                color: theme.colors.onSurface,
              }}
            >
              Dark
            </Text>
            <View pointerEvents="none">
              <Switch
                style={[
                  { backgroundColor: theme.colors.accent },
                  styles.switch,
                ]}
                color={"red"}
                value={isThemeDark}
              />
            </View>
          </View>
        </TouchableRipple>
      </View>
    </Appbar.Header>
  );
};


```

And now you can switch between light and dark theme!

![paperGuide1](https://user-images.githubusercontent.com/41837132/80189473-008d9200-8613-11ea-9435-a38e5baec16b.gif)

Thanks to the linking of themes that did earlier we can control switching themes with only one piece of state.

`React Native Paper` components will automatically use theme thanks to the `PaperProvider` that is wrapped around our `App.tsx`, but we can also access theme values manually using `useTheme` hook,
provided by the library. The example is seen above in `Header.tsx` component.

If light/dark themes are not enough for your use case, you can learn more about creating Material Design themes [here](https://material.io/design/material-theming/implementing-your-theme.html#color).
On `master` branch of the example app, you will find implemented [Menu](https://callstack.github.io/react-native-paper/menu.html) component, which allows to choose more custom themes. Inspecting code in `utils` and `Header` may give you some idea how to use you themes with `Paper`, in addition to dedicated [docs](https://callstack.github.io/react-native-paper/menu.html).
