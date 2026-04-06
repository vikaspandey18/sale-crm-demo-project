import { AsyncPipe, CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { AlertComponent } from "../../shared/components/ui/alert/alert.component";
import { AgGridAngular } from "ag-grid-angular";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.state";
import { map, Observable } from "rxjs";
import {
  CellValueChangedEvent,
  ColDef,
  GridApi,
  themeAlpine,
  themeQuartz,
  colorSchemeDark,
  colorSchemeLight,
} from "ag-grid-community";
import {
  loadFollowUpCustomerStartAction,
  updateFollowUpCustomerStartAction,
} from "./state/followup.actions";
import { FollowUpResponse } from "../../models/followup.model";
import {
  selectFollowUpCustomer,
  selectFollowUpErrorCustomer,
  selectFollowUpLoadingCustomer,
} from "./state/followup.selectors";
import { UpdateFollowupModelComponent } from "./update-followup-model/update-followup-model.component";
import { ThemeService } from "../../shared/services/theme.service";

type Tab = "today" | "previous" | "upcomming";

@Component({
  selector: "app-followups",
  imports: [
    AsyncPipe,
    AlertComponent,
    AgGridAngular,
    CommonModule,
    UpdateFollowupModelComponent,
  ],
  templateUrl: "./followups.component.html",
  styleUrl: "./followups.component.css",
})
export class FollowupsComponent implements OnInit {
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

  todayCustomers$!: Observable<FollowUpResponse[]>;
  previousCustomers$!: Observable<FollowUpResponse[]>;
  upcomingCustomers$!: Observable<FollowUpResponse[]>;

  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  private gridApi!: GridApi<FollowUpResponse>;

  selectedCustomer!: FollowUpResponse;

  activeTab: Tab = "today";

  tabs: { id: Tab; label: string }[] = [
    { id: "today", label: "Today" },
    { id: "previous", label: "Previous" },
    { id: "upcomming", label: "Upcomming" },
  ];

  switchTab(tab: Tab): void {
    this.activeTab = tab;
  }

  isActive(tab: Tab): boolean {
    return this.activeTab === tab;
  }

  getRowId = (params: any) => params.data.id;

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  columnDefs: ColDef<FollowUpResponse>[] = [
    {
      headerName: "No",
      valueGetter: "node.rowIndex + 1",
      width: 100,
      pinned: "left",
      filter: false,
    },
    {
      headerName: "Actions",
      width: 120,
      filter: false,
      editable: false,
      pinned: "left",
      cellRenderer: () => {
        return `
            <button type="button" class="inline-flex items-center justify-center gap-2 rounded-lg transition px-4 py-1 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300">Update</button>
          `;
      },
      onCellClicked: (params) => {
        if (params.data) {
          this.selectedCustomer = params.data;
          // this.openModal(params.data);
        }
      },
    },

    {
      field: "customer_name",
      headerName: "Customer Name",
    },
    { field: "journeryDate", headerName: "Journery Date" },
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
    this.store.dispatch(loadFollowUpCustomerStartAction());

    const today = new Date().toISOString().split("T")[0];

    // const all$ = this.store.select(selectFollowUpCustomer);

    const all$ = this.store.select(selectFollowUpCustomer).pipe(
      map((list) => list.map((c) => ({ ...c }))), // ✅ unfreezes each object
    );

    this.todayCustomers$ = all$.pipe(
      map((list) => list.filter((c) => c.journeryDate === today)),
    );

    this.previousCustomers$ = all$.pipe(
      map((list) => list.filter((c) => c.journeryDate < today)),
    );

    this.upcomingCustomers$ = all$.pipe(
      map((list) => list.filter((c) => c.journeryDate > today)),
    );

    this.loading$ = this.store.select(selectFollowUpLoadingCustomer);
    this.error$ = this.store.select(selectFollowUpErrorCustomer);
  }

  // Fires when any cell value is changed
  onCellValueChanged(event: CellValueChangedEvent<FollowUpResponse>) {
    if (event.oldValue === event.newValue) return;

    const field = event.colDef.field;

    if (!field) {
      return;
    }

    // Dispatch update to store
    this.store.dispatch(
      updateFollowUpCustomerStartAction({
        id: event.data.id!,
        field: field,
        value: event.newValue,
        journeryId: event.data.journeryId!,
      }),
    );
  }
}
