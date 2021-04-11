import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";

import { useAppSelector } from "../state/user_settings/hooks";
import { UserSettingsState } from "../state/user_settings/settingsReducer";
import AppHeader from "../components/AppHeader";
import theme from "../components/theme";

const HomeScreen: React.FC = (props): JSX.Element => {
  const dateFormat = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const currentState: UserSettingsState = useAppSelector((state) => {
    return state.settings;
  });

  interface TrackedType {
    tracking: any;
    description: string;
    id: number;
  }

  const currentlyTracking: TrackedType[] = [
    {
      tracking: currentState.userSettings.hydration.isTrackingHydration,
      description: "Proper hydration",
      id: 1,
    },
    {
      tracking: currentState.userSettings.eating.isTrackingEating,
      description: "Desired food intake",
      id: 2,
    },
    {
      tracking: currentState.userSettings.sleep.isTrackingSleep,
      description: "Quality of sleep",
      id: 3,
    },
    {
      tracking: currentState.userSettings.exercise.isTrackingExercise,
      description: "Getting exercise",
      id: 4,
    },
  ].filter((setting) => setting.tracking === true);

  const noneTracked: boolean = currentlyTracking.every(
    (elem) => elem.tracking === false
  );

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.card} />
      <AppHeader title="Habitify Wellness" />
      <View style={styles.datecontainer}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {new Date().toLocaleDateString(undefined, dateFormat)}
        </Text>
      </View>
      <View style={styles.trackinglist}>
        <Text>My daily goals I'm tracking:{"\n"}</Text>
        <View>
          {noneTracked ? (
            <Text>
              None. Go to Settings to enable tracking your wellness goals!
            </Text>
          ) : (
            currentlyTracking.map((setting) => (
              <Text key={setting.id}>
                {"\u2022"} {setting.description}
              </Text>
            ))
          )}
        </View>
      </View>
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
  datecontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "tomato",
  },
  trackinglist: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "cyan",
  },
  remaining: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
  },
});

export default HomeScreen;
