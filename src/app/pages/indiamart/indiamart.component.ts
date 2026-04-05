import { Component, inject, OnInit } from "@angular/core";
import { AsyncPipe, JsonPipe } from "@angular/common";
import { AgGridAngular } from "ag-grid-angular";
import { ColDef, GridApi, themeAlpine } from "ag-grid-community";
import { CustomerResponse } from "../../models/customer.model";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.state";
import { IndiaMartCustomer } from "../../models/india-mart.model";
import { Observable } from "rxjs";
import { getIndianMartCustomerAction } from "./state/indiamart.actions";
import {
  getIndiaMartCustomersErrorSelector,
  getIndiaMartCustomersLoadingSelector,
  getIndiaMartCustomersSelector,
} from "./state/indiamart.selectors";
import { AlertComponent } from "../../shared/components/ui/alert/alert.component";
import { UpdateIndiaMartModelComponent } from "./update-india-mart-model/update-india-mart-model.component";
import { DetailTellecallerModelComponent } from "../telecaller/detail-tellecaller-model/detail-tellecaller-model.component";
import { HistoryTellecallerModelComponent } from "../telecaller/history-tellecaller-model/history-tellecaller-model.component";
import { DetailIndiamartModelComponent } from "./detail-indiamart-model/detail-indiamart-model.component";
import { HistoryIndiamartModelComponent } from "./history-indiamart-model/history-indiamart-model.component";

@Component({
  selector: "app-indiamart",
  imports: [
    AsyncPipe,
    AgGridAngular,
    AlertComponent,
    UpdateIndiaMartModelComponent,
    DetailIndiamartModelComponent,
    HistoryIndiamartModelComponent,
  ],
  templateUrl: "./indiamart.component.html",
  styleUrl: "./indiamart.component.css",
})
export class IndiamartComponent implements OnInit {
  private store = inject(Store<AppState>);

  private gridApi!: GridApi<IndiaMartCustomer>;

  public theme = themeAlpine;

  indiamartCustomers$!: Observable<IndiaMartCustomer[]>;
  loadCustomer$!: Observable<boolean>;
  errorCustomer$!: Observable<string | null>;

  selectedCustomer!: IndiaMartCustomer;
  detailCustomer!: IndiaMartCustomer;
  historyCustomer!: IndiaMartCustomer;

  columnDefs: ColDef<IndiaMartCustomer>[] = [
    {
      headerName: "No",
      valueGetter: "node.rowIndex + 1",
      width: 100,
      pinned: "left",
      filter: false,
    },
    {
      headerName: "Update",
      width: 100,
      filter: false,
      editable: false,
      pinned: "left",
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
      pinned: "left",
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
      pinned: "left",
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
    floatingFilter: true,
    sortable: true,
    editable: true,
  };

  ngOnInit(): void {
    this.store.dispatch(getIndianMartCustomerAction());

    this.indiamartCustomers$ = this.store.select(getIndiaMartCustomersSelector);
    this.loadCustomer$ = this.store.select(
      getIndiaMartCustomersLoadingSelector,
    );
    this.errorCustomer$ = this.store.select(getIndiaMartCustomersErrorSelector);
  }
}
