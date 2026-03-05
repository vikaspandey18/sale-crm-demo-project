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
import { getAuthError, getAuthLoading } from "../state/auth.selectors";
import { AsyncPipe } from "@angular/common";
import { AlertComponent } from "../../ui/alert/alert.component";

@Component({
  selector: "app-signin-form",
  imports: [
    LabelComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    AlertComponent,
  ],
  templateUrl: "./signin-form.component.html",
  styles: ``,
})
export class SigninFormComponent implements OnInit {
  private store = inject(Store<AppState>);

  showPassword = false;
  isChecked = false;

  signInForm!: FormGroup;

  loading$ = this.store.select(getAuthLoading);
  authError$ = this.store.select(getAuthError);

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      mobile: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
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

  validateMobile() {
    const mobileValue = this.signInForm.get("mobile");
    if (
      mobileValue?.errors?.["required"] &&
      (mobileValue.touched || mobileValue.dirty)
    ) {
      return "Email is required";
    }

    if (
      mobileValue?.hasError("minlength") ||
      mobileValue?.hasError("maxlength")
    ) {
      return "Mobile Number should be 10 digit";
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
    const { mobile, password, checkeBox } = this.signInForm.value;
    if (checkeBox) {
      this.store.dispatch(loginStartAction({ mobile, password }));
    } else {
      alert("Kindly tick the checkbox");
    }
  }
}
