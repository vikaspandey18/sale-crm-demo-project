import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { AlertComponent } from "../../shared/components/ui/alert/alert.component";
import { AgGridAngular } from "ag-grid-angular";
import { UpdateTelecallerModelComponent } from "../telecaller/update-telecaller-model/update-telecaller-model.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.state";
import { map, Observable } from "rxjs";
import { TelecallerModel } from "../../models/telecaller.model";
import {
  CellValueChangedEvent,
  ColDef,
  GridApi,
  themeAlpine,
} from "ag-grid-community";
import {
  getTelecallerCustomerStartAction,
  updateTelecallerCustomerStartAction,
} from "../telecaller/state/telecaller.actions";
import {
  getTelecallerCustomer,
  getTelecallerErorrState,
  getTelecallerLoadingState,
} from "../telecaller/state/telecaller.selectors";
import { loadFollowUpCustomerStartAction } from "./state/followup.actions";

@Component({
  selector: "app-followups",
  imports: [
    AsyncPipe,
    AlertComponent,
    AgGridAngular,
    UpdateTelecallerModelComponent,
  ],
  templateUrl: "./followups.component.html",
  styleUrl: "./followups.component.css",
})
export class FollowupsComponent {
  private store: Store = inject(Store<AppState>);
  customers$!: Observable<TelecallerModel[] | []>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  private gridApi!: GridApi<TelecallerModel>;

  public theme = themeAlpine;

  selectedCustomer!: TelecallerModel;

  columnDefs: ColDef<TelecallerModel>[] = [
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
