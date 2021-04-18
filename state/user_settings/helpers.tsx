import { useAppSelector } from "./hooks";

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
