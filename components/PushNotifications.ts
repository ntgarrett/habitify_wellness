import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

export interface DailyTriggerInput {
  hour: number;
  minute: number;
  repeats: true;
}

export const scheduleNotifications = (
  hasPushNotifsEnabled: boolean,
  timeFromState: [number, number]
) => {
  const trigger: DailyTriggerInput = {
    hour: timeFromState[0],
    minute: timeFromState[1],
    repeats: true,
  };
  const schedulingOptions = {
    content: {
      title: "Habitify Wellness",
      body: "It's time to submit my progress for today",
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
    },
    trigger,
  };
  Notifications.cancelAllScheduledNotificationsAsync();
  if (hasPushNotifsEnabled) {
    Notifications.scheduleNotificationAsync(schedulingOptions);
    Notifications.setNotificationHandler({
      handleNotification: async () =>({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      })
    });
  }
};

export const handleNotification = () => {
  console.warn("Notification received.");
};

export const askNotification = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  if (Constants.isDevice && status === "granted")
    console.log("Notification permissions granted.");
};
