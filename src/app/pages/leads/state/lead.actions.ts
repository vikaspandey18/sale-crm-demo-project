import { createAction, props } from "@ngrx/store";
import { LeadResponse } from "../../../models/lead.model";

export const getLeadStartAction = createAction("[lead] start");

export const getLeadSuccessAction = createAction(
  "[lead] success",
  props<{ leads: LeadResponse[] }>(),
);

export const getLeadErrorAction = createAction(
  "[lead] failed",
  props<{ error: string }>(),
);
