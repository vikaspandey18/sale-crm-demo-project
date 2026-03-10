import { IndiaMartCustomer } from "../../../models/india-mart.model";

export interface IndiaMartState {
  customers: IndiaMartCustomer[];
  loading: boolean;
  error: string | null;
}

export const initialState: IndiaMartState = {
  customers: [],
  loading: false,
  error: null,
};
