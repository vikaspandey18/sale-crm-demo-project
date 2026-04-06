import { Component, inject, Input, OnDestroy, OnInit } from "@angular/core";
import { ModalComponent } from "../../../shared/components/ui/modal/modal.component";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { LeadResponse } from "../../../models/lead.model";
import { ModalService } from "../../../shared/services/modal.service";
import { Subscription } from "rxjs";
import { LeadService } from "../services/lead.service";
import { DatePickerComponent } from "../../../shared/components/form/date-picker/date-picker.component";

@Component({
  selector: "app-add-followup-lead",
  imports: [ModalComponent, ReactiveFormsModule, DatePickerComponent],
  templateUrl: "./add-followup-lead.component.html",
  styleUrl: "./add-followup-lead.component.css",
})
export class AddFollowupLeadComponent implements OnInit, OnDestroy {
  @Input({ required: true })
  set selectedCustomer(value: LeadResponse) {
    if (value) {
      this._detailCustomer = value;
      this.isOpen = true;
    }
  }
  get detailCustomer() {
    return this._detailCustomer;
  }
  private _detailCustomer!: LeadResponse;

  constructor(public modal: ModalService) {}

  addLeadForm!: FormGroup;
  loading: boolean = false;
  error: string | null = null;
  success: string | null = null;
  toDate: string | null = null;

  private subscripton!: Subscription;
  private leadService = inject(LeadService);

  isOpen = false;
  openModal() {
    this.isOpen = true;
  }
  closeModal() {
    this.isOpen = false;
  }

  ngOnInit(): void {
    const today = new Date();

    this.toDate = this.formatedDate(today);

    this.addLeadForm = new FormGroup({
      followUp: new FormControl(this.toDate),
      comment: new FormControl(""),
      lead: new FormControl(this.detailCustomer.id),
    });
  }

  formatedDate(date: Date): string {
    return date.toISOString().split("T")[0];
  }

  onToDateChange(event: any) {
    this.toDate = event.dateStr;
  }

  onSubmit() {
    if (this.addLeadForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = null;
    this.success = null;

    this.subscripton = this.leadService
      .addFollowup(this.addLeadForm.value)
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.success = response.message;
          this.addLeadForm.reset();
          // this.closeModal();
        },
        error: (err) => {
          this.loading = false;
          this.error = err?.error?.message || "Failed to Add";
        },
      });
  }

  ngOnDestroy(): void {
    this.subscripton?.unsubscribe();
  }
}
