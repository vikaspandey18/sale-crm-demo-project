import { Component, inject, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../store/app.state";
import { map, Observable } from "rxjs";
import { DetailReportModel } from "../../../../models/detail-report.model";
import {
  selectDetailReportData,
  selectDetailReportError,
  selectDetailReportLoading,
} from "./state/detail-report.selectors";
import { ThemeService } from "../../../../shared/services/theme.service";
import {
  ColDef,
  colorSchemeDark,
  colorSchemeLight,
  themeAlpine,
} from "ag-grid-community";
import { AsyncPipe } from "@angular/common";
import { AlertComponent } from "../../../../shared/components/ui/alert/alert.component";
import { AgGridAngular } from "ag-grid-angular";
import { getDetailReportStartAction } from "./state/detail-report.actions";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-detail-report",
  imports: [AsyncPipe, AlertComponent, AgGridAngular],
  templateUrl: "./detail-report.component.html",
  styleUrl: "./detail-report.component.css",
})
export class DetailReportComponent implements OnInit {
  private store = inject(Store<AppState>);
  private themeService = inject(ThemeService);
  protected readonly themeAlpine = themeAlpine;
  private route = inject(ActivatedRoute);

  gridTheme$ = this.themeService.theme$.pipe(
    map((theme) =>
      theme === "dark"
        ? themeAlpine.withPart(colorSchemeDark)
        : themeAlpine.withPart(colorSchemeLight),
    ),
  );

  detailReport$!: Observable<DetailReportModel[] | []>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  ngOnInit(): void {
    const date = this.route.snapshot.params["date"];
    this.store.dispatch(getDetailReportStartAction({ date }));

    this.detailReport$ = this.store.select(selectDetailReportData);
    this.loading$ = this.store.select(selectDetailReportLoading);
    this.error$ = this.store.select(selectDetailReportError);
  }

  columnDefs: ColDef<DetailReportModel>[] = [
    {
      headerName: "No",
      valueGetter: "node.rowIndex + 1",
      width: 80,
      pinned: "left",
      filter: false,
    },
    {
      field: "customer_name",
      headerName: "Customer Name",
    },
    { field: "groups", headerName: "Groups" },
    { field: "city", headerName: "City" },
    { field: "incharge_person_name", headerName: "Incharge Person Name" },
    { field: "telephone_no", headerName: "Telephone No" },
    { field: "mobile_no", headerName: "Mobile No" },
    { field: "material", headerName: "Material" },
    { field: "sources", headerName: "Sources" },
    { field: "manufacturing", headerName: "Manufacturing" },
    { field: "call_month", headerName: "Call Month" },
    { field: "amount", headerName: "Amount" },
    { field: "purpose", headerName: "Purpose" },
    { field: "comment", headerName: "Comment" },
    { field: "createDate", headerName: "Create Date" },
    { field: "followup_date", headerName: "Follow-up Date" },
    { field: "followupresponse", headerName: "Follow-up Response" },
  ];

  defaultColDef = {
    sortable: true,
  };
}
