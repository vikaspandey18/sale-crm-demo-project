import { createReducer, on } from "@ngrx/store";
import { initialState } from "./order-report.state";
import {
  fetchOrderReportFailedAction,
  fetchOrderReportStartAction,
  fetchOrderReportSuccessAction,
} from "./order-report.actions";

export const orderReportReducer = createReducer(
  initialState,
  on(fetchOrderReportStartAction, (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(fetchOrderReportSuccessAction, (state, action) => {
    return {
      ...state,
      orders: action.orders,
      loading: false,
      error: null,
    };
  }),
  on(fetchOrderReportFailedAction, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),
);
