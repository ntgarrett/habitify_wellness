import React, { useState } from "react";
import { StyleSheet, Text, View, StatusBar, ScrollView } from "react-native";
import { Divider } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";

import AppHeader from "../components/AppHeader";
import SettingCell from "../components/SettingCell";
import TimeSettingCell from "../components/TimeSettingCell";
import DayPickerCell from "../components/DayPickerCell";
import theme from "../components/theme";

const Settings: React.FC = (props): JSX.Element => {
  const [numDaysExercise, setNumDaysExercise] = useState("1");

  return (
    <View style={styles.root}>
      <AppHeader title="Settings" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.colors.card}
        />
        <View style={styles.settingdesc}>
          <Text style={styles.settingdesctext}>
            These options will determine what I will track each day and what
            data will be displayed in My Progress.
          </Text>
        </View>
        <SettingCell
          settingName="Track Hydration"
          iconName="water"
          description="Did I drink enough water today?"
          actionName="IS_TRACKING_HYDRATION"
          stateType="hydration"
        />
        <SettingCell
          settingName="Track Eating"
          iconName="nutrition"
          description="Am I satisfied with what I ate today?"
          actionName="IS_TRACKING_EATING"
          stateType="eating"
        />
        <SettingCell
          settingName="Track Sleep"
          iconName="bed"
          description="Did I get proper sleep last night?"
          actionName="IS_TRACKING_SLEEP"
          stateType="sleep"
        />
        <SettingCell
          settingName="Track Exercise"
          iconName="barbell"
          description="Did I exercise today?"
          actionName="IS_TRACKING_EXERCISE"
          stateType="exercise"
        />
        <DayPickerCell actionName="UPDATE_DAYS_EXERCISE_PER_WEEK" />
        <Divider style={{ backgroundColor: theme.colors.card }} />
        <View style={styles.settingdesc}>
          <Text style={styles.settingdesctext}>
            These options will determine the time to update daily progress. The
            button on the Home screen becomes enabled.
          </Text>
        </View>
        <TimeSettingCell
          settingName="Progress Update Time"
          iconName="time"
          actionName="UPDATE_SCHEDULE_TIME"
        />
        <SettingCell
          settingName="Enable Push Notifications"
          description="Notify when updating is ready"
          iconName="notifications"
          actionName="ENABLE_PUSH_NOTIFICATIONS"
          stateType="notifications"
        />
        <View style={{ height: 300 }}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "stretch",
  },
  settingdesctext: {
    color: "grey",
    fontSize: 15,
    maxWidth: "90%",
    paddingTop: 5,
  },
  settingdesc: {
    padding: 10,
    alignItems: "center",
  },
  additionalsetting: {
    paddingTop: 5,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  additionalsettingtext: {
    fontSize: 15,
    marginLeft: "40%",
  },
  picker: {
    height: 50,
    width: 100,
    marginRight: 10,
  },
});

export default Settings;
