import { AnyAction } from "redux";

import {
  IS_TRACKING_HYDRATION,
  IS_TRACKING_EATING,
  IS_TRACKING_SLEEP,
  IS_TRACKING_EXERCISE,
  UPDATE_DAYS_EXERCISE_PER_WEEK,
  ENABLE_PUSH_NOTIFICATIONS,
  UPDATE_SCHEDULE_TIME,
} from "./types";

export interface UserSettingsState {
  userSettings: {
    hydration: {
      isTrackingHydration: boolean;
    };
    eating: {
      isTrackingEating: boolean;
    };
    sleep: {
      isTrackingSleep: boolean;
    };
    exercise: {
      isTrackingExercise: boolean;
      targetDaysExercisePerWeek: number;
    };
    schedule: {
      hourAndMinute: [number, number];
      pushNotificationsEnabled: boolean;
    };
  };
}

const initial_state: UserSettingsState = {
  userSettings: {
    hydration: {
      isTrackingHydration: false,
    },
    eating: {
      isTrackingEating: false,
    },
    sleep: {
      isTrackingSleep: false,
    },
    exercise: {
      isTrackingExercise: false,
      targetDaysExercisePerWeek: 1,
    },
    schedule: {
      hourAndMinute: [21, 0],
      pushNotificationsEnabled: false,
    },
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
          hydration: {
            isTrackingHydration: action.payload,
          },
        },
      };
    }
    case IS_TRACKING_EATING: {
      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          eating: {
            isTrackingEating: action.payload,
          },
        },
      };
    }
    case IS_TRACKING_SLEEP: {
      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          sleep: {
            isTrackingSleep: action.payload,
          },
        },
      };
    }
    case IS_TRACKING_EXERCISE: {
      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          exercise: {
            ...state.userSettings.exercise,
            isTrackingExercise: action.payload,
          },
        },
      };
    }
    case UPDATE_DAYS_EXERCISE_PER_WEEK: {
      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          exercise: {
            ...state.userSettings.exercise,
            targetDaysExercisePerWeek: action.payload,
          },
        },
      };
    }
    case ENABLE_PUSH_NOTIFICATIONS: {
      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          schedule: {
            ...state.userSettings.schedule,
            pushNotificationsEnabled: action.payload,
          },
        },
      };
    }
    case UPDATE_SCHEDULE_TIME: {
      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          schedule: {
            ...state.userSettings.schedule,
            hourAndMinute: action.payload,
          },
        },
      };
    }
    default: {
      return state;
    }
  }
};
