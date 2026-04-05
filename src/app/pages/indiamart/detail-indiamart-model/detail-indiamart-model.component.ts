import { Component, inject, Input } from "@angular/core";
import { IndiaMartCustomer } from "../../../models/india-mart.model";
import { ModalService } from "../../../shared/services/modal.service";
import { ModalComponent } from "../../../shared/components/ui/modal/modal.component";
import { SafeDatePipe } from "../../../shared/pipe/safe-date.pipe";

@Component({
  selector: "app-detail-indiamart-model",
  imports: [ModalComponent, SafeDatePipe],
  templateUrl: "./detail-indiamart-model.component.html",
  styleUrl: "./detail-indiamart-model.component.css",
})
export class DetailIndiamartModelComponent {
  @Input({ required: true })
  set detailCustomer(value: IndiaMartCustomer) {
    if (value) {
      this._detailCustomer = value;
      this.isOpen = true;
    }
  }
  get detailCustomer() {
    return this._detailCustomer;
  }

  private _detailCustomer!: IndiaMartCustomer;

  constructor(public modal: ModalService) {}

  isOpen = false;
  openModal() {
    this.isOpen = true;
  }
  closeModal() {
    this.isOpen = false;
  }
}
