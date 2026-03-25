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

export const updateUserStartAction = createAction(
  "[user] update user start",
  props<{ formData: FormData }>(),
);

export const updateUserSuccessAction = createAction(
  "[user] update user success",
  props<{ user: UserRespone }>(),
);

export const updateUserFailedAction = createAction(
  "[user] update user failed",
  props<{ error: string }>(),
);