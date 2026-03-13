import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.state";
import { CustomerService } from "../services/customer.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatLatestFrom } from "@ngrx/operators";

import {
  getCustomer,
  getCustomerFailure,
  getCustomerSuccess,
} from "./customer.actions";
import { catchError, EMPTY, map, of, switchMap } from "rxjs";
import { getSelectorCustomers } from "./customer.selectors";

@Injectable()
export class CustomerEffect {
  private store = inject(Store<AppState>);
  private customerService = inject(CustomerService);
  private actions$ = inject(Actions);

  getCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getCustomer),
      concatLatestFrom(() => this.store.select(getSelectorCustomers)),
      switchMap(([action, customers]) => {
        if (customers.length > 0) {
          return of(getCustomerSuccess({ customers }));
        }
        return this.customerService.getCustomer().pipe(
          map((response: any) => {
            return getCustomerSuccess({ customers: response.data });
          }),
          catchError((error) => {
            return of(getCustomerFailure({ error: error?.error.message }));
          }),
        );
      }),
    );
  });
}
