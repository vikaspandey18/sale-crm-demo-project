import { Component, OnInit } from "@angular/core";
import { LabelComponent } from "../../form/label/label.component";
import { CheckboxComponent } from "../../form/input/checkbox.component";
import { InputFieldComponent } from "../../form/input/input-field.component";
import { RouterModule } from "@angular/router";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";

@Component({
  selector: "app-signup-form",
  imports: [
    LabelComponent,
    CheckboxComponent,
    InputFieldComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./signup-form.component.html",
  styles: ``,
})
export class SignupFormComponent {
  showPassword = false;
  isChecked = false;

  fname = "";
  lname = "";
  email = "";
  password = "";

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    console.log("First Name:", this.fname);
    console.log("Last Name:", this.lname);
    console.log("Email:", this.email);
    console.log("Password:", this.password);
    console.log("Remember Me:", this.isChecked);
  }
}
