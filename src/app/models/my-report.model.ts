export interface MyReportResponse {
  createDate?:Date,
  call_count?: number;
  order_count?: number;
  order_total?: number;
  payment_count?: number;
  payment_total?: number;
  followup_count?: number;
  interest_count?: number;
  junk_count?: number;
  lead_count?: number;
  lead_total?: number;
  lead_followup_count?: number;
  no_interest_count?: number;
}
