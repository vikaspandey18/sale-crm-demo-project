import { Component, inject, Input, SimpleChanges } from "@angular/core";
import { ModalComponent } from "../../../shared/components/ui/modal/modal.component";
import { SafeDatePipe } from "../../../shared/pipe/safe-date.pipe";
import { CurrencyPipe, DatePipe, UpperCasePipe } from "@angular/common";
import { DarResponse } from "../../../models/dar.model";
import { ModalService } from "../../../shared/services/modal.service";
import { TelecallerService } from "../../telecaller/services/telecaller.service";
import { IndiaMartCustomer } from "../../../models/india-mart.model";

@Component({
  selector: "app-history-indiamart-model",
  imports: [ModalComponent, UpperCasePipe, DatePipe, CurrencyPipe],
  templateUrl: "./history-indiamart-model.component.html",
  styleUrl: "./history-indiamart-model.component.css",
})
export class HistoryIndiamartModelComponent {
  @Input({ required: true }) historyCustomer!: IndiaMartCustomer;

  private teleService = inject(TelecallerService);

  constructor(public modal: ModalService) {}

  isLoading: boolean = false;
  isError: string | null = null;
  customerDetails!: DarResponse[];

  isOpen = false;
  openModal() {
    this.isOpen = true;
  }
  closeModal() {
    this.isOpen = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["historyCustomer"] && this.historyCustomer?.id) {
      this.isOpen = true;
      this.isLoading = true;
      this.isError = null;

      this.teleService.fetchCustomerHistory(this.historyCustomer.id).subscribe({
        next: (res) => {
          console.log(res.data);

          this.customerDetails = res.data;
        },
        error: (err) => {
          this.isError = "Failed to load customer history";
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }
}
