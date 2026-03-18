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
  imports: [AsyncPipe, AgGridAngular, AlertComponent],
  templateUrl: "./customers.component.html",
  styleUrl: "./customers.component.css",
})
export class CustomersComponent implements OnInit {
  private store = inject(Store<AppState>);

  private gridApi!: GridApi<CustomerResponse>;

  public theme = themeAlpine;

  customers$!: Observable<CustomerResponse[]>;

  loadingCustomer$!: Observable<boolean>;
  errorCustomer$!: Observable<string | null>;

  columnDefs: ColDef<CustomerResponse>[] = [
    {
      headerName: "No",
      valueGetter: "node.rowIndex + 1",
      width: 100,
    },
    { field: "customer_name", headerName: "Customer Name" },
    { field: "groups", headerName: "Groups" },
    { field: "telephone_no", headerName: "Telephone No" },
    { field: "incharge_person_name", headerName: "Incharge Person Name" },
    { field: "mobile_no", headerName: "Mobile" },
    { field: "email", headerName: "Email" },
    { field: "city", headerName: "City" },
    { field: "material", headerName: "Material" },
    { field: "manufacturing", headerName: "Manufacturing" },
    { field: "followup_date", headerName: "Followup Date" },
    { field: "comment", headerName: "Comment" },
    { field: "address", headerName: "Address" },
    { field: "state", headerName: "State" },
    { field: "sources", headerName: "Sources" },
    { field: "activity_date", headerName: "Activity Date" },
    { field: "last_comment", headerName: "Last Comment" },
    { field: "last_order_date", headerName: "Last Order Date" },
  ];

  defaultColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
  };

  ngOnInit(): void {
    this.store.dispatch(getCustomer());

    this.customers$ = this.store.select(getSelectorCustomers);
    this.loadingCustomer$ = this.store.select(getCustomerLoadingStatus);
    this.errorCustomer$ = this.store.select(getCustomerErrorStatus);
  }
}
