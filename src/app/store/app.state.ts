import { CustomerEffect } from "../pages/customers/state/customer.effects";
import { customerReducer } from "../pages/customers/state/customer.reducer";
import { CustomerState } from "../pages/customers/state/customer.state";
import { TelecallerEffect } from "../pages/telecaller/state/telecaller.effects";
import { telecallerReducer } from "../pages/telecaller/state/telecaller.reducer";
import { TelecallerState } from "../pages/telecaller/state/telecaller.state";
import { AuthEffect } from "../shared/components/auth/state/auth.effects";
import { authReducer } from "../shared/components/auth/state/auth.reducer";
import { AuthState } from "../shared/components/auth/state/auth.state";

export interface AppState {
  auth: AuthState;
  customer: CustomerState;
  telecaller: TelecallerState;
}

export const AppReducer = {
  auth: authReducer,
  customer: customerReducer,
  telecaller: telecallerReducer,
};

export const AppEffect = [AuthEffect, CustomerEffect, TelecallerEffect];
