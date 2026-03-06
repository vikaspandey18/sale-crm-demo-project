import { CustomerResponse } from "../../../models/customer.model";

export interface CustomerState {
  customer: CustomerResponse | null;
  loading: boolean;
  error: string | null;
}

export const initialState: CustomerState = {
  customer: null,
  loading: false,
  error: null,
};
