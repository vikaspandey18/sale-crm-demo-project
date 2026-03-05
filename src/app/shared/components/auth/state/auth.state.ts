import { AuthResponse } from "../../../../models/auth.model";

export interface AuthState {
  auth: AuthResponse | null;
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  auth: null,
  loading: false,
  error: null,
};
