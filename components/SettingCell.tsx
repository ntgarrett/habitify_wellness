import React from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { toggleSetting } from "../state/user_settings/actions";
import { useAppDispatch, useAppSelector } from "../state/user_settings/hooks";
import theme from "../components/theme";

interface SettingProps {
  settingName: string;
  iconName: string;
  description: string;
  actionName: string;
  stateName: string;
}

const SettingCell: React.FC<SettingProps> = (props): JSX.Element => {
  const { settingName, iconName, description, actionName, stateName } = props;

  const dispatch = useAppDispatch();

  var currentState: boolean = useAppSelector((state) => {
    switch (stateName) {
      case "hydration": {
        return state.settings.userSettings.hydration.isTrackingHydration;
      }
      case "eating": {
        return state.settings.userSettings.eating.isTrackingEating;
      }
      case "sleep": {
        return state.settings.userSettings.sleep.isTrackingSleep;
      }
      case "exercise": {
        return state.settings.userSettings.exercise.isTrackingExercise;
      }
    }
  });

  const toggleSwitch = () => {
    dispatch(toggleSetting(actionName, !currentState));
    currentState = !currentState;
  };

  return (
    <View style={styles.cell}>
      <Ionicons
        name={iconName}
        color={theme.colors.card}
        size={40}
        style={{ marginLeft: 20 }}
      />
      <View>
        <Text style={styles.title}>{settingName}</Text>
        <Text style={{ marginLeft: 15 }}>{description}</Text>
      </View>
      <Switch
        style={styles.switch}
        trackColor={{
          false: theme.colors.notification,
          true: theme.colors.border,
        }}
        thumbColor={theme.colors.primary}
        onValueChange={toggleSwitch}
        value={currentState}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginLeft: 15,
  },
  switch: {
    marginLeft: "auto",
    marginRight: 20,
    transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }],
  },
});

export default SettingCell;
