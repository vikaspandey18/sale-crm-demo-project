import { Component, inject, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { CustomerResponse } from "../../models/customer.model";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.state";
import { getCustomer } from "./state/customer.actions";
import { getSelectorCustomers } from "./state/customer.selectors";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "app-customers",
  imports: [AsyncPipe],
  templateUrl: "./customers.component.html",
  styleUrl: "./customers.component.css",
})
export class CustomersComponent implements OnInit {
  private store = inject(Store<AppState>);

  customers$!: Observable<CustomerResponse[]>;

  ngOnInit(): void {
    this.store.dispatch(getCustomer());

    this.customers$ = this.store.select(getSelectorCustomers);
  }
}
