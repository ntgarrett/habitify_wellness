import { AnyAction } from "redux";
import { ADD_NEW_DAY_PROGRESS } from "./types";

export interface IDailyData {
  id: string;
  date: {
    day: number;
    month: number;
    year: number;
  };
  results: {
    hydration: boolean | null;
    eating: boolean | null;
    sleep: boolean | null;
    exercise: boolean | null;
  };
}

interface DataTrackingState {
  trackedDays: IDailyData[];
}

const initial_state: DataTrackingState = { 
  trackedDays: []
};

export const trackingReducer = (
  state: DataTrackingState = initial_state,
  action: AnyAction
) => {
  switch (action.type) {
    case ADD_NEW_DAY_PROGRESS: {
      return {
        ...state,
        trackedDays: [...state.trackedDays, action.payload],
      };
    }
    default: {
      return state;
    }
  }
};
