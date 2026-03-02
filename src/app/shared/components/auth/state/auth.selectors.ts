import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

const authFeatureSelector = createFeatureSelector<AuthState>("auth");

export const getAuthName = createSelector(authFeatureSelector, (state) => {
  return state.auth?.name;
});
