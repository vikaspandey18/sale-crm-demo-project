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
} from "ag-grid-community";
import { AsyncPipe } from "@angular/common";

import { AgGridAngular } from "ag-grid-angular";
import { AlertComponent } from "../../shared/components/ui/alert/alert.component";
import { ModalComponent } from "../../shared/components/ui/modal/modal.component";
import { ModalService } from "../../shared/services/modal.service";
import { InputFieldComponent } from "../../shared/components/form/input/input-field.component";
import { ButtonComponent } from "../../shared/components/ui/button/button.component";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-telecaller",
  imports: [
    AsyncPipe,
    AlertComponent,
    AgGridAngular,
    ModalComponent,
    InputFieldComponent,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: "./telecaller.component.html",
  styleUrl: "./telecaller.component.css",
})
export class TelecallerComponent implements OnInit {
  constructor(public modal: ModalService) {}

  private store: Store = inject(Store<AppState>);
  customers$!: Observable<TelecallerModel[] | []>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  isOpen = false;
  openModal(customer: TelecallerModel) {
    this.editForm.patchValue({
      id: customer.id ?? "",
      groups: customer.groups ?? "",
      customer_name: customer.customer_name ?? "",
      telephone_no: customer.telephone_no ?? "",
      incharge_person_name: customer.incharge_person_name ?? "",
      mobile_no: customer.mobile_no ?? "",
      email: customer.email ?? "",
      city: customer.city ?? "",
      material: customer.material ?? "",
      manufacturing: customer.manufacturing ?? "",
      followup_date: customer.followup_date ?? "",
      comment: customer.comment ?? "",
      address: customer.address ?? "",
      state: customer.state ?? "",
      types: customer.types ?? "",
      sources: customer.sources ?? "",
    });
    this.isOpen = true;
  }
  closeModal() {
    this.isOpen = false;
    this.editForm.reset();
  }

  editForm = new FormGroup({
    id: new FormControl(""),
    groups: new FormControl(""),
    customer_name: new FormControl(""),
    telephone_no: new FormControl(""),
    incharge_person_name: new FormControl(""),
    mobile_no: new FormControl(""),
    email: new FormControl(""),
    city: new FormControl(""),
    material: new FormControl(""),
    manufacturing: new FormControl(""),
    followup_date: new FormControl(""),
    comment: new FormControl(""),
    address: new FormControl(""),
    state: new FormControl(""),
    types: new FormControl(""),
    sources: new FormControl(""),
  });

  private gridApi!: GridApi<TelecallerModel>;

  public theme = themeAlpine;

  columnDefs: ColDef<TelecallerModel>[] = [
    {
      headerName: "No",
      valueGetter: "node.rowIndex + 1",
      width: 100,
      pinned: "left",
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
          this.openModal(params.data);
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
    // console.log("Field   :", event.colDef.field);
    // console.log("Old     :", event.oldValue);
    // console.log("New     :", event.newValue);
    // console.log("Row data:", event.data);

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

  // Example user data (could be made dynamic)
  user = {
    firstName: "Musharof",
    lastName: "Chowdhury",
    role: "Team Manager",
    location: "Arizona, United States",
    avatar: "/images/user/owner.jpg",
    social: {
      facebook: "https://www.facebook.com/PimjoHQ",
      x: "https://x.com/PimjoHQ",
      linkedin: "https://www.linkedin.com/company/pimjo",
      instagram: "https://instagram.com/PimjoHQ",
    },
    email: "randomuser@pimjo.com",
    phone: "+09 363 398 46",
    bio: "Team Manager",
  };

  handleSave() {
    if (this.editForm.valid) {
      const updatedCustomer = this.editForm.value;
      this.closeModal();
    }

    // Handle save logic here
    // console.log("Saving changes...");
    // this.modal.closeModal();
  }
}
