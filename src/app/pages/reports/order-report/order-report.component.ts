import { Component, inject } from "@angular/core";
import { AgGridAngular } from "ag-grid-angular";
import { AlertComponent } from "../../../shared/components/ui/alert/alert.component";
import { AsyncPipe } from "@angular/common";
import { AppState } from "../../../store/app.state";
import { Store } from "@ngrx/store";
import { filter, Observable } from "rxjs";
import { OrderReportResponse } from "../../../models/order-report.model";
import { ColDef, GridApi, themeAlpine } from "ag-grid-community";
import { fetchOrderReportStartAction } from "./state/order-report.actions";
import {
  getOrderReportErrorSelector,
  getOrderReportLoadingSelector,
  getOrderReportSelector,
} from "./state/order-report.selectors";

@Component({
  selector: "app-order-report",
  imports: [AsyncPipe, AlertComponent, AgGridAngular],
  templateUrl: "./order-report.component.html",
  styleUrl: "./order-report.component.css",
})
export class OrderReportComponent {
  private store: Store = inject(Store<AppState>);
  customers$!: Observable<OrderReportResponse[] | []>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  gridApi!: GridApi;

  public theme = themeAlpine;

  columnDefs: ColDef<OrderReportResponse>[] = [
    { field: "createDate", headerName: "Date" },
    { field: "customer_name", headerName: "Customer" },
    { field: "employee_name", headerName: "Employee" },
    {
      field: "order_value",
      headerName: "Amount",
      cellClassRules: {
        "cell-error": (params) => params.value < 0,
      },
    },
    { field: "order", headerName: "Order Received" },
    { field: "product", headerName: "Product" },
    { field: "comment", headerName: "Comment" },
    { field: "followup_date", headerName: "Follow Up Date" },
    { field: "payment_done", headerName: "Payment Done" },
    { field: "purchaser", headerName: "Purchaser" },
    { field: "old_new", headerName: "Old/New" },
  ];

  defaultColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
  };

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  clearFilters() {
    this.gridApi.setFilterModel(null);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchOrderReportStartAction());

    this.customers$ = this.store.select(getOrderReportSelector);
    this.loading$ = this.store.select(getOrderReportLoadingSelector);
    this.error$ = this.store.select(getOrderReportErrorSelector);
  }
}
