import { Component, inject, Input } from "@angular/core";
import { AppState } from "../../../store/app.state";
import { TelecallerService } from "../../telecaller/services/telecaller.service";
import { ModalService } from "../../../shared/services/modal.service";
import { Store } from "@ngrx/store";
import { LeadResponse } from "../../../models/lead.model";
import { ModalComponent } from "../../../shared/components/ui/modal/modal.component";
import { SafeDatePipe } from "../../../shared/pipe/safe-date.pipe";
import { getCurrentInjector } from "@angular/core/primitives/di";
import { CurrencyPipe } from "@angular/common";

@Component({
  selector: "app-show-history-model",
  imports: [ModalComponent, SafeDatePipe,CurrencyPipe],
  templateUrl: "./show-history-model.component.html",
  styleUrl: "./show-history-model.component.css",
})
export class ShowHistoryModelComponent {
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

  private store = inject(Store<AppState>);
  private teleService = inject(TelecallerService);
  constructor(public modal: ModalService) {}

  isOpen = false;
  openModal() {
    this.isOpen = true;
  }
  closeModal() {
    this.isOpen = false;
  }
}
