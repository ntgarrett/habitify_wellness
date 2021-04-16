import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "react-native-vector-icons/Ionicons";

import { updateScheduleTime } from "../state/user_settings/actions";
import { useAppDispatch, useAppSelector } from "../state/user_settings/hooks";
import theme from "./theme";

interface TimeSettingCellProps {
  settingName: string;
  iconName: string;
  actionName: string;
}

const TimeSettingCell: React.FC<TimeSettingCellProps> = (
  props
): JSX.Element => {
  const { settingName, iconName, actionName } = props;
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useAppDispatch();

  var currentStateValue: [number, number] = useAppSelector((state) => {
    return state.settings.userSettings.schedule.hourAndMinute;
  });

  const initialTimeValue: Date = new Date();
  initialTimeValue.setDate(initialTimeValue.getTime() + 86400000);
  initialTimeValue.setHours(21, 0, 0);

  const onChange: any = (event: Event, selectedTime: any) => {
    if (selectedTime === undefined) {
      setIsVisible(false);
      return;
    }
    setIsVisible(false);
    currentStateValue =
      [selectedTime.getHours(), selectedTime.getMinutes()] || initialTimeValue;
    dispatch(updateScheduleTime(actionName, currentStateValue));
  };

  function convertTimeToDate(timeUnits: [number, number]) {
    const date = new Date();
    date.setHours(timeUnits[0]);
    date.setMinutes(timeUnits[1]);
    date.setSeconds(0);
    return date;
  }

  return (
    <View style={styles.cell}>
      <Ionicons
        name={iconName}
        color={theme.colors.border}
        size={30}
        style={{ marginLeft: 20 }}
      />
      <Text style={styles.title}>{settingName}</Text>
      <TouchableOpacity
        style={styles.timecontainer}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.timetext}>
          {convertTimeToDate(currentStateValue).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </TouchableOpacity>
      {isVisible && (
        <DateTimePicker
          value={convertTimeToDate(currentStateValue)}
          mode="time"
          onChange={onChange}
        />
      )}
    </View>
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
    fontSize: 18,
    marginLeft: 15,
  },
  timecontainer: {
    marginLeft: "auto",
    marginRight: 30,
    borderWidth: 5,
    borderColor: theme.colors.card,
    borderRadius: 50,
    padding: 7,
  },
  timetext: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default TimeSettingCell;
