import { FollowUpResponse } from "../../../models/followup.model";

export interface FollowUpState {
  customers: FollowUpResponse[] | [];
  loading: boolean;
  error: string | null;
}

export const initialState: FollowUpState = {
  customers: [],
  loading: false,
  error: null,
};
