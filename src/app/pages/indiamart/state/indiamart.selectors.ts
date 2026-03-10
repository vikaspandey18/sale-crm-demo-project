import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IndiaMartState } from "./indiamart.state";

const getIndiaMartFeatureSelector =
  createFeatureSelector<IndiaMartState>("indiamart");

export const getIndiaMartCustomersSelector = createSelector(
  getIndiaMartFeatureSelector,
  (state) => {
    return state.customers;
  },
);

export const getIndiaMartCustomersLoadingSelector = createSelector(
  getIndiaMartFeatureSelector,
  (state) => {
    return state.loading;
  },
);

export const getIndiaMartCustomersErrorSelector = createSelector(
  getIndiaMartFeatureSelector,
  (state) => {
    return state.error;
  },
);
