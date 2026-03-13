import { createAction, props } from "@ngrx/store";
import { CollectionReportResponse } from "../../../../models/collection-report.model";

export const fetchCollectionReportStartAction = createAction(
  "[collection-report] fetch start",
);

export const fetchCollectionReportSuccessAction = createAction(
  "[collection-report] fetch success",
  props<{ collections: CollectionReportResponse[] }>(),
);

export const fetchCollectionReportFailedAction = createAction(
  "[collection-report] fetch failed",
  props<{ error: string }>(),
);
