import { TelecallerModel } from "../../../models/telecaller.model";

export interface TelecallerState {
  customers: TelecallerModel[];
  loading: boolean;
  error: string | null;
}

export const initialState: TelecallerState = {
  customers: [],
  loading: false,
  error: null,
};
