import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TelecallerState } from "./telecaller.state";

const getTelecallerFeatureSelector =
  createFeatureSelector<TelecallerState>("telecaller");

export const getTelecallerCustomer = createSelector(
  getTelecallerFeatureSelector,
  (state) => {
    return state.customers;
  },
);

export const getTelecallerLoadingState = createSelector(
  getTelecallerFeatureSelector,
  (state) => {
    return state.loading;
  },
);

export const getTelecallerErorrState = createSelector(
  getTelecallerFeatureSelector,
  (state) => {
    return state.error;
  },
);
