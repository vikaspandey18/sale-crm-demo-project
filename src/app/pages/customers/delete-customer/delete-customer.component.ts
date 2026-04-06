import { AsyncPipe } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { AgGridAngular } from "ag-grid-angular";
import { AlertComponent } from "../../../shared/components/ui/alert/alert.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.state";
import { CustomerResponse } from "../../../models/customer.model";
import {
  ColDef,
  colorSchemeDark,
  colorSchemeLight,
  GridApi,
  themeAlpine,
} from "ag-grid-community";
import { map, Observable } from "rxjs";
import { getDeleteCustomer } from "./state/delete-customer.actions";
import {
  selectDelCustomer,
  selectDelCustomerErrorStatus,
  selectDelCustomerLoadingStatus,
} from "./state/delete-customer.selectors";
import { ThemeService } from "../../../shared/services/theme.service";

@Component({
  selector: "app-delete-customer",
  imports: [AsyncPipe, AgGridAngular, AlertComponent],
  templateUrl: "./delete-customer.component.html",
  styleUrl: "./delete-customer.component.css",
})
export class DeleteCustomerComponent implements OnInit {
  private store = inject(Store<AppState>);
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

  customers$!: Observable<CustomerResponse[]>;

  loadingCustomer$!: Observable<boolean>;
  errorCustomer$!: Observable<string | null>;

  columnDefs: ColDef<CustomerResponse>[] = [
    {
      headerName: "No",
      valueGetter: "node.rowIndex + 1",
      filter: false,
      width: 80,
    },
    { field: "customer_name", headerName: "Customer Name" },
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
    { field: "last_comment", headerName: "Last Comment" },
    { field: "last_order_date", headerName: "Last Order Date" },
  ];

  defaultColDef = {
    sortable: true,
    filter: true,
    floatingFilter: true,
  };

  ngOnInit(): void {
    this.store.dispatch(getDeleteCustomer());

    this.customers$ = this.store.select(selectDelCustomer);
    this.loadingCustomer$ = this.store.select(selectDelCustomerLoadingStatus);
    this.errorCustomer$ = this.store.select(selectDelCustomerErrorStatus);
  }
}
