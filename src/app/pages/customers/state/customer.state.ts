import { CustomerResponse } from "../../../models/customer.model";

export interface CustomerState {
  customers: CustomerResponse[];
  loading: boolean;
  loaded: boolean;
  error: string | null;
}

export const initialState: CustomerState = {
  customers: [],
  loading: false,
  loaded: false,
  error: null,
};
