import { createAction, props } from "@ngrx/store";
import { MyReportResponse } from "../../../../models/my-report.model";

export const fetchMyReportStartAction = createAction(
  "[my-report] my-report start",
);

export const fetchMyReportSuccessAction = createAction(
  "[my-report] my-report success",
  props<{ reports: MyReportResponse[] }>(),
);

export const fetchMyReportFaieldAction = createAction(
  "[my-report] my-report failed",
  props<{ error: string }>(),
);
