import { createFeatureSelector, createSelector } from "@ngrx/store";
import { OrderReportState } from "./order-report.state";

const getOrderReportFeatureSelector =
  createFeatureSelector<OrderReportState>("orderReport");

export const getOrderReportSelector = createSelector(
  getOrderReportFeatureSelector,
  (state) => {
    return state.orders;
  },
);

export const getOrderReportLoadingSelector = createSelector(
  getOrderReportFeatureSelector,
  (state) => {
    return state.loading;
  },
);

export const getOrderReportErrorSelector = createSelector(
  getOrderReportFeatureSelector,
  (state) => {
    return state.error;
  },
);
