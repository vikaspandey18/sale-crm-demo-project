import { AsyncPipe } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { AlertComponent } from "../../shared/components/ui/alert/alert.component";
import { AgGridAngular } from "ag-grid-angular";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.state";
import { ColDef, GridApi, themeAlpine } from "ag-grid-community";
import { LeadResponse } from "../../models/lead.model";
import { getLeadStartAction } from "./state/lead.actions";
import {
  getLeadErrorSelector,
  getLeadLoadingSelector,
  getLeadSelector,
} from "./state/lead.selectors";
import { Observable } from "rxjs";

@Component({
  selector: "app-leads",
  imports: [AsyncPipe, AlertComponent, AgGridAngular],
  templateUrl: "./leads.component.html",
  styleUrl: "./leads.component.css",
})
export class LeadsComponent implements OnInit {
  private store: Store = inject(Store<AppState>);
  customers$!: Observable<LeadResponse[] | []>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  private gridApi!: GridApi<LeadResponse>;

  public theme = themeAlpine;

  columnDefs: ColDef<LeadResponse>[] = [
    {
      field: "employee_name",
      headerName: "Employee Name",
      sortable: true,
      filter: true,
    },
    {
      field: "customer_name",
      headerName: "Customer Name",
      sortable: true,
      filter: true,
      pinned: "left",
      editable: true,
    },
    {
      field: "order_value",
      headerName: "Amount",
      sortable: true,
      filter: true,
      editable: true,
    },
    { field: "products", headerName: "Product", sortable: true, filter: true },
    { field: "status", headerName: "Status", sortable: true, filter: true },
    { field: "comments", headerName: "Comment", sortable: true, filter: true },
    {
      field: "lead_grade",
      headerName: "Lead Grade",
      sortable: true,
      filter: true,
    },
    {
      field: "followup_date",
      headerName: "Followup Date",
      sortable: true,
      filter: true,
    },
    {
      field: "createDate",
      headerName: "Create Date",
      sortable: true,
      filter: true,
    },
  ];

  defaultColDef = {
    filter: true,
    floatingFilter: true,
  };

  ngOnInit(): void {
    this.store.dispatch(getLeadStartAction());

    this.customers$ = this.store.select(getLeadSelector);
    this.loading$ = this.store.select(getLeadLoadingSelector);
    this.error$ = this.store.select(getLeadErrorSelector);
  }
}
