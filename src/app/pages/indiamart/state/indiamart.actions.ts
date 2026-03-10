import { createAction, props } from "@ngrx/store";
import { IndiaMartCustomer } from "../../../models/india-mart.model";

export const getIndianMartCustomerAction = createAction(
  "[indiamart] customer fetch start",
);

export const getIndiaMartCustomerSuccessAction = createAction(
  "[indiamart] customer success",
  props<{ customers: IndiaMartCustomer[] }>(),
);

export const failedIndiaMartCustomerAction = createAction(
  "[indiamart] customer fetch failed",
  props<{ error: string }>(),
);
