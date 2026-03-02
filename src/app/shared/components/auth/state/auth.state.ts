import { AuthResponse } from "../../../../models/auth.model";

export interface AuthState {
  auth: AuthResponse | null;
}

export const initialState: AuthState = {
  auth: null,
};
