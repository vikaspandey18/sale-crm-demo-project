import { Component, inject, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.state";
import { Observable } from "rxjs";
import { DarResponse } from "../../models/dar.model";
import { AsyncPipe } from "@angular/common";
import { AgGridAngular } from "ag-grid-angular";
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  themeAlpine,
} from "ag-grid-community";
import { fetchDarStartAction } from "./state/dar.actions";
import {
  getDarErrorSelector,
  getDarLoadingSelector,
  getDarSelector,
} from "./state/dar.selectors";
import { AlertComponent } from "../../shared/components/ui/alert/alert.component";

@Component({
  selector: "app-dar",
  imports: [AsyncPipe, AgGridAngular, AlertComponent],
  templateUrl: "./dar.component.html",
  styleUrl: "./dar.component.css",
})
export class DarComponent implements OnInit {
  private store: Store = inject(Store<AppState>);

  customers$!: Observable<DarResponse[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  private gridApi!: GridApi<DarResponse>;

  public theme = themeAlpine;

  columnDefs: ColDef<DarResponse>[] = [
    {
      headerName: "No",
      valueGetter: "node.rowIndex + 1",
      width: 50,
      filter: false,
    },
    {
      field: "employee_name",
      headerName: "Employee Name",
    },
    {
      field: "customer_name",
      headerName: "Customer Name",
    },
    {
      field: "purpose",
      headerName: "Purpose",
    },
    {
      field: "comment",
      headerName: "Comment",
    },
    {
      field: "types",
      headerName: "Types",
    },
    {
      field: "amount",
      headerName: "Amount",
      cellClassRules: {
        "cell-error": (params) => params.value < 0,
      },
    },
    {
      field: "followup_date",
      headerName: "Followup Date",
    },
    {
      field: "followupresponse",
      headerName: "Followup Response",
    },
    {
      field: "createDate",
      headerName: "Create Date",
    },
  ];

  defaultColDef = {
    filter: true,
    floatingFilter: true,
    sortable: true,
    resizable: true,
  };

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
  }

  // onQuickFilter(event: any) {
  //   this.gridApi.setQuickFilter(event.target.value);
  // }

  ngOnInit(): void {
    this.store.dispatch(fetchDarStartAction());

    this.customers$ = this.store.select(getDarSelector);
    this.loading$ = this.store.select(getDarLoadingSelector);
    this.error$ = this.store.select(getDarErrorSelector);
  }
}
