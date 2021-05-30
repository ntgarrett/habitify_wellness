import React from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { updateToggledSetting } from "../state/user_settings/actions";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import theme from "./theme";

interface SettingProps {
  settingName: string;
  iconName: string;
  description: string;
  actionName: string;
  stateType: string;
}

const TrackedSettingCell: React.FC<SettingProps> = (props): JSX.Element => {
  const { settingName, iconName, description, actionName, stateType } = props;

  const dispatch = useAppDispatch();

  var currentStateValue: boolean = useAppSelector((state) => {
    switch (stateType) {
      case "hydration": {
        return state.settings.userSettings.isTrackingHydration;
      }
      case "eating": {
        return state.settings.userSettings.isTrackingEating;
      }
      case "sleep": {
        return state.settings.userSettings.isTrackingSleep;
      }
      case "exercise": {
        return state.settings.userSettings.isTrackingExercise;
      }
      case "notifications": {
        return state.settings.userSettings.pushNotificationsEnabled;
      }
    }
  });

  const toggleSwitch = () => {
    dispatch(updateToggledSetting(actionName, !currentStateValue));
    currentStateValue = !currentStateValue;
  };

  return (
    <View style={styles.cell}>
      <Ionicons
        name={iconName}
        color={theme.colors.border}
        size={30}
        style={{ marginLeft: 20 }}
      />
      <View>
        <Text style={styles.title}>{settingName}</Text>
        <Text style={{ fontSize: 12, marginLeft: 15, color: "grey" }}>
          {description}
        </Text>
      </View>
      <Switch
        style={styles.switch}
        trackColor={{
          false: theme.colors.notification,
          true: theme.colors.border,
        }}
        thumbColor={theme.colors.primary}
        onValueChange={toggleSwitch}
        value={currentStateValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    paddingTop: 10,
    paddingBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    marginLeft: 15,
  },
  switch: {
    marginLeft: "auto",
    marginRight: 20,
    //transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
  },
});

export default TrackedSettingCell;
