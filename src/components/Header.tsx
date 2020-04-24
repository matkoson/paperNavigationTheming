import * as React from "react";
import { Appbar, TouchableRipple, Switch } from "react-native-paper";
import { StackHeaderProps } from "@react-navigation/stack";
import { View, StyleSheet, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { PreferencesContext } from "../context/PreferencesContext";

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
      {/* <View style={styles.themeSettingsContainer}>
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
      </View> */}
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
