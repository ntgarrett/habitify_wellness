import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import { useAppSelector } from "../state/user_settings/hooks";
import { UserSettingsState } from "../state/user_settings/settingsReducer";
import AppHeader from "../components/AppHeader";
import { convertTimeToDate } from "../state/user_settings/helpers";
import theme from "../components/theme";

interface TrackedType {
  tracking: boolean;
  description: string;
  id: number;
}

const HomeScreen: React.FC = (props): JSX.Element => {
  const dateFormat: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  var currentState: UserSettingsState = useAppSelector((state) => {
    return state.settings;
  });

  const currentlyTracking: TrackedType[] = [
    {
      tracking: currentState.userSettings.isTrackingHydration,
      description: "💧 Proper hydration",
      id: 1,
    },
    {
      tracking: currentState.userSettings.isTrackingEating,
      description: "🍎 Desired food intake",
      id: 2,
    },
    {
      tracking: currentState.userSettings.isTrackingSleep,
      description: "😴 Quality of sleep",
      id: 3,
    },
    {
      tracking: currentState.userSettings.isTrackingExercise,
      description: "💪 Getting exercise",
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
      <View style={styles.trackinglist}>
        <Text style={{ fontSize: 20 }}>My daily goals I'm tracking:{"\n"}</Text>
        <View>
          {noneTracked ? (
            <Text style={styles.nothingtracked}>
              None. Go to Settings to enable tracking your wellness goals!
            </Text>
          ) : (
            currentlyTracking.map((setting) => (
              <Text key={setting.id} style={{ fontSize: 20 }}>
                {setting.description}
              </Text>
            ))
          )}
        </View>
      </View>
      <View style={styles.remaining}>
        <Text style={styles.timemessagetext}>
          <Text>I can update my progress at </Text>
          <Text style={{ fontWeight: "bold" }}>
            {convertTimeToDate(
              currentState.userSettings.hourAndMinute
            ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </Text>
        </Text>
        <TouchableOpacity
          disabled={true}
          onPress={() => {}}
          style={styles.button}
        >
          <Text style={styles.buttontext}>Input Today's Results</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "stretch",
  },
  trackinglist: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "lightgreen",
    alignItems: "center",
    padding: 15,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 50,
    borderWidth: 2,
    width: "80%",
    borderColor: theme.colors.border,
    elevation: 5,
  },
  buttontext: {
    fontSize: 20,
    textShadowOffset: { width: -1, height: 1 },
    textShadowColor: "white",
    textShadowRadius: 1,
  },
  nothingtracked: {
    textAlign: "center",
    maxWidth: "55%",
    color: "grey",
    fontSize: 16,
  },
  timemessagetext: {
    fontSize: 16,
    paddingBottom: 15,
  },
  remaining: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 3,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    borderColor: theme.colors.border,
  },
});

export default HomeScreen;
