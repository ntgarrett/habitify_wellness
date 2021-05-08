import { AnyAction } from "redux";

import {
  IS_TRACKING_HYDRATION,
  IS_TRACKING_EATING,
  IS_TRACKING_SLEEP,
  IS_TRACKING_EXERCISE,
  UPDATE_DAYS_EXERCISE_PER_WEEK,
  ENABLE_PUSH_NOTIFICATIONS,
  UPDATE_SCHEDULE_TIME,
  TOGGLE_UPDATE_READY,
} from "./types";

export interface UserSettingsState {
  userSettings: {
    isTrackingHydration: boolean;
    isTrackingEating: boolean;
    isTrackingSleep: boolean;
    isTrackingExercise: boolean;
    targetDaysExercisePerWeek: number;
    hourAndMinute: [number, number];
    pushNotificationsEnabled: boolean;
    canUpdateProgress: boolean;
  };
}

const initial_state: UserSettingsState = {
  userSettings: {
    isTrackingHydration: false,
    isTrackingEating: false,
    isTrackingSleep: false,
    isTrackingExercise: false,
    targetDaysExercisePerWeek: 1,
    hourAndMinute: [21, 0],
    pushNotificationsEnabled: false,
    canUpdateProgress: false,
  },
};

export const settingsReducer = (
  state: UserSettingsState = initial_state,
  action: AnyAction
) => {
  switch (action.type) {
    case IS_TRACKING_HYDRATION: {
      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          isTrackingHydration: action.payload,
        },
      };
    }
    case IS_TRACKING_EATING: {
      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          isTrackingEating: action.payload,
        },
      };
    }
    case IS_TRACKING_SLEEP: {
      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          isTrackingSleep: action.payload,
        },
      };
    }
    case IS_TRACKING_EXERCISE: {
      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          isTrackingExercise: action.payload,
        },
      };
    }
    case UPDATE_DAYS_EXERCISE_PER_WEEK: {
      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          targetDaysExercisePerWeek: action.payload,
        },
      };
    }
    case ENABLE_PUSH_NOTIFICATIONS: {
      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          pushNotificationsEnabled: action.payload,
        },
      };
    }
    case UPDATE_SCHEDULE_TIME: {
      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          hourAndMinute: action.payload,
        },
      };
    }
    case TOGGLE_UPDATE_READY: {
      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          canUpdateProgress: action.payload,
        },
      };
    }
    default: {
      return state;
    }
  }
};
