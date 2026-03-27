import { createReducer, on } from "@ngrx/store";
import { initialState } from "./collection-report.state";
import {
  fetchCollectionReportFailedAction,
  fetchCollectionReportStartAction,
  fetchCollectionReportSuccessAction,
} from "./collection-report.actions";

export const collectionReportReducer = createReducer(
  initialState,
  on(fetchCollectionReportStartAction, (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(fetchCollectionReportSuccessAction, (state, action) => {
    return {
      ...state,
      collections: action.collections,
      loading: false,
      error: null,
    };
  }),
  on(fetchCollectionReportFailedAction, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
      collections: [],
    };
  }),
);
