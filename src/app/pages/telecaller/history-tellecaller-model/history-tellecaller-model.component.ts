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

@Component({
  selector: "app-history-tellecaller-model",
  imports: [ModalComponent],
  templateUrl: "./history-tellecaller-model.component.html",
  styleUrl: "./history-tellecaller-model.component.css",
})
export class HistoryTellecallerModelComponent implements OnChanges {
  @Input({ required: true }) historyCustomer!: TelecallerModel;

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
    if (changes["historyCustomer"]) {
      this.isOpen = true;
    }
  }
}
