import { createReducer, on } from "@ngrx/store";
import { initialState } from "./attendance.state";
import {
  markAttendaceFailedAction,
  markAttendaceStartAction,
  markAttendaceSuccessAction,
} from "./attendance.actions";

export const markAttendanceReducer = createReducer(
  initialState,
  on(markAttendaceStartAction, (state, action) => {
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
      error: null,
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
