import { createReducer, on } from "@ngrx/store";
import { initialState } from "./customer.state";
import {
  getCustomer,
  getCustomerFailure,
  getCustomerSuccess,
} from "./customer.actions";

export const customerReducer = createReducer(
  initialState,

  on(getCustomer, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(getCustomerSuccess, (state, action) => ({
    ...state,
    loading: false,
    customers: action.customers,
  })),

  on(getCustomerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
);
