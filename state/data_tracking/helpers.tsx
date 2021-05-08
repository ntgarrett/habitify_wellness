import { IDailyData } from "./trackingReducer";

export function hasUpdatedToday(state: IDailyData[]) {
  const year: number = new Date().getFullYear();
  const month: number = new Date().getMonth();
  const day: number = new Date().getDate();

  let results = state.filter((trackedDay) => {
    trackedDay.date.year === year &&
      trackedDay.date.month === month &&
      trackedDay.date.day === day;
  });

  if (results.length > 0) {
    return true;
  } else {
    return false;
  }
}
