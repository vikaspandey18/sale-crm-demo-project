import { ProductResponse } from "../../models/products.model";

export interface SharedState {
  product_name: ProductResponse[] | [];
  loading: boolean;
  error: string | null;
}

export const initialState: SharedState = {
  product_name: [],
  loading: false,
  error: null,
};
