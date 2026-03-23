import { Component, Input } from "@angular/core";
import { ModalService } from "../../../services/modal.service";

import { InputFieldComponent } from "../../form/input/input-field.component";
import { ButtonComponent } from "../../ui/button/button.component";
import { LabelComponent } from "../../form/label/label.component";
import { ModalComponent } from "../../ui/modal/modal.component";
import { UserRespone } from "../../../../models/user.model";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-user-info-card",
  imports: [
    InputFieldComponent,
    ButtonComponent,
    LabelComponent,
    ModalComponent,
    CommonModule,
  ],
  templateUrl: "./user-info-card.component.html",
  styles: ``,
})
export class UserInfoCardComponent {
  constructor(public modal: ModalService) {}

  @Input({ required: true }) user!: UserRespone | null;

  isOpen = false;
  openModal() {
    this.isOpen = true;
  }
  closeModal() {
    this.isOpen = false;
  }

  users = {
    firstName: "Musharof",
    lastName: "Chowdhury",
    email: "randomuser@pimjo.com",
    phone: "+09 363 398 46",
    bio: "Team Manager",
    social: {
      facebook: "https://www.facebook.com/PimjoHQ",
      x: "https://x.com/PimjoHQ",
      linkedin: "https://www.linkedin.com/company/pimjo",
      instagram: "https://instagram.com/PimjoHQ",
    },
  };

  handleSave() {
    // Handle save logic here
    console.log("Saving changes...");
    this.modal.closeModal();
  }
}
