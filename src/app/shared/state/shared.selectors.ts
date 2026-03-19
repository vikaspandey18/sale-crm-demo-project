import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SharedState } from "./shared.state";

const sharedProductFeatureSelector =
  createFeatureSelector<SharedState>("shared");

export const getProductSelector = createSelector(
  sharedProductFeatureSelector,
  (state) => {
    return state.product_name;
  },
);

export const getProductLoadingSelector = createSelector(
  sharedProductFeatureSelector,
  (state) => {
    return state.loading;
  },
);

export const getProductErrorSelector = createSelector(
  sharedProductFeatureSelector,
  (state) => {
    return state.error;
  },
);
