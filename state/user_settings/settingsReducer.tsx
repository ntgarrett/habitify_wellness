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
    };
    eating: {
      isTrackingEating: boolean;
    };
    sleep: {
      isTrackingSleep: boolean;
    };
    exercise: {
      isTrackingExercise: boolean;
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
