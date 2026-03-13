import { Component, inject } from "@angular/core";
import { AgGridAngular } from "ag-grid-angular";
import { AlertComponent } from "../../../shared/components/ui/alert/alert.component";
import { AsyncPipe } from "@angular/common";
import { fetchOrderReportStartAction } from "../order-report/state/order-report.actions";
import {
  getOrderReportErrorSelector,
  getOrderReportLoadingSelector,
  getOrderReportSelector,
} from "../order-report/state/order-report.selectors";
import { OrderReportResponse } from "../../../models/order-report.model";
import { ColDef, GridApi, themeAlpine } from "ag-grid-community";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.state";
import { CollectionReportResponse } from "../../../models/collection-report.model";
import { fetchCollectionReportStartAction } from "./state/collection-report.actions";
import {
  getCollectionReportErrorSelector,
  getCollectionReportLoadingSelector,
  getCollectionReportSelector,
} from "./state/collection-report.selectors";

@Component({
  selector: "app-collection-report",
  imports: [AsyncPipe, AlertComponent, AgGridAngular],
  templateUrl: "./collection-report.component.html",
  styleUrl: "./collection-report.component.css",
})
export class CollectionReportComponent {
  private store: Store = inject(Store<AppState>);
  customers$!: Observable<CollectionReportResponse[] | []>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  gridApi!: GridApi;

  public theme = themeAlpine;

  columnDefs: ColDef<CollectionReportResponse>[] = [
    { field: "createDate", headerName: "Date" },
    { field: "customer_name", headerName: "Customer" },
    { field: "employee_name", headerName: "Employee" },
    {
      field: "amount",
      headerName: "Amount",
      cellClassRules: {
        "cell-error": (params) => params.value < 0,
      },
    },
    { field: "payment_status", headerName: "Order Received" },
    { field: "comment", headerName: "Comment" },
    { field: "followup_date", headerName: "Follow Up Date" },
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
    this.store.dispatch(fetchCollectionReportStartAction());

    this.customers$ = this.store.select(getCollectionReportSelector);
    this.loading$ = this.store.select(getCollectionReportLoadingSelector);
    this.error$ = this.store.select(getCollectionReportErrorSelector);
  }
}
