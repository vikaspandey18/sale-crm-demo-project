import { OrderReportResponse } from "../../../../models/order-report.model";

export interface OrderReportState {
  orders: OrderReportResponse[] | [];
  loading: boolean;
  error: string | null;
}

export const initialState: OrderReportState = {
  orders: [],
  loading: false,
  error: null,
};
