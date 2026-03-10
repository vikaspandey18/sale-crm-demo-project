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
