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

export const updateFollowUpCustomerStartAction = createAction(
  "[followup] update start",
  props<{ id: string; field: string; value: any; journeryId: string }>(),
);

export const updateFollowUpCustomerSuccessAction = createAction(
  "[followup] update success",
  props<{ id: string; field: string; value: any }>(),
);

export const updateFollowUpCustomerFailedAction = createAction(
  "[followup] update failed",
  props<{ error: string }>(),
);
