import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.state";

const selectUser = createFeatureSelector<UserState>("user");

export const selectUserData = createSelector(selectUser, (state) => {
  return state.user;
});

export const selectUserLoading = createSelector(selectUser, (state) => {
  return state.loading;
});

export const selectUserError = createSelector(selectUser, (state) => {
  return state.error;
});
