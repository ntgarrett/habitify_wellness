import React from "react";
import { StyleSheet, Text, View, StatusBar, ScrollView } from "react-native";
import { Divider } from "react-native-elements";

import AppHeader from "../components/AppHeader";
import TrackedSettingCell from "../components/TrackedSettingCell";
import TimeSettingCell from "../components/TimeSettingCell";
import DayPickerCell from "../components/DayPickerCell";
import PushNotificationsCell from "../components/PushNotificationsCell";
import theme from "../components/theme";

const Settings: React.FC = (props): JSX.Element => {
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
        <TrackedSettingCell
          settingName="Track Hydration"
          iconName="water"
          description="Did I drink enough water today?"
          actionName="IS_TRACKING_HYDRATION"
          stateType="hydration"
        />
        <TrackedSettingCell
          settingName="Track Eating"
          iconName="nutrition"
          description="Am I satisfied with what I ate today?"
          actionName="IS_TRACKING_EATING"
          stateType="eating"
        />
        <TrackedSettingCell
          settingName="Track Sleep"
          iconName="bed"
          description="Did I get proper sleep last night?"
          actionName="IS_TRACKING_SLEEP"
          stateType="sleep"
        />
        <TrackedSettingCell
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
            These options will determine when I will update my daily progress.
            At this time I can enter my results for the day from the Home
            screen.
          </Text>
        </View>
        <TimeSettingCell
          settingName="Progress Update Time"
          iconName="time"
          actionName="UPDATE_SCHEDULE_TIME"
        />
        <PushNotificationsCell
          settingName="Enable Push Notifications"
          description="Notify when updating is ready"
          iconName="notifications"
          actionName="ENABLE_PUSH_NOTIFICATIONS"
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
