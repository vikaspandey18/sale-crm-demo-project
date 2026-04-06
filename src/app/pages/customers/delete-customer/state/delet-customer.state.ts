import { CustomerResponse } from "../../../../models/customer.model";

export interface DeleteCustomerState {
  customers: CustomerResponse[] | [];
  loading: boolean;
  error: string | null;
}

export const initialState: DeleteCustomerState = {
  customers: [],
  loading: false,
  error: null,
};
