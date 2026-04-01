import { createReducer, on } from "@ngrx/store";
import { initialState } from "./followup.state";
import {
  loadFollowUpCustomerFailedAction,
  loadFollowUpCustomerStartAction,
  loadFollowUpCustomerSuccessAction,
  updateFollowUpCustomerFailedAction,
  updateFollowUpCustomerStartAction,
  updateFollowUpCustomerSuccessAction,
} from "./followup.actions";

export const followUpReducer = createReducer(
  initialState,
  on(loadFollowUpCustomerStartAction, (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
      
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
    };
  }),
  on(updateFollowUpCustomerStartAction, (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(updateFollowUpCustomerSuccessAction, (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
      customers: state.customers.map((c) =>
        c.id === action.id ? { ...c, [action.field]: action.value } : c,
      ),
    };
  }),
  on(updateFollowUpCustomerFailedAction, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
);
