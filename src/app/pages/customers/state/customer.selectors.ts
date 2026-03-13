import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CustomerState } from "./customer.state";

const getCustomerFeatureSelector =
  createFeatureSelector<CustomerState>("customer");

export const getSelectorCustomers = createSelector(
  getCustomerFeatureSelector,
  (state) => {
    return state.customers;
  },
);

export const getCustomerLoadingStatus = createSelector(
  getCustomerFeatureSelector,
  (state) => {
    return state.loading;
  },
);

export const getCustomerErrorStatus = createSelector(
  getCustomerFeatureSelector,
  (state) => {
    return state.error;
  },
);

export const getCustomerLoadedStatus = createSelector(
  getCustomerFeatureSelector,
  (state) => {
    return state.loaded;
  },
);
