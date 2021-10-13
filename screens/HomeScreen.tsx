import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import { useAppDispatch, useAppSelector } from "../state/hooks";
import { UserSettingsState } from "../state/user_settings/settingsReducer";
import { convertTimeToDate } from "../state/user_settings/helpers";
import { updateToggledSetting } from "../state/user_settings/actions";
import { IDailyData } from "../state/data_tracking/trackingReducer";
import { hasUpdatedToday } from "../state/data_tracking/helpers";
import { DailyInputModal } from "../components/DailyInputModal";
import AppHeader from "../components/AppHeader";
import theme from "../components/theme";

interface TrackedType {
  tracking: boolean;
  description?: string;
  id: number;
}

const HomeScreen: React.FC = (props): JSX.Element => {
  const [visible, setVisible] = useState(false);
  const dispatch = useAppDispatch();

  var currentSettings: UserSettingsState = useAppSelector((state) => {
    return state.settings;
  });

  var currentTrackedData: IDailyData[] = useAppSelector((state) => {
    return state.progress.trackedDays;
  });

  function isTrackingAnything(state: UserSettingsState) {
    let settings: [boolean, boolean, boolean, boolean] = [
      state.userSettings.isTrackingHydration,
      state.userSettings.isTrackingEating,
      state.userSettings.isTrackingSleep,
      state.userSettings.isTrackingExercise
    ];
    return settings.includes(true);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (isTrackingAnything(currentSettings) && currentSettings.userSettings.canUpdateProgress === false) {
        const currentTime: Date = new Date(Date.now());
        const updateTime: Date = convertTimeToDate(
          currentSettings.userSettings.hourAndMinute
        );
        if (currentTime >= updateTime && !hasUpdatedToday(currentTrackedData)) {
          dispatch(updateToggledSetting("TOGGLE_UPDATE_READY", true));
        } else {
          //dispatch(updateToggledSetting("TOGGLE_UPDATE_READY", false));
        }
      } else {
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  const currentlyTracking: TrackedType[] = [
    {
      tracking: currentSettings.userSettings.isTrackingHydration,
      description: "💧 Proper hydration",
      id: 1,
    },
    {
      tracking: currentSettings.userSettings.isTrackingEating,
      description: "🍎 Desired food intake",
      id: 2,
    },
    {
      tracking: currentSettings.userSettings.isTrackingSleep,
      description: "💤 Quality of sleep",
      id: 3,
    },
    {
      tracking: currentSettings.userSettings.isTrackingExercise,
      description: "💪 Getting exercise",
      id: 4,
    },
  ].filter((setting) => setting.tracking === true);

  const noneTracked: boolean = currentlyTracking.every(
    (elem) => elem.tracking === false
  );

  return (
    <View style={styles.root}>
      <DailyInputModal
        visible={visible}
        setVisible={setVisible}
        includeHydration={currentSettings.userSettings.isTrackingHydration}
        includeEating={currentSettings.userSettings.isTrackingEating}
        includeSleep={currentSettings.userSettings.isTrackingSleep}
        includeExercise={currentSettings.userSettings.isTrackingExercise}
      />
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.card} />
      <AppHeader title="Habitify Wellness" />
      <View style={styles.trackinglist}>
        <Text style={{ fontSize: 20 }}>My daily goals I'm tracking:{"\n"}</Text>
        <View>
          {noneTracked ? (
            <Text style={styles.nothingtracked}>
              None. Go to Settings to enable tracking wellness goals!
            </Text>
          ) : (
            currentlyTracking.map((setting) => (
              <Text key={setting.id} style={{ fontSize: 22, paddingVertical: 10, }}>
                {setting.description}
              </Text>
            ))
          )}
        </View>
      </View>
      <View style={styles.updateButtonContainer}>
        <Text style={styles.timemessagetext}>
          {currentSettings.userSettings.canUpdateProgress ? (
            <Text>I can now update my progress today</Text>
          ) : (
            <Text>
              <Text>I can update my progress at &nbsp;</Text>
              <Text style={{ fontWeight: "bold" }}>
                {convertTimeToDate(
                  currentSettings.userSettings.hourAndMinute
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </Text>
          )}
        </Text>
        <TouchableOpacity
          disabled={!currentSettings.userSettings.canUpdateProgress}
          onPress={() => {
            setVisible(true);
          }}
          style={[
            styles.button,
            currentSettings.userSettings.canUpdateProgress
              ? styles.enabledbutton
              : styles.disabledbutton,
          ]}
        >
          <Text
            style={[
              styles.buttontext,
              currentSettings.userSettings.canUpdateProgress
                ? styles.textenabled
                : styles.textdisabled,
            ]}
          >
            Input Today's Results
          </Text>
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
    flex: 3,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  button: {
    alignItems: "center",
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    width: "80%",
    elevation: 5,
    borderRadius: 50,
  },
  textenabled: {
    color: "black",
  },
  textdisabled: {
    color: "grey",
  },
  buttontext: {
    fontSize: 20,
    textShadowOffset: { width: -1, height: 1 },
    textShadowColor: "white",
    textShadowRadius: 1,
  },
  enabledbutton: {
    backgroundColor: "lightgreen",
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  disabledbutton: {
    backgroundColor: "lightgrey",
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
  updateButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
