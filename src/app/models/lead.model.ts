export interface LeadResponse {
  id?: string;
  employee_name?: string;
  customer_name?: string;
  order_value?: string;
  products?: string;
  status?: string;
  comments?: string;
  lead_grade?: string;
  followup_date?: string;
  createDate?: string;
}

export interface LeadHistory {
  id?: string;
  lead_id?: string;
  status?: string;
  followup?: string;
  comment?: string;
  createDate?: string;
}
