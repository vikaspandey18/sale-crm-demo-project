import { Component, inject, OnInit } from "@angular/core";
import { AsyncPipe } from "@angular/common";
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

@Component({
  selector: "app-indiamart",
  imports: [AsyncPipe, AgGridAngular, AlertComponent],
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

  columnDefs: ColDef<IndiaMartCustomer>[] = [
    {
      field: "customer_name",
      headerName: "Customer Name",
      sortable: true,
      filter: true,
      pinned: "left",
      editable: true,
    },
    { field: "mobile_no", headerName: "Mobile", sortable: true, filter: true },
    { field: "email", headerName: "Email", sortable: true, filter: true },
    { field: "city", headerName: "City", sortable: true, filter: true },
    {
      field: "followup_date",
      headerName: "Followup Date",
      sortable: true,
      filter: true,
    },
    {
      field: "last_order_date",
      headerName: "Last Order",
      sortable: true,
      filter: true,
    },
    { field: "comment", headerName: "Comment", sortable: true, filter: true },
  ];

  ngOnInit(): void {
    this.store.dispatch(getIndianMartCustomerAction());

    this.indiamartCustomers$ = this.store.select(getIndiaMartCustomersSelector);
    this.loadCustomer$ = this.store.select(
      getIndiaMartCustomersLoadingSelector,
    );
    this.errorCustomer$ = this.store.select(getIndiaMartCustomersErrorSelector);
  }
}
