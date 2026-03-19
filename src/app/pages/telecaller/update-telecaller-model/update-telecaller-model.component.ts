import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ModalComponent } from "../../../shared/components/ui/modal/modal.component";
import { InputFieldComponent } from "../../../shared/components/form/input/input-field.component";
import { ButtonComponent } from "../../../shared/components/ui/button/button.component";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ModalService } from "../../../shared/services/modal.service";
import { TelecallerModel } from "../../../models/telecaller.model";
import { JsonPipe } from "@angular/common";

@Component({
  selector: "app-update-telecaller-model",
  imports: [
    ModalComponent,
    InputFieldComponent,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: "./update-telecaller-model.component.html",
  styleUrl: "./update-telecaller-model.component.css",
})
export class UpdateTelecallerModelComponent implements OnChanges {
  constructor(public modal: ModalService) {}

  @Input({ required: true }) selectedCustomer!: TelecallerModel;

  isOpen = false;
  openModal() {
    this.isOpen = true;
  }
  closeModal() {
    this.isOpen = false;
  }

  editForm!: FormGroup;

  user = {
    firstName: "Musharof",
    lastName: "Chowdhury",
    role: "Team Manager",
    location: "Arizona, United States",
    avatar: "/images/user/owner.jpg",
    social: {
      facebook: "https://www.facebook.com/PimjoHQ",
      x: "https://x.com/PimjoHQ",
      linkedin: "https://www.linkedin.com/company/pimjo",
      instagram: "https://instagram.com/PimjoHQ",
    },
    email: "randomuser@pimjo.com",
    phone: "+09 363 398 46",
    bio: "Team Manager",
  };

  handleSave() {
    this.closeModal();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["selectedCustomer"]) {
      this.isOpen = true;
    }

    this.editForm = new FormGroup({
      id:new FormControl(''),
      
    })
  }
}
