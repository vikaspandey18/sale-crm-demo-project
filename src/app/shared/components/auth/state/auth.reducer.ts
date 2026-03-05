import { createReducer, on } from "@ngrx/store";
import { initialState } from "./auth.state";
import { loginFailureAction, loginStartAction, loginSuccessAction, logoutAction } from "./auth.actions";

export const authReducer = createReducer(
  initialState,
  on(loginStartAction, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loginSuccessAction, (state, action) => ({
    ...state,
    auth: action.auth,
    loading: false,
    error: null,
  })),
  on(loginFailureAction, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),

  on(logoutAction, () => initialState),
);
