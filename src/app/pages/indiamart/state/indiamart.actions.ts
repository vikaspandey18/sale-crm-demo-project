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

export const updateIndiaMartStartAction = createAction(
  "[indiamart] update start",
  props<{ id: string; field: string; value: any }>(),
);

export const updateIndiaMartCustomerSuccessAction = createAction(
  "[indiamart] update customer Success",
  props<{ id: string; field: string; value: any }>(),
);

export const updateIndiaMartCustomerFailureAction = createAction(
  "[indiamart] update customer Failure",
  props<{ error: string }>(),
);
