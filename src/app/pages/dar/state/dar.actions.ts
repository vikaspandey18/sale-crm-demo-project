import { createAction, props } from "@ngrx/store";
import { DarResponse } from "../../../models/dar.model";

export const fetchDarStartAction = createAction("[dar] fetch start");

export const fetchDarSuccessAction = createAction(
  "[dar] fetch success",
  props<{ dar: DarResponse[] }>(),
);

export const fetchDarFailedAction = createAction(
  "[dar] fetch failed",
  props<{ error: string }>(),
);
