import { createReducer, on } from "@ngrx/store";
import { initialState } from "./attendance.state";
import {
  markAttendaceFailedAction,
  markAttendaceStartAction,
  markAttendaceSuccessAction,
  markCheckInAction,
  markCheckOutAction,
} from "./attendance.actions";

export const markAttendanceReducer = createReducer(
  initialState,
  on(markCheckInAction, (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(markCheckOutAction, (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(markAttendaceSuccessAction, (state, action) => {
    return {
      ...state,
      loading: false,
      record: action.record,
      error: action.message,
    };
  }),
  on(markAttendaceFailedAction, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
);
