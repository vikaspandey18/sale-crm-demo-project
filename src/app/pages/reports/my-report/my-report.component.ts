import { Component, inject } from "@angular/core";
import { AgGridAngular } from "ag-grid-angular";
import { AlertComponent } from "../../../shared/components/ui/alert/alert.component";
import { AsyncPipe } from "@angular/common";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.state";
import { Observable } from "rxjs";
import { MyReportResponse } from "../../../models/my-report.model";
import { ColDef, GridApi, themeAlpine } from "ag-grid-community";
import { fetchMyReportStartAction } from "./state/my-report.actions";
import {
  getMyReportErrorSelector,
  getMyReportLoadingSelector,
  getMyReportSelector,
} from "./state/my-report.selectors";

@Component({
  selector: "app-my-report",
  imports: [AsyncPipe, AlertComponent, AgGridAngular],
  templateUrl: "./my-report.component.html",
  styleUrl: "./my-report.component.css",
})
export class MyReportComponent {
  private store: Store = inject(Store<AppState>);
  customers$!: Observable<MyReportResponse[] | []>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  private gridApi!: GridApi<MyReportResponse>;

  public theme = themeAlpine;

  columnDefs: ColDef<MyReportResponse>[] = [
    { field: "createDate", headerName: "Date" },
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

  ngOnInit(): void {
    this.store.dispatch(fetchMyReportStartAction());

    this.customers$ = this.store.select(getMyReportSelector);
    this.loading$ = this.store.select(getMyReportLoadingSelector);
    this.error$ = this.store.select(getMyReportErrorSelector);
  }
}
