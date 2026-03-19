import { createAction, props } from "@ngrx/store";
import { ProductResponse } from "../../models/products.model";

export const getProductStartAction = createAction(
  "[shared] fetch product start",
);

export const getProductSuccessAction = createAction(
  "[shared] fetch product success",
  props<{ product_name: ProductResponse[] }>(),
);

export const getProductFailedAction = createAction(
  "[shared] fetch product failed",
  props<{ error: string }>(),
);
