import { DetailReportModel } from "../../../../../models/detail-report.model";

export interface DetailReportState {
  detailReport: DetailReportModel[] | [];
  loading: boolean;
  error: string | null;
}

export const initialState: DetailReportState = {
  detailReport: [],
  loading: false,
  error: null,
};
