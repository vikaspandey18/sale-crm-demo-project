import { createReducer, on } from "@ngrx/store";
import { initialState } from "./auth.state";
import { loginSuccessAction } from "./auth.actions";

export const authReducer = createReducer(
  initialState,
  on(loginSuccessAction, (state, action) => {
    return {
      ...state,
      auth: action?.auth,
    };
  }),
);
