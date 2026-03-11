import { MyReportResponse } from "../../../../models/my-report.model";

export interface MyReportState {
  reports: MyReportResponse[] | [];
  loading: boolean;
  error: string | null;
}

export const initialState: MyReportState = {
  reports: [],
  loading: false,
  error: null,
};
