import { AsyncPipe } from "@angular/common";
import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { AlertComponent } from "../../../shared/components/ui/alert/alert.component";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ButtonComponent } from "../../../shared/components/ui/button/button.component";
import { ModalComponent } from "../../../shared/components/ui/modal/modal.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.state";
import { TelecallerService } from "../../telecaller/services/telecaller.service";
import { ModalService } from "../../../shared/services/modal.service";
import { IndiaMartCustomer } from "../../../models/india-mart.model";
import { ProductResponse } from "../../../models/products.model";
import { Observable } from "rxjs";
import { getProductStartAction } from "../../../shared/state/shared.actions";
import {
  getProductErrorSelector,
  getProductLoadingSelector,
  getProductSelector,
} from "../../../shared/state/shared.selectors";

@Component({
  selector: "app-update-india-mart-model",
  imports: [
    ModalComponent,
    ButtonComponent,
    ReactiveFormsModule,
    AlertComponent,
    AsyncPipe,
  ],
  templateUrl: "./update-india-mart-model.component.html",
  styleUrl: "./update-india-mart-model.component.css",
})
export class UpdateIndiaMartModelComponent implements OnChanges, OnInit {
  private store = inject(Store<AppState>);
  private teleService = inject(TelecallerService);
  constructor(public modal: ModalService) {}

  @Input({ required: true }) selectedCustomer!: IndiaMartCustomer;

  isOpen = false;
  openModal() {
    this.isOpen = true;
  }
  closeModal() {
    this.isOpen = false;
  }

  indiaMartForm!: FormGroup;

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
  apiSuccessResponse!: string;
  apiErrorResponse!: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["selectedCustomer"]) {
      this.isOpen = true;
    }
    this.apiSuccessResponse = "";
    this.apiErrorResponse = "";

    this.indiaMartForm = new FormGroup({
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
      leadGrade: new FormControl(""),
      paymentStatus: new FormControl(""),
      followupResponse: new FormControl(""),
    });
  }

  ngOnInit(): void {
    this.store.dispatch(getProductStartAction());

    this.products$ = this.store.select(getProductSelector);
    this.productLoading$ = this.store.select(getProductLoadingSelector);
    this.productError$ = this.store.select(getProductErrorSelector);
  }

  activityRequired() {
    const activityController = this.indiaMartForm.get("activity");
    if (
      (activityController?.touched || activityController?.dirty) &&
      activityController.hasError("required")
    ) {
      return "Activity is required";
    }
    return;
  }

  handleSave() {
    const telData = this.indiaMartForm.value;

    this.teleService.addRecord(telData).subscribe({
      next: (response) => {
        this.apiSuccessResponse = response.message;
        this.indiaMartForm.reset();
        // this.closeModal();
      },
      error: (err) => {
        this.apiErrorResponse =
          err.error?.message || "Something went wrong. Please try again.";
      },
    });
    // this.closeModal();
  }
}
