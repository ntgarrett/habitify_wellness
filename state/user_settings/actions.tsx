export const updateToggledSetting = (actionName: string, value: boolean) => ({
  type: actionName,
  payload: value,
});

export const updateDaysExercisePerWeek = (
  actionName: string,
  value: number
) => ({
  type: actionName,
  payload: value,
});

export const updateScheduleTime = (
  actionName: string,
  value: [number, number]
) => ({
  type: actionName,
  payload: value,
});
