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
};

export interface DataTrackingState {
  trackedDays: IDailyData[];
  totalDaysTracked: number;
};

const initial_state: DataTrackingState = { 
  trackedDays: [],
  totalDaysTracked: 0,
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
        totalDaysTracked: state.totalDaysTracked + 1,
      };
    }
    default: {
      return state;
    }
  }
};
