import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "react-native-vector-icons/Ionicons";

import * as PushNotifications from "./PushNotifications";
import { updateScheduleTime } from "../state/user_settings/actions";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { UserSettingsState } from "../state/user_settings/settingsReducer";
import {
  isTrackingNothing,
  convertTimeToDate,
} from "../state/user_settings/helpers";
import theme from "./theme";

interface TimeSettingCellProps {
  settingName: string;
  iconName: string;
  actionName: string;
}

interface IStateTime {
  hourAndMinute: [number, number];
}

const TimeSettingCell: React.FC<TimeSettingCellProps> = (
  props
): JSX.Element => {
  const { settingName, iconName, actionName } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [time, setTime] = useState<IStateTime>({ hourAndMinute: [0,0] });

  const dispatch = useAppDispatch();

  const currentStateValue: UserSettingsState = useAppSelector((state) => {
    return state.settings;
  });;

  let initialTime: IStateTime;

  useEffect(() => {
    if (initialized === false) {
      initialTime = ({hourAndMinute: currentStateValue.userSettings.hourAndMinute});
      setTime(initialTime);
    } else {}
    setInitialized(true);
  }, []);

  const onChange: any = (event: Event, selectedTime: any) => {
    // User presses cancel
    if (selectedTime === undefined) {
      setIsVisible(false);
      return;
    }
    setIsVisible(false);

    const newHourAndMinute: [number, number] =
      [selectedTime.getHours(), selectedTime.getMinutes()] || initialTime.hourAndMinute;

    dispatch(
      updateScheduleTime(
        actionName,
        newHourAndMinute
      )
    );

    setTime({ hourAndMinute: newHourAndMinute });

    // Push notifications already enabled, then time is changed
    if (currentStateValue.userSettings.pushNotificationsEnabled) {
      PushNotifications.scheduleNotifications(
        currentStateValue.userSettings.pushNotificationsEnabled,
        currentStateValue.userSettings.hourAndMinute
      );
    }
  };

  return (
    <>
      <View style={styles.cell}>
        <Ionicons
          name={iconName}
          color={isTrackingNothing() ? "grey" : theme.colors.border}
          size={30}
          style={{ marginLeft: 20 }}
        />
        <Text
          style={[
            styles.title,
            isTrackingNothing() ? styles.disabledtext : styles.enabledtext,
          ]}
        >
          {settingName}
        </Text>
        <TouchableOpacity
          style={[
            styles.timecontainer,
            isTrackingNothing()
              ? styles.disabledcontainer
              : styles.enabledcontainer,
          ]}
          onPress={() => setIsVisible(true)}
          disabled={isTrackingNothing()}
        >
          <Text
            style={[
              styles.timetext,
              isTrackingNothing() ? styles.disabledtext : styles.enabledtext,
            ]}
          >
            {convertTimeToDate(
              time.hourAndMinute
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </TouchableOpacity>
        {isVisible && (
          <DateTimePicker
            value={convertTimeToDate(time.hourAndMinute)}
            mode="time"
            onChange={onChange}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  cell: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    marginLeft: 15,
  },
  timecontainer: {
    marginLeft: "auto",
    marginRight: 15,
    borderWidth: 5,
    borderRadius: 50,
    padding: 7,
  },
  timetext: {
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledcontainer: {
    borderColor: "grey",
  },
  enabledcontainer: {
    borderColor: theme.colors.card,
  },
  disabledtext: {
    color: "grey",
  },
  enabledtext: {
    color: "black",
  },
});

export default TimeSettingCell;
