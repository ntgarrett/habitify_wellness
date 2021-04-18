import React, { useEffect } from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Notifications from "expo-notifications";

import { updateToggledSetting } from "../state/user_settings/actions";
import { useAppDispatch, useAppSelector } from "../state/user_settings/hooks";
import { isTrackingNothing } from "../state/user_settings/helpers";
import * as PushNotifications from "./PushNotifications";
import { UserSettingsState } from "../state/user_settings/settingsReducer";
import theme from "./theme";

interface SettingProps {
  settingName: string;
  iconName: string;
  description: string;
  actionName: string;
}

const PushNotificationsCell: React.FC<SettingProps> = (props): JSX.Element => {
  const { settingName, iconName, description, actionName } = props;
  const dispatch = useAppDispatch();

  var currentStateValue: UserSettingsState = useAppSelector((state) => {
    return state.settings;
  });

  const toggleSwitch = () => {
    dispatch(
      updateToggledSetting(
        actionName,
        !currentStateValue.userSettings.pushNotificationsEnabled
      )
    );
    currentStateValue.userSettings.pushNotificationsEnabled = !currentStateValue
      .userSettings.pushNotificationsEnabled;
    PushNotifications.scheduleNotifications(
      currentStateValue.userSettings.pushNotificationsEnabled,
      currentStateValue.userSettings.hourAndMinute
    );
  };

  useEffect(() => {
    //PushNotifications.askNotification();
    const listener = Notifications.addNotificationReceivedListener(
      PushNotifications.handleNotification
    );
    return () => listener.remove();
  }, []);

  return (
    <View style={styles.cell}>
      <Ionicons
        name={iconName}
        color={isTrackingNothing() ? "grey" : theme.colors.border}
        size={30}
        style={{ marginLeft: 20 }}
      />
      <View>
        <Text
          style={[
            styles.title,
            isTrackingNothing() ? styles.disabled : styles.enabled,
          ]}
        >
          {settingName}
        </Text>
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
        value={currentStateValue.userSettings.pushNotificationsEnabled}
        disabled={isTrackingNothing()}
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
    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
  },
  disabled: {
    color: "grey",
  },
  enabled: {
    color: "black",
  },
});

export default PushNotificationsCell;
