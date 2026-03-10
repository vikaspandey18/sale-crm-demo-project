import { LeadResponse } from "../../../models/lead.model";

export interface LeadState {
  leads: LeadResponse[] | [];
  loading: boolean;
  error: string | null;
}

export const initialState: LeadState = {
  leads: [],
  loading: false,
  error: null,
};
