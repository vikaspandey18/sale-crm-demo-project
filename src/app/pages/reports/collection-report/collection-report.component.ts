import { Component, inject, OnInit } from "@angular/core";
import { AgGridAngular } from "ag-grid-angular";
import { AlertComponent } from "../../../shared/components/ui/alert/alert.component";
import { AsyncPipe } from "@angular/common";
import { ColDef, colorSchemeDark, colorSchemeLight, GridApi, themeAlpine } from "ag-grid-community";
import { map, Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.state";
import { CollectionReportResponse } from "../../../models/collection-report.model";
import { fetchCollectionReportStartAction } from "./state/collection-report.actions";
import {
  getCollectionReportErrorSelector,
  getCollectionReportLoadingSelector,
  getCollectionReportSelector,
} from "./state/collection-report.selectors";
import { DatePickerComponent } from "../../../shared/components/form/date-picker/date-picker.component";
import { ThemeService } from "../../../shared/services/theme.service";

@Component({
  selector: "app-collection-report",
  imports: [AsyncPipe, AlertComponent, AgGridAngular, DatePickerComponent],
  templateUrl: "./collection-report.component.html",
  styleUrl: "./collection-report.component.css",
})
export class CollectionReportComponent implements OnInit {
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

  customers$!: Observable<CollectionReportResponse[] | []>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  fromDate: string | null = null;
  toDate: string | null = null;

  gridApi!: GridApi;

  public theme = themeAlpine;

  columnDefs: ColDef<CollectionReportResponse>[] = [
    {
      headerName: "No",
      valueGetter: "node.rowIndex + 1",
      width: 50,
      filter: false,
    },
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

  ngOnInit() {
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);

    this.fromDate = this.formateDate(oneMonthAgo);
    this.toDate = this.formateDate(today);

    this.store.dispatch(
      fetchCollectionReportStartAction({
        fromDate: this.fromDate,
        toDate: this.toDate,
      }),
    );

    this.customers$ = this.store.select(getCollectionReportSelector);
    this.loading$ = this.store.select(getCollectionReportLoadingSelector);
    this.error$ = this.store.select(getCollectionReportErrorSelector);
  }

  formateDate(date: Date): string {
    return date.toISOString().split("T")[0];
  }

  onFromDateChange(event: any) {
    this.fromDate = event.dateStr;
  }

  onToDateChange(event: any) {
    this.toDate = event.dateStr;
  }

  applyDateFilter() {
    if (!this.fromDate || !this.toDate) return;

    this.store.dispatch(
      fetchCollectionReportStartAction({
        fromDate: this.fromDate,
        toDate: this.toDate,
      }),
    );
  }
}
