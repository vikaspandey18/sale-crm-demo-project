import { createReducer, on } from "@ngrx/store";
import { initialState } from "./followup.state";
import {
  loadFollowUpCustomerFailedAction,
  loadFollowUpCustomerStartAction,
  loadFollowUpCustomerSuccessAction,
} from "./followup.actions";

export const followUpReducer = createReducer(
  initialState,
  on(loadFollowUpCustomerStartAction, (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
      customers: [],
    };
  }),
  on(loadFollowUpCustomerSuccessAction, (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
      customers: action.customers,
    };
  }),
  on(loadFollowUpCustomerFailedAction, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
      customers: [],
    };
  }),
);
