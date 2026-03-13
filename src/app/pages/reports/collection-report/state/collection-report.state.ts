import { CollectionReportResponse } from "../../../../models/collection-report.model";

export interface CollectionReportState {
  collections: CollectionReportResponse[] | [];
  loading: boolean;
  error: string | null;
}

export const initialState: CollectionReportState = {
  collections: [],
  loading: false,
  error: null,
};
