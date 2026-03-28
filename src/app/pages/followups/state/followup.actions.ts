import { createAction, props } from "@ngrx/store";
import { FollowUpResponse } from "../../../models/followup.model";

export const loadFollowUpCustomerStartAction = createAction(
  "[followup] fetch start",
);

export const loadFollowUpCustomerSuccessAction = createAction(
  "[followup] fetch success",
  props<{ customers: FollowUpResponse[] }>(),
);

export const loadFollowUpCustomerFailedAction = createAction(
  "[followup] fetch failed",
  props<{ error: string }>(),
);
