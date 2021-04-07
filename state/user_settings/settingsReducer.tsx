import {
  IS_TRACKING_HYDRATION,
  IS_TRACKING_EATING,
  IS_TRACKING_SLEEP,
  IS_TRACKING_EXERCISE,
} from "./types";

export interface UserSettingsState {
  isTrackingHydration: boolean;
  isTrackingEating: boolean;
  isTrackingSleep: boolean;
  isTrackingExercise: boolean;
}

const initial_state: UserSettingsState = {
  isTrackingHydration: false,
  isTrackingEating: false,
  isTrackingSleep: false,
  isTrackingExercise: false,
};

export const userSettingsReducer = (
  state: UserSettingsState = initial_state,
  action: any
) => {
  switch (action.type) {
    case IS_TRACKING_HYDRATION: {
      return {
        ...state,
        isTrackingHydration: action.payload,
      };
    }
    case IS_TRACKING_EATING: {
      return {
        ...state,
        isTrackingEating: action.payload,
      };
    }
    case IS_TRACKING_SLEEP: {
      return {
        ...state,
        isTrackingSleep: action.payload,
      };
    }
    case IS_TRACKING_EXERCISE: {
      return {
        ...state,
        isTrackingExercise: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
