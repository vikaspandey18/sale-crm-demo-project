import { createAction, props } from "@ngrx/store";
import { AuthResponse } from "../../../../models/auth.model";

export const loginStartAction = createAction(
  "[auth] login start",
  props<{ mobile: string; password: string }>(),
);

export const loginSuccessAction = createAction(
  "[auth] login success",
  props<{ auth: AuthResponse; redirect: boolean }>(),
);

export const loginFailureAction = createAction(
  "[auth] login failure",
  props<{ error: string }>(),
);

export const logoutAction = createAction("[Auth] Logout");

export const getLoggedUser = createAction("[auth] get logged user");
