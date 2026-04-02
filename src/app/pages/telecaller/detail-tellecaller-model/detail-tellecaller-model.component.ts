import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { TelecallerModel } from "../../../models/telecaller.model";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.state";
import { TelecallerService } from "../services/telecaller.service";
import { ModalService } from "../../../shared/services/modal.service";
import { ModalComponent } from "../../../shared/components/ui/modal/modal.component";

@Component({
  selector: "app-detail-tellecaller-model",
  imports: [ModalComponent],
  templateUrl: "./detail-tellecaller-model.component.html",
  styleUrl: "./detail-tellecaller-model.component.css",
})
export class DetailTellecallerModelComponent implements OnChanges {
  @Input({ required: true }) detailCustomer!: TelecallerModel;

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["detailCustomer"]) {
      this.isOpen = true;
    }
  }
}
