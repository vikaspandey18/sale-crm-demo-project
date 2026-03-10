import { createReducer, on } from "@ngrx/store";
import { initialState } from "./telecaller.state";
import {
  failedToGetTelecallerCustomerAction,
  getTelecallerCustomerStartAction,
  getTelecallerCustomerSuccessAction,
} from "./telecaller.actions";

export const telecallerReducer = createReducer(
  initialState,
  on(getTelecallerCustomerStartAction, (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(getTelecallerCustomerSuccessAction, (state, action) => {
    return {
      ...state,
      customers: action.customers,
      loading: false,
      error: null,
    };
  }),
  on(failedToGetTelecallerCustomerAction, (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
    };
  }),
);
