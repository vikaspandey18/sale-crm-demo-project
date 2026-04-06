import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DeleteCustomerState } from "./delet-customer.state";

const selectDeleteCustomer =
  createFeatureSelector<DeleteCustomerState>("deleteCustomer");

export const selectDelCustomer = createSelector(
  selectDeleteCustomer,
  (state) => {
    return state.customers;
  },
);

export const selectDelCustomerLoadingStatus = createSelector(
  selectDeleteCustomer,
  (state) => {
    return state.loading;
  },
);

export const selectDelCustomerErrorStatus = createSelector(
  selectDeleteCustomer,
  (state) => {
    return state.error;
  },
);
