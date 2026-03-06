import { createAction, props } from "@ngrx/store";
import { CustomerResponse } from "../../../models/customer.model";

export const getCustomer = createAction("[Customer] Get Customer");

export const getCustomerSuccess = createAction(
  "[Customer] Get Customer Success",
  props<{ customers: CustomerResponse[] }>(),
);

export const getCustomerFailure = createAction(
  "[Customer] Get Customer Failure",
  props<{ error: string }>(),
);
