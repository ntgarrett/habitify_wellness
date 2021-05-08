import { AnyAction } from "redux";
import { ADD_NEW_DAY_PROGRESS } from "./types";

export interface IDailyData {
  id: number;
  date: {
    day: number;
    month: number;
    year: number;
  };
  results: {
    hydration?: boolean;
    eating?: boolean;
    sleep?: boolean;
    exercise?: boolean;
  };
}

const initial_state: IDailyData[] = [];

export const trackingReducer = (
  state: IDailyData[] = initial_state,
  action: AnyAction
) => {
  switch (action.type) {
    case ADD_NEW_DAY_PROGRESS: {
      return {
        ...state,
        trackedDays: [...state, action.payload],
      };
    }
    default: {
      return state;
    }
  }
};
