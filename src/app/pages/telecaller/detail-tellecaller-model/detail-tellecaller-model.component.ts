import { Component, inject, Input } from "@angular/core";
import { TelecallerModel } from "../../../models/telecaller.model";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.state";
import { TelecallerService } from "../services/telecaller.service";
import { ModalService } from "../../../shared/services/modal.service";
import { ModalComponent } from "../../../shared/components/ui/modal/modal.component";
import { DatePipe, JsonPipe } from "@angular/common";
import { SafeDatePipe } from "../../../shared/pipe/safe-date.pipe";

@Component({
  selector: "app-detail-tellecaller-model",
  imports: [ModalComponent, SafeDatePipe],
  templateUrl: "./detail-tellecaller-model.component.html",
  styleUrl: "./detail-tellecaller-model.component.css",
})
export class DetailTellecallerModelComponent {
  @Input({ required: true })
  set detailCustomer(value: TelecallerModel) {
    if (value) {
      this._detailCustomer = value;
      this.isOpen = true;
    }
  }
  get detailCustomer() {
    return this._detailCustomer;
  }

  private _detailCustomer!: TelecallerModel;

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
