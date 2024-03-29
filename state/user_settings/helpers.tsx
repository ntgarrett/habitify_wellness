import { useAppSelector } from "../hooks";

export function isTrackingNothing() {
  var state: [boolean, boolean, boolean, boolean] = useAppSelector((state) => {
    return [
      state.settings.userSettings.isTrackingHydration,
      state.settings.userSettings.isTrackingEating,
      state.settings.userSettings.isTrackingSleep,
      state.settings.userSettings.isTrackingExercise,
    ];
  });
  return !state.includes(true);
}

export function convertTimeToDate(timeUnits: [number, number]) {
  const date = new Date(Date.now());
  date.setHours(timeUnits[0]);
  date.setMinutes(timeUnits[1]);
  date.setSeconds(0);
  return date;
}
