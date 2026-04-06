import { Component, inject, Input, OnDestroy, OnInit } from "@angular/core";
import { ModalService } from "../../../shared/services/modal.service";
import { LeadHistory, LeadResponse } from "../../../models/lead.model";
import { ModalComponent } from "../../../shared/components/ui/modal/modal.component";
import { SafeDatePipe } from "../../../shared/pipe/safe-date.pipe";

import { LeadService } from "../services/lead.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-show-history-model",
  imports: [ModalComponent, SafeDatePipe],
  templateUrl: "./show-history-model.component.html",
  styleUrl: "./show-history-model.component.css",
})
export class ShowHistoryModelComponent implements OnInit, OnDestroy {
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
  private leadService = inject(LeadService);

  private subscription!: Subscription;

  leadHistory!: LeadHistory[] | [];
  loading: boolean = false;
  error: string = "";

  constructor(public modal: ModalService) {}

  isOpen = false;
  openModal() {
    this.isOpen = true;
  }
  closeModal() {
    this.isOpen = false;
  }

  ngOnInit(): void {
    if (this.detailCustomer.id) {
      this.loading = true;
      this.error = "";

      this.subscription = this.leadService
        .getLeadHistory(this.detailCustomer?.id)
        .subscribe({
          next: (response) => {
            this.loading = false;
            this.leadHistory = response.data || [];
          },
          error: (error) => {
            this.loading = false;
            this.error =
              error.message || "An error occurred while fetching lead history.";
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
