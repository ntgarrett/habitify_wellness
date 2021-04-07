import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";

import AppHeader from "../components/AppHeader";
import SettingCell from "../components/SettingCell";
import {
  IS_TRACKING_HYDRATION,
  IS_TRACKING_EATING,
  IS_TRACKING_SLEEP,
  IS_TRACKING_EXERCISE,
} from "../state/user_settings/types";
import theme from "../components/theme";

const Settings: React.FC = (props): JSX.Element => {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.card} />
      <AppHeader title="Settings" />
      <SettingCell
        settingName="Track Hydration"
        iconName="water"
        description="Did I drink enough water today?"
        stateName={IS_TRACKING_HYDRATION}
      />
      <SettingCell
        settingName="Track Eating"
        iconName="nutrition"
        description="Am I satisfied with what I ate today?"
        stateName={IS_TRACKING_EATING}
      />
      <SettingCell
        settingName="Track Sleep"
        iconName="bed"
        description="Did I get proper sleep last night?"
        stateName={IS_TRACKING_SLEEP}
      />
      <SettingCell
        settingName="Track Exercise"
        iconName="barbell"
        description="Did I exercise today?"
        stateName={IS_TRACKING_EXERCISE}
      />
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
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
  },
});

export default Settings;
