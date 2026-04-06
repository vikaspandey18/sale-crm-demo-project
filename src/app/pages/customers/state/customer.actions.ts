import { createAction, props } from "@ngrx/store";
import { CustomerResponse } from "../../../models/customer.model";

export const getCustomer = createAction("[customer] Get Customer");

export const getCustomerSuccess = createAction(
  "[customer] Get Customer Success",
  props<{ customers: CustomerResponse[] }>(),
);

export const getCustomerFailure = createAction(
  "[customer] Get Customer Failure",
  props<{ error: string }>(),
);

