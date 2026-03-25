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
import {
  selectUserData,
  selectUserError,
  selectUserLoading,
} from "../../../../pages/profile/state/user.selectors";
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from "@angular/forms";
import { updateUserStartAction } from "../../../../pages/profile/state/user.actions";
import { Observable } from "rxjs";

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
export class UserInfoCardComponent implements OnChanges {
  constructor(public modal: ModalService) {}

  private store = inject(Store<AppState>);
  private fb = inject(NonNullableFormBuilder);

  @Input({ required: true }) user!: UserRespone | null;

  isOpen = false;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  isLoading$: Observable<boolean> = this.store.select(selectUserLoading);
  isError$: Observable<string | null> = this.store.select(selectUserError);

  openModal() {
    this.isOpen = true;
  }
  closeModal() {
    this.isOpen = false;
  }

  userForm = this.fb.group({
    id: [""],
    name: [""],
    employee_group: [{ value: "", disabled: true }],
    email: [""],
    mobile: [{ value: "", disabled: true }],
    designation: [""],
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes["user"] && this.user) {
      this.userForm.patchValue(this.user);
    }
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile = file;

      const reader = new FileReader();

      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

  handleSave() {
    if (this.userForm.valid) {
      const formValue = this.userForm.getRawValue();

      const formData = new FormData();

      formData.append("id", formValue.id || "");
      formData.append("name", formValue.name || "");
      formData.append("email", formValue.email || "");
      formData.append("designation", formValue.designation || "");

      // optional fields
      formData.append("employee_group", formValue.employee_group || "");
      formData.append("mobile", formValue.mobile || "");

      // 🔥 append file
      if (this.selectedFile) {
        formData.append("photo", this.selectedFile);
      }

      // 🔥 dispatch action
      this.store.dispatch(updateUserStartAction({ formData }));
    }
    // this.modal.closeModal();
  }
}
