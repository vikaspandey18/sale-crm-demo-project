import { createAction, props } from "@ngrx/store";
import { AuthResponse } from "../../../../models/auth.model";

export const loginStartAction = createAction(
  "[auth] login start",
  props<{ email: string; password: string }>(),
);

export const loginSuccessAction = createAction(
  "[auth] login success",
  props<{ auth: AuthResponse }>(),
);
