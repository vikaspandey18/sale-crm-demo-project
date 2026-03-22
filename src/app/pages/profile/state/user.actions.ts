import { createAction, props } from "@ngrx/store";
import { UserRespone } from "../../../models/user.model";

export const loadUserStartAction = createAction("[user] fetch user start");

export const loadUserSuccessAction = createAction(
  "[user] fetch user success",
  props<{ user: UserRespone }>(),
);

export const loadUserFailedAction = createAction(
  "[user] fetch user failed",
  props<{ error: string }>(),
);
