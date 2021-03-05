import React, { useState } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";

import AppHeader from "../components/AppHeader";
import SettingCell from "../components/SettingCell";
import theme from "../components/theme";

const Settings: React.FC = (props): JSX.Element => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.card} />
      <AppHeader title="Settings" />
      <SettingCell settingName="Track Hydration" iconName="water" />
      <SettingCell settingName="Track Eating" iconName="nutrition" />
      <SettingCell settingName="Track Sleep" iconName="bed" />
      <SettingCell settingName="Track Exercise" iconName="barbell" />
      <View style={styles.remaining}>
        <Text>Remaining Space</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "stretch",
  },
  remaining: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
  },
});

export default Settings;
