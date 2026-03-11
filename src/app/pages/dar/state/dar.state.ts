import { DarResponse } from "../../../models/dar.model";

export interface DarState {
  dars: DarResponse[] | [];
  loading: boolean;
  error: string | null;
}

export const initialState: DarState = {
  dars: [],
  loading: false,
  error: null,
};
