import { AsyncPipe } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { AlertComponent } from "../../shared/components/ui/alert/alert.component";
import { AgGridAngular } from "ag-grid-angular";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.state";
import { ColDef, GridApi, themeAlpine } from "ag-grid-community";
import { LeadResponse } from "../../models/lead.model";
import { getLeadStartAction } from "./state/lead.actions";
import {
  getLeadErrorSelector,
  getLeadLoadingSelector,
  getLeadSelector,
} from "./state/lead.selectors";
import { Observable } from "rxjs";
import { ShowHistoryModelComponent } from "./show-history-model/show-history-model.component";

@Component({
  selector: "app-leads",
  imports: [
    AsyncPipe,
    AlertComponent,
    AgGridAngular,
    ShowHistoryModelComponent,
  ],
  templateUrl: "./leads.component.html",
  styleUrl: "./leads.component.css",
})
export class LeadsComponent implements OnInit {
  private store: Store = inject(Store<AppState>);
  customers$!: Observable<LeadResponse[] | []>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  selectedCustomer!: LeadResponse;

  private gridApi!: GridApi<LeadResponse>;

  public theme = themeAlpine;

  columnDefs: ColDef<LeadResponse>[] = [
    {
      field: "id",
      headerName: "No",
      filter: false,
      width: 80,
      valueGetter: "node.rowIndex + 1",
    },
    {
      headerName: "History",
      width: 100,
      filter: false,
      editable: false,
      // pinned: "left",
      cellRenderer: () => {
        return `
          <button type="button" class="inline-flex items-center justify-center gap-2 rounded-lg transition px-2 py-0 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300">View</button>
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
      headerName: "Status",
      width: 100,
      filter: false,
      editable: false,
      // pinned: "left",
      cellRenderer: () => {
        return `
          <button type="button" class="inline-flex items-center justify-center gap-2 rounded-lg transition px-2 py-0 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300">Status</button>
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
      headerName: "Follow Up",
      width: 100,
      filter: false,
      editable: false,
      // pinned: "left",
      cellRenderer: () => {
        return `
          <button type="button" class="inline-flex items-center justify-center gap-2 rounded-lg transition px-2 py-0 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300">Add</button>
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
      field: "employee_name",
      headerName: "Employee Name",
    },
    {
      field: "customer_name",
      headerName: "Customer Name",
    },
    {
      field: "order_value",
      headerName: "Amount",
    },
    {
      field: "products",
      headerName: "Product",
    },
    {
      field: "status",
      headerName: "Status",
    },
    {
      field: "comments",
      headerName: "Comment",
    },
    {
      field: "lead_grade",
      headerName: "Lead Grade",
    },
    {
      field: "followup_date",
      headerName: "Followup Date",
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
  };

  ngOnInit(): void {
    this.store.dispatch(getLeadStartAction());

    this.customers$ = this.store.select(getLeadSelector);
    this.loading$ = this.store.select(getLeadLoadingSelector);
    this.error$ = this.store.select(getLeadErrorSelector);
  }
}
