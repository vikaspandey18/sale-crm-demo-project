import { createReducer, on } from "@ngrx/store";
import { initialState } from "./shared.state";
import {
  getProductFailedAction,
  getProductStartAction,
  getProductSuccessAction,
} from "./shared.actions";

export const sharedReducer = createReducer(
  initialState,
  on(getProductStartAction, (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(getProductSuccessAction, (state, action) => {
    return {
      ...state,
      loading: false,
      product_name: action.product_name,
    };
  }),
  on(getProductFailedAction, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
);
