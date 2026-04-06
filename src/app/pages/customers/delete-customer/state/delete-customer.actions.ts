import { createAction, props } from "@ngrx/store";
import { CustomerResponse } from "../../../../models/customer.model";

export const getDeleteCustomer = createAction("[customer] Get Delete Customer");

export const getDeleteCustomerSuccess = createAction(
  "[customer] Get Delete Customer Success",
  props<{ customers: CustomerResponse[] }>(),
);

export const getDeleteCustomerFailure = createAction(
  "[customer] Get Delete Customer Failure",
  props<{ error: string }>(),
);
