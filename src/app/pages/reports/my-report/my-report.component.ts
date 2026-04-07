import { Component, inject } from "@angular/core";
import { AgGridAngular } from "ag-grid-angular";
import { AlertComponent } from "../../../shared/components/ui/alert/alert.component";
import { AsyncPipe, DatePipe } from "@angular/common";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.state";
import { map, Observable } from "rxjs";
import { MyReportResponse } from "../../../models/my-report.model";
import {
  ColDef,
  colorSchemeDark,
  colorSchemeLight,
  GridApi,
  themeAlpine,
} from "ag-grid-community";
import { fetchMyReportStartAction } from "./state/my-report.actions";
import {
  getMyReportErrorSelector,
  getMyReportLoadingSelector,
  getMyReportSelector,
} from "./state/my-report.selectors";
import { ThemeService } from "../../../shared/services/theme.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-my-report",
  imports: [AsyncPipe, AlertComponent, AgGridAngular],
  templateUrl: "./my-report.component.html",
  styleUrl: "./my-report.component.css",
  providers: [DatePipe],
})
export class MyReportComponent {
  private store: Store = inject(Store<AppState>);
  private datePipe = inject(DatePipe);
  private router = inject(Router);

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

  customers$!: Observable<MyReportResponse[] | []>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  private gridApi!: GridApi<MyReportResponse>;

  columnDefs: ColDef<MyReportResponse>[] = [
    {
      headerName: "No",
      valueGetter: "node.rowIndex + 1",
      width: 80,
    },
    {
      field: "createDate",
      headerName: "Date",
      cellRenderer: (params: any) => {
        if (!params.value) return "";

        const formatted =
          this.datePipe.transform(params.value, "dd-MM-yyyy") ?? "";

        return `<span class="date-link">${formatted}</span>`;
      },
      onCellClicked: (params: any) => {
        if (params.colDef.field === "createDate") {
          this.goToDetail(params.data);
        }
      },
    },
    { field: "call_count", headerName: "No of Call" },
    { field: "order_count", headerName: "No of Order" },
    { field: "order_total", headerName: "Total Order" },
    { field: "payment_count", headerName: "No of Payment" },
    { field: "payment_total", headerName: "Total Payment" },
    { field: "followup_count", headerName: "No of Followup" },
    { field: "interest_count", headerName: "No of Interested" },
    { field: "junk_count", headerName: "No of Junk" },
    { field: "lead_count", headerName: "No of Lead" },
    { field: "lead_total", headerName: "Total Lead" },
    { field: "lead_followup_count", headerName: "No of Lead Followup" },
    { field: "no_interest_count", headerName: "No of Not Interested" },
  ];

  defaultColDef = {
    sortable: true,
  };

  goToDetail(row: any) {
    this.router.navigate(["/detail-report", row.createDate]);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchMyReportStartAction());

    this.customers$ = this.store.select(getMyReportSelector);
    this.loading$ = this.store.select(getMyReportLoadingSelector);
    this.error$ = this.store.select(getMyReportErrorSelector);
  }
}
