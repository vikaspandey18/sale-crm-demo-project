import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CollectionReportState } from "./collection-report.state";

const getCollectionReportFeatureSelector =
  createFeatureSelector<CollectionReportState>("collectionReport");

export const getCollectionReportSelector = createSelector(
  getCollectionReportFeatureSelector,
  (state) => {
    return state.collections;
  },
);

export const getCollectionReportLoadingSelector = createSelector(
  getCollectionReportFeatureSelector,
  (state) => {
    return state.loading;
  },
);

export const getCollectionReportErrorSelector = createSelector(
  getCollectionReportFeatureSelector,
  (state) => {
    return state.error;
  },
);
