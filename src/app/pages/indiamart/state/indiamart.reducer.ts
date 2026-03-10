import { createReducer, on } from "@ngrx/store";
import { initialState } from "./indiamart.state";
import {
  failedIndiaMartCustomerAction,
  getIndiaMartCustomerSuccessAction,
  getIndianMartCustomerAction,
} from "./indiamart.actions";

export const indiaMartReducer = createReducer(
  initialState,
  on(getIndianMartCustomerAction, (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(getIndiaMartCustomerSuccessAction, (state, action) => {
    return {
      ...state,
      customers: action.customers,
      loading: false,
      error: null,
    };
  }),
  on(failedIndiaMartCustomerAction, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
);
