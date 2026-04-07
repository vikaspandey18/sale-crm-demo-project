import { Component, inject, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.state";
import {
  getTelecallerCustomerStartAction,
  updateTelecallerCustomerStartAction,
} from "./state/telecaller.actions";
import { map, Observable } from "rxjs";
import { TelecallerModel } from "../../models/telecaller.model";
import {
  getTelecallerCustomer,
  getTelecallerErorrState,
  getTelecallerLoadingState,
} from "./state/telecaller.selectors";
import {
  ColDef,
  GridApi,
  themeAlpine,
  CellValueChangedEvent,
  colorSchemeDark,
  colorSchemeLight,
} from "ag-grid-community";
import { AsyncPipe } from "@angular/common";
import { AgGridAngular } from "ag-grid-angular";
import { AlertComponent } from "../../shared/components/ui/alert/alert.component";
import { UpdateTelecallerModelComponent } from "./update-telecaller-model/update-telecaller-model.component";
import { DetailTellecallerModelComponent } from "./detail-tellecaller-model/detail-tellecaller-model.component";
import { HistoryTellecallerModelComponent } from "./history-tellecaller-model/history-tellecaller-model.component";
import { RouterLink } from "@angular/router";
import { ThemeService } from "../../shared/services/theme.service";

@Component({
  selector: "app-telecaller",
  imports: [
    AsyncPipe,
    AlertComponent,
    AgGridAngular,
    UpdateTelecallerModelComponent,
    DetailTellecallerModelComponent,
    HistoryTellecallerModelComponent,
    RouterLink,
  ],
  templateUrl: "./telecaller.component.html",
  styleUrl: "./telecaller.component.css",
})
export class TelecallerComponent implements OnInit {
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

  customers$!: Observable<TelecallerModel[] | []>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  private gridApi!: GridApi<TelecallerModel>;


  selectedCustomer!: TelecallerModel;
  detailCustomer!: TelecallerModel;
  historyCustomer!: TelecallerModel;

  columnDefs: ColDef<TelecallerModel>[] = [
    {
      headerName: "No",
      valueGetter: "node.rowIndex + 1",
      width: 80,
      pinned: "left",
      filter: false,
    },
    {
      headerName: "Update",
      width: 100,
      filter: false,
      editable: false,
      // pinned: "left",
      cellRenderer: () => {
        return `
          <button type="button" class="inline-flex items-center justify-center gap-2 rounded-lg transition px-2 py-0 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300">Update</button>
        `;
      },
      onCellClicked: (params) => {
        if (params.data) {
          this.selectedCustomer = null!;
          setTimeout(() => {
            this.selectedCustomer = { ...params.data };
          }, 0);
        }
      },
    },
    {
      headerName: "Detail",
      width: 90,
      filter: false,
      editable: false,
      // pinned: "left",
      cellRenderer: () => {
        return `
          <button type="button" class="inline-flex items-center justify-center gap-2 rounded-lg transition px-2 py-0 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300">Detail</button>
        `;
      },
      onCellClicked: (params) => {
        if (params.data) {
          this.detailCustomer = null!; // reset first
          setTimeout(() => {
            this.detailCustomer = { ...params.data }; // new reference
          }, 0);
        }
      },
    },
    {
      headerName: "History",
      width: 100,
      filter: false,
      editable: false,
      // pinned: "left",
      cellRenderer: () => {
        return `
          <button type="button" class="inline-flex items-center justify-center gap-2 rounded-lg transition px-2 py-0 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300">History</button>
        `;
      },
      onCellClicked: (params) => {
        if (params.data) {
          this.historyCustomer = null!;
          setTimeout(() => {
            this.historyCustomer = { ...params.data };
          }, 0);
        }
      },
    },
    {
      field: "customer_name",
      headerName: "Customer Name",
    },
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
    { field: "last_activity", headerName: "Last Activity" },
    { field: "last_comment", headerName: "Last Comment" },
    { field: "last_order_date", headerName: "Last Order Date" },
  ];

  defaultColDef = {
    filter: true,
    sortable: true,
    floatingFilter: true,
    editable: true,
  };

  ngOnInit(): void {
    this.store.dispatch(getTelecallerCustomerStartAction());

    // this.customers$ = this.store.select(getTelecallerCustomer);
    // Clone data to avoid NgRx immutability error
    this.customers$ = this.store
      .select(getTelecallerCustomer)
      .pipe(map((customers) => customers.map((c) => ({ ...c }))));
    this.loading$ = this.store.select(getTelecallerLoadingState);
    this.error$ = this.store.select(getTelecallerErorrState);
  }

  // Fires when any cell value is changed
  onCellValueChanged(event: CellValueChangedEvent<TelecallerModel>) {
    if (event.oldValue === event.newValue) return;

    const field = event.colDef.field;

    if (!field) {
      return;
    }

    // Dispatch update to store
    this.store.dispatch(
      updateTelecallerCustomerStartAction({
        id: event.data.id!,
        field: field,
        value: event.newValue,
      }),
    );
  }
}
