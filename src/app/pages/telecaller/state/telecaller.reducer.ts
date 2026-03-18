import { createReducer, on } from "@ngrx/store";
import { initialState } from "./telecaller.state";
import {
  failedToGetTelecallerCustomerAction,
  getTelecallerCustomerStartAction,
  getTelecallerCustomerSuccessAction,
  updateTelecallerCustomerFailureAction,
  updateTelecallerCustomerStartAction,
  updateTelecallerCustomerSuccessAction,
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
  on(updateTelecallerCustomerStartAction, (state, action) => {
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
  on(updateTelecallerCustomerSuccessAction, (state, action) => ({
    ...state,
    loading: false,
    customers: state.customers.map((c) =>
      c.id === action.id ? { ...c, [action.field]: action.value } : c,
    ),
  })),
  on(failedToGetTelecallerCustomerAction, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
  on(updateTelecallerCustomerFailureAction, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
);
