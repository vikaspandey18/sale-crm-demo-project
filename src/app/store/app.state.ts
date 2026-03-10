import { CustomerEffect } from "../pages/customers/state/customer.effects";
import { customerReducer } from "../pages/customers/state/customer.reducer";
import { CustomerState } from "../pages/customers/state/customer.state";
<<<<<<< HEAD
import { IndiaMartEffect } from "../pages/indiamart/state/indiamart.effects";
import { indiaMartReducer } from "../pages/indiamart/state/indiamart.reducer";
import { IndiaMartState } from "../pages/indiamart/state/indiamart.state";
=======
import { TelecallerEffect } from "../pages/telecaller/state/telecaller.effects";
import { telecallerReducer } from "../pages/telecaller/state/telecaller.reducer";
import { TelecallerState } from "../pages/telecaller/state/telecaller.state";
>>>>>>> 2e44fb59e1f65da172e3582213bc21efeccb23ab
import { AuthEffect } from "../shared/components/auth/state/auth.effects";
import { authReducer } from "../shared/components/auth/state/auth.reducer";
import { AuthState } from "../shared/components/auth/state/auth.state";
  
export interface AppState {
  auth: AuthState;
  customer: CustomerState;
<<<<<<< HEAD
  indiamart: IndiaMartState;
=======
  telecaller: TelecallerState;
>>>>>>> 2e44fb59e1f65da172e3582213bc21efeccb23ab
}

export const AppReducer = {
  auth: authReducer,
  customer: customerReducer,
<<<<<<< HEAD
  indiamart: indiaMartReducer,
};

export const AppEffect = [AuthEffect, CustomerEffect, IndiaMartEffect];
=======
  telecaller: telecallerReducer,
};

export const AppEffect = [AuthEffect, CustomerEffect, TelecallerEffect];
>>>>>>> 2e44fb59e1f65da172e3582213bc21efeccb23ab
