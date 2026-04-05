import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { PageBreadcrumbComponent } from "../../../shared/components/common/page-breadcrumb/page-breadcrumb.component";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AddCustomerService } from "./services/add-customer.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-add-customer",
  imports: [PageBreadcrumbComponent, ReactiveFormsModule],
  templateUrl: "./add-customer.component.html",
  styleUrl: "./add-customer.component.css",
})
export class AddCustomerComponent implements OnInit, OnDestroy {
  private addCustomerService = inject(AddCustomerService);

  private subscription!: Subscription;

  addCustomer!: FormGroup;
  loading: boolean = false;
  error: string | null = null;
  success: string | null = null;

  ngOnInit(): void {
    this.addCustomer = new FormGroup({
      customerName: new FormControl("", [Validators.required]),
      customerContactNo: new FormControl(""),
      personName: new FormControl(""),
      personContactNo: new FormControl(""),
      email: new FormControl(""),
      material: new FormControl(""),
      grade: new FormControl(""),
      location: new FormControl(""),
      manufacturing: new FormControl(""),
      followUp: new FormControl(""),
      source: new FormControl(""),
      message: new FormControl(""),
    });
  }

  onSubmit() {
    if (this.addCustomer.invalid) {
      this.addCustomer.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = null;
    this.success = null;

    this.subscription = this.addCustomerService
      .addCustomer(this.addCustomer.value)
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.success = response.message;
          this.addCustomer.reset();
        },
        error: (err) => {
          this.loading = false;
          this.error = err?.error?.message || "Failed to Add";
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  getCustomerNameError(): string | null {
    const control = this.addCustomer.get("customerName");
    if (!control?.touched || !control?.errors) return null;
    if (control.errors?.["required"]) return "Company Name is required";
    return null;
  }
}
