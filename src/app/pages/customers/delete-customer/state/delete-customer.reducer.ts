import { createReducer, on } from "@ngrx/store";
import { initialState } from "./delet-customer.state";
import { getDeleteCustomer, getDeleteCustomerFailure, getDeleteCustomerSuccess } from "./delete-customer.actions";

export const deleteCustomerReducer = createReducer(
  initialState,

  //deleted Customer
  on(getDeleteCustomer, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(getDeleteCustomerSuccess, (state, action) => ({
    ...state,
    loading: false,
    customers: action.customers,
  })),

  on(getDeleteCustomerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
);
