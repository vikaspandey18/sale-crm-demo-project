import { createReducer, on } from "@ngrx/store";
import { initialState } from "./user.state";
import { loadUserFailedAction, loadUserStartAction, loadUserSuccessAction, updateUserFailedAction, updateUserStartAction, updateUserSuccessAction } from "./user.actions";

export const userReducer = createReducer(
  initialState,
  
  //Load User
  on(loadUserStartAction, (state, action) => {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(loadUserSuccessAction, (state, action) => {
    return {
      ...state,
      user: action.user,
      loading: false,
      error: null,
    };
  }),
  on(loadUserFailedAction, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),

  //Update User
  on(updateUserStartAction, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(updateUserSuccessAction, (state, action) => ({
    ...state,
    user: action.user,
    loading: false,
    error: null,
  })),

  on(updateUserFailedAction, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
);