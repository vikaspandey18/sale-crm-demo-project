import { Component, inject, OnInit } from "@angular/core";
import { LabelComponent } from "../../form/label/label.component";
import { RouterModule } from "@angular/router";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../store/app.state";
import { loginStartAction } from "../state/auth.actions";

@Component({
  selector: "app-signin-form",
  imports: [LabelComponent, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./signin-form.component.html",
  styles: ``,
})
export class SigninFormComponent implements OnInit {
  private store = inject(Store<AppState>);

  showPassword = false;
  isChecked = false;

  signInForm!: FormGroup;

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      email: new FormControl("", [Validators.email, Validators.required]),
      password: new FormControl("", [
        Validators.minLength(4),
        Validators.required,
      ]),
      checkeBox: new FormControl(false),
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  validateEmail() {
    const emailValue = this.signInForm.get("email");
    if (
      emailValue?.errors?.["required"] &&
      (emailValue.touched || emailValue.dirty)
    ) {
      return "Email is required";
    }

    if (emailValue?.errors?.["email"]) {
      return "Email format is not correct";
    }
    return;
  }

  validatePassword() {
    const passwordValue = this.signInForm.get("password");

    if (
      passwordValue?.hasError("required") &&
      (passwordValue.touched || passwordValue.dirty)
    ) {
      return "Password is required";
    }

    if (passwordValue?.hasError("minlength")) {
      return "Password should be min length of 4 character";
    }

    return;
  }

  onSubmit() {
    const { email, password, checkeBox } = this.signInForm.value;
    if (checkeBox) {
      this.store.dispatch(loginStartAction({ email, password }));
    } else {
      alert("Kindly tick the checkbox");
    }
  }
}
