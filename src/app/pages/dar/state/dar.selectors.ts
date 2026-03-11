import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DarState } from "./dar.state";

const getDarFeatureSelector = createFeatureSelector<DarState>("dar");

export const getDarSelector = createSelector(getDarFeatureSelector, (state) => {
  return state.dars;
});

export const getDarLoadingSelector = createSelector(
  getDarFeatureSelector,
  (state) => {
    return state.loading;
  },
);

export const getDarErrorSelector = createSelector(
  getDarFeatureSelector,
  (state) => {
    return state.error;
  },
);
