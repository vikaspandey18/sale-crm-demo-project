import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { TelecallerModel } from "../../../models/telecaller.model";
import { ModalComponent } from "../../../shared/components/ui/modal/modal.component";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.state";
import { TelecallerService } from "../services/telecaller.service";
import { ModalService } from "../../../shared/services/modal.service";
import { DarResponse } from "../../../models/dar.model";
import { DatePipe, UpperCasePipe } from "@angular/common";

@Component({
  selector: "app-history-tellecaller-model",
  imports: [ModalComponent, UpperCasePipe,DatePipe],
  templateUrl: "./history-tellecaller-model.component.html",
  styleUrl: "./history-tellecaller-model.component.css",
})
export class HistoryTellecallerModelComponent implements OnChanges {
  @Input({ required: true }) historyCustomer!: TelecallerModel;

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
