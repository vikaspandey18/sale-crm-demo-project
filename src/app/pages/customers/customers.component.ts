import { Component, inject, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { CustomerResponse } from "../../models/customer.model";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.state";
import { getCustomer } from "./state/customer.actions";
import {
  getCustomerErrorStatus,
  getCustomerLoadingStatus,
  getSelectorCustomers,
} from "./state/customer.selectors";
import { AsyncPipe } from "@angular/common";
import { AgGridAngular } from "ag-grid-angular";
import { ColDef, GridApi } from "ag-grid-community";
import {
  themeAlpine,
  themeBalham,
  themeMaterial,
  themeQuartz,
} from "ag-grid-community";
import { AlertComponent } from "../../shared/components/ui/alert/alert.component";

@Component({
  selector: "app-customers",
  imports: [AsyncPipe, AgGridAngular,AlertComponent],
  templateUrl: "./customers.component.html",
  styleUrl: "./customers.component.css",
})
export class CustomersComponent implements OnInit {
  private store = inject(Store<AppState>);

  private gridApi!: GridApi<CustomerResponse>;

  // themes = [
  //   { label: "themeQuartz", theme: themeQuartz },
  //   { label: "themeBalham", theme: themeBalham },
  //   { label: "themeMaterial", theme: themeMaterial },
  //   { label: "themeAlpine", theme: themeAlpine },
  // ];

  public theme = themeAlpine;

  customers$!: Observable<CustomerResponse[]>;

  loadingCustomer$!: Observable<boolean>;
  errorCustomer$!: Observable<string | null>;

  columnDefs: ColDef<CustomerResponse>[] = [
    {
      field: "customer_name",
      headerName: "Customer Name",
      sortable: true,
      filter: true,
      pinned: "left",
      editable: true,
    },
    { field: "mobile_no", headerName: "Mobile", sortable: true, filter: true },
    { field: "email", headerName: "Email", sortable: true, filter: true },
    { field: "city", headerName: "City", sortable: true, filter: true },
    { field: "state", headerName: "State", sortable: true, filter: true },
    {
      field: "followup_date",
      headerName: "Followup Date",
      sortable: true,
      filter: true,
    },
    {
      field: "last_order_date",
      headerName: "Last Order",
      sortable: true,
      filter: true,
    },
    { field: "comment", headerName: "Comment", sortable: true, filter: true },
  ];

  defaultColDef = {
    filter: true,
    floatingFilter: true,
    editable: true,
  };

  ngOnInit(): void {
    this.store.dispatch(getCustomer());

    this.customers$ = this.store.select(getSelectorCustomers);
    this.loadingCustomer$ = this.store.select(getCustomerLoadingStatus);
    this.errorCustomer$ = this.store.select(getCustomerErrorStatus);
  }
}
