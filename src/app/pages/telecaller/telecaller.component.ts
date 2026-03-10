import { Component, inject, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.state";
import { getTelecallerCustomerStartAction } from "./state/telecaller.actions";
import { Observable } from "rxjs";
import { TelecallerModel } from "../../models/telecaller.model";
import {
  getTelecallerCustomer,
  getTelecallerErorrState,
  getTelecallerLoadingState,
} from "./state/telecaller.selectors";
import { ColDef, GridApi, themeAlpine } from "ag-grid-community";
import { AsyncPipe } from "@angular/common";

import { AgGridAngular } from "ag-grid-angular";
import { AlertComponent } from "../../shared/components/ui/alert/alert.component";

@Component({
  selector: "app-telecaller",
  imports: [AsyncPipe, AlertComponent, AgGridAngular],
  templateUrl: "./telecaller.component.html",
  styleUrl: "./telecaller.component.css",
})
export class TelecallerComponent implements OnInit {
  private store: Store = inject(Store<AppState>);
  customers$!: Observable<TelecallerModel[] | []>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  private gridApi!: GridApi<TelecallerModel>;

  public theme = themeAlpine;

  columnDefs: ColDef<TelecallerModel>[] = [
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
    { field: "state", headerName: "State", sortable: true, filter: true },
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
    this.store.dispatch(getTelecallerCustomerStartAction());

    this.customers$ = this.store.select(getTelecallerCustomer);
    this.loading$ = this.store.select(getTelecallerLoadingState);
    this.error$ = this.store.select(getTelecallerErorrState);
  }
}
