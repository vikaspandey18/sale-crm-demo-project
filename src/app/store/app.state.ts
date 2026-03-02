import { authReducer } from "../shared/components/auth/state/auth.reducer";
import { AuthState } from "../shared/components/auth/state/auth.state";

export interface AppState {
  auth: AuthState;
}

export const AppReducer = {
  auth: authReducer,
};

export const appEffect = {};
