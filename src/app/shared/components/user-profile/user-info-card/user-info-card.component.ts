import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { ModalService } from "../../../services/modal.service";

import { ButtonComponent } from "../../ui/button/button.component";
import { LabelComponent } from "../../form/label/label.component";
import { ModalComponent } from "../../ui/modal/modal.component";
import { UserRespone } from "../../../../models/user.model";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../store/app.state";
import { selectUserData } from "../../../../pages/profile/state/user.selectors";
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-user-info-card",
  imports: [
    ButtonComponent,
    LabelComponent,
    ModalComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./user-info-card.component.html",
  styles: ``,
})
export class UserInfoCardComponent implements  OnChanges {
  constructor(public modal: ModalService) {}

  private store = inject(Store<AppState>);
  private fb = inject(NonNullableFormBuilder);

  @Input({ required: true }) user!: UserRespone | null;

  isOpen = false;
  openModal() {
    this.isOpen = true;
  }
  closeModal() {
    this.isOpen = false;
  }

  userForm = this.fb.group({
    name: [""],
    employee_group: [{ value: "", disabled: true }],
    email: [""],
    mobile: [""],
    designation: [""],
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes["user"] && this.user) {
      this.userForm.patchValue(this.user);
    }
  }

  handleSave() {
    // Handle save logic here
    if (this.userForm.valid) {
      const data = this.userForm.getRawValue(); // includes disabled
      console.log('Saving:', data);
    }
    // this.modal.closeModal();
  }
}
