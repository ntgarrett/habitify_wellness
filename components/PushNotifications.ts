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
      body: "You can now submit your progress for today",
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
    },
    trigger,
  };
  Notifications.cancelAllScheduledNotificationsAsync();
  if (hasPushNotifsEnabled) {
    Notifications.scheduleNotificationAsync(schedulingOptions);
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
