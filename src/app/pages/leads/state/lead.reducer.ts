import { createReducer, on } from "@ngrx/store";
import { initialState } from "./lead.state";
import {
  getLeadErrorAction,
  getLeadStartAction,
  getLeadSuccessAction,
} from "./lead.actions";

export const leadReducer = createReducer(
  initialState,
  on(getLeadStartAction, (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(getLeadSuccessAction, (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
      leads: action.leads,
    };
  }),
  on(getLeadErrorAction, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
);
