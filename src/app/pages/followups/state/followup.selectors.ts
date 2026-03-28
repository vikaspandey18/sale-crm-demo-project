import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FollowUpState } from "./followup.state";

const selectFollowUp = createFeatureSelector<FollowUpState>("followUp");

export const selectFollowUpCustomer = createSelector(
  selectFollowUp,
  (state) => {
    return state.customers;
  },
);

export const selectFollowUpLoadingCustomer = createSelector(
  selectFollowUp,
  (state) => {
    return state.loading;
  },
);

export const selectFollowUpErrorCustomer = createSelector(
  selectFollowUp,
  (state) => {
    return state.error;
  },
);
