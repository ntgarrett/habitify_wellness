import { AnyAction } from "redux";

import {
  IS_TRACKING_HYDRATION,
  IS_TRACKING_EATING,
  IS_TRACKING_SLEEP,
  IS_TRACKING_EXERCISE,
} from "./types";

export interface UserSettingsState {
  userSettings: {
    hydration: {
      isTrackingHydration: boolean;
      id: number;
    };
    eating: {
      isTrackingEating: boolean;
      id: number;
    };
    sleep: {
      isTrackingSleep: boolean;
      id: number;
    };
    exercise: {
      isTrackingExercise: boolean;
      id: number;
    };
  };
}

const initial_state: UserSettingsState = {
  userSettings: {
    hydration: {
      isTrackingHydration: false,
      id: 1,
    },
    eating: {
      isTrackingEating: false,
      id: 2,
    },
    sleep: {
      isTrackingSleep: false,
      id: 3,
    },
    exercise: {
      isTrackingExercise: false,
      id: 4,
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
            ...state.userSettings.hydration,
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
            ...state.userSettings.eating,
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
            ...state.userSettings.sleep,
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
    default: {
      return state;
    }
  }
};
