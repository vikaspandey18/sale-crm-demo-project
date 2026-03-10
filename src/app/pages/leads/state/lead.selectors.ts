import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LeadState } from "./lead.state";

const getLeadFeatureSelector = createFeatureSelector<LeadState>("lead");

export const getLeadSelector = createSelector(
  getLeadFeatureSelector,
  (state) => {
    return state.leads;
  },
);

export const getLeadLoadingSelector = createSelector(
  getLeadFeatureSelector,
  (state) => {
    return state.loading;
  },
);

export const getLeadErrorSelector = createSelector(
  getLeadFeatureSelector,
  (state) => {
    return state.error;
  },
);
