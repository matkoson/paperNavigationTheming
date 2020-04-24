import * as React from "react";
import { Appbar, TouchableRipple, Switch } from "react-native-paper";
import { StackHeaderProps } from "@react-navigation/stack";
import { View, StyleSheet, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { PreferencesContext } from "../context/PreferencesContext";
import ThemeMenu from "./ThemeMenu";

const Header = ({ scene, previous, navigation }: StackHeaderProps) => {
  const theme = useTheme();
  const { setTheme, isThemeCustom } = React.useContext(PreferencesContext);

  return (
    <Appbar.Header
      theme={{
        colors: {
          primary: isThemeCustom ? theme.colors.primary : theme.colors.surface,
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
        <ThemeMenu />
        <TouchableRipple onPress={() => setTheme()}>
          <View style={styles.preference}>
            <Text
              style={{
                color: isThemeCustom
                  ? theme.colors.onSurface
                  : theme.colors.onSurface,
              }}
            >
              Dark
            </Text>
            <View pointerEvents="none">
              <Switch
                style={[
                  isThemeCustom
                    ? { backgroundColor: theme.colors.accent }
                    : null,
                  styles.switch,
                ]}
                color={"red"}
                value={theme.dark}
              />
            </View>
          </View>
        </TouchableRipple>
      </View>
    </Appbar.Header>
  );
};

export default Header;

const styles = StyleSheet.create({
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 90,
  },
  appBarContent: { paddingHorizontal: 0 },
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  themeSettingsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: 250,
  },
  switch: {
    borderRadius: 15,
  },
});
