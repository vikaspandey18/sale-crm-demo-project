import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { ModalComponent } from "../../../shared/components/ui/modal/modal.component";
import { ButtonComponent } from "../../../shared/components/ui/button/button.component";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ModalService } from "../../../shared/services/modal.service";
import { TelecallerModel } from "../../../models/telecaller.model";
import { Observable } from "rxjs";
import { ProductResponse } from "../../../models/products.model";
import { AppState } from "../../../store/app.state";
import { Store } from "@ngrx/store";
import {
  getProductErrorSelector,
  getProductLoadingSelector,
  getProductSelector,
} from "../../../shared/state/shared.selectors";
import { AlertComponent } from "../../../shared/components/ui/alert/alert.component";
import { AsyncPipe } from "@angular/common";
import { MultiSelectComponent } from "../../../shared/components/form/multi-select/multi-select.component";
import { getProductStartAction } from "../../../shared/state/shared.actions";

@Component({
  selector: "app-update-telecaller-model",
  imports: [
    ModalComponent,
    ButtonComponent,
    ReactiveFormsModule,
    AlertComponent,
    AsyncPipe,
  ],
  templateUrl: "./update-telecaller-model.component.html",
  styleUrl: "./update-telecaller-model.component.css",
})
export class UpdateTelecallerModelComponent implements OnChanges, OnInit {
  private store = inject(Store<AppState>);
  constructor(public modal: ModalService) {}

  @Input({ required: true }) selectedCustomer!: TelecallerModel;

  isOpen = false;
  openModal() {
    this.isOpen = true;
  }
  closeModal() {
    this.isOpen = false;
  }

  telecallerForm!: FormGroup;

  dropdonwActivity = [
    "Order",
    "Payment",
    "Lead",
    "Follow Up",
    "Interested",
    "Not Interested",
    "Delete",
  ];

  products$!: Observable<ProductResponse[] | []>;
  productLoading$!: Observable<boolean>;
  productError$!: Observable<string | null>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["selectedCustomer"]) {
      this.isOpen = true;
    }

    this.telecallerForm = new FormGroup({
      customerId: new FormControl(this.selectedCustomer?.id),
      activity: new FormControl("", [Validators.required]),
      newCustomerGroup: new FormControl(""),
      followupDate: new FormControl(""),
      comment: new FormControl(""),
      products: new FormControl(""),
      amount: new FormControl(""),
      paymentDone: new FormControl(""),
      purchaser: new FormControl(""),
      partyType: new FormControl(""),
    });
  }

    ngOnInit(): void {
      this.store.dispatch(getProductStartAction());

      this.products$ = this.store.select(getProductSelector);
      this.productLoading$ = this.store.select(getProductLoadingSelector);
      this.productError$ = this.store.select(getProductErrorSelector);
    }

  handleSave() {
    console.log(this.telecallerForm.value);
    // this.closeModal();
  }
}
