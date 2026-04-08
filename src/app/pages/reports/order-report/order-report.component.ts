import { Component, inject } from "@angular/core";
import { AgGridAngular } from "ag-grid-angular";
import { AlertComponent } from "../../../shared/components/ui/alert/alert.component";
import { AsyncPipe } from "@angular/common";
import { AppState } from "../../../store/app.state";
import { Store } from "@ngrx/store";
import { filter, map, Observable } from "rxjs";
import { OrderReportResponse } from "../../../models/order-report.model";
import {
  ColDef,
  colorSchemeDark,
  colorSchemeLight,
  GridApi,
  themeAlpine,
} from "ag-grid-community";
import { fetchOrderReportStartAction } from "./state/order-report.actions";
import {
  getOrderReportErrorSelector,
  getOrderReportLoadingSelector,
  getOrderReportSelector,
} from "./state/order-report.selectors";
import { DatePickerComponent } from "../../../shared/components/form/date-picker/date-picker.component";
import { ThemeService } from "../../../shared/services/theme.service";

@Component({
  selector: "app-order-report",
  imports: [AsyncPipe, AlertComponent, AgGridAngular, DatePickerComponent],
  templateUrl: "./order-report.component.html",
  styleUrl: "./order-report.component.css",
})
export class OrderReportComponent {
  private store: Store = inject(Store<AppState>);

  private themeService = inject(ThemeService);

  // Convert the Observable to a Signal
  gridTheme$ = this.themeService.theme$.pipe(
    map((theme) =>
      theme === "dark"
        ? themeAlpine.withPart(colorSchemeDark)
        : themeAlpine.withPart(colorSchemeLight),
    ),
  );
  protected readonly themeAlpine = themeAlpine;

  customers$!: Observable<OrderReportResponse[] | []>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  fromDate: string | null = null;
  toDate: string | null = null;

  gridApi!: GridApi;

  columnDefs: ColDef<OrderReportResponse>[] = [
    {
      headerName: "No",
      valueGetter: "node.rowIndex + 1",
      width: 50,
      filter: false,
    },
    { field: "createDate", headerName: "Date", filter: "agDateColumnFilter" },
    { field: "customer_name", headerName: "Customer" },
    { field: "employee_name", headerName: "Employee" },
    {
      field: "order_value",
      headerName: "Amount",
      valueFormatter: (params) => {
        if (params.value == null) return "";
        return new Intl.NumberFormat("en-IN").format(params.value);
      },
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
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);

    this.fromDate = this.formatDate(oneMonthAgo);
    this.toDate = this.formatDate(today);

    this.store.dispatch(
      fetchOrderReportStartAction({
        fromDate: this.fromDate,
        toDate: this.toDate,
      }),
    );

    this.customers$ = this.store.select(getOrderReportSelector);
    this.loading$ = this.store.select(getOrderReportLoadingSelector);
    this.error$ = this.store.select(getOrderReportErrorSelector);
  }

  onFromDateChange(event: any) {
    this.fromDate = event.dateStr;
  }

  onToDateChange(event: any) {
    this.toDate = event.dateStr;
  }

  formatDate(date: Date): string {
    return date.toISOString().split("T")[0];
  }

  applyDateFilter() {
    if (!this.fromDate || !this.toDate) return;

    this.store.dispatch(
      fetchOrderReportStartAction({
        fromDate: this.fromDate,
        toDate: this.toDate,
      }),
    );
  }
}
