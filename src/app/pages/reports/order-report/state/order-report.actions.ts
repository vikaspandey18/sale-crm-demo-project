import { createAction, props } from "@ngrx/store";
import { OrderReportResponse } from "../../../../models/order-report.model";

export const fetchOrderReportStartAction = createAction(
  "[order-report] fetch start",
  props<{ fromDate: string; toDate: string }>(),
);
export const fetchOrderReportSuccessAction = createAction(
  "[order-report] fetch success",
  props<{ orders: OrderReportResponse[] }>(),
);
export const fetchOrderReportFailedAction = createAction(
  "[order-report] fetch failed",
  props<{ error: string }>(),
);
