import { createAction, props } from "@ngrx/store";
import { TelecallerModel } from "../../../models/telecaller.model";

export const getTelecallerCustomerStartAction = createAction(
  "[telecaller] customer fetch start",
);

export const getTelecallerCustomerSuccessAction = createAction(
  "[telecaller] customer fetch success",
  props<{ customers: TelecallerModel[] }>(),
);

export const failedToGetTelecallerCustomerAction = createAction(
  "[telecaller] customer fetch failed",
  props<{ error: string }>(),
);

export const updateTelecallerCustomerStartAction = createAction(
  "[telecaller] update start",
  props<{ id: string; field: string; value: any }>(),
);

export const updateTelecallerCustomerSuccessAction = createAction(
  "[Telecaller] Update Customer Success",
  props<{ id: string; field: string; value: any }>(),
);

export const updateTelecallerCustomerFailureAction = createAction(
  "[Telecaller] Update Customer Failure",
  props<{ error: string }>(),
);
