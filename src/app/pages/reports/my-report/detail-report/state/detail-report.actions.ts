import { createAction, props } from "@ngrx/store";
import { DetailReportModel } from "../../../../../models/detail-report.model";

export const getDetailReportStartAction = createAction(
  "[detail report] get detail report start",
  props<{ date: string }>(),
);

export const getDetailReportSuccessAction = createAction(
  "[detail report] get detail report success",
  props<{ detailReports: DetailReportModel[] }>(),
);

export const getDetailReportFailureAction = createAction(
  "[detail report] get detail report failure",
  props<{ error: string }>(),
);
