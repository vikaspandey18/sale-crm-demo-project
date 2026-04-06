import { Component, inject, Input, OnDestroy, OnInit } from "@angular/core";
import { ModalComponent } from "../../../shared/components/ui/modal/modal.component";
import { LeadResponse } from "../../../models/lead.model";
import { ModalService } from "../../../shared/services/modal.service";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Subscription } from "rxjs";
import { LeadService } from "../services/lead.service";

@Component({
  selector: "app-add-lead-status",
  imports: [ModalComponent, ReactiveFormsModule],
  templateUrl: "./add-lead-status.component.html",
  styleUrl: "./add-lead-status.component.css",
})
export class AddLeadStatusComponent implements OnInit, OnDestroy {
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
    this.addLeadForm = new FormGroup({
      status: new FormControl(""),
      comment: new FormControl(""),
      lead: new FormControl(this.detailCustomer.id),
    });
  }

  onSubmit() {
    if (this.addLeadForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = null;
    this.success = null;

    this.subscripton = this.leadService
      .addStatus(this.addLeadForm.value)
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.success = response.message;
          this.addLeadForm.reset();
          this.closeModal();
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
